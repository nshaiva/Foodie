import { memo } from 'react';
import { LEGEND_ITEMS } from './mapUtils';

export const MapLegend = memo(function MapLegend() {
  return (
    <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-sm border border-gray-200">
      <div className="flex flex-wrap gap-x-4 gap-y-1">
        {LEGEND_ITEMS.map(({ state, label, color }) => (
          <div key={state} className="flex items-center gap-1.5">
            <div
              className="w-3 h-3 rounded-sm border border-gray-300"
              style={{ backgroundColor: color }}
            />
            <span className="text-xs text-gray-600">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
});
