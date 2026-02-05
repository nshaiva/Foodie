import { useState, memo } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from 'react-simple-maps';
import type { RegionalCuisine, ColorPalette } from '../data/types';
import { systemColors } from '../data/systemColors';

const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2.0.2/countries-110m.json';

interface RegionalMapProps {
  countryId: string;
  regions: RegionalCuisine[];
  colors: ColorPalette;
}

// Map alpha-2 to numeric codes (reverse of countryGeoMapping)
const alpha2ToNumeric: Record<string, string> = {
  TH: '764',
  MX: '484',
  JP: '392',
  IT: '380',
  ET: '231',
  PE: '604',
};

// Country-specific map configurations (scales tuned to show full country with padding)
const countryMapConfig: Record<string, {
  center: [number, number];
  scale: number;
}> = {
  TH: { center: [101, 13], scale: 1400 },
  MX: { center: [-102, 24], scale: 550 },
  JP: { center: [138, 37], scale: 900 },
  IT: { center: [12.5, 42], scale: 1400 },
  ET: { center: [40, 9], scale: 1600 },
  PE: { center: [-75, -10], scale: 900 },
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

function RegionDetail({
  region,
  colorPrimary,
}: {
  region: RegionalCuisine;
  colorPrimary: string;
}) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 space-y-4 mt-4">
      <div>
        <h3 className="font-semibold text-gray-900 mb-1">{region.name}</h3>
        <p className="text-gray-600 text-sm leading-relaxed">{region.description}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
      </div>

      {region.distinctiveTraits && region.distinctiveTraits.length > 0 && (
        <div>
          <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
            What Makes It Distinctive
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
  // Shorten common words
  return regionName
    .replace('Thailand', '')
    .replace('Mexico', '')
    .replace('Italy', '')
    .trim();
}

export const RegionalMap = memo(function RegionalMap({
  countryId,
  regions,
  colors,
}: RegionalMapProps) {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  const numericId = alpha2ToNumeric[countryId];
  const mapConfig = countryMapConfig[countryId];
  const coordinates = regionCoordinates[countryId];

  // If no map config exists, fall back to simple grid
  if (!mapConfig || !coordinates) {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {regions.map((region) => (
            <button
              key={region.name}
              onClick={() =>
                setSelectedRegion(selectedRegion === region.name ? null : region.name)
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

        {selectedRegion && (
          <RegionDetail
            region={regions.find((r) => r.name === selectedRegion)!}
            colorPrimary={colors.primary}
          />
        )}
      </div>
    );
  }

  return (
    <div>
      {/* Map container */}
      <div
        className="relative rounded-xl overflow-hidden"
        style={{
          backgroundColor: colors.background,
          border: `1px solid ${colors.primary}30`,
        }}
      >
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{
            center: mapConfig.center,
            scale: mapConfig.scale,
          }}
          style={{
            width: '100%',
            height: '450px',
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
                    style={{
                      default: { outline: 'none' },
                      hover: { outline: 'none' },
                      pressed: { outline: 'none' },
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
                  onClick={() =>
                    setSelectedRegion(isSelected ? null : region.name)
                  }
                  style={{ cursor: 'pointer' }}
                >
                  {/* Bubble circle */}
                  <circle
                    r={isSelected ? 38 : 32}
                    fill={isSelected ? colors.primary : `${colors.primary}95`}
                    stroke={isSelected ? colors.secondary : 'white'}
                    strokeWidth={isSelected ? 4 : 3}
                    style={{
                      transition: 'all 150ms ease-out',
                      filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))',
                    }}
                  />
                  {/* Label text */}
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

        {/* Instruction hint */}
        {!selectedRegion && (
          <p className="absolute bottom-2 left-0 right-0 text-center text-xs text-gray-400">
            Click a region to explore its cuisine
          </p>
        )}
      </div>

      {/* Selected region detail */}
      {selectedRegion && (
        <RegionDetail
          region={regions.find((r) => r.name === selectedRegion)!}
          colorPrimary={colors.primary}
        />
      )}
    </div>
  );
});
