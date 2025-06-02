import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, CardBody, CardHeader, Button, Input, Select, SelectItem, Divider, Chip } from '@heroui/react';
import { motion } from 'framer-motion';
import { CreditCard, Package, User, MapPin, Phone, Mail, Lock, ArrowRight, Trash2 } from 'lucide-react';
import { useTheme } from '../components/ThemeProvider';
import { useCart } from '../context/CartContext';
import axios from 'axios';

export default function CheckoutPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const { cart, updateQuantity, removeFromCart, getCartTotal, clearCart } = useCart();

  // Get cart items from location state or use cart context
  const cartItems = location.state?.cartItems || cart;
  const total = location.state?.total || getCartTotal();

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });
  
  const [errors, setErrors] = useState({});
  const [processing, setProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    if (cartItems.length === 0) {
      navigate('/', { replace: true });
    }
  }, [cartItems, navigate]);

  if (cartItems.length === 0) return null;

  // Validation functions
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhone = (phone) => /^[0-9]{10}$/.test(phone);
  const validateCardNumber = (num) => /^[0-9]{16}$/.test(num.replace(/\s+/g, ''));
  const validateExpiry = (expiry) => {
    const [month, year] = expiry.split('/').map(s => s.trim());
    if (!month || !year) return false;
    const expDate = new Date(`20${year}`, month - 1);
    const now = new Date();
    return expDate > now;
  };
  const validateCVV = (cvv) => /^[0-9]{3}$/.test(cvv);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validateForm = () => {
    const tempErrors = {};
    if (!form.fullName) tempErrors.fullName = 'Full name is required';
    if (!validateEmail(form.email)) tempErrors.email = 'Invalid email';
    if (!validatePhone(form.phone)) tempErrors.phone = 'Invalid phone number';
    if (!form.address) tempErrors.address = 'Address is required';
    if (!form.city) tempErrors.city = 'City is required';
    if (!form.state) tempErrors.state = 'State is required';
    if (!form.zip) tempErrors.zip = 'Zip code is required';
    if (!validateCardNumber(form.cardNumber)) tempErrors.cardNumber = 'Invalid card number';
    if (!validateExpiry(form.expiry)) tempErrors.expiry = 'Invalid expiry date';
    if (!validateCVV(form.cvv)) tempErrors.cvv = 'Invalid CVV';

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setProcessing(true);
    try {
      // For multiple items, we'll create orders sequentially
      for (const item of cartItems) {
        const response = await axios.post('http://localhost:5000/api/orders', {
          ...form,
          productId: item.id,
          variant: item.variant,
          quantity: item.quantity,
          transactionSim: '1' // Change this to '2' or '3' to simulate failure or error
        });

        // For the first item, redirect to payment
        if (cartItems.indexOf(item) === 0) {
          const paymentLink = response.data.paymentLink;
          clearCart(); // Clear cart after successful order creation
          window.location.href = paymentLink;
          return;
        }
      }
    } catch (err) {
      console.error('Order creation failed:', err);
      alert('Order failed to process. Please try again.');
      setProcessing(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(price);
  };

  const steps = [
    { id: 1, title: 'Cart Review', icon: Package },
    { id: 2, title: 'Shipping Info', icon: MapPin },
    { id: 3, title: 'Payment', icon: CreditCard }
  ];

  return (
    <div className={`min-h-screen py-8 px-4 ${
      isDark ? 'bg-gray-900' : 'bg-gray-50'
    }`} style={{ cursor: 'auto' }}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className={`text-4xl font-bold mb-2 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            Checkout
          </h1>
          <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Complete your order in just a few steps
          </p>
        </motion.div>

        {/* Progress Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex justify-center mb-8"
        >
          <div className="flex items-center gap-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = currentStep >= step.id;
              const isCompleted = currentStep > step.id;
              
              return (
                <React.Fragment key={step.id}>
                  <div className="flex items-center gap-2">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      isCompleted
                        ? isDark ? 'bg-neon-blue text-black' : 'bg-blue-600 text-white'
                        : isActive
                        ? isDark ? 'bg-neon-yellow text-black' : 'bg-yellow-500 text-white'
                        : isDark ? 'bg-gray-700 text-gray-400' : 'bg-gray-200 text-gray-500'
                    }`}>
                      <Icon size={18} />
                    </div>
                    <span className={`text-sm font-medium hidden sm:block ${
                      isActive
                        ? isDark ? 'text-white' : 'text-gray-900'
                        : isDark ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      {step.title}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-8 h-0.5 ${
                      currentStep > step.id
                        ? isDark ? 'bg-neon-blue' : 'bg-blue-600'
                        : isDark ? 'bg-gray-700' : 'bg-gray-200'
                    }`} />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Step 1: Cart Review */}
            {currentStep === 1 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <Card className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
                  <CardHeader>
                    <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      Review Your Order
                    </h2>
                  </CardHeader>
                  <CardBody className="space-y-4">
                    {cartItems.map((item) => (
                      <div key={item.cartId} className={`flex items-center gap-4 p-4 rounded-lg ${
                        isDark ? 'bg-gray-700' : 'bg-gray-50'
                      }`}>
                        <div className={`w-16 h-16 rounded-lg flex items-center justify-center ${
                          isDark ? 'bg-gray-600' : 'bg-gray-200'
                        }`}>
                          <Package className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`} size={24} />
                        </div>
                        
                        <div className="flex-1">
                          <h4 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {item.name}
                          </h4>
                          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                            {item.variant}
                          </p>
                          <p className={`font-bold ${isDark ? 'text-neon-blue' : 'text-blue-600'}`}>
                            {formatPrice(item.price)}
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          <Button
                            isIconOnly
                            size="sm"
                            variant="flat"
                            onClick={() => updateQuantity(item.cartId, item.quantity - 1)}
                            isDisabled={item.quantity <= 1}
                          >
                            -
                          </Button>
                          
                          <span className={`px-3 py-1 text-sm font-medium ${
                            isDark ? 'text-white' : 'text-gray-900'
                          }`}>
                            {item.quantity}
                          </span>
                          
                          <Button
                            isIconOnly
                            size="sm"
                            variant="flat"
                            onClick={() => updateQuantity(item.cartId, item.quantity + 1)}
                            isDisabled={item.quantity >= item.inventory}
                          >
                            +
                          </Button>

                          <Button
                            isIconOnly
                            size="sm"
                            variant="light"
                            onClick={() => removeFromCart(item.cartId)}
                            className="text-red-500 hover:text-red-600"
                          >
                            <Trash2 size={16} />
                          </Button>
                        </div>
                      </div>
                    ))}
                    
                    <div className="flex justify-end pt-4">
                      <Button
                        className={`${
                          isDark
                            ? 'bg-gradient-to-r from-neon-blue to-neon-yellow text-black'
                            : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                        } font-bold`}
                        endContent={<ArrowRight size={18} />}
                        onClick={() => setCurrentStep(2)}
                      >
                        Continue to Shipping
                      </Button>
                    </div>
                  </CardBody>
                </Card>
              </motion.div>
            )}

            {/* Step 2: Shipping Information */}
            {currentStep === 2 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <Card className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
                  <CardHeader>
                    <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      Shipping Information
                    </h2>
                  </CardHeader>
                  <CardBody>
                    <form className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <Input
                          label="Full Name"
                          placeholder="Enter your full name"
                          value={form.fullName}
                          onChange={handleChange}
                          name="fullName"
                          startContent={<User className="text-gray-400" size={18} />}
                          isInvalid={!!errors.fullName}
                          errorMessage={errors.fullName}
                          classNames={{
                            input: `${isDark ? 'text-white' : 'text-gray-900'} cursor-text`,
                            inputWrapper: isDark ? 'bg-gray-800/50 border-gray-600' : 'bg-white border-gray-300'
                          }}
                        />
                        <Input
                          label="Email"
                          placeholder="Enter your email"
                          type="email"
                          value={form.email}
                          onChange={handleChange}
                          name="email"
                          startContent={<Mail className="text-gray-400" size={18} />}
                          isInvalid={!!errors.email}
                          errorMessage={errors.email}
                          classNames={{
                            input: `${isDark ? 'text-white' : 'text-gray-900'} cursor-text`,
                            inputWrapper: isDark ? 'bg-gray-800/50 border-gray-600' : 'bg-white border-gray-300'
                          }}
                        />
                      </div>

                      <Input
                        label="Phone Number"
                        placeholder="Enter your phone number"
                        value={form.phone}
                        onChange={handleChange}
                        name="phone"
                        startContent={<Phone className="text-gray-400" size={18} />}
                        isInvalid={!!errors.phone}
                        errorMessage={errors.phone}
                        classNames={{
                          input: `${isDark ? 'text-white' : 'text-gray-900'} cursor-text`,
                          inputWrapper: isDark ? 'bg-gray-800/50 border-gray-600' : 'bg-white border-gray-300'
                        }}
                      />

                      <Input
                        label="Address"
                        placeholder="Enter your address"
                        value={form.address}
                        onChange={handleChange}
                        name="address"
                        startContent={<MapPin className="text-gray-400" size={18} />}
                        isInvalid={!!errors.address}
                        errorMessage={errors.address}
                        classNames={{
                          input: `${isDark ? 'text-white' : 'text-gray-900'} cursor-text`,
                          inputWrapper: isDark ? 'bg-gray-800/50 border-gray-600' : 'bg-white border-gray-300'
                        }}
                      />

                      <div className="grid md:grid-cols-3 gap-4">
                        <Input
                          label="City"
                          placeholder="City"
                          value={form.city}
                          onChange={handleChange}
                          name="city"
                          isInvalid={!!errors.city}
                          errorMessage={errors.city}
                          classNames={{
                            input: `${isDark ? 'text-white' : 'text-gray-900'} cursor-text`,
                            inputWrapper: isDark ? 'bg-gray-800/50 border-gray-600' : 'bg-white border-gray-300'
                          }}
                        />
                        <Input
                          label="State"
                          placeholder="State"
                          value={form.state}
                          onChange={handleChange}
                          name="state"
                          isInvalid={!!errors.state}
                          errorMessage={errors.state}
                          classNames={{
                            input: `${isDark ? 'text-white' : 'text-gray-900'} cursor-text`,
                            inputWrapper: isDark ? 'bg-gray-800/50 border-gray-600' : 'bg-white border-gray-300'
                          }}
                        />
                        <Input
                          label="ZIP Code"
                          placeholder="ZIP"
                          value={form.zip}
                          onChange={handleChange}
                          name="zip"
                          isInvalid={!!errors.zip}
                          errorMessage={errors.zip}
                          classNames={{
                            input: `${isDark ? 'text-white' : 'text-gray-900'} cursor-text`,
                            inputWrapper: isDark ? 'bg-gray-800/50 border-gray-600' : 'bg-white border-gray-300'
                          }}
                        />
                      </div>

                      <div className="flex justify-between pt-4">
                        <Button
                          variant="bordered"
                          onClick={() => setCurrentStep(1)}
                        >
                          Back to Cart
                        </Button>
                        <Button
                          className={`${
                            isDark
                              ? 'bg-gradient-to-r from-neon-blue to-neon-yellow text-black'
                              : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                          } font-bold`}
                          endContent={<ArrowRight size={18} />}
                          onClick={() => {
                            // Basic validation for shipping info
                            const tempErrors = {};
                            if (!form.fullName) tempErrors.fullName = 'Full name is required';
                            if (!validateEmail(form.email)) tempErrors.email = 'Invalid email';
                            if (!validatePhone(form.phone)) tempErrors.phone = 'Invalid phone number';
                            if (!form.address) tempErrors.address = 'Address is required';
                            if (!form.city) tempErrors.city = 'City is required';
                            if (!form.state) tempErrors.state = 'State is required';
                            if (!form.zip) tempErrors.zip = 'ZIP code is required';

                            setErrors(tempErrors);
                            if (Object.keys(tempErrors).length === 0) {
                              setCurrentStep(3);
                            }
                          }}
                        >
                          Continue to Payment
                        </Button>
                      </div>
                    </form>
                  </CardBody>
                </Card>
              </motion.div>
            )}

            {/* Step 3: Payment */}
            {currentStep === 3 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <Card className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
                  <CardHeader>
                    <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      Payment Information
                    </h2>
                  </CardHeader>
                  <CardBody>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <Input
                        label="Card Number"
                        placeholder="1234 5678 9012 3456"
                        value={form.cardNumber}
                        onChange={handleChange}
                        name="cardNumber"
                        startContent={<CreditCard className="text-gray-400" size={18} />}
                        isInvalid={!!errors.cardNumber}
                        errorMessage={errors.cardNumber}
                        classNames={{
                          input: `${isDark ? 'text-white' : 'text-gray-900'} cursor-text`,
                          inputWrapper: isDark ? 'bg-gray-800/50 border-gray-600' : 'bg-white border-gray-300'
                        }}
                      />

                      <div className="grid md:grid-cols-2 gap-4">
                        <Input
                          label="Expiry Date"
                          placeholder="MM/YY"
                          value={form.expiry}
                          onChange={handleChange}
                          name="expiry"
                          isInvalid={!!errors.expiry}
                          errorMessage={errors.expiry}
                          classNames={{
                            input: `${isDark ? 'text-white' : 'text-gray-900'} cursor-text`,
                            inputWrapper: isDark ? 'bg-gray-800/50 border-gray-600' : 'bg-white border-gray-300'
                          }}
                        />
                        <Input
                          label="CVV"
                          placeholder="123"
                          value={form.cvv}
                          onChange={handleChange}
                          name="cvv"
                          startContent={<Lock className="text-gray-400" size={18} />}
                          isInvalid={!!errors.cvv}
                          errorMessage={errors.cvv}
                          classNames={{
                            input: `${isDark ? 'text-white' : 'text-gray-900'} cursor-text`,
                            inputWrapper: isDark ? 'bg-gray-800/50 border-gray-600' : 'bg-white border-gray-300'
                          }}
                        />
                      </div>

                      <div className="flex justify-between pt-4">
                        <Button
                          variant="bordered"
                          onClick={() => setCurrentStep(2)}
                          isDisabled={processing}
                        >
                          Back to Shipping
                        </Button>
                        <Button
                          type="submit"
                          className={`${
                            isDark
                              ? 'bg-gradient-to-r from-neon-blue to-neon-yellow text-black'
                              : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                          } font-bold`}
                          isLoading={processing}
                          loadingText="Processing..."
                          endContent={!processing && <CreditCard size={18} />}
                        >
                          {processing ? 'Processing Order...' : 'Complete Order'}
                        </Button>
                      </div>
                    </form>
                  </CardBody>
                </Card>
              </motion.div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className={`sticky top-8 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
                <CardHeader>
                  <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Order Summary
                  </h3>
                </CardHeader>
                <CardBody className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.cartId} className="flex justify-between items-center">
                      <div>
                        <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {item.name}
                        </p>
                        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                          {item.variant} × {item.quantity}
                        </p>
                      </div>
                      <p className={`font-bold ${isDark ? 'text-neon-blue' : 'text-blue-600'}`}>
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>
                  ))}
                  
                  <Divider />
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                        Subtotal
                      </span>
                      <span className={isDark ? 'text-white' : 'text-gray-900'}>
                        {formatPrice(total)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                        Shipping
                      </span>
                      <span className={`text-green-500 font-medium`}>
                        Free
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                        Tax
                      </span>
                      <span className={isDark ? 'text-white' : 'text-gray-900'}>
                        {formatPrice(total * 0.18)}
                      </span>
                    </div>
                  </div>
                  
                  <Divider />
                  
                  <div className="flex justify-between items-center">
                    <span className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      Total
                    </span>
                    <span className={`text-2xl font-bold ${isDark ? 'text-neon-blue' : 'text-blue-600'}`}>
                      {formatPrice(total * 1.18)}
                    </span>
                  </div>

                  <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-blue-50'}`}>
                    <div className="flex items-center gap-2 mb-2">
                      <Lock className={`${isDark ? 'text-neon-blue' : 'text-blue-600'}`} size={16} />
                      <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        Secure Payment
                      </span>
                    </div>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      Your payment information is encrypted and secure. We use Razorpay for processing.
                    </p>                  </div>
                </CardBody>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
