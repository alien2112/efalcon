import type { Metadata } from "next";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { FloatingActions } from "@/components/FloatingActions";

// Force dynamic rendering for all routes under this layout
export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Ebdaa Falcon - Petroleum Derivatives and Logistics Services",
  description: "Ebdaa Falcon is specialized in storing, transporting, and trading petroleum products. We provide integrated logistics solutions across marine ports and inland operations, representing international partners to ensure efficiency, reliability, and world-class service standards.",
  keywords: "petroleum, logistics, energy, storage, trading, marine ports, Middle East, Saudi Arabia",
  authors: [{ name: "Ebdaa Falcon" }],
  openGraph: {
    title: "Ebdaa Falcon - Petroleum Derivatives and Logistics Services",
    description: "Leading force in energy and logistics sectors, driving sustainable growth and excellence across the Middle East and beyond.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ebdaa Falcon - Petroleum Derivatives and Logistics Services",
    description: "Leading force in energy and logistics sectors, driving sustainable growth and excellence across the Middle East and beyond.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        {children}
        <Footer />
        <FloatingActions />
      </body>
    </html>
  );
}
