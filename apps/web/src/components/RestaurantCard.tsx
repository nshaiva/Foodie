import { useState } from 'react';
import type { Restaurant, RestaurantVisit } from '../data/types';
import { StarRating } from './StarRating';
import { systemColors } from '../data/systemColors';

interface RestaurantCardProps {
  restaurant: Restaurant;
  onUpdate: (id: string, updates: Partial<Omit<Restaurant, 'id' | 'createdAt' | 'visits'>>) => void;
  onDelete: (id: string) => void;
  onAddVisit: (restaurantId: string, date: string, notes?: string) => void;
  onUpdateVisit: (restaurantId: string, visitId: string, updates: Partial<Omit<RestaurantVisit, 'id'>>) => void;
  onDeleteVisit: (restaurantId: string, visitId: string) => void;
}

export function RestaurantCard({
  restaurant,
  onUpdate,
  onDelete,
  onAddVisit,
  onUpdateVisit,
  onDeleteVisit,
}: RestaurantCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(restaurant.name);
  const [editGoogleMapsLink, setEditGoogleMapsLink] = useState(restaurant.googleMapsLink || '');
  const [editRating, setEditRating] = useState(restaurant.rating || 0);
  const [editNotes, setEditNotes] = useState(restaurant.notes || '');

  const [showAddVisit, setShowAddVisit] = useState(false);
  const [newVisitDate, setNewVisitDate] = useState('');
  const [newVisitNotes, setNewVisitNotes] = useState('');

  const [editingVisitId, setEditingVisitId] = useState<string | null>(null);
  const [editVisitNotes, setEditVisitNotes] = useState('');

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const handleSaveEdit = () => {
    onUpdate(restaurant.id, {
      name: editName.trim(),
      googleMapsLink: editGoogleMapsLink.trim() || undefined,
      rating: editRating || undefined,
      notes: editNotes.trim() || undefined,
    });
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditName(restaurant.name);
    setEditGoogleMapsLink(restaurant.googleMapsLink || '');
    setEditRating(restaurant.rating || 0);
    setEditNotes(restaurant.notes || '');
    setIsEditing(false);
  };

  const handleAddVisit = () => {
    if (!newVisitDate) return;
    onAddVisit(restaurant.id, newVisitDate, newVisitNotes.trim() || undefined);
    setNewVisitDate('');
    setNewVisitNotes('');
    setShowAddVisit(false);
  };

  const handleStartEditVisit = (visit: RestaurantVisit) => {
    setEditingVisitId(visit.id);
    setEditVisitNotes(visit.notes || '');
  };

  const handleSaveVisitEdit = (visitId: string) => {
    onUpdateVisit(restaurant.id, visitId, { notes: editVisitNotes.trim() || undefined });
    setEditingVisitId(null);
    setEditVisitNotes('');
  };

  const visits = restaurant.visits || [];

  if (isEditing) {
    return (
      <div className="bg-white rounded-lg p-4" style={{ borderWidth: 1, borderStyle: 'solid', borderColor: systemColors.navy }}>
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
              style={{ '--tw-ring-color': systemColors.navy } as React.CSSProperties}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Google Maps Link</label>
            <input
              type="url"
              value={editGoogleMapsLink}
              onChange={(e) => setEditGoogleMapsLink(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
              style={{ '--tw-ring-color': systemColors.navy } as React.CSSProperties}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
            <StarRating rating={editRating} onChange={setEditRating} />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
            <textarea
              value={editNotes}
              onChange={(e) => setEditNotes(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
              style={{ '--tw-ring-color': systemColors.navy } as React.CSSProperties}
            />
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleSaveEdit}
              className="flex-1 text-white py-2 px-4 rounded-md transition-colors"
              style={{ backgroundColor: systemColors.navy }}
            >
              Save
            </button>
            <button
              onClick={handleCancelEdit}
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <div className="flex items-start justify-between mb-2">
        <div>
          <h4 className="font-medium text-gray-900">{restaurant.name}</h4>
          <div className="flex items-center gap-2">
            {restaurant.region && (
              <span className="text-xs px-2 py-0.5 rounded" style={{ backgroundColor: systemColors.saffronLight, color: systemColors.navy }}>
                {restaurant.region}
              </span>
            )}
            {visits.length > 0 && (
              <span className="text-xs text-gray-500">
                {visits.length} visit{visits.length !== 1 ? 's' : ''}
              </span>
            )}
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setIsEditing(true)}
            className="text-gray-400 transition-colors"
            style={{ '--hover-color': systemColors.navy } as React.CSSProperties}
            onMouseEnter={(e) => (e.currentTarget.style.color = systemColors.navy)}
            onMouseLeave={(e) => (e.currentTarget.style.color = '')}
            title="Edit"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button
            onClick={() => onDelete(restaurant.id)}
            className="text-gray-400 hover:text-red-500 transition-colors"
            title="Delete"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>

      {restaurant.rating && (
        <div className="mb-2">
          <StarRating rating={restaurant.rating} readonly size="sm" />
        </div>
      )}

      {restaurant.notes && (
        <p className="text-sm text-gray-600 mb-2">{restaurant.notes}</p>
      )}

      {restaurant.googleMapsLink && (
        <a
          href={restaurant.googleMapsLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-sm hover:underline mb-3"
          style={{ color: systemColors.navy }}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          View on Google Maps
        </a>
      )}

      {/* Visits Section */}
      <div className="mt-3 pt-3 border-t border-gray-100">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Visits</span>
          {!showAddVisit && (
            <button
              onClick={() => setShowAddVisit(true)}
              className="text-xs hover:underline"
              style={{ color: systemColors.navy }}
            >
              + Add Visit
            </button>
          )}
        </div>

        {showAddVisit && (
          <div className="mb-3 p-3 bg-gray-50 rounded-md">
            <div className="space-y-2">
              <input
                type="date"
                value={newVisitDate}
                onChange={(e) => setNewVisitDate(e.target.value)}
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1"
                style={{ '--tw-ring-color': systemColors.navy } as React.CSSProperties}
              />
              <textarea
                value={newVisitNotes}
                onChange={(e) => setNewVisitNotes(e.target.value)}
                placeholder="Notes for this visit (optional)"
                rows={2}
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1"
                style={{ '--tw-ring-color': systemColors.navy } as React.CSSProperties}
              />
              <div className="flex gap-2">
                <button
                  onClick={handleAddVisit}
                  disabled={!newVisitDate}
                  className="text-xs text-white px-3 py-1 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ backgroundColor: systemColors.navy }}
                >
                  Add
                </button>
                <button
                  onClick={() => {
                    setShowAddVisit(false);
                    setNewVisitDate('');
                    setNewVisitNotes('');
                  }}
                  className="text-xs text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {visits.length > 0 ? (
          <div className="space-y-2">
            {visits
              .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
              .map((visit) => (
                <div key={visit.id} className="text-sm bg-gray-50 rounded p-2">
                  {editingVisitId === visit.id ? (
                    <div className="space-y-2">
                      <div className="text-xs text-gray-500">{formatDate(visit.date)}</div>
                      <textarea
                        value={editVisitNotes}
                        onChange={(e) => setEditVisitNotes(e.target.value)}
                        rows={2}
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1"
                        style={{ '--tw-ring-color': systemColors.navy } as React.CSSProperties}
                        placeholder="Notes for this visit"
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleSaveVisitEdit(visit.id)}
                          className="text-xs text-white px-2 py-1 rounded"
                          style={{ backgroundColor: systemColors.navy }}
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingVisitId(null)}
                          className="text-xs text-gray-600 hover:text-gray-800"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="text-xs text-gray-500">{formatDate(visit.date)}</div>
                        {visit.notes && (
                          <div className="text-gray-700 mt-1">{visit.notes}</div>
                        )}
                      </div>
                      <div className="flex gap-1">
                        <button
                          onClick={() => handleStartEditVisit(visit)}
                          className="text-gray-400"
                          onMouseEnter={(e) => (e.currentTarget.style.color = systemColors.navy)}
                          onMouseLeave={(e) => (e.currentTarget.style.color = '')}
                          title="Edit visit"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => onDeleteVisit(restaurant.id, visit.id)}
                          className="text-gray-400 hover:text-red-500"
                          title="Delete visit"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
          </div>
        ) : (
          !showAddVisit && (
            <p className="text-xs text-gray-400">No visits logged yet</p>
          )
        )}
      </div>
    </div>
  );
}
