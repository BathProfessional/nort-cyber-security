"use client";

import { useEffect, useRef } from "react";

/** Atmospheric Tron-blue rain — dimmer so the hero UI can pop */
export default function HeroMatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false, desynchronized: true });
    if (!ctx) return;

    let raf = 0;
    let running = true;
    let w = 0;
    let h = 0;
    let fontSize = 14;
    let colStep = 20;
    let last = 0;
    let frame = 0;

    type Col = { y: number; speed: number; chars: string[]; blue: boolean };
    let columns: Col[] = [];

    const glyphs =
      "ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ0123456789ABCDEF";
    const gLen = glyphs.length;
    const pick = () => glyphs[(Math.random() * gLen) | 0];

    const makeCol = (y?: number): Col => {
      const len = 10 + ((Math.random() * 14) | 0);
      return {
        y: y ?? Math.random() * 40,
        speed: 0.4 + Math.random() * 0.7,
        chars: Array.from({ length: len }, pick),
        blue: Math.random() > 0.5,
      };
    };

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const mobile = window.innerWidth < 768;
      const dpr = mobile ? 1 : Math.min(window.devicePixelRatio || 1, 1.25);
      w = parent.clientWidth;
      h = parent.clientHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      fontSize = mobile ? 13 : 15;
      colStep = mobile ? 24 : 20;
      columns = Array.from({ length: Math.ceil(w / colStep) + 1 }, () =>
        makeCol(Math.random() * (h / fontSize))
      );
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, w, h);
    };

    let t = 0;
    const onResize = () => {
      clearTimeout(t);
      t = window.setTimeout(resize, 120) as unknown as number;
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
      if (dt < 16) return;
      last = now;
      frame++;

      ctx.fillStyle = "rgba(0,0,0,0.08)";
      ctx.fillRect(0, 0, w, h);
      ctx.font = `600 ${fontSize}px "Courier New", monospace`;
      ctx.textAlign = "center";
      ctx.textBaseline = "top";

      const step = Math.min(dt / 16.67, 2);
      for (let i = 0; i < columns.length; i++) {
        const col = columns[i];
        const x = i * colStep + colStep * 0.5;
        const len = col.chars.length;

        if (frame % 3 === 0) {
          col.chars[((Math.random() * len) | 0)] = pick();
        }

        for (let j = 0; j < len; j++) {
          const yy = (col.y - j) * fontSize;
          if (yy < -fontSize || yy > h) continue;
          const t = j / len;
          if (j === 0) {
            ctx.globalAlpha = 0.55;
            ctx.fillStyle = "#E8FCFF";
            ctx.fillText(col.chars[j], x, yy);
            ctx.globalAlpha = 0.25;
            ctx.fillStyle = col.blue ? "#0088FF" : "#00F0FF";
            ctx.fillText(col.chars[j], x, yy);
          } else if (t < 0.4) {
            ctx.globalAlpha = 0.22 - t * 0.15;
            ctx.fillStyle = col.blue ? "#0088FF" : "#00F0FF";
            ctx.fillText(col.chars[j], x, yy);
          } else {
            ctx.globalAlpha = 0.08;
            ctx.fillStyle = "#0055AA";
            ctx.fillText(col.chars[j], x, yy);
          }
          ctx.globalAlpha = 1;
        }

        col.y += col.speed * step;
        if (frame % 2 === 0) col.chars[0] = pick();
        if ((col.y - len) * fontSize > h) columns[i] = makeCol(-(3 + Math.random() * 12));
      }
    };

    last = performance.now();
    raf = requestAnimationFrame(loop);
    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-[1] pointer-events-none opacity-70"
      style={{ background: "#000" }}
      aria-hidden
    />
  );
}
