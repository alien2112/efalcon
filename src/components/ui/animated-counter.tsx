'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface AnimatedCounterProps {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
  delay?: number;
}

export function AnimatedCounter({
  end,
  duration = 2,
  suffix = '',
  prefix = '',
  className = '',
  delay = 0
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView && !isVisible) {
      setIsVisible(true);
      
      const startTime = Date.now();
      const startValue = 0;
      
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / (duration * 1000), 1);
        
        // Easing function for smooth animation
        const easeOutCubic = 1 - Math.pow(1 - progress, 3);
        const currentValue = Math.floor(startValue + (end - startValue) * easeOutCubic);
        
        setCount(currentValue);
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setCount(end);
        }
      };
      
      // Add delay if specified
      if (delay > 0) {
        setTimeout(animate, delay * 1000);
      } else {
        animate();
      }
    }
  }, [isInView, isVisible, end, duration, delay]);

  return (
    <motion.span
      ref={ref}
      className={className}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
    >
      {prefix}{count}{suffix}
    </motion.span>
  );
}

interface AchievementCardProps {
  icon: React.ReactNode;
  value: string;
  label: string;
  description: string;
  endNumber?: number;
  suffix?: string;
  prefix?: string;
  delay?: number;
  className?: string;
}

export function AchievementCard({
  icon,
  value,
  label,
  description,
  endNumber,
  suffix = '',
  prefix = '',
  delay = 0,
  className = ''
}: AchievementCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={`bg-white rounded-xl shadow-lg border border-gray-200 p-6 text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-2 group ${className}`}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: delay * 0.2 }}
      whileHover={{ scale: 1.05 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Icon with animation */}
      <motion.div
        className={`mx-auto mb-4 w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 ${
          isHovered ? 'bg-[#716106] text-white scale-110' : 'bg-gray-100 text-[#716106]'
        }`}
        animate={{
          rotate: isHovered ? 360 : 0,
          scale: isHovered ? 1.1 : 1
        }}
        transition={{ duration: 0.6 }}
      >
        {icon}
      </motion.div>

      {/* Animated number */}
      <motion.h3
        className={`font-['Alfa_Slab_One:Regular',_sans-serif] text-[24px] mb-2 transition-colors duration-300 ${
          isHovered ? 'text-[#8B7A0A]' : 'text-[#716106]'
        }`}
        animate={{
          scale: isHovered ? 1.1 : 1,
          color: isHovered ? '#8B7A0A' : '#716106'
        }}
        transition={{ duration: 0.3 }}
      >
        {endNumber ? (
          <AnimatedCounter
            end={endNumber}
            suffix={suffix}
            prefix={prefix}
            duration={2.5}
            delay={delay * 0.1}
            className="text-[32px] md:text-[36px]"
          />
        ) : (
          value
        )}
      </motion.h3>

      {/* Label */}
      <motion.p
        className="font-['ADLaM_Display:Regular',_sans-serif] text-[14px] text-gray-600"
        animate={{
          color: isHovered ? '#374151' : '#6B7280'
        }}
        transition={{ duration: 0.3 }}
      >
        {label}
      </motion.p>

      {/* Description */}
      <motion.p
        className="font-['ADLaM_Display:Regular',_sans-serif] text-[12px] text-gray-500 mt-2"
        animate={{
          opacity: isHovered ? 1 : 0.7
        }}
        transition={{ duration: 0.3 }}
      >
        {description}
      </motion.p>

      {/* Hover glow effect */}
      <motion.div
        className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#716106]/5 to-[#8B7A0A]/5 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
}
