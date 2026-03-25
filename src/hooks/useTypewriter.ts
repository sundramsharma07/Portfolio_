"use client";

import { useEffect, useMemo, useState } from "react";

export default function useTypewriter({
  words,
  typingMs = 34,
  deletingMs = 18,
  pauseMs = 900,
}: {
  words: string[];
  typingMs?: number;
  deletingMs?: number;
  pauseMs?: number;
}) {
  const cleaned = useMemo(() => words.filter(Boolean), [words]);
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const word = cleaned[index] ?? "";
    const tick = () => {
      if (!word) return;

      if (!isDeleting) {
        if (subIndex < word.length) {
          setSubIndex((v) => v + 1);
        } else {
          // Pause at end
          setTimeout(() => setIsDeleting(true), pauseMs);
          return;
        }
      } else {
        if (subIndex > 0) {
          setSubIndex((v) => v - 1);
        } else {
          setIsDeleting(false);
          setIndex((v) => (v + 1) % cleaned.length);
          return;
        }
      }
    };

    const timeout = window.setTimeout(
      tick,
      isDeleting ? deletingMs : typingMs,
    );
    return () => window.clearTimeout(timeout);
  }, [cleaned, deletingMs, index, isDeleting, pauseMs, subIndex, typingMs]);

  const text = (cleaned[index] ?? "").slice(0, subIndex);
  return text;
}

