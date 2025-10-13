'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo } from 'react';
import { useParams } from 'next/navigation';
import { Navigation } from '@/components/Navigation';
import { services } from '@/lib/services';

export default function ServiceDetailPage() {
  const params = useParams<{ slug: string }>();
  const service = useMemo(() => services.find(s => s.slug === params.slug), [params.slug]);
  const isMotorOil = service?.slug === 'engine-oils';

  if (!service) {
    return (
      <div className="size-full overflow-y-auto overflow-x-hidden">
        <Navigation currentSection="services" onNavigate={() => {}} />
        <div className="max-w-[1280px] mx-auto px-4 md:px-8 py-24 text-white">
          <h1 className="text-2xl mb-4">Service not found</h1>
          <Link href="/services" className="underline">Back to Services</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="size-full overflow-y-auto overflow-x-hidden">
      <Navigation currentSection="services" onNavigate={() => {}} />

      {/* Hero banner using clicked service image */}
      <section className="relative w-full h-[40vh] md:h-[52vh] overflow-hidden">
        <Image src={service.imageUrl} alt={service.title} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 h-full flex items-center justify-center text-center px-4">
          <div>
            <h1 className="font-['Alfa_Slab_One:Regular',_sans-serif] text-white text-[40px] md:text-[64px] mb-3">{service.title}</h1>
            <p className="font-['ADLaM_Display:Regular',_sans-serif] text-white/90 text-[16px] md:text-[18px] max-w-[900px] mx-auto">{service.summary}</p>
          </div>
        </div>
      </section>

      {/* Key features */}
      <section className="bg-white py-12 md:py-16">
        <div className="max-w-[1280px] mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-3 gap-6">
            {service.features.map((f) => (
              <div key={f} className="bg-white border border-gray-200 rounded-[14px] p-5 shadow-sm">
                <h3 className="font-['Alfa_Slab_One:Regular',_sans-serif] text-[#716106] text-[18px] md:text-[20px]">{f}</h3>
                <p className="font-['Alice:Regular',_sans-serif] text-gray-700 mt-2 text-[14px] md:text-[16px]">{service.title} includes: {f} as part of our comprehensive offering.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Overview & details */}
      <section className="bg-gray-50 py-12 md:py-20">
        <div className="max-w-[1280px] mx-auto px-4 md:px-8 grid md:grid-cols-3 gap-8 items-start">
          <div className="md:col-span-2 bg-white border border-gray-200 rounded-[16px] p-6 md:p-10">
            <h2 className="font-['Alfa_Slab_One:Regular',_sans-serif] text-[24px] md:text-[32px] text-[#716106] mb-4">Overview</h2>
            <p className="font-['Alice:Regular',_sans-serif] text-gray-800 text-[16px] md:text-[18px] leading-relaxed">{service.content}</p>
            {isMotorOil && (
              <div className="mt-8 grid sm:grid-cols-2 gap-4">
                <div className="relative h-[220px] md:h-[280px] rounded-[12px] overflow-hidden border border-gray-200">
                  <Image src="/gallery/engine%20oil%201%20detial.jpg" alt="Motor Oil Specifications" fill className="object-cover" />
                </div>
                <div className="relative h-[220px] md:h-[280px] rounded-[12px] overflow-hidden border border-gray-200">
                  <Image src="/gallery/engine%20oil%20details.jpg" alt="Motor Oil Details" fill className="object-cover" />
                </div>
              </div>
            )}
          </div>
          <aside className="bg-white border border-gray-200 rounded-[16px] p-6 md:p-8">
            <h3 className="font-['Alfa_Slab_One:Regular',_sans-serif] text-[18px] md:text-[22px] text-[#716106] mb-3">Why Ebdaa Falcon</h3>
            <ul className="list-disc pl-5 space-y-2 font-['Alice:Regular',_sans-serif] text-gray-700">
              <li>Experienced operations team</li>
              <li>Safety and compliance first</li>
              <li>Proven partner network</li>
              <li>Saudi Vision 2030 aligned</li>
            </ul>
          </aside>
        </div>
        <div className="max-w-[1280px] mx-auto px-4 md:px-8 mt-8">
          <Link href="/services" className="text-[#716106] underline font-['ADLaM_Display:Regular',_sans-serif]">← Back to Services</Link>
        </div>
      </section>

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


