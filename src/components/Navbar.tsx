"use client";

import { motion } from "framer-motion";
import { useCallback } from "react";

const CALENDLY_URL = "https://calendly.com/consultas-mariakuris/meeting-de-30-mminutos?hide_event_type_details=1&hide_gdpr_banner=1&background_color=000000&text_color=ffffff&primary_color=ffffff";

export default function Navbar() {
  const openCalendly = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const Calendly = (window as any).Calendly;
    if (Calendly) {
      Calendly.initPopupWidget({ url: CALENDLY_URL });
    }
  }, []);

  return (
    <>
      {/* Navbar backdrop */}
      <div className="fixed top-0 left-0 right-0 h-16 md:h-20 bg-gradient-to-b from-[#0A0A0A] via-[#0A0A0A]/80 to-transparent z-40 pointer-events-none" />

      {/* Logo - Fixed top left */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-6 left-6 md:top-8 md:left-10 z-50"
      >
        <span className="text-xl md:text-2xl font-light tracking-[0.2em] text-white">
          MK
        </span>
      </motion.div>

      {/* Calendar icon - Fixed top right */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-6 right-6 md:top-8 md:right-10 z-50"
      >
        <a
          href="#"
          onClick={openCalendly}
          className="text-white/80 hover:text-white transition-colors duration-300"
          aria-label="Agendar consulta"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
        </a>
      </motion.div>
    </>
  );
}
