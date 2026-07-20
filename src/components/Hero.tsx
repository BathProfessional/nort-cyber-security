"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import HeroMatrixRain from "./HeroMatrixRain";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Smooth Tron-blue Matrix hero.
 * - rAF parallax (no React re-renders on mouse move)
 * - CSS-only ambient FX (no heavy SVG filters)
 * - Neon grid, horizon, hex core, light streaks
 */
export default function Hero() {
  const gridWrapRef = useRef<HTMLDivElement>(null);
  const bloomRef = useRef<HTMLDivElement>(null);

  // Smooth mouse parallax without re-rendering the tree
  useEffect(() => {
    let mx = 0;
    let my = 0;
    let cx = 0;
    let cy = 0;
    let raf = 0;
    let active = true;

    const onMove = (e: MouseEvent) => {
      mx = (e.clientX / window.innerWidth) * 2 - 1;
      my = (e.clientY / window.innerHeight) * 2 - 1;
    };

    const tick = () => {
      if (!active) return;
      cx += (mx - cx) * 0.08;
      cy += (my - cy) * 0.08;
      if (gridWrapRef.current) {
        gridWrapRef.current.style.transform = `translate3d(${cx * 18}px, ${cy * -6}px, 0)`;
      }
      if (bloomRef.current) {
        bloomRef.current.style.transform = `translate3d(calc(-50% + ${cx * 10}px), calc(-50% + ${cy * -8}px), 0)`;
      }
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      active = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <section
      id="top"
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden pt-24 pb-16 bg-black"
    >
      {/* Digital rain */}
      <HeroMatrixRain />

      {/* Tron grid floor — GPU layer */}
      <div
        ref={gridWrapRef}
        className="absolute bottom-0 left-0 right-0 h-[50vh] z-[2] pointer-events-none will-change-transform"
        style={{ perspective: "520px" }}
      >
        <div
          className="absolute inset-0 origin-top hero-grid-floor"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,240,255,0.28) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,136,255,0.2) 1px, transparent 1px)
            `,
            backgroundSize: "56px 56px",
            transform: "rotateX(58deg) scale(1.7)",
            maskImage:
              "linear-gradient(to bottom, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.7) 40%, transparent 92%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.7) 40%, transparent 92%)",
          }}
        />
      </div>

      {/* Horizon neon bar + pulse */}
      <div className="absolute left-0 right-0 top-[51%] z-[3] pointer-events-none">
        <div
          className="h-[2px] w-full hero-horizon"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(0,136,255,0.25) 12%, #00F0FF 50%, rgba(0,136,255,0.25) 88%, transparent 100%)",
            boxShadow:
              "0 0 16px 3px rgba(0,240,255,0.55), 0 0 48px 10px rgba(0,136,255,0.3), 0 0 100px 20px rgba(0,240,255,0.12)",
          }}
        />
      </div>

      {/* Center bloom (parallax) */}
      <div
        ref={bloomRef}
        className="absolute left-1/2 top-[40%] z-[3] pointer-events-none w-[min(90vw,520px)] h-[280px] will-change-transform"
        style={{
          transform: "translate3d(-50%, -50%, 0)",
          background:
            "radial-gradient(ellipse, rgba(0,240,255,0.18) 0%, rgba(0,136,255,0.08) 40%, transparent 68%)",
        }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0 z-[3] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 75% 65% at 50% 48%, transparent 20%, rgba(0,0,0,0.45) 65%, rgba(0,0,0,0.92) 100%)",
        }}
      />
      <div className="absolute inset-0 z-[3] pointer-events-none bg-gradient-to-b from-black/45 via-transparent to-black" />

      {/* CSS light-cycle streaks (cheap, cool) */}
      <div className="absolute inset-0 z-[4] pointer-events-none overflow-hidden">
        <div className="hero-streak hero-streak-a" />
        <div className="hero-streak hero-streak-b" />
        <div className="hero-streak hero-streak-c" />
      </div>

      {/* Hex core rings — CSS animation only */}
      <div className="absolute left-1/2 top-[38%] -translate-x-1/2 -translate-y-1/2 z-[4] pointer-events-none">
        <div className="hero-hex hero-hex-outer" />
        <div className="hero-hex hero-hex-inner" />
        <div className="hero-hex-core" />
      </div>

      {/* Circuit corners */}
      <div className="absolute inset-4 md:inset-8 z-[5] pointer-events-none">
        <span className="absolute top-0 left-0 w-11 h-11 border-l-2 border-t-2 border-cyan-neon/75 shadow-[0_0_14px_rgba(0,240,255,0.55)]" />
        <span className="absolute top-0 right-0 w-11 h-11 border-r-2 border-t-2 border-cyan-neon/75 shadow-[0_0_14px_rgba(0,240,255,0.55)]" />
        <span className="absolute bottom-0 left-0 w-11 h-11 border-l-2 border-b-2 border-electric-blue/55" />
        <span className="absolute bottom-0 right-0 w-11 h-11 border-r-2 border-b-2 border-electric-blue/55" />
        <span className="absolute top-0 left-11 w-5 h-px bg-cyan-neon/60 shadow-[0_0_6px_#00F0FF]" />
        <span className="absolute top-0 right-11 w-5 h-px bg-cyan-neon/60 shadow-[0_0_6px_#00F0FF]" />
        <span className="absolute top-11 left-0 h-5 w-px bg-cyan-neon/60 shadow-[0_0_6px_#00F0FF]" />
        <span className="absolute top-11 right-0 h-5 w-px bg-cyan-neon/60 shadow-[0_0_6px_#00F0FF]" />
      </div>

      {/* Side HUD */}
      <div className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-[6] hidden md:flex flex-col gap-1.5 font-mono text-[10px] tracking-widest text-cyan-neon/50 pointer-events-none select-none">
        <span>GRID://MAIN</span>
        <span>SECTOR_01</span>
        <span className="text-cyan-neon font-semibold">SHIELD_ONLINE</span>
        <span>UPLINK_SECURE</span>
        <span className="mt-2 text-cyan-neon/90 hero-blink">▌STREAM_ACTIVE</span>
      </div>
      <div className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-[6] hidden md:flex flex-col gap-1.5 items-end font-mono text-[10px] tracking-widest text-cyan-neon/50 pointer-events-none select-none">
        <span>LATENCY 0.4ms</span>
        <span>NODES 12,847</span>
        <span className="text-cyan-neon font-semibold">DEFENSE_MESH</span>
        <span>∞ SECURE</span>
        <span className="mt-2 text-cyan-neon/90 hero-blink">TRON_LINK_v5▌</span>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-5xl mx-auto">
        <motion.div
          className="mb-5 flex items-center gap-3"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.04, ease }}
        >
          <span className="h-px w-10 bg-gradient-to-r from-transparent to-cyan-neon shadow-[0_0_8px_#00F0FF]" />
          <p className="font-mono text-[11px] md:text-xs tracking-[0.4em] text-cyan-neon uppercase font-semibold">
            // Grid Status: Online
          </p>
          <span className="h-px w-10 bg-gradient-to-l from-transparent to-cyan-neon shadow-[0_0_8px_#00F0FF]" />
        </motion.div>

        <motion.h1
          className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.05] text-neon"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.08, ease }}
        >
          Defend the
          <br />
          <span
            className="bg-gradient-to-r from-cyan-neon via-electric-blue to-cyan-neon bg-clip-text text-transparent"
            style={{
              WebkitBackgroundClip: "text",
              filter:
                "drop-shadow(0 0 18px rgba(0,240,255,0.85)) drop-shadow(0 0 40px rgba(0,136,255,0.4))",
            }}
          >
            Infinite.
          </span>
        </motion.h1>

        <motion.p
          className="mt-6 max-w-xl font-body text-base md:text-lg text-cyan-soft/75 leading-relaxed tracking-wide"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.14, ease }}
        >
          Jack into the Grid. An impregnable fortress of pure light — AI threat
          hunting, quantum encryption, and real-time SOC command against the void.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-col sm:flex-row items-center gap-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.2, ease }}
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
          transition={{ delay: 0.35, duration: 0.3 }}
        >
          <span className="font-mono text-[10px] tracking-[0.35em] text-cyan-neon/50 uppercase">
            Scroll to Descend
          </span>
          <div className="w-px h-10 bg-gradient-to-b from-cyan-neon to-transparent shadow-[0_0_8px_#00F0FF] hero-scroll-line" />
        </motion.div>
      </div>

    </section>
  );
}
