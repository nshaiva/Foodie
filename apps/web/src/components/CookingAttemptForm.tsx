import { useState } from 'react';
import type { CookingAttempt } from '../data/types';

interface CookingAttemptFormProps {
  existingAttempt?: CookingAttempt;
  onSubmit: (data: Omit<CookingAttempt, 'id'>) => void;
  onCancel: () => void;
}

export function CookingAttemptForm({ existingAttempt, onSubmit, onCancel }: CookingAttemptFormProps) {
  const [date, setDate] = useState(
    existingAttempt?.date
      ? new Date(existingAttempt.date).toISOString().split('T')[0]
      : new Date().toISOString().split('T')[0]
  );
  const [successRating, setSuccessRating] = useState(existingAttempt?.successRating?.toString() || '');
  const [recipeSource, setRecipeSource] = useState(existingAttempt?.recipeSource || '');
  const [notes, setNotes] = useState(existingAttempt?.notes || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onSubmit({
      date: new Date(date).toISOString(),
      successRating: successRating ? parseInt(successRating, 10) : undefined,
      recipeSource: recipeSource.trim() || undefined,
      notes: notes.trim() || undefined,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-violet-50 rounded-lg border border-violet-200 p-4">
      <h4 className="font-medium text-gray-900 mb-3">
        {existingAttempt ? 'Edit Cooking Attempt' : 'Add Cooking Attempt'}
      </h4>

      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              How did it turn out?
            </label>
            <select
              value={successRating}
              onChange={(e) => setSuccessRating(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
            >
              <option value="">No rating</option>
              <option value="5">5 - Nailed it!</option>
              <option value="4">4 - Pretty good</option>
              <option value="3">3 - Decent</option>
              <option value="2">2 - Needs work</option>
              <option value="1">1 - Disaster</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Recipe Source
          </label>
          <input
            type="text"
            value={recipeSource}
            onChange={(e) => setRecipeSource(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
            placeholder="e.g., YouTube, cookbook, family recipe..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Notes
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={2}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
            placeholder="What worked? What would you change?"
          />
        </div>
      </div>

      <div className="flex gap-2 mt-4">
        <button
          type="submit"
          className="flex-1 bg-violet-600 text-white py-2 px-4 rounded-md hover:bg-violet-700 transition-colors"
        >
          {existingAttempt ? 'Save' : 'Add Attempt'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
