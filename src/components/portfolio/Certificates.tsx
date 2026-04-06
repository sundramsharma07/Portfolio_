"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { ExternalLink, Award, FileText, ChevronLeft, ChevronRight } from "lucide-react";

import { CERTIFICATES } from "@/data/portfolio";
import SectionHeading from "@/components/portfolio/SectionHeading";
import Reveal from "@/components/portfolio/Reveal";

export default function CertificatesSection() {
  const reducedMotion = useReducedMotion();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const certificatesPerView = 3;
  const totalSlides = Math.ceil(CERTIFICATES.length / certificatesPerView);

  useEffect(() => {
    if (!isAutoPlaying || reducedMotion) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalSlides);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, totalSlides, reducedMotion]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const startIndex = currentIndex * certificatesPerView;
  const visibleCertificates = CERTIFICATES.slice(startIndex, startIndex + certificatesPerView);

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

        <div className="mt-12 relative">
          {/* Slider Container */}
          <div className="relative overflow-hidden rounded-3xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                {visibleCertificates.map((c, idx) => (
                  <motion.div
                    key={`${c.title}-${startIndex + idx}`}
                    className="group relative rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm overflow-hidden"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    whileHover={!reducedMotion ? {
                      scale: 1.02,
                      boxShadow: "0 0 30px rgba(34,211,238,0.15)",
                    } : undefined}
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
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <motion.button
              onClick={prevSlide}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition-all hover:bg-white/10 hover:text-white hover:border-white/20"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Previous certificates"
            >
              <ChevronLeft size={18} />
            </motion.button>

            {/* Dots Indicator */}
            <div className="flex gap-2">
              {Array.from({ length: totalSlides }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => goToSlide(idx)}
                  className={`h-2 w-2 rounded-full transition-all ${
                    idx === currentIndex
                      ? "bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.5)]"
                      : "bg-white/30 hover:bg-white/50"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <motion.button
              onClick={nextSlide}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition-all hover:bg-white/10 hover:text-white hover:border-white/20"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Next certificates"
            >
              <ChevronRight size={18} />
            </motion.button>
          </div>

          {/* Auto-play Toggle */}
          <div className="flex justify-center mt-4">
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="text-xs text-white/50 hover:text-white/70 transition-colors"
            >
              {isAutoPlaying ? "Pause Auto-play" : "Resume Auto-play"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

