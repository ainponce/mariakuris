"use client";

import { motion } from "framer-motion";

// Hoisted static SVG icon for better performance (rendering-hoist-jsx)
const arrowSvg = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

interface CTAButtonProps {
  size?: "default" | "large";
  href?: string;
}

export default function CTAButton({ size = "default", href = "#agenda" }: CTAButtonProps) {
  const sizeClasses = size === "large"
    ? "px-10 py-5 text-lg md:text-xl"
    : "px-8 py-4 text-base md:text-lg";

  return (
    <motion.a
      href={href}
      className={`
        group inline-flex items-center justify-center
        ${sizeClasses}
        bg-[#F5C518] text-black font-semibold
        rounded-full
        shadow-lg shadow-[#F5C518]/20
        transition-all duration-300
        hover:bg-[#FFD700] hover:shadow-xl hover:shadow-[#F5C518]/30
      `}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
    >
      Agenda tu Consulta
      {/* Animate wrapper div instead of SVG for hardware acceleration (rendering-animate-svg-wrapper) */}
      <span className="ml-2 inline-block transition-transform duration-200 group-hover:translate-x-1">
        {arrowSvg}
      </span>
    </motion.a>
  );
}
