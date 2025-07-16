"use client"

import { useEffect, useState } from "react"
import { PageTransition } from "@/components/PageTransition"
import { useScrollAnimations, useParallax, useStaggeredAnimations } from "@/hooks/use-scroll-animations"
import Header from "@/shared/components/Header"
import HeroSection from "@/features/hero/HeroSection"
import ServicesSection from "@/features/services/ServicesSection"
import AboutSection from "@/features/about/AboutSection"
import ContactSection from "@/features/contact/ContactSection"
import Footer from "@/shared/components/Footer"

export default function Home() {
  const [scrollY, setScrollY] = useState(0)

  // Initialize scroll animations
  useScrollAnimations()
  useParallax()
  useStaggeredAnimations('.stagger-item', 150)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <PageTransition />
      <div className="flex flex-col min-h-screen bg-[hsl(var(--background))]">
        {/* Header */}
        <Header scrollY={scrollY} />

        {/* Hero Section */}
        <HeroSection />

        {/* Services Section */}
        <ServicesSection />

        {/* About Section */}
        <AboutSection />

        {/* Contact Section */}
        <ContactSection />

        {/* Footer */}
        <Footer />
      </div>
    </>
  )
}
