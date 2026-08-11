import { NextRequest, NextResponse } from 'next/server';

// Memory-based rate limiter (10 requests per minute per IP)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 10;
const WINDOW_MS = 60 * 1000;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + WINDOW_MS });
    return false;
  }

  if (now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + WINDOW_MS });
    return false;
  }

  if (record.count >= RATE_LIMIT) {
    return true;
  }

  record.count += 1;
  return false;
}

// Generate a procedural colorful SVG as a fallback when no API keys are present
// Generates beautiful gradients, geometry, and styling matches
function generateProceduralMockup(prompt: string, style: string, aspect: string, seed: number): string {
  // Simple hash function to derive reproducible variables from prompt/seed
  const getStringHash = (str: string): number => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = (hash << 5) - hash + str.charCodeAt(i);
      hash |= 0;
    }
    return Math.abs(hash);
  };

  const seedHash = getStringHash(prompt + String(seed));
  
  // Curated color gradient palettes
  const palettes = [
    { from: "#4f46e5", to: "#ec4899", text: "Sunset Cyberpunk" },
    { from: "#10b981", to: "#3b82f6", text: "Emerald Breeze" },
    { from: "#f59e0b", to: "#ef4444", text: "Warm Amber" },
    { from: "#8b5cf6", to: "#d946ef", text: "Nebula Dreams" },
    { from: "#06b6d4", to: "#3b82f6", text: "Deep Ocean" },
    { from: "#111827", to: "#374151", text: "Obsidian Slate" }
  ];

  const palette = palettes[seedHash % palettes.length];
  
  // Parse aspect ratio dimensions
  let w = 512;
  let h = 512;
  if (aspect === "16:9") { w = 896; h = 504; }
  else if (aspect === "9:16") { w = 504; h = 896; }
  else if (aspect === "4:3") { w = 640; h = 480; }
  else if (aspect === "3:2") { w = 768; h = 512; }
  else if (aspect === "2:3") { w = 512; h = 768; }

  // Generate procedural coordinates for floating glassmorphic shapes
  const shapesCount = 4 + (seedHash % 3);
  let shapesSvg = "";
  for (let i = 0; i < shapesCount; i++) {
    const rx = 50 + ((seedHash * (i + 1)) % (w - 100));
    const ry = 50 + ((seedHash * (i + 2)) % (h - 100));
    const rSize = 30 + ((seedHash * (i + 3)) % 80);
    const opacity = 0.15 + (((seedHash * (i + 4)) % 10) / 40);
    const color = i % 2 === 0 ? "#ffffff" : palette.to;
    shapesSvg += `<circle cx="${rx}" cy="${ry}" r="${rSize}" fill="${color}" opacity="${opacity}" filter="blur(20px)" />\n`;
  }

  // Escape prompt text for XML safety
  const cleanPrompt = prompt
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

  // Create clean short prompt description for display overlay
  const displayPrompt = cleanPrompt.length > 80 ? cleanPrompt.substring(0, 77) + "..." : cleanPrompt;

  // Build complete SVG code
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="100%" height="100%">
    <defs>
      <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${palette.from}" />
        <stop offset="100%" stop-color="${palette.to}" />
      </linearGradient>
      <linearGradient id="cardGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#ffffff" stop-opacity="0.15" />
        <stop offset="100%" stop-color="#ffffff" stop-opacity="0.05" />
      </linearGradient>
    </defs>

    <!-- Background -->
    <rect width="100%" height="100%" fill="url(#bgGrad)" />
    
    <!-- Floating particles -->
    ${shapesSvg}

    <!-- Glassmorphic Card Container -->
    <rect x="${w * 0.08}" y="${h * 0.1}" width="${w * 0.84}" height="${h * 0.8}" rx="20" fill="url(#cardGrad)" stroke="#ffffff" stroke-opacity="0.25" stroke-width="1.5" />

    <!-- Prompt Information Overlay -->
    <g transform="translate(${w * 0.15}, ${h * 0.25})">
      <!-- AI Generator watermark tag -->
      <rect x="0" y="0" width="120" height="22" rx="11" fill="#000000" fill-opacity="0.3" />
      <text x="60" y="14" font-family="system-ui, -apple-system, sans-serif" font-size="10" font-weight="800" fill="#ffffff" text-anchor="middle" letter-spacing="1">SANDBOX MOCK</text>
      
      <!-- Preset Badge -->
      <rect x="130" y="0" width="110" height="22" rx="11" fill="${palette.from}" fill-opacity="0.8" />
      <text x="185" y="14" font-family="system-ui, -apple-system, sans-serif" font-size="10" font-weight="700" fill="#ffffff" text-anchor="middle">${style}</text>

      <!-- Prompt text display -->
      <text x="0" y="60" font-family="system-ui, -apple-system, sans-serif" font-size="18" font-weight="800" fill="#ffffff" width="${w * 0.6}">
        <tspan x="0" dy="0">" ${displayPrompt} "</tspan>
      </text>
      
      <!-- Metadata parameters -->
      <text x="0" y="${h * 0.4}" font-family="system-ui, -apple-system, sans-serif" font-size="11" fill="#ffffff" fill-opacity="0.7">
        <tspan x="0" dy="0">Provider: Sandbox Fallback Engine</tspan>
        <tspan x="0" dy="18">Seed: ${seed} &nbsp;•&nbsp; Aspect: ${aspect} &nbsp;•&nbsp; Resolution: ${w}x${h}</tspan>
        <tspan x="0" dy="25" font-weight="bold" fill="#ffffff">To generate real images, set GEMINI_API_KEY or OPENAI_API_KEY in .env.local</tspan>
      </text>
    </g>
  </svg>`;

  // Convert SVG string to base64
  const base64Svg = Buffer.from(svg).toString('base64');
  return `data:image/svg+xml;base64,${base64Svg}`;
}

export async function POST(req: NextRequest) {
  // 1. Get Client IP and verify Rate Limiting
  const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || '127.0.0.1';
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please wait a minute before generating more images." },
      { status: 429 }
    );
  }

  try {
    const body = await req.json();
    const { 
      prompt, 
      negativePrompt = '', 
      provider = 'sandbox', 
      style = 'Photorealistic', 
      aspectRatio = '1:1', 
      size = '1024x1024', 
      seed = Math.floor(Math.random() * 1000000), 
      numImages = 1,
      creativity = 0.7,
      guidanceScale = 7.5
    } = body;

    // 2. Validate Prompt
    if (!prompt || typeof prompt !== 'string' || prompt.trim() === '') {
      return NextResponse.json({ error: "Prompt text is required." }, { status: 400 });
    }

    if (prompt.length > 1000) {
      return NextResponse.json({ error: "Prompt is too long. Maximum characters allowed is 1000." }, { status: 400 });
    }

    // Basic prompt moderation checklist
    const blockedKeywords = ['nsfw', 'porn', 'naked', 'gore', 'violence', 'blood', 'abuse'];
    const lowerPrompt = prompt.toLowerCase();
    if (blockedKeywords.some(keyword => lowerPrompt.includes(keyword))) {
      return NextResponse.json(
        { error: "Your prompt contains terms that violate our safety policies. Please revise your text." },
        { status: 400 }
      );
    }

    // 3. Environment API Key Checks
    const geminiKey = process.env.GEMINI_API_KEY;
    const openaiKey = process.env.OPENAI_API_KEY;
    const stabilityKey = process.env.STABILITY_API_KEY;

    // Expand prompt with styling presets
    let expandedPrompt = prompt;
    if (style && style !== 'None') {
      expandedPrompt = `${prompt}, styled as a ${style.toLowerCase()}`;
    }

    // 4. Provider Routing Implementation
    
    // --- Google Gemini (Imagen 3) ---
    if (provider === 'gemini' && geminiKey) {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-002:generateImages?key=${geminiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            prompt: expandedPrompt,
            numberOfImages: Math.min(numImages, 4), // Gemini Imagen supports up to 4
            aspectRatio: aspectRatio,
            outputMimeType: "image/jpeg"
          })
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Google Gemini generation failed: ${errorText}`);
      }

      const resData = await response.json();
      if (!resData.generatedImages || resData.generatedImages.length === 0) {
        throw new Error("Google Gemini API returned empty image array.");
      }

      const images = resData.generatedImages.map((img: any) => ({
        base64: `data:image/jpeg;base64,${img.image.imageBytes}`,
        seed,
        provider: 'gemini'
      }));

      // Log success (DB Schema ready hook)
      // await logGenerationToDB({ userId, prompt, provider, imagesCount: images.length });

      return NextResponse.json({ status: 'success', images });
    }

    // --- OpenAI (DALL-E 3) ---
    if (provider === 'openai' && openaiKey) {
      // DALL-E 3 only supports generating 1 image at a time
      const response = await fetch('https://api.openai.com/v1/images/generations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${openaiKey}`
        },
        body: JSON.stringify({
          prompt: expandedPrompt,
          model: "dall-e-3",
          n: 1,
          size: size === '2048x2048' ? '1024x1024' : size, // fallback safety
          response_format: "b64_json"
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`OpenAI DALL-E failed: ${errorData?.error?.message || response.statusText}`);
      }

      const resData = await response.json();
      if (!resData.data || resData.data.length === 0) {
        throw new Error("OpenAI DALL-E API returned empty data payload.");
      }

      const images = resData.data.map((img: any) => ({
        base64: `data:image/png;base64,${img.b64_json}`,
        seed,
        provider: 'openai'
      }));

      return NextResponse.json({ status: 'success', images });
    }

    // --- Stability AI (Flux / Core) ---
    if ((provider === 'stability' || provider === 'flux') && stabilityKey) {
      const formData = new FormData();
      formData.append('prompt', expandedPrompt);
      if (negativePrompt) formData.append('negative_prompt', negativePrompt);
      formData.append('aspect_ratio', aspectRatio);
      formData.append('output_format', 'png');
      formData.append('seed', String(seed));

      const response = await fetch('https://api.stability.ai/v2beta/stable-image/generate/core', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${stabilityKey}`,
          'Accept': 'application/json'
        },
        body: formData
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Stability AI generation failed: ${errorData?.errors?.join(', ') || response.statusText}`);
      }

      const resData = await response.json();
      if (!resData.image) {
        throw new Error("Stability AI API did not return image string.");
      }

      const images = [{
        base64: `data:image/png;base64,${resData.image}`,
        seed,
        provider: provider
      }];

      return NextResponse.json({ status: 'success', images });
    }

    // --- Fallback Procedural Art Engine (Sandbox Sandbox Mode) ---
    // Runs when no keys are found in environment variables.
    // Simulates generating multiple images if requested by varying seeds.
    const images = [];
    for (let i = 0; i < numImages; i++) {
      const targetSeed = Number(seed) + i;
      const base64Data = generateProceduralMockup(prompt, style, aspectRatio, targetSeed);
      images.push({
        base64: base64Data,
        seed: targetSeed,
        provider: 'sandbox'
      });
    }

    // Add brief artificial delay to simulate real network queue experience
    await new Promise(resolve => setTimeout(resolve, 1500));

    return NextResponse.json({
      status: 'success',
      isSandbox: true,
      images,
      message: "Generated sandbox mockup assets. To connect real AI models, configure GEMINI_API_KEY, OPENAI_API_KEY, or STABILITY_API_KEY in your environment."
    });

  } catch (err: any) {
    console.error("AI Generation API Route Error:", err);
    return NextResponse.json(
      { error: err?.message || "An unexpected error occurred during AI image generation." },
      { status: 500 }
    );
  }
}
