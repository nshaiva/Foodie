import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { getCountryById } from '../data/countries';
import { systemColors } from '../data/systemColors';
import { usePersonalFlavorProfile } from '../hooks/usePersonalFlavorProfile';
import { useDishes } from '../hooks/useDishes';
import { computeAllFlavorMatches } from './map/flavorMatch';
import { PlateDot } from './Wordmark';

/**
 * "Where next?" (#1) — top flavor-matched countries you haven't logged yet.
 * The mobile answer to the question the desktop map's flavor layer answers;
 * hidden until the taste profile has enough data.
 */
export function NextCountrySuggestions() {
  const { personalFlavor, hasEnoughData } = usePersonalFlavorProfile();
  const { dishes } = useDishes();

  const suggestions = useMemo(() => {
    if (!hasEnoughData || !personalFlavor) return [];
    const explored = new Set(dishes.map(d => d.countryId));
    const matches = computeAllFlavorMatches(personalFlavor);
    return [...matches.entries()]
      .filter(([id]) => !explored.has(id))
      .sort((a, b) => b[1].score - a[1].score)
      .slice(0, 3)
      .map(([id, match]) => ({ country: getCountryById(id)!, match }))
      .filter(s => s.country);
  }, [hasEnoughData, personalFlavor, dishes]);

  if (suggestions.length === 0) return null;

  return (
    <section className="mb-6">
      <h3 className="text-sm font-semibold uppercase tracking-wide mb-2" style={{ color: systemColors.navyMuted }}>
        Where next, by your taste
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        {suggestions.map(({ country, match }) => (
          <Link
            key={country.id}
            to={`/country/${country.id}`}
            className="card-interactive-sm flex items-center gap-3 bg-white rounded-xl border px-4 py-3"
            style={{ borderColor: systemColors.border }}
          >
            <PlateDot color={country.colorPalette.primary} size={16} />
            <span className="flex-1 min-w-0">
              <span className="block font-semibold text-sm" style={{ color: systemColors.navy }}>
                {country.name}
              </span>
              <span className="block text-xs truncate" style={{ color: systemColors.navyMuted }}>
                {match.topAxes.length > 0 ? `big on ${match.topAxes.join(' & ')}, like you` : country.cuisineProfile.flavorProfile[0]}
              </span>
            </span>
            <span className="flex-none text-sm font-bold" style={{ color: systemColors.tomato }}>
              {match.score}%
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
