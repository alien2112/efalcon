'use client';

import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
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
  const [scrollY, setScrollY] = useState(0);
  const pathname = usePathname();
  const router = useRouter();

  // Check if we're on the home page
  const isHomePage = pathname === '/';

  useEffect(() => {
    const onScroll = () => {
      const scrollPosition = window.scrollY;
      setScrollY(scrollPosition);
      setScrolled(scrollPosition > 10);
    };
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

  // Determine navbar background with enhanced scroll effects
  const getNavbarBackground = () => {
    const scrollOpacity = Math.min(scrollY / 100, 1);
    const blurAmount = Math.min(scrollY / 50, 20);
    
    if (isHomePage) {
      return scrolled 
        ? `bg-[rgba(255,255,255,${0.85 + scrollOpacity * 0.1})] border-[rgba(0,0,0,${0.05 + scrollOpacity * 0.05})] backdrop-blur-[${blurAmount}px]` 
        : `bg-[rgba(255,255,255,0.8)] border-[rgba(0,0,0,0.05)] backdrop-blur-md`;
    } else {
      return scrolled 
        ? `bg-[rgba(255,255,255,${0.85 + scrollOpacity * 0.1})] border-[rgba(0,0,0,${0.05 + scrollOpacity * 0.05})] backdrop-blur-[${blurAmount}px]` 
        : `bg-[rgba(255,255,255,0.8)] border-[rgba(0,0,0,0.05)] backdrop-blur-md`;
    }
  };

  return (
    <>
    <motion.div 
      className={`fixed left-0 right-0 top-0 z-50 h-[103px] backdrop-blur-md border-b transition-all duration-500 ${getNavbarBackground()}`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      style={{
        boxShadow: scrolled ? `0 8px 32px rgba(0, 0, 0, ${Math.min(scrollY / 200, 0.1)})` : 'none'
      }}
    >
      {/* Subtle gradient overlay for premium feel */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#EFC132]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <div className="relative h-full flex items-center justify-center">
        <div className="max-w-[1280px] w-full">
          <div className="flex items-center justify-between px-8">
            {/* Enhanced Logo with Premium Animations */}
            <motion.button 
              onClick={() => handleNavigation(`/`)} 
              className="h-[76px] w-[191px] relative group overflow-hidden rounded-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                className="relative h-full w-full"
              >
                <Image 
                  src="/images/95eb61c3ac3249a169d62775cfc3315b24c65966.png" 
                  alt="Ebdaa Falcon Logo"
                  fill
                  className="object-contain transition-all duration-300 group-hover:brightness-110"
                  priority
                  quality={90}
                />
                
                {/* Subtle glow effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#EFC132]/20 to-[#FFD700]/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
                
                {/* Decorative corner accents */}
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#EFC132]/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-[#FFD700]/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </motion.div>
            </motion.button>

            {/* Enhanced Desktop Navigation Links */}
            <div className="hidden md:flex gap-8 items-center">
              {navItems.map((item, index) => (
                <motion.div 
                  key={item.id} 
                  className="relative"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 + index * 0.1 }}
                >
                  <motion.button
                    onClick={() => handleNavigation(item.href)}
                    onMouseEnter={() => setHoveredItem(item.id)}
                    onMouseLeave={() => setHoveredItem(null)}
                    className={`font-['ADLaM_Display:Regular',_sans-serif] text-[16px] transition-all duration-300 relative py-2 px-4 rounded-lg ${
                      currentSection === item.id 
                        ? 'text-black' 
                        : 'text-gray-700 hover:text-black'
                    }`}
                    whileHover={{ y: -2 }}
                    whileTap={{ y: 0 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                  >
                    {item.label}
                    
                    {/* Enhanced Active Indicator */}
                    <AnimatePresence>
                      {currentSection === item.id && (
                        <motion.div 
                          className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-[#EFC132] to-[#FFD700] rounded-full"
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          exit={{ scaleX: 0 }}
                          transition={{ duration: 0.3, ease: "easeOut" }}
                        />
                      )}
                    </AnimatePresence>
                    
                    {/* Enhanced Hover Indicator */}
                    <AnimatePresence>
                      {hoveredItem === item.id && currentSection !== item.id && (
                        <motion.div 
                          className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-[#EFC132]/60 to-[#EFC132]/40 rounded-full"
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          exit={{ scaleX: 0 }}
                          transition={{ duration: 0.2, ease: "easeOut" }}
                        />
                      )}
                    </AnimatePresence>
                  </motion.button>
                  
                  {/* Enhanced Hover Background Effect */}
                  <AnimatePresence>
                    {hoveredItem === item.id && (
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-r from-[#EFC132]/10 to-[#FFD700]/10 rounded-lg -z-10"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                      />
                    )}
                  </AnimatePresence>
                  
                  {/* Subtle glow effect */}
                  <AnimatePresence>
                    {hoveredItem === item.id && (
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-r from-[#EFC132]/5 to-[#FFD700]/5 rounded-lg -z-20 blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>

            {/* Desktop Language Switcher */}
            <div className="hidden md:flex items-center ml-4">
              <LanguageSwitcher />
            </div>

                    {/* Enhanced Desktop Connect Button */}
                    <motion.button
                      onClick={() => handleNavigation(`/contact-us`)}
                      onMouseEnter={() => setHoveredItem('contact')}
                      onMouseLeave={() => setHoveredItem(null)}
                      aria-label="Connect with us" 
                      className="hidden md:flex relative h-[44px] w-[150px] rounded-[50px] group overflow-hidden" 
                      style={{ backgroundImage: "linear-gradient(rgba(18, 40, 55, 0) 175%, rgba(81, 69, 0, 0.5) 140%), linear-gradient(90deg, rgb(113, 97, 6) 0%, rgb(113, 97, 6) 100%)" }}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
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
                
                {/* Enhanced Button Text */}
                <div className="relative flex items-center justify-center h-full w-full">
                  <motion.p 
                    className="font-['ADLaM_Display:Regular',_sans-serif] text-[14px] text-white tracking-[0.56px] text-center transition-all duration-300 group-hover:text-[#FFD700]"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    {t('navigation.connectUs')}
                  </motion.p>
                </div>
                
                {/* Enhanced Border */}
                <motion.div 
                  aria-hidden="true" 
                  className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[50px] transition-all duration-300 group-hover:border-[#FFD700]"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                />
                
                {/* Enhanced Hover Glow Effect */}
                <AnimatePresence>
                  {hoveredItem === 'contact' && (
                    <motion.div 
                      className="absolute inset-0 rounded-[50px] bg-gradient-to-r from-[#FFD700]/20 to-[#FFA500]/20"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </AnimatePresence>
                
                {/* Subtle shimmer effect */}
                <motion.div 
                  className="absolute inset-0 rounded-[50px] bg-gradient-to-r from-transparent via-white/10 to-transparent"
                  initial={{ x: '-100%' }}
                  animate={{ x: '100%' }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
                
                {/* Decorative corner elements */}
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#FFD700]/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-[#FFA500]/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </motion.button>

            {/* Enhanced Mobile Hamburger Button */}
            <motion.button
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setMenuOpen(v => !v)}
              className="md:hidden relative h-10 w-10 grid place-items-center rounded-full hover:bg-gray-100 transition-all duration-300 group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <motion.span 
                className={`block h-0.5 w-6 bg-gray-700 transition-all duration-300 ${menuOpen ? 'translate-y-[7px] rotate-45' : ''}`}
                animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 7 : 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
              <motion.span 
                className={`block h-0.5 w-6 bg-gray-700 my-1 transition-all duration-300 ${menuOpen ? 'opacity-0' : 'opacity-100'}`}
                animate={{ opacity: menuOpen ? 0 : 1 }}
                transition={{ duration: 0.3 }}
              />
              <motion.span 
                className={`block h-0.5 w-6 bg-gray-700 transition-all duration-300 ${menuOpen ? '-translate-y-[7px] -rotate-45' : ''}`}
                animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -7 : 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
              
              {/* Subtle glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#EFC132]/10 to-[#FFD700]/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
    
    {/* Enhanced Mobile overlay */}
    <AnimatePresence>
      {menuOpen && (
        <motion.div
          onClick={() => setMenuOpen(false)}
          className="md:hidden fixed inset-0 z-40 bg-black/40 backdrop-blur-[1px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </AnimatePresence>
    
    {/* Enhanced Mobile right-side drawer menu */}
    <AnimatePresence>
      <motion.div
        className="md:hidden fixed top-[103px] bottom-0 right-0 z-50 w-4/5 max-w-xs"
        role="dialog"
        aria-modal="true"
        aria-hidden={!menuOpen}
        initial={{ x: '100%' }}
        animate={{ x: menuOpen ? 0 : '100%' }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <div className="h-full rounded-l-xl border border-gray-200 bg-white/95 p-4 shadow-2xl backdrop-blur-md">
          <nav className="flex flex-col space-y-2">
            {navItems.map((item, index) => (
              <motion.button
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
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
              >
                {item.label}
              </motion.button>
            ))}
            <motion.div 
              className="flex items-center justify-between pt-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
            >
              <LanguageSwitcher />
            </motion.div>
            <motion.button
              onClick={() => {
                handleNavigation(`/contact-us`);
                setMenuOpen(false);
              }}
              className="mt-3 relative h-[44px] rounded-[50px] hover:opacity-90 transition-all duration-300 flex items-center justify-center group"
              style={{ backgroundImage: "linear-gradient(rgba(18, 40, 55, 0) 175%, rgba(81, 69, 0, 0.5) 140%), linear-gradient(90deg, rgb(113, 97, 6) 0%, rgb(113, 97, 6) 100%)" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.5 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="font-['ADLaM_Display:Regular',_sans-serif] text-[14px] text-white tracking-[0.56px] text-center group-hover:text-[#FFD700] transition-colors duration-300">{t('navigation.connectUs')}</span>
              <span aria-hidden className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[50px] group-hover:border-[#FFD700] transition-colors duration-300" />
              
              {/* Subtle glow effect */}
              <div className="absolute inset-0 rounded-[50px] bg-gradient-to-r from-[#FFD700]/10 to-[#FFA500]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </motion.button>
          </nav>
        </div>
      </motion.div>
    </AnimatePresence>
    
    {/* Sophisticated Loading Screen */}
    <SophisticatedLoadingScreen 
      isVisible={isNavigating} 
      onComplete={handleLoadingComplete} 
    />
    </>
  );
}
