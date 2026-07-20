import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        void: "#000000",
        cyan: {
          neon: "#00F0FF",
          soft: "#E0F7FF",
          dim: "#00A8B8",
          glow: "#00F0FF",
        },
        electric: {
          blue: "#0088FF",
          deep: "#0055AA",
        },
        magenta: {
          hot: "#FF00AA",
          threat: "#FF2266",
        },
        glass: {
          border: "rgba(0, 240, 255, 0.35)",
          fill: "rgba(0, 20, 40, 0.55)",
        },
      },
      fontFamily: {
        display: ["var(--font-orbitron)", "Orbitron", "sans-serif"],
        body: ["var(--font-rajdhani)", "Rajdhani", "sans-serif"],
        mono: ["var(--font-jetbrains)", "JetBrains Mono", "monospace"],
      },
      boxShadow: {
        "neon-sm": "0 0 8px rgba(0, 240, 255, 0.4), 0 0 16px rgba(0, 240, 255, 0.2)",
        "neon-md": "0 0 16px rgba(0, 240, 255, 0.5), 0 0 32px rgba(0, 240, 255, 0.25), 0 0 48px rgba(0, 136, 255, 0.15)",
        "neon-lg": "0 0 24px rgba(0, 240, 255, 0.6), 0 0 48px rgba(0, 240, 255, 0.35), 0 0 80px rgba(0, 136, 255, 0.2)",
        "neon-magenta": "0 0 16px rgba(255, 0, 170, 0.5), 0 0 32px rgba(255, 0, 170, 0.25)",
        "glass": "0 8px 32px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(0, 240, 255, 0.15)",
      },
      backgroundImage: {
        "grid-fade":
          "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.4) 60%, #000 100%)",
        "panel-glow":
          "radial-gradient(ellipse at center, rgba(0, 240, 255, 0.08) 0%, transparent 70%)",
      },
      animation: {
        "pulse-neon": "pulse-neon 2.5s ease-in-out infinite",
        "pulse-status": "pulse-status 2s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
        "scan": "scan 3s linear infinite",
        "draw-line": "draw-line 0.6s ease-out forwards",
        "energy-charge": "energy-charge 1.2s ease-in-out infinite",
        "binary-fall": "binary-fall 8s linear infinite",
        "ribbon": "ribbon 12s linear infinite",
      },
      keyframes: {
        "pulse-neon": {
          "0%, 100%": { opacity: "1", filter: "brightness(1)" },
          "50%": { opacity: "0.85", filter: "brightness(1.25)" },
        },
        "pulse-status": {
          "0%, 100%": {
            boxShadow: "0 0 6px rgba(0, 240, 255, 0.6), 0 0 12px rgba(0, 240, 255, 0.3)",
          },
          "50%": {
            boxShadow: "0 0 12px rgba(0, 240, 255, 0.9), 0 0 24px rgba(0, 240, 255, 0.5)",
          },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        scan: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
        "draw-line": {
          "0%": { transform: "scaleX(0)" },
          "100%": { transform: "scaleX(1)" },
        },
        "energy-charge": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        "binary-fall": {
          "0%": { transform: "translateY(-100%)", opacity: "0" },
          "10%": { opacity: "0.4" },
          "90%": { opacity: "0.4" },
          "100%": { transform: "translateY(100vh)", opacity: "0" },
        },
        ribbon: {
          "0%": { strokeDashoffset: "1000" },
          "100%": { strokeDashoffset: "0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
