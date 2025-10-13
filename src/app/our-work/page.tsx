"use client";

import Image from 'next/image';
import { Navigation } from '@/components/Navigation';
import { WorkSection } from '@/components/sections/WorkSection';

export default function OurWorkRoute() {
  return (
    <div className="size-full overflow-y-auto overflow-x-hidden">
      <Navigation currentSection="work" onNavigate={() => {}} />
      {/* Hero */}
      <section className="relative w-full h-[38vh] md:h-[48vh] overflow-hidden">
        <Image src="/images/665db4c10244e78f94bf59a54bb37d716103ac23.png" alt="Our Work" fill className="object-cover" />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 h-full flex items-center justify-center text-center px-4">
          <h1 className="font-['Alfa_Slab_One:Regular',_sans-serif] text-white text-[40px] md:text-[64px]">Our Work</h1>
        </div>
      </section>

      {/* Intro */}
      <section className="bg-white py-12 md:py-16">
        <div className="max-w-[1100px] mx-auto px-4 md:px-8 text-center">
          <p className="font-['Alice:Regular',_sans-serif] text-gray-700 text-[16px] md:text-[18px]">
            Our work spans continents and industries, reflecting our capacity to manage complex projects and deliver results. From large-scale maritime logistics to pioneering renewable energy installations, our portfolio is a testament to our commitment to efficiency, reliability, and world-class standards.
          </p>
        </div>
      </section>

      {/* Case Study 1 */}
      <section className="bg-gray-50 py-12 md:py-20">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8 grid lg:grid-cols-2 gap-10 items-start">
          <div>
            <h2 className="font-['Alfa_Slab_One:Regular',_sans-serif] text-[#716106] text-[24px] md:text-[32px] mb-3">Case Study: Maritime Logistics & Fleet Capabilities</h2>
            <p className="font-['Alice:Regular',_sans-serif] text-gray-700 text-[16px] md:text-[18px] mb-4">Our integrated logistics network is supported by a diverse and capable fleet designed for the global energy market.</p>
            <ul className="list-disc pl-6 font-['Alice:Regular',_sans-serif] text-gray-700 text-[16px] md:text-[18px] space-y-1">
              <li><span className="font-semibold">Vessel Classes:</span> Refined Products: 10,000-25,000 DWT and 25,000-45,000 DWT; Refined Products or Crude Oil: 45,000-80,000 DWT, 80,000-120,000 DWT, 80,000-160,000 DWT; Crude Oil: 160,000-320,000 DWT and 320,000-550,000 DWT.</li>
              <li><span className="font-semibold">Barge Operations:</span> Petroleum Barges hauling 10,000–200,000 barrels; General Cargo Barges for containers, modular units, drilling rigs up to 20,000 barrels.</li>
            </ul>
          </div>
          <div className="bg-white border border-gray-200 rounded-[16px] p-6 md:p-8 text-center">
            <div className="w-full h-[220px] md:h-[320px] bg-gray-100 rounded-md flex items-center justify-center text-gray-500">Vessel Infographic Placeholder</div>
          </div>
        </div>
      </section>

      {/* Case Study 2 */}
      <section className="bg-white py-12 md:py-20">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8">
          <h2 className="font-['Alfa_Slab_One:Regular',_sans-serif] text-[#716106] text-[24px] md:text-[32px] mb-3">Project Focus: Water Cleaning and Purification Systems</h2>
          <p className="font-['Alice:Regular',_sans-serif] text-gray-700 text-[16px] md:text-[18px] mb-6">We implement comprehensive water treatment solutions. Our projects encompass the entire water purification cycle, ensuring the delivery of safe, clean water.</p>
          <div className="bg-gray-50 border border-gray-200 rounded-[16px] p-6 md:p-8 text-center">
            <div className="w-full h-[240px] md:h-[360px] bg-gray-200 rounded-md flex items-center justify-center text-gray-600">Water System Diagram Placeholder (with future hotspots)</div>
          </div>
          <ul className="mt-6 list-disc pl-6 font-['Alice:Regular',_sans-serif] text-gray-700 text-[16px] md:text-[18px] space-y-1">
            <li>Treatment Facilities</li>
            <li>Industrial and Home Water Filtration</li>
            <li>Water Purification and Delivery Systems</li>
            <li>Technical Water Testing for Hardness and Composition</li>
          </ul>
        </div>
      </section>

      {/* Case Study 3 */}
      <section className="bg-gray-50 py-12 md:py-20">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8">
          <h2 className="font-['Alfa_Slab_One:Regular',_sans-serif] text-[#716106] text-[24px] md:text-[32px] mb-6">Portfolio: Renewable Energy Projects</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1,2,3].map(i => (
              <div key={i} className="bg-white border border-gray-200 rounded-[16px] p-4 h-[180px] md:h-[220px] flex items-center justify-center text-gray-500">Project Photo Placeholder</div>
            ))}
          </div>
        </div>
      </section>

      {/* Keep existing portfolio grid below if desired */}
      <div id="work">
        <WorkSection />
      </div>
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

