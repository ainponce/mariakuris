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
  // About sections
  legadoExcelencia: string
  legadoExcelenciaDesc: string
  mentoriaUnica: string
  mentoriaUnicaDesc: string
  expertiseEspecializada: string
  expertiseEspecializadaDesc: string
  visionEstrategica: string
  visionEstrategicaDesc: string
  formacion: string
  membresias: string
  
  // Timeline
  trayectoriaExcelencia: string
  trayectoriaDescription: string
  liderMA: string
  liderMADesc: string
  sociaFundadora: string
  sociaFundadoraDesc: string
  sociaSenior: string
  sociaSeniorDesc: string
  llmCorporateLaw: string
  llmCorporateLawDesc: string
  abogadaUBA: string
  abogadaUBADesc: string
  
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
    sobreMaria: 'Estrategia Legal con Visión y Legado',
    // About sections
    legadoExcelencia: 'Un Legado de Excelencia',
    legadoExcelenciaDesc: 'Mi ejercicio profesional se distingue por una base sólida, una visión estratégica y un compromiso inquebrantable con la resolución efectiva de conflictos legales.',
    mentoriaUnica: 'Mentoría Única y Excepcional',
    mentoriaUnicaDesc: 'Tuve el privilegio de ser la única discípula del Dr. Jorge Daniel Andreu (Tomo 6 Folio 432 CPACF), eminente abogado con 50+ años de trayectoria que me transmitió su vasto conocimiento legal.',
    expertiseEspecializada: 'Expertise Especializada',
    expertiseEspecializadaDesc: 'Egresada de la Universidad Nacional de La Matanza con promedio 7.68. Especializada en Derecho del Consumidor y Laboral Empresarial con 10 años asesorando concesionarias de alta demanda.',
    visionEstrategica: 'Visión Estratégica del Conflicto',
    visionEstrategicaDesc: 'Mi fortaleza distintiva: análisis integral del litigio, evaluando cada aspecto e interés para trazar la estrategia más favorable, desde negociaciones hasta preparación judicial meticulosa.',
    formacion: 'Formación',
    membresias: 'Membresías',
    
    // Timeline
    trayectoriaExcelencia: 'Trayectoria de Excelencia',
    trayectoriaDescription: 'Más de 15 años construyendo un legado de éxito en derecho corporativo',
    liderMA: 'Líder en M&A Corporativo',
    liderMADesc: 'Reconocida como una de las mejores abogadas corporativas del país. Más de €2.5B en transacciones exitosas.',
    sociaFundadora: 'Socia Fundadora',
    sociaFundadoraDesc: 'Establecimiento de práctica independiente especializada en derecho corporativo de alta complejidad.',
    sociaSenior: 'Socia Senior - Firma Internacional',
    sociaSeniorDesc: 'Liderazgo del departamento de M&A en prestigioso bufete internacional. Casos de alta visibilidad.',
    llmCorporateLaw: 'LLM Corporate Law - Universidad Austral',
    llmCorporateLawDesc: 'Especialización avanzada en derecho corporativo con mención de honor. Beca de excelencia académica.',
    abogadaUBA: 'Abogada - Universidad de Buenos Aires',
    abogadaUBADesc: 'Graduación con honores. Promedio distinguido. Inicio de carrera en derecho corporativo.',
    
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
    sobreMaria: 'Legal Strategy with Vision and Legacy',
    // About sections
    legadoExcelencia: 'A Legacy of Excellence',
    legadoExcelenciaDesc: 'My professional practice is distinguished by a solid foundation, strategic vision, and unwavering commitment to effective legal conflict resolution.',
    mentoriaUnica: 'Unique and Exceptional Mentorship',
    mentoriaUnicaDesc: 'I had the privilege of being the sole disciple of Dr. Jorge Daniel Andreu (Volume 6 Folio 432 CPACF), an eminent lawyer with 50+ years of experience who transmitted his vast legal knowledge to me.',
    expertiseEspecializada: 'Specialized Expertise',
    expertiseEspecializadaDesc: 'Graduate of Universidad Nacional de La Matanza with 7.68 average. Specialized in Consumer Law and Corporate Labor Law with 10 years advising high-demand dealerships.',
    visionEstrategica: 'Strategic Vision of Conflict',
    visionEstrategicaDesc: 'My distinctive strength: comprehensive litigation analysis, evaluating every aspect and interest to chart the most favorable strategy, from negotiations to meticulous judicial preparation.',
    formacion: 'Education',
    membresias: 'Memberships',
    
    // Timeline
    trayectoriaExcelencia: 'Track Record of Excellence',
    trayectoriaDescription: 'Over 15 years building a legacy of success in corporate law',
    liderMA: 'M&A Corporate Leader',
    liderMADesc: 'Recognized as one of the best corporate lawyers in the country. Over €2.5B in successful transactions.',
    sociaFundadora: 'Founding Partner',
    sociaFundadoraDesc: 'Establishment of independent practice specialized in high-complexity corporate law.',
    sociaSenior: 'Senior Partner - International Firm',
    sociaSeniorDesc: 'Leadership of M&A department in prestigious international law firm. High-profile cases.',
    llmCorporateLaw: 'LLM Corporate Law - Universidad Austral',
    llmCorporateLawDesc: 'Advanced specialization in corporate law with honors. Academic excellence scholarship.',
    abogadaUBA: 'Lawyer - Universidad de Buenos Aires',
    abogadaUBADesc: 'Graduation with honors. Distinguished average. Beginning of career in corporate law.',
    
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