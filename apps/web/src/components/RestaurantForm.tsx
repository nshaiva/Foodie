import { useState } from 'react';
import { StarRating } from './StarRating';
import { systemColors } from '../data/systemColors';

interface RestaurantFormProps {
  countryId: string;
  countryName: string;
  regions?: string[];
  onSubmit: (data: {
    countryId: string;
    region?: string;
    name: string;
    googleMapsLink?: string;
    rating?: number;
    notes?: string;
    dateVisited?: string;
  }) => void;
  onCancel: () => void;
}

export function RestaurantForm({ countryId, countryName, regions, onSubmit, onCancel }: RestaurantFormProps) {
  const [name, setName] = useState('');
  const [region, setRegion] = useState('');
  const [googleMapsLink, setGoogleMapsLink] = useState('');
  const [rating, setRating] = useState(0);
  const [notes, setNotes] = useState('');
  const [dateVisited, setDateVisited] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    onSubmit({
      countryId,
      region: region || undefined,
      name: name.trim(),
      googleMapsLink: googleMapsLink.trim() || undefined,
      rating: rating || undefined,
      notes: notes.trim() || undefined,
      dateVisited: dateVisited || undefined,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg border border-gray-200 p-4">
      <h3 className="font-medium text-gray-900 mb-4">Log a Restaurant in {countryName}</h3>

      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Restaurant Name *
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy focus:border-transparent"
            placeholder="e.g., Siam Garden"
            required
          />
        </div>

        {regions && regions.length > 0 && (
          <div>
            <label htmlFor="region" className="block text-sm font-medium text-gray-700 mb-1">
              Region
            </label>
            <select
              id="region"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy focus:border-transparent"
            >
              <option value="">Select a region (optional)</option>
              {regions.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>
        )}

        <div>
          <label htmlFor="googleMapsLink" className="block text-sm font-medium text-gray-700 mb-1">
            Google Maps Link
          </label>
          <input
            type="url"
            id="googleMapsLink"
            value={googleMapsLink}
            onChange={(e) => setGoogleMapsLink(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy focus:border-transparent"
            placeholder="https://maps.google.com/..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Rating
          </label>
          <StarRating rating={rating} onChange={setRating} />
        </div>

        <div>
          <label htmlFor="dateVisited" className="block text-sm font-medium text-gray-700 mb-1">
            Date Visited
          </label>
          <input
            type="date"
            id="dateVisited"
            value={dateVisited}
            onChange={(e) => setDateVisited(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy focus:border-transparent"
          />
        </div>

        <div>
          <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
            Notes
          </label>
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy focus:border-transparent"
            placeholder="What did you enjoy? Any recommendations?"
          />
        </div>
      </div>

      <div className="flex gap-3 mt-6">
        <button
          type="submit"
          className="flex-1 text-white py-2 px-4 rounded-md transition-colors"
          style={{ backgroundColor: systemColors.navy }}
        >
          Save Restaurant
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
