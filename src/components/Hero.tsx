"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { useMousePosition } from "@/hooks/useMousePosition";
import HeroMatrixRain from "./HeroMatrixRain";

const HeroScene = dynamic(() => import("./three/HeroScene"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center bg-black">
      <div
        className="w-32 h-32 rounded-full border border-[#00FF41]/40 animate-pulse"
        style={{ boxShadow: "0 0 40px rgba(0,255,65,0.35)" }}
      />
    </div>
  ),
});

const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const { normalized } = useMousePosition();

  return (
    <section
      id="top"
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden pt-24 pb-16 bg-black"
    >
      {/* Full Matrix rain — primary visual */}
      <HeroMatrixRain />

      {/* Subtle 3D shield sitting inside the rain */}
      <div
        className="absolute inset-0 z-[2] will-change-transform opacity-80"
        style={{
          transform: `translate3d(${normalized.x * 6}px, ${-normalized.y * 4}px, 0)`,
          maskImage:
            "radial-gradient(ellipse 55% 50% at 50% 38%, black 20%, transparent 72%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 55% 50% at 50% 38%, black 20%, transparent 72%)",
        }}
      >
        <HeroScene />
      </div>

      {/* Soft vignette so rain densifies at edges, text stays readable */}
      <div
        className="absolute inset-0 z-[3] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 50% 45%, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.55) 55%, rgba(0,0,0,0.88) 100%)",
        }}
      />
      <div className="absolute inset-0 z-[3] pointer-events-none bg-gradient-to-b from-black/50 via-transparent to-black" />
      <div className="absolute inset-0 z-[3] pointer-events-none bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />

      {/* Green matrix glow behind title zone */}
      <div
        className="absolute left-1/2 top-[38%] -translate-x-1/2 z-[3] pointer-events-none w-[70vw] max-w-3xl h-40 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse, rgba(0,255,65,0.22) 0%, transparent 70%)",
          filter: "blur(20px)",
        }}
      />

      {/* Scanline overlay — Matrix CRT feel */}
      <div
        className="absolute inset-0 z-[4] pointer-events-none opacity-[0.12]"
        style={{
          background:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.35) 2px, rgba(0,0,0,0.35) 4px)",
        }}
      />

      {/* Corner code brackets */}
      <div className="absolute inset-4 md:inset-8 z-[5] pointer-events-none">
        <span className="absolute top-0 left-0 w-8 h-8 border-l border-t border-[#00FF41]/45" />
        <span className="absolute top-0 right-0 w-8 h-8 border-r border-t border-[#00FF41]/45" />
        <span className="absolute bottom-0 left-0 w-8 h-8 border-l border-b border-[#00FF41]/35" />
        <span className="absolute bottom-0 right-0 w-8 h-8 border-r border-b border-[#00FF41]/35" />
      </div>

      {/* Side code streams */}
      <div className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-[5] hidden md:flex flex-col gap-1.5 font-mono text-[9px] tracking-widest text-[#00FF41]/40 pointer-events-none select-none">
        <span>WAKE_UP</span>
        <span>FOLLOW_WHITERABBIT</span>
        <span className="text-[#00FF41]/75">THE_MATRIX_HAS_YOU</span>
        <span>KNOCK_KNOCK</span>
        <span>0xDEADBEEF</span>
      </div>
      <div className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-[5] hidden md:flex flex-col gap-1.5 items-end font-mono text-[9px] tracking-widest text-[#00FF41]/40 pointer-events-none select-none">
        <span>NEO://ONLINE</span>
        <span>ZION_UPLINK</span>
        <span className="text-[#00FF41]/75">DEFENSE_PROTOCOL</span>
        <span>RED_PILL</span>
        <span>∞ SECURE</span>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-5xl mx-auto mt-[34vh] md:mt-[38vh]">
        <motion.div
          className="mb-4 flex items-center gap-3"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.05, ease }}
        >
          <span className="h-px w-8 bg-gradient-to-r from-transparent to-[#00FF41]/80" />
          <p className="font-mono text-[10px] md:text-xs tracking-[0.45em] text-[#00FF41]/90 uppercase">
            // System Online — Trace Route Null
          </p>
          <span className="h-px w-8 bg-gradient-to-l from-transparent to-[#00FF41]/80" />
        </motion.div>

        <motion.h1
          className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.05]"
          style={{
            color: "#B8FFB8",
            textShadow:
              "0 0 10px rgba(0,255,65,0.9), 0 0 30px rgba(0,255,65,0.55), 0 0 60px rgba(0,180,40,0.35), 0 0 2px #00FF41",
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
                "0 0 12px rgba(0,255,65,1), 0 0 40px rgba(0,255,65,0.7), 0 0 80px rgba(0,255,65,0.4)",
            }}
          >
            Infinite.
          </span>
        </motion.h1>

        <motion.p
          className="mt-6 max-w-xl font-mono text-sm md:text-base text-[#7CFF9A]/75 leading-relaxed tracking-wide"
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
            className="relative px-8 py-3.5 rounded-sm font-display text-sm tracking-[0.2em] uppercase min-w-[200px] font-bold transition-all duration-200"
            style={{
              background: "#00FF41",
              color: "#000",
              boxShadow:
                "0 0 20px rgba(0,255,65,0.55), 0 0 40px rgba(0,255,65,0.25)",
            }}
            data-cursor="hover"
          >
            Enter the Grid
          </a>
          <a
            href="#uplink"
            className="px-8 py-3.5 rounded-sm font-display text-sm tracking-[0.2em] uppercase min-w-[200px] font-bold border transition-all duration-200"
            style={{
              borderColor: "rgba(0,255,65,0.65)",
              color: "#00FF41",
              boxShadow: "0 0 16px rgba(0,255,65,0.2)",
              background: "rgba(0,20,0,0.4)",
            }}
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
          <span className="font-mono text-[9px] tracking-[0.35em] text-[#00FF41]/45 uppercase">
            Scroll to Descend
          </span>
          <motion.div
            className="w-px h-8"
            style={{
              background: "linear-gradient(to bottom, #00FF41, transparent)",
            }}
            animate={{ scaleY: [1, 0.55, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </div>
    </section>
  );
}
