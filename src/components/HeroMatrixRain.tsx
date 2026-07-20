"use client";

import { useEffect, useRef } from "react";

/**
 * High-performance Tron-blue digital rain.
 * Optimized for 60fps: no shadowBlur, capped DPR, sparse columns, precomputed colors.
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
    let fontSize = 15;
    let colStep = 18;
    let last = 0;

    type Col = {
      y: number;
      speed: number;
      len: number;
      head: number; // glyph index for head
      blue: boolean;
    };

    let columns: Col[] = [];

    // Compact glyph set — faster random
    const glyphs =
      "ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ0123456789";
    const gLen = glyphs.length;
    const randG = () => glyphs[(Math.random() * gLen) | 0];

    // Precomputed colors (avoid string alloc every glyph)
    const HEAD = "#E8FCFF";
    const CYAN = "#00F0FF";
    const CYAN_MID = "rgba(0,240,255,0.55)";
    const CYAN_TAIL = "rgba(0,160,200,0.22)";
    const BLUE = "#3DA9FF";
    const BLUE_MID = "rgba(0,136,255,0.5)";
    const BLUE_TAIL = "rgba(0,80,180,0.2)";

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;

      const mobile = window.innerWidth < 768 || "ontouchstart" in window;
      // Cap DPR hard for smooth 60fps
      const dpr = mobile ? 1 : Math.min(window.devicePixelRatio || 1, 1.25);

      w = parent.clientWidth;
      h = parent.clientHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      fontSize = mobile ? 14 : 16;
      colStep = mobile ? 22 : 18; // fewer columns = smoother
      const cols = Math.ceil(w / colStep) + 1;

      columns = Array.from({ length: cols }, () => ({
        y: Math.random() * (h / fontSize),
        speed: 0.65 + Math.random() * 1.1,
        len: 8 + ((Math.random() * 16) | 0),
        head: (Math.random() * gLen) | 0,
        blue: Math.random() > 0.55,
      }));

      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, w, h);
      ctx.font = `600 ${fontSize}px "Courier New", monospace`;
      ctx.textBaseline = "top";
    };

    // Debounced resize
    let resizeTimer = 0;
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(resize, 120);
    };

    resize();
    window.addEventListener("resize", onResize, { passive: true });

    // Pause when tab hidden
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

      // Cap ~60fps, skip if tab lag spikes
      const dt = now - last;
      if (dt < 14) return; // ~70fps max work
      last = now;

      // Trail fade
      ctx.fillStyle = "rgba(0,0,0,0.065)";
      ctx.fillRect(0, 0, w, h);

      ctx.font = `600 ${fontSize}px "Courier New", monospace`;

      const n = columns.length;
      for (let i = 0; i < n; i++) {
        const col = columns[i];
        const x = i * colStep;
        const yPx = col.y * fontSize;

        // Head only — bright tip (fake glow: draw twice)
        const headChar = glyphs[col.head];
        ctx.fillStyle = HEAD;
        ctx.fillText(headChar, x, yPx);
        ctx.globalAlpha = 0.45;
        ctx.fillStyle = col.blue ? BLUE : CYAN;
        ctx.fillText(headChar, x, yPx);
        ctx.globalAlpha = 1;

        // Trail — 3 samples only (not full length) for speed + cool look
        const mid = (col.len * 0.35) | 0;
        const far = col.len - 1;

        ctx.fillStyle = col.blue ? BLUE : CYAN;
        ctx.fillText(randG(), x, yPx - fontSize);

        if (mid > 1) {
          ctx.fillStyle = col.blue ? BLUE_MID : CYAN_MID;
          ctx.fillText(randG(), x, yPx - mid * fontSize);
        }

        ctx.fillStyle = col.blue ? BLUE_TAIL : CYAN_TAIL;
        ctx.fillText(randG(), x, yPx - far * fontSize);

        // Advance
        col.y += col.speed * Math.min(dt / 16.67, 2);

        // Occasionally flash head glyph
        if (((now / 16) | 0) % 3 === 0) {
          col.head = (Math.random() * gLen) | 0;
        }

        if ((col.y - col.len) * fontSize > h) {
          col.y = -(2 + Math.random() * 20);
          col.speed = 0.65 + Math.random() * 1.15;
          col.len = 8 + ((Math.random() * 16) | 0);
          col.blue = Math.random() > 0.55;
          col.head = (Math.random() * gLen) | 0;
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
      style={{
        background: "#000",
        contain: "strict",
        willChange: "contents",
      }}
      aria-hidden
    />
  );
}
