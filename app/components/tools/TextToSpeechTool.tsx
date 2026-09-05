"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import { useLocale } from "next-intl";
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
  Radio,
  Users,
  Music,
  Smile,
  Undo2,
  PlusCircle,
} from "lucide-react";
import {
  AmbientAudioEngine,
  AMBIENT_TRACKS,
  AmbientTrackId,
} from "@/lib/audio/ambientSynth";

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
  // Bangla (Bangladesh & India)
  {
    id: "bn-BD-NabanitaNeural",
    name: "Nabanita (নবনিতা)",
    gender: "Female",
    locale: "bn-BD",
    localeName: "Bangla (Bangladesh)",
    flag: "🇧🇩",
    tag: "মিষ্টি ও স্পষ্ট নারী কণ্ঠ",
    previewText: "নমস্কার! আমি নবনিতা, একটি অত্যন্ত স্পষ্ট ও মিষ্টি বাংলা ভয়েস।",
  },
  {
    id: "bn-BD-PradeepNeural",
    name: "Pradeep (প্রদীপ)",
    gender: "Male",
    locale: "bn-BD",
    localeName: "Bangla (Bangladesh)",
    flag: "🇧🇩",
    tag: "গম্ভীর ও প্রাঞ্জল পুরুষ কণ্ঠ",
    previewText: "হ্যালো! আমি প্রদীপ, যেকোনো ভিডিও বা অডিওবুকের জন্য সাবলীল কণ্ঠস্বর।",
  },
  {
    id: "bn-IN-BashkarNeural",
    name: "Bashkar (ভাস্কর)",
    gender: "Male",
    locale: "bn-IN",
    localeName: "Bangla (India)",
    flag: "🇮🇳",
    tag: "পশ্চিমবঙ্গীয় পুরুষ কণ্ঠ",
    previewText: "নমস্কার! আমি ভাস্কর, আপনার লেখার সুন্দর উপস্থাপনা করতে প্রস্তুত।",
  },
  {
    id: "bn-IN-TanishaaNeural",
    name: "Tanishaa (তানিশা)",
    gender: "Female",
    locale: "bn-IN",
    localeName: "Bangla (India)",
    flag: "🇮🇳",
    tag: "সাবলীল ও আধুনিক নারী কণ্ঠ",
    previewText: "নমস্কার! আমি তানিশা, প্রাঞ্জল ও আন্তরিক উচ্চারণের বাংলা কণ্ঠস্বর।",
  },
  // Portuguese (Brazil)
  {
    id: "pt-BR-FranciscaNeural",
    name: "Francisca",
    gender: "Female",
    locale: "pt-BR",
    localeName: "Portuguese (Brazil)",
    flag: "🇧🇷",
    tag: "Caloroso & Expressivo",
    previewText: "Olá! Eu sou Francisca, pronta para dar voz aos seus melhores projetos.",
  },
  {
    id: "pt-BR-AntonioNeural",
    name: "Antonio",
    gender: "Male",
    locale: "pt-BR",
    localeName: "Portuguese (Brazil)",
    flag: "🇧🇷",
    tag: "Confiante & Profissional",
    previewText: "Olá a todos! Sou Antonio, excelente para narrações e vídeos dinâmicos.",
  },
  // Italian
  {
    id: "it-IT-ElsaNeural",
    name: "Elsa",
    gender: "Female",
    locale: "it-IT",
    localeName: "Italian (Italy)",
    flag: "🇮🇹",
    tag: "Elegante & Naturale",
    previewText: "Ciao! Sono Elsa, offro una voce naturale e melodica in italiano.",
  },
  {
    id: "it-IT-DiegoNeural",
    name: "Diego",
    gender: "Male",
    locale: "it-IT",
    localeName: "Italian (Italy)",
    flag: "🇮🇹",
    tag: "Chiaro & Dinamico",
    previewText: "Buongiorno! Sono Diego, perfetto per audiolibri e spiegazioni aziendali.",
  },
  // Japanese
  {
    id: "ja-JP-NanamiNeural",
    name: "Nanami (七海)",
    gender: "Female",
    locale: "ja-JP",
    localeName: "Japanese (Japan)",
    flag: "🇯🇵",
    tag: "丁寧で自然な日本語",
    previewText: "こんにちは！七海です。自然で聞き取りやすい日本語の音声をお届けします。",
  },
  {
    id: "ja-JP-KeitaNeural",
    name: "Keita (圭太)",
    gender: "Male",
    locale: "ja-JP",
    localeName: "Japanese (Japan)",
    flag: "🇯🇵",
    tag: "信頼感のある男性声",
    previewText: "こんにちは！圭太です。ビジネスやナレーションに最適な日本語音声です。",
  },
  // Hindi
  {
    id: "hi-IN-SwaraNeural",
    name: "Swara (स्वरा)",
    gender: "Female",
    locale: "hi-IN",
    localeName: "Hindi (India)",
    flag: "🇮🇳",
    tag: "स्पष्ट और मधुर हिन्दी",
    previewText: "नमस्ते! मैं स्वरा हूँ, आपकी कहानियों और वीडियो के लिए एक स्पष्ट और मधुर आवाज़।",
  },
  {
    id: "hi-IN-MadhurNeural",
    name: "Madhur (मधुर)",
    gender: "Male",
    locale: "hi-IN",
    localeName: "Hindi (India)",
    flag: "🇮🇳",
    tag: "गंभीर और आत्मविश्वास",
    previewText: "नमस्कार! मैं मधुर हूँ, पॉडकास्ट और विज्ञापनों के लिए एक बेहतरीन आवाज़।",
  },
  // Arabic
  {
    id: "ar-SA-ZariyahNeural",
    name: "Zariyah (زارية)",
    gender: "Female",
    locale: "ar-SA",
    localeName: "Arabic (Saudi Arabia)",
    flag: "🇸🇦",
    tag: "فصحى واضحة وجميلة",
    previewText: "أهلاً بك! أنا زارية، أقدم لك صوتاً عربياً فصيحاً وطبيعياً لمشاريعك.",
  },
  {
    id: "ar-SA-HamedNeural",
    name: "Hamed (حامد)",
    gender: "Male",
    locale: "ar-SA",
    localeName: "Arabic (Saudi Arabia)",
    flag: "🇸🇦",
    tag: "وقور وواضح",
    previewText: "مرحباً! أنا حامد، مستعد لمساعدتك في إنتاج تعليق صوتي احترافي.",
  },
  // Chinese (Mandarin)
  {
    id: "zh-CN-XiaoxiaoNeural",
    name: "Xiaoxiao (晓晓)",
    gender: "Female",
    locale: "zh-CN",
    localeName: "Chinese (Mandarin)",
    flag: "🇨🇳",
    tag: "生动亲切的标准普通话",
    previewText: "你好！我是晓晓，能为您提供温暖自然、标准生动的普通话语音。",
  },
  {
    id: "zh-CN-YunxiNeural",
    name: "Yunxi (云希)",
    gender: "Male",
    locale: "zh-CN",
    localeName: "Chinese (Mandarin)",
    flag: "🇨🇳",
    tag: "沉稳阳光的叙事之声",
    previewText: "你好！我是云希，适合用于科技讲解、有声读物和视频解说。",
  },
];

