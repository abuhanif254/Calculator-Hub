"use client";

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import QRCode from 'qrcode';
import JSZip from 'jszip';
import { 
  QrCode, 
  Download, 
  Copy, 
  Check, 
  Link2, 
  Wifi, 
  Mail, 
  Phone, 
  MessageSquare, 
  User, 
  MapPin, 
  Calendar, 
  FileText, 
  Upload, 
  Trash2, 
  RefreshCw, 
  Sliders, 
  Palette, 
  Image as ImageIcon, 
  Heart, 
  Share2, 
  Settings, 
  History, 
  ArrowRight, 
  Scan, 
  Eye, 
  ShieldCheck, 
  Sparkles,
  Info,
  DollarSign
} from 'lucide-react';

type QRType = 'url' | 'text' | 'wifi' | 'vcard' | 'email' | 'sms' | 'phone' | 'whatsapp' | 'location' | 'event' | 'social' | 'crypto';
type DotStyle = 'square' | 'dots' | 'rounded';
type EyeStyle = 'square' | 'rounded' | 'circle';

interface HistoryItem {
  id: string;
  type: QRType;
  label: string;
  payload: string;
  timestamp: number;
  config: any;
}

// Pure helper function defined outside the React render lifecycle to satisfy rules of hooks
const getTimestamp = (): number => {
  return Date.now();
};

