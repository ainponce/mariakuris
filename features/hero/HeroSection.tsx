"use client";

import { memo, useMemo, useCallback } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useSmoothScroll } from '@/shared/hooks/useOptimizedAnimations';

interface HeroSectionProps {
    className?: string;
    onCTAClick?: () => void;
}

const HeroSection = memo(({ className = '', onCTAClick }: HeroSectionProps) => {
    const { t } = useLanguage();
    const smoothScroll = useSmoothScroll();

    // Memoizar el video source
    const videoSource = useMemo(() =>
        "https://3yfctedxuyowr5e7.public.blob.vercel-storage.com/background-hero-section.mp4",
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
        from-slate-900 via-slate-800 to-slate-900
        overflow-hidden ${className}
      `}
        >
            {/* Video Background */}
            <div className="absolute inset-0 z-0">
                {/* Fallback background para dispositivos que no soportan video */}
                <div
                    className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 1920 1080\'%3E%3Crect width=\'1920\' height=\'1080\' fill=\'%23334155\'/%3E%3C/svg%3E")'
                    }}
                />

                <video
                    className="w-full h-full object-cover relative z-10"
                    autoPlay
                    muted
                    loop
                    playsInline
                    webkit-playsinline="true"
                    preload="auto"
                    aria-hidden="true"
                    controlsList="nodownload nofullscreen noremoteplayback"
                    disablePictureInPicture
                    poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1920 1080'%3E%3Crect width='1920' height='1080' fill='%23334155'/%3E%3C/svg%3E"
                >
                    <source src={videoSource} type="video/mp4" />
                    <source src="https://3yfctedxuyowr5e7.public.blob.vercel-storage.com/background-hero-section.webm" type="video/webm" />
                    Su navegador no soporta el elemento video.
                </video>

                {/* Overlay mejorado con gradiente más oscuro */}
                <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/50 to-slate-900/70" />

                {/* Overlay adicional para mejor legibilidad */}
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900/40 via-slate-900/30 to-slate-900/40" />
            </div>

            {/* Elementos decorativos mejorados */}
            <div className="absolute inset-0 z-10">
                {/* Elementos flotantes con mejor posicionamiento */}
                <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-white/5 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
                <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-white/3 rounded-full blur-2xl animate-pulse delay-500" />
            </div>

            {/* Contenido principal */}
            <div className="w-full px-4 sm:px-6 lg:px-8 relative z-20">
                <div className="flex flex-col justify-center min-h-screen py-20">
                    <div className="space-y-8 max-w-4xl" data-animate>

                        {/* Título principal simple */}
                        <div className="space-y-6">
                            <h2 className="text-lg sm:text-xl lg:text-2xl text-white font-medium leading-relaxed">
                                Conozca más sobre nuestra trayectoria
                            </h2>

                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
                                Experiencia en soluciones legales corporativas de excelencia
                            </h1>
                        </div>

                        {/* Botón simple */}
                        <div>
                            <Button
                                size="lg"
                                onClick={() => smoothScroll('sobre-mi')}
                                className="
                                    bg-transparent border-2 border-white 
                                    hover:bg-white 
                                    text-white hover:text-white/0
                                    font-medium
                                    px-8 py-3 text-base
                                    transition-all duration-300
                                    transform hover:scale-105 active:scale-95
                                    rounded-none
                                "
                            >
                                Ver más
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