"use client";

import { useEffect, useRef, useCallback } from 'react';
import { animationService, AnimationConfig, ParallaxConfig, StaggerConfig } from '@/services/animation/animationService';
import { useErrorHandler } from '@/shared/hooks/useErrorHandler';

// Hook principal para animaciones de scroll
export function useScrollAnimations(config: AnimationConfig = {}) {
  const { handleError } = useErrorHandler({ logLevel: 'medium' });
  const cleanupRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    try {
      cleanupRef.current = animationService.initScrollAnimations(config);
    } catch (error) {
      handleError(error as Error, { context: 'scroll-animations', config });
    }

    return () => {
      if (cleanupRef.current) {
        cleanupRef.current();
        cleanupRef.current = null;
      }
    };
  }, [config.threshold, config.rootMargin, config.triggerOnce, config.delay, handleError]);

  return useCallback(() => {
    if (cleanupRef.current) {
      cleanupRef.current();
      cleanupRef.current = null;
    }
  }, []);
}

// Hook para efectos parallax
export function useParallax(elements?: NodeListOf<Element> | Element[]) {
  const { handleError } = useErrorHandler({ logLevel: 'medium' });
  const cleanupRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    try {
      cleanupRef.current = animationService.initParallax(elements);
    } catch (error) {
      handleError(error as Error, { context: 'parallax', elementCount: elements?.length || 0 });
    }

    return () => {
      if (cleanupRef.current) {
        cleanupRef.current();
        cleanupRef.current = null;
      }
    };
  }, [elements, handleError]);

  return useCallback(() => {
    if (cleanupRef.current) {
      cleanupRef.current();
      cleanupRef.current = null;
    }
  }, []);
}

// Hook para animaciones stagger
export function useStaggeredAnimations(
  selector: string,
  config: StaggerConfig = {}
) {
  const { handleError } = useErrorHandler({ logLevel: 'medium' });
  const cleanupRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    try {
      cleanupRef.current = animationService.initStaggeredAnimations(selector, config);
    } catch (error) {
      handleError(error as Error, { context: 'staggered-animations', selector, config });
    }

    return () => {
      if (cleanupRef.current) {
        cleanupRef.current();
        cleanupRef.current = null;
      }
    };
  }, [selector, config.delay, config.direction, config.maxDelay, handleError]);

  return useCallback(() => {
    if (cleanupRef.current) {
      cleanupRef.current();
      cleanupRef.current = null;
    }
  }, []);
}

// Hook combinado para múltiples animaciones
export function useAnimations(configs: {
  scroll?: AnimationConfig;
  parallax?: { elements?: NodeListOf<Element> | Element[] };
  stagger?: { selector: string; config?: StaggerConfig };
}) {
  const { handleError } = useErrorHandler({ logLevel: 'medium' });
  const cleanupRefs = useRef<(() => void)[]>([]);

  useEffect(() => {
    try {
      const cleanupFunctions: (() => void)[] = [];

      // Inicializar animaciones de scroll
      if (configs.scroll) {
        cleanupFunctions.push(animationService.initScrollAnimations(configs.scroll));
      }

      // Inicializar parallax
      if (configs.parallax) {
        cleanupFunctions.push(animationService.initParallax(configs.parallax.elements));
      }

      // Inicializar stagger
      if (configs.stagger) {
        cleanupFunctions.push(
          animationService.initStaggeredAnimations(
            configs.stagger.selector,
            configs.stagger.config
          )
        );
      }

      cleanupRefs.current = cleanupFunctions;
    } catch (error) {
      handleError(error as Error, { context: 'combined-animations', configs });
    }

    return () => {
      cleanupRefs.current.forEach((cleanup) => cleanup());
      cleanupRefs.current = [];
    };
  }, [configs, handleError]);

  return useCallback(() => {
    cleanupRefs.current.forEach((cleanup) => cleanup());
    cleanupRefs.current = [];
  }, []);
}

// Hook para limpiar todas las animaciones
export function useAnimationCleanup() {
  const { handleError } = useErrorHandler({ logLevel: 'low' });

  return useCallback(() => {
    try {
      animationService.cleanup();
    } catch (error) {
      handleError(error as Error, { context: 'animation-cleanup' });
    }
  }, [handleError]);
}

// Hook para scroll suave
export function useSmoothScroll() {
  const { handleError } = useErrorHandler({ logLevel: 'medium' });

  return useCallback((
    targetId: string,
    options: ScrollIntoViewOptions = { behavior: 'smooth', block: 'start' }
  ) => {
    try {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView(options);
      } else {
        throw new Error(`Element with id '${targetId}' not found`);
      }
    } catch (error) {
      handleError(error as Error, { context: 'smooth-scroll', targetId, options });
    }
  }, [handleError]);
}

// Hook para detectar scroll
export function useScrollDirection() {
  const { handleError } = useErrorHandler({ logLevel: 'low' });
  const lastScrollY = useRef(0);
  const direction = useRef<'up' | 'down' | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      try {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > lastScrollY.current) {
          direction.current = 'down';
        } else if (currentScrollY < lastScrollY.current) {
          direction.current = 'up';
        }
        
        lastScrollY.current = currentScrollY;
      } catch (error) {
        handleError(error as Error, { context: 'scroll-direction' });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleError]);

  return direction.current;
}

// Hook para performance monitoring
export function useAnimationPerformance() {
  const performanceRef = useRef({
    framesDropped: 0,
    averageFPS: 0,
    lastFrameTime: 0
  });

  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    let animationId: number;

    const measurePerformance = (currentTime: number) => {
      frameCount++;
      const delta = currentTime - lastTime;
      
      if (delta >= 1000) {
        const fps = Math.round((frameCount * 1000) / delta);
        performanceRef.current.averageFPS = fps;
        
        if (fps < 30) {
          performanceRef.current.framesDropped++;
        }
        
        frameCount = 0;
        lastTime = currentTime;
      }
      
      performanceRef.current.lastFrameTime = currentTime;
      animationId = requestAnimationFrame(measurePerformance);
    };

    animationId = requestAnimationFrame(measurePerformance);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  return performanceRef.current;
} 