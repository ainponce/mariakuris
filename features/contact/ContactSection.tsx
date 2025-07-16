"use client";

import { memo } from 'react';
import { Mail, MapPin, Phone, Briefcase } from 'lucide-react';
import { ContactForm } from '@/components/ContactForm';
import { useLanguage } from '@/contexts/LanguageContext';

interface ContactSectionProps {
    className?: string;
}

const ContactSection = memo(({ className = '' }: ContactSectionProps) => {
    const { t } = useLanguage();

    return (
        <section
            id="contacto"
            className={`py-20 lg:py-32 bg-[rgb(var(--theme-bg))] relative overflow-hidden border-t border-[#003366]/20 ${className}`}
        >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `radial-gradient(circle at 20% 80%, #003366 0%, transparent 50%), 
                                     radial-gradient(circle at 80% 20%, #003366 0%, transparent 50%)`,
                    }}
                ></div>
            </div>

            <div className="w-full px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16 lg:mb-24 scroll-reveal">
                    <div className="inline-flex items-center space-x-2 bg-[#003366]/10 border border-[#003366]/20 rounded-full px-4 py-2 mb-6 scroll-reveal-scale stagger-1">
                        <Mail className="h-4 w-4 text-[#003366]" />
                        <span className="text-[#003366] text-sm font-medium">{t('contactoCorporativo')}</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[rgb(var(--theme-fg))] mb-6 scroll-reveal stagger-2">
                        {t('consultaCorpTitle')} <span className="text-gradient"></span>
                    </h2>
                    <p className="text-xl text-[rgb(var(--theme-text))] max-w-3xl mx-auto leading-relaxed">
                        {t('contactDescription')}
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
                    <div className="scroll-reveal-left">
                        <h3 className="text-2xl font-bold text-[rgb(var(--theme-fg))] mb-8">{t('contactoCorporativo')}</h3>

                        <div className="space-y-8">
                            {[
                                {
                                    icon: MapPin,
                                    titleKey: "oficinaPrincipal" as const,
                                    content: ["Av. Corrientes 1234, Piso 8°", "Ciudad Autónoma de Buenos Aires"],
                                },
                                {
                                    icon: Phone,
                                    titleKey: "telefonos" as const,
                                    content: ["+54 11 4567-8900", "+54 9 11 2345-6789"],
                                },
                                {
                                    icon: Mail,
                                    titleKey: "emailCorporativo" as const,
                                    content: ["maria.kuris@corporativo.com", "consultas@mariakuris.com"],
                                },
                            ].map((contact, index) => (
                                <div
                                    key={index}
                                    className="flex items-start space-x-3 sm:space-x-4 p-4 sm:p-6 corporate-card rounded-xl transition-all duration-500 group"
                                >
                                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#003366]/20 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-[#003366]/30 transition-colors duration-300">
                                        <contact.icon className="h-5 w-5 sm:h-6 sm:w-6 text-[#003366]" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-[rgb(var(--theme-fg))] mb-2 group-hover:text-[#003366] transition-colors duration-300 text-sm sm:text-base">
                                            {t(contact.titleKey)}
                                        </h4>
                                        {contact.content.map((line, i) => (
                                            <p key={i} className="text-[rgb(var(--theme-text))] text-sm sm:text-base">
                                                {line}
                                            </p>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-6 sm:mt-8 p-4 sm:p-6 corporate-card rounded-xl">
                            <h4 className="font-semibold text-[rgb(var(--theme-fg))] mb-3 flex items-center space-x-2 text-sm sm:text-base">
                                <Briefcase className="h-4 w-4 sm:h-5 sm:w-5 text-[#003366]" />
                                <span>{t('horariosAtencion')}</span>
                            </h4>
                            <div className="space-y-1 text-xs sm:text-sm text-[rgb(var(--theme-text))]">
                                <p>Lunes a Viernes: 9:00 - 19:00</p>
                                <p>Sábados: 9:00 - 13:00 (Solo citas)</p>
                                <p>Domingos: Cerrado</p>
                            </div>
                            <p className="text-xs sm:text-sm text-[#003366] mt-3 font-medium">
                                {t('consultasUrgentes')}
                            </p>
                        </div>
                    </div>

                    <div className="scroll-reveal-right">
                        <ContactForm />
                    </div>
                </div>
            </div>
        </section>
    );
});

ContactSection.displayName = 'ContactSection';

export default ContactSection; 