'use client';

import { Navigation } from '@/components/Navigation';
import { AboutUsPage } from '@/components/sections/AboutUsPage';

export default function AboutUsRoute() {
  return (
    <div className="size-full overflow-y-auto overflow-x-hidden">
      <Navigation currentSection="about" onNavigate={() => {}} />
      <AboutUsPage />
    </div>
  );
}


