"use client";

import React, { useState, useEffect } from "react";
import { Copy, Check, X, Share2, QrCode, ExternalLink, Mail } from "lucide-react";
import QRCode from "qrcode";
import { serializeCalculatorInputs } from "@/lib/hooks/useCalculatorUrlHydration";

interface ShareCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  slug: string;
  title: string;
  locale?: string;
  targetId?: string;
}

const modalTranslations: Record<string, {
  title: string;
  subtitle: string;
  urlLabel: string;
  copyBtn: string;
  copiedBtn: string;
  qrTitle: string;
  qrDesc: string;
  quickShare: string;
  moreShare: string;
  footerNote: string;
  closeBtn: string;
}> = {
  en: {
    title: "Share Calculation",
    subtitle: "Recipients will see your exact inputs and calculations live",
    urlLabel: "Direct Shareable Link",
    copyBtn: "Copy Link",
    copiedBtn: "Copied!",
    qrTitle: "Scan with your phone",
    qrDesc: "Point your camera at this QR code to instantly open and continue this calculation on mobile.",
    quickShare: "Quick Share",
    moreShare: "More...",
    footerNote: "Custom parameters are safely encoded into the URL.",
    closeBtn: "Close",
  },
  es: {
    title: "Compartir Cálculo",
    subtitle: "Los destinatarios verán sus datos y resultados calculados",
    urlLabel: "Enlace Directo para Compartir",
    copyBtn: "Copiar Enlace",
    copiedBtn: "¡Copiado!",
    qrTitle: "Escanear con el móvil",
    qrDesc: "Apunte su cámara a este código QR para abrir este cálculo en su teléfono.",
    quickShare: "Compartir Rápido",
    moreShare: "Más...",
    footerNote: "Los parámetros se guardan de forma segura en la URL.",
    closeBtn: "Cerrar",
  },
  fr: {
    title: "Partager le Calcul",
    subtitle: "Les destinataires verront exactement vos entrées et résultats",
    urlLabel: "Lien Direct Partageable",
    copyBtn: "Copier le Lien",
    copiedBtn: "Copié !",
    qrTitle: "Scannez avec votre mobile",
    qrDesc: "Pointez votre appareil photo sur ce code QR pour ouvrir ce calcul sur votre smartphone.",
    quickShare: "Partage Rapide",
    moreShare: "Plus...",
    footerNote: "Les paramètres sont encodés en toute sécurité dans l'URL.",
    closeBtn: "Fermer",
  },
  de: {
    title: "Berechnung Teilen",
    subtitle: "Empfänger sehen Ihre genauen Eingaben und Ergebnisse live",
    urlLabel: "Direkter Teilen-Link",
    copyBtn: "Link Kopieren",
    copiedBtn: "Kopiert!",
    qrTitle: "Mit dem Smartphone scannen",
    qrDesc: "Richten Sie Ihre Kamera auf diesen QR-Code, um die Berechnung mobil fortzusetzen.",
    quickShare: "Schnell Teilen",
    moreShare: "Mehr...",
    footerNote: "Eingabewerte sind sicher in der URL codiert.",
    closeBtn: "Schließen",
  },
};

