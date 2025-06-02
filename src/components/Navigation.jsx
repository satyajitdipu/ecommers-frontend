import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Button,
  Badge,
  Switch
} from '@heroui/react';
import { ShoppingCart, Moon, Sun, Search, User, Heart, Menu, X } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

const Navigation = ({ onCartClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const { getCartItemsCount } = useCart();
  const { scrollY } = useScroll();
  const location = useLocation();
  
  // Parallax transformations
  const navY = useTransform(scrollY, [0, 100], [0, -10]);
  const navOpacity = useTransform(scrollY, [0, 50], [0.95, 1]);
  const navScale = useTransform(scrollY, [0, 100], [1, 0.98]);
  const blurAmount = useTransform(scrollY, [0, 100], [10, 25]);
  const shadowIntensity = useTransform(scrollY, [0, 100], [0.2, 0.8]);
  const borderOpacity = useTransform(scrollY, [0, 100], [0.2, 0.6]);
  
  // Additional parallax effects for background elements
  const bgX = useTransform(scrollY, [0, 1000], [0, -100]);
  const bg2X = useTransform(scrollY, [0, 1000], [0, 50]);
  const particleY = useTransform(scrollY, [0, 500], [0, -50]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const menuItems = [
    { name: "Home", href: "/" },
    { name: "Men", href: "/men" },
    { name: "Women", href: "/women" },
    { name: "Sneakers", href: "/sneakers" },
    { name: "Sale", href: "/sale" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" }
  ];

  const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300,
        duration: 0.8
      }
    }
  };  const islandVariants = {
    compact: {
      width: "auto",
      borderRadius: "50px",
      padding: "8px 20px",
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 300
      }
    },
    expanded: {
      width: "auto",
      borderRadius: "24px",
      padding: "12px 24px",
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 300
      }
    }
  };

  const menuItemVariants = {
    hidden: { opacity: 0, y: -20, scale: 0.8 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.1,
        type: "spring",
        damping: 15,
        stiffness: 300
      }
    }),
    hover: {
      scale: 1.05,
      y: -2,
      transition: {
        type: "spring",
        damping: 10,
        stiffness: 400
      }
    }
  };

  return (
    <>      {/* Dynamic Island Navigation */}      <motion.nav
        variants={navVariants}
        initial="hidden"
        animate="visible"
        style={{ 
          y: navY,
          opacity: navOpacity,
          scale: navScale
        }}        className="fixed top-4 left-0 right-0 z-[1000] pointer-events-none"
      >
        <div className="flex justify-center px-4">
        <motion.div
          variants={islandVariants}
          animate={isScrolled ? "compact" : "expanded"}          className={`
            relative pointer-events-auto overflow-hidden
            ${isDark 
              ? 'bg-black/30 border border-white/20' 
              : 'bg-white/30 border border-black/20'
            }
            backdrop-blur-xl shadow-2xl
          `}
          style={{
            backdropFilter: `blur(${blurAmount}px)`,
            boxShadow: `0 25px 50px -12px rgba(0, 0, 0, ${shadowIntensity})`,
            borderColor: isDark 
              ? `rgba(255, 255, 255, ${borderOpacity})` 
              : `rgba(0, 0, 0, ${borderOpacity})`
          }}
        >
          {/* Infinite Animated Background Layers */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Primary Gradient Wave */}
            <motion.div
              className={`absolute inset-0 ${
                isDark
                  ? 'bg-gradient-to-r from-neon-blue/15 via-neon-purple/10 to-neon-yellow/15'
                  : 'bg-gradient-to-r from-blue-500/15 via-purple-500/10 to-indigo-500/15'
              }`}
              style={{ x: bgX }}
              animate={{
                x: ['-100%', '100%'],
                scaleX: [1, 1.2, 1],
              }}
              transition={{
                x: { duration: 12, repeat: Infinity, ease: "linear" },
                scaleX: { duration: 8, repeat: Infinity, ease: "easeInOut" }
              }}
            />
            
            {/* Secondary Gradient Wave */}
            <motion.div
              className={`absolute inset-0 ${
                isDark
                  ? 'bg-gradient-to-l from-neon-yellow/10 via-transparent to-neon-blue/10'
                  : 'bg-gradient-to-l from-orange-400/10 via-transparent to-blue-600/10'
              }`}
              style={{ x: bg2X }}
              animate={{
                x: ['100%', '-100%'],
                scaleY: [1, 1.1, 1],
              }}
              transition={{
                x: { duration: 15, repeat: Infinity, ease: "linear" },
                scaleY: { duration: 6, repeat: Infinity, ease: "easeInOut" }
              }}
            />
            
            {/* Mesh Gradient Overlay */}
            <motion.div
              className={`absolute inset-0 opacity-30 ${
                isDark
                  ? 'bg-gradient-radial from-neon-blue/20 via-transparent to-neon-yellow/20'
                  : 'bg-gradient-radial from-blue-400/20 via-transparent to-purple-400/20'
              }`}
              animate={{
                scale: [1, 1.05, 1],
                rotate: [0, 2, -2, 0],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            {/* Enhanced Floating Particles */}
            {isDark && (
              <motion.div className="absolute inset-0" style={{ y: particleY }}>
                {[...Array(12)].map((_, i) => (
                  <motion.div
                    key={i}
                    className={`absolute w-1 h-1 rounded-full ${
                      i % 3 === 0 ? 'bg-neon-blue/60' : 
                      i % 3 === 1 ? 'bg-neon-yellow/60' : 'bg-neon-purple/60'
                    }`}
                    style={{
                      left: `${10 + i * 8}%`,
                      top: `${20 + (i % 3) * 30}%`,
                    }}
                    animate={{
                      y: [0, -15, 0],
                      opacity: [0.2, 1, 0.2],
                      scale: [1, 2, 1],
                      rotate: [0, 180, 360],
                    }}
                    transition={{
                      duration: 3 + i * 0.3,
                      repeat: Infinity,
                      delay: i * 0.2,
                      ease: "easeInOut"
                    }}
                  />
                ))}
                
                {/* Animated Lines */}
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={`line-${i}`}
                    className="absolute h-px bg-gradient-to-r from-transparent via-neon-blue/40 to-transparent"
                    style={{
                      width: '200%',
                      left: '-50%',
                      top: `${30 + i * 20}%`,
                    }}
                    animate={{
                      x: ['-100%', '100%'],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 4 + i,
                      repeat: Infinity,
                      delay: i * 1.5,
                      ease: "linear"
                    }}
                  />
                ))}
              </motion.div>
            )}
          </div><div className="relative flex items-center justify-between px-6 py-3">
            {/* Brand Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex items-center"
            >
              <motion.h1 
                className={`text-xl font-cyber font-bold cursor-pointer ${
                  isDark 
                    ? 'text-white drop-shadow-[0_0_8px_rgba(0,245,255,0.8)]' 
                    : 'text-gray-900 font-black'
                }`}
                whileHover={{ 
                  scale: 1.05,
                  filter: isDark ? 'drop-shadow(0 0 15px rgba(0,245,255,1))' : 'none'
                }}
                whileTap={{ scale: 0.95 }}
              >
                SHOE<span className={isDark ? 'text-neon-yellow drop-shadow-[0_0_8px_rgba(255,255,0,0.8)]' : 'text-blue-600'}>X</span>
              </motion.h1>
            </motion.div>            {/* Desktop Menu Items */}
            <AnimatePresence>
              {!isScrolled && (
                <motion.div 
                  className="hidden lg:flex items-center gap-8"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                >
                  {menuItems.slice(0, 5).map((item, index) => {
                    const isActive = location.pathname === item.href;
                    return (
                      <motion.div
                        key={item.name}
                        custom={index}
                        variants={menuItemVariants}
                        initial="hidden"
                        animate="visible"
                        whileHover="hover"
                      >
                        <Link
                          to={item.href}
                          className={`text-sm font-semibold relative group cursor-pointer transition-colors duration-300 ${
                            isActive 
                              ? isDark ? 'text-neon-blue' : 'text-blue-600'
                              : isDark
                                ? 'text-white/90 hover:text-neon-blue drop-shadow-sm'
                                : 'text-gray-900/90 hover:text-blue-600 font-bold'
                          }`}
                        >
                          {item.name}
                          
                          {/* Enhanced Animated Underline */}
                          <motion.div
                            className={`absolute -bottom-1 left-0 h-0.5 ${
                              isDark ? 'bg-gradient-to-r from-neon-blue to-neon-yellow' : 'bg-gradient-to-r from-blue-600 to-purple-600'
                            }`}
                            initial={{ width: isActive ? '100%' : 0, opacity: isActive ? 1 : 0 }}
                            whileHover={{ 
                              width: '100%', 
                              opacity: 1,
                              boxShadow: isDark ? '0 0 10px rgba(0,245,255,0.8)' : '0 0 5px rgba(59,130,246,0.6)'
                            }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                          />
                          
                          {/* Enhanced Glow Effect */}
                          {isDark && (
                            <motion.div
                              className="absolute -inset-2 bg-gradient-to-r from-neon-blue/20 to-neon-yellow/20 rounded-lg blur-md opacity-0 group-hover:opacity-100"
                              transition={{ duration: 0.3 }}
                            />
                          )}
                          
                          {/* Micro-interaction sparkle */}
                          <motion.div
                            className={`absolute -top-1 -right-1 w-1 h-1 rounded-full ${
                              isDark ? 'bg-neon-yellow' : 'bg-blue-400'
                            } opacity-0 group-hover:opacity-100`}
                            animate={{
                              scale: [0, 1, 0],
                              rotate: [0, 180, 360],
                            }}
                            transition={{
                              duration: 0.6,
                              repeat: Infinity,
                              repeatDelay: 2,
                            }}
                          />
                        </Link>
                      </motion.div>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Action Icons */}
            <div className="flex items-center gap-3">              {/* Search Button */}
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <Button
                  isIconOnly
                  variant="light"
                  size="sm"
                  className={`${
                    isDark ? 'text-white/80 hover:text-neon-blue hover:bg-neon-blue/20' : 'text-gray-700 hover:text-blue-600 hover:bg-blue-600/10'
                  } transition-all duration-300`}
                >
                  <Search size={18} />
                </Button>
              </motion.div>

              {/* Wishlist Button */}
              <motion.div
                whileHover={{ scale: 1.1, rotate: -5 }}
                whileTap={{ scale: 0.9 }}
              >
                <Button
                  isIconOnly
                  variant="light"
                  size="sm"
                  className={`${
                    isDark ? 'text-white/80 hover:text-neon-yellow hover:bg-neon-yellow/20' : 'text-gray-700 hover:text-pink-600 hover:bg-pink-600/10'
                  } transition-all duration-300`}
                >
                  <Heart size={18} />
                </Button>
              </motion.div>

              {/* Cart Button with Badge */}
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Badge 
                  content={getCartItemsCount() || undefined} 
                  color={isDark ? "warning" : "primary"}
                  size="sm"
                  isInvisible={getCartItemsCount() === 0}
                  className="animate-pulse"
                >
                  <Button
                    isIconOnly
                    variant="light"
                    size="sm"
                    className={`${
                      isDark ? 'text-white/80 hover:text-neon-blue hover:bg-neon-blue/20' : 'text-gray-700 hover:text-blue-600 hover:bg-blue-600/10'
                    } transition-all duration-300`}
                    onClick={() => onCartClick()}
                  >
                    <motion.div
                      animate={getCartItemsCount() > 0 ? { rotate: [0, 10, -10, 0] } : {}}
                      transition={{ duration: 0.5 }}
                    >
                      <ShoppingCart size={18} />
                    </motion.div>
                  </Button>
                </Badge>
              </motion.div>

              {/* Theme Toggle */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Switch
                  isSelected={isDark}
                  onValueChange={toggleTheme}
                  size="sm"
                  thumbIcon={({ isSelected }) => (
                    <motion.div
                      animate={{ rotate: isSelected ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {isSelected ? <Moon size={12} /> : <Sun size={12} />}
                    </motion.div>
                  )}
                  className={`${isDark ? 'text-neon-blue' : 'text-blue-600'}`}
                />
              </motion.div>

              {/* Mobile Menu Toggle */}
              <motion.div
                className="lg:hidden"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Button
                  isIconOnly
                  variant="light"
                  size="sm"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className={`${
                    isDark ? 'text-white/80 hover:text-neon-blue' : 'text-gray-700'
                  }`}
                >
                  <motion.div
                    animate={{ rotate: isMenuOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
                  </motion.div>
                </Button>
              </motion.div>
            </div>
          </div>        </motion.div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] lg:hidden"
            onClick={() => setIsMenuOpen(false)}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-md" />
            
            {/* Menu Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: -50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -50 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className={`absolute top-20 left-1/2 transform -translate-x-1/2 w-11/12 max-w-md rounded-2xl overflow-hidden ${
                isDark 
                  ? 'bg-gray-900/95 border border-gray-700/50' 
                  : 'bg-white/95 border border-gray-200/50'
              } backdrop-blur-xl shadow-2xl`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">                <div className="space-y-4">
                  {menuItems.map((item, index) => {
                    const isActive = location.pathname === item.href;
                    return (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Link
                          to={item.href}
                          className={`block py-3 px-4 rounded-xl text-lg font-medium transition-all duration-300 ${
                            isActive
                              ? isDark 
                                ? 'text-neon-blue bg-neon-blue/10' 
                                : 'text-blue-600 bg-blue-600/10'
                              : isDark
                                ? 'text-gray-300 hover:text-neon-blue hover:bg-neon-blue/10'
                                : 'text-gray-700 hover:text-blue-600 hover:bg-blue-600/10'
                          }`}
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {item.name}
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
