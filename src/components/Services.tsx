"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const SERVICES = [
  {
    id: "ai-hunt",
    title: "AI Threat Hunting",
    desc: "Autonomous neural agents that prowl the Grid, identifying zero-day vectors before they materialize. Predictive neutralization at machine speed.",
    icon: "hunt",
    accent: "#00F0FF",
  },
  {
    id: "quantum",
    title: "Quantum-Resistant Encryption",
    desc: "Post-quantum cryptographic lattices that remain impregnable against both classical and quantum adversaries. Keys forged in pure entropy.",
    icon: "quantum",
    accent: "#0088FF",
  },
  {
    id: "zerotrust",
    title: "Neural Zero-Trust Architecture",
    desc: "Every packet, process, and identity continuously verified. Trust is never assumed — it is continuously earned through living neural policy.",
    icon: "zerotrust",
    accent: "#00F0FF",
  },
  {
    id: "soc",
    title: "Real-Time SOC Command",
    desc: "Unified command lattice with holographic threat visualization. Operators see the entire battlespace as streams of light and energy.",
    icon: "soc",
    accent: "#FF00AA",
  },
];

function ServiceIcon({ type, accent }: { type: string; accent: string }) {
  const common = {
    fill: "none",
    stroke: accent,
    strokeWidth: 1.2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  if (type === "hunt") {
    return (
      <svg width="48" height="48" viewBox="0 0 48 48">
        <motion.circle
          cx="22"
          cy="22"
          r="12"
          {...common}
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          transition={{ duration: 1 }}
        />
        <motion.path
          d="M30 30 L40 40"
          {...common}
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        />
        <motion.circle
          cx="22"
          cy="22"
          r="4"
          fill={accent}
          opacity={0.4}
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ delay: 0.5 }}
          style={{ transformOrigin: "22px 22px" }}
        />
        <motion.path
          d="M14 22 L18 22 M26 22 L30 22 M22 14 L22 18 M22 26 L22 30"
          {...common}
          strokeWidth={1}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        />
      </svg>
    );
  }

  if (type === "quantum") {
    return (
      <svg width="48" height="48" viewBox="0 0 48 48">
        <motion.rect
          x="12"
          y="18"
          width="24"
          height="18"
          rx="2"
          {...common}
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          transition={{ duration: 0.8 }}
        />
        <motion.path
          d="M18 18 V14 Q18 8 24 8 Q30 8 30 14 V18"
          {...common}
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        />
        <motion.circle
          cx="24"
          cy="27"
          r="3"
          fill={accent}
          initial={{ scale: 0 }}
          whileInView={{ scale: [0, 1.2, 1] }}
          transition={{ delay: 0.6 }}
          style={{ transformOrigin: "24px 27px", filter: `drop-shadow(0 0 6px ${accent})` }}
        />
        <motion.path
          d="M8 24 L12 24 M36 24 L40 24 M24 40 L24 44"
          {...common}
          strokeWidth={1}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.7 }}
          transition={{ delay: 0.8 }}
        />
      </svg>
    );
  }

  if (type === "zerotrust") {
    return (
      <svg width="48" height="48" viewBox="0 0 48 48">
        <motion.path
          d="M24 6 L40 14 L40 26 Q40 38 24 44 Q8 38 8 26 L8 14 Z"
          {...common}
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          transition={{ duration: 1 }}
        />
        <motion.path
          d="M24 16 L32 20 L32 28 Q32 34 24 38 Q16 34 16 28 L16 20 Z"
          {...common}
          strokeWidth={1}
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        />
        <motion.path
          d="M20 26 L23 29 L29 22"
          {...common}
          strokeWidth={1.5}
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        />
      </svg>
    );
  }

  // SOC
  return (
    <svg width="48" height="48" viewBox="0 0 48 48">
      <motion.circle
        cx="24"
        cy="24"
        r="14"
        {...common}
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        transition={{ duration: 1 }}
      />
      <motion.circle
        cx="24"
        cy="24"
        r="7"
        {...common}
        strokeWidth={1}
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        transition={{ duration: 0.7, delay: 0.3 }}
      />
      {[0, 60, 120, 180, 240, 300].map((deg, i) => {
        const rad = (deg * Math.PI) / 180;
        const x = 24 + Math.cos(rad) * 14;
        const y = 24 + Math.sin(rad) * 14;
        return (
          <motion.circle
            key={i}
            cx={x}
            cy={y}
            r="2"
            fill={accent}
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ delay: 0.5 + i * 0.08 }}
            style={{ transformOrigin: `${x}px ${y}px` }}
          />
        );
      })}
      <motion.circle
        cx="24"
        cy="24"
        r="2.5"
        fill={accent}
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{ delay: 0.4 }}
        style={{ transformOrigin: "24px 24px", filter: `drop-shadow(0 0 6px ${accent})` }}
      />
    </svg>
  );
}

function ServiceCard({
  service,
  index,
}: {
  service: (typeof SERVICES)[0];
  index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.article
      ref={ref}
      className="service-card glass-panel relative p-6 md:p-8 rounded-2xl overflow-hidden group"
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      data-cursor="hover"
    >
      <span className="circuit-corner tl" />
      <span className="circuit-corner tr" />
      <span className="circuit-corner bl" />
      <span className="circuit-corner br" />

      {/* Living circuit background */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
          <motion.line
            x1="0"
            y1="50%"
            x2="100%"
            y2="50%"
            stroke={service.accent}
            strokeWidth="0.5"
            strokeOpacity="0.15"
            initial={{ pathLength: 0 }}
            whileHover={{ pathLength: 1 }}
          />
        </svg>
        <div
          className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl opacity-30"
          style={{ background: service.accent }}
        />
      </div>

      {/* Index */}
      <span className="font-mono text-[10px] tracking-widest text-cyan-neon/40">
        0{index + 1} //
      </span>

      <div className="mt-4 mb-5 relative">
        <ServiceIcon type={service.icon} accent={service.accent} />
        {/* Pulse ring on hover */}
        <div
          className="absolute -inset-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            boxShadow: `0 0 30px ${service.accent}40`,
          }}
        />
      </div>

      <h3 className="font-display text-lg md:text-xl font-bold tracking-wide text-neon-soft mb-3">
        {service.title}
      </h3>
      <p className="font-body text-sm md:text-[15px] leading-relaxed text-cyan-soft/60 group-hover:text-cyan-soft/80 transition-colors">
        {service.desc}
      </p>

      {/* Bottom light trail on hover */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
        style={{
          background: `linear-gradient(90deg, transparent, ${service.accent}, transparent)`,
          boxShadow: `0 0 10px ${service.accent}`,
        }}
      />
    </motion.article>
  );
}

export default function Services() {
  const headerRef = useRef(null);
  const inView = useInView(headerRef, { once: true, margin: "-60px" });

  return (
    <section id="solutions" className="relative z-10 py-24 md:py-32 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={headerRef}
          className="mb-14 md:mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="font-mono text-[10px] md:text-xs tracking-[0.4em] text-cyan-neon/60 uppercase mb-3">
            // Capabilities Matrix
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-neon tracking-wide">
            Fortress Protocols
          </h2>
          <div className="mt-4 mx-auto w-24 h-px bg-gradient-to-r from-transparent via-cyan-neon to-transparent shadow-[0_0_10px_#00F0FF]" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {SERVICES.map((s, i) => (
            <ServiceCard key={s.id} service={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
