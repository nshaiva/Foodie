import type { RegionAreas } from './regionAreas';

// The country's on-screen width at which plates start to fade, and are gone
const FULL_PX = 460;
const FADE_OUT_PX = 320;

/** How visible a country's region plates are at this zoom: 1 while the
 *  country is big on screen, 0 once it's too small to hold them. Its world
 *  plate shows the inverse, so the two hand over. */
export function plateFade(areas: RegionAreas, zoom: number) {
  const [[bx0], [bx1]] = areas.bounds;
  const widthPx = (bx1 - bx0) * zoom;
  return Math.max(0, Math.min(1, (widthPx - FADE_OUT_PX) / (FULL_PX - FADE_OUT_PX)));
}
