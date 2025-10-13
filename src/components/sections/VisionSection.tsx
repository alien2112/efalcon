'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface VisionImage {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  position: 'left' | 'right';
  isActive: boolean;
}

export function VisionSection() {
  const [visionImages, setVisionImages] = useState<VisionImage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVisionImages = async () => {
      try {
        const response = await fetch('/api/admin/vision-images');
        const result = await response.json();
        
        if (result.success) {
          setVisionImages(result.data || []);
        }
      } catch (error) {
        console.error('Error fetching vision images:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVisionImages();
  }, []);

  const leftImage = visionImages.find(img => img.position === 'left');
  const rightImage = visionImages.find(img => img.position === 'right');
  return (
    <div className="relative w-full bg-[#716106] py-20 md:py-32 overflow-hidden">
      <div className="relative z-10 max-w-[1280px] mx-auto px-4 md:px-8">
        {/* Section Title */}
        <h2 className="font-['Alfa_Slab_One:Regular',_sans-serif] text-[48px] md:text-[72px] leading-[1.2] text-center text-white mb-16">
          OUR VISION
        </h2>

        {/* Vision Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 relative">
          {/* Left Box */}
          <div className="bg-[#d9d9d9] opacity-[0.51] rounded-[51px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.6)] p-8 md:p-12 h-[400px] md:h-[624px] flex items-center justify-center relative">
            <div className="text-center">
              <p className="font-['ADLaM_Display:Regular',_sans-serif] text-[18px] md:text-[24px] text-[#514500] leading-relaxed">
                {leftImage?.description || "To be a leading force in the energy and logistics sectors, driving sustainable growth and excellence across the Middle East and beyond"}
              </p>
            </div>
            
            {/* Left Image Watermark */}
            {leftImage && (
              <div className="absolute h-[300px] md:h-[500px] left-[-50px] md:left-[-100px] opacity-[0.08] top-[50px] w-[200px] md:w-[400px] pointer-events-none overflow-hidden">
                <Image 
                  src={leftImage.imageUrl}
                  alt={leftImage.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}
          </div>

          {/* Right Box */}
          <div className="bg-[#d9d9d9] opacity-[0.51] rounded-[51px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.6)] p-8 md:p-12 h-[400px] md:h-[624px] flex items-center justify-center relative">
            <div className="text-center">
              <p className="font-['ADLaM_Display:Regular',_sans-serif] text-[18px] md:text-[24px] text-[#514500] leading-relaxed">
                {rightImage?.description || "Building strategic partnerships and delivering innovative solutions that create lasting value for our clients and communities"}
              </p>
            </div>
            
            {/* Right Image Watermark */}
            {rightImage ? (
              <div className="absolute h-[300px] md:h-[500px] right-[-50px] md:right-[-100px] opacity-[0.08] top-[50px] w-[200px] md:w-[400px] pointer-events-none overflow-hidden">
                <Image 
                  src={rightImage.imageUrl}
                  alt={rightImage.title}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="absolute h-[300px] md:h-[500px] right-[-50px] md:right-[-100px] opacity-[0.08] top-[50px] w-[200px] md:w-[400px] pointer-events-none overflow-hidden">
                <Image 
                  src="/images/95eb61c3ac3249a169d62775cfc3315b24c65966.png"
                  alt=""
                  fill
                  className="object-cover"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
