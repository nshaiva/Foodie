import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { CountryDetail } from './pages/CountryDetail';
import { Restaurants } from './pages/Restaurants';
import { Dishes } from './pages/Dishes';
import { Wishlist } from './pages/Wishlist';
import { Stats } from './pages/Stats';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/country/:id" element={<CountryDetail />} />
        <Route path="/restaurants" element={<Restaurants />} />
        <Route path="/dishes" element={<Dishes />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/stats" element={<Stats />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
