"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, X } from "lucide-react";

import { cn } from "@/lib/cn";

export type ProjectModalData = {
  title: string;
  description: string;
  stack: string[];
  highlights: string[];
  liveUrl?: string;
  repoUrl?: string;
  showLivePreview?: boolean;
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
  return (
    <AnimatePresence>
      {open && project ? (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center px-4 py-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="absolute inset-0 bg-black/65 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0, y: 22, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 22, scale: 0.98 }}
            transition={{ duration: 0.22 }}
            className={cn("relative w-full max-w-3xl glass-strong rounded-[2.2rem] overflow-hidden")}
          >
            <div className="absolute inset-0 bg-[radial-gradient(900px_circle_at_0%_0%,rgba(34,211,238,0.18),transparent_55%),radial-gradient(700px_circle_at_100%_20%,rgba(99,102,241,0.18),transparent_55%)]" />
            <div className="relative p-6 sm:p-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-xs text-white/60">Project</div>
                  <h3 className="mt-1 text-2xl font-semibold text-white/95">
                    {project.title}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-xl border border-white/10 bg-white/5 p-2 hover:bg-white/10 transition-colors"
                  aria-label="Close modal"
                >
                  <X size={18} className="text-white/85" />
                </button>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-white/70">
                {project.description}
              </p>

              {(project.liveUrl || project.repoUrl) ? (
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.liveUrl && project.showLivePreview !== false ? (
                    <motion.a
                      whileHover={{ y: -2 }}
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-2xl bg-gradient-to-r from-cyan-300 via-violet-300 to-blue-300 px-5 py-3 text-sm font-semibold text-black transition-transform hover:-translate-y-0.5 inline-flex items-center gap-2"
                    >
                      <ExternalLink size={16} />
                      Open Live
                    </motion.a>
                  ) : null}

                  {project.repoUrl ? (
                    <motion.a
                      whileHover={{ y: -2 }}
                      href={project.repoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white/90 transition-colors hover:bg-white/10 inline-flex items-center gap-2"
                    >
                      <ExternalLink size={16} />
                      GitHub Repo
                    </motion.a>
                  ) : null}
                </div>
              ) : null}

              {project.liveUrl && project.showLivePreview !== false ? (
                <div className="mt-5">
                  <div className="text-xs font-semibold text-white/60">
                    Live preview
                  </div>
                  <div className="mt-3 rounded-2xl border border-white/10 bg-black/20 overflow-hidden">
                    <iframe
                      title={`${project.title} Live Preview`}
                      src={project.liveUrl}
                      className="h-[260px] w-full"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
              ) : null}

              <div className="mt-6">
                <div className="text-xs font-semibold text-white/60">
                  Tech Stack
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.stack.map((t) => (
                    <motion.span
                      key={t}
                      whileHover={{ scale: 1.03 }}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white/80"
                    >
                      {t}
                    </motion.span>
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <div className="text-xs font-semibold text-white/60">
                  Highlights
                </div>
                <div className="mt-3 space-y-2">
                  {project.highlights.map((h, idx) => (
                    <motion.div
                      key={h}
                      initial={{ opacity: 0, x: -14 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.28, delay: idx * 0.05 }}
                      className="rounded-2xl border border-white/10 bg-white/5 p-4 hover:bg-white/7 transition-colors"
                    >
                      <div className="text-sm font-semibold text-white/90">
                        {h}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="mt-7 flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between">
                <div className="text-xs text-white/55">
                  Tip: Use the buttons above to open the live demo or GitHub repo.
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white/90 hover:bg-white/10 transition-colors"
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

