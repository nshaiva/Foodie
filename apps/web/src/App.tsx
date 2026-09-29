import { BrowserRouter, Routes, Route, Navigate, useLocation, useParams, useSearchParams } from 'react-router-dom';
import { Wishlist } from './pages/Wishlist';
import { Profile } from './pages/Profile';
import { AtRestaurant } from './pages/AtRestaurant';
import { Explore } from './pages/Explore';
import { CloudSyncProvider } from './hooks/CloudSyncProvider';
import { useSurveyDishSync } from './hooks/useSurveyDishSync';
import { countryPath } from './utils/countryPath';

function SurveyDishSync() {
  useSurveyDishSync();
  return null;
}

/** Old country-page links (`/country/MX?region=central`) land on the same view in Explore. */
function CountryRedirect() {
  const { id = '' } = useParams();
  const [searchParams] = useSearchParams();
  return <Navigate to={countryPath(id.toUpperCase(), searchParams.get('region'))} replace />;
}

function ExploreRedirect() {
  const { search } = useLocation();
  return <Navigate to={`/${search}`} replace />;
}

function App() {
  return (
    <BrowserRouter>
      <CloudSyncProvider>
        <SurveyDishSync />
        <Routes>
          <Route path="/" element={<Explore />} />
          <Route path="/explore" element={<ExploreRedirect />} />
          <Route path="/country/:id" element={<CountryRedirect />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/restaurant" element={<AtRestaurant />} />
          <Route path="/restaurant/:id" element={<AtRestaurant />} />
        </Routes>
      </CloudSyncProvider>
    </BrowserRouter>
  );
}

export default App;
