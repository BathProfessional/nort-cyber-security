"use client";

import { motion } from "framer-motion";
import HeroMatrixRain from "./HeroMatrixRain";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Pure Matrix-style hero — digital rain is the entire experience.
 * 3D shield removed so the rain change is obvious (no cache confusion with old R3F bundle).
 */
export default function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden pt-24 pb-16 bg-black"
    >
      {/* FULL-BLEED MATRIX RAIN — this is the hero */}
      <HeroMatrixRain />

      {/* Soft center darkening for readability (rain stays visible around edges) */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 55% 45% at 50% 48%, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.2) 45%, transparent 70%)",
        }}
      />
      <div className="absolute inset-0 z-[2] pointer-events-none bg-gradient-to-b from-black/40 via-transparent to-black/90" />

      {/* CRT scanlines */}
      <div
        className="absolute inset-0 z-[3] pointer-events-none opacity-[0.15]"
        style={{
          background:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.4) 2px, rgba(0,0,0,0.4) 4px)",
        }}
      />

      {/* Green corner frames */}
      <div className="absolute inset-4 md:inset-8 z-[4] pointer-events-none">
        <span className="absolute top-0 left-0 w-10 h-10 border-l-2 border-t-2 border-[#00FF41]/60" />
        <span className="absolute top-0 right-0 w-10 h-10 border-r-2 border-t-2 border-[#00FF41]/60" />
        <span className="absolute bottom-0 left-0 w-10 h-10 border-l-2 border-b-2 border-[#00FF41]/40" />
        <span className="absolute bottom-0 right-0 w-10 h-10 border-r-2 border-b-2 border-[#00FF41]/40" />
      </div>

      {/* Side terminal text */}
      <div className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-[5] hidden md:flex flex-col gap-1.5 font-mono text-[10px] tracking-widest text-[#00FF41]/55 pointer-events-none select-none">
        <span>WAKE_UP</span>
        <span>FOLLOW_WHITERABBIT</span>
        <span className="text-[#00FF41] font-bold">THE_MATRIX_HAS_YOU</span>
        <span>KNOCK_KNOCK</span>
        <span>0xDEADBEEF</span>
        <span className="mt-3 text-[#00FF41]/80 animate-pulse">▌STREAM_ACTIVE</span>
      </div>
      <div className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-[5] hidden md:flex flex-col gap-1.5 items-end font-mono text-[10px] tracking-widest text-[#00FF41]/55 pointer-events-none select-none">
        <span>NEO://ONLINE</span>
        <span>ZION_UPLINK</span>
        <span className="text-[#00FF41] font-bold">DEFENSE_PROTOCOL</span>
        <span>RED_PILL</span>
        <span>∞ SECURE</span>
        <span className="mt-3 text-[#00FF41]/80 animate-pulse">MATRIX_v4.2▌</span>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-5xl mx-auto">
        <motion.div
          className="mb-5 flex items-center gap-3"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.05, ease }}
        >
          <span className="h-px w-10 bg-gradient-to-r from-transparent to-[#00FF41]" />
          <p className="font-mono text-[11px] md:text-xs tracking-[0.4em] text-[#00FF41] uppercase font-semibold">
            // System Online — Trace Route Null
          </p>
          <span className="h-px w-10 bg-gradient-to-l from-transparent to-[#00FF41]" />
        </motion.div>

        <motion.h1
          className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.05]"
          style={{
            color: "#C8FFC8",
            textShadow:
              "0 0 8px #00FF41, 0 0 24px rgba(0,255,65,0.85), 0 0 60px rgba(0,255,65,0.45), 0 0 100px rgba(0,180,40,0.3)",
          }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.12, ease }}
        >
          Defend the
          <br />
          <span
            style={{
              color: "#00FF41",
              textShadow:
                "0 0 12px #00FF41, 0 0 40px rgba(0,255,65,0.9), 0 0 90px rgba(0,255,65,0.5)",
            }}
          >
            Infinite.
          </span>
        </motion.h1>

        <motion.p
          className="mt-6 max-w-xl font-mono text-sm md:text-[15px] text-[#6BFF8A]/85 leading-relaxed tracking-wide"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.22, ease }}
        >
          There is no spoon — only the Grid. AI threat hunting, quantum encryption,
          and real-time SOC command. See the code. Stop the breach.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-col sm:flex-row items-center gap-4"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.32, ease }}
        >
          <a
            href="#solutions"
            className="px-8 py-3.5 font-display text-sm tracking-[0.2em] uppercase min-w-[200px] font-bold transition-transform duration-150 hover:scale-[1.03]"
            style={{
              background: "#00FF41",
              color: "#000",
              boxShadow:
                "0 0 24px rgba(0,255,65,0.65), 0 0 48px rgba(0,255,65,0.3)",
            }}
            data-cursor="hover"
          >
            Enter the Grid
          </a>
          <a
            href="#uplink"
            className="px-8 py-3.5 font-display text-sm tracking-[0.2em] uppercase min-w-[200px] font-bold border-2 transition-transform duration-150 hover:scale-[1.03]"
            style={{
              borderColor: "#00FF41",
              color: "#00FF41",
              boxShadow: "0 0 20px rgba(0,255,65,0.25)",
              background: "rgba(0,0,0,0.55)",
            }}
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
          <span className="font-mono text-[10px] tracking-[0.4em] text-[#00FF41]/55 uppercase">
            Scroll to Descend
          </span>
          <motion.div
            className="w-px h-10"
            style={{
              background: "linear-gradient(to bottom, #00FF41, transparent)",
              boxShadow: "0 0 8px #00FF41",
            }}
            animate={{ scaleY: [1, 0.5, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </div>
    </section>
  );
}
