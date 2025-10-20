/**
 * Optimized font configuration using next/font
 * Fonts are self-hosted for better performance and privacy
 */

import { Inter, Alfa_Slab_One } from 'next/font/google';

// Inter font for body text - variable font with optimized loading
export const inter = Inter({
  subsets: ['latin'],
  display: 'swap', // Prevents invisible text during font load
  variable: '--font-inter',
  preload: true,
  fallback: ['system-ui', 'arial'],
  adjustFontFallback: true, // Prevents layout shift
});

// Alfa Slab One for headings
export const alfaSlabOne = Alfa_Slab_One({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-alfa-slab',
  preload: true,
  fallback: ['serif'],
  adjustFontFallback: true,
});

// Combined font classes for easy use
export const fonts = {
  inter: inter.variable,
  alfaSlabOne: alfaSlabOne.variable,
  className: `${inter.variable} ${alfaSlabOne.variable}`,
};

/**
 * Font preload links for critical fonts
 * Use this in layout.tsx head section
 */
export const fontPreloadLinks = [
  {
    rel: 'preload',
    href: inter.style.fontFamily,
    as: 'font',
    type: 'font/woff2',
    crossOrigin: 'anonymous',
  },
];
