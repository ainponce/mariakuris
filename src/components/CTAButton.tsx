"use client";

import { motion } from "framer-motion";

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
        inline-flex items-center justify-center
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
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="ml-2"
        initial={{ x: 0 }}
        whileHover={{ x: 4 }}
      >
        <path d="M5 12h14M12 5l7 7-7 7" />
      </motion.svg>
    </motion.a>
  );
}
