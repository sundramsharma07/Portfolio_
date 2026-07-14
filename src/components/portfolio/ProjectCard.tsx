"use client";

import { motion } from "framer-motion";
import { ExternalLink, FolderGit2, Sparkles, ChevronRight } from "lucide-react";
import BrowserFrame from "@/components/portfolio/BrowserFrame";
import { cn } from "@/lib/cn";

export default function ProjectCard({
  title,
  description,
  stack,
  liveUrl,
  repoUrl,
  isStarProject,
  onOpen,
  index,
}: {
  title: string;
  description: string;
  stack: string[];
  liveUrl?: string;
  repoUrl?: string;
  isStarProject?: boolean;
  index: number;
  onOpen: () => void;
}) {
  return (
    <motion.div
      className={cn(
        "group relative flex flex-col w-full rounded-[2rem] overflow-hidden border transition-all duration-500 ease-out",
        isStarProject
          ? "border-cyan-500/30 bg-slate-900/60 shadow-[0_0_40px_rgba(34,211,238,0.12)] ring-1 ring-cyan-500/20 hover:shadow-[0_0_55px_rgba(34,211,238,0.25)] hover:border-cyan-400/50"
          : "border-white/10 bg-slate-950/60 hover:border-cyan-500/25 hover:shadow-[0_0_35px_rgba(34,211,238,0.12)]"
      )}
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: index * 0.04 }}
    >
      {/* Decorative glow layer */}
      <span
        className={cn(
          "absolute inset-0 pointer-events-none transition-opacity duration-700 opacity-50 group-hover:opacity-100 z-0",
          isStarProject
            ? "bg-[radial-gradient(ellipse_at_top,rgba(34,211,238,0.18),transparent_55%),radial-gradient(ellipse_at_bottom,rgba(168,85,247,0.12),transparent_55%)]"
            : "bg-[radial-gradient(ellipse_at_top_left,rgba(34,211,238,0.08),transparent_50%)]"
        )}
        aria-hidden
      />

      {/* ── TOP: Full-width scaled live preview ── */}
      {liveUrl ? (
        <div className="relative w-full z-10 overflow-hidden rounded-[2rem] border-b border-white/[0.07]">
          <BrowserFrame
            url={liveUrl}
            title={title}
            previewHeight={isStarProject ? 300 : 240}
            className="rounded-none border-0"
          />
        </div>
      ) : (
        /* No-preview placeholder for repo-only projects */
        <div className="relative w-full h-36 flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-950 border-b border-white/5 z-10">
          <FolderGit2 size={40} className="text-white/10" />
        </div>
      )}

      {/* ── BOTTOM: Info section ── */}
      <div className="relative z-10 flex flex-col gap-4 p-6 sm:p-8">

        {/* Row 1: index + star badge */}
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono font-bold tracking-widest text-cyan-400 opacity-70">
            0{index + 1}
          </span>
          {isStarProject && (
            <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] font-extrabold tracking-wider uppercase bg-gradient-to-r from-cyan-400 to-violet-400 text-black shadow-[0_0_12px_rgba(34,211,238,0.5)]">
              <Sparkles size={8} />
              Star Project
            </span>
          )}
        </div>

        {/* Row 2: Title */}
        <h3
          className="text-xl sm:text-2xl font-bold text-white/95 group-hover:text-cyan-300 transition-colors cursor-pointer leading-snug"
          onClick={onOpen}
        >
          {title}
        </h3>

        {/* Row 3: Tech stack (always visible beneath preview) */}
        <div className="flex flex-wrap gap-1.5">
          {stack.map((t) => (
            <span
              key={t}
              className="rounded-lg border border-white/[0.07] bg-white/[0.05] px-2.5 py-1 text-[10px] font-bold text-white/55 tracking-wider uppercase hover:bg-white/10 hover:text-white transition-colors"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Row 4: Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-white/[0.06] gap-3">
          {/* Details & Highlights button */}
          <button
            type="button"
            onClick={onOpen}
            className="flex items-center gap-1 text-xs font-semibold text-white/50 hover:text-cyan-300 transition-colors"
          >
            <ChevronRight size={13} className="text-cyan-500" />
            Details &amp; Highlights
          </button>

          {/* Live + Repo buttons */}
          <div className="flex items-center gap-2">
            {repoUrl && (
              <a
                href={repoUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-white/10 bg-white/5 text-[10px] font-bold text-white/60 uppercase tracking-wider hover:bg-white/10 hover:text-white transition-all"
              >
                <FolderGit2 size={11} />
                Repo
              </a>
            )}
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noreferrer"
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all",
                  isStarProject
                    ? "bg-gradient-to-r from-cyan-400 to-violet-400 text-black hover:from-cyan-300 hover:to-violet-300 shadow-[0_0_12px_rgba(34,211,238,0.35)] hover:shadow-[0_0_18px_rgba(34,211,238,0.5)]"
                    : "bg-cyan-400 text-black hover:bg-cyan-300 shadow-[0_0_10px_rgba(34,211,238,0.2)] hover:shadow-[0_0_15px_rgba(34,211,238,0.4)]"
                )}
              >
                <ExternalLink size={11} />
                Live
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
