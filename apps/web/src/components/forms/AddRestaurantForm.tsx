import { useState } from 'react';
import { countries } from '../../data/countries';
import { getRegionsForCountry } from '../../data/countryHelpers';
import { systemColors } from '../../data/systemColors';
import { StarRating } from '../StarRating';
import type { Restaurant } from '../../data/types';

type RestaurantInput = Omit<Restaurant, 'id' | 'createdAt' | 'updatedAt' | 'visits'> & { dateVisited?: string };

interface AddRestaurantFormProps {
  onAddRestaurant: (restaurant: RestaurantInput) => void;
  onCancel: () => void;
}

export function AddRestaurantForm({ onAddRestaurant, onCancel }: AddRestaurantFormProps) {
  const [formCountryId, setFormCountryId] = useState('');
  const [formName, setFormName] = useState('');
  const [formRegion, setFormRegion] = useState('');
  const [formGoogleMapsLink, setFormGoogleMapsLink] = useState('');
  const [formRating, setFormRating] = useState(0);
  const [formNotes, setFormNotes] = useState('');
  const [formDateVisited, setFormDateVisited] = useState('');

  const selectedCountryRegions = formCountryId ? getRegionsForCountry(formCountryId) : [];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formCountryId || !formName.trim()) return;

    onAddRestaurant({
      countryId: formCountryId,
      region: formRegion || undefined,
      name: formName.trim(),
      googleMapsLink: formGoogleMapsLink.trim() || undefined,
      rating: formRating || undefined,
      notes: formNotes.trim() || undefined,
      dateVisited: formDateVisited || undefined,
    });
    onCancel();
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg p-4 mb-6" style={{ borderWidth: 1, borderStyle: 'solid', borderColor: systemColors.navy }}>
      <h3 className="font-medium text-gray-900 mb-4">Add a Restaurant</h3>
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="formCountry" className="block text-sm font-medium text-gray-700 mb-1">
              Country *
            </label>
            <select
              id="formCountry"
              value={formCountryId}
              onChange={(e) => {
                setFormCountryId(e.target.value);
                setFormRegion('');
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy"
              required
            >
              <option value="">Select a country</option>
              {countries
                .slice()
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((country) => (
                  <option key={country.id} value={country.id}>
                    {country.name}
                  </option>
                ))}
            </select>
          </div>

          {selectedCountryRegions.length > 0 && (
            <div>
              <label htmlFor="formRegion" className="block text-sm font-medium text-gray-700 mb-1">
                Region
              </label>
              <select
                id="formRegion"
                value={formRegion}
                onChange={(e) => setFormRegion(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy"
              >
                <option value="">Select a region (optional)</option>
                {selectedCountryRegions.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        <div>
          <label htmlFor="formName" className="block text-sm font-medium text-gray-700 mb-1">
            Restaurant Name *
          </label>
          <input
            type="text"
            id="formName"
            value={formName}
            onChange={(e) => setFormName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy"
            placeholder="e.g., Siam Garden"
            required
          />
        </div>

        <div>
          <label htmlFor="formGoogleMapsLink" className="block text-sm font-medium text-gray-700 mb-1">
            Google Maps Link
          </label>
          <input
            type="url"
            id="formGoogleMapsLink"
            value={formGoogleMapsLink}
            onChange={(e) => setFormGoogleMapsLink(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy"
            placeholder="https://maps.google.com/..."
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Rating
            </label>
            <StarRating rating={formRating} onChange={setFormRating} />
          </div>

          <div>
            <label htmlFor="formDateVisited" className="block text-sm font-medium text-gray-700 mb-1">
              Date Visited
            </label>
            <input
              type="date"
              id="formDateVisited"
              value={formDateVisited}
              onChange={(e) => setFormDateVisited(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy"
            />
          </div>
        </div>

        <div>
          <label htmlFor="formNotes" className="block text-sm font-medium text-gray-700 mb-1">
            Notes
          </label>
          <textarea
            id="formNotes"
            value={formNotes}
            onChange={(e) => setFormNotes(e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy"
            placeholder="What did you enjoy? Any recommendations?"
          />
        </div>
      </div>

      <div className="flex gap-3 mt-6">
        <button
          type="submit"
          disabled={!formCountryId || !formName.trim()}
          className="flex-1 text-white py-2 px-4 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
