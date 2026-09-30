import { geoMercator, geoPath } from 'd3-geo';
import { Delaunay } from 'd3-delaunay';
import { feature } from 'topojson-client';
import { writeFileSync } from 'node:fs';
const topo = await (await fetch('https://cdn.jsdelivr.net/npm/world-atlas@2.0.2/countries-50m.json')).json();
const mx = feature(topo, topo.objects.countries).features.find(f => f.id === '484');
const W = 720, H = 500;
const proj = geoMercator().fitExtent([[20, 20], [W - 20, H - 20]], mx);
const path = geoPath(proj);
const r = n => Math.round(n * 10) / 10;
const outline = path(mx).replace(/\d+\.\d+/g, m => r(+m));
const regions = { 'Northern Mexico': [-105, 28], 'Central Mexico': [-99, 19.5], 'Oaxaca': [-96.5, 17], 'Yucatán': [-89, 20.5], 'Coastal Regions': [-105, 22] };
const names = Object.keys(regions);
const pts = names.map(n => proj(regions[n]));
const vor = Delaunay.from(pts).voronoi([0, 0, W, H]);
const cells = names.map((n, i) => ({ name: n, cell: vor.renderCell(i).replace(/\d+\.\d+/g, m => r(+m)), anchor: pts[i].map(r) }));
const cities = {
  'Mexico City': [-99.13, 19.43], 'Puebla': [-98.2, 19.04], 'Guadalajara': [-103.35, 20.67],
  'Oaxaca': [-96.72, 17.06], 'Tequila': [-103.84, 20.88], 'Mérida': [-89.62, 20.97], 'Monterrey': [-100.31, 25.69],
};
const cityPx = Object.fromEntries(Object.entries(cities).map(([k, v]) => [k, proj(v).map(r)]));
writeFileSync(new URL('./geo.json', import.meta.url), JSON.stringify({ W, H, outline, cells, cityPx }));
console.log(outline.length, cityPx);
