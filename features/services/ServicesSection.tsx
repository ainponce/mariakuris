"use client";

import { memo, useMemo } from 'react';
import {
    Award,
    BookOpen,
    Building2,
    Scale,
    Users,
    Briefcase
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslation } from '@/contexts/OptimizedLanguageContext';
import { Service } from '@/shared/types/services.types';

interface ServicesSectionProps {
    className?: string;
    maxItems?: number;
    showCategories?: boolean;
}

const ServicesSection = memo(({
    className = '',
    maxItems,
    showCategories = true
}: ServicesSectionProps) => {
    const t = useTranslation();

    // Memoizar los datos de servicios
    const services: Service[] = useMemo(() => [
        {
            icon: Building2,
            titleKey: 'derechoSocietario',
            descriptionKey: 'derechoSocietarioDesc',
            services: [
                "Constitución de sociedades",
                "Transformaciones societarias",
                "Fusiones y escisiones",
                "Aumentos de capital",
            ],
            category: 'corporate'
        },
        {
            icon: Briefcase,
            titleKey: 'contratosCorporativos',
            descriptionKey: 'contratosCorporativosDesc',
            services: [
                "Contratos de distribución",
                "Joint ventures",
                "Acuerdos de licencia",
                "Contratos internacionales",
            ],
            category: 'corporate'
        },
        {
            icon: Scale,
            titleKey: 'complianceCorporativo',
            descriptionKey: 'complianceCorporativoDesc',
            services: [
                "Programas de compliance",
                "Due diligence",
                "Auditorías legales",
                "Políticas internas"
            ],
            category: 'compliance'
        },
        {
            icon: Users,
            titleKey: 'gobiernoCorportivo',
            descriptionKey: 'gobiernoCorportativoDesc',
            services: [
                "Estructuras de gobierno",
                "Asambleas y directorios",
                "Protocolos familiares",
                "Conflictos societarios",
            ],
            category: 'corporate'
        },
        {
            icon: Award,
            titleKey: 'maTransacciones',
            descriptionKey: 'maTransaccionesDesc',
            services: [
                "Fusiones y adquisiciones",
                "Private equity",
                "Venture capital",
                "Reestructuraciones"
            ],
            category: 'financial'
        },
        {
            icon: BookOpen,
            titleKey: 'derechoFinanciero',
            descriptionKey: 'derechoFinancieroDesc',
            services: [
                "Financiamientos",
                "Mercado de capitales",
                "Fideicomisos",
                "Garantías"
            ],
            category: 'financial'
        },
    ], []);

    // Filtrar servicios si se especifica un máximo
    const displayedServices = useMemo(() => {
        return maxItems ? services.slice(0, maxItems) : services;
    }, [services, maxItems]);

    return (
        <section
            id="servicios"
            className={`
        py-20 lg:py-32 bg-gradient-to-br 
        from-[rgb(var(--theme-bg))] 
        via-[#003366]/5 
        to-[rgb(var(--theme-bg))] 
        relative overflow-hidden 
        border-t border-[#003366]/20 ${className}
      `}
        >
            {/* Background Elements */}
            <div
                className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#003366]/5 rounded-full blur-3xl"
                aria-hidden="true"
            />
            <div
                className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#003366]/5 rounded-full blur-3xl"
                aria-hidden="true"
            />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header */}
                <div className="text-center mb-16 lg:mb-24" data-animate>
                    <div className="inline-flex items-center space-x-2 bg-[#003366]/10 border border-[#003366]/20 rounded-full px-4 py-2 mb-6">
                        <Briefcase className="h-4 w-4 text-[#003366]" />
                        <span className="text-[#003366] text-sm font-medium">
                            {t('especializacionCorporativa')}
                        </span>
                    </div>

                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[rgb(var(--theme-fg))] mb-6">
                        {t('serviciosCorporativos')}
                        <span className="block bg-gradient-to-r from-[#003366] to-[#004488] bg-clip-text text-transparent">
                            {t('especializacionCorporativa')}
                        </span>
                    </h2>

                    <p className="text-xl text-[rgb(var(--theme-text))] max-w-3xl mx-auto leading-relaxed">
                        {t('servicesDescription')}
                    </p>
                </div>

                {/* Services Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {displayedServices.map((service, index) => (
                        <Card
                            key={service.titleKey}
                            className={`
                bg-[rgb(var(--theme-card-bg))] border-[#003366]/20 
                hover:border-[#003366]/40 transition-all duration-300 
                group hover:shadow-lg hover:shadow-[#003366]/10
                hover:-translate-y-1
              `}
                            data-animate
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            <CardHeader className="pb-4">
                                <div className="relative mb-4">
                                    <service.icon className="h-12 w-12 text-[#003366] group-hover:scale-110 transition-transform duration-300" />
                                    <div className="absolute inset-0 bg-[#003366]/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                </div>

                                <CardTitle className="text-[rgb(var(--theme-fg))] text-xl group-hover:text-[#003366] transition-colors duration-300">
                                    {t(service.titleKey as any)}
                                </CardTitle>

                                <CardDescription className="text-[rgb(var(--theme-text))] leading-relaxed">
                                    {t(service.descriptionKey as any)}
                                </CardDescription>
                            </CardHeader>

                            <CardContent>
                                <ul className="space-y-2">
                                    {service.services.map((item, i) => (
                                        <li
                                            key={i}
                                            className="text-sm text-[rgb(var(--theme-text))] flex items-center space-x-2"
                                        >
                                            <div className="w-1.5 h-1.5 bg-[#003366] rounded-full flex-shrink-0" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Call to Action */}
                {maxItems && services.length > maxItems && (
                    <div className="text-center mt-12">
                        <p className="text-[rgb(var(--theme-text))] mb-4">
                            Y muchos más servicios especializados...
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
});

ServicesSection.displayName = 'ServicesSection';

export default ServicesSection; 