'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface NavigationProps {
  currentSection: string;
  onNavigate: (section: string) => void;
}

export function Navigation({ currentSection, onNavigate }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className={`fixed left-0 right-0 top-0 z-50 h-[103px] backdrop-blur-md border-b transition-colors ${
      scrolled ? 'bg-[rgba(8,8,8,0.65)] border-[rgba(255,255,255,0.2)]' : 'bg-[rgba(113,97,6,0.1)] border-[rgba(255,255,255,0.1)]'
    }`}>
      <div className="relative h-full flex items-center justify-center">
        <div className="max-w-[1280px] w-full">
          <div className="flex items-center justify-between px-8">
            {/* Logo */}
            <Link href="/" className="h-[76px] w-[191px] relative">
              <Image 
                src="/images/95eb61c3ac3249a169d62775cfc3315b24c65966.png" 
                alt="Ebdaa Falcon Logo"
                fill
                className="object-cover"
                priority
              />
            </Link>

            {/* Navigation Links */}
            <div className="flex gap-8 items-center">
              <Link
                href="/services"
                className={`font-['ADLaM_Display:Regular',_sans-serif] text-[16px] transition-colors ${
                  currentSection === 'services' ? 'text-white' : 'text-[#cecfd2] hover:text-white'
                }`}
              >
                SERVICES
              </Link>
              <Link
                href="/our-work"
                className={`font-['ADLaM_Display:Regular',_sans-serif] text-[16px] transition-colors ${
                  currentSection === 'work' ? 'text-white' : 'text-[#cecfd2] hover:text-white'
                }`}
              >
                OUR WORK
              </Link>
              <Link
                href="/about-us"
                className={`font-['ADLaM_Display:Regular',_sans-serif] text-[16px] transition-colors ${
                  currentSection === 'about' ? 'text-white' : 'text-[#cecfd2] hover:text-white'
                }`}
              >
                ABOUT US
              </Link>
              <Link
                href="/blog"
                className={`font-['ADLaM_Display:Regular',_sans-serif] text-[16px] transition-colors ${
                  currentSection === 'blog' ? 'text-white' : 'text-[#cecfd2] hover:text-white'
                }`}
              >
                BLOG
              </Link>
              <Link
                href="/contact-us"
                className={`font-['ADLaM_Display:Regular',_sans-serif] text-[16px] transition-colors ${
                  currentSection === 'contact' ? 'text-white' : 'text-[#cecfd2] hover:text-white'
                }`}
              >
                CONTACT US
              </Link>
            </div>

            {/* Connect Button with Fancy Design */}
            <button className="relative h-[44px] w-[150px] rounded-[50px] hover:opacity-90 transition-opacity" style={{ backgroundImage: "linear-gradient(rgba(18, 40, 55, 0) 175%, rgba(81, 69, 0, 0.5) 140%), linear-gradient(90deg, rgb(8, 8, 8) 0%, rgb(8, 8, 8) 100%)" }}>
                {/* Particle Background */}
                <div className="absolute inset-[-15%_19.76%_-13.01%_-3.89%] pointer-events-none">
                  <div className="absolute inset-[-3.91%_-0.73%_-3.91%_-1.42%]">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 144 56">
                      <g opacity="0.5">
                        <ellipse cx="33.6434" cy="2.62022" fill="white" fillOpacity="0.5" opacity="0.19" rx="0.486833" ry="0.620223" />
                        <ellipse cx="27.8005" cy="6.34215" fill="white" fillOpacity="0.5" opacity="0.33" rx="0.486833" ry="0.620223" />
                        <ellipse cx="45.7176" cy="35.8522" fill="white" fillOpacity="0.5" opacity="0.42" rx="0.486833" ry="0.620223" />
                        <ellipse cx="78.6473" cy="25.3605" fill="white" fillOpacity="0.5" opacity="0.42" rx="0.486833" ry="0.620223" />
                        <ellipse cx="124.49" cy="25.0378" fill="white" fillOpacity="0.5" opacity="0.42" rx="0.486833" ry="0.620223" />
                        <ellipse cx="53.1197" cy="10.0641" fill="white" fillOpacity="0.5" opacity="0.27" rx="0.486833" ry="0.620223" />
                        <ellipse cx="83.5163" cy="9.23219" fill="white" fillOpacity="0.5" opacity="0.27" rx="0.486833" ry="0.620223" />
                        <ellipse cx="33.6434" cy="16.2673" fill="white" fillOpacity="0.5" opacity="0.59" rx="0.486833" ry="0.620223" />
                        <ellipse cx="39.4863" cy="47.2763" fill="white" fillOpacity="0.5" opacity="0.5" rx="0.486833" ry="0.620223" />
                        <ellipse cx="24.879" cy="38.5916" fill="white" fillOpacity="0.5" opacity="0.33" rx="0.486833" ry="0.620223" />
                        <ellipse cx="44.3554" cy="43.5542" fill="white" fillOpacity="0.5" opacity="0.55" rx="0.486833" ry="0.620223" />
                        <ellipse cx="35.591" cy="43.5542" fill="white" fillOpacity="0.5" opacity="0.58" rx="0.486833" ry="0.620223" />
                        <ellipse cx="51.1721" cy="43.5542" fill="white" fillOpacity="0.5" opacity="0.47" rx="0.486833" ry="0.620223" />
                        <ellipse cx="56.0412" cy="47.2761" fill="white" fillOpacity="0.5" opacity="0.15" rx="0.486833" ry="0.620223" />
                      </g>
                    </svg>
                  </div>
                </div>
                
                {/* Button Text */}
                <div className="relative flex items-center justify-center h-full">
                  <p className="font-['ADLaM_Display:Regular',_sans-serif] text-[14px] text-white tracking-[0.56px]">
                    CONNECT US
                  </p>
                </div>
                
                {/* Border */}
                <div aria-hidden="true" className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[50px]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
