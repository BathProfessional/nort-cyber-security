import type { Metadata, Viewport } from "next";
import { Orbitron, Rajdhani, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const rajdhani = Rajdhani({
  subsets: ["latin"],
  variable: "--font-rajdhani",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Nort Cyber Security — Defend the Infinite",
  description:
    "Elite cybersecurity fortress of pure light. AI Threat Hunting, Quantum-Resistant Encryption, Neural Zero-Trust Architecture, Real-Time SOC Command.",
  keywords: [
    "cybersecurity",
    "Nort Cyber Security",
    "zero trust",
    "threat hunting",
    "quantum encryption",
    "SOC",
  ],
  authors: [{ name: "Nort Cyber Security" }],
  openGraph: {
    title: "Nort Cyber Security — Defend the Infinite",
    description: "Enter the Grid. Elite cybersecurity defending the infinite.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${orbitron.variable} ${rajdhani.variable} ${jetbrains.variable}`}
    >
      <body className="font-body antialiased bg-void text-cyan-soft overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
