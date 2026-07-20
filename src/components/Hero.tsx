"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import HeroMatrixRain from "./HeroMatrixRain";

const ease = [0.22, 1, 0.36, 1] as const;

const STATS = [
  { value: "99.999%", label: "Uptime" },
  { value: "12ms", label: "Response" },
  { value: "24/7", label: "SOC Live" },
  { value: "0-Day", label: "Hunt Ready" },
];

export default function Hero() {
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mx = 0,
      my = 0,
      cx = 0,
      cy = 0,
      raf = 0,
      on = true;

    const move = (e: MouseEvent) => {
      mx = (e.clientX / innerWidth) * 2 - 1;
      my = (e.clientY / innerHeight) * 2 - 1;
    };
    const tick = () => {
      if (!on) return;
      cx += (mx - cx) * 0.06;
      cy += (my - cy) * 0.06;
      if (stageRef.current) {
        stageRef.current.style.setProperty("--px", `${cx}`);
        stageRef.current.style.setProperty("--py", `${cy}`);
      }
      raf = requestAnimationFrame(tick);
    };
    addEventListener("mousemove", move, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      on = false;
      cancelAnimationFrame(raf);
      removeEventListener("mousemove", move);
    };
  }, []);

  return (
    <section
      id="top"
      ref={stageRef}
      className="hero-stage relative min-h-screen w-full overflow-hidden bg-black pt-20 md:pt-24"
      style={{ ["--px" as string]: "0", ["--py" as string]: "0" }}
    >
      {/* Layers */}
      <HeroMatrixRain />
      <div className="hero-void-glow" aria-hidden />
      <div className="hero-grid-floor" aria-hidden />
      <div className="hero-horizon-line" aria-hidden />
      <div className="hero-vignette" aria-hidden />

      {/* Main layout */}
      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-5rem)] max-w-7xl flex-col justify-center px-5 pb-16 pt-8 md:px-8 lg:px-10">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 xl:gap-14">
          {/* ── Left: copy ── */}
          <div className="order-2 flex flex-col items-start text-left lg:order-1">
            <motion.div
              className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-neon/30 bg-cyan-neon/5 px-3 py-1.5 backdrop-blur-sm"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease }}
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-neon opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-neon shadow-[0_0_8px_#00F0FF]" />
              </span>
              <span className="font-mono text-[10px] tracking-[0.28em] text-cyan-neon uppercase">
                Systems Secure · Grid Online
              </span>
            </motion.div>

            <motion.h1
              className="hero-h1 font-display font-black uppercase"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.06, ease }}
            >
              <span className="hero-h1-top">Defend the</span>
              <span className="hero-h1-main">Infinite</span>
            </motion.h1>

            <motion.p
              className="mt-5 max-w-lg font-body text-base leading-relaxed text-cyan-soft/80 md:text-lg"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.14, ease }}
            >
              Elite cybersecurity forged in pure light. AI threat hunting,
              quantum-resistant encryption, and real-time SOC command — one
              impregnable fortress against the void.
            </motion.p>

            <motion.div
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.22, ease }}
            >
              <a
                href="#solutions"
                className="hero-cta-primary group"
                data-cursor="hover"
              >
                <span>Enter the Grid</span>
                <span className="hero-cta-arrow" aria-hidden>
                  →
                </span>
              </a>
              <a
                href="#uplink"
                className="hero-cta-secondary"
                data-cursor="hover"
              >
                Request Briefing
              </a>
            </motion.div>

            {/* Stats strip */}
            <motion.div
              className="mt-10 grid w-full max-w-lg grid-cols-2 gap-3 sm:grid-cols-4"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3, ease }}
            >
              {STATS.map((s) => (
                <div key={s.label} className="hero-stat">
                  <div className="hero-stat-value font-display">{s.value}</div>
                  <div className="hero-stat-label font-mono">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── Right: holographic emblem ── */}
          <motion.div
            className="order-1 flex items-center justify-center lg:order-2"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1, ease }}
          >
            <div className="hero-holo">
              {/* Outer rings */}
              <div className="hero-holo-ring hero-holo-ring-a" />
              <div className="hero-holo-ring hero-holo-ring-b" />
              <div className="hero-holo-ring hero-holo-ring-c" />

              {/* Core shield SVG */}
              <svg
                className="hero-holo-shield"
                viewBox="0 0 240 280"
                fill="none"
                aria-hidden
              >
                <defs>
                  <linearGradient id="shFill" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#00F0FF" stopOpacity="0.2" />
                    <stop offset="50%" stopColor="#0088FF" stopOpacity="0.08" />
                    <stop offset="100%" stopColor="#00F0FF" stopOpacity="0.15" />
                  </linearGradient>
                  <linearGradient id="shStroke" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#E0F7FF" />
                    <stop offset="40%" stopColor="#00F0FF" />
                    <stop offset="100%" stopColor="#0088FF" />
                  </linearGradient>
                  <filter id="shGlow" x="-40%" y="-40%" width="180%" height="180%">
                    <feGaussianBlur stdDeviation="3" result="b" />
                    <feMerge>
                      <feMergeNode in="b" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* Outer shield */}
                <path
                  d="M120 12 L220 48 L220 130 Q220 210 120 268 Q20 210 20 130 L20 48 Z"
                  fill="url(#shFill)"
                  stroke="url(#shStroke)"
                  strokeWidth="2"
                  filter="url(#shGlow)"
                />
                {/* Inner plate */}
                <path
                  d="M120 48 L190 76 L190 132 Q190 188 120 228 Q50 188 50 132 L50 76 Z"
                  fill="rgba(0,240,255,0.04)"
                  stroke="#00F0FF"
                  strokeWidth="1.2"
                  opacity="0.85"
                />
                {/* Cross beams */}
                <path
                  d="M120 70 L120 206 M78 132 L162 132"
                  stroke="#00F0FF"
                  strokeWidth="2"
                  strokeLinecap="round"
                  opacity="0.9"
                  filter="url(#shGlow)"
                />
                {/* Center hex */}
                <polygon
                  points="120,100 142,112 142,136 120,148 98,136 98,112"
                  fill="rgba(0,240,255,0.25)"
                  stroke="#E0F7FF"
                  strokeWidth="1.5"
                  filter="url(#shGlow)"
                />
                {/* Nodes */}
                {[
                  [120, 48],
                  [190, 76],
                  [190, 132],
                  [120, 228],
                  [50, 132],
                  [50, 76],
                ].map(([cx, cy], i) => (
                  <circle
                    key={i}
                    cx={cx}
                    cy={cy}
                    r="3.5"
                    fill="#00F0FF"
                    className="hero-node-pulse"
                    style={{ animationDelay: `${i * 0.15}s` }}
                  />
                ))}
                {/* Circuit traces */}
                <path
                  d="M120 148 L120 180 M98 124 L70 124 L70 160"
                  stroke="#0088FF"
                  strokeWidth="1"
                  opacity="0.6"
                />
                <path
                  d="M142 124 L170 124 L170 160"
                  stroke="#0088FF"
                  strokeWidth="1"
                  opacity="0.6"
                />
              </svg>

              {/* Orbiting dots */}
              <div className="hero-orbit">
                <span className="hero-orbit-dot" />
              </div>
              <div className="hero-orbit hero-orbit-slow">
                <span className="hero-orbit-dot hero-orbit-dot-b" />
              </div>

              {/* Floating labels */}
              <div className="hero-float-tag hero-float-tag-tl font-mono">
                AI_HUNT
              </div>
              <div className="hero-float-tag hero-float-tag-tr font-mono">
                Q-ENCRYPT
              </div>
              <div className="hero-float-tag hero-float-tag-bl font-mono">
                ZERO_TRUST
              </div>
              <div className="hero-float-tag hero-float-tag-br font-mono">
                SOC_CMD
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom scroll cue */}
        <motion.div
          className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <span className="font-mono text-[9px] tracking-[0.35em] text-cyan-neon/45 uppercase">
            Scroll
          </span>
          <div className="h-8 w-px bg-gradient-to-b from-cyan-neon to-transparent shadow-[0_0_8px_#00F0FF] hero-scroll-line" />
        </motion.div>
      </div>
    </section>
  );
}
