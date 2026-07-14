"use client";

import { useLayoutEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, FolderGit2, X, CheckCircle2 } from "lucide-react";
import BrowserFrame from "@/components/portfolio/BrowserFrame";
import { cn } from "@/lib/cn";

export type ProjectModalData = {
  title: string;
  description: string;
  stack: string[];
  highlights: string[];
  liveUrl?: string;
  repoUrl?: string;
  isStarProject?: boolean;
};

export default function ProjectModal({
  open,
  onClose,
  project,
}: {
  open: boolean;
  onClose: () => void;
  project: ProjectModalData | null;
}) {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (open && scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [open, project]);

  return (
    <AnimatePresence>
      {open && project ? (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center px-2 py-2 sm:px-4 sm:py-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0, scale: 0.98, y: 80 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 80 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            onClick={(event) => event.stopPropagation()}
            className={cn(
              "relative w-full max-w-[96vw] glass-strong rounded-[1.5rem] sm:rounded-[2.2rem] overflow-hidden",
              "max-h-[92svh] sm:max-h-[90vh] flex flex-col"
            )}
          >
            {/* Gradient glow inside modal */}
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(900px_circle_at_0%_0%,rgba(34,211,238,0.15),transparent_55%),radial-gradient(700px_circle_at_100%_20%,rgba(99,102,241,0.15),transparent_55%)]" />

            {/* Scrollable content */}
            <div
              ref={scrollRef}
              className="relative overflow-y-auto flex-1 px-5 py-5 sm:px-8 sm:py-8 scroll-smooth overscroll-contain"
            >

              {/* Header */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-[10px] font-mono tracking-widest text-cyan-400/70 uppercase">
                    {project.isStarProject ? "⭐ Star Project" : "Project"}
                  </div>
                  <h3 className="mt-1 text-2xl font-bold text-white/95 leading-snug">
                    {project.title}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="shrink-0 rounded-xl border border-white/10 bg-white/5 p-2 hover:bg-white/10 transition-colors"
                  aria-label="Close modal"
                >
                  <X size={18} className="text-white/85" />
                </button>
              </div>

              {/* Description */}
              <p className="mt-4 text-sm leading-relaxed text-white/65">
                {project.description}
              </p>

              {/* Action Buttons */}
              {(project.liveUrl || project.repoUrl) && (
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.liveUrl && (
                    <motion.a
                      whileHover={{ scale: 1.03 }}
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-2xl bg-gradient-to-r from-cyan-300 via-violet-300 to-blue-300 px-5 py-2.5 text-sm font-bold text-black inline-flex items-center gap-2 shadow-[0_0_15px_rgba(34,211,238,0.3)]"
                    >
                      <ExternalLink size={15} />
                      Open Live Site
                    </motion.a>
                  )}
                  {project.repoUrl && (
                    <motion.a
                      whileHover={{ scale: 1.03 }}
                      href={project.repoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-2xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white/80 hover:bg-white/10 transition-colors inline-flex items-center gap-2"
                    >
                      <FolderGit2 size={15} />
                      GitHub Repo
                    </motion.a>
                  )}
                </div>
              )}

              {/* Scaled live preview */}
              {project.liveUrl && (
                <div className="mt-6">
                  <div className="text-[10px] font-mono font-bold tracking-widest text-white/40 uppercase mb-2">
                    Live Preview
                  </div>
                  <BrowserFrame
                    url={project.liveUrl}
                    title={project.title}
                    previewHeight={220}
                    className="ring-1 ring-white/10"
                  />
                </div>
              )}

              {/* Tech Stack */}
              <div className="mt-6">
                <div className="text-[10px] font-mono font-bold tracking-widest text-white/40 uppercase mb-3">
                  Tech Stack
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((t) => (
                    <motion.span
                      key={t}
                      whileHover={{ scale: 1.05 }}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white/75 hover:text-white hover:bg-white/10 transition-colors"
                    >
                      {t}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* Highlights */}
              {project.highlights && project.highlights.length > 0 && (
                <div className="mt-6">
                  <div className="text-[10px] font-mono font-bold tracking-widest text-white/40 uppercase mb-3">
                    Highlights
                  </div>
                  <div className="space-y-2.5">
                    {project.highlights.map((h, idx) => (
                      <motion.div
                        key={h}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2, delay: idx * 0.05 }}
                        className="flex items-start gap-3 rounded-xl border border-white/[0.07] bg-white/[0.04] px-4 py-3 hover:bg-white/[0.07] transition-colors"
                      >
                        <CheckCircle2
                          size={14}
                          className="text-cyan-400 shrink-0 mt-0.5"
                        />
                        <span className="text-sm text-white/80 leading-relaxed">{h}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Footer */}
              <div className="mt-8 flex justify-end">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-2xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white/80 hover:bg-white/10 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
