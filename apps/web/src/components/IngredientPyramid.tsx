import { useState } from 'react';
import type { IngredientTiers, TieredIngredient, ColorPalette, FlavorAxisId, CookingStep } from '../data/types';
import { FLAVOR_AXIS_META, FLAVOR_AXIS_IDS, dominantAxis, hasFlavorAxisData } from '../data/flavorAxisMeta';
import { systemColors } from '../data/systemColors';

interface IngredientPyramidProps {
  tiers: IngredientTiers;
  colors: ColorPalette;
  /** When present, rendered as an "In practice" strip closing the build view */
  cookingFlow?: CookingStep[];
}

type View = 'build' | 'matrix';

// "The build": tiers presented in cooking order, with plain-language roles
const BUILD_LAYERS: {
  key: keyof IngredientTiers;
  step: string;
  label: string;
  role: string;
  arrowAfter?: string;
}[] = [
  { key: 'staples', step: 'Start', label: 'Staples', role: 'The canvas. Neutral on purpose — everything below exists to flavor these.', arrowAfter: 'hot oil goes in' },
  { key: 'aromaticCore', step: 'First 30 seconds', label: 'Aromatic core', role: 'Bloomed in oil before anything else — this sizzle is the smell of the cuisine.', arrowAfter: 'the main ingredient joins' },
  { key: 'foundation', step: 'The backbone', label: 'Foundation', role: 'The seasoning base in nearly every dish — if it tastes like this cuisine, these are why.', arrowAfter: 'steer the dish somewhere specific' },
  { key: 'flavorBuilders', step: 'The character', label: 'Flavor builders', role: 'A few of these at a time — each pulls the dish toward a different flavor.' },
];

// Matrix rows keep the importance order; staples collapse to a sentence
const MATRIX_TIERS: { key: keyof IngredientTiers; label: string; role: string }[] = [
  { key: 'foundation', label: 'Foundation', role: 'in almost every dish' },
  { key: 'aromaticCore', label: 'Aromatic core', role: 'signature aromatics' },
  { key: 'flavorBuilders', label: 'Flavor builders', role: 'pick a few to steer the dish' },
];

function altName(item: TieredIngredient): string | undefined {
  const first = item.description?.split('·')[0]?.trim();
  return first && first !== item.name ? first : undefined;
}

/** Ingredient chip with the existing hover/tap description tooltip */
function IngredientChip({ item }: { item: TieredIngredient }) {
  const [open, setOpen] = useState(false);
  const axis = dominantAxis(item);
  return (
    <span
      className="relative group inline-block"
      onMouseLeave={() => setOpen(false)}
    >
      <button
        onClick={() => item.description && setOpen(o => !o)}
        className="text-[13px] px-2.5 py-1 rounded-md font-medium cursor-pointer"
        style={{
          backgroundColor: systemColors.herbLight,
          color: systemColors.navy,
          borderLeft: `3px solid ${axis ? FLAVOR_AXIS_META[axis].color : 'transparent'}`,
        }}
      >
        {item.name}
      </button>
      {item.description && (
        <span
          className={`absolute left-1/2 -translate-x-1/2 bottom-full mb-2 z-20 pointer-events-none transition-opacity ${
            open ? 'opacity-100' : 'opacity-0 md:group-hover:opacity-100'
          }`}
        >
          <span className="block bg-gray-800 text-white text-xs rounded-lg px-2 py-1.5 w-[180px] text-center shadow-lg">
            {item.description}
          </span>
          <span className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800" />
        </span>
      )}
    </span>
  );
}

