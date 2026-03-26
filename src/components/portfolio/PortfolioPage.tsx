"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import AnimatedBackground from "@/components/portfolio/AnimatedBackground";
import BackToTop from "@/components/portfolio/BackToTop";
import ScrollProgressBar from "@/components/portfolio/ScrollProgressBar";
import SideNav from "@/components/portfolio/SideNav";
import CustomCursor from "@/components/portfolio/CustomCursor";

import Hero from "@/components/portfolio/Hero";
import About from "@/components/portfolio/About";
import Skills from "@/components/portfolio/Skills";
import Projects from "@/components/portfolio/Projects";
import Training from "@/components/portfolio/Training";
import Certificates from "@/components/portfolio/Certificates";
import Achievements from "@/components/portfolio/Achievements";
import Education from "@/components/portfolio/Education";
import Resume from "@/components/portfolio/Resume";
import Contact from "@/components/portfolio/Contact";
import Footer from "@/components/portfolio/Footer";

function Separator({ idx }: { idx: number }) {
  return (
    <motion.div
      className="mx-auto w-full max-w-6xl px-4 sm:px-6"
      initial={false}
      animate={{}}
    >
      <div className="relative my-10 h-[1px] w-full overflow-hidden bg-white/0">
        <div className="absolute inset-0 h-full w-full bg-[linear-gradient(90deg,transparent_0%,rgba(34,211,238,0.45)_35%,rgba(168,85,247,0.30)_60%,transparent_100%)] blur-[0.2px]" />
        <motion.div
          className="absolute inset-0 h-full w-full bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.35)_45%,transparent_80%)]"
          initial={{ x: "-100%" }}
          whileInView={{ x: "100%" }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ duration: 1.5, ease: "circOut", delay: idx * 0.05 }}
        />
      </div>
    </motion.div>
  );
}

export default function PortfolioPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = window.setTimeout(() => setLoading(false), 1100);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <div className="relative min-h-svh w-full overflow-x-hidden">
      <CustomCursor />
      <AnimatedBackground />
      <ScrollProgressBar />
      <SideNav />

      <AnimatePresence>
        {loading ? (
          <motion.div
            key="loading"
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
          >
            <motion.div
              className="relative h-20 w-20 rounded-[2rem] glass-strong ring-glow"
              initial={{ scale: 0.92, rotate: -2, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <motion.div
                className="absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.35),transparent_62%)]"
              />
              <motion.div
                className="relative grid h-full w-full place-items-center text-cyan-200 font-semibold"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
              >
                SK
              </motion.div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <motion.main
        className="relative"
        initial="hidden"
        animate={loading ? "hidden" : "visible"}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.12,
              delayChildren: 0.1,
            },
          },
        }}
      >
        <Hero />
        <Separator idx={0} />
        <About />
        <Separator idx={1} />
        <Skills />
        <Separator idx={2} />
        <Projects />
        <Separator idx={3} />
        <Training />
        <Separator idx={4} />
        <Certificates />
        <Separator idx={5} />
        <Achievements />
        <Separator idx={6} />
        <Education />
        <Separator idx={7} />
        <Resume />
        <Separator idx={8} />
        <Contact />
        <Footer />
      </motion.main>

      <BackToTop />
    </div>
  );
}

