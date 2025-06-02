import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardBody, Button } from '@heroui/react';
import { Award, Users, Globe, Heart, Target, Zap, Leaf, Shield } from 'lucide-react';
import { useTheme } from '../components/ThemeProvider';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const AboutPage = () => {
  const { isDark } = useTheme();

  const stats = [
    { icon: Users, label: "Happy Customers", value: "50K+" },
    { icon: Globe, label: "Countries", value: "25+" },
    { icon: Award, label: "Awards Won", value: "15+" },
    { icon: Heart, label: "Reviews", value: "4.9/5" }
  ];

  const values = [
    {
      icon: Target,
      title: "Quality First",
      description: "We source only the finest materials and work with trusted manufacturers to ensure every pair meets our high standards."
    },
    {
      icon: Zap,
      title: "Innovation",
      description: "Constantly pushing boundaries in sneaker technology and design to bring you the latest in comfort and style."
    },
    {
      icon: Leaf,
      title: "Sustainability",
      description: "Committed to reducing our environmental impact through eco-friendly practices and sustainable materials."
    },
    {
      icon: Shield,
      title: "Customer Trust",
      description: "Building lasting relationships through transparent practices, excellent service, and standing behind our products."
    }
  ];

  const team = [
    {
      name: "Alex Chen",
      role: "Founder & CEO",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
      bio: "Former Nike designer with 15 years of experience in the sneaker industry."
    },
    {
      name: "Sarah Johnson",
      role: "Head of Design",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face",
      bio: "Award-winning designer passionate about creating footwear that inspires."
    },
    {
      name: "Marcus Rodriguez",
      role: "Technology Director",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
      bio: "Leading innovation in sneaker technology and sustainable manufacturing."
    }
  ];

  return (
    <div className={`min-h-screen ${isDark ? 'bg-black' : 'bg-gray-50'}`}>
      <Navigation />
      
      <div className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-20"
          >
            <h1 className={`text-5xl font-bold mb-6 ${
              isDark 
                ? 'text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-yellow' 
                : 'text-gray-900'
            }`}>
              About ShoeX
            </h1>
            <p className={`text-xl max-w-3xl mx-auto leading-relaxed ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}>
              We're passionate about creating exceptional sneakers that combine cutting-edge design, 
              premium materials, and unmatched comfort. Since 2018, we've been pushing the boundaries 
              of what's possible in footwear.
            </p>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className={`text-center p-6 rounded-2xl ${
                  isDark 
                    ? 'bg-black/40 border border-neon-blue/30 backdrop-blur-md' 
                    : 'bg-white/80 backdrop-blur-md shadow-lg border border-gray-200'
                }`}
              >
                <stat.icon className={`mx-auto mb-4 ${
                  isDark ? 'text-neon-blue' : 'text-blue-600'
                }`} size={32} />
                <div className={`text-2xl font-bold mb-1 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  {stat.value}
                </div>
                <div className={`text-sm ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Mission Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-20"
          >
            <Card className={`${
              isDark 
                ? 'bg-black/40 border-neon-blue/30 backdrop-blur-md' 
                : 'bg-white/80 backdrop-blur-md shadow-lg border border-gray-200'
            } border`}>
              <CardBody className="p-12 text-center">
                <h2 className={`text-3xl font-bold mb-6 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  Our Mission
                </h2>
                <p className={`text-lg leading-relaxed max-w-4xl mx-auto ${
                  isDark ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  To revolutionize the sneaker industry by creating innovative, sustainable, and 
                  stylish footwear that empowers people to express their individuality while 
                  prioritizing comfort and performance. We believe that great sneakers should 
                  not only look amazing but also make a positive impact on both the wearer 
                  and the world.
                </p>
              </CardBody>
            </Card>
          </motion.div>

          {/* Values Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mb-20"
          >
            <h2 className={`text-3xl font-bold text-center mb-12 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              Our Values
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <Card className={`h-full ${
                    isDark 
                      ? 'bg-black/40 border-neon-blue/30 backdrop-blur-md hover:border-neon-blue/60' 
                      : 'bg-white/80 backdrop-blur-md shadow-lg hover:shadow-xl border border-gray-200'
                  } border transition-all duration-300`}>
                    <CardBody className="p-6 text-center">
                      <value.icon className={`mx-auto mb-4 ${
                        isDark ? 'text-neon-blue' : 'text-blue-600'
                      }`} size={32} />
                      <h3 className={`text-xl font-bold mb-3 ${
                        isDark ? 'text-white' : 'text-gray-900'
                      }`}>
                        {value.title}
                      </h3>
                      <p className={`text-sm leading-relaxed ${
                        isDark ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        {value.description}
                      </p>
                    </CardBody>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Team Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mb-20"
          >
            <h2 className={`text-3xl font-bold text-center mb-12 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              Meet Our Team
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 + index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <Card className={`${
                    isDark 
                      ? 'bg-black/40 border-neon-blue/30 backdrop-blur-md hover:border-neon-blue/60' 
                      : 'bg-white/80 backdrop-blur-md shadow-lg hover:shadow-xl border border-gray-200'
                  } border transition-all duration-300`}>
                    <CardBody className="p-6 text-center">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                      />
                      <h3 className={`text-xl font-bold mb-1 ${
                        isDark ? 'text-white' : 'text-gray-900'
                      }`}>
                        {member.name}
                      </h3>
                      <p className={`text-sm font-medium mb-3 ${
                        isDark ? 'text-neon-blue' : 'text-blue-600'
                      }`}>
                        {member.role}
                      </p>
                      <p className={`text-sm leading-relaxed ${
                        isDark ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        {member.bio}
                      </p>
                    </CardBody>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="text-center"
          >
            <Card className={`${
              isDark 
                ? 'bg-gradient-to-r from-neon-blue/20 to-neon-yellow/20 border-neon-blue/30 backdrop-blur-md' 
                : 'bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200'
            } border`}>
              <CardBody className="p-12">
                <h2 className={`text-3xl font-bold mb-6 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  Join Our Journey
                </h2>
                <p className={`text-lg mb-8 max-w-2xl mx-auto ${
                  isDark ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  Be part of the sneaker revolution. Follow us on social media and 
                  subscribe to our newsletter for the latest updates and exclusive releases.
                </p>
                <Button
                  size="lg"
                  className={`${
                    isDark
                      ? 'bg-gradient-to-r from-neon-blue to-neon-yellow text-black font-bold'
                      : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold'
                  }`}
                >
                  Get In Touch
                </Button>
              </CardBody>
            </Card>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AboutPage;
