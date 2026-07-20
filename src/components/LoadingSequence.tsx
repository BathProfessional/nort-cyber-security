"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoadingSequenceProps {
  onComplete: () => void;
}

export default function LoadingSequence({ onComplete }: LoadingSequenceProps) {
  const [phase, setPhase] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    // Phase timeline
    timers.push(setTimeout(() => setPhase(1), 200)); // grid builds
    timers.push(setTimeout(() => setPhase(2), 900)); // logo constructs
    timers.push(setTimeout(() => setPhase(3), 2200)); // energy surge
    timers.push(
      setTimeout(() => {
        setPhase(4);
        onComplete();
      }, 3200)
    );

    // Progress bar
    let p = 0;
    const interval = setInterval(() => {
      p += Math.random() * 8 + 2;
      if (p >= 100) {
        p = 100;
        clearInterval(interval);
      }
      setProgress(Math.min(100, p));
    }, 80);

    return () => {
      timers.forEach(clearTimeout);
      clearInterval(interval);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase < 4 && (
        <motion.div
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-black overflow-hidden"
          exit={{
            opacity: 0,
            scale: 1.05,
            filter: "brightness(2)",
            transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
          }}
        >
          {/* Expanding grid from center */}
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 0.3 }}
            animate={
              phase >= 1
                ? { opacity: 1, scale: 1 }
                : { opacity: 0, scale: 0.3 }
            }
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(0,240,255,0.12) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(0,240,255,0.12) 1px, transparent 1px)
                `,
                backgroundSize: "48px 48px",
                maskImage:
                  "radial-gradient(ellipse 70% 70% at 50% 50%, black 0%, transparent 75%)",
                WebkitMaskImage:
                  "radial-gradient(ellipse 70% 70% at 50% 50%, black 0%, transparent 75%)",
              }}
            />
            {/* Floor perspective grid */}
            <div
              className="absolute bottom-0 left-0 right-0 h-[50%]"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(0,240,255,0.15) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(0,240,255,0.15) 1px, transparent 1px)
                `,
                backgroundSize: "40px 40px",
                transform: "perspective(400px) rotateX(55deg)",
                transformOrigin: "center top",
                maskImage:
                  "linear-gradient(to bottom, black 0%, transparent 80%)",
                WebkitMaskImage:
                  "linear-gradient(to bottom, black 0%, transparent 80%)",
              }}
            />
          </motion.div>

          {/* Particles */}
          {phase >= 1 &&
            Array.from({ length: 40 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full bg-cyan-neon"
                style={{
                  left: `${20 + Math.random() * 60}%`,
                  top: `${20 + Math.random() * 60}%`,
                  boxShadow: "0 0 6px #00F0FF",
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, 0.8, 0],
                  scale: [0, 1.5, 0],
                  x: (Math.random() - 0.5) * 200,
                  y: (Math.random() - 0.5) * 200,
                }}
                transition={{
                  duration: 1.5 + Math.random(),
                  delay: Math.random() * 0.8,
                  repeat: Infinity,
                  repeatDelay: Math.random() * 2,
                }}
              />
            ))}

          {/* Logo construction */}
          <motion.div
            className="relative z-10 flex flex-col items-center"
            initial={{ opacity: 0 }}
            animate={phase >= 2 ? { opacity: 1 } : { opacity: 0 }}
          >
            {/* Geometric shield logo SVG */}
            <svg
              width="120"
              height="140"
              viewBox="0 0 120 140"
              fill="none"
              className="mb-6 drop-shadow-[0_0_30px_rgba(0,240,255,0.6)]"
            >
              {/* Outer shield */}
              <motion.path
                d="M60 8 L108 28 L108 70 Q108 110 60 132 Q12 110 12 70 L12 28 Z"
                stroke="#00F0FF"
                strokeWidth="1.5"
                fill="rgba(0,240,255,0.03)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={
                  phase >= 2
                    ? { pathLength: 1, opacity: 1 }
                    : { pathLength: 0, opacity: 0 }
                }
                transition={{ duration: 1.1, ease: "easeOut" }}
              />
              {/* Inner geometry */}
              <motion.path
                d="M60 28 L90 42 L90 68 Q90 92 60 108 Q30 92 30 68 L30 42 Z"
                stroke="#0088FF"
                strokeWidth="1"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={phase >= 2 ? { pathLength: 1 } : { pathLength: 0 }}
                transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
              />
              {/* Circuit cross */}
              <motion.path
                d="M60 40 L60 96 M42 68 L78 68"
                stroke="#00F0FF"
                strokeWidth="1.5"
                initial={{ pathLength: 0 }}
                animate={phase >= 2 ? { pathLength: 1 } : { pathLength: 0 }}
                transition={{ duration: 0.7, delay: 0.5 }}
              />
              {/* Center hexagon */}
              <motion.polygon
                points="60,52 70,58 70,70 60,76 50,70 50,58"
                stroke="#FF00AA"
                strokeWidth="1"
                fill="rgba(255,0,170,0.15)"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={
                  phase >= 2
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0.5 }
                }
                transition={{ duration: 0.5, delay: 0.8 }}
                style={{ transformOrigin: "60px 64px" }}
              />
              {/* Energy nodes */}
              {[
                [60, 28],
                [90, 42],
                [90, 68],
                [60, 108],
                [30, 68],
                [30, 42],
              ].map(([cx, cy], i) => (
                <motion.circle
                  key={i}
                  cx={cx}
                  cy={cy}
                  r="2.5"
                  fill="#00F0FF"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={
                    phase >= 2
                      ? { opacity: [0.5, 1, 0.5], scale: 1 }
                      : { opacity: 0, scale: 0 }
                  }
                  transition={{
                    opacity: { duration: 1.5, repeat: Infinity, delay: 0.9 + i * 0.1 },
                    scale: { duration: 0.3, delay: 0.9 + i * 0.08 },
                  }}
                  style={{ filter: "drop-shadow(0 0 4px #00F0FF)" }}
                />
              ))}
            </svg>

            {/* Wordmark */}
            <motion.h1
              className="font-display text-2xl sm:text-3xl md:text-4xl font-bold tracking-[0.2em] text-neon text-center px-4"
              initial={{ opacity: 0, letterSpacing: "0.5em" }}
              animate={
                phase >= 2
                  ? { opacity: 1, letterSpacing: "0.2em" }
                  : { opacity: 0, letterSpacing: "0.5em" }
              }
              transition={{ duration: 0.9, delay: 0.6 }}
            >
              NORT CYBER SECURITY
            </motion.h1>

            <motion.p
              className="mt-3 font-mono text-xs tracking-[0.4em] text-cyan-neon/60 uppercase"
              initial={{ opacity: 0 }}
              animate={phase >= 2 ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 1.1 }}
            >
              Initialize Grid Uplink
            </motion.p>

            {/* Progress bar */}
            <div className="mt-10 w-64 h-[2px] bg-cyan-neon/10 relative overflow-hidden rounded-full">
              <motion.div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-electric-blue via-cyan-neon to-cyan-neon rounded-full"
                style={{
                  width: `${progress}%`,
                  boxShadow: "0 0 12px #00F0FF, 0 0 24px rgba(0,240,255,0.5)",
                }}
              />
            </div>
            <motion.span
              className="mt-3 font-mono text-[10px] tracking-widest text-cyan-neon/50"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.2, repeat: Infinity }}
            >
              {progress < 100 ? `SYNC ${Math.floor(progress)}%` : "LINK ESTABLISHED"}
            </motion.span>
          </motion.div>

          {/* Energy surge flash */}
          {phase >= 3 && (
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.9, 0.3, 0] }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              style={{
                background:
                  "radial-gradient(circle at center, rgba(0,240,255,0.5) 0%, rgba(0,136,255,0.2) 40%, transparent 70%)",
              }}
            />
          )}

          {/* Expanding ring surge */}
          {phase >= 3 && (
            <motion.div
              className="absolute rounded-full border border-cyan-neon"
              initial={{ width: 40, height: 40, opacity: 1 }}
              animate={{ width: 1200, height: 1200, opacity: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              style={{ boxShadow: "0 0 40px #00F0FF" }}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
