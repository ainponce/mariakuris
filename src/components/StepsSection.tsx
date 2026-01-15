"use client";

import { motion } from "framer-motion";

// Hoisted static SVG icons for better performance (rendering-hoist-jsx)
const earIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 8.5a6.5 6.5 0 1 1 13 0c0 6-6 6-6 10a3.5 3.5 0 1 1-7 0" />
    <path d="M15 8.5a2.5 2.5 0 0 0-5 0v1a2 2 0 1 1 0 4" />
  </svg>
);

const searchIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
    <line x1="11" y1="8" x2="11" y2="14" />
    <line x1="8" y1="11" x2="14" y2="11" />
  </svg>
);

const clipboardIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
    <path d="M9 14l2 2 4-4" />
  </svg>
);

const steps = [
  {
    number: "01",
    title: "Entendemos tu situación",
    description: "Analizamos tu contexto actual y objetivos específicos.",
    icon: earIcon,
  },
  {
    number: "02",
    title: "Detectamos riesgos y prioridades",
    description: "Identificamos puntos críticos y oportunidades de mejora.",
    icon: searchIcon,
  },
  {
    number: "03",
    title: "Te llevás un plan",
    description: "Salís con pasos claros y accionables para avanzar.",
    icon: clipboardIcon,
  },
];

export default function StepsSection() {

  return (
    <section className="w-full py-12 md:py-20 px-4 md:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-14"
        >
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-2 md:mb-3">
            Cómo funciona
          </h2>
          <p className="text-gray-400 text-sm md:text-base">
            En una sola sesión obtenés claridad
          </p>
        </motion.div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="relative bg-[#111111] rounded-xl md:rounded-2xl p-5 md:p-6 border border-[#1A1A1A] hover:border-[#2A2A2A] transition-colors"
            >
              {/* Step Number */}
              <span className="absolute top-4 right-4 text-xs font-mono text-gray-600">
                {step.number}
              </span>

              {/* Icon */}
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-[#1A1A1A] flex items-center justify-center text-white mb-4 md:mb-5">
                {step.icon}
              </div>

              {/* Content */}
              <h3 className="text-base md:text-lg font-semibold text-white mb-1 md:mb-2">
                {step.title}
              </h3>
              <p className="text-gray-400 text-xs md:text-sm leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