interface EmotionStyle {
  id: string;
  name: string;
  icon: string;
  desc: string;
  pitchOffset: number;
  rateOffset: number;
}

const EMOTIONS: EmotionStyle[] = [
  { id: "default", name: "Natural Studio", icon: "🎙️", desc: "Balanced cadence & natural timbre", pitchOffset: 0, rateOffset: 1.0 },
  { id: "chat", name: "Conversational", icon: "💬", desc: "Warm everyday conversational tone", pitchOffset: 3, rateOffset: 1.05 },
  { id: "newscast", name: "News Anchor", icon: "📰", desc: "Authoritative broadcast cadence", pitchOffset: -5, rateOffset: 1.0 },
  { id: "narration-professional", name: "Storyteller", icon: "📖", desc: "Narrative pacing with expressive pauses", pitchOffset: -8, rateOffset: 0.92 },
  { id: "cheerful", name: "Cheerful", icon: "✨", desc: "Upbeat dynamic enthusiasm", pitchOffset: 12, rateOffset: 1.1 },
  { id: "empathetic", name: "Empathetic", icon: "🤝", desc: "Gentle, compassionate, soothing", pitchOffset: -2, rateOffset: 0.9 },
  { id: "whispering", name: "Whisper", icon: "🤫", desc: "Intimate, soft, breathy ASMR acoustics", pitchOffset: 0, rateOffset: 0.85 },
];

function naturalizeScriptText(input: string): string {
  let res = input;
  res = res.replace(/\$(\d+)\.(\d{2})/g, "$1 dollars and $2 cents");
  res = res.replace(/\$(\d+)/g, "$1 dollars");
  res = res.replace(/€(\d+)\.(\d{2})/g, "$1 euros and $2 cents");
  res = res.replace(/€(\d+)/g, "$1 euros");
  res = res.replace(/£(\d+)\.(\d{2})/g, "$1 pounds and $2 cents");
  res = res.replace(/£(\d+)/g, "$1 pounds");
  res = res.replace(/(\d+)%/g, "$1 percent");

  res = res.replace(/\bDr\.\s/g, "Doctor ");
  res = res.replace(/\bMr\.\s/g, "Mister ");
  res = res.replace(/\bMrs\.\s/g, "Missus ");
  res = res.replace(/\bMs\.\s/g, "Mizz ");
  res = res.replace(/\betc\./gi, "et cetera");
  res = res.replace(/\be\.g\.,?\s*/gi, "for example, ");
  res = res.replace(/\bi\.e\.,?\s*/gi, "that is, ");
  res = res.replace(/\bvs\.\s/gi, "versus ");

  res = res.replace(/\b(FBI|CIA|USA|UK|HTML|CSS|API|SEO|URL|AI|MP3)\b/g, (m) => m.split("").join("-"));
  res = res.replace(/।([^\s])/g, "। $1");
  res = res.replace(/([a-zA-Z0-9\u0980-\u09FF]{10,})\s+(however|furthermore|moreover|therefore|meanwhile)/gi, "$1... $2");
  return res.replace(/[ \t]+/g, " ").trim();
}

const BANGLA_PRESETS = [
  {
    label: "🎬 ইউটিউব ইন্ট্রো",
    text: "হ্যালো বন্ধুরা! সবাইকে স্বাগতম আমাদের চ্যানেলে। আজকের ভিডিওতে আমরা আলোচনা করব এআই ও আধুনিক প্রযুক্তির সেরা উদ্ভাবন নিয়ে। ভিডিওটি ভালো লাগলে লাইক দিন ও সাবস্ক্রাইব করুন!",
  },
  {
    label: "📖 গল্প ও আখ্যান",
    text: "সন্ধ্যার বাতাস ছিল মৃদু ও শান্ত, দূর পাহাড়ের পাইন বনের সুবাস ভেসে আসছিল। ঘন সবুজ গাছের পাতার ফাঁক দিয়ে চাঁদের এক ঝলক রূপালি আলো প্রাচীন পাথুরে পথটির ওপর এসে পড়ল।",
  },
  {
    label: "📢 সংবাদ বুলেটিন",
    text: "শুভ সন্ধ্যা। আজকের শীর্ষ সংবাদে আপনাদের স্বাগত জানাচ্ছি। নবায়নযোগ্য জ্বালানি ও প্রযুক্তি খাতে রেকর্ড বিনিয়োগের ফলে আন্তর্জাতিক পুঁজিবাজারে সূচকের উল্লেখযোগ্য উত্থান ঘটেছে।",
  },
  {
    label: "⚡ বিজ্ঞাপনী স্ক্রিপ্ট",
    text: "জটিল ঝামেলাকে বিদায় জানান। নিয়ে আসছি সবচেয়ে দ্রুতগতির ও আধুনিক ওয়ার্কস্টেশন, যা আপনার সব ভারী প্রজেক্ট ও ভিডিও এডিটিংকে করবে আরও স্মুথ ও ফাস্ট। আজই সংগ্রহ করুন!",
  },
];

function parseDialogueScript(rawText: string, defaultSpeaker: 1 | 2 = 1): Array<{ speaker: 1 | 2; text: string }> {
  const lines = rawText.split("\n");
  const turns: Array<{ speaker: 1 | 2; text: string }> = [];
  let currentSpeaker: 1 | 2 = defaultSpeaker;
  let currentText = "";

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    const s1Match = trimmed.match(/^(?:\[?(?:Speaker\s*1|Host|Person\s*1|User|Narrator)\]?\s*:\s*|\(Speaker\s*1\)\s*:?\s*)(.*)$/i);
    const s2Match = trimmed.match(/^(?:\[?(?:Speaker\s*2|Guest|Person\s*2|Co-host|Partner)\]?\s*:\s*|\(Speaker\s*2\)\s*:?\s*)(.*)$/i);

    if (s1Match) {
      if (currentText.trim()) {
        turns.push({ speaker: currentSpeaker, text: currentText.trim() });
      }
      currentSpeaker = 1;
      currentText = s1Match[1] || "";
    } else if (s2Match) {
      if (currentText.trim()) {
        turns.push({ speaker: currentSpeaker, text: currentText.trim() });
      }
      currentSpeaker = 2;
      currentText = s2Match[1] || "";
    } else {
      currentText += (currentText ? " " : "") + trimmed;
    }
  }

  if (currentText.trim()) {
    turns.push({ speaker: currentSpeaker, text: currentText.trim() });
  }

  return turns.length > 0 ? turns : [{ speaker: 1, text: rawText }];
}

