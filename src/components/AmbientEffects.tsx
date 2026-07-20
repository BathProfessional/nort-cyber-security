"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { useMousePosition } from "@/hooks/useMousePosition";

export default function AmbientEffects() {
  const { normalized } = useMousePosition();

  const particles = useMemo(
    () =>
      Array.from({ length: 48 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2.5 + 0.5,
        duration: Math.random() * 8 + 6,
        delay: Math.random() * 5,
      })),
    []
  );

  const binaryCols = useMemo(
    () =>
      Array.from({ length: 12 }).map((_, i) => ({
        id: i,
        left: 4 + i * 8 + Math.random() * 3,
        delay: Math.random() * 8,
        duration: 10 + Math.random() * 10,
        content: Array.from({ length: 28 })
          .map(() => (Math.random() > 0.5 ? "1" : "0"))
          .join(""),
      })),
    []
  );

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Reactive wall grid */}
      <div
        className="tron-grid-wall absolute inset-0 transition-transform duration-300 ease-out"
        style={{
          transform: `translate(${normalized.x * 12}px, ${-normalized.y * 8}px)`,
        }}
      />

      {/* Perspective floor grid */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[55vh] overflow-hidden"
        style={{
          perspective: "600px",
        }}
      >
        <div
          className="tron-grid-floor transition-transform duration-200 ease-out"
          style={{
            transform: `perspective(600px) rotateX(60deg) scale(2.5) translateY(-10%) translateX(${normalized.x * 20}px)`,
          }}
        />
      </div>

      {/* Horizon glow */}
      <div className="horizon-glow absolute top-[48%] opacity-60" />

      {/* Radial vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 40%, transparent 0%, rgba(0,0,0,0.4) 70%, #000 100%)",
        }}
      />

      {/* Floating particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-cyan-neon"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            boxShadow: `0 0 ${p.size * 3}px rgba(0,240,255,0.6)`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.15, 0.6, 0.15],
            x: [0, (Math.random() - 0.5) * 20, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Binary rain */}
      {binaryCols.map((col) => (
        <div
          key={col.id}
          className="binary-col"
          style={{
            left: `${col.left}%`,
            animationDuration: `${col.duration}s`,
            animationDelay: `${col.delay}s`,
          }}
        >
          {col.content}
        </div>
      ))}

      {/* Energy ribbons (SVG) */}
      <svg
        className="absolute inset-0 w-full h-full opacity-30"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="ribbonGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00F0FF" stopOpacity="0" />
            <stop offset="50%" stopColor="#00F0FF" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#0088FF" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="ribbonGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FF00AA" stopOpacity="0" />
            <stop offset="50%" stopColor="#FF00AA" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#00F0FF" stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.path
          d="M-100,200 Q300,100 600,250 T1400,180"
          fill="none"
          stroke="url(#ribbonGrad)"
          strokeWidth="1.5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: [0, 1, 0], opacity: [0, 0.7, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          style={{ filter: "drop-shadow(0 0 6px #00F0FF)" }}
        />
        <motion.path
          d="M-50,400 Q400,320 700,450 T1500,380"
          fill="none"
          stroke="url(#ribbonGrad2)"
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: [0, 1, 0], opacity: [0, 0.5, 0] }}
          transition={{
            duration: 11,
            delay: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ filter: "drop-shadow(0 0 4px #FF00AA)" }}
        />
      </svg>

      {/* Soft center bloom */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full opacity-20"
        style={{
          background:
            "radial-gradient(ellipse, rgba(0,240,255,0.25) 0%, rgba(0,136,255,0.1) 40%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
    </div>
  );
}
