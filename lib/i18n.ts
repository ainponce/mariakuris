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
  
  // New About section content
  aboutIntroduction: string
  legacyAndMentorshipTitle: string
  legacyAndMentorshipDesc: string
  legacyAndMentorshipDesc2: string
  expertiseTitle: string
  expertiseDesc: string
  expertiseDesc2: string
  strategicVisionTitle: string
  strategicVisionDesc: string
  strategicVisionDesc2: string
  
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
    
    // New About section content
    aboutIntroduction: 'Mi ejercicio profesional se distingue por una base sólida, una visión estratégica y un compromiso inquebrantable con la resolución efectiva de conflictos legales. Si bien mi antigüedad en la matrícula profesional no lo refleja, mi inmersión y formación en el Derecho comenzaron mucho antes, forjadas bajo la tutela de una figura fundamental en el ámbito del derecho laboral.',
    legacyAndMentorshipTitle: 'Un Legado de Excelencia y una Mentoría Única',
    legacyAndMentorshipDesc: 'Tuve el inmenso privilegio de ser la única discípula del Dr. Jorge Daniel Andreu, quien fuera Tomo 6 Folio 432 de la matrícula del CPACF, un eminente abogado que marcó una era en el Derecho argentino. Con sus más de 50 años de trayectoria profesional, mi mentor me brindó una formación invaluable, confiándome su vasto saber y transmitiéndome la esencia de la práctica legal con una generosidad sin igual.',
    legacyAndMentorshipDesc2: 'Junto a esta figura de referencia, cultivamos una sinergia perfecta: su profunda experiencia en el Derecho se fusionó con mi impronta innovadora y mi visión estratégica para la resolución de conflictos. Ambos compartíamos una pasión sin igual por el derecho laboral empresarial y, con mi estilo conciliador, formamos un equipo cohesionado y eficaz. Hoy, en honor a su memoria y legado, asumo con gran orgullo y entusiasmo la responsabilidad de continuar este camino, desplegando todo el conocimiento adquirido para el beneficio de mis clientes.',
    expertiseTitle: 'Expertise en Derecho del Consumidor y Laboral Empresarial',
    expertiseDesc: 'Soy egresada de la prestigiosa Universidad Nacional de La Matanza, donde obtuve mi título de abogada con un excelente promedio de 7.68. Esta sólida base académica, sumada a la experiencia práctica y la formación recibida, me ha dotado de una habilidad excepcional para manejar litigios complejos.',
    expertiseDesc2: 'Mi especialización y pasión se centran en el Derecho del Consumidor y el Derecho Laboral Empresarial. En particular, cuento con casi 10 años de experiencia asesorando y asistiendo a concesionarias de alta demanda. Este bagaje me permite comprender a fondo los desafíos que enfrentan empresas con alta litigiosidad, ya sea por la venta de productos o la prestación de servicios masivos. Mi profundo dominio en estas áreas me permite ofrecer un servicio de gran valor estratégico para proteger los intereses de su compañía.',
    strategicVisionTitle: 'Mi Talento Distintivo: La Visión Estratégica del Conflicto',
    strategicVisionDesc: 'Mi mayor fortaleza radica en mi capacidad para analizar y resolver conflictos. Me caracterizo por una visión integral del litigio, desmenuzando cada aspecto, posición e interés de las partes involucradas. Este análisis profundo me permite trazar la estrategia más favorable para mi cliente.',
    strategicVisionDesc2: 'Ya sea que se trate de negociar acuerdos que minimicen riesgos y costos, o de preparar meticulosamente la batalla judicial cuando la instancia conciliatoria no representa la vía más beneficiosa para mis representados. Mi objetivo es claro: brindar soluciones efectivas y un acompañamiento profesional de primer nivel que garantice la defensa integral de tus intereses empresariales.',
    
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
    
    // New About section content
    aboutIntroduction: 'My professional practice is distinguished by a solid foundation, strategic vision, and unwavering commitment to effective legal conflict resolution. While my seniority in the professional registry may not reflect it, my immersion and training in Law began much earlier, forged under the tutelage of a fundamental figure in the field of labor law.',
    legacyAndMentorshipTitle: 'A Legacy of Excellence and Unique Mentorship',
    legacyAndMentorshipDesc: 'I had the immense privilege of being the sole disciple of Dr. Jorge Daniel Andreu, who was Volume 6 Folio 432 of the CPACF registry, an eminent lawyer who marked an era in Argentine Law. With his more than 50 years of professional career, my mentor provided me with invaluable training, entrusting me with his vast knowledge and transmitting the essence of legal practice with unparalleled generosity.',
    legacyAndMentorshipDesc2: 'Together with this reference figure, we cultivated perfect synergy: his profound experience in Law merged with my innovative imprint and strategic vision for conflict resolution. We both shared an unparalleled passion for corporate labor law and, with my conciliatory style, we formed a cohesive and effective team. Today, in honor of his memory and legacy, I proudly and enthusiastically assume the responsibility of continuing this path, deploying all the knowledge acquired for the benefit of my clients.',
    expertiseTitle: 'Expertise in Consumer Law and Corporate Labor Law',
    expertiseDesc: 'I am a graduate of the prestigious Universidad Nacional de La Matanza, where I obtained my law degree with an excellent average of 7.68. This solid academic foundation, combined with practical experience and the training received, has endowed me with exceptional ability to handle complex litigation.',
    expertiseDesc2: 'My specialization and passion focus on Consumer Law and Corporate Labor Law. In particular, I have almost 10 years of experience advising and assisting high-demand dealerships. This background allows me to thoroughly understand the challenges faced by companies with high litigation, whether from product sales or mass service provision. My deep mastery in these areas allows me to offer a service of great strategic value to protect your company\'s interests.',
    strategicVisionTitle: 'My Distinctive Talent: Strategic Vision of Conflict',
    strategicVisionDesc: 'My greatest strength lies in my ability to analyze and resolve conflicts. I am characterized by a comprehensive vision of litigation, breaking down every aspect, position, and interest of the parties involved. This deep analysis allows me to chart the most favorable strategy for my client.',
    strategicVisionDesc2: 'Whether it involves negotiating agreements that minimize risks and costs, or meticulously preparing for judicial battle when conciliatory proceedings do not represent the most beneficial path for my clients. My objective is clear: to provide effective solutions and first-class professional support that guarantees comprehensive defense of your business interests.',
    
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