interface UIStringDict {
  badge: string;
  presetTitle: string;
  copy: string;
  copied: string;
  clear: string;
  placeholder: string;
  words: string;
  estDuration: string;
  chars: string;
  voiceLangTitle: string;
  allLanguages: string;
  speakingSpeed: string;
  voicePitch: string;
  reset: string;
  activePersona: string;
  generateVoice: string;
  generating: string;
  listenBrowser: string;
  stopBrowser: string;
  downloadMp3: string;
  readyForExport: string;
  voiceoverPreview: string;
  volume: string;
  synthesisNote: string;
  browserNote: string;
  naturalizeBtn: string;
  naturalizedSuccess: string;
  emotionTitle: string;
  modeSingle: string;
  modeDialogue: string;
  speaker1Label: string;
  speaker2Label: string;
  bgMusicLabel: string;
  presets: Array<{ label: string; text: string }>;
  defaultText: string;
  defaultVoice: string;
}

const DICTIONARIES: Record<string, UIStringDict> = {
  en: {
    badge: "Neural Speech Studio",
    presetTitle: "Quick Presets:",
    copy: "Copy",
    copied: "Copied!",
    clear: "Clear",
    placeholder: "Type or paste your text here to convert into natural speech...",
    words: "Words",
    estDuration: "Est. Duration",
    chars: "chars",
    voiceLangTitle: "Voice & Language",
    allLanguages: "🌐 All Languages",
    speakingSpeed: "Speaking Speed",
    voicePitch: "Voice Pitch",
    reset: "Reset",
    activePersona: "Active Persona:",
    generateVoice: "Generate Voice",
    generating: "Synthesizing Voice...",
    listenBrowser: "Listen in Browser",
    stopBrowser: "Stop Audio",
    downloadMp3: "Download MP3 Audio",
    readyForExport: "Ready for Playback & Export",
    voiceoverPreview: "Voiceover Preview",
    volume: "Volume",
    synthesisNote: "Synthesis Note:",
    browserNote: "Listen directly in your browser without waiting for server generation.",
    naturalizeBtn: "✨ Naturalize Script",
    naturalizedSuccess: "Script naturalized with human breathing pauses!",
    emotionTitle: "Emotion & Speaking Style",
    modeSingle: "Single Voice",
    modeDialogue: "👥 Dialogue / Podcast",
    speaker1Label: "Speaker 1 (Host)",
    speaker2Label: "Speaker 2 (Guest)",
    bgMusicLabel: "🎶 Ambient Music",
    defaultVoice: "en-US-JennyNeural",
    defaultText: "Welcome to Nexus Calculator Hub! You can convert any text into natural, studio-quality speech with customizable voices, pitch, and speed. Try listening now or download the MP3.",
    presets: [
      { label: "🎬 YouTube Intro", text: "Welcome back to the channel! In today's video, we are exploring the most exciting technology innovations of this year. Be sure to hit that subscribe button and let's get right into it." },
      { label: "📖 Audiobook", text: "The night air was crisp and still, carrying the scent of pine needles and distant rain. Through the dense canopy of trees, a single beam of moonlight illuminated the ancient stone path." },
      { label: "📢 News Anchor", text: "Good evening. Leading our top stories tonight: global markets rallied today following positive economic indicators and record growth in green energy infrastructure worldwide." },
      { label: "⚡ Product Ad", text: "Say goodbye to complicated setups. Introducing the all-new ultra-compact workstation, engineered for unmatched speed, quiet cooling, and total creative freedom. Order yours today." },
    ]
  },
  es: {
    badge: "Estudio de Voz Neural",
    presetTitle: "Plantillas Rápidas:",
    copy: "Copiar",
    copied: "¡Copiado!",
    clear: "Limpiar",
    placeholder: "Escriba o pegue aquí su texto para convertirlo en voz humana realista...",
    words: "Palabras",
    estDuration: "Duración est.",
    chars: "caracteres",
    voiceLangTitle: "Voz e Idioma",
    allLanguages: "🌐 Todos los idiomas",
    speakingSpeed: "Velocidad de locución",
    voicePitch: "Tono de voz",
    reset: "Restablecer",
    activePersona: "Voz seleccionada:",
    generateVoice: "Generar Voz",
    generating: "Sintetizando voz...",
    listenBrowser: "Escuchar en navegador",
    stopBrowser: "Detener audio",
    downloadMp3: "Descargar audio MP3",
    readyForExport: "Listo para reproducir y exportar",
    voiceoverPreview: "Vista previa de locución",
    volume: "Volumen",
    synthesisNote: "Nota de síntesis:",
    browserNote: "Escuche instantáneamente en su navegador sin esperas de red.",
    naturalizeBtn: "✨ Naturalizar Guion",
    naturalizedSuccess: "¡Guion optimizado con pausas de respiración naturales!",
    emotionTitle: "Emoción y Estilo de Locución",
    modeSingle: "Voz Individual",
    modeDialogue: "👥 Diálogo / Pódcast",
    speaker1Label: "Hablante 1 (Anfitrión)",
    speaker2Label: "Hablante 2 (Invitado)",
    bgMusicLabel: "🎶 Música de Fondo",
    defaultVoice: "es-ES-AlvaroNeural",
    defaultText: "¡Bienvenido a Nexus Calculator Hub! Convierta cualquier texto en voz humana realista de calidad de estudio con voces personalizables, entonación y velocidad. Pruébelo ahora o descargue el archivo MP3.",
    presets: [
      { label: "🎬 Intro de YouTube", text: "¡Hola a todos y bienvenidos un día más al canal! En el vídeo de hoy vamos a analizar las novedades tecnológicas más revolucionarias. Si te gusta el contenido, no olvides suscribirte y activar la campanita." },
      { label: "📖 Audiolibro", text: "El aire de la noche era fresco y silencioso, cargado con el aroma de los pinos y la lluvia lejana. A través de la espesa arboleda, un haz de luz lunar iluminaba el antiguo sendero de piedra." },
      { label: "📢 Noticias", text: "Buenas tardes. En los titulares de hoy: los mercados globales registraron subidas significativas impulsados por los nuevos acuerdos de sostenibilidad y energía verde." },
      { label: "⚡ Anuncio Comercial", text: "Olvídate de las complicaciones y lleva tus proyectos al siguiente nivel. Descubre la estación de trabajo más rápida, silenciosa y eficiente del mercado. Pruébala hoy mismo." },
    ]
  },
  fr: {
    badge: "Studio Vocal Neuronal",
    presetTitle: "Modèles Rapides :",
    copy: "Copier",
    copied: "Copié !",
    clear: "Effacer",
    placeholder: "Tapez ou collez votre texte ici pour le convertir en voix naturelle...",
    words: "Mots",
    estDuration: "Durée est.",
    chars: "caractères",
    voiceLangTitle: "Voix et Langue",
    allLanguages: "🌐 Toutes les langues",
    speakingSpeed: "Vitesse d'élocution",
    voicePitch: "Hauteur de la voix",
    reset: "Réinitialiser",
    activePersona: "Voix active :",
    generateVoice: "Générer la Voix",
    generating: "Synthèse vocale en cours...",
    listenBrowser: "Écouter dans le navigateur",
    stopBrowser: "Arrêter l'audio",
    downloadMp3: "Télécharger l'audio MP3",
    readyForExport: "Prêt pour l'écoute et l'export",
    voiceoverPreview: "Aperçu de la voix off",
    volume: "Volume",
    synthesisNote: "Note de synthèse :",
    browserNote: "Écoutez immédiatement dans votre navigateur sans aucun temps d'attente.",
    naturalizeBtn: "✨ Rendre Naturel",
    naturalizedSuccess: "Script humanisé avec pauses de respiration naturelles !",
    emotionTitle: "Émotion et Style de Voix",
    modeSingle: "Voix Unique",
    modeDialogue: "👥 Dialogue / Podcast",
    speaker1Label: "Interlocuteur 1 (Hôte)",
    speaker2Label: "Interlocuteur 2 (Invité)",
    bgMusicLabel: "🎶 Musique d'Ambiance",
    defaultVoice: "fr-FR-DeniseNeural",
    defaultText: "Bienvenue sur Nexus Calculator Hub ! Convertissez n'importe quel texte en voix naturelle de qualité studio avec un contrôle complet sur le ton et le débit. Écoutez dès maintenant ou téléchargez votre fichier MP3.",
    presets: [
      { label: "🎬 Intro YouTube", text: "Bonjour à tous et bienvenue sur la chaîne ! Dans la vidéo d'aujourd'hui, nous explorons les avancées technologiques les plus marquantes de cette année. Pensez à vous abonner et c'est parti !" },
      { label: "📖 Livre Audio", text: "L'air de la nuit était pur et immobile, transportant une fraîche odeur de pins et de terre humide. À travers la voûte des arbres centenaires, un rayon de lune éclairait doucement le pavé usé." },
      { label: "📢 Journal Télévisé", text: "Bonsoir. À la une de l'actualité ce soir : forte hausse des marchés portée par une croissance record dans les énergies renouvelables et les infrastructures numériques." },
      { label: "⚡ Publicité", text: "Dites adieu aux lenteurs et libérez votre créativité. Découvrez notre nouvelle gamme ultra-compacte alliant puissance brute et silence absolu. Commandez le vôtre aujourd'hui." },
    ]
  },
  de: {
    badge: "Neuronales Tonstudio",
    presetTitle: "Schnellvorlagen:",
    copy: "Kopieren",
    copied: "Kopiert!",
    clear: "Löschen",
    placeholder: "Geben Sie hier Ihren Text ein, um ihn in lebensechte Sprache umzuwandeln...",
    words: "Wörter",
    estDuration: "Geschätzte Dauer",
    chars: "Zeichen",
    voiceLangTitle: "Stimme & Sprache",
    allLanguages: "🌐 Alle Sprachen",
    speakingSpeed: "Sprechgeschwindigkeit",
    voicePitch: "Tonhöhe",
    reset: "Zurücksetzen",
    activePersona: "Aktive Stimme:",
    generateVoice: "Stimme generieren",
    generating: "Sprache wird synthetisiert...",
    listenBrowser: "Im Browser anhören",
    stopBrowser: "Audio stoppen",
    downloadMp3: "MP3-Audio herunterladen",
    readyForExport: "Bereit zur Wiedergabe & zum Export",
    voiceoverPreview: "Voiceover-Vorschau",
    volume: "Volume",
    synthesisNote: "Synthese-Hinweis:",
    browserNote: "Sie können den Text auch sofort direkt im Browser abspielen.",
    naturalizeBtn: "✨ Text Natürlicher Machen",
    naturalizedSuccess: "Skript durch natürliche Atempausen optimiert!",
    emotionTitle: "Emotion & Sprechstil",
    modeSingle: "Einzelstimme",
    modeDialogue: "👥 Dialog / Podcast",
    speaker1Label: "Sprecher 1 (Host)",
    speaker2Label: "Sprecher 2 (Gast)",
    bgMusicLabel: "🎶 Hintergrundmusik",
    defaultVoice: "de-DE-KatjaNeural",
    defaultText: "Herzlich willkommen bei Nexus Calculator Hub! Wandeln Sie jeden Text in natürliche, studio-reife Sprachausgabe um – mit anpassbarer Tonhöhe, Tempo und realistischen Stimmen. Jetzt anhören oder als MP3 herunterladen.",
    presets: [
      { label: "🎬 YouTube-Intro", text: "Willkommen zurück auf meinem Kanal! Im heutigen Video werfen wir einen genauen Blick auf die spannendsten Tech-Trends dieses Jahres. Vergesst nicht, den Kanal zu abonnieren, und legen wir direkt los." },
      { label: "📖 Hörbuch", text: "Die Nachtluft war kühl und still und trug den würzigen Duft von Kiefernnadeln mit sich. Durch das dichte Blätterdach fiel ein einsamer Mondstrahl auf den uralten Steinpfad." },
      { label: "📢 Nachrichtensprecher", text: "Guten Abend. Die wichtigsten Meldungen des Tages: Die internationalen Finanzmärkte reagierten heute mit deutlichen Kursgewinnen auf neue Innovationsförderungen für grüne Technologien." },
      { label: "⚡ Werbespot", text: "Schluss mit zeitraubenden Ladezeiten. Erleben Sie höchste Performance, flüsterleise Kühlung und grenzenlose Flexibilität mit unserer neuen Workstation. Jetzt informieren und profitieren." },
    ]
  }
};

