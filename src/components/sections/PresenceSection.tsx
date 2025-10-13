'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */

import dynamic from 'next/dynamic';
import { useState, useRef, useEffect, useMemo } from 'react';
import { FadeInOnScroll, ParallaxWrapper } from '@/components/ParallaxWrapper';

// Use the same real globe library as AboutSection
const Globe = dynamic(() => import('react-globe.gl'), { ssr: false });

type PresenceLevel = 'active' | 'expanding' | 'partnership';

type Marker = {
  id: string;
  name: string;
  lat: number;
  lng: number;
  level: PresenceLevel;
};

const ACTIVE_COUNTRIES: Marker[] = [
  { id: 'sa', name: 'Saudi Arabia', lat: 23.8859, lng: 45.0792, level: 'active' },
  { id: 'iq', name: 'Iraq', lat: 33.2232, lng: 43.6793, level: 'active' },
  { id: 'eg', name: 'Egypt', lat: 26.0975, lng: 30.0444, level: 'active' },
  { id: 'tn', name: 'Tunisia', lat: 33.8869, lng: 9.5375, level: 'active' }
];

const EXPANDING_COUNTRIES: Marker[] = [
  { id: 'ma', name: 'Morocco', lat: 31.6295, lng: -7.9811, level: 'expanding' },
  { id: 'mr', name: 'Mauritania', lat: 21.0079, lng: -10.9408, level: 'expanding' },
  { id: 'ng', name: 'Nigeria', lat: 9.0765, lng: 7.3986, level: 'expanding' },
  { id: 'id', name: 'Indonesia', lat: -0.7893, lng: 113.9213, level: 'expanding' }
];

const PARTNERSHIP_COUNTRIES: Marker[] = [
  { id: 'us', name: 'USA', lat: 39.8283, lng: -98.5795, level: 'partnership' },
  { id: 'eu', name: 'Europe', lat: 54.5260, lng: 15.2551, level: 'partnership' },
  { id: 'my', name: 'Malaysia', lat: 4.2105, lng: 101.9758, level: 'partnership' }
];

const STATUS_LABELS = {
  active: 'Strong Presence',
  expanding: 'Expanding',
  partnership: 'Partnership'
};

