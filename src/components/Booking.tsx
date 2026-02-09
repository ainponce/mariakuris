"use client";

import { motion } from "framer-motion";

export default function Booking() {
  return (
    <section id="agenda" className="py-20 md:py-32 px-4 md:px-8">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-4xl mx-auto"
      >
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4"
          >
            Agenda tu Consulta
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto"
          >
            Selecciona el horario que mejor se adapte a ti para una consulta personalizada.
          </motion.p>
        </div>

        {/* Calendly Inline Widget */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="rounded-2xl overflow-hidden"
        >
          <div
            className="calendly-inline-widget"
            data-url="https://calendly.com/consultas-mariakuris?primary_color=000000&background_color=1a1a1a&text_color=ffffff"
            style={{ minWidth: "320px", height: "700px" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
