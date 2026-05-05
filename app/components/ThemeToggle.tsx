"use client";
import * as React from "react";
import { useTheme } from "next-themes";
import { Moon, Sun, Monitor } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-[88px] h-6 bg-slate-800 rounded animate-pulse" />;
  }

  return (
    <div className="flex items-center gap-1.5">
      <label className="text-slate-400 uppercase tracking-wider font-semibold">Theme:</label>
      <div className="flex items-center bg-slate-800 rounded p-0.5">
        <button
          onClick={() => setTheme("light")}
          className={`h-9 w-9 sm:h-auto sm:w-auto p-1 flex items-center justify-center rounded transition-colors ${theme === "light" ? "bg-slate-600 text-white" : "text-slate-400 hover:text-slate-200"}`}
          aria-label="Light theme"
          title="Light theme"
        >
          <Sun size={12} strokeWidth={2.5} />
        </button>
        <button
          onClick={() => setTheme("system")}
          className={`h-9 w-9 sm:h-auto sm:w-auto p-1 flex items-center justify-center rounded transition-colors ${theme === "system" ? "bg-slate-600 text-white" : "text-slate-400 hover:text-slate-200"}`}
          aria-label="System theme"
          title="System match"
        >
          <Monitor size={12} strokeWidth={2.5} />
        </button>
        <button
          onClick={() => setTheme("dark")}
          className={`h-9 w-9 sm:h-auto sm:w-auto p-1 flex items-center justify-center rounded transition-colors ${theme === "dark" || (!theme && resolvedTheme === "dark") ? "bg-slate-600 text-white" : "text-slate-400 hover:text-slate-200"}`}
          aria-label="Dark theme"
          title="Dark theme"
        >
          <Moon size={12} strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
}
