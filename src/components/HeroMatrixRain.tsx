"use client";

import { useEffect, useRef } from "react";
import { useIsMobile } from "@/hooks/useMousePosition";

/**
 * Matrix-style digital rain in Tron neon cyan / electric blue.
 * Dense cascading code that matches the rest of the Nort Cyber Security Grid.
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
    let fontSize = isMobile ? 14 : 16;
    let cols = 0;

    type Col = {
      y: number;
      speed: number;
      len: number;
      chars: string[];
      blue: boolean; // electric blue accent column
    };
    let columns: Col[] = [];

    const glyphs =
      "ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ0123456789ABCDEF<>[]{}|/\\$#@%&*";

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

      fontSize = isMobile ? 14 : 16;
      cols = Math.ceil(w / (fontSize * 0.95)) + 2;
      columns = Array.from({ length: cols }, () => {
        const len = 10 + ((Math.random() * 26) | 0);
        return {
          y: Math.random() * (h / fontSize),
          speed: 0.5 + Math.random() * 1.25,
          len,
          chars: Array.from({ length: len }, randChar),
          blue: Math.random() > 0.78,
        };
      });

      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, w, h);
    };

    resize();
    window.addEventListener("resize", resize);

    let frame = 0;
    const draw = () => {
      if (!running) return;
      frame++;

      // Trail fade — keeps long luminous streams
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, w, h);

      ctx.font = `600 ${fontSize}px "JetBrains Mono", "Courier New", monospace`;
      ctx.textBaseline = "top";

      for (let i = 0; i < columns.length; i++) {
        const col = columns[i];
        const x = i * fontSize * 0.95;

        if (frame % 2 === 0) {
          for (let c = 0; c < col.chars.length; c++) {
            if (Math.random() > 0.9) col.chars[c] = randChar();
          }
        }

        for (let j = 0; j < col.len; j++) {
          const yy = (col.y - j) * fontSize;
          if (yy < -fontSize || yy > h + fontSize) continue;

          const ch = col.chars[j] || randChar();
          const t = j / Math.max(col.len, 1);

          if (j === 0) {
            // Bright white-cyan head (Tron light-cycle tip)
            ctx.fillStyle = "#E0F7FF";
            ctx.shadowColor = col.blue ? "#0088FF" : "#00F0FF";
            ctx.shadowBlur = 14;
            ctx.fillText(ch, x, yy);
            ctx.shadowBlur = 0;
          } else if (j < 3) {
            ctx.fillStyle = col.blue ? "#4DB8FF" : "#00F0FF";
            ctx.shadowColor = col.blue ? "#0088FF" : "#00F0FF";
            ctx.shadowBlur = 8;
            ctx.fillText(ch, x, yy);
            ctx.shadowBlur = 0;
          } else if (t < 0.45) {
            ctx.fillStyle = col.blue
              ? `rgba(0, 136, 255, ${0.8 - t * 0.9})`
              : `rgba(0, 240, 255, ${0.8 - t * 0.9})`;
            ctx.fillText(ch, x, yy);
          } else {
            ctx.fillStyle = col.blue
              ? `rgba(0, 80, 160, ${0.4 - (t - 0.45) * 0.45})`
              : `rgba(0, 120, 140, ${0.4 - (t - 0.45) * 0.45})`;
            ctx.fillText(ch, x, yy);
          }
        }

        col.y += col.speed;

        if ((col.y - col.len) * fontSize > h) {
          col.y = -(Math.random() * 28 + 4);
          col.speed = 0.5 + Math.random() * 1.3;
          col.len = 10 + ((Math.random() * 28) | 0);
          col.chars = Array.from({ length: col.len }, randChar);
          col.blue = Math.random() > 0.78;
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
      style={{ background: "#000" }}
      aria-hidden
    />
  );
}
