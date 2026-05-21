export interface MimeRecord {
  extension: string; // e.g. '.png'
  mime: string;       // e.g. 'image/png'
  category: 'text' | 'image' | 'audio' | 'video' | 'application' | 'font' | 'archive' | 'binary';
  description: string;
  behavior: string;   // e.g. 'Renders inline within the browser viewport'
  security: string;   // e.g. 'Safe'
  magicBytes?: string[]; // hex strings representing starting bytes
  alternatives?: string[];
}

export const MIME_DATABASE: MimeRecord[] = [
  // Web Documents
  {
    extension: '.html',
    mime: 'text/html',
    category: 'text',
    description: 'HyperText Markup Language (HTML) document, the standard structure for web pages.',
    behavior: 'Renders inline as an interactive document page. Executes embedded JavaScript scripts.',
    security: 'Medium risk if user-uploaded. Script tags inside can execute XSS attacks under the target host\'s security context.',
    magicBytes: ['3C', '21', '44', '4F', '43', '54', '59', '50', '45'], // <!DOCTYPE
    alternatives: ['text/xhtml', 'application/xhtml+xml']
  },
  {
    extension: '.css',
    mime: 'text/css',
    category: 'text',
    description: 'Cascading Style Sheet (CSS) used to layout and format web content designs.',
    behavior: 'Parsed and compiled inline to apply styles. Does not render directly as a standalone document page.',
    security: 'Safe. Strict browsers refuse to execute stylesheet definitions if served with incorrect Content-Types and nosniff is set.',
  },
  {
    extension: '.js',
    mime: 'text/javascript',
    category: 'text',
    description: 'JavaScript programming script used to add client-side dynamic behaviors to HTML pages.',
    behavior: 'Executed by browser JavaScript engine. Refused direct inline rendering in modern viewports.',
    security: 'High risk if run outside sandboxed environment. Executes scripts immediately when imported into HTML frames.',
    alternatives: ['application/javascript', 'application/x-javascript', 'text/ecmascript']
  },
  {
    extension: '.mjs',
    mime: 'text/javascript',
    category: 'text',
    description: 'JavaScript ES Module script file designed for modular import statements.',
    behavior: 'Parsed as a script module. Refused inline rendering.',
    security: 'High risk if raw executable scripting is imported into origin context.',
  },
  {
    extension: '.ts',
    mime: 'video/mp2t', // Note: .ts can stand for TypeScript (.ts) but officially MIME is TypeScript or MPEG2 Transport stream
    category: 'video',
    description: 'MPEG-2 Transport Stream container for multiplexing audio/video streams, or TypeScript script source.',
    behavior: 'Streams video media inline. If TypeScript script, downloads as raw text.',
    security: 'Safe container, though transport streams can embed media vulnerabilities.',
    magicBytes: ['47'] // 0x47 sync byte
  },
  {
    extension: '.json',
    mime: 'application/json',
    category: 'application',
    description: 'JavaScript Object Notation (JSON) lightweight data exchange schema representation.',
    behavior: 'Renders inline as formatted raw text structure or parsed dynamically in scripting context.',
    security: 'Safe. Cannot execute script commands directly. Used strictly as data serialization.',
    magicBytes: ['7B'], // '{' character
    alternatives: ['text/json', 'application/x-json']
  },
  {
    extension: '.xml',
    mime: 'application/xml',
    category: 'application',
    description: 'Extensible Markup Language (XML) structured document formatting.',
    behavior: 'Renders inline displaying document node hierarchies.',
    security: 'Medium risk. Can suffer from XML External Entity (XXE) expansion attacks or XSS injection if parsed incorrectly.',
    magicBytes: ['3C', '3F', '78', '6D', '6C'], // '<?xml'
    alternatives: ['text/xml']
  },
  {
    extension: '.svg',
    mime: 'image/svg+xml',
    category: 'image',
    description: 'Scalable Vector Graphics (SVG) vector graphic document layout.',
    behavior: 'Renders inline as a responsive image. Can render interactive script components.',
    security: 'Medium risk. SVGs are XML files and can contain script nodes executing JavaScript. Block untrusted inline SVGs.',
    magicBytes: ['3C', '73', '76', '67'], // '<svg'
  },
  
  // Images
  {
    extension: '.png',
    mime: 'image/png',
    category: 'image',
    description: 'Portable Network Graphics (PNG) lossless raster image format supporting alpha channels.',
    behavior: 'Renders inline as image resource.',
    security: 'Safe. Image compression payload, though metadata (EXIF) can contain text strings.',
    magicBytes: ['89', '50', '4E', '47', '0D', '0A', '1A', '0A']
  },
  {
    extension: '.jpg',
    mime: 'image/jpeg',
    category: 'image',
    description: 'Joint Photographic Experts Group (JPEG) lossy compressed photographic image.',
    behavior: 'Renders inline as image resource.',
    security: 'Safe.',
    magicBytes: ['FF', 'D8', 'FF'],
    alternatives: ['image/jpg', 'image/pjpeg']
  },
  {
    extension: '.jpeg',
    mime: 'image/jpeg',
    category: 'image',
    description: 'Joint Photographic Experts Group (JPEG) lossy compressed photographic image.',
    behavior: 'Renders inline as image resource.',
    security: 'Safe.',
    magicBytes: ['FF', 'D8', 'FF'],
    alternatives: ['image/jpg', 'image/pjpeg']
  },
  {
    extension: '.gif',
    mime: 'image/gif',
    category: 'image',
    description: 'Graphics Interchange Format (GIF) supporting frame animations and index colors.',
    behavior: 'Renders inline as animated image.',
    security: 'Safe.',
    magicBytes: ['47', '49', '46', '38'] // 'GIF8'
  },
  {
    extension: '.webp',
    mime: 'image/webp',
    category: 'image',
    description: 'Web Picture (WebP) modern image format offering superior lossless and lossy layout compressions.',
    behavior: 'Renders inline as image resource.',
    security: 'Safe.',
    magicBytes: ['52', '49', '46', '46'] // RIFF signature (Check webp later)
  },
  {
    extension: '.ico',
    mime: 'image/x-icon',
    category: 'image',
    description: 'Icon resource file used for favicon website headers.',
    behavior: 'Renders inline inside browser tab bars and bookmarks.',
    security: 'Safe.',
    magicBytes: ['00', '00', '01', '00']
  },
  {
    extension: '.bmp',
    mime: 'image/bmp',
    category: 'image',
    description: 'Bitmap Image File (BMP) device independent raster file format.',
    behavior: 'Renders inline as uncompressed graphics.',
    security: 'Safe.',
    magicBytes: ['42', '4D'], // BM
    alternatives: ['image/x-ms-bmp', 'image/x-bmp']
  },
  {
    extension: '.tiff',
    mime: 'image/tiff',
    category: 'image',
    description: 'Tagged Image File Format (TIFF) high quality graphics file format.',
    behavior: 'Downloads automatically or renders using browser plug-ins.',
    security: 'Safe.',
    magicBytes: ['49', '49', '2A', '00'], // II* (Little Endian) or MM (Big Endian)
    alternatives: ['image/x-tiff']
  },

  // Audio
  {
    extension: '.mp3',
    mime: 'audio/mpeg',
    category: 'audio',
    description: 'MPEG Layer 3 (MP3) lossy compressed audio track stream.',
    behavior: 'Plays inline using browser media tools or prompts player integration.',
    security: 'Safe.',
    magicBytes: ['49', '44', '33'], // ID3 or FF FB
    alternatives: ['audio/mp3', 'audio/x-mpeg-3']
  },
  {
    extension: '.wav',
    mime: 'audio/wav',
    category: 'audio',
    description: 'Waveform Audio File Format (WAV) uncompressed audio digital stream.',
    behavior: 'Plays/streams inline.',
    security: 'Safe.',
    magicBytes: ['52', '49', '46', '46'], // RIFF
    alternatives: ['audio/x-wav', 'audio/wave']
  },
  {
    extension: '.ogg',
    mime: 'audio/ogg',
    category: 'audio',
    description: 'Ogg Vorbis compressed audio track stream.',
    behavior: 'Plays/streams inline.',
    security: 'Safe.',
    magicBytes: ['4F', '67', '67', '53'], // OggS
    alternatives: ['application/ogg']
  },
  {
    extension: '.aac',
    mime: 'audio/aac',
    category: 'audio',
    description: 'Advanced Audio Coding (AAC) audio track format.',
    behavior: 'Plays/streams inline.',
    security: 'Safe.',
    magicBytes: ['FF', 'F1'] // ADTS frame sync
  },
  {
    extension: '.flac',
    mime: 'audio/flac',
    category: 'audio',
    description: 'Free Lossless Audio Codec (FLAC) high fidelity audio format.',
    behavior: 'Streams or downloads depending on browser capability.',
    security: 'Safe.',
    magicBytes: ['66', '4C', '61', '43'], // fLaC
    alternatives: ['audio/x-flac']
  },

  // Video
  {
    extension: '.mp4',
    mime: 'video/mp4',
    category: 'video',
    description: 'MPEG-4 Part 14 (MP4) standardized multimedia video container.',
    behavior: 'Plays/streams inline with video hardware acceleration.',
    security: 'Safe.',
    magicBytes: ['00', '00', '00'] // Offset check for 'ftyp'
  },
  {
    extension: '.webm',
    mime: 'video/webm',
    category: 'video',
    description: 'WebM video container format optimized for web streaming.',
    behavior: 'Plays/streams inline.',
    security: 'Safe.',
    magicBytes: ['1A', '45', 'DF', 'A3'] // EBML Header
  },
  {
    extension: '.avi',
    mime: 'video/x-msvideo',
    category: 'video',
    description: 'Audio Video Interleave (AVI) legacy video container format.',
    behavior: 'Downloads automatically or stream matches external player.',
    security: 'Safe.',
    magicBytes: ['52', '49', '46', '46'], // RIFF
  },
  {
    extension: '.mov',
    mime: 'video/quicktime',
    category: 'video',
    description: 'Apple QuickTime Movie file format.',
    behavior: 'Streams inline or downloads depending on user device.',
    security: 'Safe.',
    magicBytes: ['00', '00', '00'] // ftypqt
  },

  // Documents
  {
    extension: '.pdf',
    mime: 'application/pdf',
    category: 'application',
    description: 'Portable Document Format (PDF) document representing pages layout.',
    behavior: 'Renders inline using built-in PDF viewer frame, or prompts download.',
    security: 'Medium risk. PDF documents can contain malicious scripting payloads, link redirections, or format exploits.',
    magicBytes: ['25', '50', '44', '46'] // %PDF
  },
  {
    extension: '.txt',
    mime: 'text/plain',
    category: 'text',
    description: 'Plain Text document file containing raw unformatted string values.',
    behavior: 'Renders inline as raw text document.',
    security: 'Safe. Script tags are rendered as text string markup and cannot execute scripts.',
  },
  {
    extension: '.csv',
    mime: 'text/csv',
    category: 'text',
    description: 'Comma-Separated Values (CSV) database layout grid.',
    behavior: 'Downloads automatically or renders in raw text viewport.',
    security: 'Safe, but watch out for CSV Formula Injection (Macro execution) when opened in Excel.',
  },
  {
    extension: '.md',
    mime: 'text/markdown',
    category: 'text',
    description: 'Markdown documentation formatting file.',
    behavior: 'Downloads or renders as plain text. Compiled dynamically on modern interfaces.',
    security: 'Safe, unless parsed to raw HTML without escaping tags.',
  },
  {
    extension: '.doc',
    mime: 'application/msword',
    category: 'application',
    description: 'Microsoft Word legacy document format.',
    behavior: 'Downloads automatically. Bypasses inline rendering.',
    security: 'Medium risk. Macro scripts inside can trigger Trojan installations if enabled locally.',
    magicBytes: ['D0', 'CF', '11', 'E0', 'A1', 'B1', '1A', 'E1'] // OLE signature
  },
  {
    extension: '.docx',
    mime: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    category: 'application',
    description: 'Microsoft Word OpenXML document format.',
    behavior: 'Downloads automatically.',
    security: 'Medium risk. Can carry embedded macros or template injection pathways.',
    magicBytes: ['50', '4B', '03', '04'] // ZIP container (docx is zipped XMLs)
  },
  {
    extension: '.xls',
    mime: 'application/vnd.ms-excel',
    category: 'application',
    description: 'Microsoft Excel legacy spreadsheet spreadsheet data.',
    behavior: 'Downloads automatically.',
    security: 'Medium risk. Macro script vulnerabilities.',
    magicBytes: ['D0', 'CF', '11', 'E0', 'A1', 'B1', '1A', 'E1']
  },
  {
    extension: '.xlsx',
    mime: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    category: 'application',
    description: 'Microsoft Excel OpenXML spreadsheet database.',
    behavior: 'Downloads automatically.',
    security: 'Medium risk.',
    magicBytes: ['50', '4B', '03', '04']
  },

  // Archives
  {
    extension: '.zip',
    mime: 'application/zip',
    category: 'archive',
    description: 'ZIP compressed folder container compressing multiple file volumes.',
    behavior: 'Downloads automatically.',
    security: 'Medium risk. Serves as a packaging envelope. Can carry malware executables or zip-bomb scripts.',
    magicBytes: ['50', '4B', '03', '04'], // PK..
    alternatives: ['application/x-zip-compressed']
  },
  {
    extension: '.rar',
    mime: 'application/vnd.rar',
    category: 'archive',
    description: 'RAR compressed archive folder database.',
    behavior: 'Downloads automatically.',
    security: 'Medium risk. Container for potentially unsafe scripts.',
    magicBytes: ['52', '61', '72', '21', '1A', '07'], // Rar!
    alternatives: ['application/x-rar-compressed']
  },
  {
    extension: '.tar',
    mime: 'application/x-tar',
    category: 'archive',
    description: 'Tape Archive (TAR) uncompressed packing container.',
    behavior: 'Downloads automatically.',
    security: 'Safe container.',
  },
  {
    extension: '.gz',
    mime: 'application/gzip',
    category: 'archive',
    description: 'Gzip compressed archive resource.',
    behavior: 'Downloads automatically.',
    security: 'Safe container.',
    magicBytes: ['1F', '8B'],
    alternatives: ['application/x-gzip']
  },
  {
    extension: '.7z',
    mime: 'application/x-7z-compressed',
    category: 'archive',
    description: '7-Zip ultra-compressed archive container format.',
    behavior: 'Downloads automatically.',
    security: 'Medium risk. Envelope container.',
    magicBytes: ['37', '7A', 'BC', 'AF', '27', '1C']
  },

  // Fonts
  {
    extension: '.woff',
    mime: 'font/woff',
    category: 'font',
    description: 'Web Open Font Format (WOFF) design asset.',
    behavior: 'Parsed inline by font loader. Does not render directly.',
    security: 'Safe. Strict font parser validation.',
    magicBytes: ['77', '4F', '46', '46'], // wOFF
    alternatives: ['application/font-woff']
  },
  {
    extension: '.woff2',
    mime: 'font/woff2',
    category: 'font',
    description: 'Compressed Web Open Font Format (WOFF2) asset.',
    behavior: 'Parsed inline.',
    security: 'Safe.',
    magicBytes: ['77', '4F', '46', '32'], // wOF2
    alternatives: ['application/font-woff2']
  },
  {
    extension: '.ttf',
    mime: 'font/ttf',
    category: 'font',
    description: 'TrueType Font format design asset.',
    behavior: 'Parsed inline or downloads.',
    security: 'Safe.',
    magicBytes: ['00', '01', '00', '00'],
    alternatives: ['application/font-sfnt', 'application/x-font-ttf']
  },
  {
    extension: '.otf',
    mime: 'font/otf',
    category: 'font',
    description: 'OpenType Font format design asset.',
    behavior: 'Parsed inline or downloads.',
    security: 'Safe.',
    magicBytes: ['4F', '54', '54', '4F'], // OTTO
    alternatives: ['application/font-sfnt', 'application/x-font-opentype']
  },

  // Executables & Binaries (Dangerous types)
  {
    extension: '.exe',
    mime: 'application/x-msdownload',
    category: 'binary',
    description: 'Windows Executable file. Launches installations and programs.',
    behavior: 'Downloads automatically. Blocks inline rendering. Triggers security warn scripts in modern viewports.',
    security: 'DANGEROUS. Executes scripts directly on local CPU. High risk of malware, keyloggers, and server exploits.',
    magicBytes: ['4D', '5A'], // MZ signature
    alternatives: ['application/octet-stream', 'application/x-msdos-program']
  },
  {
    extension: '.msi',
    mime: 'application/x-msi',
    category: 'binary',
    description: 'Windows Installer database package.',
    behavior: 'Downloads automatically.',
    security: 'DANGEROUS. Executes install scripts with administrative credentials.',
    magicBytes: ['D0', 'CF', '11', 'E0', 'A1', 'B1', '1A', 'E1'],
    alternatives: ['application/octet-stream']
  },
  {
    extension: '.dmg',
    mime: 'application/x-apple-diskimage',
    category: 'binary',
    description: 'macOS Disk Image file containing application installations.',
    behavior: 'Downloads automatically.',
    security: 'DANGEROUS. Container for macOS binary installations.',
    alternatives: ['application/octet-stream']
  },
  {
    extension: '.sh',
    mime: 'application/x-sh',
    category: 'binary',
    description: 'Linux/Unix Shell Script command line file.',
    behavior: 'Downloads automatically.',
    security: 'DANGEROUS. Contains execution sequences that run directly on terminal shells.',
    magicBytes: ['23', '21'], // '#!' script tag
  },
  {
    extension: '.bat',
    mime: 'application/x-bat',
    category: 'binary',
    description: 'Windows Batch Script file containing command lines.',
    behavior: 'Downloads automatically.',
    security: 'DANGEROUS. Contains command execution lines.',
  },
  {
    extension: '.apk',
    mime: 'application/vnd.android.package-archive',
    category: 'binary',
    description: 'Android Package Archive file representing app installs.',
    behavior: 'Downloads automatically.',
    security: 'DANGEROUS. Software installer container.',
    magicBytes: ['50', '4B', '03', '04'] // ZIP container
  },
  {
    extension: '.wasm',
    mime: 'application/wasm',
    category: 'binary',
    description: 'WebAssembly binary compilation format.',
    behavior: 'Executed inline by browser JavaScript runtime.',
    security: 'Medium risk. Executes compiled modules at near-native speeds, sandbox checks apply.',
    magicBytes: ['00', '61', '73', '6D'] // \0asm
  },
  {
    extension: '.bin',
    mime: 'application/octet-stream',
    category: 'binary',
    description: 'Raw binary stream data, usually fallback for undefined media.',
    behavior: 'Downloads automatically.',
    security: 'Medium risk. Generic wrapper for arbitrary raw binaries.',
  }
];

export const CATEGORY_LABELS: Record<string, string> = {
  text: 'Text Document',
  image: 'Image Asset',
  audio: 'Audio Track',
  video: 'Video Stream',
  application: 'Application Resource',
  font: 'Web Font',
  archive: 'Compressed Archive',
  binary: 'Binary Executable'
};
