import { useParams, Link } from 'react-router-dom';
import { getCountryById } from '../data/countries';
import { useRestaurants } from '../hooks/useRestaurants';
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
} from '../components/country-detail';
import type { RestaurantTry, CookingAttempt } from '../data/types';

export function CountryDetail() {
  const { id } = useParams<{ id: string }>();
  const country = id ? getCountryById(id) : undefined;

  const {
    addRestaurant,
    updateRestaurant,
    deleteRestaurant,
    getRestaurantsByCountry,
    findOrCreateRestaurant,
    addVisit,
    updateVisit,
    deleteVisit,
  } = useRestaurants();

  const {
    addDish,
    updateDish,
    deleteDish,
    getDishesByCountry,
    addRestaurantTry,
    updateRestaurantTry,
    deleteRestaurantTry,
    addCookingAttempt,
    updateCookingAttempt,
    deleteCookingAttempt,
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

  const countryRestaurants = getRestaurantsByCountry(country.id);
  const countryDishes = getDishesByCountry(country.id);
  const colors = country.colorPalette;

  const handleAddDish = (data: {
    countryId: string;
    region?: string;
    name: string;
    notes?: string;
    tasteRating?: number;
    initialRestaurantTry?: Omit<RestaurantTry, 'id'>;
    initialCookingAttempt?: Omit<CookingAttempt, 'id'>;
  }) => {
    let processedTry = data.initialRestaurantTry;
    if (processedTry?.restaurantName && !processedTry.restaurantId) {
      const restaurant = findOrCreateRestaurant(data.countryId, processedTry.restaurantName, processedTry.date);
      processedTry = {
        ...processedTry,
        restaurantId: restaurant.id,
        restaurantName: undefined,
      };
    }

    addDish({
      countryId: data.countryId,
      region: data.region,
      name: data.name,
      notes: data.notes,
      tasteRating: data.tasteRating,
      restaurantTries: processedTry ? [{ ...processedTry, id: crypto.randomUUID() }] : [],
      cookingAttempts: data.initialCookingAttempt ? [{ ...data.initialCookingAttempt, id: crypto.randomUUID() }] : [],
    });
  };

  const handleAddRestaurantTry = (dishId: string, data: Omit<RestaurantTry, 'id'>) => {
    const dish = countryDishes.find(d => d.id === dishId);
    if (!dish) return;

    if (data.restaurantName && !data.restaurantId) {
      const restaurant = findOrCreateRestaurant(dish.countryId, data.restaurantName, data.date);
      addRestaurantTry(dishId, {
        ...data,
        restaurantId: restaurant.id,
        restaurantName: undefined,
      });
    } else {
      addRestaurantTry(dishId, data);
    }
  };

  // Build tabs array based on available content
  // Order: Culture & Regions, Profile, Dishes
  const tabs = [
    { label: 'Culture & Regions' },
    { label: 'Profile' },
    { label: 'Dishes' },
  ];

  const slideCount = tabs.length;

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.background }}>
      <CountryHeader
        name={country.name}
        capital={country.capital}
        region={country.region}
        colors={colors}
      />

      <main className="max-w-5xl mx-auto px-4 py-8">
        {/* Cuisine Summary - above carousel */}
        <section className="mb-6">
          <p className="text-lg leading-relaxed" style={{ color: colors.text }}>
            {country.cuisineProfile.summary}
          </p>
        </section>

        <CarouselProvider slideCount={slideCount}>
          {/* Tabs navigation */}
          <CarouselTabs
            tabs={tabs}
            primaryColor={colors.primary}
            textColor={colors.text}
          />

          {/* Carousel content */}
          <div className="bg-white rounded-lg border border-gray-200 h-[680px]">
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
                  cuisineProfile={country.cuisineProfile}
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
          restaurants={countryRestaurants}
          dishes={countryDishes}
          onAddRestaurant={addRestaurant}
          onUpdateRestaurant={updateRestaurant}
          onDeleteRestaurant={deleteRestaurant}
          onAddVisit={addVisit}
          onUpdateVisit={updateVisit}
          onDeleteVisit={deleteVisit}
          onAddDish={handleAddDish}
          onUpdateDish={updateDish}
          onDeleteDish={deleteDish}
          onAddRestaurantTry={handleAddRestaurantTry}
          onUpdateRestaurantTry={updateRestaurantTry}
          onDeleteRestaurantTry={deleteRestaurantTry}
          onAddCookingAttempt={addCookingAttempt}
          onUpdateCookingAttempt={updateCookingAttempt}
          onDeleteCookingAttempt={deleteCookingAttempt}
        />
      </main>
    </div>
  );
}
