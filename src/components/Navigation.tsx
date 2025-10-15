'use client';

import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { SophisticatedLoadingScreen } from './SophisticatedLoadingScreen';
import { LanguageSwitcher } from './LanguageSwitcher';

interface NavigationProps {
  currentSection: string;
  onNavigate: (section: string) => void;
}

export function Navigation({ currentSection, onNavigate }: NavigationProps) {
  const { t, language } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isNavigating, setIsNavigating] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // Check if we're on the home page
  const isHomePage = pathname === '/';

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

  // Auto-hide loading screen after fixed duration
  useEffect(() => {
    if (isNavigating) {
      const timer = setTimeout(() => {
        setIsNavigating(false);
      }, 10000); // Extended to 10 seconds to fully appreciate the sophisticated animation
      return () => clearTimeout(timer);
    }
  }, [isNavigating]);

  const navItems = [
    { id: 'services', label: t('navigation.services'), href: `/services` },
    { id: 'work', label: t('navigation.ourWork'), href: `/our-work` },
    { id: 'about', label: t('navigation.aboutUs'), href: `/about-us` },
    { id: 'blog', label: t('navigation.blog'), href: `/blog` }
  ];

  const handleNavigation = (href: string) => {
    console.log('Navigation clicked:', href, 'Current pathname:', pathname);
    if (href !== pathname) {
      console.log('Starting navigation...');
      setIsNavigating(true);
      router.push(href);
    } else {
      console.log('Already on this page, no navigation needed');
    }
  };

  const handleLoadingComplete = () => {
    setIsNavigating(false);
  };

  // Determine navbar background based on page and scroll state
  const getNavbarBackground = () => {
    if (isHomePage) {
      // Home page: lighter styling
      return scrolled 
        ? 'bg-[rgba(255,255,255,0.95)] border-[rgba(0,0,0,0.1)]' 
        : 'bg-[rgba(255,255,255,0.8)] border-[rgba(0,0,0,0.05)]';
    } else {
      // Other pages: light transparent
      return scrolled 
        ? 'bg-[rgba(255,255,255,0.95)] border-[rgba(0,0,0,0.1)]' 
        : 'bg-[rgba(255,255,255,0.8)] border-[rgba(0,0,0,0.05)]';
    }
  };

  return (
    <>
    <div className={`fixed left-0 right-0 top-0 z-50 h-[103px] backdrop-blur-md border-b transition-all duration-300 ${getNavbarBackground()}`}>
      <div className="relative h-full flex items-center justify-center">
        <div className="max-w-[1280px] w-full">
          <div className="flex items-center justify-between px-8">
            {/* Logo */}
            <button onClick={() => handleNavigation(`/`)} className="h-[76px] w-[191px] relative group overflow-hidden rounded-md">
              <Image 
                src="/images/95eb61c3ac3249a169d62775cfc3315b24c65966.png" 
                alt="Ebdaa Falcon Logo"
                fill
                className="object-contain transition-transform duration-300 group-hover:scale-105"
                priority
                quality={90}
              />
            </button>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex gap-8 items-center">
              {navItems.map((item) => (
                <div key={item.id} className="relative">
                  <button
                    onClick={() => handleNavigation(item.href)}
                    onMouseEnter={() => setHoveredItem(item.id)}
                    onMouseLeave={() => setHoveredItem(null)}
                    className={`font-['ADLaM_Display:Regular',_sans-serif] text-[16px] transition-all duration-300 relative py-2 px-4 ${
                      currentSection === item.id 
                        ? 'text-black' 
                        : 'text-gray-700 hover:text-black'
                    }`}
                  >
                    {item.label}
                    
                    {/* Active Indicator */}
                    {currentSection === item.id && (
                      <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-[#FFD700] to-[#FFA500] rounded-full"></div>
                    )}
                    
                    {/* Hover Indicator */}
                    {hoveredItem === item.id && currentSection !== item.id && (
                      <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-[#EFC132]/60 to-[#EFC132]/40 rounded-full animate-pulse"></div>
                    )}
                  </button>
                  
                  {/* Hover Background Effect */}
                  {hoveredItem === item.id && (
                    <div className="absolute inset-0 bg-[#EFC132]/5 rounded-lg -z-10 animate-pulse"></div>
                  )}
                </div>
              ))}
            </div>

            {/* Desktop Language Switcher */}
            <div className="hidden md:flex items-center ml-4">
              <LanguageSwitcher />
            </div>

                    {/* Desktop Connect Button */}
                    <button
                      onClick={() => handleNavigation(`/contact-us`)}
                      onMouseEnter={() => setHoveredItem('contact')}
                      onMouseLeave={() => setHoveredItem(null)}
                      aria-label="Connect with us" 
                      className="hidden md:flex relative h-[44px] w-[150px] rounded-[50px] hover:opacity-90 transition-all duration-300 hover:scale-105 group" 
                      style={{ backgroundImage: "linear-gradient(rgba(18, 40, 55, 0) 175%, rgba(81, 69, 0, 0.5) 140%), linear-gradient(90deg, rgb(113, 97, 6) 0%, rgb(113, 97, 6) 100%)" }}
                    >
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
                <div className="relative flex items-center justify-center h-full w-full">
                  <p className="font-['ADLaM_Display:Regular',_sans-serif] text-[14px] text-white tracking-[0.56px] transition-all duration-300 group-hover:text-[#FFD700] text-center">
                    {t('navigation.connectUs')}
                  </p>
                </div>
                
                {/* Border */}
                <div aria-hidden="true" className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[50px] transition-all duration-300 group-hover:border-[#FFD700]" />
                
                {/* Hover Glow Effect */}
                {hoveredItem === 'contact' && (
                  <div className="absolute inset-0 rounded-[50px] bg-gradient-to-r from-[#FFD700]/20 to-[#FFA500]/20 animate-pulse"></div>
                )}
            </button>

            {/* Mobile Hamburger Button */}
            <button
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setMenuOpen(v => !v)}
              className="md:hidden relative h-10 w-10 grid place-items-center rounded-full hover:bg-gray-100 transition-all duration-300"
            >
              <span className={`block h-0.5 w-6 bg-gray-700 transition-all duration-300 ${menuOpen ? 'translate-y-[7px] rotate-45' : ''}`}></span>
              <span className={`block h-0.5 w-6 bg-gray-700 my-1 transition-all duration-300 ${menuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
              <span className={`block h-0.5 w-6 bg-gray-700 transition-all duration-300 ${menuOpen ? '-translate-y-[7px] -rotate-45' : ''}`}></span>
            </button>
          </div>
        </div>
      </div>
    </div>
    
    {/* Mobile overlay */}
    {menuOpen && (
      <div
        onClick={() => setMenuOpen(false)}
        className="md:hidden fixed inset-0 z-40 bg-black/40 backdrop-blur-[1px] transition-opacity duration-300"
      />
    )}
    
    {/* Mobile right-side drawer menu */}
    <div
      className={`md:hidden fixed top-[103px] bottom-0 right-0 z-50 w-4/5 max-w-xs transition-all duration-300 ${menuOpen ? 'translate-x-0' : 'translate-x-full pointer-events-none'}`}
      role="dialog"
      aria-modal="true"
      aria-hidden={!menuOpen}
    >
      <div className="h-full rounded-l-xl border border-gray-200 bg-white/95 p-4 shadow-2xl backdrop-blur-md">
        <nav className="flex flex-col space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                handleNavigation(item.href);
                setMenuOpen(false);
              }}
              className={`px-3 py-3 rounded-lg text-left transition-all duration-300 block ${
                currentSection === item.id 
                  ? 'text-black bg-[#EFC132]/10 border-l-4 border-[#EFC132]' 
                  : 'text-gray-700 hover:bg-gray-100 hover:text-black'
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="flex items-center justify-between pt-2">
            <LanguageSwitcher />
          </div>
          <button
            onClick={() => {
              handleNavigation(`/contact-us`);
              setMenuOpen(false);
            }}
            className="mt-3 relative h-[44px] rounded-[50px] hover:opacity-90 transition-all duration-300 flex items-center justify-center"
            style={{ backgroundImage: "linear-gradient(rgba(18, 40, 55, 0) 175%, rgba(81, 69, 0, 0.5) 140%), linear-gradient(90deg, rgb(113, 97, 6) 0%, rgb(113, 97, 6) 100%)" }}
          >
            <span className="font-['ADLaM_Display:Regular',_sans-serif] text-[14px] text-white tracking-[0.56px] text-center">{t('navigation.connectUs')}</span>
            <span aria-hidden className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[50px]" />
          </button>
        </nav>
      </div>
    </div>
    
    {/* Sophisticated Loading Screen */}
    <SophisticatedLoadingScreen 
      isVisible={isNavigating} 
      onComplete={handleLoadingComplete} 
    />
    </>
  );
}