export function TextToSpeechTool() {
  const currentLocale = useLocale();
  const t = DICTIONARIES[currentLocale] || DICTIONARIES.en;

  const [text, setText] = useState<string>(t.defaultText);
  const [selectedVoiceId, setSelectedVoiceId] = useState<string>(t.defaultVoice);
  const [languageFilter, setLanguageFilter] = useState<string>(
    ["es", "fr", "de"].includes(currentLocale) ? currentLocale : "all"
  );
  const [rate, setRate] = useState<number>(1.0);
  const [pitch, setPitch] = useState<number>(0);

  // Studio Intelligence Features
  const [selectedEmotion, setSelectedEmotion] = useState<string>("default");
  const [ttsMode, setTtsMode] = useState<"single" | "dialogue">("single");
  const [speaker1VoiceId, setSpeaker1VoiceId] = useState<string>(t.defaultVoice);
  const [speaker2VoiceId, setSpeaker2VoiceId] = useState<string>(
    VOICES.find((v) => v.locale.startsWith(currentLocale) && v.gender === "Male")?.id || "en-US-GuyNeural"
  );
  const [bgMusic, setBgMusic] = useState<AmbientTrackId>("none");
  const [bgMusicVolume, setBgMusicVolume] = useState<number>(0.15);
  const [naturalizedSuccess, setNaturalizedSuccess] = useState<boolean>(false);
  const [previousText, setPreviousText] = useState<string | null>(null);
  const [dialogueProgress, setDialogueProgress] = useState<{ current: number; total: number } | null>(null);
  const [isAuditioningMusic, setIsAuditioningMusic] = useState<boolean>(false);

  const ambientEngineRef = useRef<AmbientAudioEngine | null>(null);

  // Browser speech state
  const [isBrowserSpeaking, setIsBrowserSpeaking] = useState<boolean>(false);

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

  const isBanglaActive = languageFilter === "bn" || selectedVoice.locale.startsWith("bn");
  const activePresets = isBanglaActive ? BANGLA_PRESETS : t.presets;

  // Metrics
  const charCount = text.length;
  const wordCount = useMemo(() => {
    return text.trim() ? text.trim().split(/\s+/).length : 0;
  }, [text]);

  const estimatedReadingTimeSec = useMemo(() => {
    const wordsPerMinute = 150 * rate;
    return Math.max(1, Math.round((wordCount / wordsPerMinute) * 60));
  }, [wordCount, rate]);

  // Ambient soundscape lifecycle
  useEffect(() => {
    ambientEngineRef.current = new AmbientAudioEngine();
    return () => {
      if (ambientEngineRef.current) {
        ambientEngineRef.current.stop();
        ambientEngineRef.current = null;
      }
    };
  }, []);

  // Ambient audio playback synced with speech
  useEffect(() => {
    if (!ambientEngineRef.current) return;
    if ((isPlaying || isAuditioningMusic) && bgMusic !== "none") {
      ambientEngineRef.current.start(bgMusic, bgMusicVolume);
    } else {
      ambientEngineRef.current.stop();
    }
  }, [isPlaying, isAuditioningMusic, bgMusic]);

  // Dynamic ambient volume adjustment
  useEffect(() => {
    if (ambientEngineRef.current) {
      ambientEngineRef.current.setVolume(bgMusicVolume);
    }
  }, [bgMusicVolume]);

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

  // Browser Speech Synthesis (Client-side, 0ms latency, zero timeouts)
  const handleBrowserSpeak = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      setErrorMsg("Your browser does not support the Web Speech API.");
      return;
    }
    if (isBrowserSpeaking) {
      window.speechSynthesis.cancel();
      setIsBrowserSpeaking(false);
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = rate;
    utterance.pitch = Math.max(0.5, Math.min(2, 1 + pitch / 50));

    const browserVoices = window.speechSynthesis.getVoices();
    const targetLocale = selectedVoice.locale;
    const match =
      browserVoices.find(
        (v) => v.lang.replace("_", "-").toLowerCase() === targetLocale.toLowerCase()
      ) || browserVoices.find((v) => v.lang.startsWith(targetLocale.slice(0, 2)));
    if (match) utterance.voice = match;

    utterance.onstart = () => setIsBrowserSpeaking(true);
    utterance.onend = () => setIsBrowserSpeaking(false);
    utterance.onerror = () => setIsBrowserSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  // Smart Script Naturalizer
  const handleNaturalize = () => {
    if (!text.trim()) return;
    setPreviousText(text);
    const naturalized = naturalizeScriptText(text);
    setText(naturalized);
    setNaturalizedSuccess(true);
    setTimeout(() => setNaturalizedSuccess(false), 3000);
  };

  const handleUndoNaturalize = () => {
    if (previousText !== null) {
      setText(previousText);
      setPreviousText(null);
      setNaturalizedSuccess(false);
    }
  };

  // Dialogue Mode Helpers
  const insertSpeakerTag = (speakerNum: 1 | 2) => {
    setText((prev) => {
      const trimmed = prev.trimEnd();
      const prefix = trimmed ? "\n\n" : "";
      return `${trimmed}${prefix}[Speaker ${speakerNum}]: `;
    });
  };

  const loadPodcastTemplate = () => {
    if (isBanglaActive) {
      setText(
        "[Speaker 1]: স্বাগতম আমাদের আজকের পডকাস্ট পর্বে! আজ আমরা কৃত্রিম বুদ্ধিমত্তা ও ভয়েস টেকনোলজি নিয়ে কথা বলব।\n\n" +
        "[Speaker 2]: অনেক ধন্যবাদ প্রদীপ! আজকাল এআই ভয়েস কতটা সাবলীল ও জীবন্ত হয়েছে তা সত্যিই দেখার মতো।\n\n" +
        "[Speaker 1]: কনটেন্ট ক্রিয়েটরদের জন্য এর সবচেয়ে বড় সুবিধা কী?\n\n" +
        "[Speaker 2]: কোনো দামি মাইক্রোফোন বা স্টুডিও ছাড়াই যে কেউ মাত্র কয়েক ক্লিকে প্রফেশনাল ভয়েসওভার তৈরি করতে পারে।"
      );
      setSpeaker1VoiceId("bn-BD-PradeepNeural");
      setSpeaker2VoiceId("bn-BD-NabanitaNeural");
    } else if (currentLocale === "es") {
      setText(
        "[Speaker 1]: ¡Bienvenidos al episodio de hoy! Vamos a analizar las novedades más fascinantes en inteligencia artificial.\n\n" +
        "[Speaker 2]: Muchas gracias por invitarme, Álvaro. Es asombroso cómo estas voces reproducen la respiración y los tonos naturales.\n\n" +
        "[Speaker 1]: ¿Cuál consideras que es la ventaja más importante para los creadores de contenido?\n\n" +
        "[Speaker 2]: Definitivamente la rapidez: puedes producir audiolibros completos y tutoriales en cuestión de minutos."
      );
      setSpeaker1VoiceId("es-ES-AlvaroNeural");
      setSpeaker2VoiceId("es-ES-ElviraNeural");
    } else if (currentLocale === "fr") {
      setText(
        "[Speaker 1]: Bienvenue dans ce nouvel épisode ! Nous explorons aujourd'hui les avancées de la synthèse vocale neuronale.\n\n" +
        "[Speaker 2]: Merci Henri ! C'est fascinant d'entendre à quel point les intonations et le timbre sont désormais naturels.\n\n" +
        "[Speaker 1]: Quels sont selon toi les plus grands bénéfices pour les créateurs de contenu ?\n\n" +
        "[Speaker 2]: La rapidité et la liberté créative : produire des podcasts ou des formations audio sans contrainte de matériel."
      );
      setSpeaker1VoiceId("fr-FR-HenriNeural");
      setSpeaker2VoiceId("fr-FR-DeniseNeural");
    } else if (currentLocale === "de") {
      setText(
        "[Speaker 1]: Herzlich willkommen zu unserer heutigen Podcast-Ausgabe über moderne neuronale Sprachtechnologien!\n\n" +
        "[Speaker 2]: Vielen Dank für die Einladung, Conrad! Es ist wirklich beeindruckend, wie lebensecht diese Stimmen klingen.\n\n" +
        "[Speaker 1]: Was ist deiner Ansicht nach der größte Vorteil für Kreative und Redakteure?\n\n" +
        "[Speaker 2]: Ganz klar: professionelle Hörbücher, Erklärvideos und Audio-Guides in Studioqualität sofort zu erstellen."
      );
      setSpeaker1VoiceId("de-DE-ConradNeural");
      setSpeaker2VoiceId("de-DE-KatjaNeural");
    } else {
      setText(
        "[Speaker 1]: Welcome to today's podcast! Today we are exploring the latest breakthroughs in neural speech technology.\n\n" +
        "[Speaker 2]: Thanks for having me, Guy! It is truly amazing how lifelike and expressive AI voices have become.\n\n" +
        "[Speaker 1]: What do you think is the biggest game-changer for creators and educators?\n\n" +
        "[Speaker 2]: The sheer speed: anyone can now produce high-fidelity audiobooks, podcasts, and video narrations in seconds."
      );
      setSpeaker1VoiceId("en-US-GuyNeural");
      setSpeaker2VoiceId("en-US-JennyNeural");
    }
  };

  // Generate Audio (Single Voice or Stitched Dialogue Mode)
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
      // 1. Dialogue / Podcast Mode Multi-Turn Synthesis
      if (ttsMode === "dialogue" && !isPreview) {
        const turns = parseDialogueScript(textToSpeak);
        setDialogueProgress({ current: 1, total: turns.length });
        const blobs: Blob[] = [];

        for (let i = 0; i < turns.length; i++) {
          setDialogueProgress({ current: i + 1, total: turns.length });
          const turn = turns[i];
          const turnVoice = turn.speaker === 1 ? speaker1VoiceId : speaker2VoiceId;

          const response = await fetch("/api/tools/text-to-speech", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              text: turn.text,
              voice: turnVoice,
              rate,
              pitch,
              style: selectedEmotion,
            }),
          });

          if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.error || `Failed to synthesize dialogue turn ${i + 1}`);
          }

          const turnBlob = await response.blob();
          blobs.push(turnBlob);
        }

        const combinedBlob = new Blob(blobs, { type: "audio/mpeg" });
        const newUrl = URL.createObjectURL(combinedBlob);

        if (audioUrl) {
          URL.revokeObjectURL(audioUrl);
        }
        setAudioUrl(newUrl);
        setIsPlaying(true);
        if (audioRef.current) {
          audioRef.current.src = newUrl;
          audioRef.current.play().catch(() => setIsPlaying(false));
        }
        return;
      }

      // 2. Single Voice Studio Synthesis
      const response = await fetch("/api/tools/text-to-speech", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: textToSpeak,
          voice: voiceToUse,
          rate: isPreview ? 1.0 : rate,
          pitch: isPreview ? 0 : pitch,
          style: isPreview ? "default" : selectedEmotion,
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
        setDialogueProgress(null);
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
              Natural human breath cadence, emotional expressiveness, dialogue stitching, and free MP3 exports across 10+ languages.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-300">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          Microsoft Neural TTS + Ambient Web Audio
        </div>
      </div>

      {/* Studio Mode Switcher: Single Voice vs. Dialogue / Podcast */}
      <div className="flex items-center justify-between flex-wrap gap-3 p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/60 shadow-inner">
        <div className="flex items-center gap-1.5 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => setTtsMode("single")}
            className={`flex-1 sm:flex-initial px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all ${
              ttsMode === "single"
                ? "bg-white dark:bg-slate-900 text-[#518231] shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <Radio className="w-4 h-4" />
            <span>{t.modeSingle}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setTtsMode("dialogue");
              if (!text.includes("[Speaker 1]") && !text.includes("[Speaker 2]")) {
                loadPodcastTemplate();
              }
            }}
            className={`flex-1 sm:flex-initial px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all ${
              ttsMode === "dialogue"
                ? "bg-white dark:bg-slate-900 text-[#518231] shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <Users className="w-4 h-4" />
            <span>{t.modeDialogue}</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-extrabold uppercase">
              AI Multi-Turn
            </span>
          </button>
        </div>

        {/* Quick Language Indicator */}
        <div className="hidden sm:flex items-center gap-2 px-3 text-xs text-slate-500 font-medium">
          <span>Current Locale:</span>
          <span className="font-bold text-slate-700 dark:text-slate-300 uppercase">{currentLocale}</span>
          {isBanglaActive && <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-600 font-bold">🇧🇩 বাংলা অ্যাক্টিভ</span>}
        </div>
      </div>

      {/* Preset Prompts Pill Bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
          <div className="flex items-center gap-2">
            <Wand2 className="w-3.5 h-3.5 text-[#518231]" />
            {t.presetTitle} {isBanglaActive ? "(বাংলা ডেমো স্ক্রিপ্ট)" : ""}
          </div>
          {ttsMode === "dialogue" && (
            <button
              type="button"
              onClick={loadPodcastTemplate}
              className="text-[#518231] hover:underline normal-case flex items-center gap-1 text-xs"
            >
              <Users className="w-3 h-3" />
              <span>Load Full Podcast Sample</span>
            </button>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {activePresets.map((preset) => (
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
        {/* Left Column: Script Editor & Controls (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm p-5 sm:p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#518231]" />
              <span className="text-sm font-bold text-slate-900 dark:text-white">
                {ttsMode === "dialogue" ? "Dialogue & Podcast Script" : t.badge}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {/* Smart Script Naturalizer Button */}
              <button
                type="button"
                onClick={handleNaturalize}
                disabled={!text.trim()}
                className="px-2.5 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 transition-all text-xs font-bold flex items-center gap-1.5 shadow-sm active:scale-95"
                title="Automatically expand numbers, currencies, abbreviations, and insert organic breathing micro-pauses"
              >
                <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>{t.naturalizeBtn}</span>
              </button>

              {/* Undo Button */}
              {previousText !== null && (
                <button
                  type="button"
                  onClick={handleUndoNaturalize}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-xs flex items-center gap-1"
                  title="Undo naturalization"
                >
                  <Undo2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Undo</span>
                </button>
              )}

              <button
                type="button"
                onClick={handleCopyText}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-xs flex items-center gap-1"
                title="Copy script"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span className="hidden sm:inline">{copied ? t.copied : t.copy}</span>
              </button>

              <button
                type="button"
                onClick={() => setText("")}
                className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors text-xs flex items-center gap-1"
                title="Clear text"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{t.clear}</span>
              </button>
            </div>
          </div>

          {/* Naturalize Success Banner */}
          {naturalizedSuccess && (
            <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 dark:text-emerald-200 text-xs font-semibold flex items-center justify-between animate-in fade-in duration-200">
              <span className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                {t.naturalizedSuccess}
              </span>
              <button
                type="button"
                onClick={handleUndoNaturalize}
                className="text-xs underline hover:text-emerald-900"
              >
                Revert change
              </button>
            </div>
          )}

          {/* Dialogue Mode: Two Speaker Config Row */}
          {ttsMode === "dialogue" && (
            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Speaker 1 */}
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                    <User className="w-3 h-3 text-[#518231]" />
                    {t.speaker1Label}
                  </label>
                  <select
                    value={speaker1VoiceId}
                    onChange={(e) => setSpeaker1VoiceId(e.target.value)}
                    className="w-full text-xs p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-medium text-slate-900 dark:text-slate-100 outline-none"
                  >
                    {VOICES.map((v) => (
                      <option key={`s1-${v.id}`} value={v.id}>
                        {v.flag} {v.name} ({v.localeName} - {v.gender})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Speaker 2 */}
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                    <User className="w-3 h-3 text-teal-600" />
                    {t.speaker2Label}
                  </label>
                  <select
                    value={speaker2VoiceId}
                    onChange={(e) => setSpeaker2VoiceId(e.target.value)}
                    className="w-full text-xs p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-medium text-slate-900 dark:text-slate-100 outline-none"
                  >
                    {VOICES.map((v) => (
                      <option key={`s2-${v.id}`} value={v.id}>
                        {v.flag} {v.name} ({v.localeName} - {v.gender})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Quick Tag Insertion Buttons */}
              <div className="flex items-center gap-2 pt-1 border-t border-slate-200/50 dark:border-slate-700/50">
                <span className="text-[10px] uppercase font-bold text-slate-400">Insert tag:</span>
                <button
                  type="button"
                  onClick={() => insertSpeakerTag(1)}
                  className="px-2.5 py-1 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-200 font-bold text-xs hover:bg-emerald-200 transition-colors flex items-center gap-1"
                >
                  <PlusCircle className="w-3 h-3" />
                  <span>+ [Speaker 1]</span>
                </button>
                <button
                  type="button"
                  onClick={() => insertSpeakerTag(2)}
                  className="px-2.5 py-1 rounded-lg bg-teal-100 dark:bg-teal-950/60 text-teal-800 dark:text-teal-200 font-bold text-xs hover:bg-teal-200 transition-colors flex items-center gap-1"
                >
                  <PlusCircle className="w-3 h-3" />
                  <span>+ [Speaker 2]</span>
                </button>
              </div>
            </div>
          )}

          {/* Text Area */}
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value.slice(0, 3000))}
            placeholder={
              ttsMode === "dialogue"
                ? `Format your dialogue script using tags, for example:\n[Speaker 1]: Welcome to today's podcast!\n[Speaker 2]: Thanks for having me, Jenny.\n[Speaker 1]: Today we are discussing AI voice synthesis.`
                : t.placeholder
            }
            className="w-full flex-1 min-h-[200px] sm:min-h-[230px] p-4 rounded-2xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800/80 focus:border-[#518231] focus:ring-2 focus:ring-[#518231]/20 outline-none text-slate-900 dark:text-slate-100 text-sm sm:text-[15px] leading-relaxed resize-y font-normal transition-all"
          />

          {/* Emotional Speaking Style Selector Strip */}
          <div className="space-y-2 pt-1">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
              <span className="flex items-center gap-1.5">
                <Smile className="w-3.5 h-3.5 text-[#518231]" />
                {t.emotionTitle}
              </span>
              <span className="text-[11px] text-slate-400 font-normal">
                {EMOTIONS.find((e) => e.id === selectedEmotion)?.desc}
              </span>
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 custom-scrollbar">
              {EMOTIONS.map((emotion) => {
                const isActive = selectedEmotion === emotion.id;
                return (
                  <button
                    key={emotion.id}
                    type="button"
                    onClick={() => setSelectedEmotion(emotion.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-all flex items-center gap-1.5 ${
                      isActive
                        ? "bg-[#518231] text-white shadow-sm ring-2 ring-[#518231]/30"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                    }`}
                  >
                    <span>{emotion.icon}</span>
                    <span>{emotion.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Editor Stats Footer */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 mt-1 text-xs text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-4">
              <span>
                {t.words}: <strong className="text-slate-700 dark:text-slate-200">{wordCount}</strong>
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                {t.estDuration}: <strong className="text-slate-700 dark:text-slate-200">~{estimatedReadingTimeSec}s</strong>
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className={charCount >= 2800 ? "text-amber-600 font-bold" : ""}>
                {charCount} / 3,000 {t.chars}
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

        {/* Right Column: Voice & Prosody Controls & Ambient Music Mixer (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col space-y-5">
          {/* Voice Selector Box */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm p-5 space-y-3">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-[#518231]" />
                <span className="text-sm font-bold text-slate-900 dark:text-white">{t.voiceLangTitle}</span>
              </div>

              {/* Language Filter */}
              <select
                value={languageFilter}
                onChange={(e) => setLanguageFilter(e.target.value)}
                className="text-xs py-1 px-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 border-none font-medium text-slate-700 dark:text-slate-200 outline-none cursor-pointer"
              >
                <option value="all">{t.allLanguages}</option>
                <option value="en">🇺🇸 / 🇬🇧 English</option>
                <option value="es">🇪🇸 / 🇲🇽 Español</option>
                <option value="fr">🇫🇷 / 🇨🇦 Français</option>
                <option value="de">🇩🇪 / 🇦🇹 Deutsch</option>
                <option value="bn">🇧🇩 / 🇮🇳 বাংলা (Bangla)</option>
                <option value="pt">🇧🇷 Português</option>
                <option value="it">🇮🇹 Italiano</option>
                <option value="ja">🇯🇵 日本語 (Japanese)</option>
                <option value="hi">🇮🇳 हिन्दी (Hindi)</option>
                <option value="ar">🇸🇦 العربية (Arabic)</option>
                <option value="zh">🇨🇳 中文 (Chinese)</option>
              </select>
            </div>

            {/* Voice Cards List */}
            <div className="space-y-2 max-h-[190px] overflow-y-auto custom-scrollbar pr-1">
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
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm p-5 space-y-3">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
              <Sliders className="w-4 h-4 text-[#518231]" />
              <span className="text-sm font-bold text-slate-900 dark:text-white">Prosody &amp; Acoustics</span>
            </div>

            {/* Speaking Rate */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                <span>{t.speakingSpeed}</span>
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
                <span>0.5x</span>
                <button
                  type="button"
                  onClick={() => setRate(1.0)}
                  className="hover:text-[#518231] font-semibold"
                >
                  {t.reset} (1.0x)
                </button>
                <span>2.0x</span>
              </div>
            </div>

            {/* Voice Pitch */}
            <div className="space-y-1 pt-1">
              <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                <span>{t.voicePitch}</span>
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
                <span>-50Hz</span>
                <button
                  type="button"
                  onClick={() => setPitch(0)}
                  className="hover:text-[#518231] font-semibold"
                >
                  {t.reset} (0Hz)
                </button>
                <span>+50Hz</span>
              </div>
            </div>
          </div>

          {/* In-Browser Ambient Background Music Mixer Card */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm p-5 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <Music className="w-4 h-4 text-[#518231]" />
                <span className="text-sm font-bold text-slate-900 dark:text-white">{t.bgMusicLabel}</span>
              </div>
              {bgMusic !== "none" && (
                <button
                  type="button"
                  onClick={() => setIsAuditioningMusic(!isAuditioningMusic)}
                  className="text-[11px] text-[#518231] hover:underline font-semibold"
                >
                  {isAuditioningMusic ? "Pause Audition" : "Test Music"}
                </button>
              )}
            </div>

            {/* Ambient Track Chips */}
            <div className="grid grid-cols-2 gap-1.5">
              {AMBIENT_TRACKS.map((track) => {
                const isSelected = bgMusic === track.id;
                return (
                  <button
                    key={track.id}
                    type="button"
                    onClick={() => setBgMusic(track.id)}
                    className={`p-2 rounded-xl text-left border text-xs transition-all ${
                      isSelected
                        ? "bg-[#518231]/10 border-[#518231] dark:bg-[#518231]/20 font-bold text-slate-900 dark:text-white"
                        : "bg-slate-50 dark:bg-slate-800/40 border-slate-200/60 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300"
                    }`}
                  >
                    <div className="flex items-center gap-1.5">
                      <span>{track.icon}</span>
                      <span className="truncate">{track.name}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Ambient Volume Slider */}
            {bgMusic !== "none" && (
              <div className="pt-2 space-y-1 animate-in fade-in">
                <div className="flex justify-between text-xs font-semibold text-slate-600 dark:text-slate-400">
                  <span>Music Volume Balance</span>
                  <span className="text-[#518231] font-bold">{Math.round(bgMusicVolume * 250)}%</span>
                </div>
                <input
                  type="range"
                  min="0.02"
                  max="0.35"
                  step="0.01"
                  value={bgMusicVolume}
                  onChange={(e) => setBgMusicVolume(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-[#518231]"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Generate Button Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-3xl bg-slate-900 dark:bg-slate-800 text-white shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#518231] flex items-center justify-center shrink-0">
            <Headphones className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-xs text-slate-400">
              {ttsMode === "dialogue" ? "👥 Multi-Speaker Podcast Mode" : t.activePersona}
            </div>
            <div className="text-sm font-bold text-white flex items-center gap-2">
              {ttsMode === "dialogue" ? (
                <span>
                  Host ({VOICES.find((v) => v.id === speaker1VoiceId)?.name}) &amp; Guest (
                  {VOICES.find((v) => v.id === speaker2VoiceId)?.name})
                </span>
              ) : (
                <>
                  <span>{selectedVoice.flag}</span>
                  <span>{selectedVoice.name}</span>
                  <span className="text-xs text-slate-400 font-normal">({selectedVoice.localeName})</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-slate-300">
                    {EMOTIONS.find((e) => e.id === selectedEmotion)?.name}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
          {/* Direct Instant Browser Playback */}
          <button
            type="button"
            onClick={handleBrowserSpeak}
            disabled={!text.trim() || ttsMode === "dialogue"}
            className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed border border-slate-700/80 font-bold text-xs sm:text-sm text-slate-200 transition-all active:scale-95 flex items-center justify-center gap-2"
            title={t.browserNote}
          >
            {isBrowserSpeaking ? (
              <>
                <VolumeX className="w-4 h-4 text-rose-400 animate-pulse" />
                <span>{t.stopBrowser}</span>
              </>
            ) : (
              <>
                <Radio className="w-4 h-4 text-emerald-400" />
                <span>{t.listenBrowser}</span>
              </>
            )}
          </button>

          {/* Cloud MP3 Studio Generation */}
          <button
            type="button"
            onClick={() => handleGenerate()}
            disabled={isLoading || !text.trim()}
            className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-[#518231] hover:bg-[#436a28] disabled:opacity-50 disabled:cursor-not-allowed font-extrabold text-sm text-white shadow-lg shadow-[#518231]/30 transition-all transform active:scale-95 flex items-center justify-center gap-2 shrink-0"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>
                  {dialogueProgress
                    ? `Stitching Turn ${dialogueProgress.current} / ${dialogueProgress.total}...`
                    : t.generating}
                </span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>
                  {ttsMode === "dialogue" ? "Generate Podcast Audio" : t.generateVoice}
                </span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Error Banner */}
      {errorMsg && (
        <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 flex items-start gap-3 text-amber-800 dark:text-amber-200 text-sm">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-amber-600" />
          <div className="flex-1 space-y-2">
            <div>
              <strong className="font-bold">{t.synthesisNote}</strong> {errorMsg}
            </div>
            <div>
              <button
                type="button"
                onClick={handleBrowserSpeak}
                className="px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all"
              >
                <Radio className="w-3.5 h-3.5" />
                <span>{t.listenBrowser}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Audio Waveform Player & Download Bar */}
      {audioUrl && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border-2 border-[#518231]/40 dark:border-[#518231]/50 shadow-xl p-6 sm:p-8 space-y-6 animate-in fade-in slide-in-from-bottom-3 duration-300">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                {t.readyForExport}
              </span>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span>
                  {ttsMode === "dialogue"
                    ? "Multi-Speaker Podcast Mix"
                    : `${selectedVoice.name} – ${t.voiceoverPreview}`}
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-normal">
                  48kbps MP3
                </span>
                {bgMusic !== "none" && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-semibold flex items-center gap-1">
                    <Music className="w-3 h-3" />
                    + {AMBIENT_TRACKS.find((a) => a.id === bgMusic)?.name}
                  </span>
                )}
              </h3>
            </div>

            {/* Direct 1-Click MP3 Download */}
            <button
              type="button"
              onClick={handleDownloadMp3}
              className="px-5 py-2.5 rounded-xl bg-[#518231] hover:bg-[#436a28] text-white font-bold text-sm shadow-md shadow-[#518231]/20 flex items-center justify-center gap-2 transition-all active:scale-95 shrink-0"
            >
              <Download className="w-4 h-4" />
              <span>{t.downloadMp3}</span>
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
