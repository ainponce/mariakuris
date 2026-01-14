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

        {/* Calendar Embed Placeholder */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-[#1A1A1A] rounded-2xl p-8 md:p-12 border border-[#2A2A2A]"
        >
          {/* Cal.com Embed - Replace with actual embed code */}
          <div className="min-h-[500px] flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-full bg-[#2A2A2A] flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#F5C518" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
            </div>
            <h3 className="text-xl md:text-2xl font-semibold text-white mb-3">
              Calendario de Reservas
            </h3>
            <p className="text-gray-400 max-w-md mb-6">
              Aqui se integrara el calendario de Cal.com o Calendly para agendar las consultas.
            </p>
            <div className="text-sm text-gray-500 bg-[#2A2A2A] px-4 py-2 rounded-lg font-mono">
              {/* Instructions for integration */}
              Reemplazar con embed de Cal.com
            </div>

            {/* Sample Cal.com embed code (commented) */}
            {/*
              Para integrar Cal.com:
              1. Crear cuenta en cal.com
              2. Configurar disponibilidad
              3. Copiar el embed code
              4. Reemplazar este placeholder

              Ejemplo:
              <Cal
                calLink="maria-kuris/consulta"
                style={{ width: "100%", height: "100%", overflow: "scroll" }}
              />
            */}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
