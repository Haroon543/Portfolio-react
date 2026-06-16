import React from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiBookOpen, FiFacebook, FiArrowUp } from 'react-icons/fi';

export default function Footer() {
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleScrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-slate-100 dark:bg-[#090e1a] text-slate-500 dark:text-slate-400 border-t border-slate-200 dark:border-slate-900/50 py-12 font-sans">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-8">

        {/* Left Side: Copyright */}
        <div className="text-center md:text-left space-y-2">
          <p className="text-sm font-semibold tracking-wide text-slate-800 dark:text-slate-300">
            HAROON <span className="text-accent dark:text-accent-light">© 2026</span>
          </p>
          <p className="text-xs text-slate-500">
            Crafted with React, Tailwind CSS v4 & Framer Motion. All rights reserved.
          </p>
        </div>

        {/* Center: Quick Nav */}
        <div className="flex flex-wrap justify-center gap-6 text-xs font-semibold tracking-wider uppercase">
          {[
            { id: 'hero', name: 'Home' },
            { id: 'about', name: 'About' },
            { id: 'portfolio', name: 'Work' },
            { id: 'contact', name: 'Contact' }
          ].map((nav) => (
            <button
              key={nav.id}
              onClick={() => handleScrollTo(nav.id)}
              className="hover:text-accent dark:hover:text-accent-light transition-colors cursor-pointer"
            >
              {nav.name}
            </button>
          ))}
        </div>

        {/* Right Side: Back to Top & Socials */}
        <div className="flex items-center gap-6">
          {/* Socials */}
          <div className="flex gap-4">
            {[
              { icon: <FiGithub className="w-4.5 h-4.5" />, url: "https://github.com/Haroon543" },
              { icon: <FiLinkedin className="w-4.5 h-4.5" />, url: "https://www.linkedin.com/in/hafiz-haroon-a22059296/" },
              { icon: <FiFacebook className="w-4.5 h-4.5" />, url: "https://www.facebook.com/profile.php?id=100072652038155" },
            ].map((soc, idx) => (
              <a
                key={idx}
                href={soc.url}
                className="p-2 rounded-full border border-slate-250 dark:border-slate-800 text-slate-400 hover:text-accent dark:hover:text-accent-light hover:border-accent/40 dark:hover:border-accent-light/40 transition-all duration-300"
              >
                {soc.icon}
              </a>
            ))}
          </div>

          {/* Back to Top */}
          <motion.button
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleScrollToTop}
            className="p-3 bg-slate-200 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-accent dark:hover:text-accent-light hover:border-accent/40 rounded-xl transition-all duration-300 cursor-pointer hover:shadow-neon"
            aria-label="Back to top"
          >
            <FiArrowUp className="w-4.5 h-4.5" />
          </motion.button>
        </div>

      </div>
    </footer>
  );
}
