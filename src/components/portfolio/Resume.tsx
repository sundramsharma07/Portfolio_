"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Download } from "lucide-react";

import SectionHeading from "@/components/portfolio/SectionHeading";
import Reveal from "@/components/portfolio/Reveal";
import { RESUME_DOWNLOAD_URL, RESUME_PREVIEW_URL } from "@/data/portfolio";

export default function ResumeSection() {
  const [open, setOpen] = useState(false);

  return (
    <section
      id="resume"
      className="relative py-16 sm:py-20 scroll-mt-28"
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <Reveal>
          <SectionHeading kicker="Documents" title="Resume" />
        </Reveal>

        <motion.div
          className="mt-10 glass-strong rounded-[2.6rem] p-6 sm:p-8 relative overflow-hidden"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(1000px_circle_at_0%_0%,rgba(34,211,238,0.16),transparent_55%),radial-gradient(850px_circle_at_100%_20%,rgba(168,85,247,0.15),transparent_55%)]" />
          <div className="relative grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <div className="text-sm text-white/60">Preview + Download</div>
              <div className="mt-2 text-2xl font-semibold text-white/95">
                Premium resume ready for recruiter review
              </div>
              <div className="mt-3 text-sm text-white/65 leading-relaxed">
                Click download to open the preview modal and start the file download.
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    setOpen(true);
                    window.open(RESUME_DOWNLOAD_URL, "_blank", "noopener,noreferrer");
                  }}
                  className="rounded-2xl bg-gradient-to-r from-cyan-300 via-violet-300 to-blue-300 px-5 py-3 text-sm font-semibold text-black transition-all relative overflow-hidden"
                >
                  <span className="absolute inset-0 bg-[linear-gradient(120deg,transparent_0%,rgba(0,0,0,0.18)_40%,transparent_70%)] translate-x-[-120%] hover:translate-x-[120%] transition-transform duration-700" />
                  <span className="relative inline-flex items-center gap-2">
                    <Download size={16} />
                    Download Resume
                  </span>
                </motion.button>
              </div>

              <div className="mt-7 flex flex-wrap gap-2 text-xs text-white/55">
                {["One-page summary", "Projects included", "Skills highlighted"].map(
                  (x) => (
                    <span
                      key={x}
                      className="rounded-full border border-white/10 bg-black/20 px-3 py-1.5 font-semibold"
                    >
                      {x}
                    </span>
                  ),
                )}
              </div>
            </div>

            <div className="lg:col-span-5">
              <Reveal>
                <div className="rounded-[2.2rem] border border-white/10 bg-white/5 p-5 sm:p-6 relative overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(700px_circle_at_30%_0%,rgba(34,211,238,0.14),transparent_55%)]" />
                  <div className="relative">
                    <div className="text-xs font-semibold text-white/60">
                      Resume snapshot
                    </div>
                    <div className="mt-2 text-sm font-semibold text-white/90">
                      Built for quick scanning
                    </div>
                    <div className="mt-3 space-y-2">
                      {[
                        { k: "Skills", v: "Languages, Tools, Frameworks" },
                        { k: "Projects", v: "OCR, Security GUI, Learning Platform" },
                        { k: "Experience", v: "Training + Problem Solving" },
                      ].map((row) => (
                        <div
                          key={row.k}
                          className="rounded-2xl border border-white/10 bg-black/20 p-4"
                        >
                          <div className="text-xs text-white/55">{row.k}</div>
                          <div className="mt-1 text-sm text-white/75 font-semibold">
                            {row.v}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </motion.div>

        <AnimatePresence>
          {open ? (
            <motion.div
              className="fixed inset-0 z-[90] flex items-center justify-center px-4 py-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div
                className="absolute inset-0 bg-black/65 backdrop-blur-sm"
                onClick={() => setOpen(false)}
              />
              <motion.div
                role="dialog"
                aria-modal="true"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.2 }}
                className="relative w-full max-w-4xl glass-strong rounded-[2.4rem] overflow-hidden"
              >
                <div className="flex items-center justify-between gap-4 p-5 sm:p-6 border-b border-white/10 bg-black/20">
                  <div>
                    <div className="text-xs text-white/60">Resume Preview</div>
                    <div className="text-sm font-semibold text-white/90">
                      Google Drive (preview)
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="rounded-xl border border-white/10 bg-white/5 p-2 hover:bg-white/10 transition-colors"
                  >
                    Close
                  </button>
                </div>
                <div className="h-[70vh]">
                  <iframe
                    title="Resume PDF"
                    src={RESUME_PREVIEW_URL}
                    className="h-full w-full"
                  />
                </div>
                <div className="p-5 sm:p-6 border-t border-white/10 text-xs text-white/55 bg-black/20">
                  If the preview doesn’t render due to Drive restrictions, open the file directly from the download.
                </div>
              </motion.div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </section>
  );
}