export function PresenceSection() {
  const [size, setSize] = useState<{ w: number; h: number }>({ w: 0, h: 0 });
  const containerRef = useRef<HTMLDivElement | null>(null);
  const globeRef = useRef<{
    pointOfView: (view: { lat: number; lng: number; altitude: number }, ms?: number) => void;
  } | null>(null);
  const [activeCountry, setActiveCountry] = useState<Marker | null>(ACTIVE_COUNTRIES[0]);

  const points = useMemo(() => {
    // Different sizes by presence level
    const withSize = (m: Marker): Marker & { size: number } => {
      const sizeByLevel: Record<PresenceLevel, number> = {
        active: 1.6,
        expanding: 1.2,
        partnership: 0.9
      };
      return { ...m, size: sizeByLevel[m.level] };
    };
    return [...ACTIVE_COUNTRIES, ...EXPANDING_COUNTRIES, ...PARTNERSHIP_COUNTRIES].map(withSize);
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

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Section Header */}
        <FadeInOnScroll direction="up" delay={0.2}>
          <div className="text-center mb-12 md:mb-16">
            <h2 className="font-['Alfa_Slab_One:Regular',_sans-serif] text-[32px] md:text-[48px] text-[#716106] mb-4">
              Our Presence Around The World
            </h2>
            <p className="font-['ADLaM_Display:Regular',_sans-serif] text-[16px] md:text-[20px] text-gray-600 max-w-3xl mx-auto">
              Ebdaa Falcon operates across multiple regions, proudly serving clients and partners worldwide. 
              Through strategic partnerships and integrated energy and logistics solutions, we deliver excellence 
              that creates a global impact while supporting local growth.
            </p>
          </div>
        </FadeInOnScroll>

        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-8 lg:gap-12 items-start">
          {/* Real 3D Globe */}
          <ParallaxWrapper speed={0.3} direction="left">
            <div className="order-2 lg:order-1">
              <div
                className="relative rounded-2xl border border-gray-200 shadow-xl overflow-hidden"
                style={{
                  backgroundColor: '#0a0e1a',
                  backgroundImage:
                    'radial-gradient(rgba(255,255,255,0.10) 1px, transparent 1px), radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)',
                  backgroundSize: '3px 3px, 6px 6px',
                  backgroundPosition: '0 0, 1px 1px'
                }}
              >
                <div ref={containerRef} className="relative aspect-[4/3] sm:aspect-[1/1] lg:aspect-[1/1]">
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
                      if (level === 'active') return '#FFD700'; // gold
                      if (level === 'expanding') return '#00E5FF'; // cyan
                      return '#FF4D8D'; // magenta
                    }) as unknown as any}
                    pointRadius={((d: any) => (d as { size: number }).size * 0.28) as unknown as any}
                    labelsData={points as unknown as object[]}
                    labelLat={((d: any) => (d as Marker).lat) as unknown as any}
                    labelLng={((d: any) => (d as Marker).lng) as unknown as any}
                    labelText={((d: any) => (d as Marker).name) as unknown as any}
                    labelSize={() => 1.8}
                    labelColor={() => 'white'}
                    labelDotRadius={() => 0.4}
                    labelDotOrientation={() => 'top'}
                    onPointClick={(point: any) => {
                      const marker = point as Marker;
                      setActiveCountry(marker);
                    }}
                  />
                </div>
              </div>
            </div>
          </ParallaxWrapper>

          {/* Country Information Panel */}
          <FadeInOnScroll direction="right" delay={0.4}>
            <div className="order-1 lg:order-2">
              <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 md:p-8">
                {/* Legend */}
                <div className="mb-6">
                  <h3 className="font-['Alfa_Slab_One:Regular',_sans-serif] text-lg text-[#716106] mb-4">
                    Presence Status
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                      <span className="text-sm font-medium text-gray-700">Strong Presence</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-cyan-400"></div>
                      <span className="text-sm font-medium text-gray-700">Expanding</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-pink-400"></div>
                      <span className="text-sm font-medium text-gray-700">Partnership</span>
                    </div>
                  </div>
                </div>

                {/* Selected Country Info */}
                {activeCountry && (
                  <div className="border-t pt-6">
                    <h4 className="font-['Alfa_Slab_One:Regular',_sans-serif] text-xl text-[#716106] mb-2">
                      {activeCountry.name}
                    </h4>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Coordinates:</span>
                        <span>{activeCountry.lat.toFixed(2)}, {activeCountry.lng.toFixed(2)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Status:</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          activeCountry.level === 'active' ? 'bg-green-100 text-green-800' :
                          activeCountry.level === 'expanding' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {STATUS_LABELS[activeCountry.level]}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Key Statistics */}
                <div className="mt-6 pt-6 border-t">
                  <h4 className="font-['Alfa_Slab_One:Regular',_sans-serif] text-lg text-[#716106] mb-4">
                    Global Reach
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-[#716106]">11</div>
                      <div className="text-xs text-gray-600">Countries</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-[#716106]">4</div>
                      <div className="text-xs text-gray-600">Continents</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FadeInOnScroll>
        </div>

        {/* Regional Highlights */}
        <FadeInOnScroll direction="up" delay={0.6}>
          <div className="mt-12 md:mt-16">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="font-['Alfa_Slab_One:Regular',_sans-serif] text-lg text-[#716106]">
                    Strong Presence
                  </h3>
                </div>
                <p className="text-sm text-gray-600">
                  Saudi Arabia, Iraq, Egypt, and Tunisia with established operations and local partnerships.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="font-['Alfa_Slab_One:Regular',_sans-serif] text-lg text-[#716106]">
                    Expanding Reach
                  </h3>
                </div>
                <p className="text-sm text-gray-600">
                  Morocco, Mauritania, Nigeria, and Indonesia with growing operations and new opportunities.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="font-['Alfa_Slab_One:Regular',_sans-serif] text-lg text-[#716106]">
                    Strategic Partnerships
                  </h3>
                </div>
                <p className="text-sm text-gray-600">
                  USA, Europe, and Malaysia with collaborative ventures and joint initiatives.
                </p>
              </div>
            </div>
          </div>
        </FadeInOnScroll>
      </div>
    </section>
  );
}
