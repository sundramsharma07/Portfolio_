"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ExternalLink, Award, FileText } from "lucide-react";

import { CERTIFICATES } from "@/data/portfolio";
import SectionHeading from "@/components/portfolio/SectionHeading";
import Reveal from "@/components/portfolio/Reveal";

export default function CertificatesSection() {
  const reducedMotion = useReducedMotion();
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  return (
    <section
      id="certificates"
      className="relative py-16 sm:py-24 scroll-mt-28"
    >
      {/* Background Decorative Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-full bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5 blur-3xl opacity-50 pointer-events-none" />

      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 relative">
        <Reveal>
          <SectionHeading kicker="Credentials" title="Certifications" />
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CERTIFICATES.map((c, idx) => (
            <Reveal key={`${c.title}-${idx}`} delayMs={idx * 60}>
              <motion.div
                className="group relative rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm overflow-hidden"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.1 }}
                whileHover={isTouch || reducedMotion ? undefined : {
                  scale: 1.02,
                  boxShadow: "0 0 30px rgba(34,211,238,0.15)",
                }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
              >
                {/* Hover Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative flex flex-col h-full">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shadow-[0_0_15px_rgba(34,211,238,0.15)] ring-1 ring-white/5">
                      <Award size={24} />
                    </div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-white/30 bg-white/5 px-2.5 py-1 rounded-full border border-white/5">
                      Verified
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {c.title}
                  </h3>
                  <p className="mt-2 text-sm text-white/50 leading-relaxed line-clamp-2">
                    {c.subtitle}
                  </p>

                  <div className="mt-auto pt-8">
                    <a
                      href={c.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl bg-white/5 px-4 py-2.5 text-xs font-bold text-white transition-all hover:bg-cyan-500/20 hover:text-cyan-300 border border-white/10"
                    >
                      <FileText size={14} />
                      View Certificate
                      <ExternalLink size={12} className="opacity-40" />
                    </a>
                  </div>
                </div>

                {/* Corner Accent */}
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-white/5 to-transparent rounded-bl-3xl pointer-events-none" />
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

