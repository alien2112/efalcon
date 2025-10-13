'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export function FloatingActions() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed right-4 bottom-4 z-[60] flex flex-col items-end gap-3">
      {/* WhatsApp */}
      <a
        href="https://wa.me/966565145666"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="group shadow-lg rounded-full p-1 bg-[#25D366] hover:bg-[#128C7E] transition-colors duration-200"
      >
        <div className="bg-white rounded-full p-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="#25D366">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.446-1.076-.612-1.47-.173-.389-.347-.334-.446-.34-.099-.006-.371-.05-.57-.05-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.864.997-3.838-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
          </svg>
        </div>
      </a>

      {/* Scroll to top */}
      <button
        onClick={scrollTop}
        aria-label="Scroll to top"
        className={`transition-opacity duration-300 ${visible ? 'opacity-100' : 'opacity-0 pointer-events-none'} bg-white text-[#716106] hover:text-[#514500] border border-[#716106]/30 shadow-lg rounded-full w-10 h-10 flex items-center justify-center`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 5.828l5.364 5.364-1.414 1.414L13 9.657V20h-2V9.657L8.05 12.606 6.636 11.192 12 5.828z"/></svg>
      </button>
    </div>
  );
}


