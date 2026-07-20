"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { useMousePosition } from "@/hooks/useMousePosition";

const HeroScene = dynamic(() => import("./three/HeroScene"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-32 h-32 rounded-full border border-cyan-neon/30 animate-pulse shadow-neon-md" />
    </div>
  ),
});

export default function Hero() {
  const { normalized } = useMousePosition();

  return (
    <section
      id="top"
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden pt-24 pb-16"
    >
      {/* 3D Scene */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          transform: `translate(${normalized.x * 8}px, ${-normalized.y * 6}px)`,
          transition: "transform 0.15s ease-out",
        }}
      >
        <HeroScene />
      </div>

      {/* Gradient overlays for depth */}
      <div className="absolute inset-0 z-[2] pointer-events-none bg-gradient-to-b from-black/60 via-transparent to-black" />
      <div className="absolute inset-0 z-[2] pointer-events-none bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-5xl mx-auto mt-[38vh] md:mt-[42vh]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="font-mono text-[10px] md:text-xs tracking-[0.5em] text-cyan-neon/70 uppercase mb-4">
            // Grid Status: Online
          </p>
        </motion.div>

        <motion.h1
          className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-neon leading-[1.05]"
          initial={{ opacity: 0, y: 40, filter: "blur(12px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.1, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          Defend the
          <br />
          <span className="bg-gradient-to-r from-cyan-neon via-electric-blue to-magenta-hot bg-clip-text text-transparent drop-shadow-none"
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
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.7 }}
        >
          An impregnable fortress of pure light. Elite AI defense, quantum-resistant
          encryption, and real-time SOC command — protecting the digital void.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-col sm:flex-row items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
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

        {/* Scroll indicator */}
        <motion.div
          className="mt-16 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
        >
          <span className="font-mono text-[9px] tracking-[0.3em] text-cyan-neon/40 uppercase">
            Scroll to Descend
          </span>
          <motion.div
            className="w-px h-10 bg-gradient-to-b from-cyan-neon/60 to-transparent"
            animate={{ scaleY: [1, 0.5, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </div>
    </section>
  );
}
