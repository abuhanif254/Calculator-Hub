"use client";

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import CryptoJS from 'crypto-js';
import { useTranslations } from 'next-intl';
import { 
  Copy, 
  Download, 
  Trash2, 
  FileText, 
  UploadCloud, 
  CheckCircle2, 
  AlertCircle, 
  History, 
  ArrowRightLeft, 
  FileArchive, 
  Clipboard, 
  Share2, 
  Check, 
  FileCode,
  Eye,
  EyeOff,
  RefreshCw,
  Code,
  Terminal,
  Zap,
  Info
} from 'lucide-react';

interface HistoryItem {
  id: string;
  inputSnippet: string;
  keySnippet: string;
  hash: string;
  timestamp: number;
  type: 'text' | 'file';
  algo: string;
  size?: number;
}

// Convert ArrayBuffer to WordArray for CryptoJS compatibility
const arrayBufferToWordArray = (arrayBuffer: ArrayBuffer) => {
  const words: number[] = [];
  const u8arr = new Uint8Array(arrayBuffer);
  const len = u8arr.length;
  for (let i = 0; i < len; i++) {
    words[i >>> 2] |= (u8arr[i] & 0xff) << (24 - (i % 4) * 8);
  }
  return CryptoJS.lib.WordArray.create(words, len);
};

