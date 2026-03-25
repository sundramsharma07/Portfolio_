"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Mail, Phone, Send } from "lucide-react";

import { SOCIAL_LINKS } from "@/data/portfolio";
import Reveal from "@/components/portfolio/Reveal";
import SectionHeading from "@/components/portfolio/SectionHeading";

export default function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("Portfolio Inquiry");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const emailAddress = "sundaramsharma9934@gmail.com";
  const phone = "+91-7857068766";

  const canSend = useMemo(() => {
    const looksEmail = email.includes("@") && email.includes(".");
    return name.trim().length >= 2 && looksEmail && message.trim().length >= 8;
  }, [email, message, name]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSend || sending) return;

    setSending(true);
    setSent(false);

    // Simulated send for recruiter-friendly UX.
    await new Promise((r) => setTimeout(r, 600));

    const body = `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}\n`;
    const href = `mailto:${encodeURIComponent(emailAddress)}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = href;
    setSent(true);
    setSending(false);
  };

  return (
    <section
      id="contact"
      className="relative py-16 sm:py-20 scroll-mt-28"
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <Reveal>
          <SectionHeading kicker="Let’s connect" title="Contact" />
        </Reveal>

        <div className="mt-10 grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal delayMs={120}>
              <div className="glass-strong rounded-[2.4rem] p-6 sm:p-7 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(900px_circle_at_15%_0%,rgba(34,211,238,0.14),transparent_55%),radial-gradient(700px_circle_at_90%_20%,rgba(99,102,241,0.14),transparent_55%)]" />
                <div className="relative">
                  <div className="text-sm font-semibold text-white/90">
                    Reach out directly
                  </div>
                  <div className="mt-1 text-sm text-white/60 leading-relaxed">
                    Fastest response: email. I’m open to internships,
                    freelancing, and full-time roles.
                  </div>

                  <div className="mt-6 space-y-3">
                    <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
                      <div className="grid h-10 w-10 place-items-center rounded-2xl bg-white/5 border border-white/10">
                        <Mail size={18} className="text-cyan-200" />
                      </div>
                      <div>
                        <div className="text-xs text-white/55">Email</div>
                        <div className="text-sm font-semibold text-white/90">
                          {emailAddress}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
                      <div className="grid h-10 w-10 place-items-center rounded-2xl bg-white/5 border border-white/10">
                        <Phone size={18} className="text-violet-200" />
                      </div>
                      <div>
                        <div className="text-xs text-white/55">Phone</div>
                        <div className="text-sm font-semibold text-white/90">
                          {phone}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <div className="text-xs text-white/55">Social</div>
                    <div className="mt-3 flex items-center gap-3">
                      <motion.a
                        whileHover={{ y: -2 }}
                        href={SOCIAL_LINKS.github}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-2xl border border-white/10 bg-white/5 p-3 hover:bg-white/10 transition-colors"
                        aria-label="GitHub"
                      >
                        <ExternalLink size={18} className="text-white/85" />
                      </motion.a>
                      <motion.a
                        whileHover={{ y: -2 }}
                        href={SOCIAL_LINKS.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-2xl border border-white/10 bg-white/5 p-3 hover:bg-white/10 transition-colors"
                        aria-label="LinkedIn"
                      >
                        <ExternalLink size={18} className="text-white/85" />
                      </motion.a>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal delayMs={170}>
              <motion.div
                className="glass-strong rounded-[2.4rem] p-6 sm:p-7 relative overflow-hidden"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.65 }}
              >
                <div className="absolute inset-0 bg-[radial-gradient(700px_circle_at_25%_0%,rgba(34,211,238,0.12),transparent_55%),radial-gradient(650px_circle_at_100%_25%,rgba(168,85,247,0.12),transparent_55%)]" />

                <form className="relative" onSubmit={submit}>
                  <div className="text-sm font-semibold text-white/90">
                    Send a message
                  </div>
                  <div className="mt-1 text-sm text-white/60 leading-relaxed">
                    I’ll get back to you with next steps.
                  </div>

                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    <motion.div
                      whileHover={{ scale: 1.005 }}
                      className="rounded-2xl border border-white/10 bg-white/5 p-3"
                    >
                      <label className="block text-xs text-white/55">
                        Your name
                      </label>
                      <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="mt-1 w-full bg-transparent outline-none text-sm text-white/90 placeholder:text-white/35"
                        placeholder="Sundram..."
                        autoComplete="name"
                      />
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.005 }}
                      className="rounded-2xl border border-white/10 bg-white/5 p-3"
                    >
                      <label className="block text-xs text-white/55">
                        Email
                      </label>
                      <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-1 w-full bg-transparent outline-none text-sm text-white/90 placeholder:text-white/35"
                        placeholder="you@example.com"
                        autoComplete="email"
                        inputMode="email"
                      />
                    </motion.div>
                  </div>

                  <div className="mt-4">
                    <motion.div
                      whileHover={{ scale: 1.005 }}
                      className="rounded-2xl border border-white/10 bg-white/5 p-3"
                    >
                      <label className="block text-xs text-white/55">
                        Subject
                      </label>
                      <input
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="mt-1 w-full bg-transparent outline-none text-sm text-white/90 placeholder:text-white/35"
                        placeholder="Internship / Job"
                      />
                    </motion.div>
                  </div>

                  <div className="mt-4">
                    <motion.div
                      whileHover={{ scale: 1.005 }}
                      className="rounded-2xl border border-white/10 bg-white/5 p-3"
                    >
                      <label className="block text-xs text-white/55">
                        Message
                      </label>
                      <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="mt-1 h-28 w-full resize-none bg-transparent outline-none text-sm text-white/90 placeholder:text-white/35"
                        placeholder="Tell me what you’re looking for..."
                      />
                    </motion.div>
                  </div>

                  <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
                    <div className="text-xs text-white/55">
                      By sending, you agree to be contacted about your request.
                    </div>

                    <motion.button
                      type="submit"
                      disabled={!canSend || sending}
                      whileHover={
                        canSend && !sending
                          ? { y: -2, boxShadow: "0 0 40px rgba(34,211,238,0.18)" }
                          : undefined
                      }
                      whileTap={{ scale: 0.99 }}
                      className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-cyan-300 via-violet-300 to-blue-300 px-6 py-3 text-sm font-semibold text-black disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                      <span className="absolute inset-0 bg-[linear-gradient(120deg,transparent_0%,rgba(0,0,0,0.20)_45%,transparent_75%)] translate-x-[-120%] hover:translate-x-[120%] transition-transform duration-700" />
                      <span className="relative inline-flex items-center gap-2">
                        {sending ? (
                          <span>Sending...</span>
                        ) : sent ? (
                          <span>Opening email...</span>
                        ) : (
                          <>
                            <Send size={16} />
                            Send Message
                          </>
                        )}
                      </span>
                    </motion.button>
                  </div>
                </form>
              </motion.div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

