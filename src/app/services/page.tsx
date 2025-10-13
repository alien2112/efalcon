'use client';

import Image from 'next/image';
import Link from 'next/link';
import { services } from '@/lib/services';
import { Navigation } from '@/components/Navigation';

export default function ServicesIndexPage() {
  return (
    <div className="size-full overflow-y-auto overflow-x-hidden">
      <Navigation currentSection="services" onNavigate={() => {}} />

      {/* Hero with radial center-to-out reveal (no image stretching) */}
      <section className="relative w-full h-[38vh] md:h-[48vh] overflow-hidden">
        <div className="absolute inset-0">
          <div className="relative w-full h-full overflow-hidden">
            {/* Image revealed by expanding clip-path circle from center */}
            <div className="absolute inset-0 reveal-clip">
              <Image src="/ourservicesbanner.png" alt="Our Services" fill className="object-cover" priority />
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 h-full flex items-center justify-center text-center px-4">
          <h1 className="font-['Alfa_Slab_One:Regular',_sans-serif] text-white text-[40px] md:text-[64px]">Our Services</h1>
        </div>
        <style jsx>{`
          .reveal-clip { 
            animation: clipReveal 1600ms ease-out forwards; 
            will-change: clip-path, opacity;
          }
          @keyframes clipReveal {
            0% { clip-path: circle(0% at 50% 50%); opacity: 0.6; }
            60% { opacity: 1; }
            100% { clip-path: circle(150% at 50% 50%); opacity: 1; }
          }
        `}</style>
      </section>

      {/* Intro */}
      <section className="bg-white py-12 md:py-16">
        <div className="max-w-[1100px] mx-auto px-4 md:px-8 text-center">
          <p className="font-['Alice:Regular',_sans-serif] text-gray-700 text-[16px] md:text-[18px]">
            Ebdaa Falcon provides a comprehensive suite of integrated services across the energy, logistics, and infrastructure sectors. We leverage global partnerships and deep industry expertise to deliver excellence and superior value to our clients, in line with the ambitious goals of Saudi Vision 2030.
          </p>
        </div>
      </section>

      {/* Services Grid - engaging cards */}
      <section className="bg-gray-50 py-12 md:py-20">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {services.map((s) => (
              <div key={s.slug} className="group bg-white rounded-[16px] border border-gray-200 overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
                <div className="relative h-[180px] md:h-[220px] overflow-hidden">
                  <Image src={s.imageUrl} alt={s.title} fill className="object-cover group-hover:scale-[1.05] transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <h3 className="font-['Alfa_Slab_One:Regular',_sans-serif] text-white text-[20px] md:text-[22px]">{s.title}</h3>
                  </div>
                </div>
                <div className="p-5 md:p-6">
                  <p className="font-['Alice:Regular',_sans-serif] text-gray-700 text-[14px] md:text-[16px] line-clamp-3">{s.summary}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {s.features.slice(0, 3).map((f) => (
                      <span key={f} className="text-[12px] md:text-[13px] px-2 py-1 rounded-full bg-gray-100 text-gray-700 font-['ADLaM_Display:Regular',_sans-serif]">{f}</span>
                    ))}
                  </div>
                  <div className="mt-5">
                    <Link href={`/services/${s.slug}`} className="inline-block text-[#716106] hover:text-[#514500] underline font-['ADLaM_Display:Regular',_sans-serif]">Learn more →</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#716106] py-8 md:py-12 text-white">
        <div className="max-w-[1280px] mx-auto px-4 md:px-8 text-center">
          <div className="mb-6">
            <Image 
              src="/images/95eb61c3ac3249a169d62775cfc3315b24c65966.png"
              alt="Ebdaa Falcon Logo"
              width={60}
              height={60}
              className="mx-auto"
            />
          </div>
          <p className="font-['ADLaM_Display:Regular',_sans-serif] text-[14px] md:text-[16px] mb-4">© 2025 Ebdaa Falcon. All rights reserved.</p>
          <p className="font-['ADLaM_Display:Regular',_sans-serif] text-[12px] md:text-[14px] text-white/70">Excellence in Energy, Logistics & Sustainability</p>
        </div>
      </footer>
    </div>
  );
}


