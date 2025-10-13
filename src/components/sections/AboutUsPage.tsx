'use client';

import Image from 'next/image';
import { GlobalPresenceGlobe } from './GlobalPresenceGlobe';

export function AboutUsPage() {

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32">
        <Image
          src="/about%20us%20.jpg"
          alt="About Us Banner"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 text-center">
          <h1 className="font-['Alfa_Slab_One:Regular',_sans-serif] text-4xl md:text-6xl lg:text-7xl text-white mb-6">About Ebdaa Falcon</h1>
          <p className="font-['Alice:Regular',_sans-serif] text-xl md:text-2xl text-white/90 max-w-4xl mx-auto">Delivering excellence in energy, logistics and sustainable growth across the Middle East and beyond.</p>
        </div>
      </section>

      {/* Purpose Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-['Alfa_Slab_One:Regular',_sans-serif] text-3xl md:text-5xl text-[#716106] mb-8 text-center">Our Purpose</h2>
            
            {/* Quote */}
            <div className="bg-[#f8f9fa] border-l-4 border-[#716106] p-6 md:p-8 mb-8 rounded-r-lg">
              <blockquote className="font-['Alice:Regular',_sans-serif] text-lg md:text-xl text-gray-800 italic mb-4">We believe in building enduring value through operational excellence and trusted partnerships.</blockquote>
              <cite className="font-['Alice:Regular',_sans-serif] text-base md:text-lg text-[#716106] font-semibold">Ebdaa Falcon</cite>
            </div>
            
            <p className="font-['Alice:Regular',_sans-serif] text-lg md:text-xl text-gray-700 leading-relaxed">We serve as a reliable partner in petroleum derivatives, logistics, water technology and alternative energy—connecting world-class capabilities with local insight.</p>
          </div>
        </div>
      </section>

      {/* Who We Are Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-['Alfa_Slab_One:Regular',_sans-serif] text-3xl md:text-5xl text-[#716106] mb-8">Who We Are</h2>
              <p className="font-['Alice:Regular',_sans-serif] text-lg md:text-xl text-gray-700 leading-relaxed mb-6">We are a Saudi company dedicated to operational excellence, safety and innovation across energy and logistics value chains.</p>
              <p className="font-['Alice:Regular',_sans-serif] text-lg md:text-xl text-gray-700 leading-relaxed">Our mission is to deliver reliable, sustainable solutions that empower our clients and communities.</p>
            </div>
            <div className="relative">
              <div className="bg-[#716106] rounded-lg p-8 text-white">
                <div className="text-center">
                  <Image 
                    src="/images/95eb61c3ac3249a169d62775cfc3315b24c65966.png"
                    alt="Ebdaa Falcon Logo"
                    width={120}
                    height={120}
                    className="mx-auto mb-6"
                  />
                  <h3 className="font-['Alfa_Slab_One:Regular',_sans-serif] text-2xl mb-4">
                    Excellence in Energy & Logistics
                  </h3>
                  <p className="font-['Alice:Regular',_sans-serif] text-lg">
                    Driving sustainable growth across the Middle East and beyond
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="font-['Alfa_Slab_One:Regular',_sans-serif] text-3xl md:text-5xl text-[#716106] mb-6">What We Do</h2>
            <p className="font-['Alice:Regular',_sans-serif] text-lg md:text-xl text-gray-700 max-w-4xl mx-auto">Integrated solutions across petroleum derivatives, logistics, water technology and alternative energy.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Petroleum Products */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 md:p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-[#716106] rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <h3 className="font-['Alfa_Slab_One:Regular',_sans-serif] text-xl md:text-2xl text-[#716106]">Petroleum Products</h3>
              </div>
                <p className="font-['Alice:Regular',_sans-serif] text-gray-700 leading-relaxed">Storage, trading and distribution with rigorous quality and safety standards.</p>
            </div>

            {/* Alternative Energy */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 md:p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-[#716106] rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="font-['Alfa_Slab_One:Regular',_sans-serif] text-xl md:text-2xl text-[#716106]">Alternative Energy</h3>
              </div>
                <p className="font-['Alice:Regular',_sans-serif] text-gray-700 leading-relaxed">Clean energy solutions supporting national sustainability goals.</p>
            </div>

            {/* Water Desalination */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 md:p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-[#716106] rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <h3 className="font-['Alfa_Slab_One:Regular',_sans-serif] text-xl md:text-2xl text-[#716106]">Water Desalination</h3>
              </div>
                <p className="font-['Alice:Regular',_sans-serif] text-gray-700 leading-relaxed">Advanced technologies for reliable fresh water supply.</p>
            </div>

            {/* Falcon Motor Oils */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 md:p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-[#716106] rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="font-['Alfa_Slab_One:Regular',_sans-serif] text-xl md:text-2xl text-[#716106]">Falcon Motor Oils</h3>
              </div>
                <p className="font-['Alice:Regular',_sans-serif] text-gray-700 leading-relaxed">High-performance lubricants engineered for demanding conditions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Global Presence Section - 3D Globe */}
      <GlobalPresenceGlobe />

      {/* Leadership Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="font-['Alfa_Slab_One:Regular',_sans-serif] text-3xl md:text-5xl text-[#716106] mb-6">Leadership</h2>
            <p className="font-['Alice:Regular',_sans-serif] text-lg md:text-xl text-gray-700 max-w-4xl mx-auto">Our leadership team brings decades of experience across energy, logistics and finance.</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-[#716106] to-[#514500] rounded-lg p-8 md:p-12 text-white text-center">
              <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-8">
                <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="font-['Alfa_Slab_One:Regular',_sans-serif] text-2xl md:text-3xl mb-4">Chief Executive Officer</h3>
              <p className="font-['Alice:Regular',_sans-serif] text-lg md:text-xl text-white/90">Leading with vision, integrity and operational excellence.</p>
            </div>
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
          <p className="font-['ADLaM_Display:Regular',_sans-serif] text-[14px] md:text-[16px] mb-4">
            © 2025 Ebdaa Falcon. All rights reserved.
          </p>
          <p className="font-['ADLaM_Display:Regular',_sans-serif] text-[12px] md:text-[14px] text-white/70">
            Excellence in Energy, Logistics & Sustainability
          </p>
        </div>
      </footer>
    </div>
  );
}
