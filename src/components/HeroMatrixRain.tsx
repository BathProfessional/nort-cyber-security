"use client";

import { useEffect, useRef } from "react";
import { useIsMobile } from "@/hooks/useMousePosition";

/**
 * Full-screen classic Matrix digital rain.
 * High density, bright green, long trails — impossible to miss.
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
    let fontSize = isMobile ? 14 : 17;
    let cols = 0;

    type Col = {
      y: number;
      speed: number;
      len: number;
      chars: string[];
    };
    let columns: Col[] = [];

    // Katakana + digits — classic Matrix look
    const glyphs =
      "ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ0123456789";

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

      fontSize = isMobile ? 14 : 17;
      // Slightly tighter columns = denser rain
      cols = Math.ceil(w / (fontSize * 0.92)) + 2;
      columns = Array.from({ length: cols }, () => {
        const len = 12 + ((Math.random() * 28) | 0);
        return {
          y: Math.random() * (h / fontSize),
          speed: 0.55 + Math.random() * 1.4,
          len,
          chars: Array.from({ length: len }, randChar),
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

      // Longer green trails (slower fade = more Matrix)
      ctx.fillStyle = "rgba(0, 0, 0, 0.045)";
      ctx.fillRect(0, 0, w, h);

      ctx.font = `700 ${fontSize}px "Courier New", "JetBrains Mono", monospace`;
      ctx.textBaseline = "top";

      for (let i = 0; i < columns.length; i++) {
        const col = columns[i];
        const x = i * fontSize * 0.92;

        if (frame % 2 === 0) {
          for (let c = 0; c < col.chars.length; c++) {
            if (Math.random() > 0.88) col.chars[c] = randChar();
          }
        }

        for (let j = 0; j < col.len; j++) {
          const yy = (col.y - j) * fontSize;
          if (yy < -fontSize || yy > h + fontSize) continue;

          const ch = col.chars[j] || randChar();
          const t = j / Math.max(col.len, 1);

          if (j === 0) {
            // Bright white head (iconic Matrix look)
            ctx.fillStyle = "#E8FFE8";
            ctx.shadowColor = "#00FF41";
            ctx.shadowBlur = 16;
            ctx.fillText(ch, x, yy);
            ctx.shadowBlur = 0;
          } else if (j === 1) {
            ctx.fillStyle = "#A8FFA8";
            ctx.shadowColor = "#00FF41";
            ctx.shadowBlur = 8;
            ctx.fillText(ch, x, yy);
            ctx.shadowBlur = 0;
          } else if (j < 4) {
            ctx.fillStyle = "#00FF41";
            ctx.fillText(ch, x, yy);
          } else if (t < 0.5) {
            ctx.fillStyle = `rgba(0, 255, 65, ${0.85 - t})`;
            ctx.fillText(ch, x, yy);
          } else {
            ctx.fillStyle = `rgba(0, 160, 40, ${0.55 - (t - 0.5) * 0.7})`;
            ctx.fillText(ch, x, yy);
          }
        }

        col.y += col.speed;

        if ((col.y - col.len) * fontSize > h) {
          col.y = -(Math.random() * 30 + 5);
          col.speed = 0.55 + Math.random() * 1.45;
          col.len = 12 + ((Math.random() * 30) | 0);
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
      style={{ background: "#000" }}
      aria-hidden
    />
  );
}
