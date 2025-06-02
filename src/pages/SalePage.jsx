import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardBody, Button, Chip, Badge } from '@heroui/react';
import { Heart, ShoppingCart, Clock, Percent } from 'lucide-react';
import { useTheme } from '../components/ThemeProvider';
import { useCart } from '../context/CartContext';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const SalePage = () => {
  const { isDark } = useTheme();
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState(new Set());
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 14,
    minutes: 30,
    seconds: 45
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchSaleProducts = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const saleProducts = [
        {
          id: 401,
          name: "Nike Air Max 270 React",
          description: "Comfortable lifestyle sneakers with React foam.",
          originalPrice: "150.00",
          salePrice: "89.99",
          discount: 40,
          variant: "Black/White / 10",
          inventory: 23,
          category: "Lifestyle",
          image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop",
          endDate: "2024-12-31",
          rating: 4.5,
          reviews: 123
        },
        {
          id: 402,
          name: "Adidas Superstar",
          description: "Classic shell toe sneakers with 3-Stripes design.",
          originalPrice: "90.00",
          salePrice: "54.00",
          discount: 40,
          variant: "White/Black / 9",
          inventory: 45,
          category: "Lifestyle",
          image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&h=400&fit=crop",
          endDate: "2024-12-31",
          rating: 4.6,
          reviews: 567
        },
        {
          id: 403,
          name: "Converse All Star Low",
          description: "Timeless canvas sneakers for everyday wear.",
          originalPrice: "55.00",
          salePrice: "38.50",
          discount: 30,
          variant: "Navy/White / 8",
          inventory: 67,
          category: "Casual",
          image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop",
          endDate: "2024-12-31",
          rating: 4.4,
          reviews: 890
        },
        {
          id: 404,
          name: "Vans Authentic",
          description: "Original skate shoe with waffle outsole.",
          originalPrice: "60.00",
          salePrice: "36.00",
          discount: 40,
          variant: "Red/White / 11",
          inventory: 34,
          category: "Skate",
          image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
          endDate: "2024-12-31",
          rating: 4.3,
          reviews: 234
        },
        {
          id: 405,
          name: "New Balance 574",
          description: "Heritage running shoe with ENCAP midsole.",
          originalPrice: "80.00",
          salePrice: "56.00",
          discount: 30,
          variant: "Grey/Navy / 9.5",
          inventory: 28,
          category: "Running",
          image: "https://images.unsplash.com/photo-1551107696-a4b57a9d33b8?w=400&h=400&fit=crop",
          endDate: "2024-12-31",
          rating: 4.7,
          reviews: 345
        }
      ];
      
      setProducts(saleProducts);
      setLoading(false);
    };

    fetchSaleProducts();
  }, []);

  const toggleFavorite = (productId) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(productId)) {
        newFavorites.delete(productId);
      } else {
        newFavorites.add(productId);
      }
      return newFavorites;
    });
  };

  const ProductCard = ({ product }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className="group"
    >
      <Card className={`${
        isDark 
          ? 'bg-black/40 border-red-500/30 backdrop-blur-md hover:border-red-500/60' 
          : 'bg-white/80 backdrop-blur-md shadow-lg hover:shadow-xl'
      } border transition-all duration-300`}>
        <CardBody className="p-0">
          <div className="relative aspect-square overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            
            <div className="absolute top-3 left-3 flex flex-col gap-2">
              <Badge color="danger" variant="solid" className="font-bold">
                -{product.discount}% OFF
              </Badge>
              <Badge color="warning" variant="solid">
                SALE
              </Badge>
            </div>

            <div className="absolute top-3 right-3">
              <Button
                isIconOnly
                size="sm"
                variant="flat"
                className={`${
                  favorites.has(product.id) 
                    ? 'bg-red-500 text-white' 
                    : 'bg-white/80 text-gray-700'
                }`}
                onClick={() => toggleFavorite(product.id)}
              >
                <Heart size={16} fill={favorites.has(product.id) ? 'currentColor' : 'none'} />
              </Button>
            </div>
          </div>

          <div className="p-4">
            <Chip size="sm" variant="flat" color="danger" className="mb-2">
              {product.category}
            </Chip>
            <h3 className={`font-bold text-lg mb-1 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              {product.name}
            </h3>
            <p className={`text-sm mb-2 ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}>
              {product.description}
            </p>
            <p className={`text-xs mb-3 ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}>
              {product.variant}
            </p>
            
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className={`text-xl font-bold ${
                  isDark ? 'text-red-400' : 'text-red-600'
                }`}>
                  ${product.salePrice}
                </span>
                <span className={`text-sm line-through ${
                  isDark ? 'text-gray-500' : 'text-gray-400'
                }`}>
                  ${product.originalPrice}
                </span>
              </div>
              <div className={`text-sm ${
                isDark ? 'text-gray-400' : 'text-gray-500'
              }`}>
                ⭐ {product.rating} ({product.reviews})
              </div>
            </div>

            <Button
              className={`w-full font-bold ${
                isDark
                  ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white'
                  : 'bg-gradient-to-r from-red-600 to-pink-600 text-white'
              }`}
              startContent={<ShoppingCart size={16} />}
              onClick={() => addToCart({...product, price: product.salePrice}, product.variant, 1)}
              disabled={product.inventory === 0}
            >
              {product.inventory === 0 ? 'Out of Stock' : 'Add to Cart'}
            </Button>
          </div>
        </CardBody>
      </Card>
    </motion.div>
  );

  return (
    <div className={`min-h-screen ${isDark ? 'bg-black' : 'bg-gray-50'}`}>
      <Navigation />
      
      <div className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className={`text-5xl font-bold mb-4 ${
              isDark 
                ? 'text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-pink-400' 
                : 'text-gray-900'
            }`}>
              MEGA SALE 🔥
            </h1>
            <p className={`text-xl max-w-2xl mx-auto mb-8 ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Up to 40% off on selected sneakers. Limited time offer!
            </p>

            {/* Countdown Timer */}
            <motion.div 
              className={`inline-flex items-center gap-4 p-6 rounded-2xl ${
                isDark ? 'bg-red-500/20 border border-red-500/30' : 'bg-red-50 border border-red-200'
              }`}
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Clock className={isDark ? 'text-red-400' : 'text-red-600'} size={24} />
              <div className="flex gap-4">
                {Object.entries(timeLeft).map(([unit, value]) => (
                  <div key={unit} className="text-center">
                    <div className={`text-2xl font-bold ${
                      isDark ? 'text-red-400' : 'text-red-600'
                    }`}>
                      {value.toString().padStart(2, '0')}
                    </div>
                    <div className={`text-xs uppercase ${
                      isDark ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {unit}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Products Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className={`aspect-[3/4] rounded-lg animate-pulse ${
                  isDark ? 'bg-gray-800' : 'bg-gray-200'
                }`} />
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {products.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SalePage;
