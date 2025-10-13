'use client';

export function GlassSeparator() {
  return (
    <div className="relative w-full h-16 md:h-20 overflow-hidden">
      {/* Ultra-subtle glass effect - almost invisible */}
      <div className="absolute inset-0 backdrop-blur-[1px]">
        {/* Minimal glass texture */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/1 to-white/3"></div>
        
        {/* Very subtle borders */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
        
        {/* Minimal reflection */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/2 to-transparent transform -skew-y-1"></div>
      </div>
    </div>
  );
}