// Generate random symmetric key using CSPRNG
const generateSecureKey = (lengthBytes = 32): string => {
  if (typeof window !== 'undefined' && window.crypto) {
    const array = new Uint8Array(lengthBytes);
    window.crypto.getRandomValues(array);
    return Array.from(array).map(b => b.toString(16).padStart(2, '0')).join('');
  }
  // Fallback if window.crypto is unavailable (unlikely in modern browsers)
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

export default function HmacGenerator() {
  const t = useTranslations("HmacGenerator");

  const [activeTab, setActiveTab] = useState<'text' | 'file'>('text');
  const [algo, setAlgo] = useState<'HMAC-SHA256' | 'HMAC-SHA512' | 'HMAC-SHA1' | 'HMAC-MD5'>('HMAC-SHA256');
  
  // Inputs
  const [inputText, setInputText] = useState('');
  const [secretKey, setSecretKey] = useState('');
  
  // Settings
  const [isUppercase, setIsUppercase] = useState(false);
  const [showSecret, setShowSecret] = useState(false);
  const [autoCopy, setAutoCopy] = useState(false);
  
  // File state
  const [file, setFile] = useState<File | null>(null);
  const [fileProgress, setFileProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isHashing, setIsHashing] = useState(false);

  // Result state
  const [hashResult, setHashResult] = useState('');
  const [compareHash, setCompareHash] = useState('');
  
  // Copy feedback states
  const [copiedHash, setCopiedHash] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Developer signing integration tab
  const [devDemoType, setDevDemoType] = useState<'webhook' | 'aws' | 'jwt' | 'express'>('webhook');

  // History State
  const [history, setHistory] = useState<HistoryItem[]>([]);

  // Load history & parameters from URL
  useEffect(() => {
    try {
      const stored = localStorage.getItem('hmacHistory');
      if (stored) {
        setHistory(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Could not load HMAC history', e);
    }

    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const textParam = params.get('text');
      const keyParam = params.get('key');
      const algoParam = params.get('algo');
      
      if (textParam) setInputText(textParam);
      if (keyParam) setSecretKey(keyParam);
      if (algoParam && ['HMAC-SHA256', 'HMAC-SHA512', 'HMAC-SHA1', 'HMAC-MD5'].includes(algoParam)) {
        setAlgo(algoParam as any);
      }
    }
  }, []);

  // Save to history helper
  const saveToHistory = useCallback((item: Omit<HistoryItem, 'id' | 'timestamp'>) => {
    setHistory(prev => {
      // Prevent consecutive identical entries in history
      if (prev.length > 0 && prev[0].hash === item.hash && prev[0].algo === item.algo) {
        return prev;
      }
      
      const newHistory = [
        { ...item, id: crypto.randomUUID(), timestamp: Date.now() },
        ...prev
      ].slice(0, 10); // Keep last 10 entries
      
      localStorage.setItem('hmacHistory', JSON.stringify(newHistory));
      return newHistory;
    });
  }, []);

  // Helper to format bytes
  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Hashing logic using Native Web Crypto API + CryptoJS Fallback
  useEffect(() => {
    if (activeTab !== 'text') return;
    
    // If secret key is empty, don't generate a signature
    if (!secretKey) {
      setHashResult('');
      return;
    }

    const runHmac = async () => {
      try {
        let finalHash = '';

        if (algo === 'HMAC-MD5') {
          // Native Subtle Crypto does not support MD5, fall back to CryptoJS
          finalHash = CryptoJS.HmacMD5(inputText, secretKey).toString();
        } else {
          // Native Subtle Crypto
          const encoder = new TextEncoder();
          const keyData = encoder.encode(secretKey);
          const messageData = encoder.encode(inputText);

          let webCryptoAlgoName = 'SHA-256';
          if (algo === 'HMAC-SHA512') webCryptoAlgoName = 'SHA-512';
          if (algo === 'HMAC-SHA1') webCryptoAlgoName = 'SHA-1';

          const cryptoKey = await window.crypto.subtle.importKey(
            'raw',
            keyData,
            {
              name: 'HMAC',
              hash: { name: webCryptoAlgoName }
            },
            false,
            ['sign']
          );

          const signature = await window.crypto.subtle.sign(
            'HMAC',
            cryptoKey,
            messageData
          );

          const hashArray = Array.from(new Uint8Array(signature));
          finalHash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        }

        setHashResult(finalHash);

        if (autoCopy && finalHash) {
          const displayVal = isUppercase ? finalHash.toUpperCase() : finalHash;
          navigator.clipboard.writeText(displayVal);
        }

        // Save to history after a brief length to avoid cluttering
        if (inputText.length > 2 || secretKey.length > 2) {
          saveToHistory({
            inputSnippet: inputText.length > 30 ? inputText.substring(0, 30) + '...' : (inputText || 'Empty message'),
            keySnippet: secretKey.length > 12 ? secretKey.substring(0, 12) + '...' : secretKey,
            hash: finalHash,
            type: 'text',
            algo,
            size: new Blob([inputText]).size
          });
        }
      } catch (err) {
        console.error("Native HMAC signing failed, falling back to CryptoJS", err);
        let fallbackHash = '';
        if (algo === 'HMAC-SHA256') fallbackHash = CryptoJS.HmacSHA256(inputText, secretKey).toString();
        if (algo === 'HMAC-SHA512') fallbackHash = CryptoJS.HmacSHA512(inputText, secretKey).toString();
        if (algo === 'HMAC-SHA1') fallbackHash = CryptoJS.HmacSHA1(inputText, secretKey).toString();
        if (algo === 'HMAC-MD5') fallbackHash = CryptoJS.HmacMD5(inputText, secretKey).toString();
        setHashResult(fallbackHash);
      }
    };

    const timer = setTimeout(() => {
      runHmac();
    }, 150); // Debounce signature generation

    return () => clearTimeout(timer);
  }, [inputText, secretKey, algo, activeTab, isUppercase, autoCopy, saveToHistory]);

  // Hashing file signature
  const hashFile = async (selectedFile: File) => {
    if (!secretKey) {
      alert("Please enter a secret key before hashing a file.");
      setFile(null);
      return;
    }
    
    setIsHashing(true);
    setFileProgress(0);
    setHashResult('');

    try {
      const fileSize = selectedFile.size;

      // 1) Small/Medium files (<= 20MB) - Native Web Crypto (runs on native thread, fast)
      if (fileSize <= 20 * 1024 * 1024 && algo !== 'HMAC-MD5') {
        const reader = new FileReader();
        
        reader.onprogress = (e) => {
          if (e.lengthComputable) {
            setFileProgress(Math.round((e.loaded / e.total) * 100));
          }
        };

        const arrayBuffer = await new Promise<ArrayBuffer>((resolve, reject) => {
          reader.onload = () => resolve(reader.result as ArrayBuffer);
          reader.onerror = () => reject(reader.error);
          reader.readAsArrayBuffer(selectedFile);
        });

        setFileProgress(95);

        const encoder = new TextEncoder();
        const keyData = encoder.encode(secretKey);
        let webCryptoAlgoName = 'SHA-256';
        if (algo === 'HMAC-SHA512') webCryptoAlgoName = 'SHA-512';
        if (algo === 'HMAC-SHA1') webCryptoAlgoName = 'SHA-1';

        const cryptoKey = await window.crypto.subtle.importKey(
          'raw',
          keyData,
          {
            name: 'HMAC',
            hash: { name: webCryptoAlgoName }
          },
          false,
          ['sign']
        );

        const signature = await window.crypto.subtle.sign(
          'HMAC',
          cryptoKey,
          arrayBuffer
        );

        const hashArray = Array.from(new Uint8Array(signature));
        const finalHash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        
        setHashResult(finalHash);
        setFileProgress(100);
        
        saveToHistory({
          inputSnippet: selectedFile.name,
          keySnippet: secretKey.length > 12 ? secretKey.substring(0, 12) + '...' : secretKey,
          hash: finalHash,
          type: 'file',
          algo,
          size: selectedFile.size
        });
      } else {
        // 2) Large files or HMAC-MD5 - Progressive chunked CryptoJS hashing
        const chunkSize = 1024 * 1024 * 2; // 2MB chunk sizes
        let offset = 0;

        let CryptoJSAlgo: any;
        if (algo === 'HMAC-SHA256') CryptoJSAlgo = CryptoJS.algo.SHA256;
        else if (algo === 'HMAC-SHA512') CryptoJSAlgo = CryptoJS.algo.SHA512;
        else if (algo === 'HMAC-SHA1') CryptoJSAlgo = CryptoJS.algo.SHA1;
        else CryptoJSAlgo = CryptoJS.algo.MD5;

        // Initialize progressive HMAC
        const hmacAlgo = CryptoJS.algo.HMAC.create(CryptoJSAlgo, secretKey);

        const readNextChunk = () => {
          return new Promise<void>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
              if (e.target?.result) {
                const wordArr = arrayBufferToWordArray(e.target.result as ArrayBuffer);
                hmacAlgo.update(wordArr);
                
                offset += chunkSize;
                setFileProgress(Math.min(100, Math.round((offset / fileSize) * 100)));
                
                if (offset < fileSize) {
                  // Keep browser layout UI responsive
                  setTimeout(() => {
                    readNextChunk().then(resolve).catch(reject);
                  }, 0);
                } else {
                  resolve();
                }
              }
            };
            reader.onerror = reject;
            const slice = selectedFile.slice(offset, offset + chunkSize);
            reader.readAsArrayBuffer(slice);
          });
        };

        await readNextChunk();
        const finalHash = hmacAlgo.finalize().toString();
        setHashResult(finalHash);
        setFileProgress(100);
        
        saveToHistory({
          inputSnippet: selectedFile.name,
          keySnippet: secretKey.length > 12 ? secretKey.substring(0, 12) + '...' : secretKey,
          hash: finalHash,
          type: 'file',
          algo,
          size: selectedFile.size
        });
      }
    } catch (err) {
      console.error("Error signing file", err);
      setHashResult("Error processing file signature");
    } finally {
      setIsHashing(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      hashFile(selectedFile);
    }
  };
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const selectedFile = e.dataTransfer.files[0];
      setFile(selectedFile);
      hashFile(selectedFile);
    }
  };

  const handleTextFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const textFile = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setInputText(event.target.result as string);
        }
      };
      reader.readAsText(textFile);
    }
  };

  const copyToClipboard = (text: string, type: 'hash' | 'share' | string) => {
    navigator.clipboard.writeText(text);
    if (type === 'hash') {
      setCopiedHash(true);
      setTimeout(() => setCopiedHash(false), 2000);
    } else if (type === 'share') {
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2000);
    } else {
      setCopiedCode(type);
      setTimeout(() => setCopiedCode(null), 2000);
    }
  };

  const shareState = () => {
    if (typeof window !== 'undefined') {
      const baseUrl = window.location.origin + window.location.pathname;
      const shareUrl = `${baseUrl}?text=${encodeURIComponent(inputText)}&key=${encodeURIComponent(secretKey)}&algo=${algo}`;
      copyToClipboard(shareUrl, 'share');
    }
  };

  const downloadHash = () => {
    const finalHash = isUppercase ? hashResult.toUpperCase() : hashResult;
    const blob = new Blob([finalHash], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `hmac_${algo.toLowerCase().replace('-', '_')}_signature.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleGenerateKey = () => {
    setSecretKey(generateSecureKey());
  };

  const handleClear = () => {
    setInputText('');
    setSecretKey('');
    setHashResult('');
    setCompareHash('');
    setFile(null);
    setFileProgress(0);
  };

  const fillSamplePayload = () => {
    setInputText(JSON.stringify({
      event: "payment.succeeded",
      amount: 4999,
      currency: "usd",
      customer: "cus_8h2j8dh29",
      timestamp: Math.floor(Date.now() / 1000)
    }, null, 2));
    setSecretKey("whsec_51e5ad7448e65839958cf0b784a929fa3a2");
  };

  const displayHash = isUppercase ? hashResult.toUpperCase() : hashResult;
  const isMatch = compareHash ? displayHash.toLowerCase() === compareHash.toLowerCase().trim() : null;

  // Code snippets generator based on current secret key & message
  const devSnippets = useMemo(() => {
    const currentMsg = inputText || '{"event":"user.login"}';
    const currentKey = secretKey || 'your_secret_key';
    const algoNode = algo === 'HMAC-SHA256' ? 'sha256' :
                     algo === 'HMAC-SHA512' ? 'sha512' :
                     algo === 'HMAC-SHA1' ? 'sha1' : 'md5';
    
    return {
      webhook: {
        title: "Stripe/GitHub Style Webhook Signature",
        description: "Generate signature header payload with timestamp verification.",
        headers: `X-Signature: ${displayHash || 'calculating...'}\nRequest-Time: 1787836800`,
        curl: `curl -X POST https://api.yoursite.com/webhooks \\\n  -H "Content-Type: application/json" \\\n  -H "X-Signature: ${displayHash || 'SIGNATURE'}" \\\n  -d '${currentMsg.replace(/'/g, "'\\''")}'`,
        code: `// Node.js Express Webhook Verification (Constant-Time)
const crypto = require('crypto');

app.post('/webhooks', express.raw({type: 'application/json'}), (req, res) => {
  const signature = req.headers['x-signature'];
  const secret = '${currentKey}';
  
  const hmac = crypto
    .createHmac('${algoNode}', secret)
    .update(req.body)
    .digest('hex');

  // timingSafeEqual guards against timing attacks
  const isValid = crypto.timingSafeEqual(
    Buffer.from(signature || ''), 
    Buffer.from(hmac)
  );

  if (!isValid) return res.status(401).send('Invalid signature');
  res.status(200).send('Webhook verified');
});`
      },
      aws: {
        title: "AWS SigV4 Authentication Signing",
        description: "AWS-style canonical request signing representation.",
        headers: `Authorization: AWS4-HMAC-SHA256 Credential=AKIAIOSFODNN7EXAMPLE/20260520/us-east-1/s3/aws4_request, SignedHeaders=host;x-amz-content-sha256, Signature=${displayHash || 'calculating...'}`,
        curl: `curl -X GET https://s3.amazonaws.com/my-bucket/file.txt \\\n  -H "Host: s3.amazonaws.com" \\\n  -H "x-amz-content-sha256: ${displayHash || 'SIGNATURE'}"`,
        code: `# Python AWS Request Signature Derivation
import hmac
import hashlib

def sign(key, msg):
    return hmac.new(key, msg.encode('utf-8'), hashlib.${algoNode}).digest()

# Deriving signature key
k_date = sign(b"AWS4" + b"${currentKey}", "20260520")
k_region = sign(k_date, "us-east-1")
k_service = sign(k_region, "s3")
k_signing = sign(k_service, "aws4_request")

signature = hmac.new(k_signing, b"${currentMsg}", hashlib.${algoNode}).hexdigest()
print("AWS Signature:", signature)`
      },
      jwt: {
        title: "JWT HMAC Token Signature",
        description: "HS256 Header + Payload token signing structure.",
        headers: `Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.${displayHash || 'calculating...'}`,
        curl: `curl -X GET https://api.yoursite.com/profile \\\n  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.${displayHash || 'SIGNATURE'}"`,
        code: `// Go JWT HS256 HMAC Signer
package main

import (
\t"crypto/hmac"
\t"crypto/sha256"
\t"encoding/base64"
\t"fmt"
)

func main() {
\theader := base64.RawURLEncoding.EncodeToString([]byte(\`{"alg":"HS256","typ":"JWT"}\`))
\tpayload := base64.RawURLEncoding.EncodeToString([]byte(\`{"sub":"1234567890"}\`))
\t
\tsecret := []byte("${currentKey}")
\tdata := header + "." + payload
\t
\th := hmac.New(sha256.New, secret)
\th.Write([]byte(data))
\tsignature := base64.RawURLEncoding.EncodeToString(h.Sum(nil))
\t
\tfmt.Printf("JWT Token: %s.%s.%s\\n", header, payload, signature)
}`
      },
      express: {
        title: "Generic REST API Signature Signing",
        description: "Sign HTTP verb, path, and timestamp to authenticate client calls.",
        headers: `X-Api-Timestamp: 1787836800\nX-Api-Signature: ${displayHash || 'calculating...'}`,
        curl: `curl -X POST https://api.yoursite.com/v1/orders \\\n  -H "X-Api-Key: client_id_1" \\\n  -H "X-Api-Timestamp: 1787836800" \\\n  -H "X-Api-Signature: ${displayHash || 'SIGNATURE'}" \\\n  -d '${currentMsg.replace(/'/g, "'\\''")}'`,
        code: `// Java Spring Boot API Signature Filter Check
import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import org.apache.commons.codec.binary.Hex;

public class ApiSigner {
    public static boolean verifySignature(String payload, String secretKey, String clientSignature) {
        try {
            Mac shaMac = Mac.getInstance("${algo === 'HMAC-SHA256' ? 'HmacSHA256' : algo === 'HMAC-SHA512' ? 'HmacSHA512' : algo === 'HMAC-SHA1' ? 'HmacSHA1' : 'HmacMD5'}");
            SecretKeySpec keySpec = new SecretKeySpec(secretKey.getBytes("UTF-8"), "${algo === 'HMAC-SHA256' ? 'HmacSHA256' : algo === 'HMAC-SHA512' ? 'HmacSHA512' : algo === 'HMAC-SHA1' ? 'HmacSHA1' : 'HmacMD5'}");
            shaMac.init(keySpec);
            
            byte[] rawHmac = shaMac.doFinal(payload.getBytes("UTF-8"));
            String expected = Hex.encodeHexString(rawHmac);
            
            // Compare signatures
            return expected.equalsIgnoreCase(clientSignature);
        } catch (Exception e) {
            return false;
        }
    }
}`
    }
  };
}, [inputText, secretKey, algo, displayHash]);

  return (
    <div className="space-y-8">
      {/* Configuration & Inputs Card */}
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Left Settings Panel */}
        <div className="lg:col-span-1 space-y-6 bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800">
          <div className="space-y-4">
            <h4 className="font-bold text-slate-900 dark:text-white text-sm uppercase tracking-wider flex items-center gap-2">
              <Zap size={16} className="text-[#518231]" /> Sign Settings
            </h4>
            
            {/* Algorithm Switcher */}
            <div className="space-y-1.5">
              <label htmlFor="algoSelect" className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                {t('algorithm')}
              </label>
              <select
                id="algoSelect"
                value={algo}
                onChange={(e) => setAlgo(e.target.value as any)}
                className="w-full p-2.5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-semibold text-slate-850 dark:text-slate-200 focus:ring-2 focus:ring-[#518231]/40 focus:border-[#518231] outline-none"
              >
                <option value="HMAC-SHA256">HMAC-SHA256 (Secure Standard)</option>
                <option value="HMAC-SHA512">HMAC-SHA512 (High Security)</option>
                <option value="HMAC-SHA1">HMAC-SHA1 (Legacy)</option>
                <option value="HMAC-MD5">HMAC-MD5 (Deprecated)</option>
              </select>
            </div>

            {/* Secret Key Input with visibility toggler */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label htmlFor="secretInput" className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  {t('secretKey')}
                </label>
                <button
                  onClick={handleGenerateKey}
                  className="text-[11px] font-bold text-[#518231] hover:underline"
                  title="Generate a cryptographically secure symmetric random key"
                >
                  Generate Key
                </button>
              </div>
              <div className="relative">
                <input
                  id="secretInput"
                  type={showSecret ? "text" : "password"}
                  value={secretKey}
                  onChange={(e) => setSecretKey(e.target.value)}
                  placeholder="Enter cryptographic secret..."
                  className="w-full p-2.5 pr-10 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-mono text-slate-850 dark:text-slate-100 focus:ring-2 focus:ring-[#518231]/40 focus:border-[#518231] outline-none placeholder:text-slate-400 dark:placeholder:text-slate-700"
                />
                <button
                  type="button"
                  onClick={() => setShowSecret(!showSecret)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
                  aria-label={showSecret ? "Hide secret key" : "Show secret key"}
                >
                  {showSecret ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Output Case */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                {t('outputCase')}
              </label>
              <div className="flex bg-white dark:bg-slate-950 p-1 border border-slate-200 dark:border-slate-800 rounded-xl">
                <button
                  onClick={() => setIsUppercase(false)}
                  className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors ${!isUppercase ? 'bg-[#518231]/10 text-[#518231] dark:text-green-400' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'}`}
                >
                  {t('lowercase')} (hex)
                </button>
                <button
                  onClick={() => setIsUppercase(true)}
                  className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors ${isUppercase ? 'bg-[#518231]/10 text-[#518231] dark:text-green-400' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'}`}
                >
                  {t('uppercase')} (HEX)
                </button>
              </div>
            </div>

            {/* Utility Toggles */}
            <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
              <label className="flex items-center gap-3.5 cursor-pointer select-none">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={autoCopy}
                    onChange={(e) => setAutoCopy(e.target.checked)}
                    className="sr-only"
                    id="autoCopyToggle"
                  />
                  <div className={`w-8 h-4 rounded-full transition-colors ${autoCopy ? 'bg-[#518231]' : 'bg-slate-350 dark:bg-slate-700'}`}></div>
                  <div className={`absolute left-0.5 top-0.5 w-3 h-3 rounded-full bg-white transition-transform ${autoCopy ? 'translate-x-4' : 'translate-x-0'}`}></div>
                </div>
                <span className="text-xs font-semibold text-slate-650 dark:text-slate-300">Auto-copy output</span>
              </label>
            </div>

            {/* Helper Info */}
            <div className="bg-slate-100 dark:bg-slate-950/60 p-3.5 rounded-xl border border-slate-150 dark:border-slate-800/80 flex items-start gap-2.5">
              <Info size={14} className="text-[#518231] shrink-0 mt-0.5" />
              <p className="text-[11px] leading-relaxed text-slate-500 dark:text-slate-400">
                This utility operates 100% client-side. Cryptographic keys and text/files remain inside your browser sandbox and are never uploaded.
              </p>
            </div>

            <button
              onClick={handleClear}
              className="w-full flex items-center justify-center gap-2 py-2.5 bg-slate-200 hover:bg-slate-300/80 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-750 dark:text-slate-200 text-xs font-semibold rounded-xl transition-all border border-slate-200/50 dark:border-slate-700/50"
            >
              <Trash2 size={14} /> {t('clear')} Fields
            </button>
          </div>
        </div>

        {/* Center/Right Inputs & Results */}
        <div className="lg:col-span-2 space-y-6">
          {/* Input Source Selector */}
          <div className="flex p-1 bg-slate-100 dark:bg-slate-800 rounded-xl w-full max-w-sm mx-auto">
            <button
              onClick={() => setActiveTab('text')}
              className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium rounded-lg transition-all ${
                activeTab === 'text' 
                  ? 'bg-white dark:bg-slate-750 text-[#518231] dark:text-green-400 shadow-sm font-semibold' 
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <FileText size={16} /> Text Input
            </button>
            <button
              onClick={() => setActiveTab('file')}
              className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium rounded-lg transition-all ${
                activeTab === 'file' 
                  ? 'bg-white dark:bg-slate-750 text-[#518231] dark:text-green-400 shadow-sm font-semibold' 
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <FileArchive size={16} /> File Signer
            </button>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Payload Source</h3>
              {activeTab === 'text' && (
                <span className="text-xs font-semibold text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
                  {inputText.length} chars | {formatBytes(new Blob([inputText]).size)}
                </span>
              )}
            </div>

            {activeTab === 'text' ? (
              <div className="space-y-2">
                <div className="relative">
                  <textarea
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Type or paste payload message..."
                    className="w-full h-44 p-4 text-sm font-mono bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-2xl focus:ring-2 focus:ring-[#518231]/40 focus:border-[#518231] resize-none outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-700 text-slate-900 dark:text-slate-100"
                  />
                  
                  {/* Text utility controls */}
                  <div className="absolute bottom-4 right-4 flex items-center gap-2">
                    <button
                      onClick={fillSamplePayload}
                      className="px-2.5 py-1.5 text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 bg-white dark:bg-slate-900 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 transition-colors font-semibold"
                      title="Quick-fill sample JSON payload"
                    >
                      Sample JSON
                    </button>
                    <button
                      onClick={async () => {
                        const val = await navigator.clipboard.readText();
                        setInputText(val);
                      }}
                      className="p-1.5 text-slate-500 hover:text-[#518231] bg-white dark:bg-slate-900 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 transition-colors"
                      title="Paste from clipboard"
                    >
                      <Clipboard size={16} />
                    </button>
                  </div>
                </div>

                {/* Sub text file loader */}
                <div className="flex items-center justify-between text-xs text-slate-500 px-1">
                  <span>Load payload from a local config/text file:</span>
                  <label className="flex items-center gap-1 cursor-pointer text-[#518231] hover:underline font-semibold">
                    <FileCode size={14} />
                    <span>Choose file</span>
                    <input
                      type="file"
                      accept=".txt,.json,.csv,.xml,.html,.js,.ts"
                      onChange={handleTextFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            ) : (
              /* Drag & Drop File upload */
              <div 
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`relative flex flex-col items-center justify-center h-44 border-2 border-dashed rounded-2xl transition-all ${
                  isDragging 
                    ? 'border-[#518231] bg-[#518231]/5 dark:bg-[#518231]/10' 
                    : 'border-slate-300 dark:border-slate-700 hover:border-[#518231]/50 hover:bg-slate-50 dark:hover:bg-slate-800/40'
                }`}
              >
                <input 
                  type="file" 
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  title="Select a file"
                />
                
                <div className="flex flex-col items-center justify-center p-6 text-center pointer-events-none w-full">
                  {isHashing ? (
                    <div className="space-y-3 w-full max-w-xs">
                      <div className="w-10 h-10 border-3 border-slate-200 border-t-[#518231] rounded-full animate-spin mx-auto"></div>
                      <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">Hashing File Contents...</p>
                      <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-1.5">
                        <div className="bg-[#518231] h-1.5 rounded-full transition-all duration-300" style={{ width: `${fileProgress}%` }}></div>
                      </div>
                      <span className="text-[10px] text-slate-500 font-bold">{fileProgress}%</span>
                    </div>
                  ) : file ? (
                    <div className="space-y-2">
                      <div className="w-10 h-10 bg-green-150 dark:bg-green-950/40 text-[#518231] rounded-full flex items-center justify-center mx-auto">
                        <FileArchive size={20} />
                      </div>
                      <p className="text-sm font-semibold text-slate-850 dark:text-white truncate max-w-[280px]">
                        {file.name}
                      </p>
                      <p className="text-xs text-slate-500">{formatBytes(file.size)}</p>
                      <p className="text-[11px] text-[#518231] font-semibold">Click or drag new file to sign</p>
                    </div>
                  ) : (
                    <>
                      <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 text-slate-400 rounded-full flex items-center justify-center mb-3">
                        <UploadCloud size={24} />
                      </div>
                      <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                        {t('fileDrop')}
                      </p>
                      <p className="text-[11px] text-slate-400 mt-1">
                        Any size supported. Progressive hashing keeps browser responsive.
                      </p>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Outputs Panel */}
          <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-850 dark:text-slate-300 uppercase tracking-wider">
                Generated {algo} Signature
              </h3>
              {displayHash && (
                <span className="text-[10px] font-mono bg-green-100 dark:bg-green-950/40 text-green-700 dark:text-green-400 px-2 py-0.5 rounded font-bold">
                  {displayHash.length} Hex chars ({displayHash.length / 2} bytes)
                </span>
              )}
            </div>

            {/* Glowing Signature display box */}
            <div className="relative group">
              <div 
                className="w-full min-h-[72px] p-5 text-sm sm:text-base font-mono text-center break-all bg-gradient-to-br from-slate-50 to-slate-100/50 dark:from-slate-950/80 dark:to-slate-900/60 border-2 border-slate-200 dark:border-slate-800/80 rounded-2xl shadow-inner text-slate-800 dark:text-slate-200 flex items-center justify-center select-all cursor-pointer"
                onClick={(e) => {
                  const range = document.createRange();
                  range.selectNodeContents(e.currentTarget);
                  const selection = window.getSelection();
                  if (selection) {
                    selection.removeAllRanges();
                    selection.addRange(range);
                  }
                }}
              >
                {displayHash || <span className="text-slate-400 dark:text-slate-650 italic">Please enter secret key to derive signature...</span>}
              </div>
              
              {displayHash && (
                <div className="absolute top-2 right-2 flex opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity gap-1.5">
                  {activeTab === 'text' && inputText && (
                    <button
                      onClick={shareState}
                      className="p-1.5 bg-white hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-lg shadow-sm border border-slate-200/80 dark:border-slate-700 transition-colors"
                      title="Copy shareable parameters URL"
                    >
                      {copiedShare ? <Check size={14} className="text-green-500" /> : <Share2 size={14} />}
                    </button>
                  )}
                  <button
                    onClick={() => copyToClipboard(displayHash, 'hash')}
                    className="p-1.5 bg-white hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-lg shadow-sm border border-slate-200/80 dark:border-slate-700 transition-colors"
                    title="Copy HMAC signature"
                  >
                    {copiedHash ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                  </button>
                  <button
                    onClick={downloadHash}
                    className="p-1.5 bg-[#518231]/10 hover:bg-[#518231]/20 text-[#518231] rounded-lg shadow-sm border border-[#518231]/20 transition-colors"
                    title="Download signature as .txt file"
                  >
                    <Download size={14} />
                  </button>
                </div>
              )}
            </div>

            {/* Signature Verification Panel */}
            <div className="space-y-2 pt-2">
              <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <ArrowRightLeft size={14} /> Signature Match & Verification
              </h4>
              <div className="relative">
                <input
                  type="text"
                  value={compareHash}
                  onChange={(e) => setCompareHash(e.target.value)}
                  placeholder="Paste signature to compare..."
                  className={`w-full p-2.5 pl-3.5 pr-10 text-xs font-mono bg-white dark:bg-slate-950 border ${
                    isMatch === true ? 'border-green-500 ring-1 ring-green-500/30' : 
                    isMatch === false ? 'border-red-500 ring-1 ring-red-500/30' : 
                    'border-slate-250 dark:border-slate-850'
                  } rounded-xl focus:outline-none transition-all text-slate-850 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-700`}
                />
                <div className="absolute right-3.5 top-1/2 -translate-y-1/2">
                  {isMatch === true && <CheckCircle2 className="text-green-500" size={18} />}
                  {isMatch === false && <AlertCircle className="text-red-500" size={18} />}
                </div>
              </div>
              {isMatch === true && (
                <span className="text-[11px] text-green-600 dark:text-green-400 font-semibold block animate-in slide-in-from-top-1">
                  ✓ Signatures match perfectly. Payload integrity verified.
                </span>
              )}
              {isMatch === false && (
                <span className="text-[11px] text-red-600 dark:text-red-400 font-semibold block animate-in slide-in-from-top-1">
                  ✗ Signatures do not match. Payload verification failed.
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Developer Signing Demos Section */}
      <div className="pt-8 border-t border-slate-200 dark:border-slate-800">
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
              <Code className="text-[#518231]" /> Real-World Developer Integration Demos
            </h3>
            <div className="flex bg-slate-100 dark:bg-slate-850 p-1 border border-slate-200 dark:border-slate-800 rounded-xl max-w-fit">
              <button
                onClick={() => setDevDemoType('webhook')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${devDemoType === 'webhook' ? 'bg-white dark:bg-slate-750 text-[#518231] dark:text-green-400 shadow-sm' : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'}`}
              >
                Webhook Sig
              </button>
              <button
                onClick={() => setDevDemoType('aws')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${devDemoType === 'aws' ? 'bg-white dark:bg-slate-750 text-[#518231] dark:text-green-400 shadow-sm' : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'}`}
              >
                AWS SigV4
              </button>
              <button
                onClick={() => setDevDemoType('jwt')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${devDemoType === 'jwt' ? 'bg-white dark:bg-slate-750 text-[#518231] dark:text-green-400 shadow-sm' : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'}`}
              >
                JWT HS256
              </button>
              <button
                onClick={() => setDevDemoType('express')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${devDemoType === 'express' ? 'bg-white dark:bg-slate-750 text-[#518231] dark:text-green-400 shadow-sm' : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'}`}
              >
                REST API
              </button>
            </div>
          </div>

          {/* Active Demo Representation */}
          <div className="bg-slate-900 rounded-2xl overflow-hidden shadow-lg border border-slate-800 animate-in fade-in duration-300">
            {/* Demo Header */}
            <div className="px-6 py-4 bg-slate-950/80 border-b border-slate-850 flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                  <Terminal size={14} className="text-[#518231]" /> {devSnippets[devDemoType].title}
                </h4>
                <p className="text-[11px] text-slate-400 mt-0.5">{devSnippets[devDemoType].description}</p>
              </div>
              <span className="text-[10px] font-semibold bg-[#518231]/15 text-green-400 px-2 py-0.5 rounded uppercase">
                {algo} Simulation
              </span>
            </div>

            {/* Grid structure of Demo */}
            <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-800">
              {/* Left Column: Headers & Curl */}
              <div className="p-5 space-y-4">
                {/* Headers */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Headers Preview</span>
                    <button
                      onClick={() => copyToClipboard(devSnippets[devDemoType].headers, 'headers')}
                      className="text-[10px] font-bold text-[#518231] hover:underline flex items-center gap-1"
                    >
                      {copiedCode === 'headers' ? <Check size={10} /> : <Copy size={10} />}
                      <span>{copiedCode === 'headers' ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <pre className="text-xs text-slate-350 overflow-x-auto p-3 bg-slate-950 rounded-xl custom-scrollbar font-mono leading-relaxed">
                    <code>{devSnippets[devDemoType].headers}</code>
                  </pre>
                </div>

                {/* cURL Request */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">cURL Command</span>
                    <button
                      onClick={() => copyToClipboard(devSnippets[devDemoType].curl, 'curl')}
                      className="text-[10px] font-bold text-[#518231] hover:underline flex items-center gap-1"
                    >
                      {copiedCode === 'curl' ? <Check size={10} /> : <Copy size={10} />}
                      <span>{copiedCode === 'curl' ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <pre className="text-xs text-green-450 overflow-x-auto p-3 bg-slate-950 rounded-xl custom-scrollbar font-mono leading-relaxed max-h-36">
                    <code>{devSnippets[devDemoType].curl}</code>
                  </pre>
                </div>
              </div>

              {/* Right Column: Code Snippet */}
              <div className="p-5 space-y-1.5 flex flex-col justify-between">
                <div className="space-y-1.5 flex-1 flex flex-col">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Verification Snippet</span>
                    <button
                      onClick={() => copyToClipboard(devSnippets[devDemoType].code, 'code')}
                      className="text-[10px] font-bold text-[#518231] hover:underline flex items-center gap-1"
                    >
                      {copiedCode === 'code' ? <Check size={10} /> : <Copy size={10} />}
                      <span>{copiedCode === 'code' ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <pre className="text-xs text-slate-300 overflow-x-auto p-3 bg-slate-950 rounded-xl custom-scrollbar font-mono flex-1 leading-relaxed max-h-72 overflow-y-auto">
                    <code>{devSnippets[devDemoType].code}</code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* History Log Card */}
      {history.length > 0 && (
        <div className="pt-8 mt-8 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
              <History size={18} className="text-[#518231]" /> {t('history')}
            </h3>
            <button 
              onClick={() => {
                setHistory([]);
                localStorage.removeItem('hmacHistory');
              }}
              className="text-xs text-red-500 hover:text-red-600 font-semibold hover:underline"
            >
              Clear Log History
            </button>
          </div>
          <div className="bg-white dark:bg-slate-950 rounded-2xl border border-slate-250 dark:border-slate-850 overflow-hidden shadow-sm">
            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-slate-500 uppercase bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
                  <tr>
                    <th className="px-6 py-3.5 font-bold">Source/Payload</th>
                    <th className="px-6 py-3.5 font-bold">Key/Secret</th>
                    <th className="px-6 py-3.5 font-bold">Algorithm</th>
                    <th className="px-6 py-3.5 font-bold">Signature Output</th>
                    <th className="px-6 py-3.5 font-bold w-20 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-900">
                  {history.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/40 transition-colors">
                      <td className="px-6 py-3 font-medium">
                        <div className="flex items-center gap-2">
                          {item.type === 'text' ? <FileText size={14} className="text-slate-400" /> : <FileArchive size={14} className="text-blue-400" />}
                          <span className="font-mono text-slate-700 dark:text-slate-300 truncate max-w-[130px] md:max-w-[170px]" title={item.inputSnippet}>
                            {item.inputSnippet}
                          </span>
                        </div>
                        {item.size && (
                          <div className="text-[10px] text-slate-400 mt-0.5 ml-6">
                            {formatBytes(item.size)}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-3">
                        <span className="font-mono text-slate-500 dark:text-slate-500 truncate max-w-[100px] block" title={item.keySnippet}>
                          {item.keySnippet}
                        </span>
                      </td>
                      <td className="px-6 py-3">
                        <span className="text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-650 dark:text-slate-300 px-2 py-0.5 rounded">
                          {item.algo}
                        </span>
                      </td>
                      <td className="px-6 py-3">
                        <code className="text-xs font-mono bg-slate-100 dark:bg-slate-900 px-2 py-0.5 rounded text-slate-800 dark:text-slate-200 select-all block truncate max-w-[200px]" title={item.hash}>
                          {isUppercase ? item.hash.toUpperCase() : item.hash}
                        </code>
                      </td>
                      <td className="px-6 py-3 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => {
                              if (item.type === 'text') {
                                setInputText(item.inputSnippet.replace('...', ''));
                              }
                              setSecretKey(item.keySnippet.replace('...', ''));
                              setAlgo(item.algo as any);
                            }}
                            className="p-1.5 text-slate-400 hover:text-[#518231] hover:bg-[#518231]/10 rounded transition-colors"
                            title="Load values back into tool"
                          >
                            <RefreshCw size={12} />
                          </button>
                          <button
                            onClick={() => copyToClipboard(isUppercase ? item.hash.toUpperCase() : item.hash, 'hash')}
                            className="p-1.5 text-slate-400 hover:text-[#518231] hover:bg-[#518231]/10 rounded transition-colors"
                            title="Copy signature string"
                          >
                            <Copy size={12} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
