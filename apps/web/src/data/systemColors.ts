// Global system color palette
// Used for app-wide UI elements outside of country-specific theming

export const systemColors = {
  // Primary palette
  saffron: '#E2B857',       // Highlights, ratings, stars
  tomato: '#B44A3C',        // Accents, alerts, important actions
  seaSalt: '#FAF8F3',       // Main background
  herb: '#4F6A4C',          // Success states, dishes
  navy: '#1F2D3D',          // Text, headers, navigation

  // Derived colors
  navyLight: '#2d3e52',     // Hover states
  navyMuted: '#4a5568',     // Secondary text
  saffronLight: '#f5e6c4',  // Saffron tint for backgrounds
  tomatoLight: '#f5d5d1',   // Tomato tint for backgrounds
  herbLight: '#e8f0e7',     // Herb tint for backgrounds
};

// Tailwind-compatible CSS custom properties
export const systemColorsCss = `
  --color-saffron: #E2B857;
  --color-tomato: #B44A3C;
  --color-sea-salt: #FAF8F3;
  --color-herb: #4F6A4C;
  --color-navy: #1F2D3D;
`;
