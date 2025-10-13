'use client';

import Link from 'next/link';
import Image from 'next/image';

export function Footer() {
  return (
    <footer className="bg-[#0f0f0f] text-white">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8 py-12 md:py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-3">
            <Image src="/images/95eb61c3ac3249a169d62775cfc3315b24c65966.png" alt="Ebdaa Falcon" width={48} height={48} />
            <span className="font-['Alfa_Slab_One:Regular',_sans-serif] text-[20px]">Ebdaa Falcon</span>
          </div>
          <p className="mt-4 text-white/80 font-['Alice:Regular',_sans-serif] text-[14px] leading-relaxed">
            Excellence in Energy, Logistics & Sustainability across the Middle East and beyond.
          </p>
        </div>

        <div>
          <h4 className="font-['Alfa_Slab_One:Regular',_sans-serif] text-[16px] mb-3">Company</h4>
          <ul className="space-y-2 text-white/80 font-['Alice:Regular',_sans-serif] text-[14px]">
            <li><Link href="/about-us" className="hover:text-white">About Us</Link></li>
            <li><Link href="/services" className="hover:text-white">Services</Link></li>
            <li><Link href="/our-work" className="hover:text-white">Our Work</Link></li>
            <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-['Alfa_Slab_One:Regular',_sans-serif] text-[16px] mb-3">Support</h4>
          <ul className="space-y-2 text-white/80 font-['Alice:Regular',_sans-serif] text=[14px]">
            <li><Link href="/contact-us" className="hover:text-white">Contact</Link></li>
            <li><a href="#" className="hover:text-white">FAQs</a></li>
            <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-white">Terms</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-['Alfa_Slab_One:Regular',_sans-serif] text-[16px] mb-3">Get in touch</h4>
          <ul className="space-y-2 text-white/80 font-['Alice:Regular',_sans-serif] text-[14px]">
            <li><a href="mailto:info@ebdaafalcon.com" className="hover:text-white">info@ebdaafalcon.com</a></li>
            <li><a href="tel:+966565145666" className="hover:text-white">+966 56 514 5666</a></li>
            <li>King Fahed Road, Riyadh</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-[1280px] mx-auto px-4 md:px-8 py-6 text-center">
          <p className="font-['ADLaM_Display:Regular',_sans-serif] text-[12px] md:text-[14px] text-white/70">
            © {new Date().getFullYear()} Ebdaa Falcon. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}


