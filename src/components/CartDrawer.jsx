import React from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button, Divider, Badge } from '@heroui/react';
import { X, Plus, Minus, Package, CreditCard, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useTheme } from '../components/ThemeProvider';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const CartDrawer = ({ isOpen, onClose }) => {
  const { isDark } = useTheme();
  const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  
  if (!isOpen) return null;

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(price);
  };

  const handleCheckout = () => {
    if (cart.length > 0) {
      navigate('/checkout', { 
        state: { 
          cartItems: cart, 
          total: getCartTotal() 
        }
      });
      onClose();
    }
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const drawerVariants = {
    hidden: { x: '100%' },
    visible: { 
      x: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300
      }
    },
    exit: { 
      x: '100%',
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        type: "spring",
        damping: 20,
        stiffness: 300
      }
    }),
    exit: { opacity: 0, x: 20 }
  };

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="fixed inset-0 z-[99999] flex justify-end"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              onClose();
            }
          }}
        >
          {/* Backdrop with blur */}
          <div className={`absolute inset-0 ${
            isDark ? 'bg-black/70' : 'bg-black/50'
          } backdrop-blur-md`} />
          
          {/* Cart Drawer */}
          <motion.div
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={`relative w-full max-w-md h-full ${
              isDark 
                ? 'bg-gray-900/95 border-l border-gray-700/50' 
                : 'bg-white/95 border-l border-gray-200/50'
            } backdrop-blur-xl shadow-2xl flex flex-col`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className={`flex-shrink-0 px-6 py-4 border-b ${
              isDark ? 'border-gray-700/50' : 'border-gray-200/50'
            }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <ShoppingBag className={`${
                    isDark ? 'text-neon-blue' : 'text-blue-600'
                  }`} size={24} />
                  <h2 className={`text-xl font-bold ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                    Shopping Cart
                  </h2>
                  {cart.length > 0 && (
                    <Badge 
                      content={cart.length} 
                      color={isDark ? "warning" : "primary"}
                      size="sm"
                    />
                  )}
                </div>
                
                <motion.button
                  onClick={onClose}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className={`p-2 rounded-full transition-all duration-300 ${
                    isDark 
                      ? 'hover:bg-gray-800 text-gray-400 hover:text-white' 
                      : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <X size={20} />
                </motion.button>
              </div>
            </div>

            {/* Cart Content */}
            <div className="flex-1 flex flex-col min-h-0">
              {cart.length === 0 ? (
                /* Empty Cart State */
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex-1 flex flex-col items-center justify-center p-8 text-center"
                >
                  <div className={`mb-6 p-6 rounded-full ${
                    isDark ? 'bg-gray-800/50' : 'bg-gray-100'
                  }`}>
                    <Package className={`${
                      isDark ? 'text-gray-600' : 'text-gray-400'
                    }`} size={48} />
                  </div>
                  
                  <h3 className={`text-xl font-semibold mb-2 ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                    Your cart is empty
                  </h3>
                  
                  <p className={`mb-6 ${
                    isDark ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Add some awesome sneakers to get started!
                  </p>
                  
                  <Button
                    className={`${
                      isDark
                        ? 'bg-gradient-to-r from-neon-blue to-neon-yellow text-black font-bold'
                        : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold'
                    } transition-all duration-300`}
                    onClick={onClose}
                  >
                    Start Shopping
                  </Button>
                </motion.div>
              ) : (
                /* Cart Items */
                <>
                  {/* Scrollable Items Container */}
                  <div className="flex-1 overflow-y-auto px-6 py-4">
                    <div className="space-y-4">
                      {cart.map((item, index) => (
                        <motion.div
                          key={item.cartId}
                          custom={index}
                          variants={itemVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          className={`p-4 rounded-xl border transition-all duration-300 ${
                            isDark 
                              ? 'bg-gray-800/50 border-gray-700/50 hover:border-neon-blue/50' 
                              : 'bg-gray-50 border-gray-200 hover:border-blue-300'
                          }`}
                        >
                          <div className="flex gap-4">
                            {/* Product Image Placeholder */}
                            <div className={`w-16 h-16 rounded-lg flex items-center justify-center ${
                              isDark ? 'bg-gray-700' : 'bg-gray-200'
                            }`}>
                              <Package className={`${
                                isDark ? 'text-gray-500' : 'text-gray-400'
                              }`} size={24} />
                            </div>
                            
                            {/* Product Details */}
                            <div className="flex-1 min-w-0">
                              <h4 className={`font-semibold truncate ${
                                isDark ? 'text-white' : 'text-gray-900'
                              }`}>
                                {item.name}
                              </h4>
                              <p className={`text-sm ${
                                isDark ? 'text-gray-400' : 'text-gray-600'
                              }`}>
                                {item.variant}
                              </p>
                              <p className={`font-bold ${
                                isDark ? 'text-neon-blue' : 'text-blue-600'
                              }`}>
                                {formatPrice(item.price)}
                              </p>
                            </div>
                            
                            {/* Remove Button */}
                            <motion.button
                              onClick={() => removeFromCart(item.cartId)}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className={`p-2 rounded-lg transition-all duration-300 ${
                                isDark 
                                  ? 'hover:bg-red-500/20 text-gray-400 hover:text-red-400' 
                                  : 'hover:bg-red-50 text-gray-500 hover:text-red-500'
                              }`}
                            >
                              <Trash2 size={16} />
                            </motion.button>
                          </div>
                          
                          {/* Quantity Controls */}
                          <div className="flex items-center justify-between mt-3">
                            <div className="flex items-center gap-3">
                              <motion.button
                                onClick={() => updateQuantity(item.cartId, item.quantity - 1)}
                                disabled={item.quantity <= 1}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className={`p-1 rounded-lg transition-all duration-300 ${
                                  item.quantity <= 1
                                    ? isDark ? 'text-gray-600 cursor-not-allowed' : 'text-gray-400 cursor-not-allowed'
                                    : isDark ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-200 text-gray-600'
                                }`}
                              >
                                <Minus size={14} />
                              </motion.button>
                              
                              <span className={`px-3 py-1 rounded-lg font-medium min-w-[2.5rem] text-center ${
                                isDark ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'
                              }`}>
                                {item.quantity}
                              </span>
                              
                              <motion.button
                                onClick={() => updateQuantity(item.cartId, item.quantity + 1)}
                                disabled={item.quantity >= item.inventory}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className={`p-1 rounded-lg transition-all duration-300 ${
                                  item.quantity >= item.inventory
                                    ? isDark ? 'text-gray-600 cursor-not-allowed' : 'text-gray-400 cursor-not-allowed'
                                    : isDark ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-200 text-gray-600'
                                }`}
                              >
                                <Plus size={14} />
                              </motion.button>
                            </div>
                            
                            <div className={`font-bold ${
                              isDark ? 'text-neon-yellow' : 'text-blue-600'
                            }`}>
                              {formatPrice(item.price * item.quantity)}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                    
                    {/* Clear Cart and Checkout Buttons */}
                    {cart.length > 0 && (
                      <div className="mt-6 space-y-3">
                        {/* Clear Cart Button */}
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.3 }}
                          className="text-center"
                        >
                          <Button
                            variant="light"
                            size="sm"
                            onClick={clearCart}
                            className={`${
                              isDark ? 'text-red-400 hover:text-red-300' : 'text-red-500 hover:text-red-600'
                            }`}
                          >
                            Clear Cart
                          </Button>
                        </motion.div>

                        {/* Checkout Button */}
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.4 }}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Button
                            className={`w-full font-bold transition-all duration-300 ${
                              isDark
                                ? 'bg-gradient-to-r from-neon-blue to-neon-yellow text-black shadow-[0_0_20px_rgba(0,245,255,0.5)] hover:shadow-[0_0_30px_rgba(0,245,255,0.8)]'
                                : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:shadow-xl'
                            } transform hover:scale-105`}
                            size="lg"
                            onClick={handleCheckout}
                            startContent={<CreditCard size={18} />}
                            endContent={<ArrowRight size={18} />}
                          >
                            Proceed to Checkout
                          </Button>
                        </motion.div>
                      </div>
                    )}
                  </div>
                  
                  {/* Fixed Footer with Total only */}
                  <div className={`flex-shrink-0 border-t p-6 ${
                    isDark ? 'border-gray-700/50 bg-gray-900/90' : 'border-gray-200/50 bg-white/90'
                  } backdrop-blur-md`}>
                    {/* Total */}
                    <div className="flex justify-between items-center">
                      <span className={`text-lg font-semibold ${
                        isDark ? 'text-white' : 'text-gray-900'
                      }`}>
                        Total:
                      </span>
                      <span className={`text-2xl font-bold ${
                        isDark ? 'text-neon-blue' : 'text-blue-600'
                      }`}>
                        {formatPrice(getCartTotal())}
                      </span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
};

export default CartDrawer;
