import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
      setIsDark(savedTheme === 'dark');
    } else {
      setIsDark(prefersDark);
    }
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      document.body.style.background = 'linear-gradient(45deg, #000000, #1a0033, #330066)';
    } else {
      document.documentElement.classList.remove('dark');
      document.body.style.background = 'linear-gradient(135deg, #F8FAFC, #E2E8F0, #CBD5E1)';
    }
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      <div className={`min-h-screen transition-all duration-500 ${
        isDark 
          ? 'bg-cyber-gradient text-white' 
          : 'bg-mist-gradient text-gray-900'
      }`}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};
