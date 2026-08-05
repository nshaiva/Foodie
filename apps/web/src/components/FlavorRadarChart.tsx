import { useState } from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import type { FlavorIntensity, ColorPalette, IngredientTiers, FlavorAxisId } from '../data/types';
import { FLAVOR_AXIS_META, driversForAxis, hasFlavorAxisData } from '../data/flavorAxisMeta';
import { systemColors } from '../data/systemColors';

interface FlavorRadarChartProps {
  flavorIntensity: FlavorIntensity;
  colors: ColorPalette;
  /** When provided (with axis data), axis labels become clickable and show driver ingredients */
  ingredientTiers?: IngredientTiers;
  size?: number;
}

const axisDescriptions: Record<FlavorAxisId, string> = {
  heat: 'Spiciness and chili intensity',
  acidity: 'Sour, tangy, citrus brightness',
  sweetness: 'Sweet notes in savory dishes',
  umami: 'Savory depth, fermented flavors',
  aromatic: 'Herbs, spices, fragrance',
  smokeEarth: 'Smoky, earthy, charred notes',
};

const axisLabels: Record<FlavorAxisId, string> = {
  heat: 'Heat',
  acidity: 'Acidity',
  sweetness: 'Sweet',
  umami: 'Umami',
  aromatic: 'Aromatic',
  smokeEarth: 'Smoke/Earth',
};

const TIER_BADGE: Record<keyof IngredientTiers, string> = {
  foundation: 'FDN',
  aromaticCore: 'CORE',
  flavorBuilders: 'BLD',
  staples: 'STPL',
};

