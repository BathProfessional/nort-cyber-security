"use client";

import { motion } from "framer-motion";
import { useMousePosition } from "@/hooks/useMousePosition";
import HeroMatrixRain from "./HeroMatrixRain";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Matrix digital rain + pure Tron neon blue aesthetic.
 * NO GREEN — cyan #00F0FF / electric blue #0088FF only.
 * Build: tron-blue-v2
 */
export default function Hero() {
  const { normalized } = useMousePosition();

  return (
    <section
      id="top"
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden pt-24 pb-16 bg-black"
    >
      {/* Digital rain — Matrix structure, Tron cyan palette */}
      <HeroMatrixRain />

      {/* Tron perspective grid floor */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[48vh] z-[2] pointer-events-none will-change-transform"
        style={{
          perspective: "500px",
          transform: `translate3d(${normalized.x * 12}px, 0, 0)`,
        }}
      >
        <div
          className="absolute inset-0 origin-top"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,240,255,0.22) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,240,255,0.18) 1px, transparent 1px)
            `,
            backgroundSize: "48px 48px",
            transform: "rotateX(58deg) scale(1.6)",
            maskImage:
              "linear-gradient(to bottom, black 0%, black 35%, transparent 95%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, black 0%, black 35%, transparent 95%)",
            boxShadow: "inset 0 0 80px rgba(0,240,255,0.08)",
          }}
        />
      </div>

      {/* Horizon neon bar */}
      <div
        className="absolute left-0 right-0 top-[52%] z-[3] pointer-events-none h-[2px]"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(0,136,255,0.2) 15%, rgba(0,240,255,0.95) 50%, rgba(0,136,255,0.2) 85%, transparent 100%)",
          boxShadow:
            "0 0 20px 4px rgba(0,240,255,0.55), 0 0 60px 12px rgba(0,136,255,0.35), 0 0 120px 24px rgba(0,240,255,0.15)",
        }}
      />

      {/* Soft center bloom + vignette */}
      <div
        className="absolute inset-0 z-[3] pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 50% 40% at 50% 42%, rgba(0,240,255,0.12) 0%, transparent 55%),
            radial-gradient(ellipse 70% 60% at 50% 50%, transparent 30%, rgba(0,0,0,0.55) 75%, rgba(0,0,0,0.9) 100%)
          `,
        }}
      />
      <div className="absolute inset-0 z-[3] pointer-events-none bg-gradient-to-b from-black/50 via-transparent to-black" />

      {/* Subtle scanlines */}
      <div
        className="absolute inset-0 z-[4] pointer-events-none opacity-[0.1]"
        style={{
          background:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.35) 2px, rgba(0,0,0,0.35) 4px)",
        }}
      />

      {/* Floating light-cycle energy ribbons (SVG) */}
      <svg
        className="absolute inset-0 z-[4] w-full h-full pointer-events-none opacity-50"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="tronRibbon1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00F0FF" stopOpacity="0" />
            <stop offset="40%" stopColor="#00F0FF" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#0088FF" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="tronRibbon2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0088FF" stopOpacity="0" />
            <stop offset="50%" stopColor="#00F0FF" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#0088FF" stopOpacity="0" />
          </linearGradient>
          <filter id="ribbonGlow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <motion.path
          d="M-80,180 Q280,120 520,200 T1300,160"
          fill="none"
          stroke="url(#tronRibbon1)"
          strokeWidth="2"
          filter="url(#ribbonGlow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: [0, 1, 0], opacity: [0, 0.85, 0] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.path
          d="M-40,320 Q360,260 700,340 T1400,300"
          fill="none"
          stroke="url(#tronRibbon2)"
          strokeWidth="1.5"
          filter="url(#ribbonGlow)"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: [0, 1, 0], opacity: [0, 0.6, 0] }}
          transition={{ duration: 7, delay: 1.2, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.path
          d="M-60,500 Q400,440 800,520 T1500,480"
          fill="none"
          stroke="url(#tronRibbon1)"
          strokeWidth="1"
          filter="url(#ribbonGlow)"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: [0, 1, 0], opacity: [0, 0.45, 0] }}
          transition={{ duration: 8.5, delay: 2.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>

      {/* Circuit corner frames */}
      <div className="absolute inset-4 md:inset-8 z-[5] pointer-events-none">
        <span className="absolute top-0 left-0 w-12 h-12 border-l-2 border-t-2 border-cyan-neon/70 shadow-[0_0_16px_rgba(0,240,255,0.5)]" />
        <span className="absolute top-0 right-0 w-12 h-12 border-r-2 border-t-2 border-cyan-neon/70 shadow-[0_0_16px_rgba(0,240,255,0.5)]" />
        <span className="absolute bottom-0 left-0 w-12 h-12 border-l-2 border-b-2 border-electric-blue/50 shadow-[0_0_12px_rgba(0,136,255,0.35)]" />
        <span className="absolute bottom-0 right-0 w-12 h-12 border-r-2 border-b-2 border-electric-blue/50 shadow-[0_0_12px_rgba(0,136,255,0.35)]" />
        {/* Circuit ticks */}
        <span className="absolute top-0 left-12 w-6 h-px bg-cyan-neon/50 shadow-[0_0_6px_#00F0FF]" />
        <span className="absolute top-0 right-12 w-6 h-px bg-cyan-neon/50 shadow-[0_0_6px_#00F0FF]" />
        <span className="absolute top-12 left-0 h-6 w-px bg-cyan-neon/50 shadow-[0_0_6px_#00F0FF]" />
        <span className="absolute top-12 right-0 h-6 w-px bg-cyan-neon/50 shadow-[0_0_6px_#00F0FF]" />
      </div>

      {/* Pulsing hexagonal node (center, behind text) */}
      <div
        className="absolute left-1/2 top-[38%] -translate-x-1/2 -translate-y-1/2 z-[4] pointer-events-none w-64 h-64 md:w-80 md:h-80 opacity-30"
        style={{
          background:
            "radial-gradient(circle, rgba(0,240,255,0.25) 0%, rgba(0,136,255,0.08) 40%, transparent 65%)",
          filter: "blur(8px)",
        }}
      />
      <motion.div
        className="absolute left-1/2 top-[38%] -translate-x-1/2 -translate-y-1/2 z-[4] pointer-events-none w-40 h-40 md:w-52 md:h-52"
        style={{
          clipPath:
            "polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)",
          border: "1px solid rgba(0,240,255,0.35)",
          boxShadow:
            "0 0 30px rgba(0,240,255,0.2), inset 0 0 40px rgba(0,240,255,0.06)",
          background: "rgba(0,240,255,0.03)",
        }}
        animate={{ rotate: 360, opacity: [0.35, 0.55, 0.35] }}
        transition={{
          rotate: { duration: 40, repeat: Infinity, ease: "linear" },
          opacity: { duration: 3, repeat: Infinity, ease: "easeInOut" },
        }}
      />

      {/* Side HUD */}
      <div className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-[6] hidden md:flex flex-col gap-1.5 font-mono text-[10px] tracking-widest text-cyan-neon/45 pointer-events-none select-none">
        <span>GRID://MAIN</span>
        <span>SECTOR_01</span>
        <span className="text-cyan-neon font-semibold">SHIELD_ONLINE</span>
        <span>UPLINK_SECURE</span>
        <span>0xNORT</span>
        <span className="mt-3 text-cyan-neon/80 animate-pulse">▌STREAM_ACTIVE</span>
      </div>
      <div className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-[6] hidden md:flex flex-col gap-1.5 items-end font-mono text-[10px] tracking-widest text-cyan-neon/45 pointer-events-none select-none">
        <span>LATENCY 0.4ms</span>
        <span>NODES 12,847</span>
        <span className="text-cyan-neon font-semibold">DEFENSE_MESH</span>
        <span>THREATS_NULL</span>
        <span>∞ SECURE</span>
        <span className="mt-3 text-cyan-neon/80 animate-pulse">TRON_LINK_v4.2▌</span>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-5xl mx-auto">
        <motion.div
          className="mb-5 flex items-center gap-3"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.05, ease }}
        >
          <span className="h-px w-10 bg-gradient-to-r from-transparent to-cyan-neon shadow-[0_0_8px_#00F0FF]" />
          <p className="font-mono text-[11px] md:text-xs tracking-[0.4em] text-cyan-neon uppercase font-semibold">
            // Grid Status: Online
          </p>
          <span className="h-px w-10 bg-gradient-to-l from-transparent to-cyan-neon shadow-[0_0_8px_#00F0FF]" />
        </motion.div>

        <motion.h1
          className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.05] text-neon"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.12, ease }}
        >
          Defend the
          <br />
          <span
            className="bg-gradient-to-r from-cyan-neon via-electric-blue to-cyan-neon bg-clip-text text-transparent"
            style={{
              WebkitBackgroundClip: "text",
              filter:
                "drop-shadow(0 0 20px rgba(0,240,255,0.8)) drop-shadow(0 0 50px rgba(0,136,255,0.45))",
            }}
          >
            Infinite.
          </span>
        </motion.h1>

        <motion.p
          className="mt-6 max-w-xl font-body text-base md:text-lg text-cyan-soft/75 leading-relaxed tracking-wide"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.22, ease }}
        >
          Jack into the Grid. An impregnable fortress of pure light — AI threat
          hunting, quantum encryption, and real-time SOC command against the void.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-col sm:flex-row items-center gap-4"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.32, ease }}
        >
          <a
            href="#solutions"
            className="btn-energy btn-primary px-8 py-3.5 rounded-lg font-display text-sm tracking-[0.2em] uppercase min-w-[200px]"
            data-cursor="hover"
          >
            Enter the Grid
          </a>
          <a
            href="#uplink"
            className="btn-energy btn-secondary px-8 py-3.5 rounded-lg font-display text-sm tracking-[0.2em] uppercase min-w-[200px]"
            data-cursor="hover"
          >
            Request Briefing
          </a>
        </motion.div>

        <motion.div
          className="mt-14 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.4 }}
        >
          <span className="font-mono text-[10px] tracking-[0.35em] text-cyan-neon/50 uppercase">
            Scroll to Descend
          </span>
          <motion.div
            className="w-px h-10 bg-gradient-to-b from-cyan-neon to-transparent shadow-[0_0_8px_#00F0FF]"
            animate={{ scaleY: [1, 0.5, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </div>
    </section>
  );
}
