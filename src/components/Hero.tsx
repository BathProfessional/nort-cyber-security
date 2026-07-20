"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { useMousePosition } from "@/hooks/useMousePosition";

const HeroScene = dynamic(() => import("./three/HeroScene"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-28 h-28 rounded-full border border-cyan-neon/30 animate-pulse shadow-neon-md" />
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
      <div
        className="absolute inset-0 z-[1] will-change-transform"
        style={{
          transform: `translate3d(${normalized.x * 6}px, ${-normalized.y * 4}px, 0)`,
        }}
      >
        <HeroScene />
      </div>

      <div className="absolute inset-0 z-[2] pointer-events-none bg-gradient-to-b from-black/60 via-transparent to-black" />
      <div className="absolute inset-0 z-[2] pointer-events-none bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />

      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-5xl mx-auto mt-[38vh] md:mt-[42vh]">
        <motion.p
          className="font-mono text-[10px] md:text-xs tracking-[0.5em] text-cyan-neon/70 uppercase mb-4"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.05, ease }}
        >
          // Grid Status: Online
        </motion.p>

        <motion.h1
          className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-neon leading-[1.05]"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.12, ease }}
        >
          Defend the
          <br />
          <span
            className="bg-gradient-to-r from-cyan-neon via-electric-blue to-magenta-hot bg-clip-text text-transparent"
            style={{
              WebkitBackgroundClip: "text",
              filter: "drop-shadow(0 0 30px rgba(0,240,255,0.5))",
            }}
          >
            Infinite.
          </span>
        </motion.h1>

        <motion.p
          className="mt-6 max-w-xl font-body text-base md:text-lg text-cyan-soft/70 leading-relaxed tracking-wide"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.22, ease }}
        >
          An impregnable fortress of pure light. Elite AI defense, quantum-resistant
          encryption, and real-time SOC command — protecting the digital void.
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
          <span className="font-mono text-[9px] tracking-[0.3em] text-cyan-neon/40 uppercase">
            Scroll to Descend
          </span>
          <motion.div
            className="w-px h-8 bg-gradient-to-b from-cyan-neon/60 to-transparent"
            animate={{ scaleY: [1, 0.55, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </div>
    </section>
  );
}
