/**
 * Image blur placeholder utilities for better perceived performance
 */

/**
 * Generate a simple blur data URL for image placeholders
 * This creates a tiny 10x10 pixel gradient that Next.js will blur
 */
export function generateBlurDataURL(color: string = '#EFC132'): string {
  // Convert hex to RGB
  const hex = color.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  // Create a very small SVG with gradient
  const svg = `
    <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:rgb(${r},${g},${b});stop-opacity:0.8" />
          <stop offset="100%" style="stop-color:rgb(${Math.max(0, r - 30)},${Math.max(0, g - 30)},${Math.max(0, b - 30)});stop-opacity:0.6" />
        </linearGradient>
      </defs>
      <rect width="10" height="10" fill="url(#g)" />
    </svg>
  `.trim();

  // Convert to base64
  const base64 = Buffer.from(svg).toString('base64');
  return `data:image/svg+xml;base64,${base64}`;
}

/**
 * Predefined blur placeholders for common colors
 */
export const BLUR_DATA_URLS = {
  gold: generateBlurDataURL('#EFC132'),
  white: generateBlurDataURL('#FFFFFF'),
  black: generateBlurDataURL('#000000'),
  gray: generateBlurDataURL('#808080'),
  gradient: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJnIiB4MT0iMCUiIHkxPSIwJSIgeDI9IjEwMCUiIHkyPSIxMDAlIj48c3RvcCBvZmZzZXQ9IjAlIiBzdHlsZT0ic3RvcC1jb2xvcjpyZ2IoMjM5LDE5Myw1MCk7c3RvcC1vcGFjaXR5OjAuOCIgLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0eWxlPSJzdG9wLWNvbG9yOnJnYigyMDksMTYzLDIwKTtzdG9wLW9wYWNpdHk6MC42IiAvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCIgZmlsbD0idXJsKCNnKSIgLz48L3N2Zz4=',
};

/**
 * Get appropriate blur placeholder based on image path
 */
export function getBlurDataURL(imagePath: string): string {
  // Check if it's a logo or brand image
  if (imagePath.includes('logo') || imagePath.includes('brand')) {
    return BLUR_DATA_URLS.gold;
  }

  // Check if it's a dark/night image
  if (imagePath.includes('night') || imagePath.includes('dark')) {
    return BLUR_DATA_URLS.black;
  }

  // Default to gradient
  return BLUR_DATA_URLS.gradient;
}

/**
 * Shimmer effect for loading state (alternative to blur)
 */
export const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#EFC132" offset="20%" />
      <stop stop-color="#FFD700" offset="50%" />
      <stop stop-color="#EFC132" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#EFC132" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

export const toBase64 = (str: string) =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str);

/**
 * Generate shimmer data URL
 */
export function generateShimmerDataURL(w: number = 700, h: number = 475): string {
  return `data:image/svg+xml;base64,${toBase64(shimmer(w, h))}`;
}
