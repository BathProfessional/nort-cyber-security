"use client";

import { useEffect, useRef } from "react";
import { useIsMobile } from "@/hooks/useMousePosition";

/**
 * Classic Matrix digital rain — dense green cascading code.
 * Full-bleed, high intensity, movie-style.
 */
export default function HeroMatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let raf = 0;
    let running = true;
    let w = 0;
    let h = 0;
    let fontSize = isMobile ? 13 : 15;
    let cols = 0;

    // Per-column state for longer, more cinematic trails
    type Col = {
      y: number;
      speed: number;
      len: number;
      chars: string[];
    };
    let columns: Col[] = [];

    const glyphs =
      "ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ0123456789ABCDEF<>[]{}|/\\$#@%&*+=:;";

    const randChar = () => glyphs[(Math.random() * glyphs.length) | 0];

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      w = parent.clientWidth;
      h = parent.clientHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      fontSize = isMobile ? 13 : 15;
      cols = Math.ceil(w / fontSize) + 1;
      columns = Array.from({ length: cols }, () => {
        const len = 8 + ((Math.random() * 22) | 0);
        return {
          y: Math.random() * -60,
          speed: 0.45 + Math.random() * 1.1,
          len,
          chars: Array.from({ length: len }, randChar),
        };
      });

      // Solid black base
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, w, h);
    };

    resize();
    window.addEventListener("resize", resize);

    let frame = 0;
    const draw = () => {
      if (!running) return;
      frame++;

      // Classic Matrix trail fade (darker = longer trails)
      ctx.fillStyle = "rgba(0, 0, 0, 0.055)";
      ctx.fillRect(0, 0, w, h);

      ctx.font = `600 ${fontSize}px "JetBrains Mono", "Courier New", monospace`;
      ctx.textBaseline = "top";

      for (let i = 0; i < columns.length; i++) {
        const col = columns[i];
        const x = i * fontSize;

        // Occasionally scramble trail characters
        if (frame % 3 === 0) {
          for (let c = 0; c < col.chars.length; c++) {
            if (Math.random() > 0.92) col.chars[c] = randChar();
          }
        }

        for (let j = 0; j < col.len; j++) {
          const yy = (col.y - j) * fontSize;
          if (yy < -fontSize || yy > h + fontSize) continue;

          const ch = col.chars[j] || randChar();
          const t = j / col.len; // 0 = head, 1 = tail

          if (j === 0) {
            // Bright white-green head
            ctx.fillStyle = "#C8FFC8";
            ctx.shadowColor = "#00FF41";
            ctx.shadowBlur = 12;
            ctx.fillText(ch, x, yy);
            ctx.shadowBlur = 0;
          } else if (j < 3) {
            ctx.fillStyle = "#00FF41";
            ctx.shadowColor = "#00FF41";
            ctx.shadowBlur = 6;
            ctx.fillText(ch, x, yy);
            ctx.shadowBlur = 0;
          } else if (t < 0.45) {
            ctx.fillStyle = `rgba(0, 255, 65, ${0.75 - t * 0.8})`;
            ctx.fillText(ch, x, yy);
          } else {
            ctx.fillStyle = `rgba(0, 140, 30, ${0.45 - (t - 0.45) * 0.5})`;
            ctx.fillText(ch, x, yy);
          }
        }

        col.y += col.speed;

        // Reset column past bottom
        if ((col.y - col.len) * fontSize > h) {
          col.y = Math.random() * -40;
          col.speed = 0.45 + Math.random() * 1.15;
          col.len = 8 + ((Math.random() * 24) | 0);
          col.chars = Array.from({ length: col.len }, randChar);
        }
      }

      raf = requestAnimationFrame(draw);
    };

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
      className="absolute inset-0 z-[1] pointer-events-none"
      aria-hidden
    />
  );
}
