"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const width = useSpring(scrollYProgress, { stiffness: 140, damping: 22 });

  return (
    <div className="fixed left-0 top-0 z-[60] h-1 w-full">
      <motion.div
        className="h-full bg-gradient-to-r from-cyan-300 via-violet-300 to-blue-300"
        style={{ width }}
      />
    </div>
  );
}

