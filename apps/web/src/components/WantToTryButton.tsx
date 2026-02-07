import { systemColors } from '../data/systemColors';

interface WantToTryButtonProps {
  isOnWishlist: boolean;
  onAdd: () => void;
  onRemove: () => void;
  compact?: boolean;
}

export function WantToTryButton({ isOnWishlist, onAdd, onRemove, compact = false }: WantToTryButtonProps) {
  if (compact) {
    // Compact version: just bookmark icon
    return (
      <button
        onClick={isOnWishlist ? onRemove : onAdd}
        className="p-2 rounded-full transition-colors"
        style={{
          backgroundColor: isOnWishlist ? systemColors.saffron : systemColors.saffronLight,
          color: isOnWishlist ? 'white' : systemColors.navy
        }}
        title={isOnWishlist ? 'Remove from wishlist' : 'Want to try'}
      >
        <svg className="w-4 h-4" fill={isOnWishlist ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
        </svg>
      </button>
    );
  }

  if (isOnWishlist) {
    return (
      <button
        onClick={onRemove}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-white text-xs rounded-md transition-colors"
        style={{ backgroundColor: systemColors.saffron }}
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
        </svg>
        Saved
      </button>
    );
  }

  return (
    <button
      onClick={onAdd}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-md transition-colors"
      style={{ backgroundColor: systemColors.saffronLight, color: systemColors.navy }}
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
      </svg>
      Want to try
    </button>
  );
}
