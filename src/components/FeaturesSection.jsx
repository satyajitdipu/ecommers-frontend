import React from 'react';
import { Card, CardBody, Button } from '@heroui/react';
import { motion } from 'framer-motion';
import { 
  Zap, 
  Shield, 
  Truck, 
  Recycle, 
  Smartphone, 
  Globe,
  Award,
  Users
} from 'lucide-react';
import { useTheme } from './ThemeProvider';

const FeaturesSection = () => {
  const { isDark } = useTheme();

  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Advanced cushioning technology for ultimate speed and comfort",
      color: isDark ? "#00F5FF" : "#3B82F6"
    },
    {
      icon: Shield,
      title: "Lifetime Warranty",
      description: "100% guarantee on all our premium sneaker collections",
      color: isDark ? "#FFFF00" : "#10B981"
    },
    {
      icon: Truck,
      title: "Free Shipping",
      description: "Worldwide free shipping on orders above $199",
      color: isDark ? "#FF00FF" : "#8B5CF6"
    },
    {
      icon: Recycle,
      title: "Eco-Friendly",
      description: "Sustainable materials and carbon-neutral manufacturing",
      color: isDark ? "#00FF7F" : "#059669"
    },
    {
      icon: Smartphone,
      title: "Smart Integration",
      description: "Connect with our app for performance tracking and customization",
      color: isDark ? "#FF69B4" : "#EC4899"
    },
    {
      icon: Globe,
      title: "Global Community",
      description: "Join millions of athletes and sneaker enthusiasts worldwide",
      color: isDark ? "#FFA500" : "#F59E0B"
    }
  ];

  const stats = [
    { label: "Happy Customers", value: "50K+", icon: Users },
    { label: "Countries", value: "80+", icon: Globe },
    { label: "Awards Won", value: "25+", icon: Award },
    { label: "Years Experience", value: "15+", icon: Zap }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1
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
    <section className={`py-20 px-4 relative overflow-hidden ${
      isDark ? 'bg-black/40' : 'bg-gray-50/80'
    }`}>
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        {isDark ? (
          <div className="absolute inset-0 opacity-10">
            <div className="h-full w-full bg-[radial-gradient(circle_at_center,rgba(0,245,255,0.3)_0%,transparent_50%)] bg-[size:100px_100px]"></div>
          </div>
        ) : (
          <div className="absolute inset-0 opacity-20">
            <div className="h-full w-full bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1)_0%,transparent_50%)] bg-[size:80px_80px]"></div>
          </div>
        )}
      </div>

      <div className="container mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className={`text-5xl font-cyber font-bold mb-4 ${
            isDark 
              ? 'text-transparent bg-clip-text bg-gradient-to-r from-neon-blue via-neon-yellow to-cyber-pink' 
              : 'text-gray-900'
          }`}>
            WHY CHOOSE US
          </h2>
          <p className={`text-xl max-w-3xl mx-auto ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Experience the perfect fusion of cutting-edge technology, sustainable practices, 
            and uncompromising style
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
        >
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <motion.div key={index} variants={itemVariants}>
                <Card className={`group h-full transition-all duration-300 hover:scale-105 ${
                  isDark 
                    ? 'bg-black/60 border-gray-800/50 backdrop-blur-md hover:border-neon-blue/50' 
                    : 'bg-white/80 backdrop-blur-md shadow-lg hover:shadow-2xl border border-gray-200'
                }`}>
                  <CardBody className="p-8 text-center">
                    <motion.div
                      className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-6 transition-all duration-300 group-hover:scale-110`}
                      style={{ 
                        backgroundColor: isDark ? `${feature.color}20` : `${feature.color}10`,
                        border: `2px solid ${feature.color}30`
                      }}
                      whileHover={{ 
                        boxShadow: `0 0 20px ${feature.color}40`,
                        scale: 1.1 
                      }}
                    >
                      <IconComponent 
                        size={32} 
                        style={{ color: feature.color }}
                        className="transition-all duration-300"
                      />
                    </motion.div>
                    
                    <h3 className={`text-xl font-bold mb-3 ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}>
                      {feature.title}
                    </h3>
                    
                    <p className={`${
                      isDark ? 'text-gray-400' : 'text-gray-600'
                    } leading-relaxed`}>
                      {feature.description}
                    </p>
                  </CardBody>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className={`rounded-2xl p-8 md:p-12 ${
            isDark 
              ? 'bg-gradient-to-r from-black/80 via-gray-900/80 to-black/80 border border-neon-blue/30 backdrop-blur-md' 
              : 'bg-gradient-to-r from-blue-50 to-purple-50 border border-gray-200'
          }`}
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, type: "spring" }}
                  className="text-center"
                >
                  <IconComponent 
                    size={32} 
                    className={`mx-auto mb-3 ${
                      isDark ? 'text-neon-blue' : 'text-blue-600'
                    }`} 
                  />
                  <div className={`text-3xl lg:text-4xl font-cyber font-black mb-2 ${
                    isDark 
                      ? 'text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-yellow' 
                      : 'text-gray-900'
                  }`}>
                    {stat.value}
                  </div>
                  <div className={`text-sm font-medium ${
                    isDark ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {stat.label}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-16"
        >
          <h3 className={`text-3xl font-bold mb-6 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            Ready to Step Into the Future?
          </h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className={`${
                isDark
                  ? 'bg-gradient-to-r from-neon-blue to-neon-yellow text-black font-bold shadow-[0_0_20px_rgba(0,245,255,0.5)] hover:shadow-[0_0_30px_rgba(0,245,255,0.8)]'
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold'
              } transition-all duration-300 transform hover:scale-105`}
            >
              Shop Collection
            </Button>
            <Button
              variant={isDark ? "ghost" : "bordered"}
              size="lg"
              className={`${
                isDark
                  ? 'border-neon-blue text-neon-blue hover:bg-neon-blue/20'
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
              } font-medium transition-all duration-300`}
            >
              Learn More
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
