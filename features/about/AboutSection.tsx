"use client";

import { memo, useState, useEffect } from 'react';
import { Award, BookOpen, Scale } from 'lucide-react';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselApi
} from '@/components/ui/carousel';
import { useLanguage } from '@/contexts/LanguageContext';

interface AboutSectionProps {
    className?: string;
}

const AboutSection = memo(({ className = '' }: AboutSectionProps) => {
    const { t } = useLanguage();
    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState(0);
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!api) {
            return;
        }

        setCount(api.scrollSnapList().length);
        setCurrent(api.selectedScrollSnap() + 1);

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap() + 1);
        });
    }, [api]);

    return (
        <section
            id="sobre-mi"
            className={`py-20 lg:py-32 bg-gradient-to-br from-[rgb(var(--theme-gradient-to))] via-[rgb(var(--theme-bg))] to-[rgb(var(--theme-gradient-to))] relative overflow-hidden border-t border-[#003366]/20 ${className}`}
        >
            <div className="w-full px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header */}
                <div className="text-center mb-16 scroll-reveal max-w-6xl mx-auto">

                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[rgb(var(--theme-fg))] mb-6">
                        {t('sobreMaria')}
                    </h2>
                </div>

                {/* Card de Maria Kuris - Unificada */}
                <div className="flex justify-center mb-20 scroll-reveal">
                    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="relative corporate-card rounded-2xl overflow-hidden border border-[#003366]/20">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                                {/* Sección de imagen */}
                                <div className="relative">
                                    <div className="aspect-[4/3] md:aspect-auto md:h-full w-full overflow-hidden bg-gradient-to-br from-[#003366]/5 to-[#003366]/10">
                                        <img
                                            src="https://3yfctedxuyowr5e7.public.blob.vercel-storage.com/profile.png"
                                            alt="Maria Kuris - Abogada Corporativa"
                                            className="w-full h-full object-cover object-top"
                                        />
                                        {/* Overlay suave y sutil */}
                                        <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#003366]/10 via-transparent to-transparent"></div>
                                    </div>
                                </div>
                                {/* Sección de contenido unificado */}
                                <div className="relative flex flex-col items-center justify-center w-full px-2 py-4 sm:p-6 lg:p-8 min-h-full">
                                    {/* Carrusel de experiencia profesional */}
                                    <div className="flex-1 flex flex-col w-full max-w-full justify-center">
                                        <h4 className="text-lg sm:text-xl font-bold text-[rgb(var(--theme-fg))] mb-4 sm:mb-8 text-center">
                                            Experiencia Profesional
                                        </h4>
                                        <div className="flex-1 w-full flex items-center justify-center min-h-[300px]">
                                            <Carousel
                                                setApi={setApi}
                                                className="w-full cursor-grab active:cursor-grabbing"
                                                opts={{
                                                    align: "center",
                                                    loop: true,
                                                    dragFree: false,
                                                    containScroll: "trimSnaps",
                                                    skipSnaps: false,
                                                    dragThreshold: 10
                                                }}
                                            >
                                                <CarouselContent className="flex items-center w-full select-none h-full">
                                                    {/* Slide 1: Legado y Mentoría */}
                                                    <CarouselItem className="h-full min-h-[280px]">
                                                        <div className="flex justify-center items-center w-full h-full">
                                                            <div className="p-4 sm:p-6 bg-[#003366]/5 rounded-xl border border-[#003366]/10 min-h-[220px] h-auto flex flex-col justify-center w-full max-w-md select-none">
                                                                <div className="flex items-center mb-3 sm:mb-5">
                                                                    <Award className="h-5 w-5 sm:h-6 sm:w-6 text-[#003366] mr-2 sm:mr-3 flex-shrink-0" />
                                                                    <h5 className="text-base sm:text-lg font-bold text-[rgb(var(--theme-fg))]">
                                                                        {t('legacyAndMentorshipTitle')}
                                                                    </h5>
                                                                </div>
                                                                <div className="space-y-2 sm:space-y-4 flex-1">
                                                                    <p className="text-sm sm:text-base text-[rgb(var(--theme-text))] leading-relaxed">
                                                                        {t('legacyAndMentorshipDesc')}
                                                                    </p>
                                                                    <p className="text-sm sm:text-base text-[rgb(var(--theme-text))] leading-relaxed">
                                                                        {t('legacyAndMentorshipDesc2')}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </CarouselItem>
                                                    {/* Slide 2: Expertise */}
                                                    <CarouselItem className="h-full min-h-[280px]">
                                                        <div className="flex justify-center items-center w-full h-full">
                                                            <div className="p-4 sm:p-6 bg-[#003366]/5 rounded-xl border border-[#003366]/10 min-h-[220px] h-auto flex flex-col justify-center w-full max-w-md select-none">
                                                                <div className="flex items-center mb-3 sm:mb-5">
                                                                    <BookOpen className="h-5 w-5 sm:h-6 sm:w-6 text-[#003366] mr-2 sm:mr-3 flex-shrink-0" />
                                                                    <h5 className="text-base sm:text-lg font-bold text-[rgb(var(--theme-fg))]">
                                                                        {t('expertiseTitle')}
                                                                    </h5>
                                                                </div>
                                                                <div className="space-y-2 sm:space-y-4 flex-1">
                                                                    <p className="text-sm sm:text-base text-[rgb(var(--theme-text))] leading-relaxed">
                                                                        {t('expertiseDesc')}
                                                                    </p>
                                                                    <p className="text-sm sm:text-base text-[rgb(var(--theme-text))] leading-relaxed">
                                                                        {t('expertiseDesc2')}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </CarouselItem>
                                                    {/* Slide 3: Visión Estratégica */}
                                                    <CarouselItem className="h-full min-h-[280px]">
                                                        <div className="flex justify-center items-center w-full h-full">
                                                            <div className="p-4 sm:p-6 bg-[#003366]/5 rounded-xl border border-[#003366]/10 min-h-[220px] h-auto flex flex-col justify-center w-full max-w-md select-none">
                                                                <div className="flex items-center mb-3 sm:mb-5">
                                                                    <Scale className="h-5 w-5 sm:h-6 sm:w-6 text-[#003366] mr-2 sm:mr-3 flex-shrink-0" />
                                                                    <h5 className="text-base sm:text-lg font-bold text-[rgb(var(--theme-fg))]">
                                                                        {t('strategicVisionTitle')}
                                                                    </h5>
                                                                </div>
                                                                <div className="space-y-2 sm:space-y-4 flex-1">
                                                                    <p className="text-sm sm:text-base text-[rgb(var(--theme-text))] leading-relaxed">
                                                                        {t('strategicVisionDesc')}
                                                                    </p>
                                                                    <p className="text-sm sm:text-base text-[rgb(var(--theme-text))] leading-relaxed">
                                                                        {t('strategicVisionDesc2')}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </CarouselItem>
                                                </CarouselContent>
                                            </Carousel>
                                        </div>
                                        {/* Indicadores de slides - Visibles en todas las pantallas */}
                                        <div className="flex justify-center items-center mt-4 sm:mt-6 space-x-2 w-full">
                                            {Array.from({ length: count }, (_, index) => (
                                                <div
                                                    key={index}
                                                    className={`w-2 h-2 rounded-full transition-colors duration-300 hover:cursor-pointer ${current === index + 1
                                                        ? 'bg-[#003366]'
                                                        : 'bg-[#003366]/30'
                                                        }`}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
});

AboutSection.displayName = 'AboutSection';

export default AboutSection; 