import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HeroUIProvider } from "@heroui/react";
import { ThemeProvider } from "./components/ThemeProvider";
import { CartProvider } from "./context/CartContext";

import LandingPage from "./pages/LandingPage";
import CheckoutPage from "./pages/CheckoutPage";
import ThankYouPageNew from "./pages/ThankYouPageNew";
import Navigation from "./components/Navigation";
import ProductShowcase from "./components/ProductShowcase";
import CartDrawer from "./components/CartDrawer";

function App() {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <HeroUIProvider>
      <ThemeProvider>
        <CartProvider>
          <Router>
            <Navigation onCartClick={() => setCartOpen(true)} />
            <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
            <div className="min-h-screen pt-24 transition-all duration-300">
              {" "}
              {/* Add padding for nav */}
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/thank-you/:orderId" element={<ThankYouPageNew />} />
                {/* Add your additional routes here */}
              </Routes>
            </div>
          </Router>
        </CartProvider>
      </ThemeProvider>
    </HeroUIProvider>
  );
}

export default App;
