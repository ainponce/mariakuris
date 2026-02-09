"use client";

import { motion } from "framer-motion";
import { useCallback } from "react";

const CALENDLY_URL = "https://calendly.com/consultas-mariakuris/meeting-de-30-mminutos?hide_event_type_details=1&hide_gdpr_banner=1&background_color=000000&text_color=ffffff&primary_color=000000";

// Hoisted static SVG icon for better performance (rendering-hoist-jsx)
const arrowIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="ml-2 transition-transform duration-300 group-hover:translate-x-1"
  >
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

export default function FinalCTA() {
  const handleClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const Calendly = (window as any).Calendly;
    if (Calendly) {
      Calendly.initPopupWidget({ url: CALENDLY_URL });
    }
  }, []);

  return (
    <section className="w-full py-16 md:py-28 px-4 md:px-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl mx-auto text-center"
      >
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-light tracking-tight text-white mb-3 md:mb-4">
          Da el primer paso
        </h2>
        <p className="text-gray-400 text-sm md:text-base mb-8 md:mb-10 font-light">
          Una conversación puede cambiar el rumbo de tu negocio.
        </p>

        <a
          href="#"
          onClick={handleClick}
          className="group relative inline-flex items-center pb-1 text-base md:text-lg font-medium text-white"
        >
          Agendar consulta gratuita
          {arrowIcon}
          <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-[var(--accent)]/20" />
          <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[var(--accent)] group-hover:w-full transition-all duration-500 ease-in-out group-hover:shadow-[0_0_10px_rgba(247,226,156,0.4)]" />
        </a>

        <p className="mt-6 md:mt-8 text-gray-500 text-xs md:text-sm tracking-wide">
          Sin compromiso · Cupos limitados
        </p>
      </motion.div>
    </section>
  );
}
