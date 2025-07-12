"use client";

import { memo, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { Scale } from 'lucide-react';
import { LanguageToggle } from '@/components/LanguageToggle';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useTranslation } from '@/contexts/OptimizedLanguageContext';
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
    const t = useTranslation();
    const smoothScroll = useSmoothScroll();

    // Memoizar los elementos de navegación
    const navItems: NavItem[] = useMemo(() => [
        { href: '#inicio', translationKey: 'inicio', id: 'inicio' },
        { href: '#servicios', translationKey: 'servicios', id: 'servicios' },
        { href: '#sobre-mi', translationKey: 'sobreMi', id: 'sobre-mi' },
        { href: '#contacto', translationKey: 'contacto', id: 'contacto' },
    ], []);

    // Memoizar los estilos dinámicos
    const headerStyles = useMemo(() => ({
        transform: `translateY(${Math.min(scrollY * 0.1, 10)}px)`,
        boxShadow: scrollY > 50 ? '0 4px 20px rgba(0, 51, 102, 0.1)' : 'none'
    }), [scrollY]);

    // Handler para navegación suave
    const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
        e.preventDefault();
        smoothScroll(targetId);
    }, [smoothScroll]);

    return (
        <header
            className={`
        border-b border-[#003366]/30 bg-[rgb(var(--theme-header-bg))]/95 
        backdrop-blur-sm sticky top-0 z-50 transition-all duration-300 
        scroll-reveal-down shadow-sm ${className}
      `}
            style={headerStyles}
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4">
                    {/* Logo y título */}
                    <div className="flex items-center space-x-3">
                        <div className="relative">
                            <Scale className="h-10 w-10 text-[#003366]" />
                            <div className="absolute inset-0 bg-[#003366]/20 rounded-full blur-xl"></div>
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-[rgb(var(--theme-fg))]">
                                Maria Kuris
                            </h1>
                            <p className="text-sm text-[#003366]">
                                {t('lawyer')}
                            </p>
                        </div>
                    </div>

                    {/* Navegación principal */}
                    <nav className="hidden md:flex space-x-8" aria-label="Navegación principal">
                        {navItems.map(({ href, translationKey, id }) => (
                            <Link
                                key={id}
                                href={href}
                                onClick={(e) => handleNavClick(e, id)}
                                className="text-[rgb(var(--theme-text))] hover:text-[#003366] transition-colors duration-300 relative group"
                                aria-label={`Ir a ${t(translationKey as any)}`}
                            >
                                {t(translationKey as any)}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#003366] transition-all duration-300 group-hover:w-full"></span>
                            </Link>
                        ))}
                    </nav>

                    {/* Controles de tema e idioma */}
                    <div className="flex items-center space-x-3">
                        <ThemeToggle />
                        <LanguageToggle />
                    </div>
                </div>
            </div>
        </header>
    );
});

Header.displayName = 'Header';

export default Header; 