import { NextRequest, NextResponse } from "next/server";
// @ts-ignore
import WebSocket from "ws";
import crypto from "crypto";
import https from "https";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const TRUSTED_CLIENT_TOKEN = "6A5AA1D4EAFF4E9FB37E23D68491D6F4";
const WIN_EPOCH = 11644473600;
const CHROMIUM_FULL_VERSION = "143.0.3650.75";
const CHROMIUM_MAJOR_VERSION = "143";
const SEC_MS_GEC_VERSION = `1-${CHROMIUM_FULL_VERSION}`;

/**
 * Generates the Sec-MS-GEC anti-abuse token required by Microsoft's
 * Edge TTS service. Calculated as the SHA256 of Windows file ticks
 * (rounded down to 5 minutes) concatenated with the trusted token.
 */
function generateSecMsGec(): string {
  let ticks = Math.floor(Date.now() / 1000);
  ticks += WIN_EPOCH;
  ticks -= ticks % 300;
  const ticks100ns = BigInt(ticks) * BigInt(10000000);
  const strToHash = `${ticks100ns}${TRUSTED_CLIENT_TOKEN}`;
  return crypto.createHash("sha256").update(strToHash, "ascii").digest("hex").toUpperCase();
}

/**
 * Generates a random 32-character hex MUID for the Cookie header.
 */
function generateMuid(): string {
  return crypto.randomBytes(16).toString("hex").toUpperCase();
}

/**
 * Cleans input text and removes incompatible control characters.
 */
function sanitizeText(input: string): string {
  return input
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g, " ")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .trim();
}

/**
 * Synthesizes text to speech using Microsoft Edge Neural TTS via WebSocket.
 */
function synthesizeWithEdgeTTS(
  text: string,
  voice: string,
  rateStr: string,
  pitchStr: string
): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const connectionId = crypto.randomUUID().replace(/-/g, "");
    const requestId = crypto.randomUUID().replace(/-/g, "");
    const secMsGec = generateSecMsGec();

    const url = `wss://speech.platform.bing.com/consumer/speech/synthesize/readaloud/edge/v1?TrustedClientToken=${TRUSTED_CLIENT_TOKEN}&Sec-MS-GEC=${secMsGec}&Sec-MS-GEC-Version=${SEC_MS_GEC_VERSION}&ConnectionId=${connectionId}`;

    const ws = new WebSocket(url, {
      headers: {
        Pragma: "no-cache",
        "Cache-Control": "no-cache",
        Origin: "chrome-extension://jdiccldimpdaibmpdkjnbmckianbfold",
        "User-Agent": `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${CHROMIUM_MAJOR_VERSION}.0.0.0 Safari/537.36 Edg/${CHROMIUM_MAJOR_VERSION}.0.0.0`,
        "Accept-Encoding": "gzip, deflate, br, zstd",
        "Accept-Language": "en-US,en;q=0.9",
        Cookie: `muid=${generateMuid()};`,
      },
    });

    const audioChunks: Buffer[] = [];
    let isResolved = false;

    // Fast 3,500ms timeout: if Microsoft hangs or drops packet handshake (common on cloud datacenter IPs)
    const timeout = setTimeout(() => {
      if (!isResolved) {
        isResolved = true;
        try {
          ws.terminate();
        } catch {
          // ignore
        }
        reject(new Error("Edge TTS connection timed out."));
      }
    }, 3500);

    ws.on("open", () => {
      // 1. Send speech.config message
      const configMessage =
        `Content-Type:application/json; charset=utf-8\r\n` +
        `Path:speech.config\r\n\r\n` +
        JSON.stringify({
          context: {
            synthesis: {
              audio: {
                metadataoptions: {
                  sentenceBoundaryEnabled: "false",
                  wordBoundaryEnabled: "false",
                },
                outputFormat: "audio-24khz-48kbitrate-mono-mp3",
              },
            },
          },
        });
      ws.send(configMessage);

      // 2. Send SSML request message
      const sanitized = sanitizeText(text);
      const ssml =
        `<speak version='1.0' xmlns='http://www.w3.org/2001/10/synthesis' xml:lang='en-US'>` +
        `<voice name='${voice}'>` +
        `<prosody pitch='${pitchStr}' rate='${rateStr}' volume='+0%'>` +
        sanitized +
        `</prosody>` +
        `</voice>` +
        `</speak>`;

      const ssmlMessage =
        `X-RequestId:${requestId}\r\n` +
        `Content-Type:application/ssml+xml\r\n` +
        `Path:ssml\r\n\r\n` +
        ssml;

      ws.send(ssmlMessage);
    });

    ws.on("message", (data: any, isBinary: boolean) => {
      if (isBinary && Buffer.isBuffer(data)) {
        if (data.length > 2) {
          const headerLen = data.readUInt16BE(0);
          const headerStr = data.subarray(2, 2 + headerLen).toString("utf-8");
          if (headerStr.includes("Path:audio")) {
            const audioChunk = data.subarray(2 + headerLen);
            audioChunks.push(audioChunk);
          }
        }
      } else {
        const textMsg = data.toString();
        if (textMsg.includes("Path:turn.end")) {
          if (!isResolved) {
            isResolved = true;
            clearTimeout(timeout);
            try {
              ws.close();
            } catch {
              // ignore
            }
            const fullAudio = Buffer.concat(audioChunks);
            resolve(fullAudio);
          }
        }
      }
    });

    ws.on("error", (err: any) => {
      if (!isResolved) {
        isResolved = true;
        clearTimeout(timeout);
        reject(err);
      }
    });

    ws.on("close", () => {
      if (!isResolved) {
        isResolved = true;
        clearTimeout(timeout);
        if (audioChunks.length > 0) {
          resolve(Buffer.concat(audioChunks));
        } else {
          reject(new Error("Connection closed before speech audio was received."));
        }
      }
    });
  });
}

