import { AppError } from '@/shared/types/error.types';
import { logger } from '@/services/error-handling/logger';

// Tipos para las animaciones
export interface AnimationConfig {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  delay?: number;
  duration?: number;
  easing?: string;
}

export interface ParallaxConfig {
  speed?: number;
  axis?: 'x' | 'y' | 'both';
  bounds?: [number, number];
  precision?: number;
}

export interface StaggerConfig {
  delay?: number;
  direction?: 'normal' | 'reverse';
  maxDelay?: number;
}

// Cache para observadores
const observerCache = new Map<string, IntersectionObserver>();

// Función para crear un ID único basado en configuración
function createObserverKey(config: AnimationConfig): string {
  return `${config.threshold}-${config.rootMargin}-${config.triggerOnce}`;
}

// Función de debounce optimizada
function debounce<T extends (...args: any[]) => void>(
  func: T,
  wait: number,
  immediate?: boolean
): T {
  let timeout: NodeJS.Timeout | null;
  
  return ((...args: Parameters<T>) => {
    const later = () => {
      timeout = null;
      if (!immediate) func(...args);
    };
    
    const callNow = immediate && !timeout;
    
    if (timeout) {
      clearTimeout(timeout);
    }
    
    timeout = setTimeout(later, wait);
    
    if (callNow) {
      func(...args);
    }
  }) as T;
}

