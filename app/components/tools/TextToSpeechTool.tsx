"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import {
  Volume2,
  VolumeX,
  Play,
  Pause,
  RotateCcw,
  Download,
  Sparkles,
  Sliders,
  Globe,
  User,
  Copy,
  Check,
  Trash2,
  Clock,
  FileText,
  AlertCircle,
  Headphones,
  Wand2,
} from "lucide-react";

interface VoiceOption {
  id: string;
  name: string;
  gender: "Female" | "Male";
  locale: string;
  localeName: string;
  flag: string;
  tag: string;
  previewText: string;
}

const VOICES: VoiceOption[] = [
  // English (US)
  {
    id: "en-US-JennyNeural",
    name: "Jenny",
    gender: "Female",
    locale: "en-US",
    localeName: "English (US)",
    flag: "🇺🇸",
    tag: "Warm & Conversational",
    previewText: "Hello! I am Jenny, a warm and friendly conversational voice.",
  },
  {
    id: "en-US-GuyNeural",
    name: "Guy",
    gender: "Male",
    locale: "en-US",
    localeName: "English (US)",
    flag: "🇺🇸",
    tag: "Casual & Engaging",
    previewText: "Hey there! I am Guy, great for YouTube narration and casual audio.",
  },
  {
    id: "en-US-AriaNeural",
    name: "Aria",
    gender: "Female",
    locale: "en-US",
    localeName: "English (US)",
    flag: "🇺🇸",
    tag: "News & Corporate",
    previewText: "Good day. I am Aria, designed for professional broadcasts and presentations.",
  },
  // English (UK)
  {
    id: "en-GB-SoniaNeural",
    name: "Sonia",
    gender: "Female",
    locale: "en-GB",
    localeName: "English (UK)",
    flag: "🇬🇧",
    tag: "Articulate & Storytelling",
    previewText: "Greetings! I am Sonia, offering a polished British accent for audiobooks.",
  },
  {
    id: "en-GB-RyanNeural",
    name: "Ryan",
    gender: "Male",
    locale: "en-GB",
    localeName: "English (UK)",
    flag: "🇬🇧",
    tag: "Crisp & Energetic",
    previewText: "Hello! I am Ryan, perfect for modern British podcast voiceovers.",
  },
  // Spanish (Spain & Latin America)
  {
    id: "es-ES-AlvaroNeural",
    name: "Álvaro",
    gender: "Male",
    locale: "es-ES",
    localeName: "Spanish (Spain)",
    flag: "🇪🇸",
    tag: "Natural & Expressive",
    previewText: "¡Hola! Soy Álvaro, con una voz clara y natural en español de España.",
  },
  {
    id: "es-ES-ElviraNeural",
    name: "Elvira",
    gender: "Female",
    locale: "es-ES",
    localeName: "Spanish (Spain)",
    flag: "🇪🇸",
    tag: "Warm & Melodic",
    previewText: "Hola, soy Elvira. Me alegra ayudarte a crear narraciones en español.",
  },
  {
    id: "es-MX-DaliaNeural",
    name: "Dalia",
    gender: "Female",
    locale: "es-MX",
    localeName: "Spanish (Mexico)",
    flag: "🇲🇽",
    tag: "Latin American Clear",
    previewText: "Hola, soy Dalia. Ofrezco una entonación amigable en español latino.",
  },
  {
    id: "es-MX-JorgeNeural",
    name: "Jorge",
    gender: "Male",
    locale: "es-MX",
    localeName: "Spanish (Mexico)",
    flag: "🇲🇽",
    tag: "Latin American Dynamic",
    previewText: "Qué tal, soy Jorge. Ideal para tutoriales y videos explicativos.",
  },
  // French (France & Canada)
  {
    id: "fr-FR-DeniseNeural",
    name: "Denise",
    gender: "Female",
    locale: "fr-FR",
    localeName: "French (France)",
    flag: "🇫🇷",
    tag: "Elegant & Articulate",
    previewText: "Bonjour ! Je m'appelle Denise, une voix française douce et articulée.",
  },
  {
    id: "fr-FR-HenriNeural",
    name: "Henri",
    gender: "Male",
    locale: "fr-FR",
    localeName: "French (France)",
    flag: "🇫🇷",
    tag: "Professional & Calm",
    previewText: "Bonjour. Je suis Henri, parfait pour vos documents et cours audio.",
  },
  {
    id: "fr-CA-SylvieNeural",
    name: "Sylvie",
    gender: "Female",
    locale: "fr-CA",
    localeName: "French (Canada)",
    flag: "🇨🇦",
    tag: "Canadian French",
    previewText: "Bonjour tout le monde ! Je suis Sylvie avec un accent québécois naturel.",
  },
  // German (Germany & Austria)
  {
    id: "de-DE-KatjaNeural",
    name: "Katja",
    gender: "Female",
    locale: "de-DE",
    localeName: "German (Germany)",
    flag: "🇩🇪",
    tag: "Clear & Natural",
    previewText: "Guten Tag! Ich bin Katja, eine natürliche deutsche Stimme für Ihre Texte.",
  },
  {
    id: "de-DE-ConradNeural",
    name: "Conrad",
    gender: "Male",
    locale: "de-DE",
    localeName: "German (Germany)",
    flag: "🇩🇪",
    tag: "Authoritative & Deep",
    previewText: "Hallo! Ich bin Conrad, ideal für Dokumentationen und Präsentationen.",
  },
  {
    id: "de-AT-IngridNeural",
    name: "Ingrid",
    gender: "Female",
    locale: "de-AT",
    localeName: "German (Austria)",
    flag: "🇦🇹",
    tag: "Austrian Standard",
    previewText: "Grüß Gott! Ich bin Ingrid mit einer feinen österreichischen Aussprache.",
  },
];

