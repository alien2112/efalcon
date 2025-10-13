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
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock background scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

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

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex gap-8 items-center">
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
              {/* Contact link removed; using Connect button instead */}
            </div>

            {/* Desktop Connect Button */}
            <Link href="/contact-us" aria-label="Connect with us" className="hidden md:flex relative h-[44px] w-[150px] rounded-[50px] hover:opacity-90 transition-opacity items-center justify-center" style={{ backgroundImage: "linear-gradient(rgba(18, 40, 55, 0) 175%, rgba(81, 69, 0, 0.5) 140%), linear-gradient(90deg, rgb(8, 8, 8) 0%, rgb(8, 8, 8) 100%)" }}>
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
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setMenuOpen(v => !v)}
              className="md:hidden relative h-10 w-10 grid place-items-center rounded-full hover:bg-white/10 transition"
            >
              <span className={`block h-0.5 w-6 bg-white transition-transform duration-300 ${menuOpen ? 'translate-y-[7px] rotate-45' : ''}`}></span>
              <span className={`block h-0.5 w-6 bg-white my-1 transition-opacity duration-300 ${menuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
              <span className={`block h-0.5 w-6 bg-white transition-transform duration-300 ${menuOpen ? '-translate-y-[7px] -rotate-45' : ''}`}></span>
            </button>
          </div>
        </div>
      </div>
    </div>
    {/* Mobile overlay */}
    {menuOpen && (
      <div
        onClick={() => setMenuOpen(false)}
        className="md:hidden fixed inset-0 z-40 bg-black/40 backdrop-blur-[1px] transition-opacity"
      />
    )}
    {/* Mobile slide-down menu */}
    <div
      className={`md:hidden fixed left-0 right-0 z-50 top-[103px] origin-top transition-transform duration-300 ${menuOpen ? 'translate-y-0' : '-translate-y-4 pointer-events-none'}`}
    >
      <div className="mx-4 rounded-xl border border-white/10 bg-[rgba(8,8,8,0.95)] p-4 shadow-lg">
        <nav className="flex flex-col">
          <Link href="/services" onClick={() => setMenuOpen(false)} className="px-3 py-3 rounded-lg text-white/90 hover:bg-white/10">Services</Link>
          <Link href="/our-work" onClick={() => setMenuOpen(false)} className="px-3 py-3 rounded-lg text-white/90 hover:bg-white/10">Our Work</Link>
          <Link href="/about-us" onClick={() => setMenuOpen(false)} className="px-3 py-3 rounded-lg text-white/90 hover:bg-white/10">About Us</Link>
          <Link href="/blog" onClick={() => setMenuOpen(false)} className="px-3 py-3 rounded-lg text-white/90 hover:bg-white/10">Blog</Link>
          <Link
            href="/contact-us"
            onClick={() => setMenuOpen(false)}
            className="mt-2 relative h-[44px] rounded-[50px] hover:opacity-90 transition-opacity flex items-center justify-center"
            style={{ backgroundImage: "linear-gradient(rgba(18, 40, 55, 0) 175%, rgba(81, 69, 0, 0.5) 140%), linear-gradient(90deg, rgb(8, 8, 8) 0%, rgb(8, 8, 8) 100%)" }}
          >
            <span className="font-['ADLaM_Display:Regular',_sans-serif] text-[14px] text-white tracking-[0.56px]">CONNECT US</span>
            <span aria-hidden className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[50px]" />
          </Link>
        </nav>
      </div>
    </div>
  );
}
