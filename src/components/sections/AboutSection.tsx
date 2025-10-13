'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */

import dynamic from 'next/dynamic';
import { useEffect, useMemo, useRef, useState } from 'react';

// Reuse the same globe library and container styling as About Us
const Globe = dynamic(() => import('react-globe.gl'), { ssr: false });

type Point = {
  id: string;
  name: string;
  lat: number;
  lng: number;
};

const COUNTRIES: Point[] = [
  { id: 'sa', name: 'Saudi Arabia', lat: 23.8859, lng: 45.0792 },
  { id: 'ae', name: 'UAE', lat: 23.4241, lng: 53.8478 },
  { id: 'kw', name: 'Kuwait', lat: 29.3117, lng: 47.4818 },
  { id: 'bh', name: 'Bahrain', lat: 26.0667, lng: 50.5577 },
  { id: 'qa', name: 'Qatar', lat: 25.3548, lng: 51.1839 },
  { id: 'om', name: 'Oman', lat: 21.4735, lng: 55.9754 },
  { id: 'jo', name: 'Jordan', lat: 31.24, lng: 36.51 },
  { id: 'eg', name: 'Egypt', lat: 26.8206, lng: 30.8025 }
];

export function AboutSection() {
  const [size, setSize] = useState<{ w: number; h: number }>({ w: 0, h: 0 });
  const containerRef = useRef<HTMLDivElement | null>(null);
  const globeRef = useRef<{
    pointOfView: (view: { lat: number; lng: number; altitude: number }, ms?: number) => void;
  } | null>(null);
  const points = useMemo(() => COUNTRIES.map(c => ({ ...c, size: 0.8 })), []);

  useEffect(() => {
    if (!containerRef.current) return;
    const el = containerRef.current;
    const set = () => setSize({ w: el.clientWidth, h: el.clientHeight });
    set();
    const ro = new ResizeObserver(set);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (!globeRef.current) return;
    globeRef.current.pointOfView({ lat: 23.8859, lng: 45.0792, altitude: 1.2 }, 0);
  }, [size.w, size.h]);

  return (
    <div className="relative w-full bg-[#716106] py-20 md:py-32 overflow-hidden">
      <div className="relative z-10 max-w-[1440px] mx-auto px-4 md:px-8">
        {/* Section Title */}
        <h2 className="font-['Alfa_Slab_One:Regular',_sans-serif] text-[48px] md:text-[96px] leading-[1.2] text-center text-white mb-12 md:mb-16">
          Our Presence Around The World
        </h2>

        {/* Text with Globe on the right */}
        <div className="grid lg:grid-cols-[1.6fr_1fr] gap-10 items-center">
          {/* Text (Left) */}
          <div className="max-w-[706px] mx-auto md:mx-0 md:ml-[56px]">
            <div className="font-['Alice:Regular',_sans-serif] text-[20px] md:text-[32px] text-white leading-[1.375]">
              <p className="mb-6 md:mb-8">
                Ebdaa Falcon operates across multiple regions, proudly serving clients and partners worldwide. With strong roots in Saudi Arabia, our presence extends to the Middle East, Africa, Asia, Europe, and the United States. Through strategic partnerships and integrated energy and logistics solutions, we deliver excellence that creates a global impact while supporting local growth.
              </p>
              
              <ul className="list-disc space-y-2 md:space-y-3 ml-8 md:ml-12">
                <li>
                  <span>Strong presence in Saudi Arabia, Iraq, Egypt, and Tunisia</span>
                </li>
                <li>
                  <span>Expanding across Morocco, Mauritania, Nigeria, and Indonesia</span>
                </li>
                <li>
                  <span>Active partnerships in USA, Europe, and Malaysia</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Globe (Right) — same container & config as About Us globe */}
          <div
            className="relative rounded-xl border border-white/10 shadow-md overflow-hidden"
            style={{
              backgroundColor: '#0a0e1a',
              backgroundImage:
                'radial-gradient(rgba(255,255,255,0.10) 1px, transparent 1px), radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)',
              backgroundSize: '3px 3px, 6px 6px',
              backgroundPosition: '0 0, 1px 1px'
            }}
          >
            <div ref={containerRef} className="relative aspect-[16/9] md:aspect-[21/9]">
              <Globe
                ref={globeRef as unknown as any}
                height={size.h}
                width={size.w}
                backgroundColor="rgba(0,0,0,0)"
                globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
                bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
                pointsData={points as unknown as object[]}
                pointLat={((d: any) => (d as Point).lat) as unknown as any}
                pointLng={((d: any) => (d as Point).lng) as unknown as any}
                pointAltitude={() => 0.01}
                pointColor={() => '#FFD700'}
                pointRadius={((d: any) => (d as { size: number }).size * 0.2) as unknown as any}
                labelsData={points as unknown as object[]}
                labelLat={((d: any) => (d as Point).lat) as unknown as any}
                labelLng={((d: any) => (d as Point).lng) as unknown as any}
                labelText={((d: any) => (d as Point).name) as unknown as any}
                labelSize={() => 1.6}
                labelColor={() => 'white'}
                labelDotRadius={() => 0.4}
                atmosphereAltitude={0.15}
                enablePointerInteraction
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
