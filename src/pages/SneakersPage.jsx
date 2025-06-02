import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardBody, Button, Chip, Badge } from '@heroui/react';
import { Heart, ShoppingCart, Filter, SlidersHorizontal } from 'lucide-react';
import { useTheme } from '../components/ThemeProvider';
import { useCart } from '../context/CartContext';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const SneakersPage = () => {
  const { isDark } = useTheme();
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState(new Set());
  const [filterCategory, setFilterCategory] = useState('all');

  useEffect(() => {
    const fetchSneakerProducts = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const sneakerProducts = [
        {
          id: 301,
          name: "Air Jordan 1 Retro High OG",
          description: "The original that started it all. Premium leather construction.",
          price: "170.00",
          variant: "Chicago / 10",
          inventory: 12,
          category: "Basketball",
          image: "https://images.unsplash.com/photo-1551107696-a4b57a9d33b8?w=400&h=400&fit=crop",
          isNew: true,
          isHot: true,
          rating: 4.9,
          reviews: 1250
        },
        {
          id: 302,
          name: "Nike Air Max 90",
          description: "Iconic running shoe with visible Air cushioning.",
          price: "120.00",
          variant: "White/Black/Red / 9",
          inventory: 35,
          category: "Running",
          image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop",
          isNew: false,
          isHot: true,
          rating: 4.7,
          reviews: 890
        },
        {
          id: 303,
          name: "Adidas Yeezy Boost 350 V2",
          description: "Kanye West's signature sneaker with Boost technology.",
          price: "220.00",
          variant: "Zebra / 8.5",
          inventory: 6,
          category: "Lifestyle",
          image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&h=400&fit=crop",
          isNew: true,
          isHot: true,
          rating: 4.8,
          reviews: 567
        },
        {
          id: 304,
          name: "Nike Dunk Low",
          description: "College basketball heritage meets street style.",
          price: "110.00",
          variant: "Panda / 11",
          inventory: 28,
          category: "Lifestyle",
          image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop",
          isNew: false,
          isHot: true,
          rating: 4.6,
          reviews: 734
        },
        {
          id: 305,
          name: "Converse x Off-White Chuck 70",
          description: "Deconstructed design by Virgil Abloh.",
          price: "130.00",
          variant: "Clear/White / 9.5",
          inventory: 4,
          category: "Designer",
          image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
          isNew: true,
          isHot: false,
          rating: 4.9,
          reviews: 234
        },
        {
          id: 306,
          name: "New Balance 550",
          description: "Retro basketball silhouette with premium materials.",
          price: "110.00",
          variant: "White/Green / 10",
          inventory: 19,
          category: "Basketball",
          image: "https://images.unsplash.com/photo-1551107696-a4b57a9d33b8?w=400&h=400&fit=crop",
          isNew: false,
          isHot: false,
          rating: 4.7,
          reviews: 445
        }
      ];
      
      setProducts(sneakerProducts);
      setLoading(false);
    };

    fetchSneakerProducts();
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

  const filteredProducts = filterCategory === 'all' 
    ? products 
    : products.filter(product => product.category.toLowerCase() === filterCategory);

  const categories = ['all', 'basketball', 'running', 'lifestyle', 'designer'];

  const ProductCard = ({ product }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className="group"
    >
      <Card className={`${
        isDark 
          ? 'bg-black/40 border-orange-500/30 backdrop-blur-md hover:border-orange-500/60' 
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
                <Badge color="success" variant="solid">NEW</Badge>
              )}
              {product.isHot && (
                <Badge color="danger" variant="solid">🔥 HOT</Badge>
              )}
              {product.inventory < 10 && (
                <Badge color="warning" variant="solid">RARE</Badge>
              )}
            </div>

            <div className="absolute top-3 right-3">
              <Button
                isIconOnly
                size="sm"
                variant="flat"
                className={`${
                  favorites.has(product.id) 
                    ? 'bg-orange-500 text-white' 
                    : 'bg-white/80 text-gray-700'
                }`}
                onClick={() => toggleFavorite(product.id)}
              >
                <Heart size={16} fill={favorites.has(product.id) ? 'currentColor' : 'none'} />
              </Button>
            </div>
          </div>

          <div className="p-4">
            <Chip size="sm" variant="flat" color="warning" className="mb-2">
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
                isDark ? 'text-orange-400' : 'text-orange-600'
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
                  ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white'
                  : 'bg-gradient-to-r from-orange-600 to-red-600 text-white'
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
                ? 'text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400' 
                : 'text-gray-900'
            }`}>
              PREMIUM SNEAKERS
            </h1>
            <p className={`text-xl max-w-2xl mx-auto ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Exclusive collection of limited edition and classic sneakers
            </p>
          </motion.div>

          {/* Filters */}
          <div className="flex flex-wrap gap-3 mb-8 justify-center">
            {categories.map(category => (
              <Button
                key={category}
                variant={filterCategory === category ? 'solid' : 'bordered'}
                size="sm"
                onClick={() => setFilterCategory(category)}
                className={`capitalize ${
                  filterCategory === category 
                    ? isDark ? 'bg-orange-500' : 'bg-orange-600'
                    : ''
                }`}
              >
                {category}
              </Button>
            ))}
          </div>

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
              {filteredProducts.map((product, index) => (
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

export default SneakersPage;