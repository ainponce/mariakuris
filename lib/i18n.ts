export type Language = 'es' | 'en'

export interface Translations {
  // Header
  lawyer: string
  inicio: string
  servicios: string
  sobreMi: string
  contacto: string
  consultaCorporativa: string
  
  // Hero Section
  derechoEspecializado: string
  asesoriaLegal: string
  corporativa: string
  heroDescription: string
  verServicios: string
  casosCorporativos: string
  experiencia: string
  exitoCorporativo: string
  
  // Services
  especializacionCorporativa: string
  serviciosCorporativos: string
  servicesDescription: string
  
  // Service Items
  derechoSocietario: string
  contratosCorporativos: string
  complianceCorporativo: string
  gobiernoCorportivo: string
  maTransacciones: string
  derechoFinanciero: string
  
  // Service Descriptions
  derechoSocietarioDesc: string
  contratosCorporativosDesc: string
  complianceCorporativoDesc: string
  gobiernoCorportativoDesc: string
  maTransaccionesDesc: string
  derechoFinancieroDesc: string
  
  // About
  trayectoriaProfesional: string
  sobreMaria: string
  aboutDescription1: string
  aboutDescription2: string
  aboutDescription3: string
  formacion: string
  membresias: string
  
  // Contact
  contactoCorporativo: string
  consultaCorpTitle: string
  contactDescription: string
  oficinaPrincipal: string
  telefonos: string
  emailCorporativo: string
  horariosAtencion: string
  consultasUrgentes: string
  
  // Form
  nombre: string
  apellido: string
  empresa: string
  email: string
  telefono: string
  areaConsulta: string
  descripcionCaso: string
  enviarConsulta: string
  
  // Footer
  footerDescription: string
  politicaPrivacidad: string
  terminosServicio: string
  derechosReservados: string
  
  // Video
  videoNotSupported: string
}