export default function QrCodeGenerator() {
  const t = useTranslations('QrCodeGenerator');
  
  // Active Generator Tab
  const [activeTab, setActiveTab] = useState<QRType>('url');
  
  // Content inputs
  const [url, setUrl] = useState('https://nexuscalculator.net');
  const [text, setText] = useState('');
  
  // WiFi
  const [wifiSsid, setWifiSsid] = useState('MyWiFiNetwork');
  const [wifiPassword, setWifiPassword] = useState('securitySecret');
  const [wifiEncryption, setWifiEncryption] = useState('WPA');
  const [wifiHidden, setWifiHidden] = useState(false);
  
  // vCard
  const [vcardFirst, setVcardFirst] = useState('John');
  const [vcardLast, setVcardLast] = useState('Doe');
  const [vcardCompany, setVcardCompany] = useState('Acme Corp');
  const [vcardTitle, setVcardTitle] = useState('Lead Architect');
  const [vcardPhone, setVcardPhone] = useState('+15551234567');
  const [vcardEmail, setVcardEmail] = useState('john@acme.com');
  const [vcardWebsite, setVcardWebsite] = useState('https://acme.com');
  const [vcardStreet, setVcardStreet] = useState('123 Cyber Way');
  const [vcardCity, setVcardCity] = useState('Austin');
  const [vcardZip, setVcardZip] = useState('78701');
  const [vcardCountry, setVcardCountry] = useState('USA');
  
  // Email
  const [emailTo, setEmailTo] = useState('support@yoursite.com');
  const [emailSubject, setEmailSubject] = useState('Feedback Inquiry');
  const [emailBody, setEmailBody] = useState('Hello Team,\n\nI have a question about...');
  
  // SMS
  const [smsPhone, setSmsPhone] = useState('+15559876543');
  const [smsMessage, setSmsMessage] = useState('Hello! I would like to join the guest list.');
  
  // Phone
  const [phoneNum, setPhoneNum] = useState('+15559876543');
  
  // WhatsApp
  const [waPhone, setWaPhone] = useState('15559876543');
  const [waMessage, setWaMessage] = useState('Interested in your custom branding options.');
  
  // Location
  const [locLat, setLocLat] = useState('37.7749');
  const [locLng, setLocLng] = useState('-122.4194');
  
  // Event
  const [evtTitle, setEvtTitle] = useState('Annual Summit 2026');
  const [evtStart, setEvtStart] = useState('2026-06-15T09:00');
  const [evtEnd, setEvtEnd] = useState('2026-06-15T17:00');
  const [evtLoc, setEvtLoc] = useState('Grand Hall Room 4');
  const [evtDesc, setEvtDesc] = useState('Keynote sessions and developer roundtables.');
  
  // Social
  const [socialPlatform, setSocialPlatform] = useState('x');
  const [socialUser, setSocialUser] = useState('nexuscalculator');
  
  // Crypto
  const [cryptoCoin, setCryptoCoin] = useState('bitcoin');
  const [cryptoAddress, setCryptoAddress] = useState('1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa');
  const [cryptoAmount, setCryptoAmount] = useState('');
  
  // ────────────────────────────────────────────────────────
  // QR Designer Configurations
  // ────────────────────────────────────────────────────────
  const [qrSize, setQrSize] = useState<number>(512);
  const [qrMargin, setQrMargin] = useState<number>(4);
  const [errorCorrection, setErrorCorrection] = useState<string>('H'); // Default H for logo safety
  
  // Styling
  const [dotStyle, setDotStyle] = useState<DotStyle>('square');
  const [eyeStyle, setEyeStyle] = useState<EyeStyle>('square');
  
  // Colors
  const [fgType, setFgType] = useState<'solid' | 'gradient'>('solid');
  const [fgColor, setFgColor] = useState<string>('#1e293b'); // Dark Slate
  const [bgColor, setBgColor] = useState<string>('#ffffff');
  const [transparentBg, setTransparentBg] = useState<boolean>(false);
  
  // Gradients
  const [gradientStart, setGradientStart] = useState<string>('#1e293b');
  const [gradientEnd, setGradientEnd] = useState<string>('#15803d'); // Dark Green
  const [gradientType, setGradientType] = useState<'linear' | 'radial'>('linear');
  const [gradientAngle, setGradientAngle] = useState<number>(45);
  
  // Eye Colors
  const [customEyeColors, setCustomEyeColors] = useState<boolean>(false);
  const [eyeColor, setEyeColor] = useState<string>('#1e293b');
  const [eyeCenterColor, setEyeCenterColor] = useState<string>('#15803d');
  
  // Logo Settings
  const [hasLogo, setHasLogo] = useState<boolean>(false);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoDataUrl, setLogoDataUrl] = useState<string>('');
  const [logoScale, setLogoScale] = useState<number>(0.2); // Default 20%
  const [logoBgColor, setLogoBgColor] = useState<string>('#ffffff');
  const [logoBorderRadius, setLogoBorderRadius] = useState<number>(20); // Border radius percentage
  const logoImageRef = useRef<HTMLImageElement | null>(null);
  
  // ────────────────────────────────────────────────────────
  // Output & UI states
  // ────────────────────────────────────────────────────────
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [qrPayload, setQrPayload] = useState<string>('');
  
  const [copiedPayload, setCopiedPayload] = useState(false);
  const [copiedImage, setCopiedImage] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);
  
  // Scan Simulator State
  const [scanning, setScanning] = useState(false);
  const [scanResult, setScanResult] = useState<string | null>(null);
  
  // History State
  const [history, setHistory] = useState<HistoryItem[]>([]);
  
  // Batch Mode States
  const [batchMode, setBatchMode] = useState<boolean>(false);
  const [batchInput, setBatchInput] = useState<string>(
    "https://nexuscalculator.net\nhttps://google.com\nhttps://github.com"
  );
  const [batchQrs, setBatchQrs] = useState<{ label: string; payload: string; dataUrl: string }[]>([]);
  const [isGeneratingBatch, setIsGeneratingBatch] = useState<boolean>(false);

  // ────────────────────────────────────────────────────────
  // 1. Calculate Payload based on Active Tab Inputs
  // ────────────────────────────────────────────────────────
  useEffect(() => {
    let payload = '';
    
    switch (activeTab) {
      case 'url':
        payload = url.startsWith('http://') || url.startsWith('https://') ? url : `https://${url}`;
        break;
      case 'text':
        payload = text;
        break;
      case 'wifi':
        // WIFI:S:SSID;T:WPA;P:Password;H:false;;
        const hiddenStr = wifiHidden ? 'true' : 'false';
        payload = `WIFI:S:${wifiSsid};T:${wifiEncryption};P:${wifiPassword};H:${hiddenStr};;`;
        break;
      case 'vcard':
        // vCard v3.0 format
        payload = `BEGIN:VCARD\nVERSION:3.0\nN:${vcardLast};${vcardFirst};;;\nFN:${vcardFirst} ${vcardLast}\nORG:${vcardCompany}\nTITLE:${vcardTitle}\nTEL;TYPE=CELL:${vcardPhone}\nEMAIL;TYPE=INTERNET:${vcardEmail}\nURL:${vcardWebsite}\nADR;TYPE=WORK:;;${vcardStreet};${vcardCity};;${vcardZip};${vcardCountry}\nEND:VCARD`;
        break;
      case 'email':
        payload = `mailto:${emailTo}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
        break;
      case 'sms':
        payload = `SMTO:${smsPhone}:${smsMessage}`;
        break;
      case 'phone':
        payload = `tel:${phoneNum}`;
        break;
      case 'whatsapp':
        payload = `https://wa.me/${waPhone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(waMessage)}`;
        break;
      case 'location':
        payload = `https://www.google.com/maps/search/?api=1&query=${locLat},${locLng}`;
        break;
      case 'event':
        // iCalendar standard VEVENT
        const formatEventDate = (dtStr: string) => {
          if (!dtStr) return '';
          return dtStr.replace(/[-:]/g, '') + '00'; // YYYYMMDDTHHMMSS
        };
        payload = `BEGIN:VEVENT\nSUMMARY:${evtTitle}\nDTSTART:${formatEventDate(evtStart)}\nDTEND:${formatEventDate(evtEnd)}\nLOCATION:${evtLoc}\nDESCRIPTION:${evtDesc}\nEND:VEVENT`;
        break;
      case 'social':
        const username = socialUser.trim();
        if (socialPlatform === 'x') payload = `https://x.com/${username}`;
        else if (socialPlatform === 'facebook') payload = `https://facebook.com/${username}`;
        else if (socialPlatform === 'instagram') payload = `https://instagram.com/${username}`;
        else if (socialPlatform === 'linkedin') payload = `https://linkedin.com/in/${username}`;
        else if (socialPlatform === 'github') payload = `https://github.com/${username}`;
        else if (socialPlatform === 'youtube') payload = `https://youtube.com/@${username}`;
        break;
      case 'crypto':
        if (cryptoCoin === 'bitcoin') {
          payload = `bitcoin:${cryptoAddress}${cryptoAmount ? `?amount=${cryptoAmount}` : ''}`;
        } else if (cryptoCoin === 'ethereum') {
          payload = `ethereum:${cryptoAddress}${cryptoAmount ? `?value=${cryptoAmount}` : ''}`;
        } else if (cryptoCoin === 'solana') {
          payload = `solana:${cryptoAddress}${cryptoAmount ? `?amount=${cryptoAmount}` : ''}`;
        }
        break;
      default:
        payload = '';
    }
    
    setQrPayload(payload);
  }, [
    activeTab, url, text, wifiSsid, wifiPassword, wifiEncryption, wifiHidden,
    vcardFirst, vcardLast, vcardCompany, vcardTitle, vcardPhone, vcardEmail, vcardWebsite, vcardStreet, vcardCity, vcardZip, vcardCountry,
    emailTo, emailSubject, emailBody, smsPhone, smsMessage, phoneNum, waPhone, waMessage,
    locLat, locLng, evtTitle, evtStart, evtEnd, evtLoc, evtDesc, socialPlatform, socialUser,
    cryptoCoin, cryptoAddress, cryptoAmount
  ]);

  // Load URL query params if present for states sharing
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const textParam = params.get('text');
      const typeParam = params.get('type');
      if (textParam) {
        setActiveTab('text');
        setText(textParam);
      } else if (typeParam) {
        setActiveTab(typeParam as QRType);
      }
    }
  }, []);

  // Load History from Local Storage
  useEffect(() => {
    const saved = localStorage.getItem('qrHistory');
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse history logs", e);
      }
    }
  }, []);

  // ────────────────────────────────────────────────────────
  // 2. Render Loop on Canvas
  // ────────────────────────────────────────────────────────
  useEffect(() => {
    if (!qrPayload || !canvasRef.current) return;

    const canvas = canvasRef.current;
    
    const drawQR = () => {
      try {
        const qr = QRCode.create(qrPayload, { errorCorrectionLevel: errorCorrection as any });
        const moduleCount = qr.modules.size;
        const totalModules = moduleCount + qrMargin * 2;
        const moduleSize = qrSize / totalModules;

        canvas.width = qrSize;
        canvas.height = qrSize;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // 1) Fill Background
        if (transparentBg) {
          ctx.clearRect(0, 0, qrSize, qrSize);
        } else {
          ctx.fillStyle = bgColor;
          ctx.fillRect(0, 0, qrSize, qrSize);
        }

        // 2) Setup Foreground fill style
        let fillStyle: string | CanvasGradient = fgColor;
        if (fgType === 'gradient') {
          const start = gradientStart;
          const end = gradientEnd;
          if (gradientType === 'radial') {
            const radialGrad = ctx.createRadialGradient(qrSize/2, qrSize/2, 10, qrSize/2, qrSize/2, qrSize * 0.7);
            radialGrad.addColorStop(0, start);
            radialGrad.addColorStop(1, end);
            fillStyle = radialGrad;
          } else {
            const radAngle = (gradientAngle * Math.PI) / 180;
            const x1 = qrSize/2 - Math.cos(radAngle) * (qrSize/2);
            const y1 = qrSize/2 - Math.sin(radAngle) * (qrSize/2);
            const x2 = qrSize/2 + Math.cos(radAngle) * (qrSize/2);
            const y2 = qrSize/2 + Math.sin(radAngle) * (qrSize/2);
            
            const linearGrad = ctx.createLinearGradient(x1, y1, x2, y2);
            linearGrad.addColorStop(0, start);
            linearGrad.addColorStop(1, end);
            fillStyle = linearGrad;
          }
        }

        // 3) Finders Eyes areas check
        const isEyeElement = (r: number, c: number) => {
          if (r < 7 && c < 7) return 'topLeft';
          if (r < 7 && c >= moduleCount - 7) return 'topRight';
          if (r >= moduleCount - 7 && c < 7) return 'bottomLeft';
          return null;
        };

        // 4) Center Logo clearing check
        const inCenterLogoArea = (r: number, c: number) => {
          if (!hasLogo || !logoDataUrl) return false;
          const center = Math.floor(moduleCount / 2);
          // Number of modules cleared depends on scaling size
          const radius = Math.ceil(moduleCount * logoScale / 2) + 1; // pad by 1 module margin
          return Math.abs(r - center) <= radius && Math.abs(c - center) <= radius;
        };

        // 5) Draw regular Modules
        ctx.fillStyle = fillStyle;
        for (let r = 0; r < moduleCount; r++) {
          for (let c = 0; c < moduleCount; c++) {
            if (qr.modules.get(r, c)) {
              if (isEyeElement(r, c)) continue; // skip eyes, drawn customly
              if (inCenterLogoArea(r, c)) continue; // skip central logo area

              const x = (c + qrMargin) * moduleSize;
              const y = (r + qrMargin) * moduleSize;

              if (dotStyle === 'dots') {
                ctx.beginPath();
                ctx.arc(x + moduleSize/2, y + moduleSize/2, (moduleSize/2) * 0.9, 0, Math.PI * 2);
                ctx.fill();
              } else if (dotStyle === 'rounded') {
                ctx.beginPath();
                const radius = moduleSize * 0.45;
                if (typeof ctx.roundRect === 'function') {
                  ctx.roundRect(x + moduleSize*0.05, y + moduleSize*0.05, moduleSize*0.9, moduleSize*0.9, radius);
                } else {
                  // Fallback standard fill
                  ctx.rect(x, y, moduleSize, moduleSize);
                }
                ctx.fill();
              } else {
                // Square
                ctx.fillRect(Math.round(x), Math.round(y), Math.ceil(moduleSize), Math.ceil(moduleSize));
              }
            }
          }
        }

        // 6) Draw Custom Eye Border & Dots
        const drawSingleEye = (cx: number, cy: number) => {
          const x = (cx + qrMargin) * moduleSize;
          const y = (cy + qrMargin) * moduleSize;
          const size = moduleSize * 7;
          
          const strokeWidth = size / 7;
          const frameSize = size - strokeWidth;
          const centerSize = size * 3 / 7;
          const centerOffset = size * 2 / 7;

          const frameColor = customEyeColors ? eyeColor : (typeof fillStyle === 'string' ? fillStyle : fgColor);
          const centerDotColor = customEyeColors ? eyeCenterColor : (typeof fillStyle === 'string' ? fillStyle : fgColor);

          // Frame border radius
          const frameRadius = eyeStyle === 'rounded' ? size * 0.25 : eyeStyle === 'circle' ? size * 0.5 : 0;
          const centerRadius = eyeStyle === 'rounded' ? centerSize * 0.25 : eyeStyle === 'circle' ? centerSize * 0.5 : 0;

          // Outer Eye Border Frame
          ctx.save();
          ctx.lineWidth = strokeWidth;
          ctx.strokeStyle = frameColor;
          ctx.beginPath();
          if (typeof ctx.roundRect === 'function') {
            ctx.roundRect(x + strokeWidth/2, y + strokeWidth/2, frameSize, frameSize, frameRadius);
          } else {
            ctx.rect(x, y, size, size);
          }
          ctx.stroke();
          ctx.restore();

          // Inner Eye Center Dot
          ctx.fillStyle = centerDotColor;
          ctx.beginPath();
          if (typeof ctx.roundRect === 'function') {
            ctx.roundRect(x + centerOffset, y + centerOffset, centerSize, centerSize, centerRadius);
          } else {
            ctx.rect(x + centerOffset, y + centerOffset, centerSize, centerSize);
          }
          ctx.fill();
        };

        drawSingleEye(0, 0); // Top-Left
        drawSingleEye(moduleCount - 7, 0); // Top-Right
        drawSingleEye(0, moduleCount - 7); // Bottom-Left

        // 7) Draw Brand Logo Overlay
        if (hasLogo && logoDataUrl && logoImageRef.current) {
          const img = logoImageRef.current;
          
          const drawLogo = () => {
            const logoPixelSize = qrSize * logoScale;
            const logoX = (qrSize - logoPixelSize) / 2;
            const logoY = (qrSize - logoPixelSize) / 2;
            const logoRadius = (logoBorderRadius * logoPixelSize) / 100;

            // Draw clean background behind logo
            ctx.fillStyle = logoBgColor;
            ctx.beginPath();
            if (typeof ctx.roundRect === 'function') {
              ctx.roundRect(logoX - 3, logoY - 3, logoPixelSize + 6, logoPixelSize + 6, logoRadius + 3);
            } else {
              ctx.rect(logoX - 3, logoY - 3, logoPixelSize + 6, logoPixelSize + 6);
            }
            ctx.fill();

            // Clip and draw image
            ctx.save();
            ctx.beginPath();
            if (typeof ctx.roundRect === 'function') {
              ctx.roundRect(logoX, logoY, logoPixelSize, logoPixelSize, logoRadius);
            } else {
              ctx.rect(logoX, logoY, logoPixelSize, logoPixelSize);
            }
            ctx.clip();
            ctx.drawImage(img, logoX, logoY, logoPixelSize, logoPixelSize);
            ctx.restore();
          };

          // If image is already complete, draw immediately
          if (img.complete) {
            drawLogo();
          } else {
            img.onload = () => {
              drawLogo();
            };
          }
        }
      } catch (err) {
        console.error("QR Code canvas draw error:", err);
      }
    };

    // Delay drawing slightly to let state register
    const renderTimer = setTimeout(() => {
      drawQR();
    }, 100);

    return () => clearTimeout(renderTimer);
  }, [
    qrPayload, qrSize, qrMargin, errorCorrection, dotStyle, eyeStyle, fgType, fgColor, bgColor,
    transparentBg, gradientStart, gradientEnd, gradientType, gradientAngle,
    customEyeColors, eyeColor, eyeCenterColor, hasLogo, logoDataUrl, logoScale, logoBgColor, logoBorderRadius
  ]);

  // ────────────────────────────────────────────────────────
  // 3. Image Handlers & Copy Commands
  // ────────────────────────────────────────────────────────
  const saveToHistoryLog = () => {
    if (!qrPayload) return;
    
    // Label for history listing
    let label = '';
    if (activeTab === 'url') label = url;
    else if (activeTab === 'wifi') label = `WiFi: ${wifiSsid}`;
    else if (activeTab === 'vcard') label = `vCard: ${vcardFirst} ${vcardLast}`;
    else if (activeTab === 'email') label = `Email: ${emailTo}`;
    else if (activeTab === 'sms') label = `SMS: ${smsPhone}`;
    else if (activeTab === 'crypto') label = `${cryptoCoin.toUpperCase()} Address`;
    else label = qrPayload.substring(0, 30) + (qrPayload.length > 30 ? '...' : '');

    const newItem: HistoryItem = {
      id: crypto.randomUUID(),
      type: activeTab,
      label,
      payload: qrPayload,
      timestamp: getTimestamp(),
      config: {
        dotStyle,
        eyeStyle,
        fgType,
        fgColor,
        bgColor,
        transparentBg,
        gradientStart,
        gradientEnd,
        gradientType,
        gradientAngle,
        customEyeColors,
        eyeColor,
        eyeCenterColor,
        hasLogo,
        logoDataUrl,
        logoScale,
        logoBgColor,
        logoBorderRadius,
        qrMargin,
        errorCorrection
      }
    };

    setHistory(prev => {
      // Avoid duplicate history entries consecutively
      if (prev.length > 0 && prev[0].payload === qrPayload && prev[0].type === activeTab) {
        return prev;
      }
      const updated = [newItem, ...prev].slice(0, 10);
      localStorage.setItem('qrHistory', JSON.stringify(updated));
      return updated;
    });
  };

  const handleCopyPayload = () => {
    navigator.clipboard.writeText(qrPayload);
    setCopiedPayload(true);
    setTimeout(() => setCopiedPayload(false), 2000);
    saveToHistoryLog();
  };

  const handleCopyImage = () => {
    if (!canvasRef.current) return;
    canvasRef.current.toBlob((blob) => {
      if (blob) {
        try {
          navigator.clipboard.write([
            new ClipboardItem({ 'image/png': blob })
          ]);
          setCopiedImage(true);
          setTimeout(() => setCopiedImage(false), 2000);
          saveToHistoryLog();
        } catch (e) {
          alert("Image clipboard copy not supported in this browser. Please right-click the QR Code image to save/copy.");
        }
      }
    });
  };

  const handleDownloadPNG = () => {
    if (!canvasRef.current) return;
    const dataUrl = canvasRef.current.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = `qrcode_${activeTab}_${getTimestamp()}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    saveToHistoryLog();
  };

  const handleDownloadSVG = () => {
    const svgString = generateSVGString();
    const blob = new Blob([svgString], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `qrcode_${activeTab}_${getTimestamp()}.svg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    saveToHistoryLog();
  };

  const shareStateUrl = () => {
    if (typeof window !== 'undefined') {
      const base = window.location.origin + window.location.pathname;
      const shareUrl = `${base}?type=${activeTab}&text=${encodeURIComponent(qrPayload)}`;
      navigator.clipboard.writeText(shareUrl);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2000);
    }
  };

  // Helper to generate the exact vector representation as string
  const generateSVGString = (): string => {
    try {
      const qr = QRCode.create(qrPayload, { errorCorrectionLevel: errorCorrection as any });
      const moduleCount = qr.modules.size;
      const totalModules = moduleCount + qrMargin * 2;
      const scale = 10;
      const totalSize = totalModules * scale;
      
      let defs = '';
      let fillVal = fgColor;

      // Gradient config inside SVG
      if (fgType === 'gradient') {
        fillVal = 'url(#qr-vector-grad)';
        if (gradientType === 'radial') {
          defs = `<defs>
            <radialGradient id="qr-vector-grad" cx="50%" cy="50%" r="70%">
              <stop offset="0%" stop-color="${gradientStart}" />
              <stop offset="100%" stop-color="${gradientEnd}" />
            </radialGradient>
          </defs>`;
        } else {
          const rad = (gradientAngle * Math.PI) / 180;
          const x1 = Math.round(50 - Math.cos(rad) * 50);
          const y1 = Math.round(50 - Math.sin(rad) * 50);
          const x2 = Math.round(50 + Math.cos(rad) * 50);
          const y2 = Math.round(50 + Math.sin(rad) * 50);
          defs = `<defs>
            <linearGradient id="qr-vector-grad" x1="${x1}%" y1="${y1}%" x2="${x2}%" y2="${y2}%">
              <stop offset="0%" stop-color="${gradientStart}" />
              <stop offset="100%" stop-color="${gradientEnd}" />
            </linearGradient>
          </defs>`;
        }
      }

      // Finder Eyes checks
      const isEyeElement = (r: number, c: number) => {
        if (r < 7 && c < 7) return 'topLeft';
        if (r < 7 && c >= moduleCount - 7) return 'topRight';
        if (r >= moduleCount - 7 && c < 7) return 'bottomLeft';
        return null;
      };

      const inCenterLogoArea = (r: number, c: number) => {
        if (!hasLogo || !logoDataUrl) return false;
        const center = Math.floor(moduleCount / 2);
        const radius = Math.ceil(moduleCount * logoScale / 2) + 1;
        return Math.abs(r - center) <= radius && Math.abs(c - center) <= radius;
      };

      let bgRect = '';
      if (!transparentBg) {
        bgRect = `<rect width="${totalSize}" height="${totalSize}" fill="${bgColor}" />`;
      }

      let paths = '';
      for (let r = 0; r < moduleCount; r++) {
        for (let c = 0; c < moduleCount; c++) {
          if (qr.modules.get(r, c)) {
            if (isEyeElement(r, c)) continue;
            if (inCenterLogoArea(r, c)) continue;

            const x = (c + qrMargin) * scale;
            const y = (r + qrMargin) * scale;

            if (dotStyle === 'dots') {
              paths += `<circle cx="${x + scale/2}" cy="${y + scale/2}" r="${(scale/2) * 0.9}" fill="${fillVal}" />`;
            } else if (dotStyle === 'rounded') {
              const rVal = scale * 0.45;
              paths += `<rect x="${x + scale*0.05}" y="${y + scale*0.05}" width="${scale*0.9}" height="${scale*0.9}" rx="${rVal}" fill="${fillVal}" />`;
            } else {
              // Square
              paths += `<rect x="${x}" y="${y}" width="${scale}" height="${scale}" fill="${fillVal}" />`;
            }
          }
        }
      }

      // Draw custom eyes
      const eyeBorderColor = customEyeColors ? eyeColor : (fgType === 'gradient' ? 'url(#qr-vector-grad)' : fgColor);
      const eyeInnerColor = customEyeColors ? eyeCenterColor : (fgType === 'gradient' ? 'url(#qr-vector-grad)' : fgColor);

      const drawEyeSVG = (colIndex: number, rowIndex: number) => {
        const x = (colIndex + qrMargin) * scale;
        const y = (rowIndex + qrMargin) * scale;
        const eyeSize = scale * 7;
        const strokeW = eyeSize / 7;
        
        const frameRadius = eyeStyle === 'rounded' ? eyeSize * 0.25 : eyeStyle === 'circle' ? eyeSize * 0.5 : 0;
        const centerRadius = eyeStyle === 'rounded' ? (eyeSize * 3/7) * 0.25 : eyeStyle === 'circle' ? (eyeSize * 3/7) * 0.5 : 0;

        return `
          <!-- Eye Frame -->
          <rect x="${x + strokeW/2}" y="${y + strokeW/2}" width="${eyeSize - strokeW}" height="${eyeSize - strokeW}" rx="${frameRadius}" fill="none" stroke="${eyeBorderColor}" stroke-width="${strokeW}" />
          <!-- Eye Center -->
          <rect x="${x + strokeW*2}" y="${y + strokeW*2}" width="${eyeSize * 3/7}" height="${eyeSize * 3/7}" rx="${centerRadius}" fill="${eyeInnerColor}" />
        `;
      };

      paths += drawEyeSVG(0, 0); // TL
      paths += drawEyeSVG(moduleCount - 7, 0); // TR
      paths += drawEyeSVG(0, moduleCount - 7); // BL

      // Logo SVG
      let logoSvgElement = '';
      if (hasLogo && logoDataUrl) {
        const logoSize = totalSize * logoScale;
        const logoX = (totalSize - logoSize) / 2;
        const logoY = (totalSize - logoSize) / 2;
        const logoRadius = (logoBorderRadius * logoSize) / 100;

        logoSvgElement = `
          <!-- Logo Background border -->
          <rect x="${logoX - 3}" y="${logoY - 3}" width="${logoSize + 6}" height="${logoSize + 6}" rx="${logoRadius + 3}" fill="${logoBgColor}" />
          <!-- Logo Image -->
          <clipPath id="svg-logo-clip-path">
            <rect x="${logoX}" y="${logoY}" width="${logoSize}" height="${logoSize}" rx="${logoRadius}" />
          </clipPath>
          <image href="${logoDataUrl}" x="${logoX}" y="${logoY}" width="${logoSize}" height="${logoSize}" clip-path="url(#svg-logo-clip-path)" preserveAspectRatio="xMidYMid slice" />
        `;
      }

      return `<?xml version="1.0" encoding="utf-8"?>
<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${qrSize}" height="${qrSize}" viewBox="0 0 ${totalSize} ${totalSize}">
  ${defs}
  ${bgRect}
  ${paths}
  ${logoSvgElement}
</svg>`;
    } catch (err) {
      console.error("SVG builder failed", err);
      return '';
    }
  };

  // Logo file drag/upload handlers
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processLogoFile(file);
    }
  };

  const processLogoFile = (file: File) => {
    setLogoFile(file);
    setHasLogo(true);
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setLogoDataUrl(event.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const triggerScanSimulator = () => {
    if (!qrPayload) return;
    setScanning(true);
    setScanResult(null);
    
    // Simulate camera scan delay
    setTimeout(() => {
      setScanning(false);
      setScanResult(qrPayload);
    }, 2500);
  };

  const loadHistoryItem = (item: HistoryItem) => {
    setActiveTab(item.type);
    setQrPayload(item.payload);
    
    // Restore config
    const conf = item.config;
    if (conf) {
      setDotStyle(conf.dotStyle || 'square');
      setEyeStyle(conf.eyeStyle || 'square');
      setFgType(conf.fgType || 'solid');
      setFgColor(conf.fgColor || '#1e293b');
      setBgColor(conf.bgColor || '#ffffff');
      setTransparentBg(!!conf.transparentBg);
      setGradientStart(conf.gradientStart || '#1e293b');
      setGradientEnd(conf.gradientEnd || '#15803d');
      setGradientType(conf.gradientType || 'linear');
      setGradientAngle(conf.gradientAngle || 45);
      setCustomEyeColors(!!conf.customEyeColors);
      setEyeColor(conf.eyeColor || '#1e293b');
      setEyeCenterColor(conf.eyeCenterColor || '#15803d');
      setHasLogo(!!conf.hasLogo);
      setLogoDataUrl(conf.logoDataUrl || '');
      setLogoScale(conf.logoScale || 0.2);
      setLogoBgColor(conf.logoBgColor || '#ffffff');
      setLogoBorderRadius(conf.logoBorderRadius !== undefined ? conf.logoBorderRadius : 20);
      setQrMargin(conf.qrMargin !== undefined ? conf.qrMargin : 4);
      setErrorCorrection(conf.errorCorrection || 'H');
    }
  };

  const clearHistoryLog = () => {
    setHistory([]);
    localStorage.removeItem('qrHistory');
  };

  // ────────────────────────────────────────────────────────
  // 4. Batch QR Generation Logic
  // ────────────────────────────────────────────────────────
  const generateBatchQRs = async () => {
    const lines = batchInput
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0);
      
    if (lines.length === 0) {
      alert("Please enter at least one value or URL to generate in batch.");
      return;
    }

    setIsGeneratingBatch(true);
    const results: { label: string; payload: string; dataUrl: string }[] = [];

    // Helper to generate a single dynamic QR to Canvas and output DataURL
    const renderVirtualQr = (textLine: string): Promise<string> => {
      return new Promise((resolve, reject) => {
        try {
          const canvas = document.createElement('canvas');
          canvas.width = 300;
          canvas.height = 300;
          
          // Draw standard or styled QR onto virtual canvas
          const qr = QRCode.create(textLine, { errorCorrectionLevel: 'M' });
          const moduleCount = qr.modules.size;
          const totalModules = moduleCount + 8; // fixed 4 margin
          const moduleSize = 300 / totalModules;
          
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            reject();
            return;
          }
          
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, 300, 300);
          ctx.fillStyle = fgColor; // use active foreground color

          for (let r = 0; r < moduleCount; r++) {
            for (let c = 0; c < moduleCount; c++) {
              if (qr.modules.get(r, c)) {
                ctx.fillRect(
                  Math.round((c + 4) * moduleSize),
                  Math.round((r + 4) * moduleSize),
                  Math.ceil(moduleSize),
                  Math.ceil(moduleSize)
                );
              }
            }
          }
          resolve(canvas.toDataURL('image/png'));
        } catch (e) {
          reject(e);
        }
      });
    };

    for (let i = 0; i < lines.length; i++) {
      try {
        const payload = lines[i];
        const dataUrl = await renderVirtualQr(payload);
        
        let label = payload;
        if (payload.startsWith('http')) {
          try {
            label = new URL(payload).hostname;
          } catch(e) {}
        }
        if (label.length > 24) label = label.substring(0, 24) + '...';
        
        results.push({
          label,
          payload,
          dataUrl
        });
      } catch (err) {
        console.error("Failed to generate batch item index:", i, err);
      }
    }

    setBatchQrs(results);
    setIsGeneratingBatch(false);
  };

  const handleDownloadBatchZip = async () => {
    if (batchQrs.length === 0) return;
    
    const zip = new JSZip();
    
    batchQrs.forEach((item, index) => {
      // Strip data:image/png;base64, header to get binary data
      const base64Data = item.dataUrl.split(',')[1];
      // Sanitize label for filesystem
      const fileName = item.label.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase();
      zip.file(`${index + 1}_${fileName}.png`, base64Data, { base64: true });
    });

    try {
      const content = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(content);
      const a = document.createElement('a');
      a.href = url;
      a.download = `nexus_qr_batch_${getTimestamp()}.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (e) {
      alert("Failed to package ZIP file on your device.");
    }
  };

  return (
    <div className="space-y-10">
      {/* Hidden Ref Image for logo processing */}
      {logoDataUrl && (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img 
          ref={logoImageRef} 
          src={logoDataUrl} 
          alt="Logo upload source" 
          className="hidden" 
          crossOrigin="anonymous"
        />
      )}

      {/* Main Single Designer / Batch Switcher */}
      <div className="flex justify-center">
        <div className="flex bg-slate-100 dark:bg-slate-900 p-1.5 rounded-2xl border border-slate-200/50 dark:border-slate-800/60 shadow-inner w-full max-w-sm">
          <button
            onClick={() => setBatchMode(false)}
            className={`flex-1 flex items-center justify-center gap-2.5 py-2.5 text-sm font-semibold rounded-xl transition-all ${
              !batchMode 
                ? 'bg-white dark:bg-slate-800 text-[#518231] dark:text-green-400 shadow-md scale-100' 
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <Sliders size={16} /> QR Designer
          </button>
          <button
            onClick={() => setBatchMode(true)}
            className={`flex-1 flex items-center justify-center gap-2.5 py-2.5 text-sm font-semibold rounded-xl transition-all ${
              batchMode 
                ? 'bg-white dark:bg-slate-800 text-[#518231] dark:text-green-400 shadow-md scale-100' 
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <RefreshCw size={16} /> Batch Mode
          </button>
        </div>
      </div>

      {!batchMode ? (
        /* Designer Mode */
        <div className="grid gap-8 lg:grid-cols-3 items-start">
          {/* Left Columns - Input Tabs & Styling Options */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* 1. Payload Content Selection */}
            <div className="bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-900 rounded-3xl p-6 shadow-sm space-y-6">
              <h3 className="text-base font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                <QrCode size={18} className="text-[#518231]" /> 1. Select QR Code Type
              </h3>

              {/* Tab Selector */}
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                {[
                  { id: 'url', label: 'URL', icon: Link2 },
                  { id: 'text', label: 'Text', icon: FileText },
                  { id: 'wifi', label: 'WiFi', icon: Wifi },
                  { id: 'vcard', label: 'vCard', icon: User },
                  { id: 'email', label: 'Email', icon: Mail },
                  { id: 'sms', label: 'SMS', icon: MessageSquare },
                  { id: 'phone', label: 'Phone', icon: Phone },
                  { id: 'whatsapp', label: 'WhatsApp', icon: MessageSquare },
                  { id: 'location', label: 'Location', icon: MapPin },
                  { id: 'event', label: 'Event', icon: Calendar },
                  { id: 'social', label: 'Socials', icon: Share2 },
                  { id: 'crypto', label: 'Crypto', icon: DollarSign },
                ].map((tab) => {
                  const Icon = tab.icon;
                  const active = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as QRType)}
                      className={`flex flex-col items-center justify-center p-3.5 rounded-2xl border text-center transition-all ${
                        active 
                          ? 'border-[#518231]/30 bg-[#518231]/5 dark:bg-[#518231]/10 text-[#518231] dark:text-green-400 shadow-sm font-bold scale-100' 
                          : 'border-slate-100 dark:border-slate-900 bg-slate-50/50 dark:bg-slate-950/40 text-slate-500 hover:border-slate-200 dark:hover:border-slate-800 hover:text-slate-800 dark:hover:text-slate-200'
                      }`}
                    >
                      <Icon size={18} className="mb-1.5" />
                      <span className="text-[11px] truncate w-full">{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Input Forms */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-900">
                {activeTab === 'url' && (
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 dark:text-slate-400">Website URL Destination</label>
                    <input
                      type="text"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      placeholder="https://example.com"
                      className="w-full p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#518231]/40 text-slate-900 dark:text-white"
                    />
                  </div>
                )}

                {activeTab === 'text' && (
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 dark:text-slate-400">Plain/Raw Text Payload</label>
                    <textarea
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      placeholder="Enter the message or numeric data here..."
                      className="w-full h-32 p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#518231]/40 text-slate-900 dark:text-white resize-none"
                    />
                  </div>
                )}

                {activeTab === 'wifi' && (
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 dark:text-slate-400">Network Name (SSID)</label>
                      <input
                        type="text"
                        value={wifiSsid}
                        onChange={(e) => setWifiSsid(e.target.value)}
                        placeholder="HomeWiFi_5G"
                        className="w-full p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#518231]/40 text-slate-900 dark:text-white"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 dark:text-slate-400">WiFi Password</label>
                      <input
                        type="password"
                        value={wifiPassword}
                        onChange={(e) => setWifiPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#518231]/40 text-slate-900 dark:text-white"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 dark:text-slate-400">Encryption/Auth Type</label>
                      <select
                        value={wifiEncryption}
                        onChange={(e) => setWifiEncryption(e.target.value)}
                        className="w-full p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#518231]/40 text-slate-900 dark:text-white"
                      >
                        <option value="WPA">WPA / WPA2 (Secure)</option>
                        <option value="WEP">WEP (Legacy)</option>
                        <option value="nopass">None (Open Network)</option>
                      </select>
                    </div>
                    <div className="flex items-center pt-6">
                      <label className="flex items-center gap-2 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={wifiHidden}
                          onChange={(e) => setWifiHidden(e.target.checked)}
                          className="w-4.5 h-4.5 text-[#518231] border-slate-300 rounded focus:ring-[#518231]/40"
                        />
                        <span className="text-xs font-semibold text-slate-650 dark:text-slate-300">SSID is Hidden Network</span>
                      </label>
                    </div>
                  </div>
                )}

                {activeTab === 'vcard' && (
                  <div className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 dark:text-slate-400">First Name</label>
                        <input
                          type="text"
                          value={vcardFirst}
                          onChange={(e) => setVcardFirst(e.target.value)}
                          placeholder="John"
                          className="w-full p-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs outline-none focus:ring-2 focus:ring-[#518231]/40 text-slate-900 dark:text-white"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 dark:text-slate-400">Last Name</label>
                        <input
                          type="text"
                          value={vcardLast}
                          onChange={(e) => setVcardLast(e.target.value)}
                          placeholder="Doe"
                          className="w-full p-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs outline-none focus:ring-2 focus:ring-[#518231]/40 text-slate-900 dark:text-white"
                        />
                      </div>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 dark:text-slate-400">Company / Organization</label>
                        <input
                          type="text"
                          value={vcardCompany}
                          onChange={(e) => setVcardCompany(e.target.value)}
                          placeholder="Acme Corp"
                          className="w-full p-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs outline-none focus:ring-2 focus:ring-[#518231]/40 text-slate-900 dark:text-white"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 dark:text-slate-400">Job Title</label>
                        <input
                          type="text"
                          value={vcardTitle}
                          onChange={(e) => setVcardTitle(e.target.value)}
                          placeholder="Architect"
                          className="w-full p-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs outline-none focus:ring-2 focus:ring-[#518231]/40 text-slate-900 dark:text-white"
                        />
                      </div>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 dark:text-slate-400">Phone Number</label>
                        <input
                          type="text"
                          value={vcardPhone}
                          onChange={(e) => setVcardPhone(e.target.value)}
                          placeholder="+15551234567"
                          className="w-full p-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs outline-none focus:ring-2 focus:ring-[#518231]/40 text-slate-900 dark:text-white"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 dark:text-slate-400">Email Address</label>
                        <input
                          type="email"
                          value={vcardEmail}
                          onChange={(e) => setVcardEmail(e.target.value)}
                          placeholder="john@acme.com"
                          className="w-full p-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs outline-none focus:ring-2 focus:ring-[#518231]/40 text-slate-900 dark:text-white"
                        />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 dark:text-slate-400">Website URL</label>
                      <input
                        type="text"
                        value={vcardWebsite}
                        onChange={(e) => setVcardWebsite(e.target.value)}
                        placeholder="https://acme.com"
                        className="w-full p-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs outline-none focus:ring-2 focus:ring-[#518231]/40 text-slate-900 dark:text-white"
                      />
                    </div>
                    <div className="grid gap-3 sm:grid-cols-3">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 dark:text-slate-400">Street</label>
                        <input
                          type="text"
                          value={vcardStreet}
                          onChange={(e) => setVcardStreet(e.target.value)}
                          placeholder="123 Cyber Way"
                          className="w-full p-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs outline-none focus:ring-2 focus:ring-[#518231]/40 text-slate-900 dark:text-white"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 dark:text-slate-400">City</label>
                        <input
                          type="text"
                          value={vcardCity}
                          onChange={(e) => setVcardCity(e.target.value)}
                          placeholder="Austin"
                          className="w-full p-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs outline-none focus:ring-2 focus:ring-[#518231]/40 text-slate-900 dark:text-white"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 dark:text-slate-400">Country</label>
                        <input
                          type="text"
                          value={vcardCountry}
                          onChange={(e) => setVcardCountry(e.target.value)}
                          placeholder="USA"
                          className="w-full p-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs outline-none focus:ring-2 focus:ring-[#518231]/40 text-slate-900 dark:text-white"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'email' && (
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 dark:text-slate-400">Recipient Email</label>
                      <input
                        type="email"
                        value={emailTo}
                        onChange={(e) => setEmailTo(e.target.value)}
                        placeholder="team@domain.com"
                        className="w-full p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#518231]/40 text-slate-900 dark:text-white"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 dark:text-slate-400">Subject Line</label>
                      <input
                        type="text"
                        value={emailSubject}
                        onChange={(e) => setEmailSubject(e.target.value)}
                        placeholder="Inquiry about services"
                        className="w-full p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#518231]/40 text-slate-900 dark:text-white"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 dark:text-slate-400">Body Message</label>
                      <textarea
                        value={emailBody}
                        onChange={(e) => setEmailBody(e.target.value)}
                        placeholder="Type body email contents here..."
                        className="w-full h-24 p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#518231]/40 text-slate-900 dark:text-white resize-none"
                      />
                    </div>
                  </div>
                )}

                {activeTab === 'sms' && (
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 dark:text-slate-400">Phone Number (with country code)</label>
                      <input
                        type="text"
                        value={smsPhone}
                        onChange={(e) => setSmsPhone(e.target.value)}
                        placeholder="+15559876543"
                        className="w-full p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#518231]/40 text-slate-900 dark:text-white"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 dark:text-slate-400">Pre-populated Text Message</label>
                      <input
                        type="text"
                        value={smsMessage}
                        onChange={(e) => setSmsMessage(e.target.value)}
                        placeholder="Text body contents..."
                        className="w-full p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#518231]/40 text-slate-900 dark:text-white"
                      />
                    </div>
                  </div>
                )}

                {activeTab === 'phone' && (
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 dark:text-slate-400">Phone Number</label>
                    <input
                      type="text"
                      value={phoneNum}
                      onChange={(e) => setPhoneNum(e.target.value)}
                      placeholder="+15551234567"
                      className="w-full p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#518231]/40 text-slate-900 dark:text-white"
                    />
                  </div>
                )}

                {activeTab === 'whatsapp' && (
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 dark:text-slate-400">WhatsApp Phone (numbers only + country code)</label>
                      <input
                        type="text"
                        value={waPhone}
                        onChange={(e) => setWaPhone(e.target.value)}
                        placeholder="15551234567"
                        className="w-full p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#518231]/40 text-slate-900 dark:text-white"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 dark:text-slate-400">Pre-populated Text Message</label>
                      <input
                        type="text"
                        value={waMessage}
                        onChange={(e) => setWaMessage(e.target.value)}
                        placeholder="Hello, I would like to order..."
                        className="w-full p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#518231]/40 text-slate-900 dark:text-white"
                      />
                    </div>
                  </div>
                )}

                {activeTab === 'location' && (
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 dark:text-slate-400">Latitude</label>
                      <input
                        type="text"
                        value={locLat}
                        onChange={(e) => setLocLat(e.target.value)}
                        placeholder="37.7749"
                        className="w-full p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#518231]/40 text-slate-900 dark:text-white"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 dark:text-slate-400">Longitude</label>
                      <input
                        type="text"
                        value={locLng}
                        onChange={(e) => setLocLng(e.target.value)}
                        placeholder="-122.4194"
                        className="w-full p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#518231]/40 text-slate-900 dark:text-white"
                      />
                    </div>
                  </div>
                )}

                {activeTab === 'event' && (
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 dark:text-slate-400">Event Title</label>
                      <input
                        type="text"
                        value={evtTitle}
                        onChange={(e) => setEvtTitle(e.target.value)}
                        placeholder="Product Launch Party"
                        className="w-full p-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs outline-none focus:ring-2 focus:ring-[#518231]/40 text-slate-900 dark:text-white"
                      />
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 dark:text-slate-400">Start Time</label>
                        <input
                          type="datetime-local"
                          value={evtStart}
                          onChange={(e) => setEvtStart(e.target.value)}
                          className="w-full p-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs outline-none focus:ring-2 focus:ring-[#518231]/40 text-slate-900 dark:text-white"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 dark:text-slate-400">End Time</label>
                        <input
                          type="datetime-local"
                          value={evtEnd}
                          onChange={(e) => setEvtEnd(e.target.value)}
                          className="w-full p-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs outline-none focus:ring-2 focus:ring-[#518231]/40 text-slate-900 dark:text-white"
                        />
                      </div>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 dark:text-slate-400">Location Address</label>
                        <input
                          type="text"
                          value={evtLoc}
                          onChange={(e) => setEvtLoc(e.target.value)}
                          placeholder="Grand Conference Hall"
                          className="w-full p-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs outline-none focus:ring-2 focus:ring-[#518231]/40 text-slate-900 dark:text-white"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 dark:text-slate-400">Description</label>
                        <input
                          type="text"
                          value={evtDesc}
                          onChange={(e) => setEvtDesc(e.target.value)}
                          placeholder="Event highlights..."
                          className="w-full p-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs outline-none focus:ring-2 focus:ring-[#518231]/40 text-slate-900 dark:text-white"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'social' && (
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 dark:text-slate-400">Platform</label>
                      <select
                        value={socialPlatform}
                        onChange={(e) => setSocialPlatform(e.target.value)}
                        className="w-full p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#518231]/40 text-slate-900 dark:text-white"
                      >
                        <option value="x">X / Twitter</option>
                        <option value="facebook">Facebook</option>
                        <option value="instagram">Instagram</option>
                        <option value="linkedin">LinkedIn</option>
                        <option value="github">GitHub</option>
                        <option value="youtube">YouTube</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 dark:text-slate-400">Username / Handle</label>
                      <input
                        type="text"
                        value={socialUser}
                        onChange={(e) => setSocialUser(e.target.value)}
                        placeholder="username"
                        className="w-full p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#518231]/40 text-slate-900 dark:text-white"
                      />
                    </div>
                  </div>
                )}

                {activeTab === 'crypto' && (
                  <div className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 dark:text-slate-400">Coin</label>
                        <select
                          value={cryptoCoin}
                          onChange={(e) => setCryptoCoin(e.target.value)}
                          className="w-full p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#518231]/40 text-slate-900 dark:text-white"
                        >
                          <option value="bitcoin">Bitcoin (BTC)</option>
                          <option value="ethereum">Ethereum (ETH)</option>
                          <option value="solana">Solana (SOL)</option>
                        </select>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 dark:text-slate-400">Amount (Optional)</label>
                        <input
                          type="text"
                          value={cryptoAmount}
                          onChange={(e) => setCryptoAmount(e.target.value)}
                          placeholder="e.g. 0.045"
                          className="w-full p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#518231]/40 text-slate-900 dark:text-white"
                        />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 dark:text-slate-400">Wallet Public Address</label>
                      <input
                        type="text"
                        value={cryptoAddress}
                        onChange={(e) => setCryptoAddress(e.target.value)}
                        placeholder="Wallet Public Address..."
                        className="w-full p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#518231]/40 text-slate-900 dark:text-white font-mono"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* 2. Designer Toolboxes */}
            <div className="grid gap-6 md:grid-cols-2">
              
              {/* Colors Card */}
              <div className="bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-900 rounded-3xl p-6 shadow-sm space-y-4">
                <h4 className="text-sm font-bold text-slate-850 dark:text-white uppercase tracking-wider flex items-center gap-2">
                  <Palette size={16} className="text-[#518231]" /> Colors & Backgrounds
                </h4>

                {/* Solid vs Gradient Toggle */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-500 dark:text-slate-400">Foreground Type</label>
                  <div className="flex bg-slate-50 dark:bg-slate-900 p-1 border border-slate-200 dark:border-slate-800 rounded-xl">
                    <button
                      onClick={() => setFgType('solid')}
                      className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors ${fgType === 'solid' ? 'bg-[#518231]/10 text-[#518231]' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'}`}
                    >
                      Solid Color
                    </button>
                    <button
                      onClick={() => setFgType('gradient')}
                      className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors ${fgType === 'gradient' ? 'bg-[#518231]/10 text-[#518231]' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'}`}
                    >
                      Color Gradient
                    </button>
                  </div>
                </div>

                {fgType === 'solid' ? (
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-500 dark:text-slate-400">QR Primary Color</label>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        value={fgColor}
                        onChange={(e) => setFgColor(e.target.value)}
                        className="w-10 h-10 border border-slate-200 rounded-lg cursor-pointer bg-white"
                      />
                      <input
                        type="text"
                        value={fgColor}
                        onChange={(e) => setFgColor(e.target.value)}
                        className="flex-1 px-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-mono outline-none text-slate-900 dark:text-white"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="grid gap-2 grid-cols-2">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400">Start Color</label>
                        <div className="flex gap-1.5">
                          <input
                            type="color"
                            value={gradientStart}
                            onChange={(e) => setGradientStart(e.target.value)}
                            className="w-8 h-8 border border-slate-200 rounded-lg cursor-pointer bg-white"
                          />
                          <input
                            type="text"
                            value={gradientStart}
                            onChange={(e) => setGradientStart(e.target.value)}
                            className="w-full px-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-[10px] font-mono outline-none text-slate-900 dark:text-white"
                          />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400">End Color</label>
                        <div className="flex gap-1.5">
                          <input
                            type="color"
                            value={gradientEnd}
                            onChange={(e) => setGradientEnd(e.target.value)}
                            className="w-8 h-8 border border-slate-200 rounded-lg cursor-pointer bg-white"
                          />
                          <input
                            type="text"
                            value={gradientEnd}
                            onChange={(e) => setGradientEnd(e.target.value)}
                            className="w-full px-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-[10px] font-mono outline-none text-slate-900 dark:text-white"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid gap-2 grid-cols-2">
                      <div className="space-y-1">
                        <label className="text-[10px] font-semibold text-slate-500 dark:text-slate-400">Gradient Type</label>
                        <select
                          value={gradientType}
                          onChange={(e) => setGradientType(e.target.value as any)}
                          className="w-full p-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-xs outline-none text-slate-900 dark:text-white"
                        >
                          <option value="linear">Linear</option>
                          <option value="radial">Radial</option>
                        </select>
                      </div>
                      {gradientType === 'linear' && (
                        <div className="space-y-1">
                          <div className="flex justify-between text-[10px] font-semibold text-slate-500 dark:text-slate-400">
                            <span>Angle</span>
                            <span>{gradientAngle}°</span>
                          </div>
                          <input
                            type="range"
                            min="0"
                            max="360"
                            value={gradientAngle}
                            onChange={(e) => setGradientAngle(parseInt(e.target.value))}
                            className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#518231]"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Background settings */}
                <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-900">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-slate-500 dark:text-slate-400">Transparent Background</label>
                    <input
                      type="checkbox"
                      checked={transparentBg}
                      onChange={(e) => setTransparentBg(e.target.checked)}
                      className="w-4 h-4 text-[#518231] border-slate-350 dark:border-slate-800 rounded focus:ring-[#518231]/40"
                    />
                  </div>

                  {!transparentBg && (
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-500 dark:text-slate-400">Background Color</label>
                      <div className="flex gap-2">
                        <input
                          type="color"
                          value={bgColor}
                          onChange={(e) => setBgColor(e.target.value)}
                          className="w-10 h-10 border border-slate-200 rounded-lg cursor-pointer bg-white"
                        />
                        <input
                          type="text"
                          value={bgColor}
                          onChange={(e) => setBgColor(e.target.value)}
                          className="flex-1 px-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-mono outline-none text-slate-900 dark:text-white"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Dot & Eye Design Card */}
              <div className="bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-900 rounded-3xl p-6 shadow-sm space-y-4">
                <h4 className="text-sm font-bold text-slate-850 dark:text-white uppercase tracking-wider flex items-center gap-2">
                  <Settings size={16} className="text-[#518231]" /> Dot & Finder Styles
                </h4>

                {/* Dot Style Selection */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-500 dark:text-slate-400">Data Dot Shape</label>
                  <select
                    value={dotStyle}
                    onChange={(e) => setDotStyle(e.target.value as DotStyle)}
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm outline-none text-slate-900 dark:text-white"
                  >
                    <option value="square">Squares (Classic)</option>
                    <option value="dots">Circles / Round Dots</option>
                    <option value="rounded">Rounded Capsules</option>
                  </select>
                </div>

                {/* Eye Style Selection */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-500 dark:text-slate-400">Finder Corners (Eyes) Shape</label>
                  <select
                    value={eyeStyle}
                    onChange={(e) => setEyeStyle(e.target.value as EyeStyle)}
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm outline-none text-slate-900 dark:text-white"
                  >
                    <option value="square">Square Frame & Dot</option>
                    <option value="rounded">Rounded Frame & Dot</option>
                    <option value="circle">Circular Frame & Dot</option>
                  </select>
                </div>

                {/* Custom Eye Colors */}
                <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-900">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-slate-500 dark:text-slate-400">Separate Eye Colors</label>
                    <input
                      type="checkbox"
                      checked={customEyeColors}
                      onChange={(e) => setCustomEyeColors(e.target.checked)}
                      className="w-4 h-4 text-[#518231] border-slate-350 dark:border-slate-800 rounded focus:ring-[#518231]/40"
                    />
                  </div>

                  {customEyeColors && (
                    <div className="grid gap-2 grid-cols-2 pt-2">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400">Outer Frame</label>
                        <input
                          type="color"
                          value={eyeColor}
                          onChange={(e) => setEyeColor(e.target.value)}
                          className="w-full h-8 border border-slate-200 rounded-lg cursor-pointer bg-white"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400">Inner Dot</label>
                        <input
                          type="color"
                          value={eyeCenterColor}
                          onChange={(e) => setEyeCenterColor(e.target.value)}
                          className="w-full h-8 border border-slate-200 rounded-lg cursor-pointer bg-white"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Logo Overlay Card */}
              <div className="bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-900 rounded-3xl p-6 shadow-sm space-y-4">
                <h4 className="text-sm font-bold text-slate-850 dark:text-white uppercase tracking-wider flex items-center gap-2">
                  <ImageIcon size={16} className="text-[#518231]" /> Brand Logo Embed
                </h4>

                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-slate-500 dark:text-slate-400">Enable Logo Overlay</label>
                  <input
                    type="checkbox"
                    checked={hasLogo}
                    onChange={(e) => setHasLogo(e.target.checked)}
                    className="w-4 h-4 text-[#518231] border-slate-350 dark:border-slate-800 rounded focus:ring-[#518231]/40"
                  />
                </div>

                {hasLogo && (
                  <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-900">
                    <div className="space-y-1">
                      <label className="text-[10px] font-semibold text-slate-500 dark:text-slate-400">Logo Image File</label>
                      <div className="flex items-center justify-center w-full">
                        <label className="flex flex-col items-center justify-center w-full h-20 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors">
                          <div className="flex flex-col items-center justify-center pt-2 pb-3">
                            <Upload size={18} className="text-slate-400 mb-1" />
                            <p className="text-[10px] text-slate-400 font-semibold truncate max-w-[200px]">
                              {logoFile ? logoFile.name : 'Upload logo image'}
                            </p>
                          </div>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleLogoUpload}
                            className="hidden"
                          />
                        </label>
                      </div>
                    </div>

                    <div className="grid gap-2 grid-cols-2">
                      <div className="space-y-1">
                        <div className="flex justify-between text-[10px] font-semibold text-slate-500 dark:text-slate-400">
                          <span>Logo Scale</span>
                          <span>{Math.round(logoScale * 100)}%</span>
                        </div>
                        <input
                          type="range"
                          min="0.10"
                          max="0.30"
                          step="0.05"
                          value={logoScale}
                          onChange={(e) => setLogoScale(parseFloat(e.target.value))}
                          className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#518231]"
                        />
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-[10px] font-semibold text-slate-500 dark:text-slate-400">
                          <span>Logo Roundness</span>
                          <span>{logoBorderRadius}%</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="50"
                          value={logoBorderRadius}
                          onChange={(e) => setLogoBorderRadius(parseInt(e.target.value))}
                          className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#518231]"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-semibold text-slate-500 dark:text-slate-400">Logo Border Card Fill</label>
                      <div className="flex gap-2">
                        <input
                          type="color"
                          value={logoBgColor}
                          onChange={(e) => setLogoBgColor(e.target.value)}
                          className="w-7 h-7 border border-slate-200 rounded-lg cursor-pointer bg-white"
                        />
                        <input
                          type="text"
                          value={logoBgColor}
                          onChange={(e) => setLogoBgColor(e.target.value)}
                          className="flex-1 px-2.5 py-1 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-[10px] font-mono outline-none text-slate-900 dark:text-white"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* QR Engine Config */}
              <div className="bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-900 rounded-3xl p-6 shadow-sm space-y-4">
                <h4 className="text-sm font-bold text-slate-850 dark:text-white uppercase tracking-wider flex items-center gap-2">
                  <Sliders size={16} className="text-[#518231]" /> QR Engine & Sizing
                </h4>

                <div className="grid gap-2 grid-cols-2">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-500 dark:text-slate-400">Quiet Zone (Margin)</label>
                    <select
                      value={qrMargin}
                      onChange={(e) => setQrMargin(parseInt(e.target.value))}
                      className="w-full p-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs outline-none text-slate-900 dark:text-white font-semibold"
                    >
                      <option value="0">0 Modules (Tight)</option>
                      <option value="2">2 Modules</option>
                      <option value="4">4 Modules (Standard)</option>
                      <option value="6">6 Modules</option>
                      <option value="8">8 Modules (Wide)</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-500 dark:text-slate-400">Error Correction</label>
                    <select
                      value={errorCorrection}
                      onChange={(e) => setErrorCorrection(e.target.value)}
                      className="w-full p-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs outline-none text-slate-900 dark:text-white font-semibold"
                    >
                      <option value="L">L (7% Recovery - Low)</option>
                      <option value="M">M (15% Recovery - Medium)</option>
                      <option value="Q">Q (25% Recovery - Quartile)</option>
                      <option value="H">H (30% Recovery - High)</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold text-slate-500 dark:text-slate-400">
                    <span>Export Image Size</span>
                    <span>{qrSize} x {qrSize} px</span>
                  </div>
                  <input
                    type="range"
                    min="256"
                    max="1024"
                    step="128"
                    value={qrSize}
                    onChange={(e) => setQrSize(parseInt(e.target.value))}
                    className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#518231]"
                  />
                  <div className="flex justify-between text-[9px] text-slate-400 font-bold">
                    <span>256px</span>
                    <span>512px</span>
                    <span>1024px</span>
                  </div>
                </div>
              </div>

            </div>

          </div>

          {/* Right Column - Sticky Live Preview & Quick Actions */}
          <div className="lg:col-span-1 lg:sticky lg:top-8 space-y-6">
            
            {/* Live Preview Card */}
            <div className="bg-slate-50 dark:bg-slate-900/60 p-6 rounded-3xl border border-slate-100 dark:border-slate-800/80 shadow-md flex flex-col items-center">
              <h4 className="font-bold text-slate-850 dark:text-white text-xs uppercase tracking-wider mb-4 flex items-center gap-2 self-start">
                <Sparkles size={14} className="text-[#518231]" /> Live Design Canvas
              </h4>

              {/* Dynamic QR Display Box */}
              <div className="relative group p-4 bg-white dark:bg-slate-950 rounded-2xl border border-slate-100 dark:border-slate-900 shadow-sm w-full max-w-[260px] aspect-square flex items-center justify-center overflow-hidden">
                <canvas 
                  ref={canvasRef} 
                  className="w-full h-full max-w-full max-h-full block object-contain"
                />

                {/* Scan Overlay simulation screen */}
                {scanning && (
                  <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-xs flex flex-col items-center justify-center text-white p-4">
                    <Scan className="w-12 h-12 text-green-400 animate-pulse mb-2" />
                    <p className="text-xs font-semibold uppercase tracking-wider">Scanning Pattern...</p>
                    <div className="absolute left-0 w-full h-1 bg-green-500 top-0 animate-[bounce_2s_infinite]"></div>
                  </div>
                )}

                {scanResult && !scanning && (
                  <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md flex flex-col items-center justify-center text-white p-4 text-center">
                    <ShieldCheck className="w-10 h-10 text-green-400 mb-2" />
                    <p className="text-xs font-bold text-green-400 uppercase tracking-widest mb-1.5">Scan Verified!</p>
                    <p className="text-[10px] max-h-[100px] overflow-y-auto font-mono text-slate-350 break-all p-2 bg-slate-900/80 rounded border border-slate-800 w-full">
                      {scanResult}
                    </p>
                    <button 
                      onClick={() => setScanResult(null)}
                      className="mt-3 px-3 py-1 bg-slate-800 hover:bg-slate-700 text-[10px] font-bold rounded-lg border border-slate-700 transition-colors"
                    >
                      Dismiss
                    </button>
                  </div>
                )}
              </div>

              {/* QR Metadata Tag */}
              {qrPayload && (
                <div className="mt-4 flex flex-col items-center text-center space-y-1">
                  <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500 break-all select-all max-w-[240px]">
                    Payload Size: {qrPayload.length} bytes
                  </span>
                  <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-[9px] font-bold text-slate-500 dark:text-slate-400">
                    <Info size={10} /> Client-Side Sandbox Only
                  </div>
                </div>
              )}

              {/* Action Buttons Grid */}
              <div className="grid grid-cols-2 gap-2.5 w-full mt-6">
                <button
                  onClick={handleCopyImage}
                  disabled={!qrPayload}
                  className="flex items-center justify-center gap-2 py-2.5 bg-slate-800 hover:bg-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700 text-white rounded-xl text-xs font-semibold shadow-sm transition-all cursor-pointer border border-slate-700/50"
                  title="Copy QR Code Image to clipboard"
                >
                  {copiedImage ? <Check size={14} className="text-green-400" /> : <Copy size={14} />} Copy Image
                </button>
                <button
                  onClick={handleCopyPayload}
                  disabled={!qrPayload}
                  className="flex items-center justify-center gap-2 py-2.5 bg-slate-800 hover:bg-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700 text-white rounded-xl text-xs font-semibold shadow-sm transition-all cursor-pointer border border-slate-700/50"
                  title="Copy raw encoded string payload"
                >
                  {copiedPayload ? <Check size={14} className="text-green-400" /> : <Link2 size={14} />} Copy Payload
                </button>
                <button
                  onClick={handleDownloadPNG}
                  disabled={!qrPayload}
                  className="flex items-center justify-center gap-2 py-2.5 bg-[#518231] hover:bg-[#518231]/90 text-white rounded-xl text-xs font-semibold shadow-sm transition-all cursor-pointer"
                  title="Download as PNG image"
                >
                  <Download size={14} /> PNG Raster
                </button>
                <button
                  onClick={handleDownloadSVG}
                  disabled={!qrPayload}
                  className="flex items-center justify-center gap-2 py-2.5 bg-[#518231] hover:bg-[#518231]/90 text-white rounded-xl text-xs font-semibold shadow-sm transition-all cursor-pointer"
                  title="Download as SVG vector asset"
                >
                  <Download size={14} /> SVG Vector
                </button>
              </div>

              {/* Sharing & Testing Row */}
              <div className="flex gap-2 w-full mt-2.5">
                <button
                  onClick={triggerScanSimulator}
                  disabled={!qrPayload || scanning}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-slate-200 hover:bg-slate-300/80 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-semibold border border-slate-350/50 dark:border-slate-700/40 transition-colors"
                >
                  <Eye size={14} /> Simulate Scan
                </button>
                <button
                  onClick={shareStateUrl}
                  disabled={!qrPayload}
                  className="px-3 py-2.5 bg-slate-200 hover:bg-slate-300/80 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-semibold border border-slate-350/50 dark:border-slate-700/40 transition-colors"
                  title="Copy shareable design URL"
                >
                  {copiedShare ? <Check size={14} className="text-green-500" /> : <Share2 size={14} />}
                </button>
              </div>

            </div>

          </div>
        </div>
      ) : (
        /* Batch Mode UI */
        <div className="bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-900 rounded-3xl p-6 shadow-sm space-y-6">
          <h3 className="text-base font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
            <RefreshCw size={18} className="text-[#518231]" /> Batch QR Code Generator
          </h3>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 dark:text-slate-400">Bulk Input List (One item or URL per line)</label>
              <textarea
                value={batchInput}
                onChange={(e) => setBatchInput(e.target.value)}
                placeholder="https://example1.com&#10;https://example2.com&#10;SSID:MyWiFi;T:WPA;P:pass"
                className="w-full h-64 p-3.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-xs outline-none focus:ring-2 focus:ring-[#518231]/40 text-slate-900 dark:text-white font-mono resize-none"
              />
              <span className="text-[10px] text-slate-400 block font-semibold leading-relaxed">
                Tip: Enter up to 50 URLs or strings. Every line is dynamically rendered into a separate PNG file.
              </span>
            </div>

            <div className="flex flex-col justify-between border border-slate-100 dark:border-slate-900/60 bg-slate-50/50 dark:bg-slate-900/20 p-5 rounded-2xl">
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Batch Operations</h4>
                <p className="text-xs leading-relaxed text-slate-650 dark:text-slate-400">
                  Click generate to assemble all inputs. The page will dynamically calculate QR matrices in memory and package them into a structured ZIP file.
                </p>

                <div className="flex gap-2.5">
                  <button
                    onClick={generateBatchQRs}
                    disabled={isGeneratingBatch}
                    className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#518231] hover:bg-[#518231]/90 text-white rounded-xl text-xs font-bold shadow-sm transition-all"
                  >
                    {isGeneratingBatch ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : <RefreshCw size={14} />} Generate Batch QRs
                  </button>
                  {batchQrs.length > 0 && (
                    <button
                      onClick={handleDownloadBatchZip}
                      className="flex-1 flex items-center justify-center gap-2 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold border border-slate-700 transition-colors"
                    >
                      <Download size={14} /> Download ZIP Bundle
                    </button>
                  )}
                </div>
              </div>

              {batchQrs.length > 0 && (
                <div className="mt-4 pt-4 border-t border-slate-150 dark:border-slate-800/80 space-y-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Preview ({batchQrs.length} items)</span>
                  <div className="grid grid-cols-5 gap-2 max-h-[140px] overflow-y-auto p-2 bg-white dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-900">
                    {batchQrs.map((item, index) => (
                      <div key={index} className="flex flex-col items-center bg-slate-50 dark:bg-slate-900 p-1.5 rounded-lg" title={item.payload}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={item.dataUrl} alt="batch qr" className="w-10 h-10 object-contain" />
                        <span className="text-[8px] font-mono text-slate-400 truncate w-full text-center mt-1">#{index + 1}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 3. History Panel */}
      {history.length > 0 && (
        <div className="bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-900 rounded-3xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-850 dark:text-white uppercase tracking-wider flex items-center gap-2">
              <History size={16} className="text-[#518231]" /> History Logs & Saved Designs
            </h3>
            <button
              onClick={clearHistoryLog}
              className="text-[11px] font-bold text-red-500 hover:underline flex items-center gap-1.5"
            >
              <Trash2 size={12} /> Clear Logs
            </button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {history.map((item) => (
              <div 
                key={item.id}
                onClick={() => loadHistoryItem(item)}
                className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-850/80 rounded-2xl border border-slate-100 dark:border-slate-800/80 cursor-pointer transition-all"
              >
                <div className="w-12 h-12 bg-white dark:bg-slate-950 rounded-lg flex items-center justify-center p-1 border border-slate-100 dark:border-slate-900 shrink-0">
                  <QrCode size={24} className="text-slate-400" />
                </div>
                <div className="truncate space-y-0.5">
                  <p className="text-xs font-semibold text-slate-800 dark:text-white truncate">{item.label}</p>
                  <p className="text-[9px] text-slate-400 capitalize">{item.type} | {new Date(item.timestamp).toLocaleTimeString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
