import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingItem = state.items.find(
        item => item.id === action.payload.id && item.variant === action.payload.variant
      );
      
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id && item.variant === action.payload.variant
              ? { ...item, quantity: Math.min(item.quantity + action.payload.quantity, item.inventory) }
              : item
          )
        };
      }
      
      return {
        ...state,
        items: [...state.items, { ...action.payload, cartId: Date.now() }]
      };

    case 'REMOVE_FROM_CART':
      return {
        ...state,
        items: state.items.filter(item => item.cartId !== action.payload.cartId)
      };

    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          item.cartId === action.payload.cartId
            ? { ...item, quantity: Math.max(1, Math.min(action.payload.quantity, item.inventory)) }
            : item
        )
      };

    case 'CLEAR_CART':
      return {
        ...state,
        items: []
      };

    case 'LOAD_CART':
      return {
        ...state,
        items: action.payload
      };

    default:
      return state;
  }
};

const initialState = {
  items: []
};

export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, initialState);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('ecommerce-cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        dispatch({ type: 'LOAD_CART', payload: parsedCart });
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('ecommerce-cart', JSON.stringify(cart.items));
  }, [cart.items]);

  const addToCart = (product, variant, quantity = 1) => {
    const existingItem = cart.items.find(
      item => item.id === product.id && item.variant === variant
    );

    dispatch({
      type: 'ADD_TO_CART',
      payload: {
        id: product.id,
        name: product.name,
        price: parseFloat(product.price),
        variant,
        quantity,
        inventory: product.inventory,
        image: product.image || '/placeholder-product.jpg'
      }
    });

    // Show success toast
    if (existingItem) {
      toast.success(`Updated ${product.name} quantity in cart!`, {
        duration: 3000,
        position: 'top-right',
        style: {
          background: '#10B981',
          color: '#FFFFFF',
          borderRadius: '8px',
          fontSize: '14px',
          fontWeight: '500'
        },
        icon: '🛒',
      });
    } else {
      toast.success(`${product.name} added to cart!`, {
        duration: 3000,
        position: 'top-right',
        style: {
          background: '#10B981',
          color: '#FFFFFF',
          borderRadius: '8px',
          fontSize: '14px',
          fontWeight: '500'
        },
        icon: '✅',
      });
    }
  };

  const removeFromCart = (cartId) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: { cartId } });
    
    // Show remove toast
    toast.success('Item removed from cart', {
      duration: 2000,
      position: 'top-right',
      style: {
        background: '#EF4444',
        color: '#FFFFFF',
        borderRadius: '8px',
        fontSize: '14px',
        fontWeight: '500'
      },
      icon: '🗑️',
    });
  };

  const updateQuantity = (cartId, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { cartId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
    
    // Show clear cart toast
    toast.success('Cart cleared!', {
      duration: 2000,
      position: 'top-right',
      style: {
        background: '#F59E0B',
        color: '#FFFFFF',
        borderRadius: '8px',
        fontSize: '14px',
        fontWeight: '500'
      },
      icon: '🧹',
    });
  };

  const getCartTotal = () => {
    return cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartItemsCount = () => {
    return cart.items.reduce((total, item) => total + item.quantity, 0);
  };

  const value = {
    cart: cart.items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartItemsCount
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
