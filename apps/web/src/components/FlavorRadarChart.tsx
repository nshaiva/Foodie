import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import type { FlavorIntensity, ColorPalette } from '../data/types';

interface FlavorRadarChartProps {
  flavorIntensity: FlavorIntensity;
  colors: ColorPalette;
  size?: number;
}

// Flavor axes are the numeric properties (excluding interpretation)
type FlavorAxis = 'heat' | 'acidity' | 'sweetness' | 'umami' | 'aromatic' | 'smokeEarth';

const axisDescriptions: Record<FlavorAxis, string> = {
  heat: 'Spiciness and chili intensity',
  acidity: 'Sour, tangy, citrus brightness',
  sweetness: 'Sweet notes in savory dishes',
  umami: 'Savory depth, fermented flavors',
  aromatic: 'Herbs, spices, fragrance',
  smokeEarth: 'Smoky, earthy, charred notes',
};

const axisLabels: Record<FlavorAxis, string> = {
  heat: 'Heat',
  acidity: 'Acidity',
  sweetness: 'Sweet',
  umami: 'Umami',
  aromatic: 'Aromatic',
  smokeEarth: 'Smoke/Earth',
};

export function FlavorRadarChart({ flavorIntensity, colors }: FlavorRadarChartProps) {
  const data = [
    { axis: 'Heat', value: flavorIntensity.heat, fullMark: 10, key: 'heat' },
    { axis: 'Acidity', value: flavorIntensity.acidity, fullMark: 10, key: 'acidity' },
    { axis: 'Sweet', value: flavorIntensity.sweetness, fullMark: 10, key: 'sweetness' },
    { axis: 'Umami', value: flavorIntensity.umami, fullMark: 10, key: 'umami' },
    { axis: 'Aromatic', value: flavorIntensity.aromatic, fullMark: 10, key: 'aromatic' },
    { axis: 'Smoke', value: flavorIntensity.smokeEarth, fullMark: 10, key: 'smokeEarth' },
  ];

  const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: Array<{ payload: { axis: string; value: number; key: FlavorAxis } }> }) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      return (
        <div
          className="rounded-lg shadow-lg p-3 border"
          style={{
            backgroundColor: colors.background,
            borderColor: `${colors.primary}40`,
          }}
        >
          <p className="font-medium" style={{ color: colors.primary }}>
            {axisLabels[item.key]}: {item.value}/10
          </p>
          <p className="text-sm text-gray-600 mt-1">
            {axisDescriptions[item.key]}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full">
      <div className="h-64 md:h-72">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
            <PolarGrid
              stroke={`${colors.text}20`}
              strokeWidth={1}
            />
            <PolarAngleAxis
              dataKey="axis"
              tick={{
                fill: colors.text,
                fontSize: 12,
              }}
              tickLine={false}
            />
            <PolarRadiusAxis
              angle={90}
              domain={[0, 10]}
              tick={false}
              axisLine={false}
            />
            <Radar
              name="Flavor Intensity"
              dataKey="value"
              stroke={colors.primary}
              fill={colors.primary}
              fillOpacity={0.3}
              strokeWidth={2}
            />
            <Tooltip content={<CustomTooltip />} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
      {flavorIntensity.interpretation && (
        <p className="text-sm text-gray-600 text-center mt-3 italic max-w-xs mx-auto">
          {flavorIntensity.interpretation}
        </p>
      )}
    </div>
  );
}
