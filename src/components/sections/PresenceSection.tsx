'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */

import dynamic from 'next/dynamic';
import { useState, useRef, useEffect, useMemo } from 'react';
import { FadeInOnScroll, ParallaxWrapper } from '@/components/ParallaxWrapper';
import { useLanguage } from '@/contexts/LanguageContext';

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

// Status labels will be handled by translation system

export function PresenceSection() {
  const { t } = useLanguage();
  
  const STATUS_LABELS = {
    active: t('about.statusLabels.active'),
    expanding: t('about.statusLabels.expanding'),
    partnership: t('about.statusLabels.partnership')
  };
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

  // Enable mobile pinch-to-zoom and pan via OrbitControls
  useEffect(() => {
    const globeAny = globeRef.current as unknown as { controls?: () => any } | null;
    const controls = globeAny && typeof globeAny.controls === 'function' ? globeAny.controls() : null;
    if (!controls) return;
    controls.enableZoom = true;
    controls.enablePan = true;
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.zoomSpeed = 0.5;
    // Set reasonable distances for a nice UX; values tuned for react-globe.gl scale
    controls.minDistance = 120;
    controls.maxDistance = 400;
  }, [size.w, size.h]);

  return (
    <>
      {/* Presence Section with Rich Gold Gradient */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        {/* Gold Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#FFD700] via-[#B8860B] to-[#FFB300]">
          {/* Shimmering Overlay */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-tl from-transparent via-white/5 to-transparent"></div>
          </div>

          {/* Soft Gold Glow Elements */}
          <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-[#FFD700]/20 to-transparent rounded-full blur-xl"></div>
          <div className="absolute top-20 right-20 w-24 h-24 bg-gradient-to-bl from-[#FFC107]/20 to-transparent rounded-full blur-lg"></div>
          <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-gradient-to-tr from-[#FFB300]/15 to-transparent rounded-full blur-2xl"></div>
          <div className="absolute bottom-10 right-1/3 w-28 h-28 bg-gradient-to-tl from-[#FFD700]/10 to-transparent rounded-full blur-xl"></div>

          {/* Fine Grid Pattern */}
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}></div>

          {/* Animated Light Shimmers */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-10 -left-10 w-96 h-1 bg-gradient-to-r from-transparent via-[#FFF3B0]/30 to-transparent rotate-12 animate-pulse"></div>
            <div className="absolute top-1/3 -right-10 w-80 h-1 bg-gradient-to-r from-transparent via-[#FFD700]/25 to-transparent -rotate-12 animate-pulse" style={{ animationDelay: '1s' }}></div>
            <div className="absolute bottom-1/4 -left-10 w-72 h-1 bg-gradient-to-r from-transparent via-[#FFECB3]/20 to-transparent rotate-6 animate-pulse" style={{ animationDelay: '2s' }}></div>
          </div>
        </div>

        {/* Foreground Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">
          <FadeInOnScroll direction="up" delay={0.2}>
            <div className="text-center mb-12 md:mb-16">
              <h2 className="font-['Alfa_Slab_One:Regular',_sans-serif] text-[32px] md:text-[48px] text-white mb-4">
                {t('about.title')}
              </h2>
              <p className="font-['ADLaM_Display:Regular',_sans-serif] text-[16px] md:text-[20px] text-white/90 max-w-3xl mx-auto">
                {t('about.description')}
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
                    pointColor={(() => '#EFC132') as unknown as any}
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
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 md:p-8">
                {/* Legend */}
                <div className="mb-6">
                  <h3 className="font-['Alfa_Slab_One:Regular',_sans-serif] text-lg text-white mb-4">
                    Presence Status
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-[#EFC132]"></div>
                      <span className="text-sm font-medium text-gray-700">{t('about.presence.strongPresence')}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-[#EFC132]"></div>
                      <span className="text-sm font-medium text-gray-700">{t('about.presence.expanding')}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-[#EFC132]"></div>
                      <span className="text-sm font-medium text-gray-700">{t('about.presence.partnerships')}</span>
                    </div>
                  </div>
                </div>

                {/* Selected Country Info */}
                {activeCountry && (
                  <div className="border-t pt-6">
                    <h4 className="font-['Alfa_Slab_One:Regular',_sans-serif] text-xl text-[#EFC132] mb-2">
                      {activeCountry.name}
                    </h4>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{t('about.status')}:</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium bg-[#EFC132]/10 text-[#EFC132]` }>
                          {STATUS_LABELS[activeCountry.level]}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Key Statistics */}
                <div className="mt-6 pt-6 border-t">
                  <h4 className="font-['Alfa_Slab_One:Regular',_sans-serif] text-lg text-[#EFC132] mb-4">
                    {t('about.globalReach')}
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-[#EFC132]">11</div>
                      <div className="text-xs text-gray-600">{t('about.countries')}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-[#EFC132]">4</div>
                      <div className="text-xs text-gray-600">{t('about.continents')}</div>
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
              <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="font-['Alfa_Slab_One:Regular',_sans-serif] text-lg text-[#EFC132]">
                    {t('about.presence.strongPresenceTitle')}
                  </h3>
                </div>
                <p className="text-sm text-gray-600">
                  {t('about.presence.strongPresence')}
                </p>
              </div>

              <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="font-['Alfa_Slab_One:Regular',_sans-serif] text-lg text-[#EFC132]">
                    {t('about.presence.expandingTitle')}
                  </h3>
                </div>
                <p className="text-sm text-gray-600">
                  {t('about.presence.expanding')}
                </p>
              </div>

              <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="font-['Alfa_Slab_One:Regular',_sans-serif] text-lg text-[#EFC132]">
                    {t('about.presence.partnershipsTitle')}
                  </h3>
                </div>
                <p className="text-sm text-gray-600">
                  {t('about.presence.partnerships')}
                </p>
              </div>
            </div>
          </div>
        </FadeInOnScroll>
      </div>
    </section>

    {/* Elegant Wave Separator */}
    <div className="relative w-full h-24 md:h-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#EFC132] to-white">
        {/* Animated Wave */}
        <svg 
          className="absolute bottom-0 w-full h-16 md:h-20 text-white" 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none"
        >
          <path 
            d="M0,60 C300,120 600,0 900,60 C1050,90 1200,30 1200,60 L1200,120 L0,120 Z" 
            fill="currentColor"
            className="animate-pulse"
          />
        </svg>
        
        {/* Secondary Wave */}
        <svg 
          className="absolute bottom-0 w-full h-12 md:h-16 text-white/80" 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none"
          style={{animationDelay: '0.5s'}}
        >
          <path 
            d="M0,80 C400,40 800,100 1200,80 L1200,120 L0,120 Z" 
            fill="currentColor"
            className="animate-pulse"
          />
        </svg>
        
        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-4 left-1/4 w-2 h-2 bg-yellow-300/60 rounded-full animate-bounce" style={{animationDelay: '0s'}}></div>
          <div className="absolute top-8 right-1/3 w-1 h-1 bg-yellow-400/80 rounded-full animate-bounce" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-6 left-2/3 w-1.5 h-1.5 bg-yellow-300/70 rounded-full animate-bounce" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-10 right-1/4 w-1 h-1 bg-yellow-400/60 rounded-full animate-bounce" style={{animationDelay: '0.5s'}}></div>
        </div>
      </div>
    </div>
    </>
  );
}