/**
 * Splits text into natural sentence/phrase chunks under 180 characters.
 */
function splitTextIntoChunks(text: string, maxLen = 180): string[] {
  const sentences = text.match(/[^.!?]+[.!?]+|[^.!?]+$/g) || [text];
  const chunks: string[] = [];
  let currentChunk = "";

  for (const sentence of sentences) {
    const trimmed = sentence.trim();
    if (!trimmed) continue;
    if ((currentChunk + " " + trimmed).trim().length <= maxLen) {
      currentChunk = (currentChunk + " " + trimmed).trim();
    } else {
      if (currentChunk) chunks.push(currentChunk);
      if (trimmed.length > maxLen) {
        const words = trimmed.split(/\s+/);
        let wordChunk = "";
        for (const w of words) {
          if ((wordChunk + " " + w).trim().length <= maxLen) {
            wordChunk = (wordChunk + " " + w).trim();
          } else {
            if (wordChunk) chunks.push(wordChunk);
            wordChunk = w;
          }
        }
        currentChunk = wordChunk;
      } else {
        currentChunk = trimmed;
      }
    }
  }
  if (currentChunk) chunks.push(currentChunk);
  return chunks.length > 0 ? chunks : [text.slice(0, maxLen)];
}

/**
 * Fetches an individual audio chunk via Google Translate TTS.
 */
function fetchGoogleTTSChunk(chunk: string, lang: string): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const url = `https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=${encodeURIComponent(
      lang
    )}&q=${encodeURIComponent(chunk)}`;

    https
      .get(
        url,
        {
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
          },
        },
        (res) => {
          if (res.statusCode !== 200) {
            return reject(new Error(`Google TTS status ${res.statusCode}`));
          }
          const data: Buffer[] = [];
          res.on("data", (c) => data.push(c));
          res.on("end", () => resolve(Buffer.concat(data)));
        }
      )
      .on("error", reject);
  });
}

/**
 * High-speed fallback synthesis engine that converts text to MP3 via
 * multi-chunk audio concatenation. Completely resilient to datacenter IP blocks.
 */
async function synthesizeWithGoogleTTS(text: string, lang: string): Promise<Buffer> {
  const chunks = splitTextIntoChunks(text);
  const buffers = await Promise.all(chunks.map((c) => fetchGoogleTTSChunk(c, lang)));
  return Buffer.concat(buffers);
}

/**
 * Derives the two-letter language code from the voice identifier.
 */
function getLanguageFromVoice(voice: string): string {
  if (voice.startsWith("es-")) return "es";
  if (voice.startsWith("fr-")) return "fr";
  if (voice.startsWith("de-")) return "de";
  return "en";
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { text, voice = "en-US-JennyNeural", rate = 1.0, pitch = 0 } = body;

    if (!text || typeof text !== "string" || text.trim().length === 0) {
      return NextResponse.json(
        { error: "Text is required for speech synthesis." },
        { status: 400 }
      );
    }

    if (text.length > 3000) {
      return NextResponse.json(
        { error: "Text exceeds the maximum length of 3,000 characters per request." },
        { status: 400 }
      );
    }

    // Format prosody rate: 1.0 -> +0%, 1.25 -> +25%, 0.8 -> -20%
    const ratePercent = Math.round((Number(rate) - 1.0) * 100);
    const rateStr = ratePercent >= 0 ? `+${ratePercent}%` : `${ratePercent}%`;

    // Format prosody pitch: 0 -> +0Hz, 10 -> +10Hz, -15 -> -15Hz
    const pitchVal = Math.round(Number(pitch));
    const pitchStr = pitchVal >= 0 ? `+${pitchVal}Hz` : `${pitchVal}Hz`;

    const lang = getLanguageFromVoice(voice);

    let audioBuffer: Buffer | null = null;
    let usedEngine = "edge-neural";

    try {
      // 1. Attempt Edge Neural TTS (fast 3.5s timeout)
      audioBuffer = await synthesizeWithEdgeTTS(text, voice, rateStr, pitchStr);
    } catch (edgeErr: any) {
      console.warn(
        `Edge Neural TTS unavailable (${edgeErr.message}). Seamlessly engaging resilient fallback engine...`
      );
      // 2. Seamless Fallback: Google TTS Multi-Chunk MP3 engine
      usedEngine = "resilient-fallback";
      audioBuffer = await synthesizeWithGoogleTTS(text, lang);
    }

    if (!audioBuffer || audioBuffer.length === 0) {
      return NextResponse.json(
        { error: "Failed to generate audio from text." },
        { status: 500 }
      );
    }

    return new NextResponse(audioBuffer as any, {
      status: 200,
      headers: {
        "Content-Type": "audio/mpeg",
        "Content-Length": audioBuffer.length.toString(),
        "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
        "Content-Disposition": 'inline; filename="nexus-speech.mp3"',
        "X-TTS-Engine": usedEngine,
      },
    });
  } catch (error: any) {
    console.error("Text-to-speech route error:", error);
    return NextResponse.json(
      {
        error: error.message || "An unexpected error occurred during speech synthesis.",
      },
      { status: 500 }
    );
  }
}
