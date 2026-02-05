import { systemColors } from './systemColors';

// Hierarchical category structure for the sunburst
export interface CategoryNode {
  name: string;
  color: string;
  children?: CategoryNode[];
  value?: number; // Leaf nodes have a value
}

// Top-level category definitions
export const categoryColors: Record<string, string> = {
  Proteins: systemColors.navy,
  Starches: systemColors.saffron,
  Produce: systemColors.herb,
  'Dairy & Fats': systemColors.tomatoLight,
  'Sauces & Condiments': systemColors.tomato,
  'Fresh Herbs': systemColors.herbLight,
  'Dried Spices': systemColors.saffronLight,
  Specialty: systemColors.tomato,
};

// Subcategory colors (slightly lighter versions)
export const subcategoryColors: Record<string, string> = {
  Seafood: '#3a4d61',
  Meat: '#4a5d71',
  'Plant-based': '#5a6d81',
  Rice: '#d4a84d',
  'Noodles/Pasta': '#c4983d',
  Grains: '#b4882d',
  Vegetables: '#5f7a5c',
  Citrus: '#6f8a6c',
  Alliums: '#7f9a7c',
  Oils: '#e5c5c1',
  'Cheese/Cream': '#d5b5b1',
  Fermented: '#c45a4c',
  Heat: '#f5d6b4',
  Warm: '#e5c6a4',
};

// Pattern-based classification rules
// Each rule has patterns (regex or string match) and the category path
interface ClassificationRule {
  patterns: RegExp[];
  category: string;
  subcategory: string;
  topLevel: 'Ingredients' | 'Spices & Seasonings';
}

