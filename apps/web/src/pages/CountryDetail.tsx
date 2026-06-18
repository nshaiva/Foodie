import { useParams, Link } from 'react-router-dom';
import { getCountryById } from '../data/countries';
import { systemColors } from '../data/systemColors';
import { useDishes } from '../hooks/useDishes';
import { useWishlist } from '../hooks/useWishlist';
import { useFavorites } from '../hooks/useFavorites';
import {
  CarouselProvider,
  CarouselContainer,
  CarouselSlide,
  CarouselTabs,
  CarouselDots,
  CarouselArrows,
} from '../components/carousel';
import {
  CountryHeader,
  MyActivitySection,
  CultureRegionsSlide,
  ProfileSlide,
  DishesSlide,
  BeveragesSlide,
} from '../components/country-detail';
import type { RestaurantTry } from '../data/types';

export function CountryDetail() {
  const { id } = useParams<{ id: string }>();
  const country = id ? getCountryById(id) : undefined;

  const {
    addDish,
    updateDish,
    deleteDish,
    getDishesByCountry,
    addRestaurantTry,
    updateRestaurantTry,
    deleteRestaurantTry,
  } = useDishes();

  const { addToWishlist, removeFromWishlist, isOnWishlist, findWishlistItem } = useWishlist();
  const { addToFavorites, removeFromFavorites, isFavorite, findFavoriteItem } = useFavorites();

  if (!country) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Country not found</h1>
          <Link to="/" className="text-blue-600 hover:underline">
            Back to all countries
          </Link>
        </div>
      </div>
    );
  }

  const countryDishes = getDishesByCountry(country.id);
  const colors = country.colorPalette;

  const handleAddDish = (data: {
    countryId: string;
    region?: string;
    name: string;
    notes?: string;
    tasteRating?: number;
    initialRestaurantTry?: Omit<RestaurantTry, 'id'>;
  }) => {
    addDish({
      countryId: data.countryId,
      region: data.region,
      name: data.name,
      notes: data.notes,
      tasteRating: data.tasteRating,
      restaurantTries: data.initialRestaurantTry
        ? [{ ...data.initialRestaurantTry, id: crypto.randomUUID() }]
        : [],
    });
  };

  // Build tabs array based on available content
  // Order: Culture & Regions, Profile, Dishes, Beverages
  const hasBeverages = country.popularBeverages && country.popularBeverages.length > 0;
  const tabs = [
    { label: 'Culture & Regions' },
    { label: 'Profile' },
    { label: 'Dishes' },
    ...(hasBeverages ? [{ label: 'Beverages' }] : []),
  ];

  const slideCount = tabs.length;

  return (
    <div className="min-h-screen" style={{ backgroundColor: systemColors.seaSalt }}>
      <CountryHeader
        name={country.name}
        capital={country.capital}
        region={country.region}
        colors={colors}
      />

      <main className="max-w-5xl mx-auto px-4 py-8">
        {/* Cuisine Summary - above carousel */}
        <section className="mb-6">
          <p className="text-lg leading-relaxed" style={{ color: systemColors.navy }}>
            {country.cuisineProfile.summary}
          </p>
        </section>

        <CarouselProvider>
          {/* Tabs navigation */}
          <CarouselTabs
            tabs={tabs}
            primaryColor={colors.primary}
            textColor={systemColors.navy}
          />

          {/* Carousel content */}
          <div className="bg-white rounded-lg border border-gray-200 h-[920px]">
            <CarouselContainer>
              {/* Slide 1: Culture & Regions */}
              <CarouselSlide>
                <CultureRegionsSlide
                  countryId={country.id}
                  foodCulture={country.foodCulture}
                  regions={country.regionalVariations}
                  colors={colors}
                />
              </CarouselSlide>

              {/* Slide 2: Profile */}
              <CarouselSlide>
                <ProfileSlide
                  country={country}
                  colors={colors}
                />
              </CarouselSlide>

              {/* Slide 3: Dishes */}
              <CarouselSlide>
                <DishesSlide
                  popularDishes={country.popularDishes}
                  regionalVariations={country.regionalVariations}
                  colors={colors}
                  countryId={country.id}
                  isOnWishlist={isOnWishlist}
                  isFavorite={isFavorite}
                  addToWishlist={addToWishlist}
                  removeFromWishlist={removeFromWishlist}
                  findWishlistItem={findWishlistItem}
                  addToFavorites={addToFavorites}
                  removeFromFavorites={removeFromFavorites}
                  findFavoriteItem={findFavoriteItem}
                />
              </CarouselSlide>

              {/* Slide 4: Beverages (conditional) */}
              {hasBeverages && (
                <CarouselSlide>
                  <BeveragesSlide
                    beverages={country.popularBeverages!}
                    colors={colors}
                    countryId={country.id}
                  />
                </CarouselSlide>
              )}
            </CarouselContainer>
          </div>

          {/* Navigation controls */}
          <div className="flex items-center justify-between mt-4">
            <CarouselArrows primaryColor={colors.primary} />
            <CarouselDots count={slideCount} primaryColor={colors.primary} />
          </div>
        </CarouselProvider>

        {/* My Activity Section - below carousel */}
        <MyActivitySection
          countryId={country.id}
          countryName={country.name}
          regions={country.regionalVariations?.map(r => r.name)}
          regionalVariations={country.regionalVariations}
          popularDishes={country.popularDishes}
          dishes={countryDishes}
          onAddDish={handleAddDish}
          onUpdateDish={updateDish}
          onDeleteDish={deleteDish}
          onAddRestaurantTry={addRestaurantTry}
          onUpdateRestaurantTry={updateRestaurantTry}
          onDeleteRestaurantTry={deleteRestaurantTry}
        />
      </main>
    </div>
  );
}