export function FlavorRadarChart({ flavorIntensity, colors, ingredientTiers }: FlavorRadarChartProps) {
  const [selectedAxis, setSelectedAxis] = useState<FlavorAxisId | null>(null);
  const interactive = !!ingredientTiers && hasFlavorAxisData(ingredientTiers);

  const data = [
    { axis: 'Heat', value: flavorIntensity.heat, fullMark: 10, key: 'heat' as FlavorAxisId },
    { axis: 'Acidity', value: flavorIntensity.acidity, fullMark: 10, key: 'acidity' as FlavorAxisId },
    { axis: 'Sweet', value: flavorIntensity.sweetness, fullMark: 10, key: 'sweetness' as FlavorAxisId },
    { axis: 'Umami', value: flavorIntensity.umami, fullMark: 10, key: 'umami' as FlavorAxisId },
    { axis: 'Aromatic', value: flavorIntensity.aromatic, fullMark: 10, key: 'aromatic' as FlavorAxisId },
    { axis: 'Smoke', value: flavorIntensity.smokeEarth, fullMark: 10, key: 'smokeEarth' as FlavorAxisId },
  ];
  const keyByDisplay = new Map(data.map(d => [d.axis, d.key]));

  const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: Array<{ payload: { axis: string; value: number; key: FlavorAxisId } }> }) => {
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

  // Clickable axis label, "seasoned plate" treatment: an empty plate dot in
  // the axis color carries the tap cue; hover/selection fills the plate and
  // tosses a spice sprinkle (CSS in index.css). Rendered as HTML via
  // foreignObject so the prototype's CSS animation carries over 1:1.
  const AxisTick = (props: { x?: number; y?: number; textAnchor?: string; payload?: { value: string } }) => {
    const { x = 0, y = 0, textAnchor, payload } = props;
    const key = payload ? keyByDisplay.get(payload.value) : undefined;

    if (!interactive || !key) {
      return (
        <text x={x} y={y} textAnchor={textAnchor as 'start' | 'middle' | 'end' | undefined} fill={colors.text} fontSize={12}>
          {payload?.value}
        </text>
      );
    }

    const isSelected = selectedAxis === key;
    const axisColor = FLAVOR_AXIS_META[key].color;
    const W = 110;
    const anchor = (textAnchor ?? 'middle') as 'start' | 'middle' | 'end';
    const fx = anchor === 'start' ? x : anchor === 'end' ? x - W : x - W / 2;
    const justify = anchor === 'start' ? 'flex-start' : anchor === 'end' ? 'flex-end' : 'center';

    return (
      <foreignObject x={fx} y={y - 14} width={W} height={26} style={{ overflow: 'visible' }}>
        <div style={{ display: 'flex', justifyContent: justify }}>
          <span
            className={`radar-lbl${isSelected ? ' sel' : ''}`}
            style={{ '--ax': axisColor, color: isSelected ? axisColor : colors.text } as React.CSSProperties}
            onClick={() => setSelectedAxis(prev => (prev === key ? null : key))}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedAxis(prev => (prev === key ? null : key)); } }}
          >
            <span className="plate" />
            <span className="txt">
              <i className="spr" /><i className="spr" /><i className="spr" />
              {payload?.value}
            </span>
          </span>
        </div>
      </foreignObject>
    );
  };

  const drivers = selectedAxis && ingredientTiers ? driversForAxis(ingredientTiers, selectedAxis) : [];

  return (
    <div className="w-full">
      <div className="h-80 md:h-96 radar-chart">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data} margin={{ left: 26, right: 26 }}>
            <PolarGrid
              stroke={`${colors.text}20`}
              strokeWidth={1}
            />
            <PolarAngleAxis
              dataKey="axis"
              tick={<AxisTick />}
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

      {interactive && !selectedAxis && (
        <p className="text-xs text-center -mt-2 mb-1" style={{ color: systemColors.navyMuted }}>
          Tap an axis to see the ingredients behind it
        </p>
      )}

      {selectedAxis && (
        <div className="rounded-xl border p-3 mt-1" style={{ borderColor: systemColors.border, backgroundColor: systemColors.seaSalt }}>
          <div className="flex items-baseline gap-2 mb-1.5">
            <span className="text-sm font-bold" style={{ color: FLAVOR_AXIS_META[selectedAxis].color }}>
              {axisLabels[selectedAxis]}
            </span>
            <span className="flex-none w-20 h-1.5 rounded-full overflow-hidden self-center" style={{ backgroundColor: systemColors.border }}>
              <span className="block h-full rounded-full" style={{ width: `${flavorIntensity[selectedAxis] * 10}%`, backgroundColor: FLAVOR_AXIS_META[selectedAxis].color }} />
            </span>
            <span className="text-xs" style={{ color: systemColors.navyMuted }}>{flavorIntensity[selectedAxis]} / 10</span>
            <button
              onClick={() => setSelectedAxis(null)}
              className="ml-auto text-xs btn-press px-1"
              style={{ color: systemColors.navyMuted }}
              aria-label="Close"
            >
              ✕
            </button>
          </div>
          {drivers.length > 0 ? (
            <div className="flex flex-wrap gap-1.5">
              {drivers.map(({ ingredient, tier, strength }) => (
                <span
                  key={ingredient.name}
                  className="inline-flex items-baseline gap-1.5 text-xs px-2.5 py-1 rounded-full border bg-white"
                  style={{ borderColor: systemColors.border, color: systemColors.navy, opacity: strength === 'main' ? 1 : 0.7 }}
                >
                  {ingredient.name}
                  <span className="text-[9px] font-bold tracking-wide" style={{ color: systemColors.navyMuted }}>{TIER_BADGE[tier]}</span>
                </span>
              ))}
            </div>
          ) : (
            <p className="text-xs" style={{ color: systemColors.navyMuted }}>
              No single pantry ingredient drives this — it comes from technique and fresh produce.
            </p>
          )}
        </div>
      )}

      {flavorIntensity.interpretation && (
        <p className="text-sm text-gray-600 text-center mt-3 italic max-w-xs mx-auto">
          {flavorIntensity.interpretation}
        </p>
      )}
    </div>
  );
}
