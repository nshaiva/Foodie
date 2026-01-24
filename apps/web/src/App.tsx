import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { CountryDetail } from './pages/CountryDetail';
import { Restaurants } from './pages/Restaurants';
import { Dishes } from './pages/Dishes';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/country/:id" element={<CountryDetail />} />
        <Route path="/restaurants" element={<Restaurants />} />
        <Route path="/dishes" element={<Dishes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
