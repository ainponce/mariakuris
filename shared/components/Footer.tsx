"use client";

import { memo } from 'react';
import Link from 'next/link';
import { Mail, MapPin, Phone, Scale } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { useLanguage } from '@/contexts/LanguageContext';

interface FooterProps {
    className?: string;
}

const Footer = memo(({ className = '' }: FooterProps) => {
    const { t } = useLanguage();

    return (
        <footer className={`bg-[rgb(var(--theme-gradient-to))] border-t border-[#003366]/30 py-16 ${className}`}>
            <div className="w-full px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
                    <div>
                        <div className="flex items-center space-x-3 mb-6">
                            <div className="relative">
                                <Scale className="h-10 w-10 text-[#003366]" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-[rgb(var(--theme-fg))]">Maria Kuris</h3>
                                <p className="text-[#003366]">{t('lawyer')}</p>
                            </div>
                        </div>
                        <p className="text-[rgb(var(--theme-text))] mb-6 leading-relaxed">
                            {t('footerDescription')}
                        </p>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold text-[rgb(var(--theme-fg))] mb-6">{t('serviciosCorporativos')}</h4>
                        <ul className="space-y-3 text-[rgb(var(--theme-text))]">
                            {[
                                t('derechoSocietario'),
                                t('contratosCorporativos'),
                                t('complianceCorporativo'),
                                t('gobiernoCorportivo'),
                                t('maTransacciones'),
                                t('derechoFinanciero'),
                            ].map((service, index) => (
                                <li
                                    key={index}
                                    className="hover:text-[#003366] transition-colors duration-300 cursor-pointer flex items-center space-x-2"
                                >
                                    <div className="w-1.5 h-1.5 bg-[#003366] rounded-full"></div>
                                    <span>{service}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold text-[rgb(var(--theme-fg))] mb-6">{t('contacto')}</h4>
                        <div className="space-y-3 text-[rgb(var(--theme-text))]">
                            <p className="flex items-center space-x-2">
                                <MapPin className="h-4 w-4 text-[#003366]" />
                                <span>Av. Corrientes 1234, Piso 8°</span>
                            </p>
                            <p className="flex items-center space-x-2">
                                <MapPin className="h-4 w-4 text-[#003366]" />
                                <span>Ciudad Autónoma de Buenos Aires</span>
                            </p>
                            <p className="flex items-center space-x-2">
                                <Phone className="h-4 w-4 text-[#003366]" />
                                <span>+54 11 4567-8900</span>
                            </p>
                            <p className="flex items-center space-x-2">
                                <Mail className="h-4 w-4 text-[#003366]" />
                                <span>maria.kuris@corporativo.com</span>
                            </p>
                        </div>
                    </div>
                </div>

                <Separator className="my-12 bg-[#003366]/30" />

                <div className="flex flex-col md:flex-row justify-between items-center">
                    <p className="text-[rgb(var(--theme-text))] text-sm">
                        {t('derechosReservados')}
                    </p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <Link href="#" className="text-[rgb(var(--theme-text))] hover:text-[#003366] text-sm transition-colors duration-300">
                            {t('politicaPrivacidad')}
                        </Link>
                        <Link href="#" className="text-[rgb(var(--theme-text))] hover:text-[#003366] text-sm transition-colors duration-300">
                            {t('terminosServicio')}
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
});

Footer.displayName = 'Footer';

export default Footer; 