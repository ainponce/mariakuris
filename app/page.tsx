"use client"

import {
  ArrowRight,
  Award,
  BookOpen,
  Building2,
  Mail,
  MapPin,
  Phone,
  Scale,
  Users,
  Play,
  Briefcase,
} from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { LanguageToggle } from "@/components/LanguageToggle"
import { ThemeToggle } from "@/components/ThemeToggle"
import { PageTransition } from "@/components/PageTransition"
import { useLanguage } from "@/contexts/LanguageContext"
import { useScrollAnimations, useParallax, useStaggeredAnimations } from "@/hooks/use-scroll-animations"

export default function Home() {
  const [scrollY, setScrollY] = useState(0)
  const { t } = useLanguage()

  // Initialize scroll animations
  useScrollAnimations()
  useParallax()
  useStaggeredAnimations('.stagger-item', 150)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Services data structure
  const services = [
    {
      icon: Building2,
      titleKey: 'derechoSocietario' as const,
      descriptionKey: 'derechoSocietarioDesc' as const,
      services: [
        "Constitución de sociedades",
        "Transformaciones societarias",
        "Fusiones y escisiones",
        "Aumentos de capital",
      ],
    },
    {
      icon: Briefcase,
      titleKey: 'contratosCorporativos' as const,
      descriptionKey: 'contratosCorporativosDesc' as const,
      services: [
        "Contratos de distribución",
        "Joint ventures",
        "Acuerdos de licencia",
        "Contratos internacionales",
      ],
    },
    {
      icon: Scale,
      titleKey: 'complianceCorporativo' as const,
      descriptionKey: 'complianceCorporativoDesc' as const,
      services: ["Programas de compliance", "Due diligence", "Auditorías legales", "Políticas internas"],
    },
    {
      icon: Users,
      titleKey: 'gobiernoCorportivo' as const,
      descriptionKey: 'gobiernoCorportativoDesc' as const,
      services: [
        "Estructuras de gobierno",
        "Asambleas y directorios",
        "Protocolos familiares",
        "Conflictos societarios",
      ],
    },
    {
      icon: Award,
      titleKey: 'maTransacciones' as const,
      descriptionKey: 'maTransaccionesDesc' as const,
      services: ["Fusiones y adquisiciones", "Private equity", "Venture capital", "Reestructuraciones"],
    },
    {
      icon: BookOpen,
      titleKey: 'derechoFinanciero' as const,
      descriptionKey: 'derechoFinancieroDesc' as const,
      services: ["Financiamientos", "Mercado de capitales", "Fideicomisos", "Garantías"],
    },
  ]

  return (
    <>
      <PageTransition />
      <div className="flex flex-col min-h-screen bg-[rgb(var(--theme-bg))]">
        {/* Header */}
        <header className="border-b border-[#003366]/30 bg-[rgb(var(--theme-header-bg))]/95 backdrop-blur-sm sticky top-0 z-50 transition-all duration-300 scroll-reveal-down shadow-sm"
          style={{
            transform: `translateY(${Math.min(scrollY * 0.1, 10)}px)`,
            boxShadow: scrollY > 50 ? '0 4px 20px rgba(0, 51, 102, 0.1)' : 'none'
          }}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Scale className="h-10 w-10 text-[#003366]" />
                  <div className="absolute inset-0 bg-[#003366]/20 rounded-full blur-xl"></div>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-[rgb(var(--theme-fg))]">Maria Kuris</h1>
                  <p className="text-sm text-[#003366]">{t('lawyer')}</p>
                </div>
              </div>

              <nav className="hidden md:flex space-x-8">
                <Link
                  href="#inicio"
                  className="text-[rgb(var(--theme-text))] hover:text-[#003366] transition-colors duration-300 relative group"
                >
                  {t('inicio')}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#003366] transition-all duration-300 group-hover:w-full"></span>
                </Link>
                <Link
                  href="#servicios"
                  className="text-[rgb(var(--theme-text))] hover:text-[#003366] transition-colors duration-300 relative group"
                >
                  {t('servicios')}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#003366] transition-all duration-300 group-hover:w-full"></span>
                </Link>
                <Link
                  href="#sobre-mi"
                  className="text-[rgb(var(--theme-text))] hover:text-[#003366] transition-colors duration-300 relative group"
                >
                  {t('sobreMi')}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#003366] transition-all duration-300 group-hover:w-full"></span>
                </Link>
                <Link
                  href="#contacto"
                  className="text-[rgb(var(--theme-text))] hover:text-[#003366] transition-colors duration-300 relative group"
                >
                  {t('contacto')}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#003366] transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </nav>

              <div className="flex items-center space-x-3">
                <ThemeToggle />
                <LanguageToggle />
              </div>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section
          id="inicio"
          className="relative min-h-screen bg-gradient-to-br from-[rgb(var(--theme-gradient-from))] via-[rgb(var(--theme-gradient-to))] to-[#003366]/20 overflow-hidden"
        >
          {/* Video Background */}
          <div className="absolute inset-0 z-0">
            <video
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
            >
              <source src="/background-hero-section.mp4" type="video/mp4" />
              {t('videoNotSupported')}
            </video>
            {/* Video Overlay for text readability */}
            <div className="absolute inset-0 bg-[rgb(var(--theme-video-overlay))]/[var(--theme-video-opacity)]"></div>
          </div>

          {/* Background Pattern with Parallax */}
          <div className="absolute inset-0 opacity-10 parallax z-10" data-speed="0.2">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `radial-gradient(circle at 25% 25%, #003366 0%, transparent 50%), 
                             radial-gradient(circle at 75% 75%, #003366 0%, transparent 50%)`,
              }}
            ></div>
          </div>

          {/* Floating Background Elements */}
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#003366]/5 rounded-full blur-3xl parallax z-10" data-speed="0.3"></div>
          <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-[#003366]/3 rounded-full blur-3xl parallax z-10" data-speed="0.4"></div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
            <div className="flex flex-col items-center justify-center min-h-screen py-20 text-center">
              {/* Main Content */}
              <div className="space-y-8 scroll-reveal max-w-4xl mx-auto">
                <div className="space-y-6">
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-[rgb(var(--theme-fg))] leading-tight scroll-reveal stagger-2">
                    {t('asesoriaLegal')}
                    <span className="block text-gradient">{t('corporativa')}</span>
                  </h1>

                  <p className="text-xl sm:text-2xl text-[rgb(var(--theme-text))] leading-relaxed max-w-2xl scroll-reveal stagger-3">
                    {t('heroDescription')}
                  </p>
                </div>

                <div className="flex justify-center scroll-reveal stagger-4">
                  <Button
                    size="lg"
                    className="bg-[#003366] hover:bg-[#003366]/80 text-[#FFFFFF] font-semibold shadow-xl hover:shadow-[#003366]/25 btn-corporate group"
                  >
                    {t('consultaCorporativa')}
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section
          id="servicios"
          className="py-20 lg:py-32 bg-gradient-to-br from-[rgb(var(--theme-bg))] via-[#003366]/5 to-[rgb(var(--theme-bg))] relative overflow-hidden border-t border-[#003366]/20"
        >
          {/* Background Elements */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#003366]/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#003366]/5 rounded-full blur-3xl"></div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16 lg:mb-24 scroll-reveal">
              <div className="inline-flex items-center space-x-2 bg-[#003366]/10 border border-[#003366]/20 rounded-full px-4 py-2 mb-6 scroll-reveal-scale stagger-1">
                <Briefcase className="h-4 w-4 text-[#003366]" />
                <span className="text-[#003366] text-sm font-medium">{t('especializacionCorporativa')}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[rgb(var(--theme-fg))] mb-6 scroll-reveal stagger-2">
                {t('serviciosCorporativos')} <span className="text-gradient"></span>
              </h2>
              <p className="text-xl text-[rgb(var(--theme-text))] max-w-3xl mx-auto leading-relaxed scroll-reveal stagger-3">
                {t('servicesDescription')}
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 card-grid">
              {services.map((service, index) => (
                <Card
                  key={index}
                  className="corporate-card card-hover group card scroll-reveal-scale"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <CardHeader className="pb-4">
                    <div className="relative mb-4">
                      <service.icon className="h-12 w-12 text-[#003366] group-hover:scale-110 transition-transform duration-300" />
                      <div className="absolute inset-0 bg-[#003366]/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <CardTitle className="text-[rgb(var(--theme-fg))] text-xl group-hover:text-[#003366] transition-colors duration-300">
                      {t(service.titleKey)}
                    </CardTitle>
                    <CardDescription className="text-[rgb(var(--theme-text))] leading-relaxed">{t(service.descriptionKey)}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {service.services.map((item, i) => (
                        <li key={i} className="text-sm text-[rgb(var(--theme-text))] flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 bg-[#003366] rounded-full"></div>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section
          id="sobre-mi"
          className="py-20 lg:py-32 bg-gradient-to-br from-[rgb(var(--theme-gradient-to))] via-[rgb(var(--theme-bg))] to-[rgb(var(--theme-gradient-to))] relative overflow-hidden border-t border-[#003366]/20"
        >
          {/* Background Elements */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#003366]/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#003366]/5 rounded-full blur-3xl"></div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div className="scroll-reveal-left">
                <div className="inline-flex items-center space-x-2 bg-[#003366]/10 border border-[#003366]/20 rounded-full px-4 py-2 mb-6">
                  <Award className="h-4 w-4 text-[#003366]" />
                  <span className="text-[#003366] text-sm font-medium">{t('trayectoriaProfesional')}</span>
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[rgb(var(--theme-fg))] mb-6 scroll-reveal stagger-2">
                  {t('sobreMaria')} <span className="text-gradient"></span>
                </h2>

                <div className="space-y-6 text-[rgb(var(--theme-text))] leading-relaxed">
                  <p className="text-lg">
                    {t('aboutDescription1')}
                  </p>
                  <p className="text-lg">
                    {t('aboutDescription2')}
                  </p>
                  <p className="text-lg">
                    {t('aboutDescription3')}
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-6 mt-12">
                  {[
                    { icon: BookOpen, titleKey: "formacion" as const, subtitle: "Universidad de Buenos Aires - LLM Corporate Law" },
                    { icon: Award, titleKey: "experiencia" as const, subtitle: "15+ años en derecho corporativo" },
                    { icon: Building2, titleKey: "casosCorporativos" as const, subtitle: "500+ operaciones corporativas" },
                    { icon: Scale, titleKey: "especializacionCorporativa" as const, subtitle: "M&A y Derecho Societario" },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-4 p-4 corporate-card rounded-xl transition-all duration-500 group"
                    >
                      <div className="w-12 h-12 bg-[#003366]/20 rounded-full flex items-center justify-center group-hover:bg-[#003366]/30 transition-colors duration-300">
                        <item.icon className="h-6 w-6 text-[#003366]" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-[rgb(var(--theme-fg))] group-hover:text-[#003366] transition-colors duration-300">
                          {t(item.titleKey)}
                        </h3>
                        <p className="text-sm text-[rgb(var(--theme-text))]">{item.subtitle}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative scroll-reveal-right">
                <div className="relative corporate-card rounded-2xl p-8 shadow-2xl card-hover">
                  <div className="text-center mb-8">
                    <div className="w-32 h-32 bg-gradient-to-br from-[#003366]/20 to-[#003366]/30 rounded-full mx-auto mb-6 flex items-center justify-center border-2 border-[#003366]/30">
                      <Briefcase className="h-16 w-16 text-[#003366]" />
                    </div>
                    <h3 className="text-2xl font-bold text-[rgb(var(--theme-fg))]">Maria Kuris</h3>
                    <p className="text-[#003366] font-medium">{t('lawyer')}</p>
                  </div>

                  <Separator className="my-8 bg-[#003366]/30" />

                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-[rgb(var(--theme-fg))] mb-3 flex items-center space-x-2">
                        <BookOpen className="h-4 w-4 text-[#003366]" />
                        <span>{t('formacion')}</span>
                      </h4>
                      <ul className="space-y-2 text-sm text-[rgb(var(--theme-text))] ml-6">
                        <li>• Abogada - Universidad de Buenos Aires</li>
                        <li>• LLM Corporate Law - Universidad Austral</li>
                        <li>• Especialización en M&A - IAE Business School</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-[rgb(var(--theme-fg))] mb-3 flex items-center space-x-2">
                        <Award className="h-4 w-4 text-[#003366]" />
                        <span>{t('membresias')}</span>
                      </h4>
                      <ul className="space-y-2 text-sm text-[rgb(var(--theme-text))] ml-6">
                        <li>• Colegio de Abogados de la Ciudad</li>
                        <li>• International Bar Association (IBA)</li>
                        <li>• Cámara de Comercio Argentino-Americana</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-20 lg:py-32 bg-gradient-to-br from-[rgb(var(--theme-gradient-to))] via-[rgb(var(--theme-bg))] to-[rgb(var(--theme-gradient-to))] relative overflow-hidden border-t border-[#003366]/20">
          {/* Background */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#003366]/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#003366]/20 rounded-full blur-3xl"></div>
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16 scroll-reveal">
              <div className="inline-flex items-center space-x-2 bg-[#003366]/10 border border-[#003366]/20 rounded-full px-4 py-2 mb-6">
                <Award className="h-4 w-4 text-[#003366]" />
                <span className="text-[#003366] text-sm font-medium">{t('trayectoriaProfesional')}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[rgb(var(--theme-fg))] mb-6">
                <span className="text-gradient">{t('trayectoriaExcelencia')}</span>
              </h2>
              <p className="text-xl text-[rgb(var(--theme-text))] max-w-3xl mx-auto leading-relaxed">
                {t('trayectoriaDescription')}
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              {/* Timeline */}
              <div className="relative">
                {/* Central Line */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-[#003366] via-[#003366]/50 to-[#003366]"></div>

                {[
                  {
                    year: "2024",
                    titleKey: "liderMA" as const,
                    descriptionKey: "liderMADesc" as const,
                    position: "right"
                  },
                  {
                    year: "2020",
                    titleKey: "sociaFundadora" as const,
                    descriptionKey: "sociaFundadoraDesc" as const,
                    position: "left"
                  },
                  {
                    year: "2015",
                    titleKey: "sociaSenior" as const,
                    descriptionKey: "sociaSeniorDesc" as const,
                    position: "right"
                  },
                  {
                    year: "2010",
                    titleKey: "llmCorporateLaw" as const,
                    descriptionKey: "llmCorporateLawDesc" as const,
                    position: "left"
                  },
                  {
                    year: "2009",
                    titleKey: "abogadaUBA" as const,
                    descriptionKey: "abogadaUBADesc" as const,
                    position: "right"
                  }
                ].map((milestone, index) => (
                  <div key={index} className={`relative flex items-center mb-12 scroll-reveal-${milestone.position}`}>
                    {milestone.position === "left" ? (
                      <>
                        <div className="w-1/2 pr-8 text-right">
                          <div className="corporate-card p-6 card-hover">
                            <div className="text-[#003366] font-bold text-lg mb-2">{milestone.year}</div>
                            <h3 className="text-xl font-bold text-[rgb(var(--theme-fg))] mb-3">{t(milestone.titleKey)}</h3>
                            <p className="text-[rgb(var(--theme-text))] leading-relaxed">{t(milestone.descriptionKey)}</p>
                          </div>
                        </div>
                        <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-[#003366] rounded-full border-4 border-white shadow-lg"></div>
                        <div className="w-1/2 pl-8"></div>
                      </>
                    ) : (
                      <>
                        <div className="w-1/2 pr-8"></div>
                        <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-[#003366] rounded-full border-4 border-white shadow-lg"></div>
                        <div className="w-1/2 pl-8">
                          <div className="corporate-card p-6 card-hover">
                            <div className="text-[#003366] font-bold text-lg mb-2">{milestone.year}</div>
                            <h3 className="text-xl font-bold text-[rgb(var(--theme-fg))] mb-3">{t(milestone.titleKey)}</h3>
                            <p className="text-[rgb(var(--theme-text))] leading-relaxed">{t(milestone.descriptionKey)}</p>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section
          id="contacto"
          className="py-20 lg:py-32 bg-[rgb(var(--theme-bg))] relative overflow-hidden border-t border-[#003366]/20"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `radial-gradient(circle at 20% 80%, #003366 0%, transparent 50%), 
                             radial-gradient(circle at 80% 20%, #003366 0%, transparent 50%)`,
              }}
            ></div>
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16 lg:mb-24 scroll-reveal">
              <div className="inline-flex items-center space-x-2 bg-[#003366]/10 border border-[#003366]/20 rounded-full px-4 py-2 mb-6 scroll-reveal-scale stagger-1">
                <Mail className="h-4 w-4 text-[#003366]" />
                <span className="text-[#003366] text-sm font-medium">{t('contactoCorporativo')}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[rgb(var(--theme-fg))] mb-6 scroll-reveal stagger-2">
                {t('consultaCorpTitle')} <span className="text-gradient"></span>
              </h2>
              <p className="text-xl text-[rgb(var(--theme-text))] max-w-3xl mx-auto leading-relaxed">
                {t('contactDescription')}
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
              <div className="scroll-reveal-left">
                <h3 className="text-2xl font-bold text-[rgb(var(--theme-fg))] mb-8">{t('contactoCorporativo')}</h3>

                <div className="space-y-8">
                  {[
                    {
                      icon: MapPin,
                      titleKey: "oficinaPrincipal" as const,
                      content: ["Av. Corrientes 1234, Piso 8°", "Ciudad Autónoma de Buenos Aires"],
                    },
                    {
                      icon: Phone,
                      titleKey: "telefonos" as const,
                      content: ["+54 11 4567-8900", "+54 9 11 2345-6789"],
                    },
                    {
                      icon: Mail,
                      titleKey: "emailCorporativo" as const,
                      content: ["maria.kuris@corporativo.com", "consultas@mariakuris.com"],
                    },
                  ].map((contact, index) => (
                    <div
                      key={index}
                      className="flex items-start space-x-4 p-6 corporate-card rounded-xl transition-all duration-500 group"
                    >
                      <div className="w-12 h-12 bg-[#003366]/20 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-[#003366]/30 transition-colors duration-300">
                        <contact.icon className="h-6 w-6 text-[#003366]" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-[rgb(var(--theme-fg))] mb-2 group-hover:text-[#003366] transition-colors duration-300">
                          {t(contact.titleKey)}
                        </h4>
                        {contact.content.map((line, i) => (
                          <p key={i} className="text-[rgb(var(--theme-text))]">
                            {line}
                          </p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 p-6 corporate-card rounded-xl">
                  <h4 className="font-semibold text-[rgb(var(--theme-fg))] mb-3 flex items-center space-x-2">
                    <Briefcase className="h-5 w-5 text-[#003366]" />
                    <span>{t('horariosAtencion')}</span>
                  </h4>
                  <div className="space-y-1 text-sm text-[rgb(var(--theme-text))]">
                    <p>Lunes a Viernes: 9:00 - 19:00</p>
                    <p>Sábados: 9:00 - 13:00 (Solo citas)</p>
                    <p>Domingos: Cerrado</p>
                  </div>
                  <p className="text-sm text-[#003366] mt-3 font-medium">
                    {t('consultasUrgentes')}
                  </p>
                </div>
              </div>

              <div className="scroll-reveal-right">
                <Card className="corporate-card shadow-2xl card-hover">
                  <CardHeader>
                    <CardTitle className="text-[rgb(var(--theme-fg))] text-2xl">{t('consultaCorpTitle')}</CardTitle>
                    <CardDescription className="text-[rgb(var(--theme-text))]">
                      {t('contactDescription')}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="nombre" className="text-[rgb(var(--theme-fg))]">
                          {t('nombre')}
                        </Label>
                        <Input
                          id="nombre"
                          placeholder={t('nombre')}
                          className="bg-[rgb(var(--theme-card-bg))] border-[#003366]/30 text-[rgb(var(--theme-fg))] placeholder-[rgb(var(--theme-text))] focus:border-[#003366] focus:ring-[#003366]/20"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="apellido" className="text-[rgb(var(--theme-fg))]">
                          {t('apellido')}
                        </Label>
                        <Input
                          id="apellido"
                          placeholder={t('apellido')}
                          className="bg-[rgb(var(--theme-card-bg))] border-[#003366]/30 text-[rgb(var(--theme-fg))] placeholder-[rgb(var(--theme-text))] focus:border-[#003366] focus:ring-[#003366]/20"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="empresa" className="text-[rgb(var(--theme-fg))]">
                        {t('empresa')}
                      </Label>
                      <Input
                        id="empresa"
                        placeholder={t('empresa')}
                        className="bg-[rgb(var(--theme-card-bg))] border-[#003366]/30 text-[rgb(var(--theme-fg))] placeholder-[rgb(var(--theme-text))] focus:border-[#003366] focus:ring-[#003366]/20"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-[rgb(var(--theme-fg))]">
                        {t('email')}
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder={t('email')}
                        className="bg-[rgb(var(--theme-card-bg))] border-[#003366]/30 text-[rgb(var(--theme-fg))] placeholder-[rgb(var(--theme-text))] focus:border-[#003366] focus:ring-[#003366]/20"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="telefono" className="text-[rgb(var(--theme-fg))]">
                        {t('telefono')}
                      </Label>
                      <Input
                        id="telefono"
                        placeholder="+54 11 1234-5678"
                        className="bg-[rgb(var(--theme-card-bg))] border-[#003366]/30 text-[rgb(var(--theme-fg))] placeholder-[rgb(var(--theme-text))] focus:border-[#003366] focus:ring-[#003366]/20"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="asunto" className="text-[rgb(var(--theme-fg))]">
                        {t('areaConsulta')}
                      </Label>
                      <Input
                        id="asunto"
                        placeholder="Ej: M&A, Derecho Societario, Contratos, etc."
                        className="bg-[rgb(var(--theme-card-bg))] border-[#003366]/30 text-[rgb(var(--theme-fg))] placeholder-[rgb(var(--theme-text))] focus:border-[#003366] focus:ring-[#003366]/20"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="mensaje" className="text-[rgb(var(--theme-fg))]">
                        {t('descripcionCaso')}
                      </Label>
                      <Textarea
                        id="mensaje"
                        placeholder={t('descripcionCaso')}
                        rows={4}
                        className="bg-[rgb(var(--theme-card-bg))] border-[#003366]/30 text-[rgb(var(--theme-fg))] placeholder-[rgb(var(--theme-text))] focus:border-[#003366] focus:ring-[#003366]/20"
                      />
                    </div>

                    <Button className="w-full bg-[#003366] hover:bg-[#003366]/80 text-white font-semibold shadow-xl hover:shadow-[#003366]/25 btn-corporate">
                      {t('enviarConsulta')}
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-[rgb(var(--theme-gradient-to))] border-t border-[#003366]/30 py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
              <div>
                <div className="flex items-center space-x-3 mb-6">
                  <div className="relative">
                    <Scale className="h-10 w-10 text-[#003366]" />
                    <div className="absolute inset-0 bg-[#003366]/20 rounded-full blur-xl"></div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[rgb(var(--theme-fg))]">Maria Kuris</h3>
                    <p className="text-[#003366]">{t('lawyer')}</p>
                  </div>
                </div>
                <p className="text-[rgb(var(--theme-text))] mb-6 leading-relaxed">
                  {t('footerDescription')}
                </p>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-[rgb(var(--theme-fg))] mb-6">{t('serviciosCorporativos')}</h4>
                <ul className="space-y-3 text-[rgb(var(--theme-text))]">
                  {[
                    t('derechoSocietario'),
                    t('contratosCorporativos'),
                    t('complianceCorporativo'),
                    t('gobiernoCorportivo'),
                    t('maTransacciones'),
                    t('derechoFinanciero'),
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
                <h4 className="text-lg font-semibold text-[rgb(var(--theme-fg))] mb-6">{t('contacto')}</h4>
                <div className="space-y-3 text-[rgb(var(--theme-text))]">
                  <p className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-[#003366]" />
                    <span>Av. Corrientes 1234, Piso 8°</span>
                  </p>
                  <p className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-[#003366]" />
                    <span>Ciudad Autónoma de Buenos Aires</span>
                  </p>
                  <p className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-[#003366]" />
                    <span>+54 11 4567-8900</span>
                  </p>
                  <p className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-[#003366]" />
                    <span>maria.kuris@corporativo.com</span>
                  </p>
                </div>
              </div>
            </div>

            <Separator className="my-12 bg-[#003366]/30" />

            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-[rgb(var(--theme-text))] text-sm">
                {t('derechosReservados')}
              </p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <Link href="#" className="text-[rgb(var(--theme-text))] hover:text-[#003366] text-sm transition-colors duration-300">
                  {t('politicaPrivacidad')}
                </Link>
                <Link href="#" className="text-[rgb(var(--theme-text))] hover:text-[#003366] text-sm transition-colors duration-300">
                  {t('terminosServicio')}
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
