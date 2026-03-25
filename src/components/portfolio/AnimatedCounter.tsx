"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useInView } from "framer-motion";

export default function AnimatedCounter({
  value,
  suffix = "+",
  durationMs = 1100,
  formatter,
}: {
  value: number;
  suffix?: string;
  durationMs?: number;
  formatter?: (v: number) => string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const [current, setCurrent] = useState(0);

  const format = useMemo(() => formatter ?? ((v: number) => String(v)), [formatter]);

  useEffect(() => {
    if (!inView) return;

    const start = performance.now();
    const from = 0;
    const to = value;

    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / durationMs);
      // Ease-out curve
      const eased = 1 - Math.pow(1 - p, 3);
      const next = from + (to - from) * eased;
      setCurrent(next);
      if (p < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [durationMs, inView, value]);

  return (
    <div ref={ref} className="text-3xl sm:text-4xl font-semibold text-white/95">
      {format(Math.round(current))}
      <span className="text-cyan-200/90 ml-1">{suffix}</span>
    </div>
  );
}

