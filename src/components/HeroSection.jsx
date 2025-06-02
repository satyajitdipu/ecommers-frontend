import React, { useEffect, useRef, useState } from 'react';
import { Button, Card, CardBody } from '@heroui/react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { ArrowRight, Zap, Star, ShoppingBag } from 'lucide-react';
import { useTheme } from './ThemeProvider';

const HeroSection = () => {
  const { isDark } = useTheme();
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref);
  
  // Random video selection
  const [currentVideo, setCurrentVideo] = useState('');
  
  useEffect(() => {
    // Randomly select one of the ad videos
    const videos = ['/ad.mp4', '/ad2.mp4'];
    const randomVideo = videos[Math.floor(Math.random() * videos.length)];
    setCurrentVideo(randomVideo);
  }, []);

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100
      }
    }
  };

  return (
    <div ref={ref} className={`relative min-h-screen overflow-hidden ${
      isDark ? 'bg-cyber-gradient' : 'bg-mist-gradient'
    }`}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {isDark ? (
          <>
            {/* Cyberpunk Grid */}
            <div className="absolute inset-0 opacity-20">
              <div className="h-full w-full bg-[linear-gradient(rgba(0,245,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,245,255,0.1)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
            </div>
            {/* Neon Particles */}
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-neon-blue rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -100, 0],
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </>
        ) : (
          <>
            {/* Soft Mist Effect */}
            <div className="absolute inset-0 opacity-30">
              {[...Array(10)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute bg-gradient-to-r from-blue-200/40 to-purple-200/40 rounded-full blur-xl"
                  style={{
                    width: `${100 + Math.random() * 200}px`,
                    height: `${100 + Math.random() * 200}px`,
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    x: [0, 100, 0],
                    y: [0, -50, 0],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 10 + Math.random() * 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>
          </>
        )}      </div>      {/* Full-Screen Video Background */}
      <div className="absolute inset-0 z-0">
        {currentVideo && (
          <video
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src={currentVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
      </div>

      {/* Content Overlay */}
    <div className="relative z-10 container mx-auto px-4 py-20 min-h-screen flex items-center">
        <div className="max-w-xl relative">
            {/* Frosted Glass Card Background */}
            <motion.div 
                className={`absolute inset-0 -inset-x-6 -inset-y-6 ${
                    isDark 
                        ? 'bg-black/20 backdrop-blur-md' 
                        : 'bg-white/25 backdrop-blur-md'
                } rounded-2xl border ${
                    isDark 
                        ? 'border-white/10' 
                        : 'border-white/30'
                }`}
                style={{
                    background: isDark 
                        ? 'linear-gradient(135deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.2) 100%)'
                        : 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.3) 100%)',
                    backdropFilter: 'blur(16px) saturate(180%)',
                    boxShadow: isDark 
                        ? '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)'
                        : '0 8px 32px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.5)'
                }}
                whileHover={{
                    backdropFilter: 'blur(20px) saturate(200%)',
                    scale: 1.02
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
            />
            
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate={controls}
                className="space-y-6 relative z-10"
            >
                <motion.div variants={itemVariants} className="space-y-4">
                    <div className="flex items-center gap-2 mb-3">
                        <Zap className={`${isDark ? 'text-neon-yellow' : 'text-yellow-500'}`} size={20} />
                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                            isDark 
                                ? 'text-neon-yellow bg-black/30 backdrop-blur-sm border border-neon-yellow/20' 
                                : 'text-yellow-600 bg-white/50 backdrop-blur-sm'
                        }`}>
                            LIMITED EDITION
                        </span>
                    </div>
                    
                    <h1 className={`text-5xl lg:text-7xl font-cyber font-black leading-tight ${
                        isDark 
                            ? 'text-white drop-shadow-xl' 
                            : 'text-gray-900 drop-shadow-lg'
                    }`}>
                        JUST
                        <br />
                        <span className={`${
                            isDark 
                                ? 'text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-yellow drop-shadow-xl' 
                                : 'text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600'
                        }`}>
                            DO IT
                        </span>
                    </h1>
                    
                    <p className={`text-lg leading-relaxed max-w-md font-medium ${
                        isDark 
                            ? 'text-white/90 drop-shadow-md' 
                            : 'text-gray-800 drop-shadow-sm'
                    }`}>
                        Step into the future with our revolutionary 3D-designed sneakers. 
                        Where technology meets style in perfect harmony.
                    </p>
                </motion.div>

                <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
                    <Button
                        size="md"
                        className={`${
                            isDark
                                ? 'bg-gradient-to-r from-neon-blue to-neon-yellow text-black font-bold shadow-[0_0_15px_rgba(0,245,255,0.4)] hover:shadow-[0_0_25px_rgba(0,245,255,0.7)] backdrop-blur-sm'
                                : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold shadow-lg'
                        } transition-all duration-300 transform hover:scale-105 px-6 py-3`}
                        endContent={<ArrowRight size={20} />}
                    >
                        EXPLORE MORE
                    </Button>
                    
                    <Button
                        variant="bordered"
                        size="md"
                        className={`${
                            isDark
                                ? 'border-2 border-white/60 text-white hover:bg-white/10 backdrop-blur-sm'
                                : 'border-2 border-gray-700 text-gray-800 hover:bg-gray-800 hover:text-white'
                        } font-bold transition-all duration-300 px-6 py-3`}
                    >
                        WATCH VIDEO
                    </Button>
                </motion.div>

                <motion.div variants={itemVariants} className="flex items-center gap-8 pt-6">
                    <div className="text-center">
                        <div className={`text-2xl font-bold ${
                            isDark ? 'text-neon-blue drop-shadow-md' : 'text-blue-600'
                        }`}>
                            50K+
                        </div>
                        <div className={`text-xs font-medium ${
                            isDark ? 'text-white/80' : 'text-gray-600'
                        }`}>
                            Happy Customers
                        </div>
                    </div>
                    <div className="text-center">
                        <div className={`text-2xl font-bold ${
                            isDark ? 'text-neon-yellow drop-shadow-md' : 'text-yellow-600'
                        }`}>
                            4.9★
                        </div>
                        <div className={`text-xs font-medium ${
                            isDark ? 'text-white/80' : 'text-gray-600'
                        }`}>
                            Rating
                        </div>
                    </div>
                    <div className="text-center">
                        <div className={`text-2xl font-bold ${
                            isDark ? 'text-cyber-pink drop-shadow-md' : 'text-purple-600'
                        }`}>
                            1000+
                        </div>
                        <div className={`text-xs font-medium ${
                            isDark ? 'text-white/80' : 'text-gray-600'
                        }`}>
                            Models
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    </div>      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className={`w-6 h-10 border-2 rounded-full ${
          isDark ? 'border-neon-blue' : 'border-gray-400'
        } flex justify-center`}>
          <motion.div
            className={`w-1 h-3 rounded-full mt-2 ${
              isDark ? 'bg-neon-blue' : 'bg-gray-400'
            }`}
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default HeroSection;
