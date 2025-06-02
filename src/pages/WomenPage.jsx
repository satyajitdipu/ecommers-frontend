import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardBody, Button, Chip, Badge } from '@heroui/react';
import { Heart, ShoppingCart, Grid, List } from 'lucide-react';
import { useTheme } from '../components/ThemeProvider';
import { useCart } from '../context/CartContext';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const WomenPage = () => {
  const { isDark } = useTheme();
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState(new Set());

  useEffect(() => {
    const fetchWomenProducts = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const womenProducts = [
        {
          id: 201,
          name: "Nike Air Force 1 '07",
          description: "Classic white sneakers with timeless design and premium leather.",
          price: "110.00",
          variant: "White/White / 7",
          inventory: 28,
          category: "Lifestyle",
          image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop",
          isNew: false,
          isHot: true,
          rating: 4.7,
          reviews: 456
        },
        {
          id: 202,
          name: "Adidas Stan Smith",
          description: "Minimalist tennis shoes with perforated 3-Stripes.",
          price: "80.00",
          variant: "White/Green / 6.5",
          inventory: 42,
          category: "Tennis",
          image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&h=400&fit=crop",
          isNew: true,
          isHot: false,
          rating: 4.8,
          reviews: 234
        },
        {
          id: 203,
          name: "Converse Chuck Taylor All Star",
          description: "Iconic canvas sneakers with vulcanized rubber sole.",
          price: "60.00",
          variant: "Pink/White / 8",
          inventory: 35,
          category: "Lifestyle",
          image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop",
          isNew: false,
          isHot: false,
          rating: 4.6,
          reviews: 789
        },
        {
          id: 204,
          name: "New Balance 327",
          description: "Retro-inspired running shoes with bold N logo.",
          price: "90.00",
          variant: "Cream/Brown / 7.5",
          inventory: 16,
          category: "Running",
          image: "https://images.unsplash.com/photo-1551107696-a4b57a9d33b8?w=400&h=400&fit=crop",
          isNew: true,
          isHot: true,
          rating: 4.9,
          reviews: 123
        },
        {
          id: 205,
          name: "Vans Old Skool Platform",
          description: "Classic skate shoes elevated with platform sole.",
          price: "75.00",
          variant: "Black/White / 6",
          inventory: 24,
          category: "Platform",
          image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
          isNew: false,
          isHot: true,
          rating: 4.5,
          reviews: 345
        },
        {
          id: 206,
          name: "Nike Blazer Mid '77",
          description: "Vintage basketball style with modern comfort updates.",
          price: "100.00",
          variant: "White/Black / 8.5",
          inventory: 31,
          category: "Basketball",
          image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop",
          isNew: false,
          isHot: false,
          rating: 4.7,
          reviews: 198
        }
      ];
      
      setProducts(womenProducts);
      setLoading(false);
    };

    fetchWomenProducts();
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
          ? 'bg-black/40 border-pink-500/30 backdrop-blur-md hover:border-pink-500/60' 
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
              {product.isNew && (
                <Badge color="secondary" variant="solid">NEW</Badge>
              )}
              {product.isHot && (
                <Badge color="danger" variant="solid">💖 HOT</Badge>
              )}
              {product.inventory < 20 && (
                <Badge color="warning" variant="solid">LOW STOCK</Badge>
              )}
            </div>

            <div className="absolute top-3 right-3">
              <Button
                isIconOnly
                size="sm"
                variant="flat"
                className={`${
                  favorites.has(product.id) 
                    ? 'bg-pink-500 text-white' 
                    : 'bg-white/80 text-gray-700'
                }`}
                onClick={() => toggleFavorite(product.id)}
              >
                <Heart size={16} fill={favorites.has(product.id) ? 'currentColor' : 'none'} />
              </Button>
            </div>
          </div>

          <div className="p-4">
            <Chip size="sm" variant="flat" color="secondary" className="mb-2">
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
              <span className={`text-xl font-bold ${
                isDark ? 'text-pink-400' : 'text-pink-600'
              }`}>
                ${product.price}
              </span>
              <div className={`text-sm ${
                isDark ? 'text-gray-400' : 'text-gray-500'
              }`}>
                ⭐ {product.rating} ({product.reviews})
              </div>
            </div>

            <Button
              className={`w-full font-bold ${
                isDark
                  ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white'
                  : 'bg-gradient-to-r from-pink-600 to-purple-600 text-white'
              }`}
              startContent={<ShoppingCart size={16} />}
              onClick={() => addToCart(product, product.variant, 1)}
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
                ? 'text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400' 
                : 'text-gray-900'
            }`}>
              WOMEN'S COLLECTION
            </h1>
            <p className={`text-xl max-w-2xl mx-auto ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Elegant and comfortable sneakers for every occasion
            </p>
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

export default WomenPage;
