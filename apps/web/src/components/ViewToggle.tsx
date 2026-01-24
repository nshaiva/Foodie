import { memo } from 'react';

export type ViewMode = 'grid' | 'map';

interface ViewToggleProps {
  view: ViewMode;
  onChange: (view: ViewMode) => void;
}

export const ViewToggle = memo(function ViewToggle({ view, onChange }: ViewToggleProps) {
  return (
    <div className="inline-flex rounded-lg border border-gray-200 bg-white p-1">
      <button
        onClick={() => onChange('grid')}
        className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
          view === 'grid'
            ? 'bg-gray-900 text-white'
            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
        }`}
        aria-pressed={view === 'grid'}
      >
        <span className="flex items-center gap-1.5">
          <GridIcon className="w-4 h-4" />
          Grid
        </span>
      </button>
      <button
        onClick={() => onChange('map')}
        className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
          view === 'map'
            ? 'bg-gray-900 text-white'
            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
        }`}
        aria-pressed={view === 'map'}
      >
        <span className="flex items-center gap-1.5">
          <MapIcon className="w-4 h-4" />
          Map
        </span>
      </button>
    </div>
  );
});

function GridIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
      />
    </svg>
  );
}

function MapIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
      />
    </svg>
  );
}
