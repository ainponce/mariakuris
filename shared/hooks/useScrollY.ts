"use client";

import { useEffect, useState, useCallback, useRef } from 'react';

interface UseScrollYOptions {
  throttle?: number;
  threshold?: number;
}

export function useScrollY(options: UseScrollYOptions = {}) {
  const { throttle = 16, threshold = 1 } = options;
  const [scrollY, setScrollY] = useState(0);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  const updateScrollY = useCallback(() => {
    const currentScrollY = window.scrollY;
    
    // Solo actualizar si el cambio es significativo
    if (Math.abs(currentScrollY - lastScrollY.current) > threshold) {
      setScrollY(currentScrollY);
      lastScrollY.current = currentScrollY;
    }
    
    ticking.current = false;
  }, [threshold]);

  const handleScroll = useCallback(() => {
    if (!ticking.current) {
      requestAnimationFrame(updateScrollY);
      ticking.current = true;
    }
  }, [updateScrollY]);

  useEffect(() => {
    // Configurar scroll inicial
    setScrollY(window.scrollY);
    lastScrollY.current = window.scrollY;

    // Throttle usando requestAnimationFrame
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return scrollY;
}

// Hook simplificado para casos básicos
export function useSimpleScrollY() {
  return useScrollY({ throttle: 16, threshold: 1 });
} 