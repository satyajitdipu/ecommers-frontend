import React from 'react';
import { Button, Input, Divider } from '@heroui/react';
import { motion } from 'framer-motion';
import { 
  Instagram, 
  Twitter, 
  Facebook, 
  Youtube, 
  Mail, 
  Phone, 
  MapPin,
  ArrowRight,
  Heart
} from 'lucide-react';
import { useTheme } from './ThemeProvider';

const Footer = () => {
  const { isDark } = useTheme();

  const footerLinks = {
    Products: ["Men's Shoes", "Women's Shoes", "Sneakers", "Sports", "Limited Edition", "New Arrivals"],
    Company: ["About Us", "Our Story", "Careers", "Press", "Investors", "Sustainability"],
    Support: ["Help Center", "Size Guide", "Returns", "Shipping", "Track Order", "Contact"],
    Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy", "Accessibility", "Sitemap"]
  };

  const socialLinks = [
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Youtube, href: "#", label: "YouTube" }
  ];

  return (
    <footer className={`relative overflow-hidden ${
      isDark 
        ? 'bg-gradient-to-t from-black via-gray-900 to-black border-t border-neon-blue/30' 
        : 'bg-gradient-to-t from-gray-900 via-gray-800 to-gray-900 text-white'
    }`}>
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        {isDark ? (
          <div className="h-full w-full bg-[linear-gradient(45deg,rgba(0,245,255,0.1)_1px,transparent_1px),linear-gradient(-45deg,rgba(255,255,0,0.1)_1px,transparent_1px)] bg-[size:60px_60px]"></div>
        ) : (
          <div className="h-full w-full bg-[linear-gradient(45deg,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(-45deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:60px_60px]"></div>
        )}
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`text-center mb-16 p-8 rounded-2xl ${
            isDark 
              ? 'bg-black/40 border border-neon-blue/30 backdrop-blur-md' 
              : 'bg-gray-800/50 backdrop-blur-md'
          }`}
        >
          <h3 className={`text-3xl font-cyber font-bold mb-4 ${
            isDark 
              ? 'text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-yellow' 
              : 'text-white'
          }`}>
            STAY IN THE LOOP
          </h3>
          <p className={`text-lg mb-8 max-w-2xl mx-auto ${
            isDark ? 'text-gray-300' : 'text-gray-300'
          }`}>
            Be the first to know about new drops, exclusive sales, and sneaker culture insights
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              placeholder="Enter your email"
              size="lg"
              className="flex-1"
              classNames={{
                input: isDark ? "text-white" : "text-gray-900",
                inputWrapper: `${
                  isDark 
                    ? "bg-black/50 border-neon-blue/50 hover:border-neon-blue" 
                    : "bg-white/90 border-gray-300"
                } backdrop-blur-md`
              }}
            />
            <Button
              size="lg"
              className={`${
                isDark
                  ? 'bg-gradient-to-r from-neon-blue to-neon-yellow text-black font-bold shadow-[0_0_20px_rgba(0,245,255,0.3)]'
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold'
              } transition-all duration-300 hover:scale-105`}
              endContent={<ArrowRight size={20} />}
            >
              Subscribe
            </Button>
          </div>
        </motion.div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <div className="mb-6">
              <h2 className={`text-3xl font-cyber font-bold ${
                isDark 
                  ? 'text-neon-blue animate-neon-pulse' 
                  : 'text-white'
              }`}>
                SHOE<span className={isDark ? 'text-neon-yellow' : 'text-blue-400'}>X</span>
              </h2>
              <p className={`mt-4 text-lg leading-relaxed max-w-md ${
                isDark ? 'text-gray-300' : 'text-gray-300'
              }`}>
                Revolutionizing footwear with cutting-edge technology, sustainable practices, 
                and designs that push the boundaries of style and performance.
              </p>
            </div>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <MapPin size={18} className={isDark ? 'text-neon-blue' : 'text-blue-400'} />
                <span className={isDark ? 'text-gray-300' : 'text-gray-300'}>
                  123 Future Street, Tech City, TC 12345
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={18} className={isDark ? 'text-neon-yellow' : 'text-yellow-400'} />
                <span className={isDark ? 'text-gray-300' : 'text-gray-300'}>
                  +1 (555) 123-4567
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={18} className={isDark ? 'text-cyber-pink' : 'text-pink-400'} />
                <span className={isDark ? 'text-gray-300' : 'text-gray-300'}>
                  hello@shoex.com
                </span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 mt-6">
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <motion.a
                    key={index}
                    href={social.href}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-3 rounded-full transition-all duration-300 ${
                      isDark
                        ? 'bg-black/50 border border-neon-blue/30 hover:border-neon-blue text-neon-blue hover:shadow-[0_0_15px_rgba(0,245,255,0.5)]'
                        : 'bg-gray-700 hover:bg-gray-600 text-white'
                    } backdrop-blur-md`}
                    aria-label={social.label}
                  >
                    <IconComponent size={20} />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([title, links], index) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <h4 className={`text-lg font-bold mb-4 ${
                isDark ? 'text-white' : 'text-white'
              }`}>
                {title}
              </h4>
              <ul className="space-y-2">
                {links.map((link, linkIndex) => (
                  <li key={linkIndex}>                    <button
                      className={`transition-all duration-300 hover:translate-x-1 text-left ${
                        isDark 
                          ? 'text-gray-400 hover:text-neon-blue' 
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <Divider className={`${
          isDark ? 'bg-neon-blue/30' : 'bg-gray-700'
        } mb-8`} />

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-center text-center md:text-left"
        >          <div className="flex flex-col gap-2 mb-4 md:mb-0">
            <div className={`flex items-center gap-2 ${
              isDark ? 'text-gray-400' : 'text-gray-400'
            }`}>
              <span>© 2025 ShoeX. Made with</span>
              <Heart size={16} className={isDark ? 'text-neon-yellow' : 'text-red-500'} fill="currentColor" />
              <span>for sneaker enthusiasts</span>
            </div>
            <div className={`text-xs ${
              isDark ? 'text-gray-500' : 'text-gray-500'
            }`}>
              <span>Developed by </span>
              <span className={`font-medium transition-colors duration-300 ${
                isDark 
                  ? 'text-neon-blue hover:text-neon-yellow' 
                  : 'text-blue-400 hover:text-blue-300'
              }`}>
                Satyajit Sahoo
              </span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-6">            {["Privacy", "Terms", "Cookies", "Accessibility"].map((item, index) => (
              <button
                key={index}
                className={`text-sm transition-colors duration-300 ${
                  isDark 
                    ? 'text-gray-400 hover:text-neon-blue' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >                {item}
              </button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Floating Elements */}
      {isDark && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-neon-blue rounded-full opacity-60"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -50, 0],
                opacity: [0.6, 1, 0.6],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      )}
    </footer>
  );
};

export default Footer;
