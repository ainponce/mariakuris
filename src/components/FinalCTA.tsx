"use client";

import { motion } from "framer-motion";
import { useCallback } from "react";

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

interface FinalCTAProps {
  onAgendarClick?: () => void;
}

export default function FinalCTA({ onAgendarClick }: FinalCTAProps) {
  // Use useCallback with stable reference (rerender-functional-setstate)
  const handleClick = useCallback((e: React.MouseEvent) => {
    if (onAgendarClick) {
      e.preventDefault();
      onAgendarClick();
    }
  }, [onAgendarClick]);

  return (
    <section className="w-full py-12 md:py-20 px-4 md:px-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl mx-auto text-center"
      >
        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-3 md:mb-4">
          Da el primer paso
        </h2>
        <p className="text-gray-400 text-sm md:text-base mb-6 md:mb-8">
          Una conversación puede cambiar el rumbo de tu negocio.
        </p>

        <a
          href="#agenda"
          onClick={handleClick}
          className="group relative inline-flex items-center pb-1 text-base md:text-lg font-medium text-white"
        >
          Agendar consulta gratuita
          {arrowIcon}
          <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-white/30" />
          <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white group-hover:w-full transition-all duration-500 ease-in-out group-hover:shadow-[0_0_10px_rgba(255,255,255,0.6)]" />
        </a>

        <p className="mt-4 md:mt-6 text-gray-500 text-xs md:text-sm">
          Sin compromiso · Cupos limitados
        </p>
      </motion.div>
    </section>
  );
}
