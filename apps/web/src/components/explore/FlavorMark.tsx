import { useState } from 'react';
import type { FlavorAxisId, FlavorIntensity } from '../../data/types';
import { FLAVOR_AXIS_IDS, FLAVOR_AXIS_META } from '../../data/flavorAxisMeta';
import { FlavorAxisIcon } from '../FlavorAxisIcon';

/**
 * The country's fingerprint as a small mark (Nikita, 2026-10-02): the hexagon
 * with the cuisine's shape, three spokes, and a dot at each corner in its axis
 * colour. Hovering or tapping a dot swells it into the axis badge (the same
 * badge the full fingerprint and the chips use), with the sprinkle; tapping
 * the shape opens the full fingerprint. Axes run clockwise from the top in
 * `FLAVOR_AXIS_IDS` order, the same order as the radar.
 */

const C = 27, R = 22;
const VERTS: [number, number][] = FLAVOR_AXIS_IDS.map((_, i) => {
  const a = -Math.PI / 2 + (i * Math.PI) / 3;
  return [C + R * Math.cos(a), C + R * Math.sin(a)];
});
const pt = ([x, y]: [number, number]) => `${x.toFixed(2)},${y.toFixed(2)}`;
const OUTLINE = VERTS.map(pt).join(' ');
const SPOKES = [0, 1, 2].map(i => `M${pt(VERTS[i])} L${pt(VERTS[i + 3])}`).join(' ');

export function FlavorMark({ intensity, color, size = 64, onOpen }: {
  intensity: FlavorIntensity;
  /** The shape's fill and stroke; the overview passes its terracotta. */
  color: string;
  size?: number;
  onOpen: () => void;
}) {
  const [peek, setPeek] = useState<FlavorAxisId | null>(null);
  const k = size / 54;
  const shape = FLAVOR_AXIS_IDS.map((id, i) => {
    const v = Math.max(0, Math.min(10, intensity[id])) / 10;
    return pt([C + (VERTS[i][0] - C) * v, C + (VERTS[i][1] - C) * v]);
  }).join(' ');

  return (
    <div className="flavor-mark" style={{ width: size, height: size }} data-flavor-mark>
      <button type="button" className="shape" onClick={onOpen} aria-label="Full flavor fingerprint" title="Full flavor fingerprint">
        <svg viewBox="0 0 54 54" width={size} height={size} aria-hidden="true">
          <polygon points={OUTLINE} fill="none" stroke="#E0D9CC" strokeWidth={1} />
          <path d={SPOKES} stroke="#EDE7DB" strokeWidth={1} />
          <polygon points={shape} fill={color} fillOpacity={0.25} stroke={color} strokeWidth={1.8} strokeLinejoin="round" />
        </svg>
      </button>
      {FLAVOR_AXIS_IDS.map((id, i) => {
        const [x, y] = VERTS[i];
        const on = peek === id;
        const meta = FLAVOR_AXIS_META[id];
        return (
          <button
            key={id}
            type="button"
            className={`dot${on ? ' on' : ''}`}
            style={{ left: x * k, top: y * k, '--ax': meta.color } as React.CSSProperties}
            aria-label={meta.label}
            aria-pressed={on}
            onMouseEnter={() => setPeek(id)}
            onMouseLeave={() => setPeek(prev => (prev === id ? null : prev))}
            onClick={e => { e.stopPropagation(); setPeek(prev => (prev === id ? null : id)); }}
            data-axis-dot={id}
          >
            <span className="badge axis-badge"><FlavorAxisIcon axis={id} size={15} /></span>
            <i className="spr" /><i className="spr" /><i className="spr" />
          </button>
        );
      })}
    </div>
  );
}

/**
 * "Leads with": the cuisine's three strongest axes as small chips with their
 * badges. "Smoke/Earth" reads "Smoke" on a chip; the full name is a tap away.
 */
export function LeadChips({ intensity, count = 3 }: { intensity: FlavorIntensity; count?: number }) {
  const leads = [...FLAVOR_AXIS_IDS].sort((a, b) => intensity[b] - intensity[a]).slice(0, count);
  return (
    <div className="flex flex-wrap gap-1.5" aria-label="Leads with" data-lead-chips>
      {leads.map(id => {
        const meta = FLAVOR_AXIS_META[id];
        return (
          <span
            key={id}
            className="lead-chip"
            style={{ '--ax': meta.color, color: meta.color } as React.CSSProperties}
            title={meta.description}
          >
            <span className="axis-badge sm"><FlavorAxisIcon axis={id} size={13} /></span>
            {meta.label.split('/')[0]}
          </span>
        );
      })}
    </div>
  );
}
