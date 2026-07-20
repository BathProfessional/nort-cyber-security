"use client";

import { useRef, useState, FormEvent } from "react";
import { motion, useInView } from "framer-motion";

const CONTACT_EMAIL = "nortcybersecurity@gmail.com";

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [status, setStatus] = useState<"idle" | "charging" | "sent" | "error">("idle");
  const [focused, setFocused] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("charging");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = new FormData(form);

    // Route submissions to nortcybersecurity@gmail.com via FormSubmit
    data.append("_subject", "Nort Cyber Security — New Secure Uplink");
    data.append("_template", "table");
    data.append("_captcha", "false");
    data.append("_replyto", String(data.get("email") || ""));

    try {
      const res = await fetch(
        `https://formsubmit.co/ajax/${CONTACT_EMAIL}`,
        {
          method: "POST",
          body: data,
          headers: { Accept: "application/json" },
        }
      );

      const json = (await res.json().catch(() => ({}))) as {
        success?: string | boolean;
        message?: string;
      };

      if (!res.ok || json.success === false || json.success === "false") {
        throw new Error(json.message || "Transmission failed");
      }

      // Brief charge animation, then success
      await new Promise((r) => setTimeout(r, 600));
      setStatus("sent");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        err instanceof Error
          ? err.message
          : "Uplink failed. Try again or call (888) 828-3691."
      );
    }
  };

  return (
    <section id="uplink" className="relative z-10 py-24 md:py-32 px-4" ref={ref}>
      {/* Anchor for command nav link */}
      <div id="command" className="absolute -top-20" />

      <div className="max-w-3xl mx-auto">
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="font-mono text-[10px] md:text-xs tracking-[0.4em] text-cyan-neon/60 uppercase mb-3">
            // Secure Uplink
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-neon tracking-wide">
            Establish Contact
          </h2>
          <p className="mt-4 font-body text-cyan-soft/60 text-sm md:text-base">
            Transmit credentials through encrypted channels. Our command team
            responds within one grid cycle.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <a
              href="tel:+18888283691"
              className="inline-flex items-center gap-3 px-5 py-3 rounded-xl glass-panel border border-cyan-neon/40 hover:border-cyan-neon/70 hover:shadow-neon-sm transition-all duration-300 group w-full sm:w-auto"
              data-cursor="hover"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-cyan-neon/30 bg-cyan-neon/10 text-cyan-neon shadow-[0_0_12px_rgba(0,240,255,0.35)] group-hover:shadow-[0_0_18px_rgba(0,240,255,0.55)] transition-shadow">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path
                    d="M6.5 4.5h3l1.5 4-2 1.5a12 12 0 0 0 5.5 5.5l1.5-2 4 1.5v3a2 2 0 0 1-2 2A14.5 14.5 0 0 1 4.5 6.5a2 2 0 0 1 2-2Z"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span className="text-left">
                <span className="block font-mono text-[10px] tracking-[0.3em] text-cyan-neon/50 uppercase">
                  Direct Line
                </span>
                <span className="block font-display text-lg md:text-xl font-bold tracking-wider text-neon">
                  (888) 828-3691
                </span>
              </span>
            </a>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="inline-flex items-center gap-3 px-5 py-3 rounded-xl glass-panel border border-cyan-neon/40 hover:border-cyan-neon/70 hover:shadow-neon-sm transition-all duration-300 group w-full sm:w-auto"
              data-cursor="hover"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-cyan-neon/30 bg-cyan-neon/10 text-cyan-neon shadow-[0_0_12px_rgba(0,240,255,0.35)] group-hover:shadow-[0_0_18px_rgba(0,240,255,0.55)] transition-shadow">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path
                    d="M4 6.5h16v11H4v-11Z"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M4 7l8 6 8-6"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span className="text-left min-w-0">
                <span className="block font-mono text-[10px] tracking-[0.3em] text-cyan-neon/50 uppercase">
                  Secure Email
                </span>
                <span className="block font-display text-sm md:text-base font-bold tracking-wide text-neon break-all">
                  {CONTACT_EMAIL}
                </span>
              </span>
            </a>
          </div>
          <div className="mt-4 mx-auto w-24 h-px bg-gradient-to-r from-transparent via-cyan-neon to-transparent" />
        </motion.div>

        <motion.div
          className="glass-panel-intense relative rounded-2xl p-6 md:p-10 overflow-hidden"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          <span className="circuit-corner tl" />
          <span className="circuit-corner tr" />
          <span className="circuit-corner bl" />
          <span className="circuit-corner br" />

          {/* Circuit motif decorations */}
          <svg
            className="absolute top-0 right-0 w-40 h-40 opacity-20 pointer-events-none"
            viewBox="0 0 100 100"
          >
            <path
              d="M100 20 H70 V40 H50 V0"
              fill="none"
              stroke="#00F0FF"
              strokeWidth="0.5"
            />
            <circle cx="50" cy="0" r="1.5" fill="#00F0FF" />
            <circle cx="70" cy="40" r="1.5" fill="#0088FF" />
          </svg>
          <svg
            className="absolute bottom-0 left-0 w-32 h-32 opacity-20 pointer-events-none"
            viewBox="0 0 100 100"
          >
            <path
              d="M0 80 H30 V60 H50 V100"
              fill="none"
              stroke="#00F0FF"
              strokeWidth="0.5"
            />
            <circle cx="30" cy="60" r="1.5" fill="#00F0FF" />
          </svg>

          {/* Terminal header */}
          <div className="flex items-center gap-2 mb-8 font-mono text-[10px] tracking-widest text-cyan-neon/50 uppercase">
            <span className="text-cyan-neon">▶</span>
            <span>ENCRYPTED_CHANNEL_v4.2</span>
            <span className="ml-auto flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-neon animate-pulse" />
              TLS 1.3 // PQ-HYBRID
            </span>
          </div>

          {status === "sent" ? (
            <motion.div
              className="py-16 text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <div className="mx-auto mb-6 w-16 h-16 rounded-full border border-cyan-neon flex items-center justify-center shadow-neon-md">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <motion.path
                    d="M6 14 L12 20 L22 8"
                    stroke="#00F0FF"
                    strokeWidth="2"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.6 }}
                  />
                </svg>
              </div>
              <h3 className="font-display text-xl text-neon mb-2">
                Uplink Confirmed
              </h3>
              <p className="font-mono text-xs text-cyan-neon/60 tracking-wider">
                TRANSMISSION SECURED · SENT TO {CONTACT_EMAIL.toUpperCase()}
              </p>
              <button
                type="button"
                onClick={() => setStatus("idle")}
                className="mt-8 font-mono text-[10px] tracking-widest text-cyan-neon/50 hover:text-cyan-neon uppercase transition-colors"
                data-cursor="hover"
              >
                Send Another Transmission
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field
                  id="name"
                  label="Operative ID"
                  placeholder="YOUR.NAME"
                  focused={focused}
                  setFocused={setFocused}
                />
                <Field
                  id="email"
                  label="Secure Channel"
                  type="email"
                  placeholder="you@organization.grid"
                  focused={focused}
                  setFocused={setFocused}
                />
              </div>
              <Field
                id="org"
                label="Organization"
                placeholder="ENTERPRISE // GOVERNMENT // RESEARCH"
                focused={focused}
                setFocused={setFocused}
              />
              <div className="relative">
                <label
                  htmlFor="message"
                  className="block font-mono text-[10px] tracking-widest text-cyan-neon/50 uppercase mb-2"
                >
                  Message Payload
                  {focused === "message" && (
                    <span className="ml-2 text-cyan-neon animate-pulse">
                      [ENCRYPTING…]
                    </span>
                  )}
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  placeholder="// Describe your threat surface..."
                  className="input-encrypt w-full px-4 py-3 rounded-lg text-sm resize-none"
                  onFocus={() => setFocused("message")}
                  onBlur={() => setFocused(null)}
                />
                {focused === "message" && (
                  <div className="absolute inset-0 pointer-events-none rounded-lg overflow-hidden">
                    <motion.div
                      className="absolute left-0 right-0 h-px bg-cyan-neon/40"
                      animate={{ top: ["0%", "100%"] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                      style={{ boxShadow: "0 0 8px #00F0FF" }}
                    />
                  </div>
                )}
              </div>

              {status === "error" && (
                <p className="font-mono text-xs text-magenta-hot tracking-wide text-center">
                  {errorMsg || "Uplink failed. Call (888) 828-3691."}
                </p>
              )}

              <button
                type="submit"
                disabled={status === "charging"}
                className="btn-energy btn-primary relative w-full py-4 rounded-lg font-display text-sm tracking-[0.25em] uppercase disabled:opacity-80 overflow-hidden"
                data-cursor="hover"
              >
                {status === "charging" ? (
                  <span className="flex items-center justify-center gap-3">
                    <motion.span
                      className="inline-block w-4 h-4 border-2 border-black/30 border-t-black rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 0.7, repeat: Infinity, ease: "linear" }}
                    />
                    Charging Transmission…
                  </span>
                ) : status === "error" ? (
                  "Retry Transmission"
                ) : (
                  "Transmit Securely"
                )}
                {status === "charging" && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    initial={{ x: "-100%" }}
                    animate={{ x: "100%" }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                  />
                )}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}

function Field({
  id,
  label,
  type = "text",
  placeholder,
  focused,
  setFocused,
}: {
  id: string;
  label: string;
  type?: string;
  placeholder: string;
  focused: string | null;
  setFocused: (v: string | null) => void;
}) {
  return (
    <div className="relative">
      <label
        htmlFor={id}
        className="block font-mono text-[10px] tracking-widest text-cyan-neon/50 uppercase mb-2"
      >
        {label}
        {focused === id && (
          <span className="ml-2 text-cyan-neon animate-pulse">[ENCRYPTING…]</span>
        )}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required
        placeholder={placeholder}
        className="input-encrypt w-full px-4 py-3 rounded-lg text-sm"
        onFocus={() => setFocused(id)}
        onBlur={() => setFocused(null)}
      />
      {focused === id && (
        <div className="absolute bottom-0 left-0 right-0 h-px overflow-hidden pointer-events-none">
          <motion.div
            className="h-full bg-cyan-neon"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            style={{
              transformOrigin: "left",
              boxShadow: "0 0 8px #00F0FF",
            }}
            transition={{ duration: 0.4 }}
          />
        </div>
      )}
    </div>
  );
}
