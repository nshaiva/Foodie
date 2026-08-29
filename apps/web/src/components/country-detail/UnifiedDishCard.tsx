import { useState, useEffect } from 'react';
import { RestaurantTryForm } from '../RestaurantTryForm';
import { systemColors } from '../../data/systemColors';
import { dishVerdictRating, isDerivedRating, ratedTryCount } from '../../utils/ratings';
import type { UserDish, RestaurantTry } from '../../data/types';

interface UnifiedDishCardProps {
  /** Logged entry for this dish, if the user has tried it */
  tried?: UserDish;
  /** Whether this card is a user-created dish (not in the popular list) */
  isCustom?: boolean;
  /** Card body: emoji, name, description, chips — rendered by the parent */
  children: React.ReactNode;
  /** Top-right action icons (favorite / want-to-try), popular dishes only */
  cornerActions?: React.ReactNode;
  onTryThis?: () => void;
  onUpdateDish: (id: string, data: Partial<UserDish>) => void;
  onDeleteDish: (id: string) => void;
  onAddRestaurantTry: (dishId: string, data: Omit<RestaurantTry, 'id'>) => void;
  onUpdateRestaurantTry: (dishId: string, tryId: string, data: Partial<RestaurantTry>) => void;
  onDeleteRestaurantTry: (dishId: string, tryId: string) => void;
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function RatingStars({ rating }: { rating: number }) {
  return (
    <span className="text-sm tracking-wide" style={{ color: systemColors.saffron }}>
      {'★'.repeat(rating)}
      <span style={{ color: systemColors.border }}>{'★'.repeat(5 - rating)}</span>
    </span>
  );
}

export function UnifiedDishCard({
  tried,
  isCustom = false,
  children,
  cornerActions,
  onTryThis,
  onUpdateDish,
  onDeleteDish,
  onAddRestaurantTry,
  onUpdateRestaurantTry,
  onDeleteRestaurantTry,
}: UnifiedDishCardProps) {
  const [showTries, setShowTries] = useState(false);
  const [showAddTry, setShowAddTry] = useState(false);
  const [editingTryId, setEditingTryId] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState('');
  const [editNotes, setEditNotes] = useState('');
  const [editRating, setEditRating] = useState(0);
  const [justTried, setJustTried] = useState(false);
  // True while the edit panel is the auto-opened first-log prompt; canceling
  // that one un-logs the dish instead of leaving an accidental unrated entry
  const [isInitialPrompt, setIsInitialPrompt] = useState(false);

  // "+ I tried this" flows straight into the rating prompt once the entry exists
  useEffect(() => {
    if (justTried && tried) {
      setEditName(tried.name);
      setEditNotes(tried.notes || '');
      setEditRating(tried.tasteRating || 0);
      setIsEditing(true);
      setIsInitialPrompt(true);
      setJustTried(false);
    }
  }, [justTried, tried]);

  const cancelEdit = () => {
    if (isInitialPrompt && tried) {
      onDeleteDish(tried.id);
    }
    setIsInitialPrompt(false);
    setIsEditing(false);
  };

  const tries = tried?.restaurantTries || [];
  const verdict = tried ? dishVerdictRating(tried) : undefined;
  const rating = verdict !== undefined ? Math.round(verdict) : undefined;
  const derived = tried ? isDerivedRating(tried) : false;

  const startEdit = () => {
    if (!tried) return;
    setEditName(tried.name);
    setEditNotes(tried.notes || '');
    setEditRating(tried.tasteRating || 0);
    setIsEditing(true);
  };

  const saveEdit = () => {
    if (!tried) return;
    onUpdateDish(tried.id, {
      ...(isCustom && editName.trim() ? { name: editName.trim() } : {}),
      notes: editNotes.trim() || undefined,
      tasteRating: editRating || undefined,
    });
    setIsInitialPrompt(false);
    setIsEditing(false);
  };

  return (
    <div
      className="card-interactive relative bg-white rounded-xl border p-4"
      style={tried
        ? { borderColor: systemColors.herb, boxShadow: `inset 3px 0 0 ${systemColors.herb}` }
        : { borderColor: '#e5e7eb' }}
    >
      {cornerActions && (
        <div className="absolute top-3 right-3 flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
          {cornerActions}
        </div>
      )}

      {children}

      {tried ? (
        <div className="mt-3 pt-2.5 border-t border-dashed" style={{ borderColor: systemColors.border }}>
          {isEditing ? (
            <div className="space-y-2">
              {isCustom && (
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2"
                  style={{ '--tw-ring-color': systemColors.herb } as React.CSSProperties}
                  placeholder="Dish name"
                />
              )}
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setEditRating(editRating === star ? 0 : star)}
                    className="text-xl transition-colors"
                    style={{ color: editRating >= star ? systemColors.saffron : '#d1d5db' }}
                  >
                    ★
                  </button>
                ))}
              </div>
              <textarea
                value={editNotes}
                onChange={(e) => setEditNotes(e.target.value)}
                rows={2}
                className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2"
                style={{ '--tw-ring-color': systemColors.herb } as React.CSSProperties}
                placeholder="Your thoughts on this dish..."
              />
              <div className="flex gap-2">
                <button
                  onClick={saveEdit}
                  className="text-sm text-white px-3 py-1 rounded-md"
                  style={{ backgroundColor: systemColors.herb }}
                >
                  Save
                </button>
                <button
                  onClick={cancelEdit}
                  className="text-sm px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-2">
                <span
                  className="text-sm font-bold leading-none"
                  style={{ color: systemColors.herb }}
                  title={rating && derived ? `Tried — avg of ${ratedTryCount(tried)} rated ${ratedTryCount(tried) === 1 ? 'try' : 'tries'}` : 'Tried'}
                >
                  ✓
                </span>
                {rating ? <RatingStars rating={rating} /> : (
                  <button
                    onClick={startEdit}
                    className="tap btn-press text-xs font-medium"
                    style={{ color: systemColors.saffron }}
                  >
                    ☆ Rate it
                  </button>
                )}
                <button
                  onClick={() => setShowTries(!showTries)}
                  className="tap card-cta text-xs text-gray-400 hover:text-gray-700 transition-colors"
                >
                  {showTries ? '▾' : '▸'} {tries.length} {tries.length === 1 ? 'try' : 'tries'}
                </button>
                <span className="ml-auto flex gap-1">
                  <button
                    onClick={startEdit}
                    className="text-gray-400 p-3 md:p-0.5 transition-colors"
                    onMouseEnter={(e) => (e.currentTarget.style.color = systemColors.herb)}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '')}
                    title="Edit"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => onDeleteDish(tried.id)}
                    className="text-gray-400 hover:text-red-500 p-3 md:p-0.5 transition-colors"
                    title="Remove from tried"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </span>
              </div>

              {tried.notes && <p className="text-sm text-gray-600 mt-1.5">{tried.notes}</p>}

              {showTries && (
                <div className="mt-1.5 space-y-1.5">
                  {tries.map((tryItem) => (
                    <div key={tryItem.id}>
                      {editingTryId === tryItem.id ? (
                        <RestaurantTryForm
                          existingTry={tryItem}
                          onSubmit={(data) => { onUpdateRestaurantTry(tried.id, tryItem.id, data); setEditingTryId(null); }}
                          onCancel={() => setEditingTryId(null)}
                        />
                      ) : (
                        <div className="rounded-md p-2 text-sm" style={{ backgroundColor: systemColors.saffronLight }}>
                          <div className="flex items-start justify-between">
                            <div>
                              <span className="font-medium text-gray-800">
                                {tryItem.restaurantName || 'Tried'}
                              </span>
                              <span className="text-gray-500 ml-2 text-xs">{formatDate(tryItem.date)}</span>
                            </div>
                            <div className="flex gap-1">
                              <button
                                onClick={() => setEditingTryId(tryItem.id)}
                                className="text-gray-400 p-3 md:p-0.5 transition-colors"
                                onMouseEnter={(e) => (e.currentTarget.style.color = systemColors.saffron)}
                                onMouseLeave={(e) => (e.currentTarget.style.color = '')}
                                title="Edit"
                              >
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                </svg>
                              </button>
                              <button
                                onClick={() => onDeleteRestaurantTry(tried.id, tryItem.id)}
                                className="text-gray-400 hover:text-red-500 p-3 md:p-0.5 transition-colors"
                                title="Delete"
                              >
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </button>
                            </div>
                          </div>
                          {tryItem.rating && (
                            <div className="mt-0.5"><RatingStars rating={tryItem.rating} /></div>
                          )}
                          {tryItem.notes && <p className="text-gray-600 mt-0.5">{tryItem.notes}</p>}
                        </div>
                      )}
                    </div>
                  ))}

                  {showAddTry ? (
                    <RestaurantTryForm
                      onSubmit={(data) => { onAddRestaurantTry(tried.id, data); setShowAddTry(false); }}
                      onCancel={() => setShowAddTry(false)}
                    />
                  ) : (
                    <button
                      onClick={() => setShowAddTry(true)}
                      className="tap text-xs font-medium transition-colors hover:opacity-80"
                      style={{ color: systemColors.saffron }}
                    >
                      + Add try
                    </button>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      ) : (
        onTryThis && (
          <button
            onClick={() => { setJustTried(true); onTryThis(); }}
            className="tap card-cta mt-3 text-sm font-medium transition-colors hover:opacity-80"
            style={{ color: systemColors.herb }}
          >
            + I tried this
          </button>
        )
      )}
    </div>
  );
}
