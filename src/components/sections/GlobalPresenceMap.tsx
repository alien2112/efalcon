'use client';

import Image from 'next/image';
import { useMemo, useState } from 'react';

type Marker = {
  id: string;
  name: string;
  // position as percentage relative to container (0-100)
  left: number;
  top: number;
};

const MARKERS: Marker[] = [
  { id: 'sa', name: 'Saudi Arabia', left: 55, top: 56 },
  { id: 'ae', name: 'UAE', left: 58.5, top: 58 },
  { id: 'kw', name: 'Kuwait', left: 54.8, top: 52.8 },
  { id: 'bh', name: 'Bahrain', left: 57.2, top: 55.5 },
  { id: 'qa', name: 'Qatar', left: 57.3, top: 57 },
  { id: 'om', name: 'Oman', left: 60.5, top: 62 },
  { id: 'jo', name: 'Jordan', left: 53.2, top: 49.5 },
  { id: 'eg', name: 'Egypt', left: 49.2, top: 55.2 }
];

export function GlobalPresenceMap() {
  const [activeId, setActiveId] = useState<string | null>('sa');
  const active = useMemo(() => MARKERS.find(m => m.id === activeId) ?? MARKERS[0], [activeId]);

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-10 md:mb-14">
          <h2 className="font-['Alfa_Slab_One:Bold',_sans-serif] font-bold text-3xl md:text-5xl text-[#EFC132] mb-4">Global Presence</h2>
          <p className="font-['Alice:Regular',_sans-serif] text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">We collaborate with partners across key markets to deliver impact at scale.</p>
        </div>

        <div className="grid lg:grid-cols-[1.6fr_1fr] gap-10 items-center">
          {/* Map */}
          <div className="relative w-full bg-white rounded-xl border border-gray-200 shadow-md overflow-hidden">
            <div className="relative aspect-[16/9] md:aspect-[21/9]">
              <Image 
                src="/globe.svg" 
                alt="Global map" 
                fill 
                className="object-contain bg-white" 
                quality={90}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 50vw"
              />

              {/* markers */}
              {MARKERS.map(m => (
                <button
                  key={m.id}
                  style={{ left: `${m.left}%`, top: `${m.top}%` }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 md:w-4 md:h-4 rounded-full border transition-all ${
                    activeId === m.id ? 'bg-[#EFC132] border-white shadow-[0_0_0_6px_rgba(113,97,6,0.25)]' : 'bg-white border-[#EFC132] hover:bg-[#EFC132] hover:border-white'
                  }`}
                  onMouseEnter={() => setActiveId(m.id)}
                  onFocus={() => setActiveId(m.id)}
                  aria-label={m.name}
                />
              ))}

              {/* tooltip */}
              {active && (
                <div
                  style={{ left: `${active.left}%`, top: `${active.top - 6}%` }}
                  className="pointer-events-none absolute -translate-x-1/2 -translate-y-full bg-white text-gray-900 px-3 py-1.5 rounded-lg shadow border text-sm font-['ADLaM_Display:Regular',_sans-serif]"
                >
                  {active.name}
                </div>
              )}
            </div>
          </div>

          {/* Country list */}
          <div>
            <ul className="grid grid-cols-2 gap-3">
              {MARKERS.map(m => (
                <li key={m.id}>
                  <button
                    onMouseEnter={() => setActiveId(m.id)}
                    onFocus={() => setActiveId(m.id)}
                    onClick={() => setActiveId(m.id)}
                    className={`w-full text-left px-3 py-2 rounded-md border transition-colors font-['Alice:Regular',_sans-serif] ${
                      activeId === m.id ? 'bg-[#EFC132] text-white border-[#EFC132]' : 'bg-white text-gray-800 border-gray-200 hover:border-[#EFC132]'
                    }`}
                  >
                    {m.name}
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


