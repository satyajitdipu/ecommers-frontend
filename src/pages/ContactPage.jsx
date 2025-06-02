import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardBody, Button, Input, Textarea } from '@heroui/react';
import { Mail, Phone, MapPin, Clock, Send, MessageCircle } from 'lucide-react';
import { useTheme } from '../components/ThemeProvider';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const ContactPage = () => {
  const { isDark } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We\'ll get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      details: "support@shoex.com",
      description: "Send us an email anytime"
    },
    {
      icon: Phone,
      title: "Phone",
      details: "+1 (555) 123-4567",
      description: "Mon-Fri from 8am to 5pm"
    },
    {
      icon: MapPin,
      title: "Address",
      details: "123 Sneaker Street, Fashion District, NY 10001",
      description: "Come visit our flagship store"
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: "Mon-Fri: 9am-6pm, Sat-Sun: 10am-4pm",
      description: "We're here to help"
    }
  ];

  return (
    <div className={`min-h-screen ${isDark ? 'bg-black' : 'bg-gray-50'}`}>
      <Navigation />
      
      <div className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className={`text-5xl font-bold mb-6 ${
              isDark 
                ? 'text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-yellow' 
                : 'text-gray-900'
            }`}>
              Get In Touch
            </h1>
            <p className={`text-xl max-w-2xl mx-auto ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Have questions about our sneakers? Need help with your order? 
              We're here to help and would love to hear from you.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className={`${
                isDark 
                  ? 'bg-black/40 border-neon-blue/30 backdrop-blur-md' 
                  : 'bg-white/80 backdrop-blur-md shadow-lg border border-gray-200'
              } border`}>
                <CardBody className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <MessageCircle className={isDark ? 'text-neon-blue' : 'text-blue-600'} size={24} />
                    <h2 className={`text-2xl font-bold ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}>
                      Send us a message
                    </h2>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <Input
                        label="Your Name"
                        placeholder="Enter your name"
                        value={formData.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        required
                        classNames={{
                          input: isDark ? 'text-white' : 'text-gray-900',
                          inputWrapper: isDark ? 'bg-gray-800/50 border-gray-600' : 'bg-white border-gray-300'
                        }}
                      />
                      <Input
                        label="Email Address"
                        type="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        required
                        classNames={{
                          input: isDark ? 'text-white' : 'text-gray-900',
                          inputWrapper: isDark ? 'bg-gray-800/50 border-gray-600' : 'bg-white border-gray-300'
                        }}
                      />
                    </div>
                    
                    <Input
                      label="Subject"
                      placeholder="What's this about?"
                      value={formData.subject}
                      onChange={(e) => handleChange('subject', e.target.value)}
                      required
                      classNames={{
                        input: isDark ? 'text-white' : 'text-gray-900',
                        inputWrapper: isDark ? 'bg-gray-800/50 border-gray-600' : 'bg-white border-gray-300'
                      }}
                    />
                    
                    <Textarea
                      label="Message"
                      placeholder="Tell us how we can help you..."
                      value={formData.message}
                      onChange={(e) => handleChange('message', e.target.value)}
                      minRows={4}
                      required
                      classNames={{
                        input: isDark ? 'text-white' : 'text-gray-900',
                        inputWrapper: isDark ? 'bg-gray-800/50 border-gray-600' : 'bg-white border-gray-300'
                      }}
                    />
                    
                    <Button
                      type="submit"
                      size="lg"
                      className={`w-full font-bold ${
                        isDark
                          ? 'bg-gradient-to-r from-neon-blue to-neon-yellow text-black'
                          : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                      }`}
                      startContent={<Send size={18} />}
                    >
                      Send Message
                    </Button>
                  </form>
                </CardBody>
              </Card>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-6"
            >
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <Card className={`${
                    isDark 
                      ? 'bg-black/40 border-neon-blue/30 backdrop-blur-md hover:border-neon-blue/60' 
                      : 'bg-white/80 backdrop-blur-md shadow-lg hover:shadow-xl border border-gray-200'
                  } border transition-all duration-300`}>
                    <CardBody className="p-6">
                      <div className="flex items-start gap-4">
                        <div className={`p-3 rounded-xl ${
                          isDark ? 'bg-neon-blue/20' : 'bg-blue-100'
                        }`}>
                          <info.icon className={isDark ? 'text-neon-blue' : 'text-blue-600'} size={24} />
                        </div>
                        <div className="flex-1">
                          <h3 className={`font-bold text-lg mb-1 ${
                            isDark ? 'text-white' : 'text-gray-900'
                          }`}>
                            {info.title}
                          </h3>
                          <p className={`font-medium mb-1 ${
                            isDark ? 'text-neon-blue' : 'text-blue-600'
                          }`}>
                            {info.details}
                          </p>
                          <p className={`text-sm ${
                            isDark ? 'text-gray-400' : 'text-gray-600'
                          }`}>
                            {info.description}
                          </p>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </motion.div>
              ))}

              {/* FAQ Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
              >
                <Card className={`${
                  isDark 
                    ? 'bg-gradient-to-r from-neon-blue/20 to-neon-yellow/20 border-neon-blue/30 backdrop-blur-md' 
                    : 'bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200'
                } border`}>
                  <CardBody className="p-6 text-center">
                    <h3 className={`font-bold text-lg mb-2 ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}>
                      Quick Questions?
                    </h3>
                    <p className={`text-sm mb-4 ${
                      isDark ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      Check out our FAQ section for instant answers to common questions.
                    </p>
                    <Button
                      variant="bordered"
                      size="sm"
                      className={`${
                        isDark
                          ? 'border-neon-blue text-neon-blue hover:bg-neon-blue/20'
                          : 'border-blue-600 text-blue-600 hover:bg-blue-50'
                      }`}
                    >
                      View FAQ
                    </Button>
                  </CardBody>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ContactPage;
