import { useMemo, useState } from 'react';
import { systemColors } from '../data/systemColors';
import { getCountryById } from '../data/countries';
import { useTasteSurvey, type SurveyAnswer, type SurveySentiment } from '../hooks/useTasteSurvey';
import { useDishes } from '../hooks/useDishes';
import { dishVerdictRating } from '../utils/ratings';
import { findDishForAnswer } from '../utils/surveyDishes';

const OPTIONS: { sentiment: SurveySentiment; emoji: string; label: string }[] = [
  { sentiment: 'love', emoji: '😍', label: 'Love' },
  { sentiment: 'like', emoji: '🙂', label: 'Like' },
  { sentiment: 'nope', emoji: '😕', label: 'Nope' },
  { sentiment: 'skip', emoji: '🤔', label: "Haven't tried" },
];

const OPTION_BY_SENTIMENT = Object.fromEntries(OPTIONS.map(o => [o.sentiment, o])) as Record<
  SurveySentiment,
  (typeof OPTIONS)[number]
>;

interface CountryGroup {
  countryId: string;
  countryName: string;
  answers: SurveyAnswer[];
}

/**
 * Review and change taste-survey answers (#6), grouped by country. Changes go
 * through the same answers the survey writes, so the tried-dish reconcile
 * (#34) logs or un-logs the dish to match.
 */
export function SurveyAnswersEditor() {
  const { answers, setAnswer, clearAnswer } = useTasteSurvey();
  const { dishes } = useDishes();
  const [openKey, setOpenKey] = useState<string | null>(null);

  const groups = useMemo<CountryGroup[]>(() => {
    const byCountry = new Map<string, CountryGroup>();
    answers.forEach(a => {
      const group = byCountry.get(a.countryId) ?? {
        countryId: a.countryId,
        countryName: getCountryById(a.countryId)?.name ?? a.countryId,
        answers: [],
      };
      group.answers.push(a);
      byCountry.set(a.countryId, group);
    });
    return [...byCountry.values()].sort((a, b) => a.countryName.localeCompare(b.countryName));
  }, [answers]);

  if (answers.length === 0) return null;

  return (
    <details className="mt-4 pt-4 border-t border-gray-100 group">
      <summary
        className="flex items-center justify-between min-h-[44px] cursor-pointer select-none list-none [&::-webkit-details-marker]:hidden"
        style={{ color: systemColors.navy }}
      >
        <span className="text-sm font-medium">Your survey answers</span>
        <span className="text-xs" style={{ color: systemColors.navyMuted }}>
          {answers.length} · <span className="group-open:hidden">Edit</span><span className="hidden group-open:inline">Done</span>
        </span>
      </summary>

      <p className="text-[11px] mb-2" style={{ color: systemColors.navyMuted }}>
        Love, Like and Nope count a dish as tried. A star rating you give a dish counts instead of its answer.
      </p>

      <div className="space-y-3">
        {groups.map(group => (
          <section key={group.countryId}>
            <h5
              className="text-[11px] font-semibold uppercase tracking-wide mb-1"
              style={{ color: systemColors.navyMuted }}
            >
              {group.countryName}
            </h5>
            <ul
              className="rounded-xl border divide-y overflow-hidden"
              style={{ backgroundColor: systemColors.surface, borderColor: systemColors.border }}
            >
              {group.answers.map(a => {
                const key = `${a.countryId}:${a.dishName}`;
                const open = openKey === key;
                const current = OPTION_BY_SENTIMENT[a.sentiment];
                const dish = findDishForAnswer(dishes, a.countryId, a.dishName);
                const verdict = dish ? dishVerdictRating(dish) : undefined;
                return (
                  <li key={key} style={{ borderColor: systemColors.border }}>
                    <button
                      onClick={() => setOpenKey(open ? null : key)}
                      aria-expanded={open}
                      className="w-full min-h-[44px] flex items-center gap-2 px-3 py-2 text-left"
                    >
                      <span className="flex-1 min-w-0">
                        <span className="block text-sm truncate" style={{ color: systemColors.navy }}>
                          {a.dishName}
                        </span>
                        {verdict !== undefined && (
                          <span className="block text-[11px]" style={{ color: systemColors.navyMuted }}>
                            Rated <span style={{ color: systemColors.saffron }}>{'★'.repeat(Math.round(verdict))}</span>. Your rating counts
                          </span>
                        )}
                      </span>
                      <span
                        className="flex-none text-xs font-medium px-2 py-1 rounded-full"
                        style={{
                          backgroundColor: a.sentiment === 'skip' ? systemColors.seaSalt : systemColors.tomatoLight,
                          color: systemColors.navy,
                        }}
                      >
                        {current.emoji} {current.label}
                      </span>
                    </button>

                    {open && (
                      <div className="px-3 pb-3">
                        <div className="grid grid-cols-4 gap-1.5">
                          {OPTIONS.map(opt => {
                            const selected = opt.sentiment === a.sentiment;
                            return (
                              <button
                                key={opt.sentiment}
                                onClick={() => { setAnswer(a.countryId, a.dishName, opt.sentiment); setOpenKey(null); }}
                                aria-pressed={selected}
                                className="btn-press min-h-[44px] rounded-lg border px-1 py-1.5 text-[11px] font-medium leading-tight"
                                style={{
                                  borderColor: selected ? systemColors.tomato : systemColors.border,
                                  backgroundColor: selected ? systemColors.tomatoLight : systemColors.surface,
                                  color: systemColors.navy,
                                }}
                              >
                                <span className="block text-base leading-none mb-0.5">{opt.emoji}</span>
                                {opt.label}
                              </button>
                            );
                          })}
                        </div>
                        <button
                          onClick={() => { clearAnswer(a.countryId, a.dishName); setOpenKey(null); }}
                          className="mt-1 min-h-[44px] text-xs font-medium"
                          style={{ color: systemColors.tomato }}
                        >
                          Clear answer
                        </button>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>
    </details>
  );
}
