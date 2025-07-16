"use client";

import { memo, useMemo, useState, useEffect } from 'react';
import {
    Award,
    BookOpen,
    Building2,
    Scale,
    Users,
    Briefcase
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    useCarousel
} from '@/components/ui/carousel';
import { useLanguage } from '@/contexts/LanguageContext';

interface ServicesSectionProps {
    className?: string;
    maxItems?: number;
    showCategories?: boolean;
}

// Componente para detectar la card activa y aplicar shadow
const ServiceCard = memo(({ service, index }: { service: any; index: number }) => {
    const [isActive, setIsActive] = useState(false);
    const { api } = useCarousel();
    const { t } = useLanguage();

    useEffect(() => {
        if (!api) return;

        const updateActiveState = () => {
            const currentIndex = api.selectedScrollSnap();
            setIsActive(currentIndex === index);
        };

        updateActiveState();
        api.on('select', updateActiveState);

        return () => {
            api.off('select', updateActiveState);
        };
    }, [api, index]);

    return (
        <div className="px-2 py-4 h-full flex items-center">
            <Card className={`h-[380px] sm:h-[400px] bg-[rgb(var(--theme-card-bg))] border-[#003366]/20 hover:border-[#003366]/40 transition-all duration-500 group select-none ${isActive ? ' scale-105' : ''
                }`}>
                <CardHeader className="pb-4">
                    <div className="relative mb-4">
                        <service.icon className="h-12 w-12 text-[#003366]" />
                    </div>
                    <CardTitle className="text-[rgb(var(--theme-fg))] text-xl">
                        {t(service.titleKey)}
                    </CardTitle>
                    <CardDescription className="text-[rgb(var(--theme-text))] leading-relaxed">
                        {t(service.descriptionKey)}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-2">
                        {service.services.map((item: string, i: number) => (
                            <li key={i} className="text-sm text-[rgb(var(--theme-text))] flex items-center space-x-2">
                                <div className="w-1.5 h-1.5 bg-[#003366] rounded-full flex-shrink-0"></div>
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
        </div>
    );
});

ServiceCard.displayName = 'ServiceCard';

// Componente para los bullets del carousel
const CarouselBullets = memo(({ count }: { count: number }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const { api } = useCarousel();

    useEffect(() => {
        if (!api) return;

        const updateIndex = () => {
            setCurrentIndex(api.selectedScrollSnap());
        };

        updateIndex();
        api.on('select', updateIndex);

        return () => {
            api.off('select', updateIndex);
        };
    }, [api]);

    return (
        <div className="flex justify-center items-center mt-6 w-full">
            <div className="flex items-center justify-center space-x-2 bg-[#003366]/10 px-4 py-2 rounded-full mx-auto">
                <div className="flex space-x-1">
                    {Array.from({ length: count }).map((_, index) => (
                        <div
                            key={index}
                            className={`w-1.5 h-1.5 rounded-full transition-colors duration-200 ${index === currentIndex
                                ? 'bg-[#003366]'
                                : 'bg-[#003366]/40'
                                }`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
});

CarouselBullets.displayName = 'CarouselBullets';

const ServicesSection = memo(({
    className = '',
    maxItems,
    showCategories = true
}: ServicesSectionProps) => {
    const { t } = useLanguage();

    // Memoizar los datos de servicios
    const services = useMemo(() => [
        {
            icon: Building2,
            titleKey: 'derechoSocietario' as const,
            descriptionKey: 'derechoSocietarioDesc' as const,
            services: [
                "Constitución de sociedades",
                "Transformaciones societarias",
                "Fusiones y escisiones",
                "Aumentos de capital",
            ],
        },
        {
            icon: Briefcase,
            titleKey: 'contratosCorporativos' as const,
            descriptionKey: 'contratosCorporativosDesc' as const,
            services: [
                "Contratos de distribución",
                "Joint ventures",
                "Acuerdos de licencia",
                "Contratos internacionales",
            ],
        },
        {
            icon: Scale,
            titleKey: 'complianceCorporativo' as const,
            descriptionKey: 'complianceCorporativoDesc' as const,
            services: ["Programas de compliance", "Due diligence", "Auditorías legales", "Políticas internas"],
        },
        {
            icon: Users,
            titleKey: 'gobiernoCorportivo' as const,
            descriptionKey: 'gobiernoCorportativoDesc' as const,
            services: [
                "Estructuras de gobierno",
                "Asambleas y directorios",
                "Protocolos familiares",
                "Conflictos societarios",
            ],
        },
        {
            icon: Award,
            titleKey: 'maTransacciones' as const,
            descriptionKey: 'maTransaccionesDesc' as const,
            services: ["Fusiones y adquisiciones", "Private equity", "Venture capital", "Reestructuraciones"],
        },
        {
            icon: BookOpen,
            titleKey: 'derechoFinanciero' as const,
            descriptionKey: 'derechoFinancieroDesc' as const,
            services: ["Financiamientos", "Mercado de capitales", "Fideicomisos", "Garantías"],
        },
    ], []);

    // Filtrar servicios si se especifica un máximo
    const displayedServices = useMemo(() => {
        return maxItems ? services.slice(0, maxItems) : services;
    }, [services, maxItems]);

    return (
        <section
            id="servicios"
            className={`py-20 lg:py-32 bg-gradient-to-br from-[rgb(var(--theme-bg))] via-[#003366]/5 to-[rgb(var(--theme-bg))] relative overflow-hidden border-t border-[#003366]/20 ${className}`}
        >
            {/* Background Elements */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#003366]/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#003366]/5 rounded-full blur-3xl"></div>

            <div className="w-full px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16 lg:mb-24 scroll-reveal">
                    <div className="inline-flex items-center space-x-2 bg-[#003366]/10 border border-[#003366]/20 rounded-full px-4 py-2 mb-6 scroll-reveal-scale stagger-1">
                        <Briefcase className="h-4 w-4 text-[#003366]" />
                        <span className="text-[#003366] text-sm font-medium">{t('especializacionCorporativa')}</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[rgb(var(--theme-fg))] mb-6 scroll-reveal stagger-2">
                        {t('serviciosCorporativos')} <span className="text-gradient"></span>
                    </h2>
                    <p className="text-xl text-[rgb(var(--theme-text))] max-w-3xl mx-auto leading-relaxed scroll-reveal stagger-3">
                        {t('servicesDescription')}
                    </p>
                </div>

                {/* Services Carousel */}
                <div className="w-full max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 min-h-[480px] flex items-center">
                    <Carousel
                        className="w-full cursor-grab active:cursor-grabbing flex-1"
                        opts={{
                            align: "center",
                            dragFree: false,
                            containScroll: "trimSnaps",
                            loop: true,
                            skipSnaps: false,
                            dragThreshold: 10
                        }}
                    >
                        <CarouselContent className="flex items-center select-none h-full">
                            {displayedServices.map((service, index) => (
                                <CarouselItem key={index} className="basis-full sm:basis-1/2 lg:basis-1/3 flex items-center justify-center h-full">
                                    <ServiceCard service={service} index={index} />
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious
                        />
                        <CarouselNext />

                        {/* Indicador de deslizamiento para todas las pantallas */}
                        <CarouselBullets count={displayedServices.length} />
                    </Carousel>
                </div>
            </div>
        </section>
    );
});

ServicesSection.displayName = 'ServicesSection';

export default ServicesSection; 