// Función para verificar si un elemento es visible
function isElementVisible(element: Element): boolean {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// Clase principal para manejo de animaciones
export class AnimationService {
  private static instance: AnimationService;
  private animationFrame: number | null = null;
  private scrollListeners: Set<() => void> = new Set();
  private isScrolling = false;
  private parallaxElements: Map<Element, ParallaxConfig> = new Map();

  private constructor() {}

  public static getInstance(): AnimationService {
    if (!AnimationService.instance) {
      AnimationService.instance = new AnimationService();
    }
    return AnimationService.instance;
  }

  // Método para inicializar animaciones de scroll
  public initScrollAnimations(config: AnimationConfig = {}): () => void {
    try {
      const {
        threshold = 0.1,
        rootMargin = '0px 0px -50px 0px',
        triggerOnce = true,
        delay = 0
      } = config;

      const observerKey = createObserverKey(config);
      
      // Reutilizar observador si ya existe
      let observer = observerCache.get(observerKey);
      
      if (!observer) {
        observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              const target = entry.target as HTMLElement;
              
              if (entry.isIntersecting) {
                const animationDelay = delay + (parseInt(target.dataset.delay || '0'));
                
                setTimeout(() => {
                  try {
                    target.classList.add('animate-in');
                    target.style.opacity = '1';
                    target.style.transform = 'translateY(0) scale(1)';
                  } catch (error) {
                    logger.warn('Error applying animation', {
                      element: target.tagName,
                      error: error instanceof Error ? error.message : 'Unknown error'
                    });
                  }
                }, animationDelay);
                
                if (triggerOnce) {
                  observer!.unobserve(target);
                }
              } else if (!triggerOnce) {
                target.classList.remove('animate-in');
                target.style.opacity = '0';
                target.style.transform = 'translateY(20px) scale(0.95)';
              }
            });
          },
          { threshold, rootMargin }
        );
        
        observerCache.set(observerKey, observer);
      }

      // Observar elementos
      const elements = document.querySelectorAll(
        '[data-animate], .scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .scroll-reveal-scale'
      );
      
      elements.forEach((element) => {
        const htmlElement = element as HTMLElement;
        
        // Configurar estilos iniciales
        htmlElement.style.opacity = '0';
        htmlElement.style.transform = 'translateY(20px) scale(0.95)';
        htmlElement.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        observer!.observe(element);
      });

      // Función de limpieza
      return () => {
        observer?.disconnect();
        observerCache.delete(observerKey);
      };
    } catch (error) {
      const appError = new AppError(
        'Error initializing scroll animations',
        'ANIMATION_ERROR',
        undefined,
        { config }
      );
      logger.log(appError, 'medium');
      
      // Retornar función vacía como fallback
      return () => {};
    }
  }

  // Método para inicializar efectos parallax
  public initParallax(elements?: NodeListOf<Element> | Element[]): () => void {
    try {
      const elementsToAnimate = elements || document.querySelectorAll('[data-parallax]');
      
      // Limpiar elementos anteriores
      this.parallaxElements.clear();
      
      // Registrar elementos
      elementsToAnimate.forEach((element) => {
        const htmlElement = element as HTMLElement;
        const speed = parseFloat(htmlElement.dataset.parallaxSpeed || '0.5');
        const axis = (htmlElement.dataset.parallaxAxis || 'y') as 'x' | 'y' | 'both';
        const bounds = htmlElement.dataset.parallaxBounds
          ? JSON.parse(htmlElement.dataset.parallaxBounds)
          : [-200, 200];
        
        this.parallaxElements.set(element, {
          speed,
          axis,
          bounds,
          precision: 2
        });
      });

      // Configurar listener de scroll optimizado
      const parallaxUpdate = debounce(() => {
        if (this.isScrolling) return;
        
        this.isScrolling = true;
        
        if (this.animationFrame) {
          cancelAnimationFrame(this.animationFrame);
        }
        
        this.animationFrame = requestAnimationFrame(() => {
          this.updateParallaxElements();
          this.isScrolling = false;
        });
      }, 16); // 60fps

      this.scrollListeners.add(parallaxUpdate);
      window.addEventListener('scroll', parallaxUpdate, { passive: true });

      // Función de limpieza
      return () => {
        window.removeEventListener('scroll', parallaxUpdate);
        this.scrollListeners.delete(parallaxUpdate);
        this.parallaxElements.clear();
        
        if (this.animationFrame) {
          cancelAnimationFrame(this.animationFrame);
          this.animationFrame = null;
        }
      };
    } catch (error) {
      const appError = new AppError(
        'Error initializing parallax',
        'PARALLAX_ERROR',
        undefined,
        { elementCount: elements?.length || 0 }
      );
      logger.log(appError, 'medium');
      
      return () => {};
    }
  }

  // Método para aplicar animaciones stagger
  public initStaggeredAnimations(
    selector: string,
    config: StaggerConfig = {}
  ): () => void {
    try {
      const {
        delay = 100,
        direction = 'normal',
        maxDelay = 2000
      } = config;

      const elements = document.querySelectorAll(selector);
      
      elements.forEach((element, index) => {
        const htmlElement = element as HTMLElement;
        const calculatedDelay = direction === 'reverse' 
          ? delay * (elements.length - index - 1)
          : delay * index;
        
        // Limitar delay máximo
        const finalDelay = Math.min(calculatedDelay, maxDelay);
        
        htmlElement.style.animationDelay = `${finalDelay}ms`;
        htmlElement.dataset.delay = finalDelay.toString();
      });

      // Función de limpieza
      return () => {
        elements.forEach((element) => {
          const htmlElement = element as HTMLElement;
          htmlElement.style.animationDelay = '';
          delete htmlElement.dataset.delay;
        });
      };
    } catch (error) {
      const appError = new AppError(
        'Error initializing staggered animations',
        'STAGGER_ERROR',
        undefined,
        { selector, config }
      );
      logger.log(appError, 'medium');
      
      return () => {};
    }
  }

  // Método privado para actualizar elementos parallax
  private updateParallaxElements(): void {
    const scrollY = window.pageYOffset;
    const windowHeight = window.innerHeight;
    
    this.parallaxElements.forEach((config, element) => {
      try {
        const htmlElement = element as HTMLElement;
        const rect = htmlElement.getBoundingClientRect();
        const elementTop = rect.top + scrollY;
        const elementHeight = rect.height;
        
        // Calcular si el elemento está en el viewport
        const isInViewport = (
          rect.top < windowHeight &&
          rect.bottom > 0
        );
        
        if (!isInViewport) return;
        
        // Calcular offset
        const offset = (scrollY - elementTop + windowHeight) / (windowHeight + elementHeight);
        const movement = (offset - 0.5) * config.speed! * 100;
        
        // Aplicar límites
        const clampedMovement = Math.max(
          config.bounds![0],
          Math.min(config.bounds![1], movement)
        );
        
        // Redondear para mejor performance
        const roundedMovement = Math.round(clampedMovement * (config.precision || 1)) / (config.precision || 1);
        
        // Aplicar transformación
        let transform = '';
        
        if (config.axis === 'x') {
          transform = `translateX(${roundedMovement}px)`;
        } else if (config.axis === 'y') {
          transform = `translateY(${roundedMovement}px)`;
        } else {
          transform = `translate(${roundedMovement}px, ${roundedMovement}px)`;
        }
        
        htmlElement.style.transform = transform;
        htmlElement.style.willChange = 'transform';
      } catch (error) {
        logger.warn('Error updating parallax element', {
          element: (element as HTMLElement).tagName,
          error: error instanceof Error ? error.message : 'Unknown error'
        });
      }
    });
  }

  // Método para limpiar todas las animaciones
  public cleanup(): void {
    try {
      // Limpiar listeners de scroll
      this.scrollListeners.forEach((listener) => {
        window.removeEventListener('scroll', listener);
      });
      this.scrollListeners.clear();
      
      // Limpiar animation frame
      if (this.animationFrame) {
        cancelAnimationFrame(this.animationFrame);
        this.animationFrame = null;
      }
      
      // Limpiar observadores
      observerCache.forEach((observer) => {
        observer.disconnect();
      });
      observerCache.clear();
      
      // Limpiar elementos parallax
      this.parallaxElements.clear();
      
      this.isScrolling = false;
    } catch (error) {
      logger.error('Error during animation cleanup', {
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }
}

// Instancia singleton
export const animationService = AnimationService.getInstance(); 