export function ShareCalculatorModal({
  isOpen,
  onClose,
  slug,
  title,
  locale = "en",
  targetId = "calculator-export-target",
}: ShareCalculatorModalProps) {
  const [shareUrl, setShareUrl] = useState("");
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const t = modalTranslations[locale] || modalTranslations.en;

  useEffect(() => {
    if (!isOpen || typeof window === "undefined") return;

    try {
      const baseUrl = "https://www.nexuscalculator.net";
      const inputsParams = serializeCalculatorInputs(targetId);
      const queryStr = inputsParams.toString() ? `?${inputsParams.toString()}` : "";
      const fullUrl = `${baseUrl}/${locale}/calculators/${slug}${queryStr}`;
      
      setShareUrl(fullUrl);

      // Silently sync current browser address bar to match the generated share URL
      window.history.replaceState({ ...window.history.state }, "", fullUrl);

      // Generate QR Code
      QRCode.toDataURL(fullUrl, {
        width: 240,
        margin: 1,
        color: {
          dark: "#0f172a",
          light: "#ffffff",
        },
      })
        .then((qr) => setQrCodeUrl(qr))
        .catch((e) => console.debug("Failed to generate QR code:", e));
    } catch (err) {
      console.error("Error creating shareable URL:", err);
      setShareUrl(window.location.href);
    }
  }, [isOpen, slug, locale, targetId]);

  if (!isOpen) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (e) {
      console.error("Failed to copy link:", e);
    }
  };

  const handleNativeShare = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: `${title} | Nexus Calculator`,
          text: `Check out this customized calculation for ${title}:`,
          url: shareUrl,
        });
      } catch (err) {
        // User dismissed share dialog
      }
    }
  };

  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(`${title} Calculation: ${shareUrl}`)}`;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(`Check out this ${title} calculation on Nexus:`)}&url=${encodeURIComponent(shareUrl)}`;
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
  const emailUrl = `mailto:?subject=${encodeURIComponent(`${title} Calculation`)}&body=${encodeURIComponent(`Here is the live calculation for ${title}:\n\n${shareUrl}`)}`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-sm p-4 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl max-w-lg w-full max-h-[90vh] flex flex-col overflow-hidden animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/60 dark:bg-slate-800/40 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#518231]/10 text-[#518231] dark:text-[#6fa844] flex items-center justify-center shrink-0">
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                {t.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                {t.subtitle}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 space-y-6 overflow-y-auto">
          {/* Deep-Linked URL Input Box */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              {t.urlLabel}
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={shareUrl}
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs sm:text-sm font-mono text-slate-800 dark:text-slate-200 truncate focus:outline-none"
              />
              <button
                onClick={handleCopy}
                className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm text-white shrink-0 transition-all shadow-sm ${
                  copied
                    ? "bg-[#436a28] shadow-[#436a28]/20"
                    : "bg-[#518231] hover:bg-[#436a28] shadow-[#518231]/20"
                }`}
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>{t.copiedBtn}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>{t.copyBtn}</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* QR Code Card */}
          {qrCodeUrl && (
            <div className="flex flex-col sm:flex-row items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800">
              <div className="p-2 bg-white rounded-xl shadow-sm shrink-0">
                <img
                  src={qrCodeUrl}
                  alt={`QR code for ${title}`}
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-lg"
                />
              </div>
              <div className="space-y-1.5 text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-1.5 font-bold text-slate-800 dark:text-slate-200 text-sm">
                  <QrCode className="w-4 h-4 text-[#518231] dark:text-[#6fa844]" />
                  <span>{t.qrTitle}</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {t.qrDesc}
                </p>
              </div>
            </div>
          )}

          {/* Quick Social Share Buttons */}
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              {t.quickShare}
            </span>
            <div className="grid grid-cols-5 gap-2">
              {/* WhatsApp */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 transition-colors text-xs font-semibold"
                title="Share on WhatsApp"
              >
                <span className="font-bold text-sm sm:text-base">WA</span>
                <span className="text-[10px] mt-0.5 truncate">WhatsApp</span>
              </a>

              {/* Twitter / X */}
              <a
                href={twitterUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-xs font-semibold"
                title="Share on X"
              >
                <span className="font-bold text-sm sm:text-base">𝕏</span>
                <span className="text-[10px] mt-0.5 truncate">Twitter/X</span>
              </a>

              {/* LinkedIn */}
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/60 transition-colors text-xs font-semibold"
                title="Share on LinkedIn"
              >
                <span className="font-bold text-sm sm:text-base">in</span>
                <span className="text-[10px] mt-0.5 truncate">LinkedIn</span>
              </a>

              {/* Email */}
              <a
                href={emailUrl}
                className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 hover:bg-amber-100 dark:hover:bg-amber-900/60 transition-colors text-xs font-semibold"
                title="Share via Email"
              >
                <Mail className="w-4 h-4 mt-0.5" />
                <span className="text-[10px] mt-1 truncate">Email</span>
              </a>

              {/* Native / More */}
              <button
                onClick={handleNativeShare}
                className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-900/60 transition-colors text-xs font-semibold"
                title="More sharing options"
              >
                <Share2 className="w-4 h-4 mt-0.5" />
                <span className="text-[10px] mt-1 truncate">{t.moreShare}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 border-t border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 flex items-center justify-between gap-4 shrink-0">
          <p className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block">
            {t.footerNote}
          </p>
          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs sm:text-sm font-semibold hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            >
              {t.closeBtn}
            </button>
            <button
              onClick={handleCopy}
              className={`flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white transition-all shadow-md ${
                copied
                  ? "bg-[#436a28] shadow-[#436a28]/20"
                  : "bg-[#518231] hover:bg-[#436a28] shadow-[#518231]/20"
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>{t.copiedBtn}</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>{t.copyBtn}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
