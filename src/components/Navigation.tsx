"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const LINKS = [
  { href: "#solutions", label: "Solutions" },
  { href: "#intelligence", label: "Intelligence" },
  { href: "#architecture", label: "Architecture" },
  { href: "#command", label: "Command" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = LINKS.map((l) => l.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -50% 0px" }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4 md:pt-5"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
    >
      <nav
        className={`
          relative w-full max-w-6xl flex items-center justify-between gap-4
          px-4 md:px-6 py-3 rounded-2xl transition-all duration-500
          glass-panel
          ${scrolled ? "shadow-neon-md border-cyan-neon/40" : ""}
        `}
      >
        {/* Corner circuits */}
        <span className="circuit-corner tl" />
        <span className="circuit-corner tr" />
        <span className="circuit-corner bl" />
        <span className="circuit-corner br" />

        {/* Logo */}
        <a href="#top" className="flex items-center gap-2.5 group shrink-0" data-cursor="hover">
          <LogoMark />
          <span className="font-display text-xs md:text-sm font-bold tracking-[0.15em] text-neon hidden sm:block whitespace-nowrap">
            NORT CYBER SECURITY
          </span>
        </a>

        {/* Center links — desktop */}
        <div className="hidden lg:flex items-center gap-8">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`nav-link font-body text-sm tracking-widest uppercase transition-colors duration-300
                ${active === link.href.slice(1) ? "text-cyan-neon active" : "text-cyan-soft/70 hover:text-cyan-neon"}
              `}
              data-cursor="hover"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Right cluster */}
        <div className="flex items-center gap-3 md:gap-4">
          {/* Status pill */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan-neon/30 bg-cyan-neon/5 animate-pulse-status">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-neon opacity-60" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-neon shadow-[0_0_6px_#00F0FF]" />
            </span>
            <span className="font-mono text-[10px] tracking-wider text-cyan-neon/90 uppercase">
              All Systems Secure
            </span>
          </div>

          <a
            href="#uplink"
            className="btn-energy btn-primary relative z-10 px-4 md:px-5 py-2 rounded-lg font-display text-xs md:text-sm tracking-wider uppercase"
            data-cursor="hover"
          >
            Secure Access
          </a>

          {/* Mobile menu toggle */}
          <button
            className="lg:hidden flex flex-col gap-1.5 p-2 border border-cyan-neon/30 rounded-lg"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
            data-cursor="hover"
          >
            <span
              className={`block w-5 h-px bg-cyan-neon transition-all ${mobileOpen ? "rotate-45 translate-y-[3.5px]" : ""}`}
            />
            <span
              className={`block w-5 h-px bg-cyan-neon transition-all ${mobileOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block w-5 h-px bg-cyan-neon transition-all ${mobileOpen ? "-rotate-45 -translate-y-[3.5px]" : ""}`}
            />
          </button>
        </div>

        {/* Mobile dropdown */}
        {mobileOpen && (
          <motion.div
            className="absolute top-full left-0 right-0 mt-2 glass-panel-intense rounded-xl p-4 flex flex-col gap-3 lg:hidden"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-body text-sm tracking-widest uppercase text-cyan-soft/80 hover:text-cyan-neon py-2 border-b border-cyan-neon/10"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </motion.div>
        )}
      </nav>
    </motion.header>
  );
}

function LogoMark() {
  return (
    <svg
      width="32"
      height="36"
      viewBox="0 0 32 36"
      fill="none"
      className="drop-shadow-[0_0_8px_rgba(0,240,255,0.7)] group-hover:drop-shadow-[0_0_14px_rgba(0,240,255,1)] transition-all"
    >
      <path
        d="M16 2 L28 8 L28 18 Q28 28 16 34 Q4 28 4 18 L4 8 Z"
        stroke="#00F0FF"
        strokeWidth="1.2"
        fill="rgba(0,240,255,0.06)"
      />
      <path
        d="M16 8 L22 11.5 L22 18 Q22 24 16 28 Q10 24 10 18 L10 11.5 Z"
        stroke="#0088FF"
        strokeWidth="0.8"
        fill="none"
      />
      <path d="M16 12 L16 24 M12 18 L20 18" stroke="#00F0FF" strokeWidth="1" />
      <polygon
        points="16,14.5 18.5,16 18.5,18.5 16,20 13.5,18.5 13.5,16"
        fill="#FF00AA"
        opacity="0.9"
      />
    </svg>
  );
}
