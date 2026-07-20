"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion, useInView } from "framer-motion";

const STATS = [
  { label: "Threats Neutralized", value: 2847391, suffix: "", mono: true },
  { label: "Active Guardians", value: 12847, suffix: "", mono: true },
  { label: "Uptime", value: 99.999, suffix: "%", mono: true },
  { label: "Mean Response", value: 12, suffix: "ms", mono: true },
];

function useCountUp(target: number, active: boolean, duration = 2000) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start: number | null = null;
    let raf: number;
    const isFloat = !Number.isInteger(target);
    const step = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(isFloat ? target * eased : Math.floor(target * eased));
      if (p < 1) raf = requestAnimationFrame(step);
      else setVal(target);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, active, duration]);
  return val;
}

function StatCard({
  stat,
  active,
  index,
}: {
  stat: (typeof STATS)[0];
  active: boolean;
  index: number;
}) {
  const val = useCountUp(stat.value, active, 1800 + index * 200);
  const display =
    stat.suffix === "%"
      ? val.toFixed(3)
      : val.toLocaleString(undefined, { maximumFractionDigits: 0 });

  return (
    <motion.div
      className="glass-panel relative px-5 py-4 rounded-xl text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={active ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.3 + index * 0.1 }}
    >
      <span className="circuit-corner tl" />
      <span className="circuit-corner br" />
      <div className="stat-value font-display text-2xl md:text-3xl font-bold text-neon tabular-nums">
        {display}
        {stat.suffix}
      </div>
      <div className="mt-1 font-mono text-[10px] tracking-widest text-cyan-neon/50 uppercase">
        {stat.label}
      </div>
    </motion.div>
  );
}

