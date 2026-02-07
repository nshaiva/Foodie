import { useState, memo } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from 'react-simple-maps';
import type { FoodCulture, RegionalCuisine, ColorPalette } from '../../../data/types';
import { systemColors } from '../../../data/systemColors';

const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2.0.2/countries-110m.json';

interface CultureRegionsSlideProps {
  countryId: string;
  foodCulture: FoodCulture;
  regions?: RegionalCuisine[];
  colors: ColorPalette;
}

// Map alpha-2 to numeric codes
const alpha2ToNumeric: Record<string, string> = {
  TH: '764',
  MX: '484',
  JP: '392',
  IT: '380',
  ET: '231',
  PE: '604',
};

// Country-specific map configurations (zoomed in to fill container)
const countryMapConfig: Record<string, {
  center: [number, number];
  scale: number;
}> = {
  TH: { center: [101, 13], scale: 2800 },
  MX: { center: [-102, 24], scale: 1100 },
  JP: { center: [138, 37], scale: 1800 },
  IT: { center: [12.5, 42], scale: 2800 },
  ET: { center: [40, 9], scale: 3000 },
  PE: { center: [-75, -10], scale: 1800 },
};

// Geographic coordinates for region centers
const regionCoordinates: Record<string, Record<string, [number, number]>> = {
  TH: {
    'Northern Thailand (Lanna)': [99.0, 18.8],
    'Northeastern Thailand (Isan)': [103.5, 16.0],
    'Central Thailand': [100.5, 14.5],
    'Southern Thailand': [99.5, 8.5],
  },
  MX: {
    'Northern Mexico': [-105, 28],
    'Central Mexico': [-99, 19.5],
    'Oaxaca': [-96.5, 17],
    'Yucatán': [-89, 20.5],
    'Coastal Regions': [-105, 22],
  },
  IT: {
    'Northern Italy': [11, 45.5],
    'Central Italy': [12, 42.5],
    'Southern Italy & Sicily': [14.5, 39],
  },
};

// Get a shortened region name for the bubble label
function getShortRegionName(regionName: string): string {
  if (regionName.includes('(')) {
    const inParens = regionName.match(/\(([^)]+)\)/);
    if (inParens) return inParens[1];
    return regionName.split('(')[0].trim();
  }
  if (regionName.includes(' & ')) {
    return regionName.split(' & ')[0];
  }
  return regionName
    .replace('Thailand', '')
    .replace('Mexico', '')
    .replace('Italy', '')
    .trim();
}

// Overview card (shown when no region is selected - mirrors region detail style)
function OverviewCard({
  foodCulture,
}: {
  foodCulture: FoodCulture;
}) {
  return (
    <div className="space-y-4">
      {foodCulture.mealStructure && (
        <div>
          <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
            Meal Structure
          </h4>
          <p className="text-gray-600 text-sm leading-relaxed">{foodCulture.mealStructure}</p>
        </div>
      )}

      {foodCulture.diningCustoms && (
        <div>
          <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
            Dining Customs
          </h4>
          <p className="text-gray-600 text-sm leading-relaxed">{foodCulture.diningCustoms}</p>
        </div>
      )}

      {foodCulture.historicalInfluences && (
        <div>
          <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
            Historical Influences
          </h4>
          <p className="text-gray-600 text-sm leading-relaxed">{foodCulture.historicalInfluences}</p>
        </div>
      )}
    </div>
  );
}

