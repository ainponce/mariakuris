"use client"

import {
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
import { PageTransition } from "@/components/PageTransition"
import { ContactForm } from "@/components/ContactForm"
import { useLanguage } from "@/contexts/LanguageContext"
import { useScrollAnimations, useParallax, useStaggeredAnimations } from "@/hooks/use-scroll-animations"
import Header from "@/shared/components/Header"
import HeroSection from "@/features/hero/HeroSection"

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
        <Header scrollY={scrollY} />

        {/* Hero Section */}
        <HeroSection />

        {/* Services Section */}
        <section
          id="servicios"
          className="py-20 lg:py-32 bg-gradient-to-br from-[rgb(var(--theme-bg))] via-[#003366]/5 to-[rgb(var(--theme-bg))] relative overflow-hidden border-t border-[#003366]/20"
        >
          {/* Background Elements */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#003366]/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#003366]/5 rounded-full blur-3xl"></div>

          <div className="w-full px-4 sm:px-6 lg:px-8 relative z-10">
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

          <div className="w-full px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Header */}
            <div className="text-center mb-16 scroll-reveal max-w-6xl mx-auto">
              <div className="inline-flex items-center space-x-2 bg-[#003366]/10 border border-[#003366]/20 rounded-full px-4 py-2 mb-6">
                <Award className="h-4 w-4 text-[#003366]" />
                <span className="text-[#003366] text-sm font-medium">{t('trayectoriaProfesional')}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[rgb(var(--theme-fg))] mb-6">
                {t('sobreMaria')} <span className="text-gradient"></span>
              </h2>
            </div>

            {/* Card de Maria Kuris */}
            <div className="flex justify-center mb-20 scroll-reveal">
              <div className="w-full max-w-4xl">
                <div className="relative corporate-card rounded-2xl overflow-hidden shadow-2xl card-hover">
                  <div className="grid md:grid-cols-2 gap-0">
                    {/* Sección de imagen */}
                    <div className="relative">
                      <div className="aspect-[4/3] md:aspect-[3/4] w-full overflow-hidden bg-gradient-to-br from-[#003366]/5 to-[#003366]/10">
                        <img
                          src="https://3yfctedxuyowr5e7.public.blob.vercel-storage.com/profile.png"
                          alt="Maria Kuris - Abogada Corporativa"
                          className="w-full h-full object-cover object-top md:object-top"
                        />
                        {/* Overlay suave con gradiente hacia la derecha en desktop */}
                        <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#003366]/20 via-transparent to-transparent"></div>
                        {/* Overlay adicional para la transición suave en desktop */}
                        <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[rgb(var(--theme-bg))]/20"></div>
                      </div>

                      {/* Información superpuesta en la imagen (solo mobile) */}
                      <div className="absolute bottom-4 left-4 right-4 md:hidden">
                        <div className="bg-white/90 backdrop-blur-sm rounded-xl p-3 shadow-lg">
                          <h3 className="text-lg font-bold text-[#003366] mb-1">Maria Kuris</h3>
                          <p className="text-sm text-[#003366]/80 font-medium">{t('lawyer')}</p>
                        </div>
                      </div>
                    </div>

                    {/* Sección de texto */}
                    <div className="relative p-6 sm:p-8 md:p-10 flex flex-col justify-center">
                      {/* Gradiente suave en el borde izquierdo (solo desktop) */}
                      <div className="hidden md:block absolute left-0 top-0 w-8 h-full bg-gradient-to-r from-[rgb(var(--theme-bg))]/40 to-transparent"></div>

                      {/* Información de header (desktop/tablet) */}
                      <div className="hidden md:block mb-6 relative z-10">
                        <h3 className="text-2xl lg:text-3xl font-bold text-[rgb(var(--theme-fg))] mb-2">Maria Kuris</h3>
                        <p className="text-[#003366] font-medium text-lg">{t('lawyer')}</p>
                      </div>

                      <p className="text-sm sm:text-base lg:text-lg text-[rgb(var(--theme-text))] leading-relaxed relative z-10">
                        {t('aboutIntroduction')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contenido dividido en tres columnas - Usa todo el ancho del container */}
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-12 scroll-reveal">
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-[rgb(var(--theme-fg))] flex items-center">
                    <Award className="h-5 w-5 text-[#003366] mr-3" />
                    {t('legacyAndMentorshipTitle')}
                  </h3>
                  <p className="text-base lg:text-lg text-[rgb(var(--theme-text))] leading-relaxed">
                    {t('legacyAndMentorshipDesc')}
                  </p>
                  <p className="text-base lg:text-lg text-[rgb(var(--theme-text))] leading-relaxed">
                    {t('legacyAndMentorshipDesc2')}
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-[rgb(var(--theme-fg))] flex items-center">
                    <BookOpen className="h-5 w-5 text-[#003366] mr-3" />
                    {t('expertiseTitle')}
                  </h3>
                  <p className="text-base lg:text-lg text-[rgb(var(--theme-text))] leading-relaxed">
                    {t('expertiseDesc')}
                  </p>
                  <p className="text-base lg:text-lg text-[rgb(var(--theme-text))] leading-relaxed">
                    {t('expertiseDesc2')}
                  </p>
                </div>
              </div>

              <div className="space-y-6 md:col-span-2 xl:col-span-1">
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-[rgb(var(--theme-fg))] flex items-center">
                    <Scale className="h-5 w-5 text-[#003366] mr-3" />
                    {t('strategicVisionTitle')}
                  </h3>
                  <p className="text-base lg:text-lg text-[rgb(var(--theme-text))] leading-relaxed">
                    {t('strategicVisionDesc')}
                  </p>
                  <p className="text-base lg:text-lg text-[rgb(var(--theme-text))] leading-relaxed">
                    {t('strategicVisionDesc2')}
                  </p>
                </div>
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

          <div className="w-full px-4 sm:px-6 lg:px-8 relative z-10">
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
                <ContactForm />
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-[rgb(var(--theme-gradient-to))] border-t border-[#003366]/30 py-16">
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
              <div>
                <div className="flex items-center space-x-3 mb-6">
                  <div className="relative">
                    <Scale className="h-10 w-10 text-[#003366]" />
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
