"use client";

import { motion } from "framer-motion";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="py-12 px-4 md:px-8 border-t border-[#1A1A1A]"
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <motion.a
            href="#"
            className="text-xl font-semibold text-white hover:text-[#F5C518] transition-colors"
            whileHover={{ scale: 1.02 }}
          >
            Maria Kuris
          </motion.a>

          {/* Contact */}
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 text-gray-400">
            <motion.a
              href="mailto:info@mariacuris.com"
              className="hover:text-white transition-colors"
              whileHover={{ scale: 1.02 }}
            >
              info@mariacuris.com
            </motion.a>
          </div>

          {/* Legal Links */}
          <div className="flex items-center gap-6 text-sm text-gray-500">
            <motion.a
              href="/privacidad"
              className="hover:text-gray-300 transition-colors"
              whileHover={{ scale: 1.02 }}
            >
              Privacidad
            </motion.a>
            <motion.a
              href="/terminos"
              className="hover:text-gray-300 transition-colors"
              whileHover={{ scale: 1.02 }}
            >
              Terminos
            </motion.a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-[#1A1A1A] text-center text-sm text-gray-600">
          <p>&copy; {currentYear} Maria Kuris. Todos los derechos reservados.</p>
        </div>
      </div>
    </motion.footer>
  );
}
