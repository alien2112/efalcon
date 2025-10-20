import type { ReactNode } from "react";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { Footer } from '@/components/Footer';
import { FloatingActions } from '@/components/FloatingActions';
import { ResponsiveScrollProgressIndicator } from '@/components/ScrollProgressIndicator';
import { ImagePreloader, CRITICAL_IMAGES } from '@/components/ImagePreloader';
import { MobileScrollOptimizer } from '@/components/MobileScrollOptimizer';
import { ScrollOptimizer } from '@/components/ScrollOptimizer';
import { PerformanceMonitor } from '@/components/PerformanceMonitor';
import { MobilePerformanceMonitor } from '@/components/MobilePerformanceMonitor';
import { MobileResourcePreloader, MOBILE_CRITICAL_IMAGES } from '@/components/MobileResourcePreloader';
import { fonts } from '@/lib/fonts';
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
    <html suppressHydrationWarning className={fonts.className}>
      <head>
        {/* Critical resource hints for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Preload critical resources */}
        <link rel="preload" href="/logofirstsection.webp" as="image" type="image/webp" />
        <link rel="preload" href="/ourworkbanner.webp" as="image" type="image/webp" />
        
        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        
        {/* Preload critical CSS */}
        <link rel="preload" href="/_next/static/css/app/layout.css" as="style" />
        
        {/* Mobile-specific resource hints */}
        <link rel="preload" href="/logofirstsection.webp" as="image" type="image/webp" media="(max-width: 768px)" />
        <link rel="preload" href="/vision.webp" as="image" type="image/webp" media="(max-width: 768px)" />
        <link rel="preload" href="/our presence around .png" as="image" type="image/png" media="(max-width: 768px)" />
        
        {/* Mobile-optimized font loading */}
        <link rel="preload" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Alfa+Slab+One&display=swap" as="style" media="(max-width: 768px)" />
      </head>
      <body className="antialiased">
        <PerformanceMonitor />
        <MobilePerformanceMonitor />
        <ScrollOptimizer />
        <ImagePreloader images={CRITICAL_IMAGES} />
        <MobileResourcePreloader images={MOBILE_CRITICAL_IMAGES} />
        <MobileScrollOptimizer />
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
