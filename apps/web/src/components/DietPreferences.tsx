import { useDietPrefs, type DietPrefs, type PrefLevel } from '../hooks/useDietPrefs';
import { systemColors } from '../data/systemColors';

const LEVELS: { value: PrefLevel; label: string }[] = [
  { value: 'off', label: 'Off' },
  { value: 'prefer', label: 'Prefer' },
  { value: 'only', label: 'Only' },
];

function Segmented<T extends string>({ value, options, onChange, activeColor }: {
  value: T;
  options: { value: T; label: string }[];
  onChange: (v: T) => void;
  activeColor: string;
}) {
  return (
    <div className="inline-flex rounded-full border overflow-hidden flex-none" style={{ borderColor: systemColors.border }}>
      {options.map(opt => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={`px-2.5 py-1 text-xs font-semibold ${value === opt.value ? 'transition-colors' : 'btn-press'}`}
          style={value === opt.value
            ? { backgroundColor: activeColor, color: '#fff' }
            : { backgroundColor: '#fff', color: systemColors.navyMuted }}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

function PrefRow({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3 py-1.5">
      <div className="min-w-0">
        <span className="text-sm font-medium" style={{ color: systemColors.navy }}>{label}</span>
        {hint && <span className="block text-[11px]" style={{ color: systemColors.navyMuted }}>{hint}</span>}
      </div>
      {children}
    </div>
  );
}

/**
 * Food preferences & restrictions — lives in the taste profile, editable
 * anytime. Feeds dish ranking (at-the-restaurant view) quietly; not every
 * preference needs a visual on the dish cards.
 */
export function DietPreferences() {
  const { prefs, update } = useDietPrefs();
  const herb = systemColors.herb;

  const level = (key: keyof Pick<DietPrefs, 'vegetarian' | 'vegan' | 'pescatarian' | 'glutenFree' | 'dairyFree'>) => (
    <Segmented value={prefs[key]} options={LEVELS} onChange={(v) => update({ [key]: v })} activeColor={herb} />
  );

  return (
    <div className="mt-4 pt-4 border-t border-gray-100">
      <h4 className="text-sm font-medium text-gray-700 mb-1">Food preferences</h4>
      <p className="text-[11px] mb-2" style={{ color: systemColors.navyMuted }}>
        "Prefer" nudges rankings your way; "Only" filters hard. Change these anytime.
      </p>

      <PrefRow label="Vegetarian">{level('vegetarian')}</PrefRow>
      <PrefRow label="Vegan">{level('vegan')}</PrefRow>
      <PrefRow label="Pescatarian" hint="Veggie + seafood">{level('pescatarian')}</PrefRow>
      <PrefRow label="Gluten-free">{level('glutenFree')}</PrefRow>
      <PrefRow label="Dairy-free">{level('dairyFree')}</PrefRow>
      <PrefRow label="Red meat">
        <Segmented
          value={prefs.redMeat}
          options={[
            { value: 'off', label: 'Off' },
            { value: 'prefer', label: 'Prefer' },
            { value: 'avoid', label: 'Avoid' },
          ]}
          onChange={(v) => update({ redMeat: v })}
          activeColor={herb}
        />
      </PrefRow>
      <PrefRow label="Spice" hint="Your happy zone">
        <Segmented
          value={prefs.spice}
          options={[
            { value: 'any', label: 'Any' },
            { value: 'mild', label: '🌶️' },
            { value: 'medium', label: '🌶️🌶️' },
            { value: 'hot', label: '🌶️🌶️🌶️' },
          ]}
          onChange={(v) => update({ spice: v })}
          activeColor={herb}
        />
      </PrefRow>

      <textarea
        value={prefs.notes}
        onChange={(e) => update({ notes: e.target.value })}
        rows={2}
        placeholder="Anything else — allergies, aversions, loves…"
        className="w-full mt-2 px-2.5 py-2 text-sm border rounded-md focus:outline-none focus:ring-2"
        style={{ borderColor: systemColors.border, '--tw-ring-color': herb } as React.CSSProperties}
      />
    </div>
  );
}
