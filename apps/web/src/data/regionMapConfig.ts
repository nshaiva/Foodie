/**
 * Geography lookups for the per-country region map.
 *
 * Extracted from CultureRegionsSlide so the map can be used outside that slide.
 * All three tables are hand-maintained; a country missing from `countryMapConfig`
 * or `regionCoordinates` falls back to the button grid in `RegionalMap`, so
 * adding a country here is optional rather than load-bearing.
 *
 * `regionCoordinates` keys must match `RegionalCuisine.name` exactly, or the
 * marker silently disappears.
 */

// Map alpha-2 to numeric codes
export const alpha2ToNumeric: Record<string, string> = {
  TH: '764',
  MX: '484',
  JP: '392',
  IT: '380',
  ET: '231',
  PE: '604',
  GE: '268',
  AZ: '031',
  IN: '356',
  PK: '586',
  AF: '004',
  CN: '156',
  VN: '704',
  KR: '410',
  ID: '360',
  PH: '608',
  MY: '458',
  FR: '250',
  ES: '724',
  GR: '300',
  TR: '792',
  LB: '422',
  EG: '818',
  MA: '504',
  NG: '566',
  BR: '076',
  AR: '032',
  JM: '388',
  US: '840',
  PT: '620',
  IE: '372',
};

// Country-specific map configurations (zoomed in to fill container)
export const countryMapConfig: Record<string, {
  center: [number, number];
  scale: number;
}> = {
  TH: { center: [101, 13], scale: 2800 },
  MX: { center: [-102, 24], scale: 1100 },
  JP: { center: [138, 37], scale: 1800 },
  IT: { center: [12.5, 42], scale: 2800 },
  ET: { center: [40, 9], scale: 3000 },
  PE: { center: [-75, -10], scale: 1800 },
  GE: { center: [43.5, 42], scale: 5500 },
  AZ: { center: [47.5, 40.5], scale: 6000 },
  IN: { center: [79, 22], scale: 1200 },
  PK: { center: [69, 30], scale: 1800 },
  AF: { center: [66, 34], scale: 2500 },
  CN: { center: [104,37], scale: 600 },
  VN: { center: [106.2,16.2], scale: 2500 },
  KR: { center: [127.8,36.1], scale: 4200 },
  ID: { center: [118,-2.5], scale: 850 },
  PH: { center: [122.5,12], scale: 1900 },
  MY: { center: [109.5,4], scale: 1500 },
  FR: { center: [2.4,46.6], scale: 2400 },
  ES: { center: [-3.7,40.1], scale: 2400 },
  GR: { center: [24.5,38.3], scale: 3200 },
  TR: { center: [35.3,39], scale: 1900 },
  LB: { center: [35.85,33.88], scale: 15000 },
  EG: { center: [30.2,26.6], scale: 2400 },
  MA: { center: [-6.5,31.8], scale: 2000 },
  NG: { center: [8.7,9.1], scale: 2100 },
  BR: { center: [-53,-11], scale: 780 },
  AR: { center: [-65,-40], scale: 620 },
  JM: { center: [-77.3,18.12], scale: 9000 },
  US: { center: [-96.5,38.5], scale: 700 },
  PT: { center: [-8.1,39.6], scale: 4600 },
  IE: { center: [-8, 53.3], scale: 4600 },
};

