"use client";

import { lazy, Suspense, ComponentType } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { useState, useEffect } from 'react';

// Función para crear un componente lazy con fallback personalizado
function createLazyComponent<T extends ComponentType<any>>(
    importFunc: () => Promise<{ default: T }>,
    fallback?: React.ReactNode
) {
    const LazyComponent = lazy(importFunc);

    return (props: React.ComponentProps<T>) => (
        <Suspense fallback={fallback || <ComponentSkeleton />}>
            <LazyComponent {...props} />
        </Suspense>
    );
}

// Skeleton por defecto
const ComponentSkeleton = () => (
    <div className="w-full space-y-4 p-4">
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            {[...Array(6)].map((_, i) => (
                <div key={i} className="space-y-2">
                    <Skeleton className="h-32 w-full rounded-lg" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                </div>
            ))}
        </div>
    </div>
);

// Skeleton para el Hero Section
const HeroSkeleton = () => (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center space-y-6 max-w-4xl mx-auto px-4">
            <Skeleton className="h-16 w-3/4 mx-auto" />
            <Skeleton className="h-8 w-1/2 mx-auto" />
            <Skeleton className="h-12 w-48 mx-auto rounded-lg" />
        </div>
    </div>
);

// Skeleton para Services Section
const ServicesSkeleton = () => (
    <div className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
            <div className="text-center mb-16">
                <Skeleton className="h-12 w-2/3 mx-auto mb-4" />
                <Skeleton className="h-6 w-3/4 mx-auto" />
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="bg-white rounded-lg p-6 shadow-sm">
                        <Skeleton className="h-12 w-12 rounded-full mb-4" />
                        <Skeleton className="h-6 w-3/4 mb-2" />
                        <Skeleton className="h-4 w-full mb-4" />
                        <div className="space-y-2">
                            {[...Array(4)].map((_, j) => (
                                <Skeleton key={j} className="h-4 w-5/6" />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

// Skeleton para About Section
const AboutSkeleton = () => (
    <div className="py-20">
        <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-4">
                    <Skeleton className="h-12 w-3/4" />
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-6 w-5/6" />
                    <Skeleton className="h-6 w-4/5" />
                </div>
                <div className="space-y-4">
                    <Skeleton className="h-48 w-full rounded-lg" />
                </div>
            </div>
        </div>
    </div>
);

// Skeleton para Contact Section
const ContactSkeleton = () => (
    <div className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
            <div className="text-center mb-16">
                <Skeleton className="h-12 w-2/3 mx-auto mb-4" />
                <Skeleton className="h-6 w-3/4 mx-auto" />
            </div>
            <div className="grid lg:grid-cols-2 gap-12">
                <div className="space-y-4">
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-32 w-full" />
                    <Skeleton className="h-12 w-32" />
                </div>
                <div className="space-y-4">
                    <Skeleton className="h-8 w-3/4" />
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-6 w-5/6" />
                    <Skeleton className="h-6 w-4/5" />
                </div>
            </div>
        </div>
    </div>
);

// Componentes lazy optimizados
export const LazyHeroSection = createLazyComponent(
    () => import('@/features/hero/HeroSection'),
    <HeroSkeleton />
);

export const LazyServicesSection = createLazyComponent(
    () => import('@/features/services/ServicesSection'),
    <ServicesSkeleton />
);

export const LazyAboutSection = createLazyComponent(
    () => import('@/features/about/AboutSection'),
    <AboutSkeleton />
);

export const LazyContactSection = createLazyComponent(
    () => import('@/features/contact/ContactSection'),
    <ContactSkeleton />
);

// Componentes lazy para páginas completas
export const LazyPortfolioPage = createLazyComponent(
    () => import('@/app/portfolio/page'),
    <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#003366]"></div>
    </div>
);

export const LazyServicesPage = createLazyComponent(
    () => import('@/app/services/page'),
    <ServicesSkeleton />
);

export const LazyAboutPage = createLazyComponent(
    () => import('@/app/about/page'),
    <AboutSkeleton />
);

export const LazyContactPage = createLazyComponent(
    () => import('@/app/contact/page'),
    <ContactSkeleton />
);

// Componente para lazy loading con intersection observer
export const LazyOnVisible = ({
    children,
    fallback = <ComponentSkeleton />,
    threshold = 0.1,
    rootMargin = '100px'
}: {
    children: React.ReactNode;
    fallback?: React.ReactNode;
    threshold?: number;
    rootMargin?: string;
}) => {
    const [isVisible, setIsVisible] = useState(false);
    const [ref, setRef] = useState<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!ref) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(ref);
                }
            },
            { threshold, rootMargin }
        );

        observer.observe(ref);

        return () => observer.disconnect();
    }, [ref, threshold, rootMargin]);

    return (
        <div ref={setRef}>
            {isVisible ? children : fallback}
        </div>
    );
};

// Hook para lazy loading manual
export const useLazyLoading = (threshold = 0.1, rootMargin = '100px') => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [ref, setRef] = useState<HTMLElement | null>(null);

    useEffect(() => {
        if (!ref) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsLoaded(true);
                    observer.unobserve(ref);
                }
            },
            { threshold, rootMargin }
        );

        observer.observe(ref);

        return () => observer.disconnect();
    }, [ref, threshold, rootMargin]);

    return { isLoaded, setRef };
}; 