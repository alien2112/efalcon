'use client';

export function AboutSection() {
  return (
    <div className="relative w-full bg-[#716106] py-20 md:py-32 overflow-hidden">
      <div className="relative z-10 max-w-[1440px] mx-auto px-4 md:px-8">
        {/* Section Title */}
        <h2 className="font-['Alfa_Slab_One:Regular',_sans-serif] text-[48px] md:text-[96px] leading-[1.2] text-center text-white mb-12 md:mb-16">
          Our Presence Around The World
        </h2>

        {/* Content */}
        <div className="max-w-[706px] mx-auto md:mx-0 md:ml-[56px]">
          <div className="font-['Alice:Regular',_sans-serif] text-[20px] md:text-[32px] text-white leading-[1.375]">
            <p className="mb-6 md:mb-8">
              Ebdaa Falcon operates across multiple regions, proudly serving clients and partners worldwide. With strong roots in Saudi Arabia, our presence extends to the Middle East, Africa, Asia, Europe, and the United States. Through strategic partnerships and integrated energy and logistics solutions, we deliver excellence that creates a global impact while supporting local growth.
            </p>
            
            <ul className="list-disc space-y-2 md:space-y-3 ml-8 md:ml-12">
              <li>
                <span>Strong presence in Saudi Arabia, Iraq, Egypt, and Tunisia</span>
              </li>
              <li>
                <span>Expanding across Morocco, Mauritania, Nigeria, and Indonesia</span>
              </li>
              <li>
                <span>Active partnerships in USA, Europe, and Malaysia</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
