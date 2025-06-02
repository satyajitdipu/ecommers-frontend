import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './components/ThemeProvider';
import { CartProvider } from './context/CartContext';
import LandingPage from './pages/LandingPage';
import MenPage from './pages/MenPage';
import WomenPage from './pages/WomenPage';
import SneakersPage from './pages/SneakersPage';
import SalePage from './pages/SalePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <Router>
          <div className="App">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/men" element={<MenPage />} />
              <Route path="/women" element={<WomenPage />} />
              <Route path="/sneakers" element={<SneakersPage />} />
              <Route path="/sale" element={<SalePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
            <Toaster />
          </div>
        </Router>
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;
