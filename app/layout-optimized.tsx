import type { Metadata } from 'next';
import './globals.css';
import { LanguageProvider } from '@/contexts/OptimizedLanguageContext';
import { ThemeProvider } from '@/contexts/OptimizedThemeContext';
import ErrorBoundary from '@/shared/components/ErrorBoundary';

export const metadata: Metadata = {
    title: 'Maria Kuris - Corporate Lawyer | Especialista en Derecho Corporativo',
    description: 'Maria Kuris - Abogada Corporativa especializada en derecho empresarial, M&A, compliance y gobierno corporativo. Más de 15 años de experiencia en soluciones jurídicas integrales.',
    keywords: [
        'abogada corporativa',
        'derecho empresarial',
        'M&A',
        'compliance',
        'gobierno corporativo',
        'fusiones y adquisiciones',
        'derecho societario',
        'Maria Kuris'
    ],
    authors: [{ name: 'Maria Kuris' }],
    creator: 'Maria Kuris',
    publisher: 'Maria Kuris',
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    metadataBase: new URL('https://mariakuris.com'),
    alternates: {
        canonical: '/',
        languages: {
            'es-ES': '/es',
            'en-US': '/en',
        },
    },
    openGraph: {
        title: 'Maria Kuris - Corporate Lawyer',
        description: 'Abogada Corporativa especializada en derecho empresarial con más de 15 años de experiencia',
        url: 'https://mariakuris.com',
        siteName: 'Maria Kuris',
        images: [
            {
                url: '/og-image.jpg',
                width: 1200,
                height: 630,
                alt: 'Maria Kuris - Corporate Lawyer',
            },
        ],
        locale: 'es_ES',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Maria Kuris - Corporate Lawyer',
        description: 'Abogada Corporativa especializada en derecho empresarial',
        creator: '@mariakuris',
        images: ['/og-image.jpg'],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    verification: {
        google: 'google-site-verification-code',
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="es" suppressHydrationWarning>
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="theme-color" content="#003366" />
                <meta name="color-scheme" content="light dark" />
                <link rel="icon" href="/favicon.ico" />
                <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
                <link rel="manifest" href="/manifest.json" />

                {/* Preload critical resources */}
                <link
                    rel="preload"
                    href="/fonts/inter-var.woff2"
                    as="font"
                    type="font/woff2"
                    crossOrigin="anonymous"
                />

                {/* DNS prefetch for external resources */}
                <link rel="dns-prefetch" href="//fonts.googleapis.com" />
                <link rel="dns-prefetch" href="//vercel-storage.com" />

                {/* Structured data */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            '@context': 'https://schema.org',
                            '@type': 'Person',
                            name: 'Maria Kuris',
                            jobTitle: 'Corporate Lawyer',
                            description: 'Abogada Corporativa especializada en derecho empresarial',
                            url: 'https://mariakuris.com',
                            image: 'https://mariakuris.com/og-image.jpg',
                            sameAs: [
                                'https://linkedin.com/in/mariakuris',
                                'https://twitter.com/mariakuris'
                            ],
                            knowsAbout: [
                                'Corporate Law',
                                'Mergers and Acquisitions',
                                'Corporate Compliance',
                                'Corporate Governance',
                                'Business Law'
                            ],
                            alumniOf: 'Universidad de Buenos Aires',
                            workLocation: {
                                '@type': 'Place',
                                name: 'Buenos Aires, Argentina'
                            }
                        })
                    }}
                />
            </head>
            <body className="font-sans antialiased">
                <ErrorBoundary>
                    <ThemeProvider>
                        <LanguageProvider>
                            {children}
                        </LanguageProvider>
                    </ThemeProvider>
                </ErrorBoundary>

                {/* Analytics script placeholder */}
                {process.env.NODE_ENV === 'production' && (
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `
                // Google Analytics or other analytics code
                console.log('Analytics loaded');
              `
                        }}
                    />
                )}
            </body>
        </html>
    );
} 