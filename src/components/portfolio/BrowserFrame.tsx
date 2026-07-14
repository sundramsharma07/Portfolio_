"use client";

import React, { useState } from "react";
import { ExternalLink, RefreshCw, Loader2 } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

interface BrowserFrameProps {
  url: string;
  title: string;
  /** Visible height of the preview panel (in px). Defaults to 340. */
  previewHeight?: number;
  className?: string;
}

export default function BrowserFrame({
  url,
  title,
  previewHeight = 340,
  className = "",
}: BrowserFrameProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [iframeKey, setIframeKey] = useState(0);

  const handleLoad = () => setIsLoading(false);
  const handleReload = () => {
    setIsLoading(true);
    setIframeKey((k) => k + 1);
  };

  const displayUrl = React.useMemo(() => {
    try { return new URL(url).hostname; } catch { return url; }
  }, [url]);

  return (
    <div
      className={`relative w-full overflow-hidden rounded-2xl border border-white/10 bg-slate-950 shadow-2xl group/frame ${className}`}
    >
      {/* ── Browser chrome ── */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-slate-900/90 border-b border-white/[0.08] select-none shrink-0">
        {/* Traffic lights */}
        <div className="flex gap-1.5 shrink-0">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
        </div>

        {/* Address bar */}
        <div className="flex-1 flex items-center gap-1.5 bg-slate-800/60 rounded-md px-3 py-[5px] text-[11px] text-white/40 min-w-0">
          <span className="truncate font-mono">{displayUrl}</span>
          <button
            onClick={handleReload}
            className="ml-auto shrink-0 hover:text-cyan-400 transition-colors"
            title="Reload preview"
          >
            <RefreshCw size={10} className={isLoading ? "animate-spin" : ""} />
          </button>
        </div>

        {/* External link */}
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className="shrink-0 text-white/40 hover:text-cyan-400 transition-colors"
          title="Open live site"
        >
          <ExternalLink size={12} />
        </a>
      </div>

      {/* ── Responsive iframe viewport ── */}
      <div
        className="relative w-full overflow-hidden bg-slate-950"
        style={{ height: `${previewHeight}px` }}
      >
        <iframe
          key={iframeKey}
          src={url}
          title={title}
          className="absolute inset-0 w-full h-full border-0"
          style={{ opacity: isLoading ? 0 : 1, transition: "opacity 0.5s ease" }}
          onLoad={handleLoad}
          loading="lazy"
        />

        {/* Loading shimmer / spinner */}
        <AnimatePresence>
          {isLoading && (
            <motion.div
              key="loader"
              className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950 gap-3"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="w-full px-8 space-y-3 animate-pulse">
                <div className="h-8 rounded bg-white/5 w-2/3" />
                <div className="h-4 rounded bg-white/5 w-full" />
                <div className="h-4 rounded bg-white/5 w-5/6" />
                <div className="h-20 rounded bg-white/5 w-full mt-2" />
              </div>
              <Loader2 className="animate-spin text-cyan-500/70" size={22} />
              <span className="text-[10px] font-mono tracking-widest text-white/25 uppercase">
                Loading preview…
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="absolute inset-0 flex items-end justify-center pb-5 pointer-events-none">
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            style={{ pointerEvents: "auto" }}
            className="
              opacity-0 group-hover/frame:opacity-100
              translate-y-3 group-hover/frame:translate-y-0
              transition-all duration-300 ease-out
              flex items-center gap-1.5
              bg-black/80 backdrop-blur-sm
              border border-cyan-500/30
              text-white text-[11px] font-bold
              px-4 py-2 rounded-full shadow-lg
              hover:bg-cyan-950/80 hover:text-cyan-300
            "
          >
            <ExternalLink size={12} className="text-cyan-400" />
            Open Live Site
          </a>
        </div>
      </div>
    </div>
  );
}
