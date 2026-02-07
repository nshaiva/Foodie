import { useCarousel } from './CarouselProvider';

interface CarouselArrowsProps {
  primaryColor: string;
}

export function CarouselArrows({ primaryColor }: CarouselArrowsProps) {
  const { canScrollPrev, canScrollNext, scrollPrev, scrollNext } = useCarousel();

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={scrollPrev}
        disabled={!canScrollPrev}
        className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
          canScrollPrev
            ? 'hover:bg-white/80 text-current'
            : 'opacity-30 cursor-not-allowed'
        }`}
        style={{ color: primaryColor }}
        aria-label="Previous slide"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={scrollNext}
        disabled={!canScrollNext}
        className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
          canScrollNext
            ? 'hover:bg-white/80 text-current'
            : 'opacity-30 cursor-not-allowed'
        }`}
        style={{ color: primaryColor }}
        aria-label="Next slide"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}
