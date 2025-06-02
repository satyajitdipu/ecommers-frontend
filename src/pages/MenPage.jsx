import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardBody, Button, Chip, Badge } from '@heroui/react';
import { Filter, Grid, List, SlidersHorizontal, Heart, ShoppingCart } from 'lucide-react';
import { useTheme } from '../components/ThemeProvider';
import { useCart } from '../context/CartContext';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const MenPage = () => {
  const { isDark } = useTheme();
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('featured');
  const [favorites, setFavorites] = useState(new Set());

  useEffect(() => {
    const fetchMenProducts = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const menProducts = [
        {
          id: 101,
          name: "Nike Air Jordan 1 Retro High",
          description: "Classic basketball shoe with premium leather upper and Air-Sole unit.",
          price: "170.00",
          variant: "Black/Red / 10",
          inventory: 15,
          category: "Basketball",
          image: "https://images.unsplash.com/photo-1551107696-a4b57a9d33b8?w=400&h=400&fit=crop",
          isNew: true,
          isHot: true,
          rating: 4.8,
          reviews: 342
        },
        {
          id: 102,
          name: "Adidas Ultraboost 23",
          description: "Energy-returning running shoes with Primeknit upper.",
          price: "180.00",
          variant: "Core Black / 9",
          inventory: 22,
          category: "Running",
          image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&h=400&fit=crop",
          isNew: false,
          isHot: true,
          rating: 4.9,
          reviews: 156
        },
        {
          id: 103,
          name: "Converse Chuck 70 High Top",
          description: "Vintage-inspired canvas sneakers with enhanced comfort.",
          price: "85.00",
          variant: "Optical White / 11",
          inventory: 45,
          category: "Lifestyle",
          image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop",
          isNew: false,
          isHot: false,
          rating: 4.6,
          reviews: 203
        },
        {
          id: 104,
          name: "New Balance 990v5",
          description: "Premium made-in-USA sneakers with ENCAP midsole technology.",
          price: "185.00",
          variant: "Grey / 10.5",
          inventory: 8,
          category: "Lifestyle",
          image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop",
          isNew: true,
          isHot: false,
          rating: 4.7,
          reviews: 89
        },
        {
          id: 105,
          name: "Vans Sk8-Hi",
          description: "High-top skate shoes with signature waffle outsole.",
          price: "65.00",
          variant: "Black/White / 9.5",
          inventory: 33,
          category: "Skate",
          image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
          isNew: false,
          isHot: false,
          rating: 4.5,
          reviews: 124
        },
        {
          id: 106,
          name: "Nike Air Max 97",
          description: "Retro running shoes with full-length visible Air-Sole unit.",
          price: "170.00",
          variant: "Silver Bullet / 10",
          inventory: 19,
          category: "Lifestyle",
          image: "https://images.unsplash.com/photo-1551107696-a4b57a9d33b8?w=400&h=400&fit=crop",
          isNew: false,
          isHot: true,
          rating: 4.8,
          reviews: 267
        }
      ];
      
      setProducts(menProducts);
      setLoading(false);
    };

    fetchMenProducts();
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
          ? 'bg-black/40 border-neon-blue/30 backdrop-blur-md hover:border-neon-blue/60' 
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
                <Badge color="primary" variant="solid">NEW</Badge>
              )}
              {product.isHot && (
                <Badge color="danger" variant="solid">🔥 HOT</Badge>
              )}
              {product.inventory < 20 && (
                <Badge color="warning" variant="solid">LOW STOCK</Badge>
              )}
            </div>

            <div className="absolute top-3 right-3 flex flex-col gap-2">
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
            <Chip size="sm" variant="flat" className="mb-2">
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
                isDark ? 'text-neon-blue' : 'text-blue-600'
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
                  ? 'bg-gradient-to-r from-neon-blue to-neon-yellow text-black'
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
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
                ? 'text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-yellow' 
                : 'text-gray-900'
            }`}>
              MEN'S COLLECTION
            </h1>
            <p className={`text-xl max-w-2xl mx-auto ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Discover premium sneakers designed for the modern man
            </p>
          </motion.div>

          {/* Filters and Controls */}
          <div className="flex flex-wrap gap-4 mb-8 justify-between items-center">
            <div className="flex gap-3">
              <Button
                variant={sortBy === 'featured' ? 'solid' : 'bordered'}
                size="sm"
                onClick={() => setSortBy('featured')}
              >
                Featured
              </Button>
              <Button
                variant={sortBy === 'price-low' ? 'solid' : 'bordered'}
                size="sm"
                onClick={() => setSortBy('price-low')}
              >
                Price: Low to High
              </Button>
              <Button
                variant={sortBy === 'price-high' ? 'solid' : 'bordered'}
                size="sm"
                onClick={() => setSortBy('price-high')}
              >
                Price: High to Low
              </Button>
            </div>

            <div className="flex gap-2">
              <Button
                isIconOnly
                variant={viewMode === 'grid' ? 'solid' : 'bordered'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid size={16} />
              </Button>
              <Button
                isIconOnly
                variant={viewMode === 'list' ? 'solid' : 'bordered'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List size={16} />
              </Button>
            </div>
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

          {/* Load More */}
          <div className="text-center mt-12">
            <Button
              size="lg"
              variant="bordered"
              className={`${
                isDark
                  ? 'border-neon-blue text-neon-blue hover:bg-neon-blue/20'
                  : 'border-blue-600 text-blue-600 hover:bg-blue-50'
              }`}
            >
              Load More Products
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default MenPage;
