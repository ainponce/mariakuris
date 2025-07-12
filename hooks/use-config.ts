import { useState, useEffect } from 'react';

interface AppConfig {
  whatsappNumber: string;
  contactEmail: string;
}

const defaultConfig: AppConfig = {
  whatsappNumber: '5491123456789',
  contactEmail: 'maria.kuris@corporativo.com',
};

export const useConfig = () => {
  const [config, setConfig] = useState<AppConfig>(defaultConfig);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/config');
        
        if (!response.ok) {
          throw new Error('Error al obtener configuración');
        }
        
        const data = await response.json();
        setConfig(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching config:', err);
        setError(err instanceof Error ? err.message : 'Error desconocido');
        // Mantener configuración por defecto en caso de error
        setConfig(defaultConfig);
      } finally {
        setLoading(false);
      }
    };

    fetchConfig();
  }, []);

  return {
    config,
    loading,
    error,
    whatsappNumber: config.whatsappNumber,
    contactEmail: config.contactEmail,
  };
}; 