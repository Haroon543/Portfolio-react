import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';

// Component imports
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Portfolio from './components/Portfolio';
import Services from './components/Services';
import Timeline from './components/Timeline';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Loader from './components/Loader';
import CustomCursor from './components/CustomCursor';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState(() => {
    // Check localStorage or default to light
    return localStorage.getItem('theme') || 'light';
  });

  // Track page scroll progress
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Keep theme class in sync with document root
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {loading ? (
          <Loader key="preloader" onComplete={() => setLoading(false)} />
        ) : (
          <motion.div
            key="main-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="min-h-screen bg-slate-50 dark:bg-[#0f172a] text-slate-900 dark:text-white transition-colors duration-500 selection:bg-accent/30 selection:text-accent-light grid-background"
          >
            {/* Custom Interactive Follower Cursor */}
            <CustomCursor />

            {/* Sticky Scroll Progress Bar */}
            <motion.div
              style={{ scaleX }}
              className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent via-accent-light to-accent-dark z-9999 origin-left shadow-neon pointer-events-none"
            />

            {/* Navigation Header */}
            <Navbar theme={theme} toggleTheme={toggleTheme} />

            {/* Content Sections */}
            <main>
              <Hero />
              <About />
              <Skills />
              <Portfolio />
              <Services />
              <Timeline />
              <Testimonials />
              <Contact />
            </main>

            {/* Footer */}
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