export const translations: Record<Language, Translations> = {
  es: {
    // Header
    lawyer: 'Abogada Corporativa',
    inicio: 'Inicio',
    servicios: 'Servicios',
    sobreMi: 'Sobre Mí',
    contacto: 'Contacto',
    consultaCorporativa: 'Consulta Corporativa',
    
    // Hero Section
    derechoEspecializado: 'Derecho Corporativo Especializado',
    asesoriaLegal: 'Asesoría Legal',
    corporativa: 'Corporativa',
    heroDescription: 'Soluciones jurídicas corporativas integrales con más de 15 años de experiencia, enfocada en empresas y transacciones comerciales de alto nivel.',
    verServicios: 'Ver Servicios',
    casosCorporativos: 'Casos Corporativos',
    experiencia: 'Años Experiencia',
    exitoCorporativo: 'Éxito Corporativo',
    
    // Services
    especializacionCorporativa: 'Especialización Corporativa',
    serviciosCorporativos: 'Servicios Corporativos',
    servicesDescription: 'Ofrezco servicios jurídicos especializados en derecho corporativo y empresarial, adaptándome a las necesidades específicas de cada empresa con la más alta calidad profesional.',
    
    // Service Items
    derechoSocietario: 'Derecho Societario',
    contratosCorporativos: 'Contratos Comerciales',
    complianceCorporativo: 'Compliance Corporativo',
    gobiernoCorportivo: 'Gobierno Corporativo',
    maTransacciones: 'M&A y Transacciones',
    derechoFinanciero: 'Derecho Financiero',
    
    // Service Descriptions
    derechoSocietarioDesc: 'Constitución, transformación y reestructuración de sociedades comerciales.',
    contratosCorporativosDesc: 'Redacción y negociación de contratos comerciales complejos.',
    complianceCorporativoDesc: 'Implementación de programas de cumplimiento normativo empresarial.',
    gobiernoCorportativoDesc: 'Asesoramiento en estructuras de gobierno y toma de decisiones.',
    maTransaccionesDesc: 'Fusiones, adquisiciones y transacciones corporativas complejas.',
    derechoFinancieroDesc: 'Asesoramiento en operaciones financieras y mercado de capitales.',
    
    // About
    trayectoriaProfesional: 'Trayectoria Profesional',
    sobreMaria: 'Sobre María Kuris',
    aboutDescription1: 'Soy una abogada especializada en derecho corporativo con más de 15 años de experiencia asesorando empresas nacionales e internacionales en sus operaciones más complejas y estratégicas.',
    aboutDescription2: 'Mi práctica se enfoca en brindar soluciones jurídicas integrales para el mundo empresarial, desde la constitución de sociedades hasta transacciones de M&A, siempre con un enfoque personalizado y orientado a resultados.',
    aboutDescription3: 'He participado en algunas de las transacciones corporativas más importantes del país, asesorando tanto a empresas familiares como a multinacionales en sus procesos de crecimiento y expansión.',
    formacion: 'Formación',
    membresias: 'Membresías',
    
    // Contact
    contactoCorporativo: 'Contacto Corporativo',
    consultaCorpTitle: 'Consulta Corporativa',
    contactDescription: 'Estoy aquí para asesorar a su empresa. Contácteme para una consulta especializada en derecho corporativo y descubra cómo puedo contribuir al crecimiento de su negocio.',
    oficinaPrincipal: 'Oficina Principal',
    telefonos: 'Teléfonos',
    emailCorporativo: 'Email Corporativo',
    horariosAtencion: 'Horarios de Atención Corporativa',
    consultasUrgentes: 'Consultas urgentes corporativas disponibles 24/7',
    
    // Form
    nombre: 'Nombre',
    apellido: 'Apellido',
    empresa: 'Empresa',
    email: 'Email Corporativo',
    telefono: 'Teléfono',
    areaConsulta: 'Área de Consulta',
    descripcionCaso: 'Descripción del Caso',
    enviarConsulta: 'Enviar Consulta Corporativa',
    
    // Footer
    footerDescription: 'Especialista en derecho corporativo con más de 15 años de experiencia asesorando empresas en sus operaciones más complejas y estratégicas, enfocada en la excelencia y resultados excepcionales.',
    politicaPrivacidad: 'Política de Privacidad',
    terminosServicio: 'Términos de Servicio',
    derechosReservados: '© 2024 Maria Kuris - Abogada Corporativa. Todos los derechos reservados.',
    
    // Video
    videoNotSupported: 'Tu navegador no soporta el elemento de video.'
  },
  en: {
    // Header
    lawyer: 'Corporate Lawyer',
    inicio: 'Home',
    servicios: 'Services',
    sobreMi: 'About Me',
    contacto: 'Contact',
    consultaCorporativa: 'Corporate Consultation',
    
    // Hero Section
    derechoEspecializado: 'Specialized Corporate Law',
    asesoriaLegal: 'Legal Advisory',
    corporativa: 'Corporate',
    heroDescription: 'Comprehensive corporate legal solutions with over 15 years of experience, focused on companies and high-level commercial transactions.',
    verServicios: 'View Services',
    casosCorporativos: 'Corporate Cases',
    experiencia: 'Years Experience',
    exitoCorporativo: 'Corporate Success',
    
    // Services
    especializacionCorporativa: 'Corporate Specialization',
    serviciosCorporativos: 'Corporate Services',
    servicesDescription: 'I offer specialized legal services in corporate and business law, adapting to the specific needs of each company with the highest professional quality.',
    
    // Service Items
    derechoSocietario: 'Corporate Law',
    contratosCorporativos: 'Commercial Contracts',
    complianceCorporativo: 'Corporate Compliance',
    gobiernoCorportivo: 'Corporate Governance',
    maTransacciones: 'M&A and Transactions',
    derechoFinanciero: 'Financial Law',
    
    // Service Descriptions
    derechoSocietarioDesc: 'Incorporation, transformation and restructuring of commercial companies.',
    contratosCorporativosDesc: 'Drafting and negotiation of complex commercial contracts.',
    complianceCorporativoDesc: 'Implementation of corporate regulatory compliance programs.',
    gobiernoCorportativoDesc: 'Advisory on governance structures and decision making.',
    maTransaccionesDesc: 'Mergers, acquisitions and complex corporate transactions.',
    derechoFinancieroDesc: 'Advisory on financial operations and capital markets.',
    
    // About
    trayectoriaProfesional: 'Professional Career',
    sobreMaria: 'About María Kuris',
    aboutDescription1: 'I am a lawyer specialized in corporate law with over 15 years of experience advising national and international companies in their most complex and strategic operations.',
    aboutDescription2: 'My practice focuses on providing comprehensive legal solutions for the business world, from the incorporation of companies to M&A transactions, always with a personalized and results-oriented approach.',
    aboutDescription3: 'I have participated in some of the most important corporate transactions in the country, advising both family businesses and multinationals in their growth and expansion processes.',
    formacion: 'Education',
    membresias: 'Memberships',
    
    // Contact
    contactoCorporativo: 'Corporate Contact',
    consultaCorpTitle: 'Corporate Consultation',
    contactDescription: 'I am here to advise your company. Contact me for a specialized consultation in corporate law and discover how I can contribute to your business growth.',
    oficinaPrincipal: 'Main Office',
    telefonos: 'Phones',
    emailCorporativo: 'Corporate Email',
    horariosAtencion: 'Corporate Service Hours',
    consultasUrgentes: 'Urgent corporate consultations available 24/7',
    
    // Form
    nombre: 'Name',
    apellido: 'Last Name',
    empresa: 'Company',
    email: 'Corporate Email',
    telefono: 'Phone',
    areaConsulta: 'Consultation Area',
    descripcionCaso: 'Case Description',
    enviarConsulta: 'Send Corporate Consultation',
    
    // Footer
    footerDescription: 'Corporate law specialist with over 15 years of experience advising companies in their most complex and strategic operations, focused on excellence and exceptional results.',
    politicaPrivacidad: 'Privacy Policy',
    terminosServicio: 'Terms of Service',
    derechosReservados: '© 2024 Maria Kuris - Corporate Lawyer. All rights reserved.',
    
    // Video
    videoNotSupported: 'Your browser does not support the video element.'
  }
}

export const getTranslation = (language: Language, key: keyof Translations): string => {
  return translations[language][key] || translations['es'][key]
} 