import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { CountryDetail } from './pages/CountryDetail';
import { Wishlist } from './pages/Wishlist';
import { Profile } from './pages/Profile';
import { AtRestaurant } from './pages/AtRestaurant';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/country/:id" element={<CountryDetail />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/restaurant" element={<AtRestaurant />} />
        <Route path="/restaurant/:id" element={<AtRestaurant />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
