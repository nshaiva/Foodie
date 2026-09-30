import { useState } from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from 'recharts';
import type { FlavorIntensity, ColorPalette, IngredientTiers, FlavorAxisId } from '../data/types';
import { FLAVOR_AXIS_META, driversForAxis, hasFlavorAxisData } from '../data/flavorAxisMeta';
import { systemColors } from '../data/systemColors';

interface FlavorRadarChartProps {
  flavorIntensity: FlavorIntensity;
  colors: ColorPalette;
  /** When provided (with axis data), axis labels become clickable and show driver ingredients */
  ingredientTiers?: IngredientTiers;
  /**
   * How tall the chart's box is. `full` is the page-sized chart; `fitted` sits
   * close around the hexagon for a card that holds only the chart; `compact`
   * is the smaller box of the country overview's card. Everything else (the
   * tappable axes, the drivers panel, the flavor sentence) is the same at
   * every size.
   */
  size?: RadarSize;
  /** Fill and stroke of the shape; defaults to the country's primary. Explore
   *  passes its own so the overview and the tray share one colour. */
  color?: string;
}

type RadarSize = 'full' | 'fitted' | 'compact';

const BOX_HEIGHT: Record<RadarSize, string> = {
  full: 'h-80 md:h-96',
  fitted: 'h-60 md:h-64',
  compact: 'h-48',
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

export function FlavorRadarChart({ flavorIntensity, colors, ingredientTiers, size = 'full', color }: FlavorRadarChartProps) {
  const [selectedAxis, setSelectedAxis] = useState<FlavorAxisId | null>(null);
  const interactive = !!ingredientTiers && hasFlavorAxisData(ingredientTiers);

  const data = [
    { axis: 'Heat', value: flavorIntensity.heat, fullMark: 10, key: 'heat' as FlavorAxisId },
    { axis: 'Acidity', value: flavorIntensity.acidity, fullMark: 10, key: 'acidity' as FlavorAxisId },
    { axis: 'Sweet', value: flavorIntensity.sweetness, fullMark: 10, key: 'sweetness' as FlavorAxisId },
    { axis: 'Umami', value: flavorIntensity.umami, fullMark: 10, key: 'umami' as FlavorAxisId },
    { axis: 'Aromatic', value: flavorIntensity.aromatic, fullMark: 10, key: 'aromatic' as FlavorAxisId },
    { axis: 'Smoke/Earth', value: flavorIntensity.smokeEarth, fullMark: 10, key: 'smokeEarth' as FlavorAxisId },
  ];
  const keyByDisplay = new Map(data.map(d => [d.axis, d.key]));

  // Clickable axis label, "seasoned plate" treatment: an empty plate dot in
  // the axis color carries the tap cue; hover/selection fills the plate and
  // tosses a spice sprinkle (CSS in index.css). Rendered as HTML via
  // foreignObject so the prototype's CSS animation carries over 1:1.
  const AxisTick = (props: { x?: number; y?: number; textAnchor?: string; payload?: { value: string } }) => {
    const { x = 0, y = 0, textAnchor, payload } = props;
    const key = payload ? keyByDisplay.get(payload.value) : undefined;

    if (!key) {
      return (
        <text x={x} y={y} textAnchor={textAnchor as 'start' | 'middle' | 'end' | undefined} fill={colors.text} fontSize={12}>
          {payload?.value}
        </text>
      );
    }

    const isSelected = selectedAxis === key;
    const axisColor = FLAVOR_AXIS_META[key].color;

    const toggle = () => setSelectedAxis(prev => (prev === key ? null : key));
    // Wide enough for the longest label in bold, and no wider: at a phone's
    // width a wider box reaches past the card's edge
    const W = 100;
    const anchor = (textAnchor ?? 'middle') as 'start' | 'middle' | 'end';
    const fx = anchor === 'start' ? x : anchor === 'end' ? x - W : x - W / 2;
    const justify = anchor === 'start' ? 'flex-start' : anchor === 'end' ? 'flex-end' : 'center';

    return (
      <foreignObject x={fx} y={y - 14} width={W} height={26} style={{ overflow: 'visible' }}>
        <div style={{ display: 'flex', justifyContent: justify }}>
          {/* Without ingredient data a label can't open drivers, but it keeps
              the same plate dot so every radar reads alike */}
          <span
            className={`radar-lbl${isSelected ? ' sel' : ''}`}
            style={{ '--ax': axisColor, color: isSelected ? axisColor : colors.text, pointerEvents: interactive ? undefined : 'none' } as React.CSSProperties}
            {...(interactive && {
              onClick: toggle,
              role: 'button',
              tabIndex: 0,
              onKeyDown: (e: React.KeyboardEvent) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); } },
            })}
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
      <div className={`${BOX_HEIGHT[size]} radar-chart`}>
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data} margin={{ left: 52, right: 52 }}>
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
              stroke={color ?? colors.primary}
              fill={color ?? colors.primary}
              fillOpacity={color ? 0.2 : 0.3}
              strokeWidth={2}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {interactive && !selectedAxis && (
        <p className={`text-xs text-center mb-1 ${size === 'full' ? '-mt-2' : 'mt-1'}`} style={{ color: systemColors.navyMuted }}>
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
