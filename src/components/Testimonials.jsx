import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { AiFillStar } from 'react-icons/ai';

const testimonials = [
  {
    id: 1,
    name: "Aria Sterling",
    role: "Product Director",
    company: "Vortex Fintech",
    quote: "Working with Haroon was an absolute game-changer. He completely redesigned our core payment application dashboard and translated it into a super-clean React codebase that improved our conversion rate by 34%. Highly recommended!",
    rating: 5,
    initials: "AS",
    color: "from-[#0ea5e9] to-[#38bdf8]"
  },
  {
    id: 2,
    name: "Marcus Vance",
    role: "Founder & CTO",
    company: "SaaS Helios Group",
    quote: "Haroon is a rare talent in the MERN space. His ability to build pixel-perfect user experiences while designing secure, high-performance database models on MongoDB saved us weeks of redundant sprints. A brilliant professional.",
    rating: 5,
    initials: "MV",
    color: "from-[#38bdf8] to-[#0284c7]"
  },
  {
    id: 3,
    name: "Evelyn Ross",
    role: "Creative Director",
    company: "Metropolis Visuals",
    quote: "Haroon has an exceptional eye for typography, layouts, and interactive motion. He structured our corporate identity system and produced digital guidelines that feel futuristic, consistent, and beautiful across all viewports.",
    rating: 5,
    initials: "ER",
    color: "from-[#a855f7] to-[#e879f9]"
  }
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 6500); // Auto slide every 6.5 seconds

    return () => clearInterval(timer);
  }, [activeIndex]);

  const handlePrev = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 80 : -80,
      opacity: 0,
      scale: 0.96
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: { 
        x: { type: 'spring', stiffness: 100, damping: 18 },
        opacity: { duration: 0.35 },
        scale: { duration: 0.35 }
      }
    },
    exit: (dir) => ({
      x: dir < 0 ? 80 : -80,
      opacity: 0,
      scale: 0.96,
      transition: { duration: 0.3 }
    })
  };

  const current = testimonials[activeIndex];

  return (
    <section
      id="testimonials"
      className="relative py-28 w-full bg-slate-50 dark:bg-[#0f172a] text-slate-800 dark:text-white overflow-hidden grid-background transition-colors duration-500"
    >
      {/* Decorative ambient glowing circles */}
      <div className="absolute top-1/2 right-10 w-[350px] h-[350px] rounded-full bg-[#818cf8]/6 dark:bg-[#818cf8]/4 blur-[110px] -z-10 animate-pulse-slow" />

      <motion.div
        initial={{ opacity: 0, y: 45 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-4xl mx-auto px-6 md:px-12 w-full"
      >
        
        {/* Section Title */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, letterSpacing: "0.1em" }}
            whileInView={{ opacity: 1, letterSpacing: "0.25em" }}
            viewport={{ once: true }}
            className="text-accent dark:text-accent-light text-xs font-semibold uppercase mb-3"
          >
            CLIENT OPINIONS
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-heading font-black tracking-tight"
          >
            Client <span className="text-gradient-accent">Feedback</span>
          </motion.h2>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: "4rem" }}
            viewport={{ once: true }}
            transition={{ delay: 0.25 }}
            className="h-1 bg-accent rounded-full mt-5" 
          />
        </div>

        {/* Carousel Body */}
        <div className="relative flex items-center justify-center min-h-[340px]">
          
          {/* Slide container */}
          <div className="w-full overflow-hidden relative py-4 px-2">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={activeIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="glass-card rounded-3xl p-8 md:p-12 relative shadow-2xl flex flex-col md:flex-row items-center gap-8 border border-slate-200/50 dark:border-slate-800/60 hover:shadow-neon hover:border-accent/20 dark:hover:border-accent-light/15 duration-300"
              >
                {/* Fallback Initial Profile Circle */}
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0, rotate: -15 }}
                  animate={{ scale: 1, opacity: 1, rotate: 3 }}
                  transition={{ delay: 0.15, type: 'spring' }}
                  className="relative flex-shrink-0"
                >
                  <div className={`w-24 h-24 rounded-2xl bg-gradient-to-tr ${current.color} flex items-center justify-center text-white text-3xl font-heading font-black shadow-lg transform`}>
                    {current.initials}
                  </div>
                  {/* Glowing background square behind initials */}
                  <div className="absolute -inset-1.5 bg-accent/25 rounded-2xl blur-md -z-10 animate-pulse" />
                </motion.div>

                {/* Content */}
                <div className="space-y-5 flex-1 text-center md:text-left z-10">
                  {/* Rating Stars */}
                  <motion.div 
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex justify-center md:justify-start gap-1"
                  >
                    {[...Array(current.rating)].map((_, i) => (
                      <AiFillStar key={i} className="w-5 h-5 text-amber-500 hover:scale-110 transition-transform cursor-pointer" />
                    ))}
                  </motion.div>

                  {/* Quote */}
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.25 }}
                    className="text-base md:text-lg italic text-slate-700 dark:text-slate-350 leading-relaxed font-sans font-medium"
                  >
                    "{current.quote}"
                  </motion.p>

                  {/* Author Name / Role */}
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <h4 className="text-lg font-heading font-black text-slate-900 dark:text-white leading-none">
                      {current.name}
                    </h4>
                    <p className="text-xs font-semibold text-slate-550 uppercase tracking-widest mt-2">
                      {current.role} at <span className="text-accent dark:text-accent-light font-bold">{current.company}</span>
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Magnetic Hover Navigation Arrows */}
          <motion.button
            onClick={handlePrev}
            whileHover={{ scale: 1.1, x: -3 }}
            whileTap={{ scale: 0.95 }}
            className="absolute left-[-16px] md:left-[-40px] p-3 rounded-full bg-white dark:bg-slate-900 border border-slate-250 dark:border-slate-800/80 shadow-md text-slate-500 hover:text-accent dark:hover:text-accent-light hover:border-accent/40 dark:hover:border-accent-light/30 transition-all cursor-pointer z-20"
            aria-label="Previous slide"
          >
            <FiChevronLeft className="w-5 h-5" />
          </motion.button>
          
          <motion.button
            onClick={handleNext}
            whileHover={{ scale: 1.1, x: 3 }}
            whileTap={{ scale: 0.95 }}
            className="absolute right-[-16px] md:right-[-40px] p-3 rounded-full bg-white dark:bg-slate-900 border border-slate-250 dark:border-slate-800/80 shadow-md text-slate-500 hover:text-accent dark:hover:text-accent-light hover:border-accent/40 dark:hover:border-accent-light/30 transition-all cursor-pointer z-20"
            aria-label="Next slide"
          >
            <FiChevronRight className="w-5 h-5" />
          </motion.button>
        </div>

        {/* Carousel dot indicators */}
        <div className="flex justify-center items-center space-x-2.5 mt-10">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setDirection(idx > activeIndex ? 1 : -1);
                setActiveIndex(idx);
              }}
              className="relative py-2.5 cursor-pointer"
              aria-label={`Go to slide ${idx + 1}`}
            >
              <div 
                className={`h-2.5 rounded-full transition-all duration-400 ${
                  activeIndex === idx 
                    ? 'w-7 bg-accent dark:bg-accent-light shadow-neon' 
                    : 'w-2.5 bg-slate-300 dark:bg-slate-800/80 hover:bg-slate-400 dark:hover:bg-slate-700'
                }`}
              />
            </button>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
