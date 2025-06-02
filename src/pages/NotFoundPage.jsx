import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@heroui/react';
import { Home, ArrowLeft, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../components/ThemeProvider';
import Navigation from '../components/Navigation';

const NotFoundPage = () => {
  const { isDark } = useTheme();
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300
      }
    }
  };

  return (
    <div className={`min-h-screen flex flex-col ${
      isDark ? 'bg-black' : 'bg-gray-50'
    }`}>
      <Navigation />
      
      <div className="flex-1 flex items-center justify-center px-4 pt-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center max-w-2xl mx-auto"
        >
          {/* 404 Number */}
          <motion.div
            variants={itemVariants}
            className="mb-8"
          >
            <motion.h1 
              className={`text-[12rem] md:text-[16rem] font-black leading-none ${
                isDark 
                  ? 'text-transparent bg-clip-text bg-gradient-to-r from-neon-blue via-neon-yellow to-neon-purple' 
                  : 'text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600'
              }`}
              animate={isDark ? {
                textShadow: [
                  '0 0 20px rgba(0,245,255,0.3)',
                  '0 0 40px rgba(0,245,255,0.6)',
                  '0 0 20px rgba(0,245,255,0.3)'
                ]
              } : {}}
              transition={{ duration: 2, repeat: Infinity }}
            >
              404
            </motion.h1>
          </motion.div>

          {/* Error Message */}
          <motion.div
            variants={itemVariants}
            className="mb-8"
          >
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              Oops! Page Not Found
            </h2>
            <p className={`text-lg md:text-xl mb-6 ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Looks like you've wandered off the beaten path. The page you're looking for doesn't exist.
            </p>
          </motion.div>

          {/* Floating Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className={`absolute rounded-full ${
                  isDark ? 'bg-neon-blue/20' : 'bg-blue-500/20'
                }`}
                style={{
                  width: Math.random() * 100 + 50,
                  height: Math.random() * 100 + 50,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  x: [0, 15, -15, 0],
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 4 + Math.random() * 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>

          {/* Action Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center relative z-10"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="lg"
                className={`${
                  isDark
                    ? 'bg-gradient-to-r from-neon-blue to-neon-yellow text-black font-bold shadow-[0_0_20px_rgba(0,245,255,0.5)]'
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold'
                } px-8`}
                startContent={<Home size={20} />}
                onClick={() => navigate('/')}
              >
                Go Home
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="lg"
                variant="bordered"
                className={`${
                  isDark
                    ? 'border-neon-blue text-neon-blue hover:bg-neon-blue/20'
                    : 'border-blue-600 text-blue-600 hover:bg-blue-50'
                } px-8`}
                startContent={<ArrowLeft size={20} />}
                onClick={() => navigate(-1)}
              >
                Go Back
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="lg"
                variant="light"
                className={`${
                  isDark
                    ? 'text-gray-300 hover:text-white'
                    : 'text-gray-600 hover:text-gray-900'
                } px-8`}
                startContent={<Search size={20} />}
                onClick={() => navigate('/search')}
              >
                Search
              </Button>
            </motion.div>
          </motion.div>

          {/* Help Text */}
          <motion.div
            variants={itemVariants}
            className="mt-12"
          >
            <p className={`text-sm ${
              isDark ? 'text-gray-500' : 'text-gray-400'
            }`}>
              Need help? Check out our{' '}
              <button 
                onClick={() => navigate('/help')}
                className={`underline hover:no-underline ${
                  isDark ? 'text-neon-blue' : 'text-blue-600'
                }`}
              >
                Help Center
              </button>{' '}
              or{' '}
              <button 
                onClick={() => navigate('/contact')}
                className={`underline hover:no-underline ${
                  isDark ? 'text-neon-blue' : 'text-blue-600'
                }`}
              >
                Contact Us
              </button>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFoundPage;
