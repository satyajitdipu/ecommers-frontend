import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LandingPage from './pages/LandingPage';
import CheckoutPage from './pages/CheckoutPage';
import ThankYouPage from './pages/ThankYouPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 p-6">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/thank-you/:orderId" element={<ThankYouPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
