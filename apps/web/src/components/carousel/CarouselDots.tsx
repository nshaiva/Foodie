import { useCarousel } from './CarouselProvider';

interface CarouselDotsProps {
  count: number;
  primaryColor: string;
}

export function CarouselDots({ count, primaryColor }: CarouselDotsProps) {
  const { selectedIndex, scrollTo } = useCarousel();

  return (
    <div className="flex items-center justify-center gap-2">
      {Array.from({ length: count }).map((_, index) => {
        const isActive = selectedIndex === index;
        return (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              isActive ? 'w-4' : 'opacity-40 hover:opacity-70'
            }`}
            style={{ backgroundColor: primaryColor }}
            aria-label={`Go to slide ${index + 1}`}
          />
        );
      })}
    </div>
  );
}
