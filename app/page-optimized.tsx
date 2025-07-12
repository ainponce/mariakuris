"use client";

import { memo } from 'react';
import dynamic from 'next/dynamic';
import Header from '@/shared/components/Header';
import ErrorBoundary from '@/shared/components/ErrorBoundary';
import { PageTransition } from '@/components/PageTransition';
import { useSimpleScrollY } from '@/shared/hooks/useScrollY';
import { useAnimations } from '@/shared/hooks/useOptimizedAnimations';
import {
    LazyHeroSection,
    LazyServicesSection,
    LazyOnVisible
} from '@/shared/components/LazyComponents';

// Cargar componentes de manera dinámica con optimizaciones
const LazyAboutSection = dynamic(
    () => import('@/features/about/AboutSection'),
    {
        loading: () => (
            <div className="py-20">
                <div className="container mx-auto px-4">
                    <div className="animate-pulse space-y-4">
                        <div className="h-12 bg-gray-200 rounded w-3/4 mx-auto"></div>
                        <div className="h-6 bg-gray-200 rounded w-1/2 mx-auto"></div>
                        <div className="grid lg:grid-cols-2 gap-12 mt-12">
                            <div className="space-y-4">
                                <div className="h-6 bg-gray-200 rounded"></div>
                                <div className="h-6 bg-gray-200 rounded"></div>
                                <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                            </div>
                            <div className="h-48 bg-gray-200 rounded"></div>
                        </div>
                    </div>
                </div>
            </div>
        ),
        ssr: false
    }
);

const LazyContactSection = dynamic(
    () => import('@/features/contact/ContactSection'),
    {
        loading: () => (
            <div className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="animate-pulse space-y-4">
                        <div className="h-12 bg-gray-200 rounded w-2/3 mx-auto"></div>
                        <div className="grid lg:grid-cols-2 gap-12 mt-12">
                            <div className="space-y-4">
                                <div className="h-12 bg-gray-200 rounded"></div>
                                <div className="h-12 bg-gray-200 rounded"></div>
                                <div className="h-32 bg-gray-200 rounded"></div>
                                <div className="h-12 bg-gray-200 rounded w-32"></div>
                            </div>
                            <div className="space-y-4">
                                <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                                <div className="h-6 bg-gray-200 rounded"></div>
                                <div className="h-6 bg-gray-200 rounded w-5/6"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ),
        ssr: false
    }
);