/* Canvas-based network globe / lattice */
function NetworkCanvas({ active }: { active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: 0, y: 0 });

  const draw = useCallback(
    (ctx: CanvasRenderingContext2D, w: number, h: number, t: number) => {
      ctx.clearRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;
      const radius = Math.min(w, h) * 0.32;

      // Nodes on sphere
      const nodes: { x: number; y: number; z: number; px: number; py: number }[] = [];
      const N = 48;
      const rotY = t * 0.15 + mouse.current.x * 0.5;
      const rotX = 0.3 + mouse.current.y * 0.3;

      for (let i = 0; i < N; i++) {
        const phi = Math.acos(-1 + (2 * i) / N);
        const theta = Math.sqrt(N * Math.PI) * phi;
        let x = radius * Math.cos(theta) * Math.sin(phi);
        let y = radius * Math.sin(theta) * Math.sin(phi);
        let z = radius * Math.cos(phi);

        // Rotate Y
        const cosY = Math.cos(rotY);
        const sinY = Math.sin(rotY);
        const x1 = x * cosY - z * sinY;
        const z1 = x * sinY + z * cosY;
        // Rotate X
        const cosX = Math.cos(rotX);
        const sinX = Math.sin(rotX);
        const y1 = y * cosX - z1 * sinX;
        const z2 = y * sinX + z1 * cosX;

        nodes.push({
          x: x1,
          y: y1,
          z: z2,
          px: cx + x1,
          py: cy + y1,
        });
      }

      // Connections
      ctx.lineWidth = 0.6;
      for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dz = nodes[i].z - nodes[j].z;
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
          if (dist < radius * 0.85) {
            const depth = (nodes[i].z + nodes[j].z) / 2;
            const alpha = 0.08 + ((depth + radius) / (2 * radius)) * 0.25;
            ctx.strokeStyle = `rgba(0, 240, 255, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(nodes[i].px, nodes[i].py);
            ctx.lineTo(nodes[j].px, nodes[j].py);
            ctx.stroke();
          }
        }
      }

      // Attack vectors (magenta → cyan dissolve)
      const attacks = 5;
      for (let a = 0; a < attacks; a++) {
        const phase = (t * 0.4 + a * 0.7) % 2;
        if (phase > 1.4) continue;
        const angle = a * 1.3 + t * 0.1;
        const progress = phase / 1.4;
        const startR = radius * 2.2;
        const endR = radius * 0.9;
        const r = startR + (endR - startR) * progress;
        const ax = cx + Math.cos(angle) * r;
        const ay = cy + Math.sin(angle) * r * 0.6;

        // Trail
        const grad = ctx.createLinearGradient(
          cx + Math.cos(angle) * startR,
          cy + Math.sin(angle) * startR * 0.6,
          ax,
          ay
        );
        const dissolve = progress > 0.7 ? (progress - 0.7) / 0.3 : 0;
        grad.addColorStop(0, "rgba(255, 34, 102, 0)");
        grad.addColorStop(
          0.7,
          `rgba(255, 34, 102, ${0.5 * (1 - dissolve)})`
        );
        grad.addColorStop(1, `rgba(0, 240, 255, ${0.8 * progress})`);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(
          cx + Math.cos(angle) * startR,
          cy + Math.sin(angle) * startR * 0.6
        );
        ctx.lineTo(ax, ay);
        ctx.stroke();

        // Head
        ctx.beginPath();
        ctx.arc(ax, ay, 2.5, 0, Math.PI * 2);
        ctx.fillStyle =
          progress > 0.75
            ? `rgba(0, 240, 255, ${1 - dissolve})`
            : "rgba(255, 34, 102, 0.9)";
        ctx.fill();
        if (progress > 0.75) {
          ctx.beginPath();
          ctx.arc(ax, ay, 8 * dissolve + 2, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(0, 240, 255, ${0.4 * (1 - dissolve)})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      // Draw nodes
      nodes.forEach((n, i) => {
        const depth = (n.z + radius) / (2 * radius);
        const size = 1.5 + depth * 2.5;
        const pulse = 0.6 + Math.sin(t * 2 + i) * 0.4;
        ctx.beginPath();
        ctx.arc(n.px, n.py, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 240, 255, ${0.3 + depth * 0.6 * pulse})`;
        ctx.fill();
        if (depth > 0.5) {
          ctx.beginPath();
          ctx.arc(n.px, n.py, size + 3, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(0, 240, 255, ${0.15 * depth})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      });

      // Outer ring
      ctx.beginPath();
      ctx.ellipse(cx, cy, radius * 1.15, radius * 0.7, 0, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(0, 240, 255, 0.12)";
      ctx.lineWidth = 1;
      ctx.stroke();

      // Equator glow
      ctx.beginPath();
      ctx.ellipse(cx, cy, radius * 1.05, radius * 0.35, 0, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(0, 136, 255, 0.15)";
      ctx.lineWidth = 0.8;
      ctx.stroke();

      // Data stream arcs
      for (let s = 0; s < 3; s++) {
        const sa = t * (0.5 + s * 0.2) + s * 2;
        ctx.beginPath();
        ctx.arc(cx, cy, radius * (1.3 + s * 0.15), sa, sa + 0.8);
        ctx.strokeStyle = `rgba(0, 240, 255, ${0.2 - s * 0.05})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }
    },
    []
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !active) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;
    let running = true;

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (!rect) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current = {
        x: ((e.clientX - rect.left) / rect.width) * 2 - 1,
        y: -(((e.clientY - rect.top) / rect.height) * 2 - 1),
      };
    };
    canvas.addEventListener("mousemove", onMove);

    const start = performance.now();
    const loop = (now: number) => {
      if (!running) return;
      const t = (now - start) / 1000;
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (rect) draw(ctx, rect.width, rect.height, t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", onMove);
    };
  }, [active, draw]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ touchAction: "none" }}
    />
  );
}

export default function CommandLattice() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="intelligence"
      className="relative z-10 py-24 md:py-32 px-4"
      ref={ref}
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="font-mono text-[10px] md:text-xs tracking-[0.4em] text-cyan-neon/60 uppercase mb-3">
            // Live Command Lattice
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-neon tracking-wide">
            Threat Visualization
          </h2>
          <div className="mt-4 mx-auto w-24 h-px bg-gradient-to-r from-transparent via-cyan-neon to-transparent" />
        </motion.div>

        {/* Main holographic panel */}
        <motion.div
          className="glass-panel-intense relative rounded-2xl overflow-hidden"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.9, delay: 0.15 }}
        >
          <span className="circuit-corner tl" />
          <span className="circuit-corner tr" />
          <span className="circuit-corner bl" />
          <span className="circuit-corner br" />

          {/* Header bar */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-cyan-neon/15">
            <div className="flex items-center gap-3">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-neon opacity-50" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-neon" />
              </span>
              <span className="font-mono text-[10px] md:text-xs tracking-widest text-cyan-neon/80 uppercase">
                Global Defense Mesh — Live Feed
              </span>
            </div>
            <span className="font-mono text-[10px] text-cyan-neon/40 hidden sm:block">
              GRID://SECTOR.OMEGA
            </span>
          </div>

          {/* Canvas area */}
          <div className="relative h-[320px] md:h-[420px] bg-black/40">
            <NetworkCanvas active={inView} />
            {/* Edge fade */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/50 via-transparent to-black/20" />
            {/* Side data streams */}
            <div className="absolute left-3 top-4 bottom-4 w-16 hidden md:flex flex-col justify-between opacity-40 font-mono text-[8px] text-cyan-neon leading-tight overflow-hidden">
              {Array.from({ length: 12 }).map((_, i) => (
                <motion.span
                  key={i}
                  animate={{ opacity: [0.2, 0.8, 0.2] }}
                  transition={{ duration: 2, delay: i * 0.2, repeat: Infinity }}
                >
                  {Math.random().toString(16).slice(2, 10).toUpperCase()}
                </motion.span>
              ))}
            </div>
            <div className="absolute right-3 top-4 bottom-4 w-16 hidden md:flex flex-col justify-between opacity-40 font-mono text-[8px] text-right text-electric-blue leading-tight overflow-hidden">
              {Array.from({ length: 12 }).map((_, i) => (
                <motion.span
                  key={i}
                  animate={{ opacity: [0.2, 0.7, 0.2] }}
                  transition={{ duration: 2.2, delay: i * 0.15, repeat: Infinity }}
                >
                  0x{Math.random().toString(16).slice(2, 8).toUpperCase()}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-4 md:p-5 border-t border-cyan-neon/15">
            {STATS.map((s, i) => (
              <StatCard key={s.label} stat={s} active={inView} index={i} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
