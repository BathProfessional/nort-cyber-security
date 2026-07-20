"use client";

import { useEffect, useRef } from "react";

/**
 * Tron-blue digital rain with sharper, denser letter trails.
 * Full glyph streams (not sparse samples) — still 60fps friendly.
 */
export default function HeroMatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", {
      alpha: false,
      desynchronized: true,
    });
    if (!ctx) return;

    let raf = 0;
    let running = true;
    let w = 0;
    let h = 0;
    let fontSize = 16;
    let colStep = 16;
    let last = 0;
    let frame = 0;

    type Col = {
      y: number;
      speed: number;
      chars: string[];
      blue: boolean;
      bright: number; // 0-1 head intensity
    };

    let columns: Col[] = [];

    // Richer glyph set — katakana + hex + symbols for cooler streams
    const glyphs =
      "ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ" +
      "0123456789ABCDEF<>[]{}|/\\$#@%&*+=:;";
    const gLen = glyphs.length;
    const pick = () => glyphs[(Math.random() * gLen) | 0];

    const HEAD = "#FFFFFF";
    const HEAD_GLOW = "#B8F8FF";
    const CYAN = "#00F0FF";
    const BLUE = "#3DA9FF";

    const makeCol = (spawnY?: number): Col => {
      const len = 12 + ((Math.random() * 18) | 0);
      return {
        y: spawnY ?? Math.random() * (h / fontSize + 10),
        speed: 0.55 + Math.random() * 0.95,
        chars: Array.from({ length: len }, pick),
        blue: Math.random() > 0.5,
        bright: 0.7 + Math.random() * 0.3,
      };
    };

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;

      const mobile = window.innerWidth < 768 || "ontouchstart" in window;
      const dpr = mobile ? 1 : Math.min(window.devicePixelRatio || 1, 1.35);

      w = parent.clientWidth;
      h = parent.clientHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Slightly larger glyphs = more readable / premium
      fontSize = mobile ? 15 : 17;
      colStep = mobile ? 18 : 15;
      const cols = Math.ceil(w / colStep) + 1;
      columns = Array.from({ length: cols }, () => makeCol());

      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, w, h);
      ctx.textBaseline = "top";
      ctx.textAlign = "center";
    };

    let resizeTimer = 0;
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(resize, 120);
    };

    resize();
    window.addEventListener("resize", onResize, { passive: true });

    const onVis = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf);
        raf = 0;
      } else if (!raf && running) {
        last = performance.now();
        raf = requestAnimationFrame(loop);
      }
    };
    document.addEventListener("visibilitychange", onVis);

    const loop = (now: number) => {
      if (!running) return;
      raf = requestAnimationFrame(loop);

      const dt = now - last;
      if (dt < 15) return;
      last = now;
      frame++;

      // Longer trails
      ctx.fillStyle = "rgba(0,0,0,0.055)";
      ctx.fillRect(0, 0, w, h);

      // Clean mono face
      ctx.font = `700 ${fontSize}px "JetBrains Mono", "Courier New", monospace`;
      ctx.textAlign = "center";
      ctx.textBaseline = "top";

      const step = Math.min(dt / 16.67, 2);
      const n = columns.length;

      for (let i = 0; i < n; i++) {
        const col = columns[i];
        const x = i * colStep + colStep * 0.5;
        const len = col.chars.length;

        // Mutate a few trail glyphs (Matrix shimmer)
        if (frame % 2 === 0) {
          const mut = 1 + ((Math.random() * 2) | 0);
          for (let m = 0; m < mut; m++) {
            const idx = 1 + ((Math.random() * (len - 1)) | 0);
            col.chars[idx] = pick();
          }
        }

        for (let j = 0; j < len; j++) {
          const yy = (col.y - j) * fontSize;
          if (yy < -fontSize || yy > h) continue;

          const ch = col.chars[j];
          const t = j / len; // 0 head → 1 tail

          if (j === 0) {
            // Bright white head + soft cyan underglow (2 draws, no shadowBlur)
            ctx.globalAlpha = col.bright;
            ctx.fillStyle = HEAD;
            ctx.fillText(ch, x, yy);
            ctx.globalAlpha = 0.5 * col.bright;
            ctx.fillStyle = HEAD_GLOW;
            ctx.fillText(ch, x + 0.5, yy);
            ctx.globalAlpha = 0.35;
            ctx.fillStyle = col.blue ? BLUE : CYAN;
            ctx.fillText(ch, x, yy);
            ctx.globalAlpha = 1;
          } else if (j === 1) {
            ctx.globalAlpha = 0.95;
            ctx.fillStyle = col.blue ? "#7CC8FF" : "#5CFFFF";
            ctx.fillText(ch, x, yy);
            ctx.globalAlpha = 1;
          } else if (t < 0.35) {
            ctx.globalAlpha = 0.85 - t;
            ctx.fillStyle = col.blue ? BLUE : CYAN;
            ctx.fillText(ch, x, yy);
            ctx.globalAlpha = 1;
          } else if (t < 0.7) {
            ctx.globalAlpha = 0.55 - (t - 0.35) * 0.6;
            ctx.fillStyle = col.blue
              ? "rgba(0,120,220,1)"
              : "rgba(0,180,200,1)";
            ctx.fillText(ch, x, yy);
            ctx.globalAlpha = 1;
          } else {
            ctx.globalAlpha = Math.max(0.08, 0.28 - (t - 0.7) * 0.5);
            ctx.fillStyle = col.blue
              ? "rgba(0,60,140,1)"
              : "rgba(0,100,120,1)";
            ctx.fillText(ch, x, yy);
            ctx.globalAlpha = 1;
          }
        }

        col.y += col.speed * step;

        // Head glyph flickers
        if (frame % 2 === 0) col.chars[0] = pick();

        if ((col.y - len) * fontSize > h) {
          columns[i] = makeCol(-(2 + Math.random() * 18));
        }
      }
    };

    last = performance.now();
    raf = requestAnimationFrame(loop);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVis);
      window.clearTimeout(resizeTimer);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-[1] pointer-events-none"
      style={{ background: "#000", contain: "strict" }}
      aria-hidden
    />
  );
}
