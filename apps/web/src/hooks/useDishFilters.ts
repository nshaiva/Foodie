import { useMemo, useState } from 'react';
import type { Beverage, DietaryInfo, Dish } from '../data/types';

export type ViewFilter = 'all' | 'tried' | 'want';
export type SpiceFilter = 'any' | 'mild' | 'medium' | 'hot';
export type PopFilter = 'any' | 'local-favorite' | 'tourist-classic';
export type BevFilter = 'any' | 'alcoholic' | 'non-alcoholic';
export type ServedFilter = 'any' | 'hot' | 'cold';

/**
 * Dish and drink filtering for the country page.
 *
 * Lifted wholesale from the old Eat & Drink slide, which kept this state and
 * these predicates inline. One behavioural change: the slide had separate food
 * and drink *modes*, so a food-only filter simply didn't apply to drinks. The
 * unified page shows both at once, which made that a bug — filtering for "hot"
 * returned every pot of tea. Food-only filters now exclude drinks outright, and
 * drink-only filters exclude food.
 */
export function useDishFilters() {
  const [query, setQuery] = useState('');
  const [view, setView] = useState<ViewFilter>('all');
  const [diet, setDiet] = useState({ veg: false, vegan: false, gf: false });
  const [spice, setSpice] = useState<SpiceFilter>('any');
  const [popularity, setPopularity] = useState<PopFilter>('any');
  const [dessertOnly, setDessertOnly] = useState(false);
  const [bevType, setBevType] = useState<BevFilter>('any');
  const [served, setServed] = useState<ServedFilter>('any');
  const [drawerOpen, setDrawerOpen] = useState(false);

  const dietMatch = (d?: DietaryInfo) =>
    (!diet.veg || !!(d?.isVegetarian || d?.isVegan)) &&
    (!diet.vegan || !!d?.isVegan) &&
    (!diet.gf || !!d?.isGlutenFree);

  const foodOnlyActive = spice !== 'any' || popularity !== 'any' || dessertOnly;
  const drinkOnlyActive = bevType !== 'any' || served !== 'any';

  const matchesText = (name: string, english?: string, extra?: string[]) => {
    if (!query.trim()) return true;
    const q = query.trim().toLowerCase();
    return (
      name.toLowerCase().includes(q) ||
      !!english?.toLowerCase().includes(q) ||
      !!extra?.some(e => e.toLowerCase().includes(q))
    );
  };

  const matchesDish = (dish: Dish) => {
    if (drinkOnlyActive) return false;
    if (spice !== 'any') {
      const level = dish.spiceLevel;
      if (!level) return false;
      if (spice === 'mild' && !(level === 'none' || level === 'mild')) return false;
      if (spice === 'medium' && level !== 'medium') return false;
      if (spice === 'hot' && !(level === 'hot' || level === 'very-hot')) return false;
    }
    if (popularity !== 'any' && dish.popularity !== popularity) return false;
    if (dessertOnly && dish.category !== 'dessert') return false;
    if (!dietMatch(dish.dietary)) return false;
    return matchesText(dish.name, dish.englishName, [
      ...(dish.keyTraits ?? []),
      dish.regionalOrigin ?? '',
    ]);
  };

  const matchesBeverage = (bev: Beverage) => {
    if (foodOnlyActive) return false;
    if (bevType !== 'any' && bev.type !== 'both' && bev.type !== bevType) return false;
    if (served !== 'any') {
      const how = bev.servedHow;
      if (!how) return false;
      if (served === 'hot' && how !== 'hot') return false;
      if (served === 'cold' && !(how === 'cold' || how === 'iced')) return false;
    }
    if (!dietMatch(bev.dietary)) return false;
    return matchesText(bev.name, bev.englishName, [bev.regionalOrigin ?? '']);
  };

  /** Custom user entries carry no metadata, so any refinement hides them. */
  const refinementActive =
    foodOnlyActive || drinkOnlyActive || diet.veg || diet.vegan || diet.gf;

  const activeFilterCount = useMemo(
    () =>
      [
        diet.veg,
        diet.vegan,
        diet.gf,
        spice !== 'any',
        popularity !== 'any',
        dessertOnly,
        bevType !== 'any',
        served !== 'any',
      ].filter(Boolean).length,
    [diet, spice, popularity, dessertOnly, bevType, served]
  );

  const reset = () => {
    setQuery('');
    setView('all');
    setDiet({ veg: false, vegan: false, gf: false });
    setSpice('any');
    setPopularity('any');
    setDessertOnly(false);
    setBevType('any');
    setServed('any');
  };

  return {
    query, setQuery,
    view, setView,
    diet, setDiet,
    spice, setSpice,
    popularity, setPopularity,
    dessertOnly, setDessertOnly,
    bevType, setBevType,
    served, setServed,
    drawerOpen, setDrawerOpen,
    matchesDish, matchesBeverage, matchesText,
    refinementActive, activeFilterCount, reset,
  };
}

export type DishFilters = ReturnType<typeof useDishFilters>;
