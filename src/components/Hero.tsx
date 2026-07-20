"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { useMousePosition } from "@/hooks/useMousePosition";
import HeroMatrixRain from "./HeroMatrixRain";

const HeroScene = dynamic(() => import("./three/HeroScene"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="relative">
        <div className="w-36 h-36 rounded-full border border-cyan-neon/40 animate-pulse shadow-neon-lg" />
        <div className="absolute inset-4 rounded-full border border-magenta-hot/30 animate-pulse" />
      </div>
    </div>
  ),
});

const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const { normalized } = useMousePosition();

  return (
    <section
      id="top"
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden pt-24 pb-16"
    >
      {/* Deep void */}
      <div className="absolute inset-0 z-0 bg-black" />

      {/* 2D Matrix rain layer */}
      <HeroMatrixRain />

      {/* 3D Tron world */}
      <div
        className="absolute inset-0 z-[2] will-change-transform"
        style={{
          transform: `translate3d(${normalized.x * 8}px, ${-normalized.y * 5}px, 0)`,
        }}
      >
        <HeroScene />
      </div>

      {/* Vignette + horizon bloom overlays */}
      <div className="absolute inset-0 z-[3] pointer-events-none bg-gradient-to-b from-black/70 via-transparent to-black" />
      <div className="absolute inset-0 z-[3] pointer-events-none bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />
      <div
        className="absolute left-0 right-0 top-[42%] z-[3] pointer-events-none h-[2px] opacity-70"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(0,240,255,0.15) 20%, rgba(0,240,255,0.85) 50%, rgba(0,240,255,0.15) 80%, transparent)",
          boxShadow:
            "0 0 30px 6px rgba(0,240,255,0.45), 0 0 80px 16px rgba(0,136,255,0.25)",
        }}
      />
      <div
        className="absolute inset-0 z-[3] pointer-events-none opacity-30"
        style={{
          background:
            "radial-gradient(ellipse 50% 40% at 50% 38%, rgba(0,240,255,0.18) 0%, transparent 60%)",
        }}
      />

      {/* Tron corner brackets */}
      <div className="absolute inset-4 md:inset-8 z-[4] pointer-events-none">
        <span className="absolute top-0 left-0 w-10 h-10 border-l-2 border-t-2 border-cyan-neon/50 shadow-[0_0_12px_rgba(0,240,255,0.4)]" />
        <span className="absolute top-0 right-0 w-10 h-10 border-r-2 border-t-2 border-cyan-neon/50 shadow-[0_0_12px_rgba(0,240,255,0.4)]" />
        <span className="absolute bottom-0 left-0 w-10 h-10 border-l-2 border-b-2 border-cyan-neon/40" />
        <span className="absolute bottom-0 right-0 w-10 h-10 border-r-2 border-b-2 border-cyan-neon/40" />
      </div>

      {/* HUD side labels */}
      <div className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-[4] hidden md:flex flex-col gap-2 font-mono text-[9px] tracking-widest text-cyan-neon/35 pointer-events-none">
        <span>SECTOR_01</span>
        <span>GRID://MAIN</span>
        <span className="text-cyan-neon/60">SHIELD_ONLINE</span>
        <span>MATRIX_FEED</span>
      </div>
      <div className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-[4] hidden md:flex flex-col gap-2 items-end font-mono text-[9px] tracking-widest text-cyan-neon/35 pointer-events-none">
        <span>LATENCY 0.4ms</span>
        <span>NODES 12,847</span>
        <span className="text-magenta-hot/50">THREATS_BLOCKED</span>
        <span>∞ DEFENSE</span>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-5xl mx-auto mt-[36vh] md:mt-[40vh]">
        <motion.div
          className="mb-4 flex items-center gap-3"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.05, ease }}
        >
          <span className="h-px w-8 bg-gradient-to-r from-transparent to-cyan-neon/70" />
          <p className="font-mono text-[10px] md:text-xs tracking-[0.5em] text-cyan-neon/80 uppercase">
            // Grid Status: Online
          </p>
          <span className="h-px w-8 bg-gradient-to-l from-transparent to-cyan-neon/70" />
        </motion.div>

        <motion.h1
          className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-neon leading-[1.05]"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.12, ease }}
        >
          Defend the
          <br />
          <span
            className="relative inline-block bg-gradient-to-r from-cyan-neon via-electric-blue to-magenta-hot bg-clip-text text-transparent"
            style={{
              WebkitBackgroundClip: "text",
              filter: "drop-shadow(0 0 40px rgba(0,240,255,0.65))",
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
          className="mt-12 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.4 }}
        >
          <span className="font-mono text-[9px] tracking-[0.3em] text-cyan-neon/40 uppercase">
            Scroll to Descend
          </span>
          <motion.div
            className="w-px h-8 bg-gradient-to-b from-cyan-neon/70 to-transparent"
            animate={{ scaleY: [1, 0.55, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </div>
    </section>
  );
}
