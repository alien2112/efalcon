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
          <h2 className="font-['Alfa_Slab_One:Regular',_sans-serif] text-[32px] md:text-[48px] text-[#716106] mb-6">
            Comprehensive Energy Solutions
          </h2>
          <p className="font-['Alice:Regular',_sans-serif] text-gray-700 text-[16px] md:text-[18px] leading-relaxed">
            Ebdaa Falcon provides a comprehensive suite of integrated services across the energy, logistics, and infrastructure sectors. We leverage global partnerships and deep industry expertise to deliver excellence and superior value to our clients, in line with the ambitious goals of Saudi Vision 2030.
          </p>
        </div>
      </section>

      {/* Services Grid - engaging cards */}
      <section className="bg-gray-50 py-12 md:py-20">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 className="font-['Alfa_Slab_One:Regular',_sans-serif] text-[28px] md:text-[40px] text-[#716106] mb-4">
              Our Service Portfolio
            </h2>
            <p className="font-['Alice:Regular',_sans-serif] text-gray-600 text-[16px] md:text-[18px] max-w-[800px] mx-auto">
              Discover our range of specialized services designed to meet your energy and logistics needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {services.map((s, index) => (
              <div key={s.slug} className="group bg-white rounded-[20px] border border-gray-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="relative h-[200px] md:h-[240px] overflow-hidden">
                  <Image src={s.imageUrl} alt={s.title} fill className="object-cover group-hover:scale-[1.08] transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">{index + 1}</span>
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="font-['Alfa_Slab_One:Regular',_sans-serif] text-white text-[20px] md:text-[22px] mb-1">{s.title}</h3>
                    <div className="w-12 h-1 bg-[#FFD700] rounded-full"></div>
                  </div>
                </div>
                <div className="p-6 md:p-8">
                  <p className="font-['Alice:Regular',_sans-serif] text-gray-700 text-[14px] md:text-[16px] leading-relaxed mb-4">{s.summary}</p>
                  <div className="mb-6">
                    <h4 className="font-['Alfa_Slab_One:Regular',_sans-serif] text-[#716106] text-[14px] mb-3">Key Features:</h4>
                    <div className="flex flex-wrap gap-2">
                      {s.features.slice(0, 3).map((f) => (
                        <span key={f} className="text-[11px] md:text-[12px] px-3 py-1 rounded-full bg-[#716106]/10 text-[#716106] font-['ADLaM_Display:Regular',_sans-serif] border border-[#716106]/20">{f}</span>
                      ))}
                    </div>
                  </div>
                  <Link 
                    href={`/services/${s.slug}`} 
                    className="inline-flex items-center gap-2 text-[#716106] hover:text-[#514500] font-['ADLaM_Display:Regular',_sans-serif] text-[14px] group-hover:gap-3 transition-all duration-200"
                  >
                    Explore Service
                    <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-[#716106] to-[#514500] py-16 md:py-20">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8 text-center">
          <h2 className="font-['Alfa_Slab_One:Regular',_sans-serif] text-white text-[32px] md:text-[48px] mb-6">
            Ready to Get Started?
          </h2>
          <p className="font-['Alice:Regular',_sans-serif] text-white/90 text-[16px] md:text-[18px] mb-8 max-w-[600px] mx-auto">
            Contact our team to discuss your specific requirements and discover how we can support your energy and logistics needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contact-us" 
              className="bg-white text-[#716106] px-8 py-4 rounded-full font-medium hover:bg-gray-100 transition-colors duration-300 hover:scale-105 transform font-['ADLaM_Display:Regular',_sans-serif]"
            >
              Contact Us Today
            </Link>
            <Link 
              href="/our-work" 
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-medium hover:bg-white hover:text-[#716106] transition-colors duration-300 hover:scale-105 transform font-['ADLaM_Display:Regular',_sans-serif]"
            >
              View Our Work
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}


