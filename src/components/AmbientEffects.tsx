"use client";

import { useMemo, useRef, useEffect } from "react";
import { useMousePosition } from "@/hooks/useMousePosition";

export default function AmbientEffects() {
  const { normalized } = useMousePosition();
  const wallRef = useRef<HTMLDivElement>(null);
  const floorRef = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });

  useEffect(() => {
    target.current = { x: normalized.x, y: normalized.y };
  }, [normalized.x, normalized.y]);

  // Smooth lerp parallax via rAF — no React re-renders
  useEffect(() => {
    let raf = 0;
    const tick = () => {
      current.current.x += (target.current.x - current.current.x) * 0.12;
      current.current.y += (target.current.y - current.current.y) * 0.12;
      if (wallRef.current) {
        wallRef.current.style.transform = `translate3d(${current.current.x * 10}px, ${-current.current.y * 6}px, 0)`;
      }
      if (floorRef.current) {
        floorRef.current.style.transform = `perspective(600px) rotateX(60deg) scale(2.5) translateY(-10%) translate3d(${current.current.x * 16}px, 0, 0)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const particles = useMemo(
    () =>
      Array.from({ length: 22 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 0.5,
        duration: Math.random() * 5 + 4,
        delay: Math.random() * 3,
      })),
    []
  );

  const binaryCols = useMemo(
    () =>
      Array.from({ length: 6 }).map((_, i) => ({
        id: i,
        left: 8 + i * 15 + Math.random() * 2,
        delay: Math.random() * 4,
        duration: 8 + Math.random() * 6,
        content: Array.from({ length: 18 })
          .map(() => (Math.random() > 0.5 ? "1" : "0"))
          .join(""),
      })),
    []
  );

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <div
        ref={wallRef}
        className="tron-grid-wall absolute inset-0 will-change-transform"
      />

      <div
        className="absolute bottom-0 left-0 right-0 h-[55vh] overflow-hidden"
        style={{ perspective: "600px" }}
      >
        <div ref={floorRef} className="tron-grid-floor will-change-transform" />
      </div>

      <div className="horizon-glow absolute top-[48%] opacity-50" />

      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 40%, transparent 0%, rgba(0,0,0,0.4) 70%, #000 100%)",
        }}
      />

      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-cyan-neon animate-float"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            boxShadow: `0 0 ${p.size * 3}px rgba(0,240,255,0.5)`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            opacity: 0.35,
          }}
        />
      ))}

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

      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[320px] rounded-full opacity-15"
        style={{
          background:
            "radial-gradient(ellipse, rgba(0,240,255,0.25) 0%, rgba(0,136,255,0.08) 40%, transparent 70%)",
          filter: "blur(32px)",
        }}
      />
    </div>
  );
}
