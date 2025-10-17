import type { ReactNode } from "react";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { Footer } from '@/components/Footer';
import { FloatingActions } from '@/components/FloatingActions';
import { ResponsiveScrollProgressIndicator } from '@/components/ScrollProgressIndicator';
import { ImagePreloader, CRITICAL_IMAGES } from '@/components/ImagePreloader';
import './globals.css';

export const metadata = {
  title: 'Ebdaa Falcon - Petroleum Derivatives and Logistics Services',
  description: 'Ebdaa Falcon is specialized in storing, transporting, and trading petroleum products.',
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/logofirstsection.png', sizes: '32x32', type: 'image/png' },
      { url: '/logofirstsection.png', sizes: '16x16', type: 'image/png' },
      { url: '/logofirstsection.png', rel: 'shortcut icon' },
    ],
    apple: [
      { url: '/logofirstsection.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { url: '/logofirstsection.png', rel: 'icon', sizes: '192x192', type: 'image/png' },
      { url: '/logofirstsection.png', rel: 'icon', sizes: '512x512', type: 'image/png' },
    ],
  },
  themeColor: '#EFC132',
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      <body className="antialiased">
        <ImagePreloader images={CRITICAL_IMAGES} />
        <LanguageProvider>
          <ResponsiveScrollProgressIndicator />
          {children}
          <Footer />
          <FloatingActions />
        </LanguageProvider>
      </body>
    </html>
  );
}
