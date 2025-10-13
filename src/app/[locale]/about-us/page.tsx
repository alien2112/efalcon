'use client';

import { Navigation } from '@/components/Navigation';
import { AboutUsPage } from '@/components/sections/AboutUsPage';

export default function AboutUsPageRoute() {
  return (
    <div className="size-full overflow-y-auto overflow-x-hidden">
      {/* Navigation */}
      <Navigation currentSection="aboutUs" onNavigate={() => {}} />

      {/* About Us Page Content */}
      <AboutUsPage />
    </div>
  );
}
