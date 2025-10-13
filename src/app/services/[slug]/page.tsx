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

      <section className="bg-[#716106] py-16 md:py-24">
        <div className="max-w-[1280px] mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
          <div className="relative w-full h-[240px] md:h-[420px] rounded-[16px] overflow-hidden border border-white/10">
            <Image src={service.imageUrl} alt={service.title} fill className="object-cover" />
            <div className="absolute inset-0 border border-white/20 rounded-[16px] pointer-events-none" />
          </div>
          <div>
            <h1 className="font-['Alfa_Slab_One:Regular',_sans-serif] text-[36px] md:text-[56px] text-white mb-4">
              {service.title}
            </h1>
            <p className="font-['ADLaM_Display:Regular',_sans-serif] text-white/90 text-[16px] md:text-[18px] mb-6">
              {service.summary}
            </p>
            <ul className="list-disc pl-5 space-y-2 text-white/90 font-['ADLaM_Display:Regular',_sans-serif]">
              {service.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-[#716106] pb-20 md:pb-32">
        <div className="max-w-[1280px] mx-auto px-4 md:px-8">
          <div className="bg-[rgba(217,217,217,0.15)] border border-white/10 rounded-[16px] p-6 md:p-10 text-white">
            <h2 className="font-['Alfa_Slab_One:Regular',_sans-serif] text-[24px] md:text-[32px] mb-4">Overview</h2>
            <p className="font-['ADLaM_Display:Regular',_sans-serif] text-[16px] md:text-[18px] leading-relaxed">
              {service.content}
            </p>
          </div>
          <div className="mt-8">
            <Link href="/services" className="text-white underline font-['ADLaM_Display:Regular',_sans-serif]">← Back to Services</Link>
          </div>
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


