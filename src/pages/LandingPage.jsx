import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import Navigation from '../components/Navigation';
import HeroSection from '../components/HeroSection';
import ProductShowcase from '../components/ProductShowcase';
import FeaturesSection from '../components/FeaturesSection';
import Footer from '../components/Footer';
import CartDrawer from '../components/CartDrawer';

export default function LandingPage() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  const handleCartToggle = () => {
    setIsCartOpen(!isCartOpen);
  };

  const handleCartClose = () => {
    setIsCartOpen(false);
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation with Dynamic Island */}
      {/* Main Content */}
      <main className="flex-grow">
        <HeroSection />
        <ProductShowcase />
        <FeaturesSection />
      </main>
      <Footer />
      {/* Cart Drawer as Full-Screen Modal */}
      <CartDrawer isOpen={isCartOpen} onClose={handleCartClose} />
      
      {/* Toast Notifications */}
      <Toaster />
    </div>
  );
}
