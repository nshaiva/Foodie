import type { ReactNode } from 'react';

interface CarouselSlideProps {
  children: ReactNode;
}

export function CarouselSlide({ children }: CarouselSlideProps) {
  return (
    <div className="flex-[0_0_100%] min-w-0 h-full">
      {children}
    </div>
  );
}
