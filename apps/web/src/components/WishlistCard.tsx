import { Link } from 'react-router-dom';
import type { WishlistItem } from '../data/types';

interface WishlistCardProps {
  item: WishlistItem;
  countryName: string;
  onRemove: (id: string) => void;
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function WishlistCard({ item, countryName, onRemove }: WishlistCardProps) {
  return (
    <div className="bg-white rounded-lg border border-rose-200 p-4">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h4 className="font-medium text-gray-900">{item.dishName}</h4>
          {item.englishName && (
            <p className="text-sm text-gray-500">{item.englishName}</p>
          )}
          <Link
            to={`/country/${item.countryId}`}
            className="text-sm text-rose-600 hover:underline mt-1 inline-block"
          >
            {countryName}
          </Link>
        </div>
        <button
          onClick={() => onRemove(item.id)}
          className="text-gray-400 hover:text-red-500 transition-colors p-1"
          title="Remove from wishlist"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {item.notes && (
        <p className="text-sm text-gray-600 mt-2">{item.notes}</p>
      )}

      <div className="flex items-center gap-2 mt-3 pt-3 border-t border-rose-100">
        <svg className="w-4 h-4 text-rose-400" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
        <span className="text-xs text-gray-500">
          Added {formatDate(item.createdAt)}
        </span>
      </div>
    </div>
  );
}
