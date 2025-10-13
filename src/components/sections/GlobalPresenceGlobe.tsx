'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */

import dynamic from 'next/dynamic';
import { useEffect, useMemo, useRef, useState } from 'react';

// react-globe.gl needs window; use dynamic import to avoid SSR
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

export function GlobalPresenceGlobe() {
  const points = useMemo(() => COUNTRIES.map(c => ({ ...c, size: 0.8 })), []);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const globeRef = useRef<{
    pointOfView: (view: { lat: number; lng: number; altitude: number }, ms?: number) => void;
  } | null>(null);
  const [size, setSize] = useState<{ w: number; h: number }>({ w: 0, h: 0 });

  useEffect(() => {
    if (!containerRef.current) return;
    const el = containerRef.current;
    const set = () => setSize({ w: el.clientWidth, h: el.clientHeight });
    set();
    const ro = new ResizeObserver(set);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Center camera on MENA region once the globe is available
  useEffect(() => {
    if (!globeRef.current) return;
    // Center camera on Saudi Arabia by default
    globeRef.current.pointOfView({ lat: 23.8859, lng: 45.0792, altitude: 1.2 }, 0);
  }, [size.w, size.h]);

  const flyTo = (lat: number, lng: number, altitude = 1.1) => {
    if (!globeRef.current) return;
    globeRef.current.pointOfView({ lat, lng, altitude }, 1200);
  };

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-10 md:mb-14">
          <h2 className="font-['Alfa_Slab_One:Regular',_sans-serif] text-3xl md:text-5xl text-[#716106] mb-4">Global Presence</h2>
          <p className="font-['Alice:Regular',_sans-serif] text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">Interactive 3D globe showing our key regions and partnerships.</p>
        </div>

        <div className="grid lg:grid-cols-[1.6fr_1fr] gap-10 items-center">
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
              {/* globe component rendered client-side; casts keep TS quiet */}
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

          <div>
            <ul className="grid grid-cols-2 gap-3">
              {COUNTRIES.map(c => (
                <li key={c.id}>
                  <button
                    onClick={() => flyTo(c.lat, c.lng, 1.0)}
                    className="w-full text-left font-['Alice:Regular',_sans-serif] text-gray-800 bg-white border border-gray-200 rounded-md px-3 py-2 hover:border-[#716106] hover:bg-white"
                  >
                    {c.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}


