import { useEffect, useRef } from 'react'

interface UseScrollAnimationsOptions {
  threshold?: number
  rootMargin?: string
  triggerOnce?: boolean
}

export const useScrollAnimations = (options: UseScrollAnimationsOptions = {}) => {
  const {
    threshold = 0.08,
    rootMargin = '0px 0px -30px 0px',
    triggerOnce = true
  } = options

  useEffect(() => {
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        const target = entry.target as HTMLElement
        
        if (entry.isIntersecting) {
          // Add visible class with a longer delay for smoother effect
          setTimeout(() => {
            target.classList.add('visible')
          }, 150)
          
          // If triggerOnce is true, stop observing this element
          if (triggerOnce) {
            observer.unobserve(target)
          }
        } else if (!triggerOnce) {
          // Remove visible class with a small delay when going out of view
          setTimeout(() => {
            target.classList.remove('visible')
          }, 50)
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, {
      threshold,
      rootMargin
    })

    // Observe all elements with scroll reveal classes
    const scrollElements = document.querySelectorAll(
      '.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .scroll-reveal-scale, .scroll-reveal-down, .card'
    )

    scrollElements.forEach((element) => {
      observer.observe(element)
    })

    // Cleanup
    return () => {
      observer.disconnect()
    }
  }, [threshold, rootMargin, triggerOnce])
}

export const useParallax = () => {
  useEffect(() => {
    let ticking = false

    const updateParallax = () => {
      const scrolled = window.pageYOffset
      const parallaxElements = document.querySelectorAll('.parallax')
      
      parallaxElements.forEach((element) => {
        const htmlElement = element as HTMLElement
        const speed = parseFloat(htmlElement.dataset.speed || '0.3')
        const yPos = -(scrolled * speed)
        
        // Use transform3d for better performance
        htmlElement.style.transform = `translate3d(0, ${yPos}px, 0)`
      })
      
      ticking = false
    }

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateParallax)
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])
}

export const useStaggeredAnimations = (selector: string, delay: number = 100) => {
  useEffect(() => {
    const elements = document.querySelectorAll(selector)
    
    elements.forEach((element, index) => {
      const htmlElement = element as HTMLElement
      htmlElement.style.animationDelay = `${index * delay}ms`
    })
  }, [selector, delay])
} 