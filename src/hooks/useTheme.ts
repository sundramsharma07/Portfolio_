"use client";

import { useEffect, useState } from "react";

export type ThemeMode = "dark" | "light";

export default function useTheme() {
  const [mode, setMode] = useState<ThemeMode>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Initialize theme from localStorage or system preference
    const stored = window.localStorage.getItem("theme");
    const initialMode: ThemeMode = (stored === "light" || stored === "dark") 
      ? stored 
      : window.matchMedia?.("(prefers-color-scheme: light)")?.matches ? "light" : "dark";
    
    setMode(initialMode);
    document.documentElement.dataset.theme = initialMode;
    window.localStorage.setItem("theme", initialMode);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.dataset.theme = mode;
    window.localStorage.setItem("theme", mode);
  }, [mode, mounted]);

  return { mode, setMode, mounted };
}