const classificationRules: ClassificationRule[] = [
  // Proteins - Seafood
  {
    patterns: [/shrimp/i, /prawn/i, /fish/i, /seafood/i, /bonito/i, /crab/i, /lobster/i, /squid/i, /octopus/i, /clam/i, /mussel/i, /oyster/i, /anchov/i, /tuna/i, /salmon/i, /cod/i, /mackerel/i, /sardine/i, /scallop/i, /eel/i],
    category: 'Proteins',
    subcategory: 'Seafood',
    topLevel: 'Ingredients',
  },
  // Proteins - Meat
  {
    patterns: [/beef/i, /lamb/i, /chicken/i, /pork/i, /duck/i, /goat/i, /mutton/i, /turkey/i, /bacon/i, /sausage/i, /ham/i, /chorizo/i, /pancetta/i, /prosciutto/i, /guanciale/i],
    category: 'Proteins',
    subcategory: 'Meat',
    topLevel: 'Ingredients',
  },
  // Proteins - Plant-based
  {
    patterns: [/tofu/i, /tempeh/i, /lentil/i, /chickpea/i, /bean/i, /legume/i, /edamame/i, /seitan/i, /soy\s*protein/i, /fava/i, /dal\b/i, /dhal/i],
    category: 'Proteins',
    subcategory: 'Plant-based',
    topLevel: 'Ingredients',
  },
  // Starches - Rice
  {
    patterns: [/jasmine rice/i, /arborio/i, /short.?grain rice/i, /basmati/i, /sticky rice/i, /glutinous rice/i, /sushi rice/i, /\brice\b/i],
    category: 'Starches',
    subcategory: 'Rice',
    topLevel: 'Ingredients',
  },
  // Starches - Noodles/Pasta
  {
    patterns: [/noodle/i, /pasta/i, /spaghetti/i, /linguine/i, /fettuccine/i, /penne/i, /rigatoni/i, /udon/i, /soba/i, /ramen/i, /rice vermicelli/i, /glass noodle/i, /pho noodle/i],
    category: 'Starches',
    subcategory: 'Noodles/Pasta',
    topLevel: 'Ingredients',
  },
  // Starches - Grains
  {
    patterns: [/corn\b/i, /quinoa/i, /teff/i, /millet/i, /couscous/i, /bulgur/i, /barley/i, /wheat/i, /farro/i, /polenta/i, /masa/i, /injera/i, /bread/i, /tortilla/i, /flatbread/i],
    category: 'Starches',
    subcategory: 'Grains',
    topLevel: 'Ingredients',
  },
  // Produce - Vegetables
  {
    patterns: [/tomato/i, /eggplant/i, /aubergine/i, /collard/i, /potato/i, /carrot/i, /cabbage/i, /spinach/i, /bok choy/i, /broccoli/i, /pepper\b(?!corn)/i, /bell pepper/i, /zucchini/i, /squash/i, /pumpkin/i, /cucumber/i, /lettuce/i, /kale/i, /mushroom/i, /artichoke/i, /asparagus/i, /bamboo shoot/i, /bean sprout/i, /bitter melon/i, /morning glory/i, /water spinach/i, /okra/i, /plantain/i, /cassava/i, /yam/i, /taro/i],
    category: 'Produce',
    subcategory: 'Vegetables',
    topLevel: 'Ingredients',
  },
  // Produce - Citrus
  {
    patterns: [/lime/i, /lemon/i, /yuzu/i, /orange/i, /grapefruit/i, /tangerine/i, /calamansi/i, /citrus/i, /tamarind/i, /mango/i, /papaya/i, /pineapple/i],
    category: 'Produce',
    subcategory: 'Citrus',
    topLevel: 'Ingredients',
  },
  // Produce - Alliums
  {
    patterns: [/garlic/i, /shallot/i, /onion/i, /scallion/i, /leek/i, /chive/i, /green onion/i, /spring onion/i, /red onion/i, /white onion/i],
    category: 'Produce',
    subcategory: 'Alliums',
    topLevel: 'Ingredients',
  },
  // Dairy & Fats - Oils
  {
    patterns: [/olive oil/i, /sesame oil/i, /coconut oil/i, /peanut oil/i, /vegetable oil/i, /palm oil/i, /ghee/i, /butter/i, /lard/i, /duck fat/i],
    category: 'Dairy & Fats',
    subcategory: 'Oils',
    topLevel: 'Ingredients',
  },
  // Dairy & Fats - Cheese/Cream
  {
    patterns: [/parmigiano/i, /parmesan/i, /queso/i, /cheese/i, /coconut milk/i, /coconut cream/i, /cream/i, /yogurt/i, /curd/i, /paneer/i, /ricotta/i, /mozzarella/i, /feta/i, /mascarpone/i, /pecorino/i, /milk/i],
    category: 'Dairy & Fats',
    subcategory: 'Cheese/Cream',
    topLevel: 'Ingredients',
  },
  // Sauces & Condiments - Fermented
  {
    patterns: [/fish sauce/i, /soy sauce/i, /miso/i, /gochujang/i, /doenjang/i, /nam pla/i, /oyster sauce/i, /shrimp paste/i, /fermented/i, /kimchi/i, /vinegar/i, /worcestershire/i, /XO sauce/i, /hoisin/i, /sriracha/i, /sambal/i],
    category: 'Sauces & Condiments',
    subcategory: 'Fermented',
    topLevel: 'Ingredients',
  },
  // Fresh Herbs
  {
    patterns: [/basil/i, /cilantro/i, /coriander leaf/i, /lemongrass/i, /galangal/i, /mint/i, /parsley/i, /dill/i, /oregano/i, /thyme/i, /rosemary/i, /sage/i, /bay leaf/i, /curry leaf/i, /pandan/i, /perilla/i, /shiso/i, /chervil/i, /tarragon/i, /marjoram/i],
    category: 'Fresh Herbs',
    subcategory: 'Fresh Herbs',
    topLevel: 'Spices & Seasonings',
  },
  // Dried Spices - Heat
  {
    patterns: [/chili/i, /chile/i, /ají/i, /berbere/i, /gochugaru/i, /cayenne/i, /paprika/i, /peppercorn/i, /black pepper/i, /white pepper/i, /sichuan pepper/i, /szechuan/i, /bird.?s eye/i, /habanero/i, /jalapeño/i, /serrano/i, /ancho/i, /guajillo/i, /chipotle/i, /aleppo/i, /urfa/i, /harissa/i],
    category: 'Dried Spices',
    subcategory: 'Heat',
    topLevel: 'Spices & Seasonings',
  },
  // Dried Spices - Warm
  {
    patterns: [/cumin/i, /coriander seed/i, /cardamom/i, /cinnamon/i, /turmeric/i, /ginger/i, /nutmeg/i, /mace/i, /clove/i, /star anise/i, /fennel/i, /fenugreek/i, /sumac/i, /za'atar/i, /allspice/i, /mustard seed/i, /caraway/i, /saffron/i, /annatto/i, /achiote/i, /five.?spice/i, /garam masala/i, /curry powder/i, /ras el hanout/i],
    category: 'Dried Spices',
    subcategory: 'Warm',
    topLevel: 'Spices & Seasonings',
  },
  // Specialty
  {
    patterns: [/kaffir lime/i, /makrut/i, /epazote/i, /huacatay/i, /ramps/i, /truffle/i, /bonito flakes/i, /dashi/i, /kombu/i, /nori/i, /seaweed/i, /wakame/i, /furikake/i, /nigella/i, /sumac/i, /preserved lemon/i, /rose water/i, /orange blossom/i],
    category: 'Specialty',
    subcategory: 'Specialty',
    topLevel: 'Spices & Seasonings',
  },
];

// Classify a single ingredient/spice
function classifyItem(item: string): { topLevel: string; category: string; subcategory: string } | null {
  const normalized = item.toLowerCase().trim();

  for (const rule of classificationRules) {
    for (const pattern of rule.patterns) {
      if (pattern.test(normalized)) {
        return {
          topLevel: rule.topLevel,
          category: rule.category,
          subcategory: rule.subcategory,
        };
      }
    }
  }

  return null;
}

// Visual types for kitchen constellation
export type VisualType = 'spice' | 'basket' | 'vegetable' | 'herb' | 'grain' | 'bottle';

export interface KitchenIngredient {
  id: string;
  name: string;
  visualType: VisualType;
  isSignature: boolean; // Big star vs small star
  color: string;
}

export interface IngredientPairing {
  source: string;
  target: string;
}

// Common ingredient pairings across cuisines
const pairingGroups: RegExp[][] = [
  // Thai/Southeast Asian
  [/fish sauce/i, /lime/i, /cilantro/i, /Thai basil/i, /lemongrass/i, /galangal/i, /coconut milk/i, /shrimp/i],
  // Ethiopian
  [/berbere/i, /niter kibbeh/i, /lentil/i, /injera/i, /teff/i],
  // Japanese
  [/soy sauce/i, /miso/i, /dashi/i, /bonito/i, /kombu/i, /mirin/i, /sake/i, /rice/i],
  // Korean
  [/gochugaru/i, /gochujang/i, /doenjang/i, /sesame oil/i, /kimchi/i, /garlic/i],
  // Indian
  [/cumin/i, /coriander/i, /turmeric/i, /garam masala/i, /ghee/i, /ginger/i, /garlic/i, /onion/i],
  // Mexican
  [/cumin/i, /chili/i, /lime/i, /cilantro/i, /corn/i, /beans/i, /tomato/i],
  // Italian
  [/olive oil/i, /garlic/i, /basil/i, /tomato/i, /parmesan/i, /pasta/i],
  // Chinese
  [/soy sauce/i, /ginger/i, /garlic/i, /sesame oil/i, /rice/i, /scallion/i],
  // Middle Eastern
  [/cumin/i, /coriander/i, /sumac/i, /za'atar/i, /olive oil/i, /lemon/i, /garlic/i],
  // French
  [/butter/i, /shallot/i, /thyme/i, /wine/i, /cream/i],
];

// Find pairings among a set of ingredients
function findPairings(ingredients: string[]): IngredientPairing[] {
  const pairings: IngredientPairing[] = [];
  const seen = new Set<string>();

  for (const group of pairingGroups) {
    // Find which ingredients match this pairing group
    const matches: string[] = [];
    for (const ingredient of ingredients) {
      for (const pattern of group) {
        if (pattern.test(ingredient)) {
          matches.push(ingredient);
          break;
        }
      }
    }

    // Create pairings between matched ingredients
    for (let i = 0; i < matches.length; i++) {
      for (let j = i + 1; j < matches.length; j++) {
        const key = [matches[i], matches[j]].sort().join('|');
        if (!seen.has(key)) {
          seen.add(key);
          pairings.push({ source: matches[i], target: matches[j] });
        }
      }
    }
  }

  return pairings;
}

// Get visual type based on category
function getVisualType(category: string): VisualType {
  switch (category) {
    case 'Proteins':
      return 'basket';
    case 'Starches':
      return 'grain';
    case 'Produce':
      return 'vegetable';
    case 'Fresh Herbs':
      return 'herb';
    case 'Sauces & Condiments':
      return 'bottle';
    case 'Dried Spices':
    case 'Specialty':
    default:
      return 'spice';
  }
}

// Build kitchen constellation data
export function buildKitchenConstellation(
  keyIngredients: string[],
  spicesAndSeasonings: string[]
): { nodes: KitchenIngredient[]; links: IngredientPairing[] } {
  const nodes: KitchenIngredient[] = [];
  const allItems = [...keyIngredients, ...spicesAndSeasonings];

  // First few ingredients are "signature" (bigger)
  const signatureCount = Math.min(4, Math.ceil(keyIngredients.length / 2));
  const signatureSpiceCount = Math.min(3, Math.ceil(spicesAndSeasonings.length / 2));

  keyIngredients.forEach((ingredient, index) => {
    const classification = classifyItem(ingredient);
    const category = classification?.category || 'Other';
    const visualType = getVisualType(category);

    nodes.push({
      id: ingredient,
      name: ingredient,
      visualType,
      isSignature: index < signatureCount,
      color: getColorForCategory(category),
    });
  });

  spicesAndSeasonings.forEach((spice, index) => {
    const classification = classifyItem(spice);
    const category = classification?.category || 'Dried Spices';
    const visualType = getVisualType(category);

    nodes.push({
      id: spice,
      name: spice,
      visualType,
      isSignature: index < signatureSpiceCount,
      color: getColorForCategory(category),
    });
  });

  const links = findPairings(allItems);

  return { nodes, links };
}

function getColorForCategory(category: string): string {
  switch (category) {
    case 'Proteins':
      return systemColors.navy;
    case 'Starches':
      return '#c4983d';
    case 'Produce':
      return systemColors.herb;
    case 'Dairy & Fats':
      return '#d4a574';
    case 'Sauces & Condiments':
      return systemColors.tomato;
    case 'Fresh Herbs':
      return '#7a9a77';
    case 'Dried Spices':
    case 'Specialty':
      return '#c4883d';
    default:
      return systemColors.navyMuted;
  }
}

// Build hierarchical data structure for D3 sunburst
export interface SunburstNode {
  name: string;
  color?: string;
  children?: SunburstNode[];
  value?: number;
}

export function buildSunburstData(
  keyIngredients: string[],
  spicesAndSeasonings: string[]
): SunburstNode {
  // Build a nested structure: topLevel -> category -> subcategory -> items
  const hierarchy: Record<string, Record<string, Record<string, string[]>>> = {
    Ingredients: {},
    'Spices & Seasonings': {},
  };

  // Track unclassified items
  const unclassified: { ingredients: string[]; spices: string[] } = {
    ingredients: [],
    spices: [],
  };

  // Classify key ingredients
  for (const ingredient of keyIngredients) {
    const classification = classifyItem(ingredient);
    if (classification) {
      const { topLevel, category, subcategory } = classification;
      if (!hierarchy[topLevel][category]) {
        hierarchy[topLevel][category] = {};
      }
      if (!hierarchy[topLevel][category][subcategory]) {
        hierarchy[topLevel][category][subcategory] = [];
      }
      hierarchy[topLevel][category][subcategory].push(ingredient);
    } else {
      unclassified.ingredients.push(ingredient);
    }
  }

  // Classify spices and seasonings
  for (const spice of spicesAndSeasonings) {
    const classification = classifyItem(spice);
    if (classification) {
      const { topLevel, category, subcategory } = classification;
      if (!hierarchy[topLevel][category]) {
        hierarchy[topLevel][category] = {};
      }
      if (!hierarchy[topLevel][category][subcategory]) {
        hierarchy[topLevel][category][subcategory] = [];
      }
      hierarchy[topLevel][category][subcategory].push(spice);
    } else {
      unclassified.spices.push(spice);
    }
  }

  // Add unclassified items to "Other" categories
  if (unclassified.ingredients.length > 0) {
    if (!hierarchy['Ingredients']['Other']) {
      hierarchy['Ingredients']['Other'] = {};
    }
    hierarchy['Ingredients']['Other']['Other'] = unclassified.ingredients;
  }
  if (unclassified.spices.length > 0) {
    if (!hierarchy['Spices & Seasonings']['Other']) {
      hierarchy['Spices & Seasonings']['Other'] = {};
    }
    hierarchy['Spices & Seasonings']['Other']['Other'] = unclassified.spices;
  }

  // Convert to D3-compatible structure
  const root: SunburstNode = {
    name: 'Cuisine',
    children: [],
  };

  for (const [topLevelName, categories] of Object.entries(hierarchy)) {
    if (Object.keys(categories).length === 0) continue;

    const topLevelNode: SunburstNode = {
      name: topLevelName,
      children: [],
    };

    for (const [categoryName, subcategories] of Object.entries(categories)) {
      const categoryNode: SunburstNode = {
        name: categoryName,
        color: categoryColors[categoryName] || systemColors.navy,
        children: [],
      };

      for (const [subcategoryName, items] of Object.entries(subcategories)) {
        // If subcategory equals category (like Fresh Herbs), flatten
        if (subcategoryName === categoryName) {
          for (const item of items) {
            categoryNode.children!.push({
              name: item,
              value: 1,
            });
          }
        } else {
          const subcategoryNode: SunburstNode = {
            name: subcategoryName,
            color: subcategoryColors[subcategoryName] || categoryColors[categoryName] || systemColors.navy,
            children: items.map(item => ({
              name: item,
              value: 1,
            })),
          };
          categoryNode.children!.push(subcategoryNode);
        }
      }

      // Only add category if it has children
      if (categoryNode.children && categoryNode.children.length > 0) {
        topLevelNode.children!.push(categoryNode);
      }
    }

    // Only add top level if it has children
    if (topLevelNode.children && topLevelNode.children.length > 0) {
      root.children!.push(topLevelNode);
    }
  }

  return root;
}
