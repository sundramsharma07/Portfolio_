"use client";

import { motion } from "framer-motion";

import { CERTIFICATES } from "@/data/portfolio";
import SectionHeading from "@/components/portfolio/SectionHeading";
import Reveal from "@/components/portfolio/Reveal";

export default function CertificatesSection() {
  return (
    <section
      id="certificates"
      className="relative py-16 sm:py-20 scroll-mt-28"
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <Reveal>
          <SectionHeading kicker="Proof" title="Certificates" />
        </Reveal>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CERTIFICATES.map((c, idx) => (
            <Reveal key={`${c.title}-${idx}`} delayMs={idx * 90}>
              <motion.div
                className="group rounded-xl border border-white/10 bg-white/5 p-5 transition-all hover:shadow-lg hover:shadow-cyan-500/20"
                initial={{
                  opacity: 0,
                  y: 26,
                  x: idx % 2 === 0 ? -22 : 22,
                  rotate: idx % 2 === 0 ? -1.5 : 1.5,
                }}
                whileInView={{ opacity: 1, y: 0, x: 0, rotate: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{
                  type: "spring",
                  stiffness: 120,
                  damping: 14,
                  delay: idx * 0.06,
                }}
                whileHover={{
                  scale: 1.08,
                  y: -8,
                  rotateY: 2,
                  boxShadow: "0 25px 50px rgba(34,211,238,0.3), 0 0 0 1px rgba(34,211,238,0.2)",
                }}
              >
                <div className="text-xs font-medium text-white/70">Certificate</div>
                <div className="mt-2 text-lg font-semibold text-white/95">{c.title}</div>
                <div className="mt-1 text-sm text-white/70 line-clamp-2">{c.subtitle}</div>

                <motion.a
                  href={c.url}
                  target="_blank"
                  rel="noreferrer"
                  initial={{ opacity: 0, y: 6 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -3, scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="mt-5 block opacity-0 text-center text-sm font-semibold text-cyan-100 transition-all duration-300 group-hover:opacity-100"
                >
                  Open Certificate
                </motion.a>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

