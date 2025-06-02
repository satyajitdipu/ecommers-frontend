# ShoeX - Premium Sneaker E-commerce Platform 👟

A modern, responsive e-commerce platform built with React, featuring a sleek dark/light theme, advanced animations, and a premium user experience for sneaker enthusiasts.

## 🚀 Features

- **Modern UI/UX**: Glassmorphism design with smooth animations
- **Dark/Light Theme**: Toggle between cyberpunk dark mode and clean light mode
- **Responsive Design**: Works seamlessly across all devices
- **Advanced Cart System**: Persistent cart with local storage
- **Dynamic Navigation**: Smooth scrolling navigation with dynamic island effect
- **Product Showcase**: Interactive 3D product cards with hover effects
- **Real-time Notifications**: Toast notifications for user actions
- **Page Routing**: Multi-page application with React Router
- **Animated Components**: Framer Motion powered animations throughout

## 🛠️ Tech Stack

### Core Technologies
- **React** (18.2.0) - Frontend framework
- **React Router DOM** - Client-side routing
- **JavaScript (ES6+)** - Programming language
- **CSS3** - Styling with custom properties

### UI Components & Styling
- **Hero UI/React** (@heroui/react) - Modern UI component library
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library for React
- **Lucide React** - Icon library

### Additional Libraries
- **React Hot Toast** - Toast notifications
- **React Portal** - Modal and overlay management

## 📦 Installation Guide

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Step-by-Step Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/shoex-ecommerce.git
   cd shoex-ecommerce
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```
   or
   ```bash
   yarn install
   ```

3. **Install required packages**
   ```bash
   npm install @heroui/react framer-motion lucide-react react-hot-toast react-router-dom
   ```

4. **Install Tailwind CSS**
   ```bash
   npm install -D tailwindcss postcss autoprefixer
   npx tailwindcss init -p
   ```

5. **Start the development server**
   ```bash
   npm start
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
src/
├── components/
│   ├── Navigation.jsx           # Dynamic navigation with island effect
│   ├── HeroSection.jsx          # Landing page hero section
│   ├── ProductShowcase.jsx      # Product grid with 3D cards
│   ├── FeaturesSection.jsx      # Features showcase
│   ├── Footer.jsx              # Site footer
│   ├── CartDrawer.jsx          # Sliding cart drawer
│   └── ThemeProvider.jsx       # Dark/light theme context
├── context/
│   └── CartContext.jsx         # Shopping cart state management
├── pages/
│   ├── LandingPage.jsx         # Homepage
│   ├── MenPage.jsx             # Men's products
│   ├── WomenPage.jsx           # Women's products
│   ├── SneakersPage.jsx        # Premium sneakers
│   ├── SalePage.jsx            # Sale products with countdown
│   ├── AboutPage.jsx           # About us page
│   ├── ContactPage.jsx         # Contact form and info
│   └── NotFoundPage.jsx        # 404 error page
├── App.jsx                     # Main app component with routing
├── index.js                    # React entry point
└── index.css                   # Global styles and animations
```

## 🎨 Components Overview

### Core Components
- **Navigation**: Dynamic island navigation with scroll effects
- **ThemeProvider**: Context for dark/light theme switching
- **CartContext**: Global state management for shopping cart

### Page Components
- **LandingPage**: Hero section, product showcase, features
- **ProductPages**: Men, Women, Sneakers with filtering
- **SalePage**: Products with discount countdown timer
- **AboutPage**: Company information and team
- **ContactPage**: Contact form with validation
- **NotFoundPage**: Custom 404 error page

### UI Components
- **ProductShowcase**: 3D product cards with animations
- **CartDrawer**: Slide-out cart with quantity controls
- **HeroSection**: Animated landing section
- **FeaturesSection**: Company features highlight

## 🎯 Key Features Breakdown

### Theme System
- Cyberpunk dark mode with neon colors
- Clean light mode with professional styling
- Smooth transitions between themes
- Persistent theme preference

### Shopping Cart
- Add/remove products
- Quantity management
- Price calculations
- Local storage persistence
- Toast notifications

### Animations
- Page transitions with Framer Motion
- Hover effects on product cards
- Scroll-triggered animations
- Loading skeletons
- Micro-interactions

### Responsive Design
- Mobile-first approach
- Tablet and desktop optimization
- Touch-friendly interactions
- Adaptive navigation

## 🚀 Available Scripts

### `npm start`
Runs the app in development mode at [http://localhost:3000](http://localhost:3000)

### `npm test`
Launches the test runner in interactive watch mode

### `npm run build`
Builds the app for production to the `build` folder

### `npm run eject`
**Warning**: This is a one-way operation. Ejects from Create React App configuration.

## 🎨 Customization

### Theme Colors
Edit `tailwind.config.js` to customize the color palette:
```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        'neon-blue': '#00F5FF',
        'neon-yellow': '#FFFF00',
        'neon-purple': '#FF00FF',
      }
    }
  }
}
```

### Animations
Modify animations in `src/index.css` or component-level Framer Motion variants.

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🐛 Troubleshooting

### Common Issues

1. **Dependencies not installing**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **Tailwind classes not working**
   - Check `tailwind.config.js` configuration
   - Ensure Tailwind directives are imported in `index.css`

3. **Animations not smooth**
   - Enable GPU acceleration in browser
   - Check for reduced motion preferences

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Credits

**Developed by:** [Satyajit Sahoo](https://github.com/satyajitsahoo)  
Special thanks to Satyajit Sahoo for the incredible design vision and development expertise that brought this premium e-commerce platform to life.

### Additional Credits
- **Hero UI** - For the beautiful component library
- **Framer Motion** - For smooth animations
- **Lucide React** - For the icon set
- **Unsplash** - For product placeholder images

## 📞 Support

---

**Built with ❤️ by Satyajit Sahoo**

Enjoy building your sneaker empire! 👟✨
