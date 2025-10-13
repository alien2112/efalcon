'use client';

import { WaveAnimation } from '@/components/WaveAnimation';

interface HeroSectionProps {
  onAnimationComplete?: () => void;
}

export function HeroSection({ onAnimationComplete }: HeroSectionProps) {
  return <WaveAnimation onAnimationComplete={onAnimationComplete} />;
}
