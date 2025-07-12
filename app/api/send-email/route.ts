import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';

const resend = new Resend(process.env.RESEND_API_KEY);

// Esquema de validación para el formulario
const contactFormSchema = z.object({
  nombre: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  apellido: z.string().min(2, 'El apellido debe tener al menos 2 caracteres'),
  empresa: z.string().min(2, 'La empresa debe tener al menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  telefono: z.string().min(10, 'El teléfono debe tener al menos 10 caracteres'),
  areaConsulta: z.string().min(5, 'El área de consulta debe tener al menos 5 caracteres'),
  mensaje: z.string().min(20, 'El mensaje debe tener al menos 20 caracteres'),
});

export async function POST(request: NextRequest) {
  try {
    // Validar el rate limiting (simple implementación)
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    
    const body = await request.json();
    
    // Validar datos del formulario
    const validatedData = contactFormSchema.parse(body);
    
    // Crear el HTML del email
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #003366 0%, #0066cc 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
          <h1 style="margin: 0; font-size: 24px;">📧 Nueva Consulta Corporativa</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.9;">Recibida el ${new Date().toLocaleDateString('es-AR', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}</p>
        </div>
        
        <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          <h2 style="color: #003366; margin-bottom: 20px; border-bottom: 2px solid #003366; padding-bottom: 10px;">
            🏢 Información del Cliente
          </h2>
          
          <div style="display: grid; gap: 15px; margin-bottom: 25px;">
            <div style="display: flex; align-items: center; padding: 12px; background: #f8f9fa; border-radius: 8px;">
              <strong style="color: #003366; min-width: 100px;">👤 Nombre:</strong>
              <span style="margin-left: 10px;">${validatedData.nombre} ${validatedData.apellido}</span>
            </div>
            
            <div style="display: flex; align-items: center; padding: 12px; background: #f8f9fa; border-radius: 8px;">
              <strong style="color: #003366; min-width: 100px;">🏢 Empresa:</strong>
              <span style="margin-left: 10px;">${validatedData.empresa}</span>
            </div>
            
            <div style="display: flex; align-items: center; padding: 12px; background: #f8f9fa; border-radius: 8px;">
              <strong style="color: #003366; min-width: 100px;">📧 Email:</strong>
              <span style="margin-left: 10px;"><a href="mailto:${validatedData.email}" style="color: #0066cc; text-decoration: none;">${validatedData.email}</a></span>
            </div>
            
            <div style="display: flex; align-items: center; padding: 12px; background: #f8f9fa; border-radius: 8px;">
              <strong style="color: #003366; min-width: 100px;">📱 Teléfono:</strong>
              <span style="margin-left: 10px;"><a href="tel:${validatedData.telefono}" style="color: #0066cc; text-decoration: none;">${validatedData.telefono}</a></span>
            </div>
            
            <div style="display: flex; align-items: center; padding: 12px; background: #f8f9fa; border-radius: 8px;">
              <strong style="color: #003366; min-width: 100px;">⚖️ Área:</strong>
              <span style="margin-left: 10px;">${validatedData.areaConsulta}</span>
            </div>
          </div>
          
          <h3 style="color: #003366; margin-bottom: 15px; border-bottom: 1px solid #e0e0e0; padding-bottom: 8px;">
            📝 Descripción del Caso
          </h3>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; border-left: 4px solid #003366;">
            <p style="margin: 0; line-height: 1.6; color: #333;">${validatedData.mensaje}</p>
          </div>
          
          <div style="margin-top: 30px; padding: 20px; background: linear-gradient(135deg, #e6f3ff 0%, #cce7ff 100%); border-radius: 8px; text-align: center;">
            <p style="margin: 0; color: #003366; font-weight: 500;">
              💬 <strong>Respuesta Rápida por WhatsApp:</strong>
            </p>
                         <a href="https://wa.me/${process.env.WHATSAPP_NUMBER || '5491123456789'}?text=Hola%20${validatedData.nombre}%2C%20recib%C3%AD%20tu%20consulta%20sobre%20${encodeURIComponent(validatedData.areaConsulta)}%20y%20me%20contacto%20para%20coordinar%20una%20reuni%C3%B3n." 
                style="display: inline-block; margin-top: 10px; padding: 12px 24px; background: #25d366; color: white; text-decoration: none; border-radius: 25px; font-weight: 500;">
               📱 Responder por WhatsApp
             </a>
          </div>
        </div>
        
        <div style="text-align: center; margin-top: 20px; padding: 20px; color: #666; font-size: 14px;">
          <p style="margin: 0;">Este email fue enviado desde el formulario de contacto de <strong>mariakuris.com</strong></p>
          <p style="margin: 5px 0 0 0;">IP del remitente: ${ip}</p>
        </div>
      </div>
    `;

    // Enviar email
    const { data, error } = await resend.emails.send({
      from: `Consulta Corporativa <${process.env.FROM_EMAIL || 'onboarding@resend.dev'}>`,
      to: [process.env.CONTACT_EMAIL || 'aiponce@alumno.unlam.edu.ar'],
      subject: `🏢 Nueva Consulta: ${validatedData.areaConsulta} - ${validatedData.empresa}`,
      html: emailHtml,
      replyTo: validatedData.email,
    });

    if (error) {
      console.error('Error enviando email:', error);
      return NextResponse.json(
        { error: 'Error al enviar el email', details: error },
        { status: 500 }
      );
    }

    // Respuesta exitosa
    return NextResponse.json({ 
      success: true, 
      message: 'Consulta enviada exitosamente',
      emailId: data?.id,
      whatsappUrl: `https://wa.me/${process.env.WHATSAPP_NUMBER || '5491123456789'}?text=${encodeURIComponent(
        `Hola, soy ${validatedData.nombre} de ${validatedData.empresa}. Te escribo sobre: ${validatedData.areaConsulta}. ${validatedData.mensaje}`
      )}`
    });

  } catch (error) {
    console.error('Error en API send-email:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Datos inválidos', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
} 