'use client';

import { HeroSlider } from '@/components/sections/HeroSlider';

interface HeroSectionProps {
  onAnimationComplete?: () => void;
}

export function HeroSection({ onAnimationComplete }: HeroSectionProps) {
  return (
    <HeroSlider onReady={onAnimationComplete} page="home" />
  );
}
