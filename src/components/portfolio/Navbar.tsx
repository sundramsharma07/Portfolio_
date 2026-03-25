"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";

import { NAV_ITEMS } from "@/data/portfolio";
import { cn } from "@/lib/cn";

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0] ?? "home");

  useEffect(() => {
    const els = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (!els.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];
        if (visible?.target?.id) setActive(visible.target.id);
      },
      { threshold: [0.2, 0.35, 0.5, 0.65] },
    );

    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [ids]);

  return active;
}

export default function Navbar() {
  const ids = useMemo(() => NAV_ITEMS.map((n) => n.id), []);
  const active = useActiveSection(ids);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [sectionsOpen, setSectionsOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header
      className={cn(
        "fixed left-0 right-0 top-0 z-[55] px-4 sm:px-6 transition-all",
        scrolled ? "pt-2" : "pt-4",
      )}
    >
      <div
        className={cn(
          "mx-auto flex w-full max-w-6xl items-center justify-between rounded-2xl",
          scrolled ? "glass-strong py-2" : "glass py-3",
        )}
      >
        <button
          type="button"
          onClick={() => scrollToId("home")}
          className="group flex items-center gap-3 rounded-xl px-3 py-2 hover:bg-white/5 transition-colors"
          aria-label="Go to top"
        >
          <span className="relative grid h-9 w-9 place-items-center rounded-2xl bg-white/5 ring-1 ring-white/10">
            <span className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-400/30 via-violet-400/20 to-blue-400/10 blur-[1px]" />
            <span className="relative text-sm font-semibold tracking-wide text-cyan-200">
              SK
            </span>
          </span>
          {!scrolled ? (
            <div className="hidden sm:block text-left">
              <div className="text-sm font-semibold leading-4 text-white/90">
                Sundram Kumar
              </div>
              <div className="text-xs text-white/60">CSE Student</div>
            </div>
          ) : null}
        </button>

        <nav className="hidden lg:flex items-center gap-2">
          <motion.button
            type="button"
            onClick={() => scrollToId("projects")}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="relative overflow-hidden rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white/85 transition-all hover:ring-glow"
          >
            Projects
            {active === "projects" ? (
              <motion.span
                className="absolute inset-0 bg-[linear-gradient(120deg,transparent_0%,rgba(34,211,238,0.25)_40%,transparent_70%)]"
                initial={{ x: "-120%" }}
                animate={{ x: "120%" }}
                transition={{ duration: 1, ease: "easeInOut", repeat: Infinity }}
              />
            ) : null}
          </motion.button>

          <button
            type="button"
            onClick={() => scrollToId("resume")}
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white/85 transition-colors hover:bg-white/10"
          >
            Resume
          </button>

          <button
            type="button"
            onClick={() => scrollToId("contact")}
            className="rounded-xl bg-gradient-to-r from-cyan-300 via-violet-300 to-blue-300 px-4 py-2 text-sm font-semibold text-black transition-transform hover:-translate-y-0.5 hover:shadow-[0_0_40px_rgba(34,211,238,0.25)]"
          >
            Contact
          </button>

          <div className="relative">
            <button
              type="button"
              onClick={() => setSectionsOpen((v) => !v)}
              className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-semibold text-white/85 transition-colors hover:bg-white/10"
            >
              Sections
            </button>

            <AnimatePresence>
              {sectionsOpen ? (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.98 }}
                  transition={{ duration: 0.18 }}
                  className="absolute right-0 mt-2 w-64 rounded-3xl glass-strong p-3"
                >
                  <div className="text-xs font-semibold text-white/55 px-2">
                    Navigate
                  </div>
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    {NAV_ITEMS.filter(
                      (i) => !["home", "projects", "resume", "contact"].includes(i.id),
                    ).map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => {
                          setSectionsOpen(false);
                          scrollToId(item.id);
                        }}
                        className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-left text-sm font-semibold text-white/85 hover:bg-white/10 transition-colors"
                      >
                        <div className="text-white/85">{item.label}</div>
                        {active === item.id ? (
                          <div className="text-xs text-cyan-200 mt-1">
                            Active
                          </div>
                        ) : (
                          <div className="text-xs text-white/45 mt-1">
                            Explore
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </nav>

        <div className="lg:hidden flex items-center gap-2">
          <button
            type="button"
            onClick={() => scrollToId("contact")}
            className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-semibold hover:bg-white/8 transition-colors"
          >
            Contact
          </button>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="rounded-xl border border-white/10 bg-white/5 p-2 hover:bg-white/8 transition-colors"
            aria-label="Toggle menu"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22 }}
            className="mx-auto mt-3 w-full max-w-6xl"
          >
            <div className="glass-strong rounded-3xl p-4 sm:p-5">
              <div className="grid grid-cols-2 gap-2">
                {NAV_ITEMS.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setOpen(false);
                      scrollToId(item.id);
                    }}
                    className={cn(
                      "rounded-2xl border border-white/10 px-3 py-2 text-left text-sm transition-all hover:-translate-y-0.5 hover:bg-white/5",
                      active === item.id ? "ring-glow" : "",
                    )}
                  >
                    <div className="font-semibold text-white/90">{item.label}</div>
                    <div className="text-xs text-white/60">
                      {item.id === "home" ? "Start" : "Explore"}
                    </div>
                  </button>
                ))}
              </div>

              <div className="mt-4 flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    scrollToId("resume");
                  }}
                  className="flex-1 rounded-2xl bg-gradient-to-r from-cyan-300 via-violet-300 to-blue-300 px-4 py-3 text-sm font-semibold text-black transition-transform hover:-translate-y-0.5"
                >
                  Resume
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    scrollToId("contact");
                  }}
                  className="flex-1 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white/90 transition-transform hover:-translate-y-0.5 hover:bg-white/8"
                >
                  Contact
                </button>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}