const OptimizedHomePage = memo(() => {
    // Hook optimizado para scroll con throttling
    const scrollY = useSimpleScrollY();

    // Inicializar animaciones combinadas
    useAnimations({
        scroll: {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px',
            triggerOnce: true
        },
        parallax: {},
        stagger: {
            selector: '[data-stagger]',
            config: { delay: 100 }
        }
    });

    return (
        <ErrorBoundary>
            <PageTransition />
            <div className="flex flex-col min-h-screen bg-[rgb(var(--theme-bg))]">
                {/* Header optimizado */}
                <Header scrollY={scrollY} />

                {/* Hero Section - Carga inmediata */}
                <LazyHeroSection />

                {/* Services Section - Carga cuando es visible */}
                <LazyOnVisible
                    threshold={0.1}
                    rootMargin="100px"
                    fallback={
                        <div className="py-20 bg-gray-50">
                            <div className="container mx-auto px-4">
                                <div className="animate-pulse space-y-4">
                                    <div className="h-12 bg-gray-200 rounded w-2/3 mx-auto"></div>
                                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
                                        {[...Array(6)].map((_, i) => (
                                            <div key={i} className="bg-white rounded-lg p-6 shadow-sm">
                                                <div className="h-12 w-12 bg-gray-200 rounded-full mb-4"></div>
                                                <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                                                <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
                                                <div className="space-y-2">
                                                    {[...Array(4)].map((_, j) => (
                                                        <div key={j} className="h-4 bg-gray-200 rounded w-5/6"></div>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                >
                    <LazyServicesSection />
                </LazyOnVisible>

                {/* About Section - Carga bajo demanda */}
                <LazyOnVisible
                    threshold={0.1}
                    rootMargin="50px"
                >
                    <LazyAboutSection />
                </LazyOnVisible>

                {/* Contact Section - Carga bajo demanda */}
                <LazyOnVisible
                    threshold={0.1}
                    rootMargin="50px"
                >
                    <LazyContactSection />
                </LazyOnVisible>

                {/* Footer - Carga bajo demanda */}
                <LazyOnVisible
                    threshold={0.1}
                    rootMargin="50px"
                    fallback={
                        <div className="bg-gray-800 py-16">
                            <div className="container mx-auto px-4">
                                <div className="animate-pulse space-y-4">
                                    <div className="grid md:grid-cols-3 gap-8">
                                        {[...Array(3)].map((_, i) => (
                                            <div key={i} className="space-y-4">
                                                <div className="h-6 bg-gray-600 rounded w-3/4"></div>
                                                <div className="h-4 bg-gray-600 rounded w-full"></div>
                                                <div className="h-4 bg-gray-600 rounded w-5/6"></div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                >
                    <footer className="bg-[rgb(var(--theme-gradient-to))] border-t border-[#003366]/30 py-16">
                        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
                                <div>
                                    <div className="flex items-center space-x-3 mb-6">
                                        <div className="relative">
                                            <div className="h-10 w-10 bg-[#003366] rounded-full flex items-center justify-center">
                                                <span className="text-white font-bold">MK</span>
                                            </div>
                                            <div className="absolute inset-0 bg-[#003366]/20 rounded-full blur-xl"></div>
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-[rgb(var(--theme-fg))]">Maria Kuris</h3>
                                            <p className="text-[#003366]">Abogada Corporativa</p>
                                        </div>
                                    </div>
                                    <p className="text-[rgb(var(--theme-text))] mb-6 leading-relaxed">
                                        Soluciones jurídicas corporativas integrales con más de 15 años de experiencia profesional.
                                    </p>
                                </div>

                                <div>
                                    <h4 className="text-lg font-semibold text-[rgb(var(--theme-fg))] mb-6">Servicios Corporativos</h4>
                                    <ul className="space-y-3 text-[rgb(var(--theme-text))]">
                                        {[
                                            'Derecho Societario',
                                            'Contratos Corporativos',
                                            'Compliance Corporativo',
                                            'Gobierno Corporativo',
                                            'M&A y Transacciones',
                                            'Derecho Financiero',
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
                                    <h4 className="text-lg font-semibold text-[rgb(var(--theme-fg))] mb-6">Contacto</h4>
                                    <ul className="space-y-3 text-[rgb(var(--theme-text))]">
                                        <li className="flex items-center space-x-2">
                                            <div className="w-1.5 h-1.5 bg-[#003366] rounded-full"></div>
                                            <span>Buenos Aires, Argentina</span>
                                        </li>
                                        <li className="flex items-center space-x-2">
                                            <div className="w-1.5 h-1.5 bg-[#003366] rounded-full"></div>
                                            <span>contacto@mariakuris.com</span>
                                        </li>
                                        <li className="flex items-center space-x-2">
                                            <div className="w-1.5 h-1.5 bg-[#003366] rounded-full"></div>
                                            <span>+54 11 1234-5678</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div className="border-t border-[#003366]/30 mt-12 pt-8 text-center">
                                <p className="text-[rgb(var(--theme-text))] text-sm">
                                    © {new Date().getFullYear()} Maria Kuris. Todos los derechos reservados.
                                </p>
                            </div>
                        </div>
                    </footer>
                </LazyOnVisible>
            </div>
        </ErrorBoundary>
    );
});

OptimizedHomePage.displayName = 'OptimizedHomePage';

export default OptimizedHomePage; 