"use client";

import { useEffect, useRef } from "react";
import { useIsMobile } from "@/hooks/useMousePosition";

/** Classic Matrix-style digital rain — cyan/blue Tron palette */
export default function HeroMatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let raf = 0;
    let running = true;
    let w = 0;
    let h = 0;
    let cols = 0;
    let drops: number[] = [];
    let speeds: number[] = [];

    const glyphs =
      "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンABCDEF<>[]{}|/\\$#@%&*";

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      w = parent.clientWidth;
      h = parent.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const fontSize = isMobile ? 14 : 16;
      cols = Math.floor(w / fontSize);
      drops = Array.from({ length: cols }, () => Math.random() * -40);
      speeds = Array.from({ length: cols }, () => 0.35 + Math.random() * 0.9);
    };

    resize();
    window.addEventListener("resize", resize);

    const fontSize = () => (isMobile ? 14 : 16);

    const draw = () => {
      if (!running) return;

      // Fade trail
      ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
      ctx.fillRect(0, 0, w, h);

      const fs = fontSize();
      ctx.font = `${fs}px "JetBrains Mono", monospace`;

      for (let i = 0; i < drops.length; i++) {
        const x = i * fs;
        const y = drops[i] * fs;
        const char = glyphs[Math.floor(Math.random() * glyphs.length)];

        // Head glow (bright cyan)
        ctx.fillStyle = "#E0F7FF";
        ctx.shadowColor = "#00F0FF";
        ctx.shadowBlur = 8;
        ctx.fillText(char, x, y);

        // Trail body
        ctx.shadowBlur = 0;
        ctx.fillStyle =
          i % 11 === 0
            ? "rgba(255, 0, 170, 0.45)"
            : "rgba(0, 240, 255, 0.35)";
        ctx.fillText(
          glyphs[Math.floor(Math.random() * glyphs.length)],
          x,
          y - fs
        );
        ctx.fillStyle = "rgba(0, 136, 255, 0.2)";
        ctx.fillText(
          glyphs[Math.floor(Math.random() * glyphs.length)],
          x,
          y - fs * 2
        );

        if (y > h && Math.random() > 0.975) {
          drops[i] = Math.random() * -20;
        }
        drops[i] += speeds[i];
      }

      raf = requestAnimationFrame(draw);
    };

    // Clear once so we don't start fully black opaque
    ctx.clearRect(0, 0, w, h);
    raf = requestAnimationFrame(draw);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [isMobile]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-[1] pointer-events-none opacity-40 mix-blend-screen"
      aria-hidden
    />
  );
}
