import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import { motion } from "framer-motion";
import { useEffect, useRef, useState, Suspense, lazy } from "react";

// Lazy-load non-critical below-the-fold sections to reduce initial bundle and TBT
const Marquee = lazy(() => import("@/components/Marquee"));
const About = lazy(() => import("@/components/About"));
const Certifications = lazy(() => import("@/components/Certifications"));
const Experience = lazy(() => import("@/components/Experience"));
const Skills = lazy(() => import("@/components/Skills"));
const Contact = lazy(() => import("@/components/Contact"));
// @ts-ignore
import NET from "vanta/dist/vanta.net.min";
import * as THREE from "three";

export default function Home() {
  const [vantaEffect, setVantaEffect] = useState(null);
  const vantaRef = useRef(null);

  useEffect(() => {
    let mounted = true;
    if (!vantaEffect && vantaRef.current) {
      try {
        const effect = NET({
          el: vantaRef.current,
          THREE: THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          scaleMobile: 1.0,
          color: 0xff00b7,
          backgroundColor: 0x1a0d31,
          points: 12.0,
          maxDistance: 22.0,
          spacing: 18.0
        });
        if (mounted && effect) setVantaEffect(effect as any);
      } catch (err) {
        // Log clearly; don't alter UI. This prevents uncaught runtime errors from breaking scripts.
        // eslint-disable-next-line no-console
        console.error("Vanta init failed:", err);
      }
    }
    return () => {
      mounted = false;
      if (vantaEffect && typeof (vantaEffect as any).destroy === "function") {
        (vantaEffect as any).destroy();
      }
    };
  }, [vantaEffect]);

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="bg-background min-h-screen text-foreground overflow-x-hidden relative"
    >
      {/* Vanta Background Container */}
      <div 
        ref={vantaRef} 
        className="fixed inset-0 z-0 pointer-events-none opacity-40"
      />
      
      {/* Fallback/Overlay Gradient for readability */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-gradient-to-b from-transparent via-background/80 to-background" />

      <div className="relative z-10">
        <Navbar />
        <main role="main">
          <Hero />
          <Suspense fallback={null}>
            <Marquee />
            <About />
            <Certifications />
            <Experience />
            <Skills />
            <Contact />
          </Suspense>
        </main>
      </div>
    </motion.div>
  );
}
