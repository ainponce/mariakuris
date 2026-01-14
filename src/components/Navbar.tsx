"use client";

import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4 md:px-12 md:py-6"
    >
      <div className="max-w-7xl mx-auto flex justify-center items-center">
        <motion.span
          className="text-xl md:text-2xl font-semibold tracking-tight text-white"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          María Kuris
        </motion.span>
      </div>
    </motion.nav>
  );
}
