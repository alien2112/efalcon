'use client';

import { WaveAnimation } from '@/components/WaveAnimation';

interface ContactHeroProps {
  onAnimationComplete?: () => void;
}

export function ContactHero({ onAnimationComplete }: ContactHeroProps) {
  return (
    <WaveAnimation onAnimationComplete={onAnimationComplete} />
  );
}
