"use client";

import { memo, useCallback, useMemo, useState } from 'react';
import Link from 'next/link';
import { Scale, Menu, X } from 'lucide-react';
import { LanguageToggle } from '@/components/LanguageToggle';
import { useLanguage } from '@/contexts/LanguageContext';
import { useSmoothScroll } from '@/shared/hooks/useOptimizedAnimations';

interface HeaderProps {
    scrollY: number;
    className?: string;
}

interface NavItem {
    href: string;
    translationKey: string;
    id: string;
}

const Header = memo(({ scrollY, className = '' }: HeaderProps) => {
    const { t } = useLanguage();
    const smoothScroll = useSmoothScroll();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Memoizar los elementos de navegación
    const navItems: NavItem[] = useMemo(() => [
        { href: '#inicio', translationKey: 'inicio', id: 'inicio' },
        { href: '#servicios', translationKey: 'servicios', id: 'servicios' },
        { href: '#sobre-mi', translationKey: 'sobreMi', id: 'sobre-mi' },
        { href: '#contacto', translationKey: 'contacto', id: 'contacto' },
    ], []);

    // Calcular la opacidad del header basada en el scroll
    const headerOpacity = useMemo(() => {
        const maxScrollForOpacity = 80;
        const opacity = Math.min(scrollY / maxScrollForOpacity, 1);
        return opacity;
    }, [scrollY]);

    // Memoizar los estilos dinámicos para el header transparente
    const headerStyles = useMemo(() => ({
        background: scrollY > 10 || mobileMenuOpen
            ? `linear-gradient(135deg, rgba(255, 255, 255, ${0.95 * (mobileMenuOpen ? 1 : headerOpacity)}) 0%, rgba(248, 250, 252, ${0.92 * (mobileMenuOpen ? 1 : headerOpacity)}) 100%)`
            : 'transparent',
        backdropFilter: scrollY > 10 || mobileMenuOpen ? 'blur(20px) saturate(180%)' : 'blur(0px)',
        WebkitBackdropFilter: scrollY > 10 || mobileMenuOpen ? 'blur(20px) saturate(180%)' : 'blur(0px)',
        borderBottom: scrollY > 30 || mobileMenuOpen ? '1px solid rgba(0, 51, 102, 0.08)' : '1px solid transparent',
        boxShadow: scrollY > 40 || mobileMenuOpen ? '0 8px 32px rgba(0, 51, 102, 0.06)' : 'none',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
    }), [scrollY, headerOpacity, mobileMenuOpen]);

    // Estilos para el texto que cambia según el fondo - SIEMPRE WHITE cuando transparente, BLACK cuando opaco
    const textStyles = useMemo(() => ({
        color: headerOpacity > 0.3 || mobileMenuOpen ? '#1e293b' : '#ffffff',
        textShadow: headerOpacity < 0.3 && !mobileMenuOpen ? '0 2px 4px rgba(0, 0, 0, 0.3)' : 'none',
        fontWeight: 500,
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
    }), [headerOpacity, mobileMenuOpen]);

    // Estilos para el logo - SIEMPRE WHITE cuando transparente, BLUE cuando opaco
    const logoStyles = useMemo(() => ({
        color: headerOpacity > 0.3 || mobileMenuOpen ? '#003366' : '#ffffff',
        filter: headerOpacity < 0.3 && !mobileMenuOpen ? 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))' : 'none',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
    }), [headerOpacity, mobileMenuOpen]);

    // Estilos para el nombre principal - SIEMPRE WHITE cuando transparente, BLACK cuando opaco
    const nameStyles = useMemo(() => ({
        color: headerOpacity > 0.3 || mobileMenuOpen ? '#0f172a' : '#ffffff',
        textShadow: headerOpacity < 0.3 && !mobileMenuOpen ? '0 2px 4px rgba(0, 0, 0, 0.4)' : 'none',
        fontWeight: 700,
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
    }), [headerOpacity, mobileMenuOpen]);

    // Handler para navegación suave
    const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
        e.preventDefault();
        setMobileMenuOpen(false);
        smoothScroll(targetId);
    }, [smoothScroll]);

    // Handler para toggle del menú móvil
    const toggleMobileMenu = useCallback(() => {
        setMobileMenuOpen(!mobileMenuOpen);
    }, [mobileMenuOpen]);

    return (
        <header
            className={`
                fixed top-0 left-0 right-0 z-50 transition-all duration-300 
                ${className}
            `}
            style={headerStyles}
        >
            <div className="w-full px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between py-4 lg:py-5 relative">
                    {/* Logo y título */}
                    <div className="flex items-center space-x-3 sm:space-x-4">
                        <div className="relative">
                            <Scale
                                className="h-10 w-10 sm:h-11 sm:w-11 lg:h-12 lg:w-12 transition-all duration-300"
                                style={logoStyles}
                            />
                        </div>
                        <div>
                            <h1
                                className="text-lg sm:text-xl lg:text-2xl font-bold transition-all duration-300 tracking-tight"
                                style={nameStyles}
                            >
                                Maria Kuris
                            </h1>
                            <p
                                className="text-xs sm:text-sm lg:text-base transition-all duration-300 opacity-90"
                                style={{
                                    ...textStyles,
                                    fontWeight: 400
                                }}
                            >
                                {t('lawyer')}
                            </p>
                        </div>
                    </div>

                    {/* Navegación principal - Desktop - Centrada absolutamente */}
                    <nav className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 space-x-6 lg:space-x-8 xl:space-x-12" aria-label="Navegación principal">
                        {navItems.map(({ href, translationKey, id }) => (
                            <Link
                                key={id}
                                href={href}
                                onClick={(e) => handleNavClick(e, id)}
                                className="
                                    relative group py-2 px-2 transition-all duration-300 
                                    text-base lg:text-lg font-medium tracking-wide
                                    hover:scale-105 active:scale-95 whitespace-nowrap
                                "
                                style={textStyles}
                                aria-label={`Ir a ${t(translationKey as any)}`}
                            >
                                {t(translationKey as any)}
                                <span
                                    className="absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full rounded-full"
                                    style={{
                                        backgroundColor: headerOpacity > 0.3 || mobileMenuOpen ? '#003366' : '#ffffff',
                                        boxShadow: headerOpacity < 0.3 && !mobileMenuOpen ? '0 0 4px rgba(255, 255, 255, 0.5)' : 'none'
                                    }}
                                ></span>
                            </Link>
                        ))}
                    </nav>

                    {/* Toggle de idioma + Menú móvil */}
                    <div className="flex items-center space-x-4 sm:space-x-5">
                        <LanguageToggle
                            color={textStyles.color}
                            isTransparent={headerOpacity < 0.3 && !mobileMenuOpen}
                        />

                        {/* Botón menú móvil */}
                        <button
                            onClick={toggleMobileMenu}
                            className="md:hidden p-2 rounded-lg transition-all duration-300 hover:bg-black/10"
                            style={{
                                color: textStyles.color,
                                filter: headerOpacity < 0.3 && !mobileMenuOpen ? 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))' : 'none'
                            }}
                            aria-label="Toggle mobile menu"
                        >
                            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {/* Menú móvil */}
                {mobileMenuOpen && (
                    <div className="md:hidden border-t border-gray-200/20 bg-white/95 backdrop-blur-md">
                        <nav className="py-4 space-y-2">
                            {navItems.map(({ href, translationKey, id }) => (
                                <Link
                                    key={id}
                                    href={href}
                                    onClick={(e) => handleNavClick(e, id)}
                                    className="
                                        block px-4 py-3 text-lg font-medium text-gray-800 
                                        hover:bg-gray-100/50 hover:text-blue-600 
                                        transition-all duration-300 rounded-lg mx-2
                                    "
                                    aria-label={`Ir a ${t(translationKey as any)}`}
                                >
                                    {t(translationKey as any)}
                                </Link>
                            ))}
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
});

Header.displayName = 'Header';

export default Header; 