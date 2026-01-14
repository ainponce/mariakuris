"use client";

import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <section id="sobre-mi" className="py-20 md:py-32 px-4 md:px-8 bg-[#0F0F0F]">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-4xl mx-auto text-center"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-br from-[#2A2A2A] to-[#1A1A1A] flex items-center justify-center"
        >
          {/* Placeholder for profile photo */}
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#F5C518" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-3xl md:text-4xl font-bold text-white mb-6"
        >
          Maria Kuris
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-8"
        >
          Abogada especializada con amplia experiencia en asesoria legal.
          Mi compromiso es brindarte soluciones efectivas y personalizadas
          para cada situacion juridica.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <span className="px-4 py-2 bg-[#1A1A1A] rounded-full text-sm text-gray-300 border border-[#2A2A2A]">
            Derecho Civil
          </span>
          <span className="px-4 py-2 bg-[#1A1A1A] rounded-full text-sm text-gray-300 border border-[#2A2A2A]">
            Derecho Comercial
          </span>
          <span className="px-4 py-2 bg-[#1A1A1A] rounded-full text-sm text-gray-300 border border-[#2A2A2A]">
            Asesoria Empresarial
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}
