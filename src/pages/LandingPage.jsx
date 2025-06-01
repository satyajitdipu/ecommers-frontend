import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function LandingPage() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/products');
        setProducts(res.data);
      } catch (err) {
        setError('Failed to load product. Please try again later.');
      }
    };
    fetchProducts();
  }, []);

  if (error) return <div className="text-red-600 text-center mt-10">{error}</div>;

  const handleBuyNow = (product) => {
    // Navigate to checkout page with product info in state
    navigate('/checkout', { state: { product, quantity: 1, variant: product.variants ? product.variants[0] : null } });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Our Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(product => (
          <div
            key={product._id || product.id}
            className="bg-white rounded shadow p-4 flex flex-col"
          >
            <img
              src={product.image}
              alt={product.name || product.title}
              className="w-full h-48 object-cover rounded"
            />
            <h2 className="text-xl font-semibold mt-2">
              {product.name || product.title}
            </h2>
            <p className="text-gray-600 mt-1">{product.description}</p>
            <p className="text-lg font-bold mt-2">₹{product.price}</p>
            <button
              onClick={() => handleBuyNow(product)}
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition"
            >
              Buy Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
