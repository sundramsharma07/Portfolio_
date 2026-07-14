"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { ExternalLink, Award, FileText, ChevronLeft, ChevronRight, X, ZoomIn, CheckCircle2 } from "lucide-react";

import { CERTIFICATES, type Certificate } from "@/data/portfolio";
import SectionHeading from "@/components/portfolio/SectionHeading";
import Reveal from "@/components/portfolio/Reveal";
import TiltCard from "@/components/portfolio/TiltCard";

// Extract Google Drive ID from sharing URL
function getDriveId(url: string): string | null {
  if (url.includes("drive.google.com")) {
    const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
    return match ? match[1] : null;
  }
  return null;
}

// Custom CSS Certificate Preview for fallback/NPTEL/Coursera
function CustomCertificateMock({ cert, isLarge = false }: { cert: Certificate; isLarge?: boolean }) {
  const isCoursera = cert.url.includes("coursera.org");
  const isNptel = cert.url.includes("nptel");
  
  const org = isCoursera ? "Coursera Partner" : isNptel ? "NPTEL Academic" : "Lovely Professional University";
  const themeClass = isCoursera 
    ? "from-blue-950 via-slate-900 to-indigo-950 border-blue-500/30" 
    : isNptel 
    ? "from-emerald-950 via-slate-900 to-teal-950 border-emerald-500/30"
    : "from-purple-950 via-slate-900 to-pink-950 border-purple-500/30";

  const glowClass = isCoursera 
    ? "bg-blue-500/10 shadow-[0_0_30px_rgba(59,130,246,0.15)]" 
    : isNptel 
    ? "bg-emerald-500/10 shadow-[0_0_30px_rgba(16,185,129,0.15)]"
    : "bg-purple-500/10 shadow-[0_0_30px_rgba(168,85,247,0.15)]";

  return (
    <div 
      className={`relative w-full h-full bg-gradient-to-br ${themeClass} border rounded-2xl flex flex-col p-6 items-center justify-between text-center overflow-hidden select-none`}
    >
      {/* Decorative Guilloche Border Pattern */}
      <div className="absolute inset-2 border border-white/5 rounded-xl pointer-events-none" />
      <div className="absolute inset-3 border border-dashed border-white/5 rounded-lg pointer-events-none" />
      <div className={`absolute -top-12 -left-12 w-28 h-28 rounded-full blur-2xl opacity-40 ${isCoursera ? "bg-blue-500" : "bg-cyan-500"}`} />
      <div className={`absolute -bottom-12 -right-12 w-28 h-28 rounded-full blur-2xl opacity-40 ${isNptel ? "bg-emerald-500" : "bg-purple-500"}`} />

      {/* Header */}
      <div className="relative space-y-1">
        <span className="text-[9px] font-mono tracking-widest text-cyan-400 font-extrabold uppercase">
          Verified Credential
        </span>
        <div className="text-white/40 text-[10px] font-semibold">{org}</div>
      </div>

      {/* Body */}
      <div className="relative space-y-3 my-4">
        <div className={`mx-auto w-12 h-12 rounded-full flex items-center justify-center ${glowClass}`}>
          <Award className="text-cyan-300" size={24} />
        </div>
        <div className="space-y-1.5 px-2">
          <div className="text-xs text-white/50">This certifies that</div>
          <h4 className="text-sm font-bold font-serif tracking-wide text-white">Sundram Sharma</h4>
          <div className="text-[10px] text-white/40">has successfully completed all requirements for</div>
          <h3 className={`font-bold leading-tight ${isLarge ? "text-xl sm:text-2xl text-cyan-200" : "text-xs sm:text-sm text-cyan-200"}`}>
            {cert.title}
          </h3>
        </div>
      </div>

      {/* Footer */}
      <div className="relative w-full flex items-center justify-between text-[9px] text-white/40 border-t border-white/5 pt-3">
        <div className="text-left font-mono">
          <div>ID: SKU-{cert.title.substring(0, 3).toUpperCase()}</div>
          <div>DATE: 2024-2026</div>
        </div>
        <div className="flex items-center gap-1 text-cyan-400 font-semibold uppercase tracking-wider">
          <CheckCircle2 size={10} />
          <span>Secured</span>
        </div>
      </div>
    </div>
  );
}

