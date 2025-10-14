import { Skeleton } from "@/components/ui/skeleton";

export function ServicesSectionSkeleton() {
  return (
    <div className="relative w-full bg-[#716106] py-20 md:py-32 overflow-hidden">
      <div className="relative z-10 max-w-[1280px] mx-auto px-4 md:px-8">
        {/* Section Title Skeleton */}
        <div className="text-center mb-8">
          <Skeleton className="h-[48px] md:h-[72px] w-[300px] md:w-[400px] mx-auto mb-4 bg-white/20" />
        </div>

        {/* Subtitle Skeleton */}
        <div className="text-center mb-16">
          <Skeleton className="h-[32px] md:h-[72px] w-[600px] md:w-[800px] mx-auto bg-white/20" />
        </div>

        {/* Carousel Skeleton */}
        <div className="relative">
          {/* Navigation Arrows Skeleton */}
          <div className="absolute left-[-50px] md:left-[-100px] top-1/2 -translate-y-1/2 z-20">
            <Skeleton className="w-8 h-8 md:w-12 md:h-12 bg-white/20 rounded-full" />
          </div>

          <div className="absolute right-[-50px] md:right-[-100px] top-1/2 -translate-y-1/2 z-20">
            <Skeleton className="w-8 h-8 md:w-12 md:h-12 bg-white/20 rounded-full" />
          </div>

          {/* Images Container Skeleton */}
          <div className="relative h-[400px] md:h-[492px] flex items-center justify-center">
            {/* Side images skeleton */}
            <div className="absolute left-0 md:left-[-100px] top-1/2 -translate-y-1/2 w-[150px] md:w-[297px] h-[150px] md:h-[277px]">
              <Skeleton className="w-full h-full rounded-[16px] bg-white/20" />
            </div>

            {/* Main center image skeleton */}
            <div className="relative z-10 w-[300px] md:w-[762px] h-[250px] md:h-[444px]">
              <Skeleton className="w-full h-full rounded-[16px] bg-white/20" />
            </div>

            {/* Right side image skeleton */}
            <div className="absolute right-0 md:right-[-100px] top-1/2 -translate-y-1/2 w-[150px] md:w-[398px] h-[150px] md:h-[324px]">
              <Skeleton className="w-full h-full rounded-[16px] bg-white/20" />
            </div>
          </div>

          {/* Service Info Skeleton */}
          <div className="mt-12 text-center">
            <Skeleton className="h-[24px] md:h-[36px] w-[400px] md:w-[500px] mx-auto mb-4 bg-white/20" />
            <Skeleton className="h-[16px] md:h-[20px] w-[500px] md:w-[600px] mx-auto mb-6 bg-white/20" />
            <Skeleton className="h-[16px] w-[120px] mx-auto bg-white/20" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function WorkSectionSkeleton() {
  return (
    <div className="relative w-full bg-[#716106] py-20 md:py-32 overflow-hidden">
      <div className="relative z-10 max-w-[1280px] mx-auto px-4 md:px-8">
        {/* Section Title Skeleton */}
        <div className="text-center mb-16">
          <Skeleton className="h-[56px] md:h-[96px] w-[200px] md:w-[300px] mx-auto bg-white/20" />
        </div>

        {/* Portfolio Grid Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="group relative rounded-[20px] overflow-hidden bg-black/20">
              {/* Thumbnail Skeleton */}
              <div className="relative w-full h-[220px] md:h-[280px]">
                <Skeleton className="w-full h-full bg-white/20" />
              </div>

              {/* Caption strip Skeleton */}
              <div className="absolute inset-x-0 bottom-0 p-0">
                <div className="bg-white/20 px-4 py-3 md:px-5 md:py-3">
                  <Skeleton className="h-[16px] md:h-[18px] w-[80%] bg-white/20" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
