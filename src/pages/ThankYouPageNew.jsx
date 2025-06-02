import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardBody, Button, Spinner, Chip } from '@heroui/react';
import { motion } from 'framer-motion';
import { CheckCircle, Package, CreditCard, Truck, ArrowLeft, Download } from 'lucide-react';
import { useTheme } from '../components/ThemeProvider';
import axios from 'axios';

const ThankYouPage = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/payment/order/${orderId}`);
        setOrder(response.data);
      } catch (err) {
        console.error('Error fetching order:', err);
        setError('Order not found');
      } finally {
        setLoading(false);
      }
    };

    if (orderId) {
      fetchOrder();
    }
  }, [orderId]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(price);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
        return 'success';
      case 'failed':
        return 'danger';
      case 'pending':
        return 'warning';
      default:
        return 'default';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'approved':
        return 'Payment Successful';
      case 'failed':
        return 'Payment Failed';
      case 'pending':
        return 'Payment Pending';
      default:
        return 'Unknown Status';
    }
  };

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        isDark ? 'bg-gray-900' : 'bg-gray-50'
      }`}>
        <div className="text-center">
          <Spinner size="lg" />
          <p className={`mt-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Loading order details...
          </p>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        isDark ? 'bg-gray-900' : 'bg-gray-50'
      }`}>
        <Card className={`max-w-md ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
          <CardBody className="text-center py-8">
            <Package className={`mx-auto mb-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} size={64} />
            <h2 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Order Not Found
            </h2>
            <p className={`mb-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {error || 'The order you are looking for does not exist.'}
            </p>
            <Button
              onClick={() => navigate('/')}
              className={`${
                isDark
                  ? 'bg-gradient-to-r from-neon-blue to-neon-yellow text-black'
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
              } font-bold`}
              startContent={<ArrowLeft size={18} />}
            >
              Back to Home
            </Button>
          </CardBody>
        </Card>
      </div>
    );
  }

  return (
    <div className={`min-h-screen py-8 px-4 ${
      isDark ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', damping: 15 }}
            className="mb-6"
          >
            <CheckCircle 
              className={`mx-auto ${
                order.status === 'approved' 
                  ? 'text-green-500' 
                  : order.status === 'failed'
                  ? 'text-red-500'
                  : 'text-yellow-500'
              }`} 
              size={80} 
            />
          </motion.div>
          
          <h1 className={`text-4xl font-bold mb-2 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            {order.status === 'approved' ? 'Thank You!' : order.status === 'failed' ? 'Payment Failed' : 'Payment Pending'}
          </h1>
          
          <p className={`text-lg mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            {order.status === 'approved' 
              ? 'Your order has been placed successfully.'
              : order.status === 'failed'
              ? 'There was an issue processing your payment.'
              : 'Your payment is being processed.'
            }
          </p>

          <Chip 
            color={getStatusColor(order.status)}
            variant="flat"
            size="lg"
            startContent={order.status === 'approved' ? <CheckCircle size={16} /> : <CreditCard size={16} />}
          >
            {getStatusText(order.status)}
          </Chip>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Order Details */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
              <CardBody className="p-6">
                <h3 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Order Details
                </h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>Order ID:</span>
                    <span className={`font-mono text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {order.id}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>Product:</span>
                    <span className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {order.name}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>Variant:</span>
                    <span className={isDark ? 'text-white' : 'text-gray-900'}>
                      {order.variant}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>Quantity:</span>
                    <span className={isDark ? 'text-white' : 'text-gray-900'}>
                      {order.quantity}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>Price:</span>
                    <span className={`font-bold ${isDark ? 'text-neon-blue' : 'text-blue-600'}`}>
                      {formatPrice(order.price)}
                    </span>
                  </div>
                  
                  <hr className={isDark ? 'border-gray-700' : 'border-gray-200'} />
                  
                  <div className="flex justify-between text-lg">
                    <span className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      Total:
                    </span>
                    <span className={`font-bold ${isDark ? 'text-neon-blue' : 'text-blue-600'}`}>
                      {formatPrice(order.total)}
                    </span>
                  </div>
                </div>
              </CardBody>
            </Card>
          </motion.div>

          {/* Shipping Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
              <CardBody className="p-6">
                <h3 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Shipping Information
                </h3>
                
                <div className="space-y-3">
                  <div>
                    <p className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {order.full_name}
                    </p>
                    <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                      {order.email}
                    </p>
                    <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                      {order.phone}
                    </p>
                  </div>
                  
                  <div>
                    <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                      {order.address}
                    </p>
                    <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                      {order.city}, {order.state} {order.zip}
                    </p>
                  </div>
                </div>

                {order.status === 'approved' && (
                  <div className={`mt-6 p-4 rounded-lg ${isDark ? 'bg-green-900/20 border border-green-500/30' : 'bg-green-50 border border-green-200'}`}>
                    <div className="flex items-center gap-2 mb-2">
                      <Truck className="text-green-500" size={20} />
                      <span className={`font-semibold ${isDark ? 'text-green-400' : 'text-green-700'}`}>
                        Estimated Delivery
                      </span>
                    </div>
                    <p className={isDark ? 'text-green-300' : 'text-green-600'}>
                      3-5 business days
                    </p>
                  </div>
                )}
              </CardBody>
            </Card>
          </motion.div>
        </div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap gap-4 justify-center mt-8"
        >
          <Button
            variant="bordered"
            onClick={() => navigate('/')}
            startContent={<ArrowLeft size={18} />}
          >
            Continue Shopping
          </Button>
          
          {order.status === 'approved' && (
            <Button
              className={`${
                isDark
                  ? 'bg-gradient-to-r from-neon-blue to-neon-yellow text-black'
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
              } font-bold`}
              startContent={<Download size={18} />}
              onClick={() => {
                // Implement order receipt download
                window.print();
              }}
            >
              Download Receipt
            </Button>
          )}
          
          {order.status === 'failed' && (
            <Button
              className={`${
                isDark
                  ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white'
                  : 'bg-gradient-to-r from-red-600 to-red-700 text-white'
              } font-bold`}
              onClick={() => navigate('/checkout')}
            >
              Try Again
            </Button>
          )}
        </motion.div>

        {/* Help Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8"
        >
          <Card className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-blue-50 border-blue-200'}`}>
            <CardBody className="p-6 text-center">
              <h4 className={`font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Need Help?
              </h4>
              <p className={`mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                If you have any questions about your order, please don't hesitate to contact us.
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                <Button variant="flat" size="sm">
                  Contact Support
                </Button>
                <Button variant="flat" size="sm">
                  Track Order
                </Button>
                <Button variant="flat" size="sm">
                  Return Policy
                </Button>
              </div>
            </CardBody>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default ThankYouPage;