function BuildView({ tiers }: { tiers: IngredientTiers }) {
  return (
    <div>
      {BUILD_LAYERS.map(layer => {
        const items = tiers[layer.key];
        if (!items || items.length === 0) return null;
        return (
          <div key={layer.key}>
            <div className="grid grid-cols-1 sm:grid-cols-[150px_1fr] gap-2 sm:gap-4 py-3 border-t first:border-t-0" style={{ borderColor: systemColors.border }}>
              <div>
                <div className="text-[10px] font-bold tracking-widest uppercase" style={{ color: systemColors.navyMuted }}>{layer.step}</div>
                <div className="text-sm font-bold" style={{ color: systemColors.navy }}>{layer.label}</div>
                <div className="text-xs leading-snug mt-0.5" style={{ color: systemColors.navyMuted }}>{layer.role}</div>
              </div>
              <div className="flex flex-wrap gap-1.5 content-start">
                {items.map(item => <IngredientChip key={item.name} item={item} />)}
              </div>
            </div>
            {layer.arrowAfter && (
              <div className="text-center text-[11px] pb-1" style={{ color: systemColors.navyMuted }}>
                ↓ {layer.arrowAfter}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function axisDot(item: TieredIngredient, axis: FlavorAxisId) {
  const entry = item.flavorAxes?.find(a => a.axis === axis);
  if (!entry) return null;
  return (
    <span
      className="inline-block w-2.5 h-2.5 rounded-full"
      style={{
        backgroundColor: FLAVOR_AXIS_META[axis].color,
        opacity: entry.strength === 'main' ? 1 : 0.35,
        transform: entry.strength === 'main' ? undefined : 'scale(0.75)',
      }}
    />
  );
}

function MatrixView({ tiers }: { tiers: IngredientTiers }) {
  const staples = tiers.staples || [];
  // Flavor-neutral ingredients (thickeners, fats) stay out of the matrix
  const rows = (key: keyof IngredientTiers) =>
    (tiers[key] || []).filter(i => i.flavorAxes && i.flavorAxes.length > 0);

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm" style={{ minWidth: 560 }}>
          <thead>
            <tr>
              <th></th>
              {FLAVOR_AXIS_IDS.map(axis => (
                <th key={axis} className="text-center font-semibold text-[11px] pb-1 px-1" style={{ color: systemColors.navyMuted }}>
                  {FLAVOR_AXIS_META[axis].label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {MATRIX_TIERS.map(tier => (
              [
                <tr key={`${tier.key}-head`}>
                  <td colSpan={7} className="pt-3 pb-1 text-[10px] font-bold tracking-widest uppercase" style={{ color: systemColors.tomato }}>
                    {tier.label} <span className="font-normal normal-case tracking-normal" style={{ color: systemColors.navyMuted }}>— {tier.role}</span>
                  </td>
                </tr>,
                ...rows(tier.key).map(item => {
                  const alt = altName(item);
                  return (
                    <tr key={item.name} className="border-t" style={{ borderColor: systemColors.border }}>
                      <td className="py-1.5 pr-2 whitespace-nowrap font-medium" style={{ color: systemColors.navy }}>
                        {item.name}
                        {alt && <span className="ml-2 text-xs font-normal" style={{ color: systemColors.navyMuted }}>{alt}</span>}
                      </td>
                      {FLAVOR_AXIS_IDS.map(axis => (
                        <td key={axis} className="text-center py-1.5 px-1">{axisDot(item, axis)}</td>
                      ))}
                    </tr>
                  );
                }),
              ]
            ))}
          </tbody>
        </table>
      </div>
      {staples.length > 0 && (
        <p className="text-xs mt-3 leading-snug" style={{ color: systemColors.navyMuted }}>
          Staples — {staples.map(s => s.name.toLowerCase()).join(', ')} — are the neutral canvas all of this lands on.
        </p>
      )}
    </div>
  );
}

export function IngredientPyramid({ tiers, colors, cookingFlow }: IngredientPyramidProps) {
  const [view, setView] = useState<View>('build');
  const hasAxes = hasFlavorAxisData(tiers);
  const showFlow = view === 'build' && !!cookingFlow && cookingFlow.length > 0;

  return (
    <div className="w-full">
      {hasAxes && (
        <div className="flex justify-end mb-3">
          <div className="inline-flex rounded-full border overflow-hidden" style={{ borderColor: systemColors.border }}>
            {([
              { value: 'build', label: 'The build' },
              { value: 'matrix', label: 'Flavor matrix' },
            ] as const).map(seg => (
              <button
                key={seg.value}
                onClick={() => setView(seg.value)}
                className={`px-3 py-1 text-xs font-semibold ${view === seg.value ? 'transition-colors' : 'btn-press'}`}
                style={view === seg.value
                  ? { backgroundColor: systemColors.navy, color: '#fff' }
                  : { backgroundColor: '#fff', color: systemColors.navyMuted }}
              >
                {seg.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {view === 'matrix' && hasAxes ? <MatrixView tiers={tiers} /> : <BuildView tiers={tiers} />}

      {showFlow && (
        <div className="mt-3 pt-3 border-t" style={{ borderColor: systemColors.border }}>
          <div className="text-[10px] font-bold tracking-widest uppercase mb-2" style={{ color: systemColors.navyMuted }}>
            In practice — the sequence
          </div>
          {/* Same chip styling as the ingredient rows; one scrollable line */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {cookingFlow!.map((step, index) => (
              <span key={index} className="flex items-center gap-1.5 flex-none">
                <span
                  className="text-[13px] px-2.5 py-1 rounded-md font-medium whitespace-nowrap"
                  style={{
                    backgroundColor: systemColors.herbLight,
                    color: systemColors.navy,
                    borderLeft: `3px solid ${colors.primary}`,
                  }}
                >
                  {step.action}
                </span>
                {index < cookingFlow!.length - 1 && (
                  <span className="text-xs flex-none" style={{ color: systemColors.navyMuted }}>→</span>
                )}
              </span>
            ))}
          </div>
        </div>
      )}

      {hasAxes && (
        <div className="flex flex-wrap gap-x-3 gap-y-1 mt-3 pt-2 border-t" style={{ borderColor: systemColors.border }}>
          {FLAVOR_AXIS_IDS.map(axis => (
            <span key={axis} className="inline-flex items-center gap-1 text-[11px] font-medium" style={{ color: systemColors.navyMuted }}>
              <span className="inline-block w-2 h-2 rounded-full" style={{ backgroundColor: FLAVOR_AXIS_META[axis].color }} />
              {FLAVOR_AXIS_META[axis].label}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
