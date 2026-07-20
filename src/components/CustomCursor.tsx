"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface TrailPoint {
  x: number;
  y: number;
  id: number;
  opacity: number;
}

export default function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [trails, setTrails] = useState<TrailPoint[]>([]);
  const idRef = useRef(0);
  const lastTrail = useRef(0);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springConfig = { damping: 28, stiffness: 400, mass: 0.4 };
  const x = useSpring(cursorX, springConfig);
  const y = useSpring(cursorY, springConfig);

  useEffect(() => {
    const isTouch = window.matchMedia("(hover: none), (pointer: coarse)").matches;
    if (isTouch) return;

    const onMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setVisible(true);

      const now = performance.now();
      if (now - lastTrail.current > 24) {
        lastTrail.current = now;
        const id = idRef.current++;
        setTrails((prev) => {
          const next = [...prev, { x: e.clientX, y: e.clientY, id, opacity: 1 }];
          return next.slice(-14);
        });
      }
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    const checkHover = (e: MouseEvent) => {
      const el = (e.target as HTMLElement)?.closest?.(
        "a, button, input, textarea, select, [data-cursor='hover'], .service-card, .nav-link"
      );
      setHovering(!!el);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousemove", checkHover, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    const fade = setInterval(() => {
      setTrails((prev) =>
        prev
          .map((t) => ({ ...t, opacity: t.opacity - 0.08 }))
          .filter((t) => t.opacity > 0)
      );
    }, 40);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousemove", checkHover);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      clearInterval(fade);
    };
  }, [cursorX, cursorY]);

  if (!visible) return null;

  return (
    <>
      {/* Light-cycle trails */}
      {trails.map((t) => (
        <div
          key={t.id}
          className="cursor-trail pointer-events-none fixed z-[9998] rounded-full"
          style={{
            left: t.x,
            top: t.y,
            width: 6 * t.opacity + 2,
            height: 6 * t.opacity + 2,
            transform: "translate(-50%, -50%)",
            background: `radial-gradient(circle, rgba(0,240,255,${t.opacity * 0.9}) 0%, rgba(0,136,255,${t.opacity * 0.3}) 50%, transparent 70%)`,
            boxShadow: `0 0 ${8 * t.opacity}px rgba(0,240,255,${t.opacity * 0.6})`,
            opacity: t.opacity,
          }}
        />
      ))}

      {/* Core orb */}
      <motion.div
        className="custom-cursor pointer-events-none fixed z-[9999] mix-blend-screen"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
      >
        <div
          className="relative flex items-center justify-center transition-all duration-200"
          style={{
            width: hovering ? 36 : 16,
            height: hovering ? 36 : 16,
          }}
        >
          {/* Outer ring scan */}
          <div
            className="absolute inset-0 rounded-full border transition-all duration-200"
            style={{
              borderColor: hovering
                ? "rgba(0, 240, 255, 0.8)"
                : "rgba(0, 240, 255, 0.5)",
              boxShadow: hovering
                ? "0 0 20px rgba(0,240,255,0.7), inset 0 0 10px rgba(0,240,255,0.3)"
                : "0 0 12px rgba(0,240,255,0.5)",
              transform: hovering ? "scale(1)" : "scale(1)",
            }}
          />
          {/* Core */}
          <div
            className="rounded-full transition-all duration-200"
            style={{
              width: hovering ? 6 : 8,
              height: hovering ? 6 : 8,
              background: "#00F0FF",
              boxShadow:
                "0 0 10px #00F0FF, 0 0 20px rgba(0,240,255,0.8), 0 0 40px rgba(0,136,255,0.4)",
            }}
          />
          {/* Crosshair ticks when hovering */}
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
