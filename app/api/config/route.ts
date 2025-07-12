import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Solo retornar configuración pública que sea segura exponer
    const config = {
      whatsappNumber: process.env.WHATSAPP_NUMBER || '5491123456789',
      contactEmail: process.env.CONTACT_EMAIL || 'maria.kuris@corporativo.com',
      // No incluir API keys u otra información sensible
    };

    return NextResponse.json(config);
  } catch (error) {
    console.error('Error getting config:', error);
    return NextResponse.json(
      { error: 'Error obteniendo configuración' },
      { status: 500 }
    );
  }
} 