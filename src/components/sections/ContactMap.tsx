'use client';

import { useState, useEffect, useRef } from 'react';

export function ContactMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section ref={mapRef} className="py-16 md:py-24 bg-gradient-to-b from-white to-[#f8f9fa]">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-['Alfa_Slab_One:Regular',_sans-serif] text-[32px] md:text-[48px] text-[#716106] mb-4">
            Our Location
          </h2>
          <p className="font-['ADLaM_Display:Regular',_sans-serif] text-[16px] md:text-[20px] text-gray-600 max-w-[768px] mx-auto">
            Find us easily on the map below.
          </p>
        </div>

        {/* Map Container */}
        <div className="relative">
          <div 
            className={`w-full h-[400px] md:h-[500px] bg-gray-200 rounded-lg overflow-hidden transition-all duration-1000 ${
              isLoaded ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'
            }`}
          >
            {/* Placeholder Map - In a real implementation, you would integrate with Google Maps or similar */}
            <div className="w-full h-full bg-gradient-to-br from-[#716106] to-[#5a4f05] flex items-center justify-center relative">
              {/* Map Pattern Overlay */}
              <div className="absolute inset-0 opacity-20">
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <defs>
                    <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                      <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5"/>
                    </pattern>
                  </defs>
                  <rect width="100" height="100" fill="url(#grid)" />
                </svg>
              </div>

              {/* Map Content */}
              <div className="text-center text-white z-10">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="font-['Alfa_Slab_One:Regular',_sans-serif] text-[24px] mb-2">
                  Riyadh Office
                </h3>
                <p className="font-['ADLaM_Display:Regular',_sans-serif] text-[16px] opacity-90">
                  Riyadh, Kingdom of Saudi Arabia
                </p>
              </div>

              {/* Interactive Elements */}
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                <button className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </button>
                <button className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4m16 0l-4-4m4 4l-4 4" />
                  </svg>
                </button>
              </div>

              <div className="absolute bottom-4 left-4 flex gap-2">
                <button className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg text-white text-sm hover:bg-white/30 transition-colors">Satellite</button>
                <button className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg text-white text-sm hover:bg-white/30 transition-colors">Street</button>
              </div>
            </div>
          </div>

          {/* Map Info Overlay */}
          <div className="absolute bottom-6 left-6 right-6 md:left-auto md:right-6 md:w-80">
            <div className="bg-white rounded-lg shadow-lg p-6 backdrop-blur-sm">
              <h4 className="font-['Alfa_Slab_One:Regular',_sans-serif] text-[18px] text-[#716106] mb-3">
                Contact Details
              </h4>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <svg className="w-4 h-4 text-[#716106]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="font-['ADLaM_Display:Regular',_sans-serif] text-[14px] text-gray-600">
                    Riyadh, Kingdom of Saudi Arabia
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="w-4 h-4 text-[#716106]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-['ADLaM_Display:Regular',_sans-serif] text-[14px] text-gray-600">
                    Sunday - Thursday: 8:00 AM - 5:00 PM
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="w-4 h-4 text-[#716106]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="font-['ADLaM_Display:Regular',_sans-serif] text-[14px] text-gray-600">
                    +966 11 123 4567
                  </span>
                </div>
              </div>
              <button className="mt-4 w-full bg-[#716106] text-white py-2 rounded-lg font-medium hover:bg-[#5a4f05] transition-colors">
                Get Directions
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
