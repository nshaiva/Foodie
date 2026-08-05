import { useState, useMemo, useEffect } from 'react';
import { systemColors } from '../data/systemColors';
import { getSurveyDishes, useTasteSurvey, type SurveySentiment } from '../hooks/useTasteSurvey';
import { useWishlist } from '../hooks/useWishlist';

interface TasteSurveyProps {
  onClose: () => void;
}

const SENTIMENT_BUTTONS: { sentiment: Exclude<SurveySentiment, 'skip'>; emoji: string; label: string }[] = [
  { sentiment: 'love', emoji: '😍', label: 'Love it' },
  { sentiment: 'like', emoji: '🙂', label: 'Like it' },
  { sentiment: 'nope', emoji: '😕', label: 'Not for me' },
];

const SPICE_DOTS: Record<string, number> = {
  none: 0, mild: 1, medium: 2, hot: 3, 'very-hot': 4,
};

export function TasteSurvey({ onClose }: TasteSurveyProps) {
  const deck = useMemo(() => getSurveyDishes(), []);
  const { answers, setAnswer, getAnswer } = useTasteSurvey();
  const { addToWishlist, isOnWishlist } = useWishlist();

  // Start at the first unanswered question
  const [index, setIndex] = useState(() => {
    const first = deck.findIndex(s => !answers.some(
      a => a.countryId === s.countryId && a.dishName === s.dish.name
    ));
    return first === -1 ? deck.length : first;
  });
  const [showHaventTried, setShowHaventTried] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const answeredCount = answers.length;
  const done = index >= deck.length;
  const current = done ? null : deck[index];
  const currentAnswer = current ? getAnswer(current.countryId, current.dish.name) : undefined;

  const advance = () => {
    setShowHaventTried(false);
    setIndex(i => i + 1);
  };

  const answer = (sentiment: SurveySentiment) => {
    if (!current) return;
    setAnswer(current.countryId, current.dish.name, sentiment);
    advance();
  };

  const wantToTry = () => {
    if (!current) return;
    if (!isOnWishlist(current.countryId, current.dish.name)) {
      addToWishlist({
        countryId: current.countryId,
        dishName: current.dish.name,
        englishName: current.dish.englishName,
      });
    }
    answer('skip');
  };

  const spiceDots = current?.dish.spiceLevel ? SPICE_DOTS[current.dish.spiceLevel] : 0;

  return (
    <div
      role="dialog"
      aria-label="Taste survey"
      className="fixed inset-0 z-[60] flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(43,32,24,0.55)' }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-xl shadow-2xl overflow-hidden"
        style={{ backgroundColor: systemColors.seaSalt }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header: progress */}
        <div className="px-5 pt-4 pb-3" style={{ backgroundColor: systemColors.surface }}>
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-bold text-sm" style={{ color: systemColors.navy }}>
              Taste Survey
            </h2>
            <div className="flex items-center gap-3">
              <span className="text-xs" style={{ color: systemColors.navyMuted }}>
                {Math.min(index + 1, deck.length)} of {deck.length}
              </span>
              <button
                onClick={onClose}
                aria-label="Close survey"
                className="text-xl leading-none"
                style={{ color: systemColors.navyMuted }}
              >
                ×
              </button>
            </div>
          </div>
          <div className="h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: systemColors.border }}>
            <div
              className="h-full rounded-full transition-all duration-300"
              style={{
                width: `${(index / deck.length) * 100}%`,
                backgroundColor: systemColors.tomato,
              }}
            />
          </div>
        </div>

        {done ? (
          /* Completion state */
          <div className="p-8 text-center">
            <div className="text-4xl mb-3">✦</div>
            <h3 className="font-semibold mb-1" style={{ color: systemColors.navy }}>
              That's the whole deck!
            </h3>
            <p className="text-sm mb-5" style={{ color: systemColors.navyMuted }}>
              {answeredCount} answer{answeredCount !== 1 ? 's' : ''} are now shaping your Flavor Fingerprint.
            </p>
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-md text-sm text-white"
              style={{ backgroundColor: systemColors.tomato }}
            >
              See my profile
            </button>
          </div>
        ) : current && (
          <>
            {/* Dish card */}
            <div className="px-6 py-5">
              <div className="flex items-center gap-2 mb-3">
                <span
                  className="text-xs px-2 py-0.5 rounded-full font-medium"
                  style={{ backgroundColor: systemColors.saffronLight, color: systemColors.navy }}
                >
                  {current.countryName}
                </span>
                {spiceDots > 0 && (
                  <span className="text-xs" style={{ color: systemColors.tomato }}>
                    {'🌶'.repeat(spiceDots)}
                  </span>
                )}
                {currentAnswer && (
                  <span className="text-xs ml-auto" style={{ color: systemColors.navyMuted }}>
                    previously: {currentAnswer.sentiment === 'skip' ? 'skipped' : currentAnswer.sentiment}
                  </span>
                )}
              </div>

              <h3 className="text-xl font-bold" style={{ color: systemColors.navy }}>
                {current.dish.name}
              </h3>
              {current.dish.englishName && current.dish.englishName !== current.dish.name && (
                <p className="text-sm mb-1" style={{ color: systemColors.navyMuted }}>
                  {current.dish.englishName}
                </p>
              )}
              <p className="text-sm mt-2 leading-relaxed line-clamp-3" style={{ color: systemColors.navyMuted }}>
                {current.dish.description}
              </p>

              {current.dish.keyTraits && current.dish.keyTraits.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {current.dish.keyTraits.map(trait => (
                    <span
                      key={trait}
                      className="text-xs px-2 py-0.5 rounded"
                      style={{ backgroundColor: systemColors.herbLight, color: systemColors.navy }}
                    >
                      {trait}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Answer buttons */}
            <div className="px-6 pb-6">
              {showHaventTried ? (
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={wantToTry}
                    className="py-3 rounded-lg text-sm font-medium border transition-colors"
                    style={{
                      borderColor: systemColors.saffron,
                      color: systemColors.saffron,
                      backgroundColor: systemColors.saffronLight,
                    }}
                  >
                    🔖 Want to try it!
                  </button>
                  <button
                    onClick={() => answer('skip')}
                    className="py-3 rounded-lg text-sm font-medium border transition-colors"
                    style={{ borderColor: systemColors.border, color: systemColors.navyMuted }}
                  >
                    Not interested
                  </button>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-3 gap-2 mb-2">
                    {SENTIMENT_BUTTONS.map(({ sentiment, emoji, label }) => (
                      <button
                        key={sentiment}
                        onClick={() => answer(sentiment)}
                        className="py-3 rounded-lg text-sm font-medium border transition-all hover:scale-[1.03]"
                        style={{
                          borderColor: currentAnswer?.sentiment === sentiment ? systemColors.tomato : systemColors.border,
                          backgroundColor: currentAnswer?.sentiment === sentiment ? systemColors.tomatoLight : systemColors.surface,
                          color: systemColors.navy,
                        }}
                      >
                        <span className="block text-lg mb-0.5">{emoji}</span>
                        {label}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => setShowHaventTried(true)}
                    className="w-full py-2 rounded-lg text-sm border transition-colors"
                    style={{ borderColor: systemColors.border, color: systemColors.navyMuted }}
                  >
                    🤔 Haven't tried it
                  </button>
                </>
              )}

              {/* Nav */}
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => { setShowHaventTried(false); setIndex(i => Math.max(0, i - 1)); }}
                  disabled={index === 0}
                  className="text-xs disabled:opacity-30"
                  style={{ color: systemColors.navyMuted }}
                >
                  ← Back
                </button>
                <button
                  onClick={advance}
                  className="text-xs"
                  style={{ color: systemColors.navyMuted }}
                >
                  Skip →
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
