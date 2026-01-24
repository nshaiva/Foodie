interface StarRatingProps {
  rating: number;
  onChange?: (rating: number) => void;
  readonly?: boolean;
  size?: 'sm' | 'md';
}

export function StarRating({ rating, onChange, readonly = false, size = 'md' }: StarRatingProps) {
  const sizeClasses = size === 'sm' ? 'w-4 h-4' : 'w-6 h-6';

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={readonly}
          onClick={() => onChange?.(star)}
          className={`${sizeClasses} ${readonly ? 'cursor-default' : 'cursor-pointer hover:scale-110'} transition-transform`}
        >
          <svg
            viewBox="0 0 24 24"
            fill={star <= rating ? '#f59e0b' : 'none'}
            stroke={star <= rating ? '#f59e0b' : '#d1d5db'}
            strokeWidth="2"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        </button>
      ))}
    </div>
  );
}
