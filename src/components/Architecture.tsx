"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const LAYERS = [
  {
    title: "Perception Layer",
    items: ["Sensor Mesh", "Telemetry Ingest", "Behavioral Baseline"],
    color: "#00F0FF",
  },
  {
    title: "Cognition Layer",
    items: ["Neural Inference", "Threat Graph", "Predictive Models"],
    color: "#0088FF",
  },
  {
    title: "Enforcement Layer",
    items: ["Policy Engine", "Quarantine Nodes", "Auto-Remediation"],
    color: "#00F0FF",
  },
  {
    title: "Command Layer",
    items: ["SOC Lattice", "Human Override", "Audit Ledger"],
    color: "#FF00AA",
  },
];

export default function Architecture() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="architecture" className="relative z-10 py-24 md:py-32 px-4" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="mb-14 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45 }}
        >
          <p className="font-mono text-[10px] md:text-xs tracking-[0.4em] text-cyan-neon/60 uppercase mb-3">
            // System Architecture
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-neon tracking-wide">
            Stack of Light
          </h2>
          <p className="mt-4 max-w-2xl mx-auto font-body text-cyan-soft/60 text-sm md:text-base">
            Four sovereign layers. One impregnable grid. Every signal is seen.
            Every threat is dissolved into energy.
          </p>
          <div className="mt-4 mx-auto w-24 h-px bg-gradient-to-r from-transparent via-cyan-neon to-transparent" />
        </motion.div>

        <div className="relative">
          {/* Vertical energy spine */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 hidden md:block">
            <div className="h-full w-full bg-gradient-to-b from-transparent via-cyan-neon/40 to-transparent" />
            <motion.div
              className="absolute left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-cyan-neon shadow-[0_0_12px_#00F0FF]"
              animate={{ top: ["0%", "100%", "0%"] }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {LAYERS.map((layer, i) => (
              <motion.div
                key={layer.title}
                className={`glass-panel relative p-6 md:p-8 rounded-2xl ${
                  i % 2 === 1 ? "md:mt-12" : ""
                }`}
                initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.06 + i * 0.06 }}
                data-cursor="hover"
              >
                <span className="circuit-corner tl" />
                <span className="circuit-corner br" />

                <div className="flex items-center gap-3 mb-5">
                  <div
                    className="w-3 h-3 rounded-sm rotate-45"
                    style={{
                      background: layer.color,
                      boxShadow: `0 0 12px ${layer.color}`,
                    }}
                  />
                  <h3 className="font-display text-lg font-bold tracking-wide text-neon-soft">
                    {layer.title}
                  </h3>
                  <span className="ml-auto font-mono text-[10px] text-cyan-neon/40">
                    L{i + 1}
                  </span>
                </div>

                <ul className="space-y-3">
                  {layer.items.map((item, j) => (
                    <li key={item} className="flex items-center gap-3">
                      <motion.span
                        className="w-1.5 h-1.5 rounded-full shrink-0"
                        style={{ background: layer.color }}
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{
                          duration: 2,
                          delay: j * 0.3,
                          repeat: Infinity,
                        }}
                      />
                      <span className="font-body text-sm text-cyan-soft/70 tracking-wide">
                        {item}
                      </span>
                      <span
                        className="flex-1 h-px opacity-20"
                        style={{
                          background: `linear-gradient(90deg, ${layer.color}, transparent)`,
                        }}
                      />
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
