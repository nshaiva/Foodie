import { PlateDot } from '../Wordmark';
import { UnifiedDishCard } from './UnifiedDishCard';
import { ExpandableText } from '../ExpandableText';
import { FavoriteButton } from '../FavoriteButton';
import { WantToTryButton } from '../WantToTryButton';
import { bevTypeChip, dessertChip, dietaryChips, popularityChip, servedChip, spiceChip } from '../dishChips';
import { DISH_CATEGORY_COLORS } from '../../data/categoryMeta';
import { systemColors } from '../../data/systemColors';
import type { RestaurantTry, UserDish } from '../../data/types';
import type { Entry } from '../../utils/groupDishes';

export interface EntryGridActions {
  countryId: string;
  onAddDish: (input: { countryId: string; name: string; kind?: 'food' | 'drink' }) => void;
  onUpdateDish: (id: string, updates: Partial<UserDish>) => void;
  onDeleteDish: (id: string) => void;
  onAddRestaurantTry: (dishId: string, entry: Omit<RestaurantTry, 'id'>) => void;
  onUpdateRestaurantTry: (dishId: string, tryId: string, updates: Partial<RestaurantTry>) => void;
  onDeleteRestaurantTry: (dishId: string, tryId: string) => void;
  isOnWishlist: (countryId: string, dishName: string) => boolean;
  isFavorite: (countryId: string, dishName: string) => boolean;
  addToWishlist: (item: { countryId: string; dishName: string; englishName?: string }) => void;
  removeFromWishlist: (id: string) => void;
  findWishlistItem: (countryId: string, dishName: string) => { id: string } | undefined;
  addToFavorites: (item: { countryId: string; dishName: string; englishName?: string }) => void;
  removeFromFavorites: (id: string) => void;
  findFavoriteItem: (countryId: string, dishName: string) => { id: string } | undefined;
}

function label(category?: string) {
  if (!category) return undefined;
  return category === 'street-food' ? 'Street food' : category.charAt(0).toUpperCase() + category.slice(1);
}

/**
 * Renders a list of entries as cards.
 *
 * The card shell (`UnifiedDishCard`) is unchanged from the old Eat & Drink slide
 * — it still owns tried state, the star-rating prompt, and restaurant tries.
 * This only supplies the body and the corner actions, so dishes, drinks and
 * a user's own logged entries can share one grid.
 */
export function EntryGrid({
  entries, actions, regionLabelFor, trailing,
}: {
  entries: Entry[];
  actions: EntryGridActions;
  regionLabelFor: (entry: Entry) => string | undefined;
  trailing?: React.ReactNode;
}) {
  const a = actions;
  const crud = {
    onUpdateDish: a.onUpdateDish,
    onDeleteDish: a.onDeleteDish,
    onAddRestaurantTry: a.onAddRestaurantTry,
    onUpdateRestaurantTry: a.onUpdateRestaurantTry,
    onDeleteRestaurantTry: a.onDeleteRestaurantTry,
  };

  const corner = (name: string, englishName?: string) => (
    <>
      <FavoriteButton
        isFavorite={a.isFavorite(a.countryId, name)}
        onAdd={() => a.addToFavorites({ countryId: a.countryId, dishName: name, englishName })}
        onRemove={() => { const i = a.findFavoriteItem(a.countryId, name); if (i) a.removeFromFavorites(i.id); }}
        compact
      />
      <WantToTryButton
        isOnWishlist={a.isOnWishlist(a.countryId, name)}
        onAdd={() => a.addToWishlist({ countryId: a.countryId, dishName: name, englishName })}
        onRemove={() => { const i = a.findWishlistItem(a.countryId, name); if (i) a.removeFromWishlist(i.id); }}
        compact
      />
    </>
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {entries.map(entry => {
        if (entry.kind === 'dish') {
          const { dish } = entry;
          const meta = [
            regionLabelFor(entry),
            label(dish.category),
            dish.isStreetFood && dish.category !== 'street-food' ? 'Street food' : undefined,
          ].filter(Boolean).join(' · ');
          return (
            <UnifiedDishCard
              key={entry.key}
              tried={entry.tried}
              onTryThis={() => a.onAddDish({ countryId: a.countryId, name: dish.name })}
              cornerActions={corner(dish.name, dish.englishName)}
              {...crud}
            >
              <div className="mb-2"><PlateDot color={DISH_CATEGORY_COLORS[dish.category] || systemColors.navy} size={20} /></div>
              <h4 className="font-bold text-gray-900 pr-12 leading-tight">{dish.name}</h4>
              {dish.englishName && <p className="text-xs text-gray-400">{dish.englishName}</p>}
              <p className="text-xs text-gray-400 mb-1">{meta}</p>
              <ExpandableText text={dish.description} />
              <div className="flex flex-wrap gap-1.5 mt-3">
                {popularityChip(dish.popularity)}
                {dessertChip(dish.category)}
                {spiceChip(dish.spiceLevel)}
                {dietaryChips(dish.dietary)}
              </div>
            </UnifiedDishCard>
          );
        }

        if (entry.kind === 'drink') {
          const { drink } = entry;
          const meta = [regionLabelFor(entry), label(drink.category)].filter(Boolean).join(' · ');
          return (
            <UnifiedDishCard
              key={entry.key}
              tried={entry.tried}
              onTryThis={() => a.onAddDish({ countryId: a.countryId, name: drink.name, kind: 'drink' })}
              cornerActions={corner(drink.name, drink.englishName)}
              {...crud}
            >
              <div className="mb-2"><PlateDot color={systemColors.herb} size={20} /></div>
              <h4 className="font-bold text-gray-900 pr-12 leading-tight">{drink.name}</h4>
              {drink.englishName && <p className="text-xs text-gray-400">{drink.englishName}</p>}
              <p className="text-xs text-gray-400 mb-1">{meta}</p>
              <ExpandableText text={drink.description} />
              <div className="flex flex-wrap gap-1.5 mt-3">
                {bevTypeChip(drink.type)}
                {servedChip(drink.servedHow)}
                {dietaryChips(drink.dietary)}
              </div>
            </UnifiedDishCard>
          );
        }

        const ud = entry.userDish;
        return (
          <UnifiedDishCard key={entry.key} tried={ud} isCustom {...crud}>
            <div className="mb-2"><PlateDot color={systemColors.herb} size={20} /></div>
            <h4 className="font-bold text-gray-900 pr-12 leading-tight">{ud.name}</h4>
            <div className="flex flex-wrap gap-1.5 mt-2">
              <span className="text-xs px-2 py-0.5 rounded-md" style={{ backgroundColor: systemColors.herbLight, color: systemColors.navy }}>
                My dish
              </span>
              {ud.region && (
                <span className="text-xs px-2 py-0.5 rounded-md" style={{ backgroundColor: systemColors.herbLight, color: systemColors.navy }}>
                  {ud.region}
                </span>
              )}
            </div>
          </UnifiedDishCard>
        );
      })}
      {trailing}
    </div>
  );
}