// Region detail card (shown when a region is selected)
function RegionDetailCard({
  region,
  colorPrimary,
}: {
  region: RegionalCuisine;
  colorPrimary: string;
}) {
  return (
    <div className="space-y-4">
      <div>
        <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
          Overview
        </h4>
        <p className="text-gray-600 text-sm leading-relaxed">{region.description}</p>
      </div>

      <div>
        <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
          Signature Dishes
        </h4>
        <div className="flex flex-wrap gap-1.5">
          {region.signatureDishes.map((dish) => (
            <span
              key={dish}
              className="text-xs px-2 py-1 rounded"
              style={{ backgroundColor: `${colorPrimary}15`, color: colorPrimary }}
            >
              {dish}
            </span>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
          Key Ingredients
        </h4>
        <div className="flex flex-wrap gap-1.5">
          {region.keyIngredients.map((ingredient) => (
            <span
              key={ingredient}
              className="text-xs px-2 py-1 rounded"
              style={{ backgroundColor: systemColors.herbLight, color: systemColors.herb }}
            >
              {ingredient}
            </span>
          ))}
        </div>
      </div>

      {region.distinctiveTraits && region.distinctiveTraits.length > 0 && (
        <div>
          <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
            Distinctive Traits
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {region.distinctiveTraits.map((trait) => (
              <span
                key={trait}
                className="text-xs px-2 py-1 rounded"
                style={{ backgroundColor: `${systemColors.navy}10`, color: systemColors.navy }}
              >
                {trait}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Regional map component
const RegionalMap = memo(function RegionalMap({
  countryId,
  regions,
  colors,
  selectedRegion,
  onSelectRegion,
}: {
  countryId: string;
  regions: RegionalCuisine[];
  colors: ColorPalette;
  selectedRegion: string | null;
  onSelectRegion: (region: string | null) => void;
}) {
  const numericId = alpha2ToNumeric[countryId];
  const mapConfig = countryMapConfig[countryId];
  const coordinates = regionCoordinates[countryId];

  // If no map config exists, fall back to simple grid
  if (!mapConfig || !coordinates) {
    return (
      <div className="grid grid-cols-2 gap-3 h-full">
        {regions.map((region) => (
          <button
            key={region.name}
            onClick={() =>
              onSelectRegion(selectedRegion === region.name ? null : region.name)
            }
            className="p-3 rounded-lg text-sm font-medium text-center transition-all duration-200 hover:scale-105"
            style={{
              backgroundColor:
                selectedRegion === region.name ? colors.primary : `${colors.primary}15`,
              color: selectedRegion === region.name ? '#fff' : colors.primary,
              boxShadow:
                selectedRegion === region.name
                  ? `0 0 0 2px white, 0 0 0 4px ${colors.secondary}`
                  : undefined,
            }}
          >
            {region.name.includes('(') ? region.name.split('(')[0].trim() : region.name}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div
      className="relative rounded-xl overflow-hidden h-full cursor-pointer"
      style={{
        backgroundColor: colors.background,
        border: `1px solid ${colors.primary}30`,
      }}
      onClick={() => onSelectRegion(null)}
    >
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          center: mapConfig.center,
          scale: mapConfig.scale,
        }}
        style={{
          width: '100%',
          height: '100%',
        }}
      >
        <Geographies geography={GEO_URL}>
          {({ geographies }) =>
            geographies
              .filter((geo) => geo.id === numericId)
              .map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={`${colors.primary}20`}
                  stroke={colors.primary}
                  strokeWidth={1.5}
                  onClick={() => onSelectRegion(null)}
                  style={{
                    default: { outline: 'none', cursor: 'pointer' },
                    hover: { outline: 'none', cursor: 'pointer' },
                    pressed: { outline: 'none', cursor: 'pointer' },
                  }}
                />
              ))
          }
        </Geographies>

        {/* Region markers */}
        {regions.map((region) => {
          const coords = coordinates[region.name];
          if (!coords) return null;

          const isSelected = selectedRegion === region.name;
          const shortName = getShortRegionName(region.name);

          return (
            <Marker key={region.name} coordinates={coords}>
              <g
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectRegion(isSelected ? null : region.name);
                }}
                style={{ cursor: 'pointer' }}
              >
                <circle
                  r={isSelected ? 42 : 36}
                  fill={isSelected ? colors.primary : `${colors.primary}95`}
                  stroke={isSelected ? colors.secondary : 'white'}
                  strokeWidth={isSelected ? 4 : 3}
                  style={{
                    transition: 'all 150ms ease-out',
                    filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))',
                  }}
                />
                <text
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill="white"
                  fontSize={14}
                  fontWeight={700}
                  letterSpacing={0.5}
                  style={{
                    pointerEvents: 'none',
                    textShadow: '0 1px 3px rgba(0,0,0,0.4)',
                  }}
                >
                  {shortName}
                </text>
              </g>
            </Marker>
          );
        })}
      </ComposableMap>

      {/* Label showing current selection */}
      <div
        className="absolute top-3 left-3 px-3 py-1.5 rounded-full text-sm font-medium"
        style={{
          backgroundColor: selectedRegion ? colors.primary : 'white',
          color: selectedRegion ? 'white' : colors.text,
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        }}
      >
        {selectedRegion ? getShortRegionName(selectedRegion) : 'Overview'}
      </div>

      {/* Hint text when no region selected */}
      {!selectedRegion && (
        <p className="absolute bottom-3 left-0 right-0 text-center text-xs text-gray-500">
          Click a region to explore
        </p>
      )}
    </div>
  );
});

export function CultureRegionsSlide({
  countryId,
  foodCulture,
  regions,
  colors,
}: CultureRegionsSlideProps) {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  const hasRegions = regions && regions.length > 0;
  const selectedRegionData = selectedRegion
    ? regions?.find((r) => r.name === selectedRegion)
    : null;

  // If no regions, just show the overview card
  if (!hasRegions) {
    return (
      <div className="p-4 space-y-6">
        <h2
          className="text-xl font-semibold"
          style={{ color: colors.text }}
        >
          Food Culture
        </h2>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <OverviewCard foodCulture={foodCulture} />
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 h-full flex flex-col">
      <h2
        className="text-xl font-semibold mb-4"
        style={{ color: colors.text }}
      >
        Culture & Regions
      </h2>

      {/* Map + Right Panel */}
      <div className="flex flex-col lg:flex-row gap-4 flex-1 min-h-0">
        {/* Map: 60% on desktop */}
        <div className="flex-1 lg:flex-[3] min-h-[300px]">
          <RegionalMap
            countryId={countryId}
            regions={regions}
            colors={colors}
            selectedRegion={selectedRegion}
            onSelectRegion={setSelectedRegion}
          />
        </div>

        {/* Right Panel: 40% on desktop */}
        <div className="flex-1 lg:flex-[2] min-h-[200px]">
          <div className="bg-white rounded-lg border border-gray-200 p-4 h-full overflow-y-auto">
            {selectedRegionData ? (
              <RegionDetailCard
                region={selectedRegionData}
                colorPrimary={colors.primary}
              />
            ) : (
              <OverviewCard foodCulture={foodCulture} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
