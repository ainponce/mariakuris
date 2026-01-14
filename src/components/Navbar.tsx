"use client";

import { motion } from "framer-motion";

interface NavbarProps {
  onAgendarClick?: () => void;
}

export default function Navbar({ onAgendarClick }: NavbarProps) {
  const handleClick = (e: React.MouseEvent) => {
    if (onAgendarClick) {
      e.preventDefault();
      onAgendarClick();
    }
  };

  return (
    <>
      {/* Logo - Fixed top left */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-6 left-6 md:top-8 md:left-10 z-50"
      >
        <span className="text-xl md:text-2xl font-bold tracking-tight text-white">
          MK
        </span>
      </motion.div>

      {/* CTA - Fixed top right */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-6 right-6 md:top-8 md:right-10 z-50"
      >
        <a
          href="#agenda"
          onClick={handleClick}
          className="group relative pb-1 text-sm md:text-base font-medium text-white"
        >
          Agendar
          <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-white/30" />
          <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white group-hover:w-full transition-all duration-500 ease-in-out group-hover:shadow-[0_0_10px_rgba(255,255,255,0.6)]" />
        </a>
      </motion.div>
    </>
  );
}
