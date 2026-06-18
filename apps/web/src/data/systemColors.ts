// Global system color palette — "Terracotta + Sage"
// Used for app-wide UI elements outside of country-specific theming.
// NOTE: key names (navy/tomato/saffron/herb) are kept stable so existing
// inline styles re-theme automatically; the values are the warm palette.

export const systemColors = {
  // Primary palette
  saffron: '#D9A441',       // Highlights, ratings, stars (warm gold)
  tomato: '#C2654A',        // Primary accent — terracotta
  seaSalt: '#F7F3EC',       // Main background (warm paper)
  herb: '#8A9A7B',          // Success states, dishes (sage)
  navy: '#33302A',          // Text, headings (warm ink)

  // Derived colors
  navyLight: '#44413A',     // Hover states
  navyMuted: '#6F6A5F',     // Secondary text
  saffronLight: '#F3E6C7',  // Gold tint for backgrounds
  tomatoLight: '#F0DBD1',   // Terracotta tint for backgrounds
  herbLight: '#E6EAE0',     // Sage tint for backgrounds

  // Surfaces
  surface: '#FFFFFF',       // Cards, header bar
  border: '#E5DFD2',        // Hairline borders/dividers
};

// Tailwind-compatible CSS custom properties
export const systemColorsCss = `
  --color-saffron: #D9A441;
  --color-tomato: #C2654A;
  --color-sea-salt: #F7F3EC;
  --color-herb: #8A9A7B;
  --color-navy: #33302A;
`;
