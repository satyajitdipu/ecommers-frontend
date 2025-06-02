const { heroui } = require("@heroui/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'neon-blue': '#00F5FF',
        'neon-yellow': '#FFFF00',
        'cyber-pink': '#FF00FF',
        'cyber-purple': '#8B00FF',
        'mist-white': '#F8FAFC',
        'soft-gray': '#F1F5F9',
      },
      fontFamily: {
        'cyber': ['Orbitron', 'monospace'],
        'modern': ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'neon-pulse': 'neon-pulse 2s ease-in-out infinite alternate',
        'cyber-glitch': 'cyber-glitch 0.5s infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        'neon-pulse': {
          '0%': { textShadow: '0 0 5px #00F5FF, 0 0 10px #00F5FF, 0 0 15px #00F5FF' },
          '100%': { textShadow: '0 0 10px #00F5FF, 0 0 20px #00F5FF, 0 0 30px #00F5FF' },
        },
        'cyber-glitch': {
          '0%, 100%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
      backgroundImage: {
        'cyber-gradient': 'linear-gradient(45deg, #000000, #1a0033, #330066)',
        'neon-gradient': 'linear-gradient(45deg, #00F5FF, #FFFF00, #FF00FF)',
        'mist-gradient': 'linear-gradient(135deg, #F8FAFC, #E2E8F0, #CBD5E1)',
      },
    },
  },
  darkMode: "class",
  plugins: [heroui({
    themes: {
      light: {
        colors: {
          background: "#FFFFFF",
          foreground: "#11181C",
          primary: {
            50: "#e6f7ff",
            100: "#bae7ff",
            200: "#91d5ff",
            300: "#69c0ff",
            400: "#40a9ff",
            500: "#1890ff",
            600: "#096dd9",
            700: "#0050b3",
            800: "#003a8c",
            900: "#002766",
            DEFAULT: "#00F5FF",
            foreground: "#ffffff",
          },
          secondary: {
            DEFAULT: "#FFFF00",
            foreground: "#000000",
          },
        },
      },
      dark: {
        colors: {
          background: "#000000",
          foreground: "#ECEDEE",
          primary: {
            50: "#001a33",
            100: "#003366",
            200: "#004d99",
            300: "#0066cc",
            400: "#0080ff",
            500: "#1a99ff",
            600: "#4db3ff",
            700: "#80ccff",
            800: "#b3e6ff",
            900: "#e6f7ff",
            DEFAULT: "#00F5FF",
            foreground: "#000000",
          },
          secondary: {
            DEFAULT: "#FF00FF",
            foreground: "#000000",
          },
        },
      },
    },
  })],
}
