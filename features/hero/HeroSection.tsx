"use client";

import { memo, useMemo, useCallback } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/contexts/OptimizedLanguageContext';
import { useSmoothScroll } from '@/shared/hooks/useOptimizedAnimations';

interface HeroSectionProps {
    className?: string;
    onCTAClick?: () => void;
}

const HeroSection = memo(({ className = '', onCTAClick }: HeroSectionProps) => {
    const t = useTranslation();
    const smoothScroll = useSmoothScroll();

    // Memoizar el video source
    const videoSource = useMemo(() =>
        "https://3yfctedxuyowr5e7.public.blob.vercel-storage.com/background-hero-section-new-e1Frf8Qf9ag4wq7LdAVJSUwVfSBNGC.webm",
        []
    );

    // Handler para el CTA
    const handleCTAClick = useCallback(() => {
        if (onCTAClick) {
            onCTAClick();
        } else {
            smoothScroll('contacto');
        }
    }, [onCTAClick, smoothScroll]);

    return (
        <section
            id="inicio"
            className={`
        relative min-h-screen bg-gradient-to-br 
        from-[rgb(var(--theme-gradient-from))] 
        via-[rgb(var(--theme-gradient-to))] 
        to-[#003366]/20 overflow-hidden ${className}
      `}
        >
            {/* Video Background */}
            <div className="absolute inset-0 z-0">
                <video
                    className="w-full h-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    aria-hidden="true"
                >
                    <source src={videoSource} type="video/webm" />
                    {t('videoNotSupported')}
                </video>
                {/* Video Overlay for text readability */}
                <div
                    className="absolute inset-0 bg-[rgb(var(--theme-video-overlay))]/[var(--theme-video-opacity)]"
                    aria-hidden="true"
                />
            </div>

            {/* Background Pattern with Parallax */}
            <div
                className="absolute inset-0 opacity-10 z-10"
                data-parallax
                data-parallax-speed="0.2"
                aria-hidden="true"
            >
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `radial-gradient(circle at 25% 25%, #003366 0%, transparent 50%), 
                         radial-gradient(circle at 75% 75%, #003366 0%, transparent 50%)`,
                    }}
                />
            </div>

            {/* Floating Background Elements */}
            <div
                className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#003366]/5 rounded-full blur-3xl z-10"
                data-parallax
                data-parallax-speed="0.3"
                aria-hidden="true"
            />
            <div
                className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-[#003366]/3 rounded-full blur-3xl z-10"
                data-parallax
                data-parallax-speed="0.4"
                aria-hidden="true"
            />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
                <div className="flex flex-col items-center justify-center min-h-screen py-20 text-center">
                    {/* Main Content */}
                    <div className="space-y-8 max-w-4xl mx-auto" data-animate>
                        <div className="space-y-6">
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-[rgb(var(--theme-fg))] leading-tight">
                                {t('asesoriaLegal')}
                                <span className="block bg-gradient-to-r from-[#003366] to-[#004488] bg-clip-text text-transparent">
                                    {t('corporativa')}
                                </span>
                            </h1>

                            <p className="text-xl sm:text-2xl text-[rgb(var(--theme-text))] leading-relaxed max-w-2xl mx-auto">
                                {t('heroDescription')}
                            </p>
                        </div>

                        <div className="flex justify-center">
                            <Button
                                size="lg"
                                onClick={handleCTAClick}
                                className="bg-[#003366] hover:bg-[#003366]/80 text-[#FFFFFF] font-semibold shadow-xl hover:shadow-[#003366]/25 transition-all duration-300 group"
                                aria-label={`${t('consultaCorporativa')} - Contactar`}
                            >
                                {t('consultaCorporativa')}
                                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
});

HeroSection.displayName = 'HeroSection';

export default HeroSection; 