// Geographic coordinates for region centers
export const regionCoordinates: Record<string, Record<string, [number, number]>> = {
  TH: {
    'Northern Thailand (Lanna)': [99.0, 18.8],
    'Northeastern Thailand (Isan)': [103.5, 16.0],
    'Central Thailand': [100.5, 14.5],
    'Southern Thailand': [99.5, 8.5],
  },
  MX: {
    'Northern Mexico': [-105, 28],
    'Central Mexico': [-99, 19.5],
    'Oaxaca': [-96.5, 17],
    'Yucatán': [-89, 20.5],
    'Coastal Regions': [-105, 22],
  },
  IT: {
    'Northern Italy': [11, 45.5],
    'Central Italy': [12, 42.5],
    'Southern Italy & Sicily': [14.5, 39],
  },
  GE: {
    'Kakheti': [45.8, 41.6],
    'Imereti': [42.7, 42.2],
    'Adjara': [41.8, 41.6],
    'Svaneti': [42.9, 43.0],
  },
  AZ: {
    'Baku & Absheron': [49.8, 40.4],
    'Sheki-Zagatala': [47.2, 41.2],
    'Lankaran & South': [48.8, 38.8],
    'Ganja-Gazakh': [46.3, 40.7],
  },
  IN: {
    'North India': [77, 28],
    'South India': [78, 13],
    'West India': [73, 19],
    'East India': [88, 23],
  },
  PK: {
    'Punjab': [74, 31],
    'Sindh': [68, 26],
    'Khyber Pakhtunkhwa (Pashtun)': [71, 34],
    'Balochistan': [66, 28],
  },
  AF: {
    'Kabul & Central': [69, 34.5],
    'North (Mazar-i-Sharif)': [67, 36.5],
    'East & South (Pashtun Regions)': [70, 32],
    'West (Herat)': [62, 34],
  },
  CN: {
    "Sichuan": [103.9,30.5],
    "Guangdong (Cantonese)": [113.3,23.3],
    "Jiangnan (Shanghai & Huaiyang)": [120.2,31.5],
    "Northern China (Beijing & Shandong)": [117.5,38],
    "Xinjiang (Northwest)": [85,41.5],
  },
  VN: {
    "Northern Vietnam": [105.5,21.2],
    "Central Vietnam": [107.6,16.4],
    "Quang Nam & Hoi An": [108.3,15.7],
    "Southern Vietnam": [106.7,10.9],
    "Mekong Delta": [105.6,9.9],
  },
  KR: {
    "Seoul & Gyeonggi": [127,37.5],
    "Jeolla (Southwest)": [126.9,35.2],
    "Gyeongsang (Southeast)": [128.6,35.6],
    "Gangwon (Northeast)": [128.3,37.8],
    "Jeju Island": [126.53,33.38],
  },
  ID: {
    "Sumatra": [101.5,-0.6],
    "Java": [110,-7.3],
    "Bali": [115.15,-8.4],
    "Sulawesi": [121.2,-1.8],
    "Maluku & Papua": [133.5,-3.5],
  },
  PH: {
    "Luzon (Tagalog Heartland)": [121.1,14.8],
    "Ilocos (Northern Luzon)": [120.6,17.6],
    "Bicol": [123.4,13.4],
    "Visayas": [123.3,10.6],
    "Mindanao": [124.8,7.5],
  },
  MY: {
    "Penang & the North": [100.4,5.5],
    "Kuala Lumpur & Central": [101.6,3.1],
    "East Coast (Kelantan & Terengganu)": [102.8,5],
    "Melaka & the South": [102.9,2.1],
    "Sabah & Sarawak (Borneo)": [114.5,3.4],
  },
  FR: {
    "Provence": [5.6,43.8],
    "Brittany": [-3,48.2],
    "Burgundy & Lyon": [4.6,46.6],
    "Alsace": [7.4,48.3],
    "Southwest (Gascony & Périgord)": [0.6,44.2],
  },
  ES: {
    "Andalusia": [-4.7,37.4],
    "Basque Country": [-2.6,43],
    "Catalonia": [1.6,41.8],
    "Galicia": [-8,42.7],
    "Valencia & the Levante": [-0.6,39.3],
  },
  GR: {
    "Crete": [24.9,35.24],
    "Peloponnese": [22.35,37.5],
    "Macedonia & Thrace": [23.5,41],
    "Aegean Islands (Cyclades)": [25.2,37.1],
    "Epirus": [20.75,39.6],
  },
  TR: {
    "Marmara & Istanbul": [29.2,40.6],
    "Aegean Coast": [27.6,38.4],
    "Black Sea (Karadeniz)": [39,41],
    "Central Anatolia": [33.8,38.9],
    "Southeastern Anatolia": [39.5,37.4],
  },
  LB: {
    "Beirut & Mount Lebanon": [35.55,33.85],
    "North Lebanon (Tripoli & Akkar)": [36,34.45],
    "Bekaa Valley": [36.05,33.95],
    "South Lebanon": [35.35,33.35],
  },
  EG: {
    "Cairo & the Nile Delta": [31.1,30.2],
    "Alexandria & the Mediterranean Coast": [29.9,31.1],
    "Upper Egypt (Sa'idi)": [32.5,25.7],
    "Sinai & Red Sea Coast": [33.9,28.6],
  },
  MA: {
    "Fez & the North": [-5,34.2],
    "Marrakech & the South": [-8,31.4],
    "Atlantic Coast": [-8.6,32.9],
    "Sahara & Oases": [-5.2,30.6],
  },
  NG: {
    "Southwest (Yoruba)": [3.9,7.5],
    "Southeast (Igbo)": [7.4,6],
    "South-South (Niger Delta)": [6.8,4.9],
    "North (Hausa-Fulani)": [8.9,11.9],
    "Middle Belt": [8.6,8.9],
  },
  BR: {
    "Bahia & the Northeast": [-40.5,-9.5],
    "Amazon (North)": [-62,-4],
    "Minas Gerais": [-44.5,-18.5],
    "Rio & São Paulo (Southeast)": [-45.8,-22.3],
    "The South (Gaúcho Country)": [-52,-28],
  },
  AR: {
    "Buenos Aires & the Pampas": [-60,-36],
    "Northwest (NOA)": [-65.5,-25],
    "Litoral & Northeast": [-58.5,-28.5],
    "Cuyo": [-68.3,-33],
    "Patagonia": [-69,-45],
  },
  JM: {
    "Kingston & St. Andrew": [-76.78,18.02],
    "Portland": [-76.45,18.13],
    "Western Jamaica": [-78.05,18.32],
    "South Coast (St. Elizabeth)": [-77.72,18.05],
  },
  US: {
    "The South": [-87,33],
    "New England": [-71.5,43.8],
    "The Southwest": [-104,33.5],
    "The Midwest": [-93.5,42.5],
    "The West Coast": [-121,40.5],
  },
  PT: {
    "Minho & Douro": [-8.2,41.4],
    "Beiras": [-7.9,40.3],
    "Lisbon & Estremadura": [-9,39.1],
    "Alentejo": [-7.9,38.3],
    "Algarve": [-8.1,37.2],
  },
  IE: {
    "Dublin & the East": [-6.4,53.35],
    "Munster (Cork & Kerry)": [-9,52],
    "Connacht & the Wild Atlantic Way": [-9.3,53.6],
    "Ulster & the North": [-7.3,54.8],
  },
};

// Get a shortened region name for the bubble label
export function getShortRegionName(regionName: string): string {
  if (regionName.includes('(')) {
    const inParens = regionName.match(/\(([^)]+)\)/);
    if (inParens) return inParens[1];
    return regionName.split('(')[0].trim();
  }
  if (regionName.includes(' & ')) {
    return regionName.split(' & ')[0];
  }
  return regionName
    .replace('Thailand', '')
    .replace('Mexico', '')
    .replace('Italy', '')
    .replace('Georgia', '')
    .replace('Azerbaijan', '')
    .replace('India', '')
    .replace('Pakistan', '')
    .replace('Afghanistan', '')
    .replace('Vietnam', '')
    .replace('China', '')
    .replace('Jamaica', '')
    .replace('Lebanon', '')
    .replace('Egypt', '')
    .trim();
}
