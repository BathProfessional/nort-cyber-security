"use client";

import { motion } from "framer-motion";

const SOCIALS = [
  { label: "X", href: "#" },
  { label: "LI", href: "#" },
  { label: "GH", href: "#" },
  { label: "DC", href: "#" },
];

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-cyan-neon/15 mt-8">
      {/* Circuit board pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
          <defs>
            <pattern
              id="circuit"
              x="0"
              y="0"
              width="80"
              height="80"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M0 40 H20 M60 40 H80 M40 0 V20 M40 60 V80 M20 40 H60 M40 20 V60"
                fill="none"
                stroke="#00F0FF"
                strokeWidth="0.4"
                opacity="0.4"
              />
              <circle cx="20" cy="40" r="1.5" fill="#00F0FF" opacity="0.5" />
              <circle cx="60" cy="40" r="1.5" fill="#0088FF" opacity="0.5" />
              <circle cx="40" cy="20" r="1.5" fill="#00F0FF" opacity="0.5" />
              <circle cx="40" cy="60" r="1.5" fill="#FF00AA" opacity="0.4" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#circuit)" />
        </svg>

        {/* Looping light trails */}
        <motion.div
          className="absolute top-1/2 left-0 h-px w-32 bg-gradient-to-r from-transparent via-cyan-neon to-transparent"
          animate={{ left: ["-10%", "110%"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          style={{ boxShadow: "0 0 10px #00F0FF" }}
        />
        <motion.div
          className="absolute top-1/3 left-0 h-px w-20 bg-gradient-to-r from-transparent via-electric-blue to-transparent"
          animate={{ left: ["-10%", "110%"] }}
          transition={{ duration: 6, delay: 1.5, repeat: Infinity, ease: "linear" }}
          style={{ boxShadow: "0 0 8px #0088FF" }}
        />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 py-12 md:py-16">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <svg width="28" height="32" viewBox="0 0 28 32" fill="none">
              <path
                d="M14 2 L26 8 L26 16 Q26 24 14 30 Q2 24 2 16 L2 8 Z"
                stroke="#00F0FF"
                strokeWidth="1"
                fill="rgba(0,240,255,0.05)"
              />
              <path d="M14 10 L14 22 M10 16 L18 16" stroke="#00F0FF" strokeWidth="0.8" />
            </svg>
            <div>
              <div className="font-display text-sm font-bold tracking-[0.15em] text-neon">
                NORT CYBER SECURITY
              </div>
              <div className="font-mono text-[9px] tracking-widest text-cyan-neon/40">
                DEFEND THE INFINITE
              </div>
            </div>
          </div>

          {/* Social glyphs */}
          <div className="flex items-center gap-3">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                className="w-10 h-10 rounded-lg border border-cyan-neon/25 flex items-center justify-center font-mono text-xs text-cyan-neon/70 hover:text-cyan-neon hover:border-cyan-neon/60 hover:shadow-neon-sm transition-all duration-300"
                data-cursor="hover"
                aria-label={s.label}
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-cyan-neon/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-mono text-[10px] tracking-widest text-cyan-neon/40 uppercase">
            © NORT CYBER SECURITY // DEFEND THE INFINITE
          </p>
          <div className="flex items-center gap-6 font-mono text-[10px] tracking-wider text-cyan-neon/30 uppercase">
            <a href="#" className="hover:text-cyan-neon/70 transition-colors" data-cursor="hover">
              Privacy
            </a>
            <a href="#" className="hover:text-cyan-neon/70 transition-colors" data-cursor="hover">
              Terms
            </a>
            <a href="#" className="hover:text-cyan-neon/70 transition-colors" data-cursor="hover">
              Status
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
