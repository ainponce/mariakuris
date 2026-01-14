import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "María Kuris | Abogada",
  description: "Asesoría legal especializada. Agenda tu consulta personalizada con María Kuris.",
  keywords: ["abogada", "asesoría legal", "consulta legal", "María Kuris"],
  authors: [{ name: "María Kuris" }],
  openGraph: {
    title: "María Kuris | Abogada",
    description: "Asesoría legal especializada. Agenda tu consulta personalizada.",
    type: "website",
    locale: "es_ES",
  },
  twitter: {
    card: "summary_large_image",
    title: "María Kuris | Abogada",
    description: "Asesoría legal especializada. Agenda tu consulta personalizada.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
