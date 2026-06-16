import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSun, FiMoon, FiMenu, FiX } from 'react-icons/fi';

const navItems = [
  { id: 'hero', name: 'Home' },
  { id: 'about', name: 'About' },
  { id: 'skills', name: 'Skills' },
  { id: 'portfolio', name: 'Portfolio' },
  { id: 'services', name: 'Services' },
  { id: 'timeline', name: 'Timeline' },
  { id: 'testimonials', name: 'Testimonials' },
  { id: 'contact', name: 'Contact' }
];

export default function Navbar({ theme, toggleTheme }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [scrolled, setScrolled] = useState(false);

  // Monitor scroll for shadow/blur change and active sections
  useEffect(() => {
    const handleScroll = () => {
      // Set navbar backdrop state
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Determine active section
      const scrollPosition = window.scrollY + 200; // offset
      for (const item of navItems) {
        const element = document.getElementById(item.id);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(item.id);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'glass-navbar py-4 shadow-lg' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="cursor-pointer group"
          onClick={() => handleNavClick('hero')}
        >
          <div className="relative">
            <span className="font-heading font-black text-2xl tracking-widest logo-gradient">
              HAROON
            </span>
            <span
              className="absolute -bottom-0.5 left-0 h-0.5 w-0 bg-gradient-to-r from-accent to-accent-light rounded-full group-hover:w-full transition-all duration-500 ease-out"
            />
          </div>
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-1">
          {navItems.map((item, index) => (
            <motion.button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`relative px-4 py-2 text-sm font-medium tracking-wide rounded-full transition-colors cursor-pointer ${
                activeSection === item.id
                  ? 'text-accent dark:text-accent-light'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white'
              }`}
            >
              {item.name}
              {activeSection === item.id && (
                <motion.div
                  layoutId="activePill"
                  className="absolute inset-0 bg-accent/10 dark:bg-accent-light/10 border border-accent/20 dark:border-accent-light/20 rounded-full -z-10"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </motion.button>
          ))}

          {/* Theme Toggle Desktop */}
          <motion.button
            onClick={toggleTheme}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="ml-4 p-2.5 rounded-full glass-panel text-slate-700 dark:text-slate-300 hover:text-accent dark:hover:text-accent-light hover:shadow-neon transition-all duration-300 cursor-pointer"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <FiSun className="w-4 h-4" /> : <FiMoon className="w-4 h-4" />}
          </motion.button>
        </div>

        {/* Mobile Navbar Controls */}
        <div className="flex items-center space-x-4 lg:hidden">
          {/* Theme Toggle Mobile */}
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-full glass-panel text-slate-700 dark:text-slate-300 hover:text-accent dark:hover:text-accent-light cursor-pointer"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <FiSun className="w-4.5 h-4.5" /> : <FiMoon className="w-4.5 h-4.5" />}
          </button>

          {/* Toggle Hamburger Menu */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2.5 rounded-full glass-panel text-slate-700 dark:text-slate-300 hover:text-accent dark:hover:text-accent-light cursor-pointer"
            aria-label="Toggle Menu"
          >
            {isOpen ? <FiX className="w-4.5 h-4.5" /> : <FiMenu className="w-4.5 h-4.5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="lg:hidden w-full glass-navbar overflow-hidden border-t border-slate-200 dark:border-slate-800"
          >
            <div className="px-6 py-6 flex flex-col space-y-3">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`w-full text-left py-2.5 px-4 rounded-xl text-base font-semibold tracking-wide transition-all ${
                    activeSection === item.id
                      ? 'bg-accent/10 text-accent dark:bg-accent-light/10 dark:text-accent-light border-l-4 border-accent'
                      : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800/50'
                  }`}
                >
                  {item.name}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
