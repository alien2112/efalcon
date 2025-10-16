'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */

import dynamic from 'next/dynamic';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

// Reuse the same globe library and container styling as About Us
const Globe = dynamic(() => import('react-globe.gl'), { ssr: false });

type PresenceLevel = 'strong' | 'expanding' | 'partner';

type Marker = {
  id: string;
  name: string;
  lat: number;
  lng: number;
  level: PresenceLevel;
};

const STRONG: Marker[] = [
  { id: 'sa', name: 'Saudi Arabia', lat: 23.8859, lng: 45.0792, level: 'strong' },
  { id: 'iq', name: 'Iraq', lat: 33.2232, lng: 43.6793, level: 'strong' },
  { id: 'eg', name: 'Egypt', lat: 26.8206, lng: 30.8025, level: 'strong' },
  { id: 'tn', name: 'Tunisia', lat: 33.8869, lng: 9.5375, level: 'strong' }
];

const EXPANDING: Marker[] = [
  { id: 'ma', name: 'Morocco', lat: 31.7917, lng: -7.0926, level: 'expanding' },
  { id: 'mr', name: 'Mauritania', lat: 20.2540, lng: -9.2399, level: 'expanding' },
  { id: 'ng', name: 'Nigeria', lat: 9.0820, lng: 8.6753, level: 'expanding' },
  { id: 'id', name: 'Indonesia', lat: -0.7893, lng: 113.9213, level: 'expanding' }
];

const PARTNERS: Marker[] = [
  { id: 'us', name: 'United States', lat: 37.0902, lng: -95.7129, level: 'partner' },
  { id: 'eu', name: 'Europe', lat: 54.5260, lng: 15.2551, level: 'partner' },
  { id: 'my', name: 'Malaysia', lat: 4.2105, lng: 101.9758, level: 'partner' }
];

export function AboutSection() {
  const { t } = useLanguage();
  const [size, setSize] = useState<{ w: number; h: number }>({ w: 0, h: 0 });
  const containerRef = useRef<HTMLDivElement | null>(null);
  const globeRef = useRef<{
    pointOfView: (view: { lat: number; lng: number; altitude: number }, ms?: number) => void;
  } | null>(null);
  const points = useMemo(() => {
    // Different sizes by presence level
    const withSize = (m: Marker): Marker & { size: number } => {
      const sizeByLevel: Record<PresenceLevel, number> = {
        strong: 1.6,
        expanding: 1.2,
        partner: 0.9
      };
      return { ...m, size: sizeByLevel[m.level] };
    };
    return [...STRONG, ...EXPANDING, ...PARTNERS].map(withSize);
  }, []);

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

  // Enable touch pinch-zoom/pan via underlying OrbitControls
  useEffect(() => {
    const globeAny = globeRef.current as unknown as { controls?: () => any } | null;
    const controls = globeAny && typeof globeAny.controls === 'function' ? globeAny.controls() : null;
    if (!controls) return;
    controls.enableZoom = true;
    controls.enablePan = true;
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.zoomSpeed = 0.5;
    controls.minDistance = 120;
    controls.maxDistance = 400;
  }, [size.w, size.h]);

  return (
    <div className="relative w-full bg-[#EFC132] py-20 md:py-32 overflow-hidden">
      <div className="relative z-10 max-w-[1440px] mx-auto px-4 md:px-8">
        {/* Section Title */}
        <h2 className="font-['Alfa_Slab_One:Bold',_sans-serif] font-bold text-[48px] md:text-[96px] leading-[1.2] text-center text-white mb-12 md:mb-16">
          {t('about.title')}
        </h2>

        {/* Text with Globe on the right */}
        <div className="grid lg:grid-cols-[1.4fr_1.2fr] gap-10 items-center">
          {/* Text (Left) */}
          <div className="max-w-[706px] mx-auto md:mx-0 md:ml-[56px]">
            <div className="font-['Alice:Regular',_sans-serif] text-[20px] md:text-[32px] text-white leading-[1.375]">
              <p className="mb-6 md:mb-8">
                {t('about.description')}
              </p>
              
              <ul className="list-disc space-y-2 md:space-y-3 ml-8 md:ml-12">
                <li>
                  <span>{t('about.presence.strongPresence')}</span>
                </li>
                <li>
                  <span>{t('about.presence.expanding')}</span>
                </li>
                <li>
                  <span>{t('about.presence.partnerships')}</span>
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
            {/* Make the globe visually larger with a squarer aspect and taller container */}
            <div ref={containerRef} className="relative aspect-[4/3] sm:aspect-[1/1] lg:aspect-[1/1]" style={{ touchAction: 'none' }}>
              <Globe
                ref={globeRef as unknown as any}
                height={size.h}
                width={size.w}
                backgroundColor="rgba(0,0,0,0)"
                globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
                bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
                pointsData={points as unknown as object[]}
                pointLat={((d: any) => (d as Marker).lat) as unknown as any}
                pointLng={((d: any) => (d as Marker).lng) as unknown as any}
                pointAltitude={() => 0.02}
                pointColor={((d: any) => {
                  const level = (d as Marker & { size: number }).level;
                  if (level === 'strong') return '#FFD700'; // gold
                  if (level === 'expanding') return '#00E5FF'; // cyan
                  return '#FF4D8D'; // magenta
                }) as unknown as any}
                pointRadius={((d: any) => (d as { size: number }).size * 0.28) as unknown as any}
                labelsData={points as unknown as object[]}
                labelLat={((d: any) => (d as Marker).lat) as unknown as any}
                labelLng={((d: any) => (d as Marker).lng) as unknown as any}
                labelText={((d: any) => (d as Marker).name) as unknown as any}
                labelSize={1.8}
                labelColor="white"
                labelDotRadius={0.5}
                labelAltitude={0.02}
                atmosphereAltitude={0.15}
                enablePointerInteraction={true}
                onLabelClick={() => {}}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
