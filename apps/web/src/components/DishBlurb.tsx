import { systemColors } from '../data/systemColors';
import type { Beverage, Country, DietaryInfo, Dish } from '../data/types';
import { DishImage } from './explore/DishTile';
import { resolveRegion } from '../utils/dishRegion';
import { regionLabelName } from '../utils/regionAreas';

/**
 * A dish or drink shown the way Explore's detail shows it (#39): image
 * first, then "category · region", the description, and text chips with a
 * tone. Used wherever a row or card opens up so a dish looks the same in
 * every view. The image box is Explore's `DishImage`: the illustration when
 * a dish has one, the country-tinted plate placeholder when it doesn't.
 */

const SPICE_LABEL: Record<string, string> = { mild: 'Mild heat', medium: 'Medium heat', hot: 'Hot', 'very-hot': 'Very hot' };
const CATEGORY_LABEL: Record<string, string> = { 'street-food': 'Street food' };
const label = (c?: string) => (c ? CATEGORY_LABEL[c] ?? c.charAt(0).toUpperCase() + c.slice(1) : undefined);

type Tone = 'heat' | 'diet' | 'plain';
const TONE: Record<Tone, { bg: string; fg: string }> = {
  heat: { bg: '#F6E3DF', fg: '#8E2B1F' },
  diet: { bg: systemColors.herbLight, fg: '#3E5A3B' },
  plain: { bg: '#F1ECE2', fg: systemColors.navyLight },
};

function dietChips(d?: DietaryInfo): [string, Tone][] {
  if (!d) return [];
  const out: [string, Tone][] = [];
  if (d.isVegan) out.push(['Vegan', 'diet']);
  else if (d.isVegetarian) out.push(['Vegetarian', 'diet']);
  else if (d.isVegetarianFriendly) out.push(['Vegetarian option', 'diet']);
  if (d.isGlutenFree) out.push(['Gluten-free', 'diet']);
  if (d.isDairyFree && !d.isVegan) out.push(['Dairy-free', 'diet']);
  return out;
}

function dishChips(dish: Dish): [string, Tone][] {
  const out: [string, Tone][] = [];
  if (dish.spiceLevel && dish.spiceLevel !== 'none') out.push([SPICE_LABEL[dish.spiceLevel], 'heat']);
  if (dish.popularity === 'local-favorite') out.push(['Local favorite', 'plain']);
  if (dish.popularity === 'tourist-classic') out.push(['Tourist classic', 'plain']);
  if (dish.isStreetFood && dish.category !== 'street-food') out.push(['Street food', 'plain']);
  return [...out, ...dietChips(dish.dietary)];
}

function drinkChips(drink: Beverage): [string, Tone][] {
  const out: [string, Tone][] = [];
  out.push([drink.type === 'alcoholic' ? 'Alcoholic' : drink.type === 'both' ? 'Alcohol optional' : 'No alcohol', 'plain']);
  if (drink.servedHow) out.push([drink.servedHow === 'room temperature' ? 'Room temperature' : `Served ${drink.servedHow}`, 'plain']);
  if (drink.isStreetDrink) out.push(['Street drink', 'plain']);
  return [...out, ...dietChips(drink.dietary)];
}

export function DishBlurb({ item, kind, country, children }: {
  item: Dish | Beverage;
  kind: 'dish' | 'drink';
  country: Country;
  /** Anything to show under the description (why it ranks here, etc.) */
  children?: React.ReactNode;
}) {
  const m = resolveRegion(item, country.regionalVariations, country.id);
  const region =
    m.kind === 'region' ? regionLabelName(m.region.name)
    : m.kind === 'orphan' ? m.origin
    : `Across ${country.name}`;
  const meta = [label(item.category), region].filter(Boolean).join(' · ');
  const chips = kind === 'dish' ? dishChips(item as Dish) : drinkChips(item as Beverage);

  return (
    <div className="flex flex-col gap-3">
      <DishImage name={item.name} image={item.image} colors={country.colorPalette} glass={kind === 'drink'} plate={64} zoom={1.35} className="w-full h-[150px] rounded-xl">
        {item.image && (
          <span className="absolute left-3 bottom-2.5 px-2 py-0.5 rounded text-[11px] font-semibold uppercase tracking-[0.04em]" style={{ backgroundColor: 'rgba(255,255,255,0.85)', color: systemColors.navyLight }}>Illustration</span>
        )}
      </DishImage>
      <div className="flex flex-col gap-2">
        <div className="text-[13px]" style={{ color: systemColors.navyMuted }}>{meta}</div>
        {item.tagline && <p className="text-[15px] font-medium leading-snug" style={{ color: systemColors.navyLight }}>{item.tagline}</p>}
        {chips.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {chips.map(([text, tone]) => (
              <span key={text} className="px-2.5 py-1 rounded text-[13px] font-semibold" style={{ backgroundColor: TONE[tone].bg, color: TONE[tone].fg }}>{text}</span>
            ))}
          </div>
        )}
        <p className="text-[15px] leading-relaxed" style={{ color: systemColors.navyLight }}>{item.description}</p>
        {children}
      </div>
    </div>
  );
}
