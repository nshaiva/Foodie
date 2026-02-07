import type { ReactNode } from 'react';
import { useCarousel } from './CarouselProvider';

interface CarouselContainerProps {
  children: ReactNode;
}

export function CarouselContainer({ children }: CarouselContainerProps) {
  const { emblaRef } = useCarousel();

  return (
    <div className="overflow-hidden h-full" ref={emblaRef}>
      <div className="flex h-full">
        {children}
      </div>
    </div>
  );
}
