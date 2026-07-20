"use client";

import { useState, useCallback } from "react";
import LoadingSequence from "./LoadingSequence";
import CustomCursor from "./CustomCursor";
import AmbientEffects from "./AmbientEffects";
import Navigation from "./Navigation";
import Hero from "./Hero";
import Services from "./Services";
import CommandLattice from "./CommandLattice";
import Architecture from "./Architecture";
import Contact from "./Contact";
import Footer from "./Footer";

export default function HomePage() {
  const [loaded, setLoaded] = useState(false);
  const onLoadComplete = useCallback(() => setLoaded(true), []);

  return (
    <>
      {!loaded && <LoadingSequence onComplete={onLoadComplete} />}

      <div
        className={`relative min-h-screen transition-opacity duration-300 ease-out ${
          loaded ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        {loaded && <CustomCursor />}
        <AmbientEffects />
        <div className="scanlines" aria-hidden />

        <Navigation />

        <main className="relative z-10">
          <Hero />
          <Services />
          <CommandLattice />
          <Architecture />
          <Contact />
        </main>

        <Footer />
      </div>
    </>
  );
}
