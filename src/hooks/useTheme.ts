"use client";

import { useEffect, useState } from "react";

export type ThemeMode = "dark" | "light";

export default function useTheme() {
  const [mode, setMode] = useState<ThemeMode>(() => {
    // Initialize theme from localStorage or system preference
    if (typeof window === 'undefined') return "dark";
    const stored = window.localStorage.getItem("theme");
    return (stored === "light" || stored === "dark") 
      ? stored 
      : window.matchMedia?.("(prefers-color-scheme: light)")?.matches ? "light" : "dark";
  });
  const [mounted] = useState(true);

  useEffect(() => {
    if (!mounted) return;
    // Apply the theme to the document
    document.documentElement.dataset.theme = mode;
    window.localStorage.setItem("theme", mode);
  }, [mode, mounted]);

  return { mode, setMode, mounted };
}

