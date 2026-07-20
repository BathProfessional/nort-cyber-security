"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const trailEls = useRef<(HTMLDivElement | null)[]>([]);
  const trailData = useRef<{ x: number; y: number; life: number }[]>([]);
  const lastTrail = useRef(0);
  const rafRef = useRef(0);
  const hoveringRef = useRef(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  // Snappier, less laggy follow
  const springConfig = { damping: 32, stiffness: 700, mass: 0.2 };
  const x = useSpring(cursorX, springConfig);
  const y = useSpring(cursorY, springConfig);

  useEffect(() => {
    const isTouch = window.matchMedia("(hover: none), (pointer: coarse)").matches;
    if (isTouch) return;

    // Pre-allocate trail slots
    trailData.current = Array.from({ length: 8 }, () => ({
      x: 0,
      y: 0,
      life: 0,
    }));

    const onMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setVisible(true);

      const now = performance.now();
      if (now - lastTrail.current > 32) {
        lastTrail.current = now;
        // Find dead trail slot
        const slot = trailData.current.find((t) => t.life <= 0);
        if (slot) {
          slot.x = e.clientX;
          slot.y = e.clientY;
          slot.life = 1;
        } else {
          // Overwrite oldest
          let min = trailData.current[0];
          for (const t of trailData.current) {
            if (t.life < min.life) min = t;
          }
          min.x = e.clientX;
          min.y = e.clientY;
          min.life = 1;
        }
      }

      const el = (e.target as HTMLElement)?.closest?.(
        "a, button, input, textarea, select, [data-cursor='hover'], .service-card, .nav-link"
      );
      const next = !!el;
      if (next !== hoveringRef.current) {
        hoveringRef.current = next;
        setHovering(next);
      }
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    const tick = () => {
      trailData.current.forEach((t, i) => {
        if (t.life > 0) {
          t.life -= 0.07;
          const el = trailEls.current[i];
          if (el) {
            const o = Math.max(0, t.life);
            el.style.opacity = String(o);
            el.style.transform = `translate3d(${t.x}px, ${t.y}px, 0) translate(-50%, -50%) scale(${0.4 + o * 0.6})`;
            el.style.display = o > 0.02 ? "block" : "none";
          }
        }
      });
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      cancelAnimationFrame(rafRef.current);
    };
  }, [cursorX, cursorY]);

  if (!visible) return null;

  return (
    <>
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          ref={(el) => {
            trailEls.current[i] = el;
          }}
          className="cursor-trail pointer-events-none fixed z-[9998] rounded-full will-change-transform"
          style={{
            left: 0,
            top: 0,
            width: 8,
            height: 8,
            display: "none",
            background:
              "radial-gradient(circle, rgba(0,240,255,0.9) 0%, rgba(0,136,255,0.3) 50%, transparent 70%)",
            boxShadow: "0 0 8px rgba(0,240,255,0.5)",
          }}
        />
      ))}

      <motion.div
        className="custom-cursor pointer-events-none fixed z-[9999] mix-blend-screen will-change-transform"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
      >
        <div
          className="relative flex items-center justify-center transition-transform duration-150 ease-out"
          style={{
            width: hovering ? 34 : 14,
            height: hovering ? 34 : 14,
          }}
        >
          <div
            className="absolute inset-0 rounded-full border transition-all duration-150"
            style={{
              borderColor: hovering
                ? "rgba(0, 240, 255, 0.85)"
                : "rgba(0, 240, 255, 0.5)",
              boxShadow: hovering
                ? "0 0 16px rgba(0,240,255,0.7)"
                : "0 0 10px rgba(0,240,255,0.5)",
            }}
          />
          <div
            className="rounded-full"
            style={{
              width: hovering ? 5 : 7,
              height: hovering ? 5 : 7,
              background: "#00F0FF",
              boxShadow:
                "0 0 10px #00F0FF, 0 0 18px rgba(0,240,255,0.7)",
            }}
          />
          {hovering && (
            <>
              <span className="absolute top-0 left-1/2 h-1.5 w-px -translate-x-1/2 -translate-y-1 bg-cyan-neon shadow-[0_0_4px_#00F0FF]" />
              <span className="absolute bottom-0 left-1/2 h-1.5 w-px -translate-x-1/2 translate-y-1 bg-cyan-neon shadow-[0_0_4px_#00F0FF]" />
              <span className="absolute left-0 top-1/2 h-px w-1.5 -translate-x-1 -translate-y-1/2 bg-cyan-neon shadow-[0_0_4px_#00F0FF]" />
              <span className="absolute right-0 top-1/2 h-px w-1.5 translate-x-1 -translate-y-1/2 bg-cyan-neon shadow-[0_0_4px_#00F0FF]" />
            </>
          )}
        </div>
      </motion.div>
    </>
  );
}
