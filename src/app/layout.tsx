import type { ReactNode } from "react";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { Footer } from '@/components/Footer';
import { FloatingActions } from '@/components/FloatingActions';
import { ResponsiveScrollProgressIndicator } from '@/components/ScrollProgressIndicator';
import './globals.css';

export const metadata = {
  title: 'Ebdaa Falcon - Petroleum Derivatives and Logistics Services',
  description: 'Ebdaa Falcon is specialized in storing, transporting, and trading petroleum products.',
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      <body className="antialiased">
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