// Renders the preview image/mockup for a certificate
function CertificateImagePreview({ cert, onClick }: { cert: Certificate; onClick: () => void }) {
  const driveId = getDriveId(cert.url);
  const [imageError, setImageError] = useState(false);

  return (
    <div 
      className="relative w-full h-[180px] sm:h-[200px] overflow-hidden rounded-2xl border border-white/10 bg-slate-900 cursor-pointer group/image"
      onClick={onClick}
    >
      {driveId && !imageError ? (
        <>
          {/* IFrame or high-res thumbnail preview */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://drive.google.com/thumbnail?id=${driveId}&sz=w800`}
            alt={cert.title}
            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover/image:scale-105"
            onError={() => setImageError(true)}
            loading="lazy"
          />
          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/image:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
            <span className="bg-black/80 backdrop-blur border border-white/10 text-white text-[11px] font-semibold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5">
              <ZoomIn size={12} className="text-cyan-400" />
              Zoom Certificate
            </span>
          </div>
        </>
      ) : (
        <div className="w-full h-full transition-transform duration-500 group-hover/image:scale-[1.015]">
          <CustomCertificateMock cert={cert} />
          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-black/25 opacity-0 group-hover/image:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <span className="bg-black/85 backdrop-blur border border-white/10 text-white text-[11px] font-semibold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5">
              <ZoomIn size={12} className="text-cyan-400" />
              Zoom Details
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default function CertificatesSection() {
  const reducedMotion = useReducedMotion();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  const certificatesPerView = 3;
  const totalSlides = Math.ceil(CERTIFICATES.length / certificatesPerView);

  useEffect(() => {
    if (!isAutoPlaying || reducedMotion || selectedCert) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalSlides);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, totalSlides, reducedMotion, selectedCert]);

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
                  <div key={`${c.title}-${startIndex + idx}`}>
                    <TiltCard className="h-full">
                      <motion.div
                        className="group relative rounded-3xl border border-white/10 bg-slate-950/40 p-5 backdrop-blur-sm overflow-hidden flex flex-col h-full gap-4 transition-all duration-300"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: idx * 0.1 }}
                      >
                        {/* Image preview area */}
                        <CertificateImagePreview 
                          cert={c} 
                          onClick={() => setSelectedCert(c)} 
                        />

                        {/* Title and metadata */}
                        <div className="relative flex flex-col flex-grow select-none">
                          <h3 
                            className="text-md font-bold text-white group-hover:text-cyan-300 transition-colors cursor-pointer"
                            onClick={() => setSelectedCert(c)}
                          >
                            {c.title}
                          </h3>
                          <p className="mt-1 text-xs text-white/50 leading-relaxed line-clamp-2">
                            {c.subtitle}
                          </p>

                          <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between gap-4">
                            <button
                              onClick={() => setSelectedCert(c)}
                              className="text-[11px] text-cyan-300 hover:text-cyan-200 transition-colors flex items-center gap-1 font-semibold"
                            >
                              Expand View
                            </button>
                            <a
                              href={c.url}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1 text-[11px] font-semibold text-white/50 hover:text-white transition-colors"
                            >
                              Verify link <ExternalLink size={10} />
                            </a>
                          </div>
                        </div>

                        {/* Corner Accent */}
                        <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-white/5 to-transparent rounded-bl-3xl pointer-events-none" />
                      </motion.div>
                    </TiltCard>
                  </div>
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

      {/* Full Screen Lightbox Modal */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop Click */}
            <div 
              className="absolute inset-0 cursor-zoom-out"
              onClick={() => setSelectedCert(null)}
            />

            {/* Close button */}
            <button
              onClick={() => setSelectedCert(null)}
              className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/60 text-white/80 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close credentials preview"
            >
              <X size={20} />
            </button>

            {/* Modal Content Card */}
            <motion.div
              className="relative max-w-4xl w-full max-h-[85vh] flex flex-col items-center justify-center z-10 bg-slate-950/40 rounded-[2rem] border border-white/15 overflow-hidden shadow-2xl p-3 sm:p-5"
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 280 }}
            >
              <div className="relative w-full flex-grow flex items-center justify-center min-h-[300px] max-h-[65vh]">
                {getDriveId(selectedCert.url) ? (
                  <div className="relative w-full h-full max-h-[60vh] aspect-[4/3] rounded-xl overflow-hidden border border-white/10">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`https://drive.google.com/thumbnail?id=${getDriveId(selectedCert.url)}&sz=w1200`}
                      alt={selectedCert.title}
                      className="w-full h-full object-contain bg-slate-900"
                    />
                  </div>
                ) : (
                  <div className="w-full h-full max-w-2xl aspect-[4/3] rounded-xl border border-white/10 overflow-hidden">
                    <CustomCertificateMock cert={selectedCert} isLarge={true} />
                  </div>
                )}
              </div>

              {/* Lightbox Footer Info */}
              <div className="w-full text-center mt-4 sm:mt-5 px-4 space-y-3 pb-2 select-none">
                <h3 className="text-lg sm:text-xl font-bold text-white">
                  {selectedCert.title}
                </h3>
                <p className="text-xs text-white/60">
                  {selectedCert.subtitle}
                </p>
                <div className="flex items-center justify-center gap-3 pt-2">
                  <a
                    href={selectedCert.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-cyan-400 px-5 py-2.5 text-xs font-bold text-black hover:bg-cyan-300 transition-colors shadow-[0_0_15px_rgba(34,211,238,0.2)]"
                  >
                    <FileText size={14} />
                    Verify Credential Link
                    <ExternalLink size={12} />
                  </a>
                  <button
                    onClick={() => setSelectedCert(null)}
                    className="inline-flex items-center gap-2 rounded-xl bg-white/5 border border-white/10 px-5 py-2.5 text-xs font-bold text-white hover:bg-white/10 transition-colors"
                  >
                    Close Preview
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