const PRESETS = [
  {
    label: "🎬 YouTube Intro",
    text: "Welcome back to the channel! In today's video, we are exploring the most exciting technology innovations of this year. Be sure to hit that subscribe button and let's get right into it.",
  },
  {
    label: "📖 Audiobook",
    text: "The night air was crisp and still, carrying the scent of pine needles and distant rain. Through the dense canopy of trees, a single beam of moonlight illuminated the ancient stone path.",
  },
  {
    label: "📢 News Anchor",
    text: "Good evening. Leading our top stories tonight: global markets rallied today following positive economic indicators and record growth in green energy infrastructure worldwide.",
  },
  {
    label: "⚡ Product Ad",
    text: "Say goodbye to complicated setups. Introducing the all-new ultra-compact workstation, engineered for unmatched speed, quiet cooling, and total creative freedom. Order yours today.",
  },
];

export function TextToSpeechTool() {
  const [text, setText] = useState<string>(
    "Welcome to Nexus Calculator Hub! You can convert any text into natural, studio-quality speech with customizable voices, pitch, and speed. Try listening now or download the MP3."
  );
  const [selectedVoiceId, setSelectedVoiceId] = useState<string>("en-US-JennyNeural");
  const [languageFilter, setLanguageFilter] = useState<string>("all");
  const [rate, setRate] = useState<number>(1.0);
  const [pitch, setPitch] = useState<number>(0);

  // Audio Playback State
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [volume, setVolume] = useState<number>(1.0);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [previewingVoiceId, setPreviewingVoiceId] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const selectedVoice = useMemo(() => {
    return VOICES.find((v) => v.id === selectedVoiceId) || VOICES[0];
  }, [selectedVoiceId]);

  const filteredVoices = useMemo(() => {
    if (languageFilter === "all") return VOICES;
    return VOICES.filter((v) => v.locale.startsWith(languageFilter));
  }, [languageFilter]);

  // Metrics
  const charCount = text.length;
  const wordCount = useMemo(() => {
    return text.trim() ? text.trim().split(/\s+/).length : 0;
  }, [text]);

  const estimatedReadingTimeSec = useMemo(() => {
    const wordsPerMinute = 150 * rate;
    return Math.max(1, Math.round((wordCount / wordsPerMinute) * 60));
  }, [wordCount, rate]);

  // Clean up object URLs to prevent memory leaks
  useEffect(() => {
    return () => {
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
    };
  }, [audioUrl]);

  // Audio element listeners
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => setDuration(audio.duration);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [audioUrl]);

  // Generate Audio
  const handleGenerate = async (customText?: string, customVoiceId?: string, isPreview = false) => {
    const textToSpeak = customText || text;
    const voiceToUse = customVoiceId || selectedVoiceId;

    if (!textToSpeak.trim()) {
      setErrorMsg("Please enter text before generating audio.");
      return;
    }

    if (!isPreview) {
      setIsLoading(true);
      setErrorMsg(null);
    } else {
      setPreviewingVoiceId(voiceToUse);
    }

    try {
      const response = await fetch("/api/tools/text-to-speech", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: textToSpeak,
          voice: voiceToUse,
          rate: isPreview ? 1.0 : rate,
          pitch: isPreview ? 0 : pitch,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Server responded with status ${response.status}`);
      }

      const blob = await response.blob();
      const newUrl = URL.createObjectURL(blob);

      if (isPreview) {
        const tempAudio = new Audio(newUrl);
        tempAudio.play();
        tempAudio.onended = () => {
          setPreviewingVoiceId(null);
          URL.revokeObjectURL(newUrl);
        };
      } else {
        if (audioUrl) {
          URL.revokeObjectURL(audioUrl);
        }
        setAudioUrl(newUrl);
        setIsPlaying(true);
        if (audioRef.current) {
          audioRef.current.src = newUrl;
          audioRef.current.play().catch(() => {
            // Autoplay policy prevented immediate playback
            setIsPlaying(false);
          });
        }
      }
    } catch (err: any) {
      console.error("Speech synthesis failed:", err);
      setErrorMsg(
        err.message ||
          "Failed to synthesize voice with cloud engine. You can still test in browser."
      );
    } finally {
      if (!isPreview) {
        setIsLoading(false);
      }
    }
  };

  const togglePlayPause = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = Number(e.target.value);
    setCurrentTime(time);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setVolume(val);
    if (audioRef.current) {
      audioRef.current.volume = val;
      audioRef.current.muted = val === 0;
      setIsMuted(val === 0);
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    const newMute = !isMuted;
    setIsMuted(newMute);
    audioRef.current.muted = newMute;
  };

  const handleCopyText = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadMp3 = () => {
    if (!audioUrl) return;
    const link = document.createElement("a");
    link.href = audioUrl;
    const cleanSnippet = text
      .trim()
      .slice(0, 30)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
    link.download = `nexus-voice-${cleanSnippet || "speech"}.mp3`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      {/* Hidden Audio Element */}
      <audio ref={audioRef} />

      {/* Hero Badge */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-[#518231]/10 to-teal-500/10 border border-[#518231]/20">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#518231] text-white rounded-xl shadow-sm">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span>Studio Neural Text-to-Speech</span>
              <span className="text-[10px] uppercase font-extrabold px-2 py-0.5 rounded-full bg-[#518231] text-white">
                Ultra-Realistic
              </span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Natural human breath cadence, studio acoustics, and free MP3 exports across 4 languages.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-300">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          Microsoft Neural TTS Engine
        </div>
      </div>

      {/* Preset Prompts Pill Bar */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
          <Wand2 className="w-3.5 h-3.5" />
          Quick Test Presets:
        </div>
        <div className="flex flex-wrap gap-2">
          {PRESETS.map((preset) => (
            <button
              key={preset.label}
              type="button"
              onClick={() => setText(preset.text)}
              className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 hover:border-[#518231] dark:hover:border-[#518231] text-xs font-medium text-slate-700 dark:text-slate-300 hover:text-[#518231] transition-all shadow-sm active:scale-95"
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Script Editor (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm p-5 sm:p-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-3">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#518231]" />
              <span className="text-sm font-bold text-slate-900 dark:text-white">Script Editor</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopyText}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-xs flex items-center gap-1"
                title="Copy script"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span className="hidden sm:inline">{copied ? "Copied" : "Copy"}</span>
              </button>
              <button
                type="button"
                onClick={() => setText("")}
                className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors text-xs flex items-center gap-1"
                title="Clear text"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Clear</span>
              </button>
            </div>
          </div>

          {/* Text Area */}
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value.slice(0, 3000))}
            placeholder="Type or paste your text here to convert into natural speech..."
            className="w-full flex-1 min-h-[220px] sm:min-h-[260px] p-4 rounded-2xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800/80 focus:border-[#518231] focus:ring-2 focus:ring-[#518231]/20 outline-none text-slate-900 dark:text-slate-100 text-sm sm:text-[15px] leading-relaxed resize-y font-normal transition-all"
          />

          {/* Editor Stats Footer */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 mt-3 text-xs text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-4">
              <span>
                Words: <strong className="text-slate-700 dark:text-slate-200">{wordCount}</strong>
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                Est. Duration: <strong className="text-slate-700 dark:text-slate-200">~{estimatedReadingTimeSec}s</strong>
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className={charCount >= 2800 ? "text-amber-600 font-bold" : ""}>
                {charCount} / 3,000 chars
              </span>
              <div className="w-16 h-1.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                <div
                  className={`h-full transition-all ${
                    charCount > 2800 ? "bg-amber-500" : "bg-[#518231]"
                  }`}
                  style={{ width: `${Math.min(100, (charCount / 3000) * 100)}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Voice & Prosody Controls (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col space-y-6">
          {/* Voice Selector Box */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm p-5 sm:p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-[#518231]" />
                <span className="text-sm font-bold text-slate-900 dark:text-white">Voice &amp; Language</span>
              </div>

              {/* Language Filter */}
              <select
                value={languageFilter}
                onChange={(e) => setLanguageFilter(e.target.value)}
                className="text-xs py-1 px-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 border-none font-medium text-slate-700 dark:text-slate-200 outline-none cursor-pointer"
              >
                <option value="all">🌐 All Languages</option>
                <option value="en">🇺🇸 / 🇬🇧 English</option>
                <option value="es">🇪🇸 / 🇲🇽 Spanish</option>
                <option value="fr">🇫🇷 / 🇨🇦 French</option>
                <option value="de">🇩🇪 / 🇦🇹 German</option>
              </select>
            </div>

            {/* Voice Cards List */}
            <div className="space-y-2 max-h-[220px] overflow-y-auto custom-scrollbar pr-1">
              {filteredVoices.map((v) => {
                const isSelected = v.id === selectedVoiceId;
                const isPreviewing = previewingVoiceId === v.id;

                return (
                  <div
                    key={v.id}
                    onClick={() => setSelectedVoiceId(v.id)}
                    className={`group flex items-center justify-between p-2.5 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? "bg-[#518231]/10 border-[#518231] dark:bg-[#518231]/15"
                        : "bg-slate-50/50 dark:bg-slate-800/30 border-slate-200/60 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="text-lg shrink-0">{v.flag}</span>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold text-slate-900 dark:text-white truncate">
                            {v.name}
                          </span>
                          <span className="text-[10px] px-1.5 py-0.2 rounded-md bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 font-medium">
                            {v.gender}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                          {v.tag}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleGenerate(v.previewText, v.id, true);
                      }}
                      disabled={isPreviewing}
                      className="p-1.5 rounded-lg text-slate-400 group-hover:text-[#518231] hover:bg-slate-200/60 dark:hover:bg-slate-700/60 transition-colors shrink-0"
                      title={`Preview ${v.name}'s voice`}
                    >
                      {isPreviewing ? (
                        <div className="w-3.5 h-3.5 border-2 border-[#518231] border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <Volume2 className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Prosody Tuning Sliders */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm p-5 sm:p-6 space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
              <Sliders className="w-4 h-4 text-[#518231]" />
              <span className="text-sm font-bold text-slate-900 dark:text-white">Fine-Tuning Controls</span>
            </div>

            {/* Speaking Rate */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                <span>Speaking Rate (Speed)</span>
                <span className="text-[#518231] font-bold">{rate.toFixed(2)}x</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="2.0"
                step="0.05"
                value={rate}
                onChange={(e) => setRate(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-[#518231]"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>0.5x (Slow)</span>
                <button
                  type="button"
                  onClick={() => setRate(1.0)}
                  className="hover:text-[#518231] font-semibold"
                >
                  Reset (1.0x)
                </button>
                <span>2.0x (Fast)</span>
              </div>
            </div>

            {/* Voice Pitch */}
            <div className="space-y-1.5 pt-2">
              <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                <span>Voice Pitch</span>
                <span className="text-[#518231] font-bold">
                  {pitch > 0 ? `+${pitch}Hz` : `${pitch}Hz`}
                </span>
              </div>
              <input
                type="range"
                min="-50"
                max="50"
                step="5"
                value={pitch}
                onChange={(e) => setPitch(parseInt(e.target.value, 10))}
                className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-[#518231]"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>-50Hz (Deep)</span>
                <button
                  type="button"
                  onClick={() => setPitch(0)}
                  className="hover:text-[#518231] font-semibold"
                >
                  Reset (0Hz)
                </button>
                <span>+50Hz (High)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Generate Button */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-3xl bg-slate-900 dark:bg-slate-800 text-white shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#518231] flex items-center justify-center shrink-0">
            <Headphones className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-xs text-slate-400">Active Persona:</div>
            <div className="text-sm font-bold text-white flex items-center gap-2">
              <span>{selectedVoice.flag}</span>
              <span>{selectedVoice.name}</span>
              <span className="text-xs text-slate-400 font-normal">({selectedVoice.localeName})</span>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => handleGenerate()}
          disabled={isLoading || !text.trim()}
          className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-[#518231] hover:bg-[#436a28] disabled:opacity-50 disabled:cursor-not-allowed font-extrabold text-sm sm:text-base text-white shadow-lg shadow-[#518231]/30 transition-all transform active:scale-95 flex items-center justify-center gap-2 shrink-0"
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Synthesizing Voice...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              <span>Generate Voice</span>
            </>
          )}
        </button>
      </div>

      {/* Error Banner */}
      {errorMsg && (
        <div className="p-4 rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/60 flex items-start gap-3 text-red-700 dark:text-red-300 text-sm">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <div className="flex-1">
            <div className="font-bold">Synthesis Note:</div>
            <div>{errorMsg}</div>
          </div>
        </div>
      )}

      {/* Audio Waveform Player & Download Bar */}
      {audioUrl && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border-2 border-[#518231]/40 dark:border-[#518231]/50 shadow-xl p-6 sm:p-8 space-y-6 animate-in fade-in slide-in-from-bottom-3 duration-300">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                Ready for Playback &amp; Export
              </span>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span>{selectedVoice.name} Voiceover Preview</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-normal">
                  48kbps MP3
                </span>
              </h3>
            </div>

            {/* Direct 1-Click MP3 Download */}
            <button
              type="button"
              onClick={handleDownloadMp3}
              className="px-5 py-2.5 rounded-xl bg-[#518231] hover:bg-[#436a28] text-white font-bold text-sm shadow-md shadow-[#518231]/20 flex items-center justify-center gap-2 transition-all active:scale-95 shrink-0"
            >
              <Download className="w-4 h-4" />
              <span>Download MP3 Audio</span>
            </button>
          </div>

          {/* Interactive Player Controls */}
          <div className="space-y-3">
            {/* Timeline Progress Slider */}
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-slate-500 dark:text-slate-400 w-10 text-right">
                {formatTime(currentTime)}
              </span>
              <input
                type="range"
                min="0"
                max={duration || 1}
                step="0.1"
                value={currentTime}
                onChange={handleSeek}
                className="flex-1 h-2 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#518231]"
              />
              <span className="text-xs font-mono text-slate-500 dark:text-slate-400 w-10">
                {formatTime(duration)}
              </span>
            </div>

            {/* Control Buttons */}
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={togglePlayPause}
                  className="w-11 h-11 rounded-full bg-[#518231] text-white flex items-center justify-center hover:bg-[#436a28] shadow-md transition-all active:scale-95"
                >
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (audioRef.current) {
                      audioRef.current.currentTime = 0;
                      audioRef.current.play();
                      setIsPlaying(true);
                    }
                  }}
                  className="p-2.5 rounded-full text-slate-500 hover:text-slate-800 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  title="Replay from beginning"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                {/* Animated Wave Bars */}
                {isPlaying && (
                  <div className="flex items-center gap-0.5 ml-3 h-5">
                    <span className="w-1 bg-[#518231] rounded-full animate-[bounce_0.6s_infinite_100ms] h-3" />
                    <span className="w-1 bg-[#518231] rounded-full animate-[bounce_0.6s_infinite_250ms] h-5" />
                    <span className="w-1 bg-[#518231] rounded-full animate-[bounce_0.6s_infinite_150ms] h-4" />
                    <span className="w-1 bg-[#518231] rounded-full animate-[bounce_0.6s_infinite_300ms] h-2" />
                    <span className="w-1 bg-[#518231] rounded-full animate-[bounce_0.6s_infinite_200ms] h-4" />
                  </div>
                )}
              </div>

              {/* Volume Slider */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={toggleMute}
                  className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  {isMuted || volume === 0 ? (
                    <VolumeX className="w-4 h-4" />
                  ) : (
                    <Volume2 className="w-4 h-4" />
                  )}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="w-20 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-[#518231]"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
