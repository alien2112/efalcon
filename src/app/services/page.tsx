'use client';

import Image from 'next/image';
import { Navigation } from '@/components/Navigation';

export default function ServicesIndexPage() {
  return (
    <div className="size-full overflow-y-auto overflow-x-hidden">
      <Navigation currentSection="services" onNavigate={() => {}} />

      {/* Hero */}
      <section className="relative w-full h-[38vh] md:h-[48vh] overflow-hidden">
        <Image src="/images/de677a78167b5a290392b1d450bcb146fab1dd5e.png" alt="Our Services" fill className="object-cover" />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 h-full flex items-center justify-center text-center px-4">
          <h1 className="font-['Alfa_Slab_One:Regular',_sans-serif] text-white text-[40px] md:text-[64px]">Our Services</h1>
        </div>
      </section>

      {/* Intro */}
      <section className="bg-white py-12 md:py-16">
        <div className="max-w-[1100px] mx-auto px-4 md:px-8 text-center">
          <p className="font-['Alice:Regular',_sans-serif] text-gray-700 text-[16px] md:text-[18px]">
            Ebdaa Falcon provides a comprehensive suite of integrated services across the energy, logistics, and infrastructure sectors. We leverage global partnerships and deep industry expertise to deliver excellence and superior value to our clients, in line with the ambitious goals of Saudi Vision 2030.
          </p>
        </div>
      </section>

      {/* Services Sections */}
      <section className="bg-gray-50 py-12 md:py-20">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8 grid gap-8">
          {/* 1. Petroleum Products & Integrated Logistics */}
          <div className="bg-white rounded-[16px] border border-gray-200 p-6 md:p-8">
            <h2 className="font-['Alfa_Slab_One:Regular',_sans-serif] text-[#716106] text-[24px] md:text-[32px] mb-3">Petroleum Products & Integrated Logistics</h2>
            <p className="font-['Alice:Regular',_sans-serif] text-gray-700 text-[16px] md:text-[18px] mb-4">
              We are specialists in the complete lifecycle of petroleum products, offering secure and efficient solutions for storage, transportation, and trading. Our world-class logistics services ensure reliability across marine ports and inland operations.
            </p>
            <p className="font-['Alice:Regular',_sans-serif] text-gray-800 font-semibold mb-2">Our services in this sector include:</p>
            <ul className="list-disc pl-6 space-y-2 font-['Alice:Regular',_sans-serif] text-gray-700 text-[16px] md:text-[18px]">
              <li>
                <span className="font-semibold">Storage & Creation:</span> State-of-the-art facilities for the storage of oil, gas, and various petroleum derivatives.
              </li>
              <li>
                <span className="font-semibold">Transportation & Trading:</span> A robust network for the movement and commerce of key energy products, including:
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Crude Oil</li>
                  <li>Diesel</li>
                  <li>Petrol (Gasoline)</li>
                  <li>Kerosene</li>
                  <li>Gas</li>
                </ul>
              </li>
              <li>
                <span className="font-semibold">Marine & Port Logistics:</span> Complete management and logistical support for sea ports dealing with petroleum products.
              </li>
            </ul>
          </div>

          {/* 2. Alternative Energy Solutions */}
          <div className="bg-white rounded-[16px] border border-gray-200 p-6 md:p-8">
            <h2 className="font-['Alfa_Slab_One:Regular',_sans-serif] text-[#716106] text-[24px] md:text-[32px] mb-3">Alternative Energy Solutions</h2>
            <p className="font-['Alice:Regular',_sans-serif] text-gray-700 text-[16px] md:text-[18px] mb-4">
              We are committed to building a sustainable future by developing alternative energy sources that are less harmful to the environment and more cost-effective than fossil fuels. Our focus is on harnessing renewable natural resources.
            </p>
            <ul className="list-disc pl-6 space-y-2 font-['Alice:Regular',_sans-serif] text-gray-700 text-[16px] md:text-[18px]">
              <li>
                <span className="font-semibold">Solar Energy:</span> We utilize advanced technology to exploit energy from the sun for useful industries, employing photovoltaic cells and semi-conductive materials to generate electrical energy.
              </li>
              <li>
                <span className="font-semibold">Wind Energy:</span> We design and implement systems where turbines convert the kinetic energy of the wind into mechanical and electrical power for various industrial and agricultural needs.
              </li>
            </ul>
          </div>

          {/* 3. Water Desalination */}
          <div className="bg-white rounded-[16px] border border-gray-200 p-6 md:p-8">
            <h2 className="font-['Alfa_Slab_One:Regular',_sans-serif] text-[#716106] text-[24px] md:text-[32px] mb-3">Water Desalination</h2>
            <p className="font-['Alice:Regular',_sans-serif] text-gray-700 text-[16px] md:text-[18px]">
              We provide a critical service in water desalination, a process that converts salt water into pure, fresh water suitable for drinking and daily use. Our systems involve a large series of processes to separate salts and minerals, collecting water from the sea and purifying it of all impurities.
            </p>
          </div>

          {/* 4. Electrical Infrastructure */}
          <div className="bg-white rounded-[16px] border border-gray-200 p-6 md:p-8">
            <h2 className="font-['Alfa_Slab_One:Regular',_sans-serif] text-[#716106] text-[24px] md:text-[32px] mb-3">Electrical Infrastructure</h2>
            <p className="font-['Alice:Regular',_sans-serif] text-gray-700 text-[16px] md:text-[18px]">
              We support the expansion of modern energy grids through the provision of electrical towers. These essential structures support high-voltage lines that transmit electricity over long distances, connecting power stations to end consumers. Our towers are designed for both AC and DC systems.
            </p>
          </div>

          {/* 5. Falcon Motor Oils */}
          <div className="bg-white rounded-[16px] border border-gray-200 p-6 md:p-8">
            <h2 className="font-['Alfa_Slab_One:Regular',_sans-serif] text-[#716106] text-[24px] md:text-[32px] mb-3">Falcon Motor Oils</h2>
            <p className="font-['Alice:Regular',_sans-serif] text-gray-700 text-[16px] md:text-[18px]">
              Under our own brand, we produce a specialized line of high-quality Falcon Motor Oils. These fully synthetic oils are engineered to keep engines running like new, with specific formulations for both gasoline and diesel engines.
            </p>
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


