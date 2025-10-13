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
        <div className="max-w-[1280px] mx-auto px-4 md:px-8">
          {/* Detailed Content */}
          <div className="grid md:grid-cols-3 gap-8 items-start mb-12">
            <div className="md:col-span-2 bg-white border border-gray-200 rounded-[16px] p-6 md:p-10">
              <h2 className="font-['Alfa_Slab_One:Regular',_sans-serif] text-[24px] md:text-[32px] text-[#716106] mb-4">Overview</h2>
              <p className="font-['Alice:Regular',_sans-serif] text-gray-800 text-[16px] md:text-[18px] leading-relaxed mb-6">{service.content}</p>
              <h3 className="font-['Alfa_Slab_One:Regular',_sans-serif] text-[20px] md:text-[24px] text-[#716106] mb-4">Detailed Information</h3>
              <p className="font-['Alice:Regular',_sans-serif] text-gray-800 text-[16px] md:text-[18px] leading-relaxed">{service.detailedContent}</p>
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

          {/* Benefits Section */}
          <div className="bg-white border border-gray-200 rounded-[16px] p-6 md:p-10 mb-12">
            <h2 className="font-['Alfa_Slab_One:Regular',_sans-serif] text-[24px] md:text-[32px] text-[#716106] mb-6 text-center">Key Benefits</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {service.benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-[#716106] rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="font-['Alice:Regular',_sans-serif] text-gray-700 text-[14px] md:text-[16px]">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Image Gallery */}
          <div className="bg-white border border-gray-200 rounded-[16px] p-6 md:p-10">
            <h2 className="font-['Alfa_Slab_One:Regular',_sans-serif] text-[24px] md:text-[32px] text-[#716106] mb-6 text-center">Service Gallery</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {service.galleryImages.map((image, index) => (
                <div key={index} className="group relative h-[200px] md:h-[250px] rounded-[12px] overflow-hidden border border-gray-200">
                  <Image 
                    src={image} 
                    alt={`${service.title} - Image ${index + 1}`} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-300" 
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="max-w-[1280px] mx-auto px-4 md:px-8 mt-8">
            <Link href="/services" className="text-[#716106] underline font-['ADLaM_Display:Regular',_sans-serif]">← Back to Services</Link>
          </div>
        </div>
      </section>

    </div>
  );
}


