import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { FiGithub, FiExternalLink, FiX, FiLayers, FiCalendar, FiArrowRight } from 'react-icons/fi';

import nikeAiirPoster from '../assets/nike_aiir_poster.jpg';
import orangeJuicePoster from '../assets/orange_juice_poster.jpg';
import digitalMarketingPoster from '../assets/digital_marketing_poster.jpg';

import plantsAppUi from '../assets/plants_app_ui.jpg';
import headphoneStoreUi from '../assets/headphone_store_ui.jpg';
import healthyFoodBlueV2Ui from '../assets/healthy_food_blue_v2_ui.jpg';
import luminaEcommerceWeb from '../assets/lumina_ecommerce_web.jpg';
import poullsRealEstateWeb from '../assets/poulls_real_estate_web.jpg';
import luminaLifestyleWeb from '../assets/lumina_lifestyle_web.jpg';

const projects = [
  {
    id: 1,
    title: "Lumina Lifestyle Landing Page",
    category: "webdev",
    categoryLabel: "MERN Stack",
    brief: "A highly stylized, minimalist brand concept and product showcase page for high-end home ceramics.",
    details: "Designed and built a premium landing page highlighting minimalist kitchenware and ceramic decor lines. Incorporates high-fidelity product imagery, subtle parallax scrolling effects, interactive color swatches, and a modern coral-peach color layout.",
    tech: ["React.js", "Tailwind CSS", "Framer Motion", "Minimalist Design"],
    date: "May 2026",
    links: { github: "#", live: "#" },
    mockup: (
      <img src={luminaLifestyleWeb} alt="Lumina Lifestyle Landing Page" className="w-full h-full object-cover object-top" />
    )
  },
  {
    id: 2,
    title: " Home Decor E-Commerce",
    category: "webdev",
    categoryLabel: "MERN Stack",
    brief: "Modern minimalist home lifestyle and decor e-commerce web platform featuring product highlights and cart integration.",
    details: "Developed a responsive e-commerce web application for Lumina lifestyle products. Built a minimalist beige-themed landing page, category filters for candles, skincare, and home accessories, special offers banners, and interactive shopping cart drawers.",
    tech: ["React.js", "Tailwind CSS", "Redux Toolkit", "E-commerce Routing"],
    date: "April 2026",
    links: { github: "#", live: "#" },
    mockup: (
      <img src={luminaEcommerceWeb} alt="Lumina Home Decor E-Commerce" className="w-full h-full object-cover object-top" />
    )
  },
  {
    id: 3,
    title: "Floria Plant Shopping App",
    category: "uiux",
    categoryLabel: "UI/UX Design",
    brief: "Elegant mobile e-commerce UI design for premium indoor plants and custom gardening pots.",
    details: "Designed a clean, minimalist mobile application for indoor plant lovers. Features custom species details cards, light/dark theme aesthetics, a streamlined checkout drawer, and detailed care guides.",
    tech: ["Figma UI", "Mobile App Design", "E-commerce UX", "Prototyping"],
    date: "April 2026",
    links: { github: "#", live: "#" },
    mockup: (
      <img src={plantsAppUi} alt="Floria Plant Shopping App" className="w-full h-full object-cover object-center" />
    )
  },
  {
    id: 4,
    title: "Aura Sound Gadget Store UI",
    category: "uiux",
    categoryLabel: "UI/UX Design",
    brief: "High-fidelity dual-screen mobile application UI for a premium audio and electronics marketplace.",
    details: "Designed an interactive e-commerce mobile application for consumer electronics. Features product discovery pages, recommended and flash sale item widgets, customizable listings, and detailed product specification screens for high-end headphones.",
    tech: ["Figma UI", "Mobile App UI", "E-commerce UX", "Product Design"],
    date: "February 2026",
    links: { github: "#", live: "#" },
    mockup: (
      <img src={headphoneStoreUi} alt="Aura Sound Gadget Store UI" className="w-full h-full object-cover object-center" />
    )
  },
  {
    id: 5,
    title: "Hixe Digital Agency Poster",
    category: "design",
    categoryLabel: "Graphic Design",
    brief: "Professional marketing flyer design featuring custom 3D character assets and clean layouts.",
    details: "Designed a premium brand promotion flyer for Hixe Digital Agency. Focuses on high-contrast brand layouts, custom 3D character illustrations, structured service features, and modern typographic hierarchy.",
    tech: ["Adobe Illustrator", "Corporate Identity", "Poster Layouts", "3D Composition"],
    date: "March 2026",
    links: { github: "#", live: "#" },
    mockup: (
      <img src={digitalMarketingPoster} alt="Hixe Digital Agency Poster" className="w-full h-full object-cover object-top" />
    )
  },
  {
    id: 6,
    title: "Nike Air Advertising Poster",
    category: "design",
    categoryLabel: "Graphic Design",
    brief: "Vibrant commercial poster design showcasing bold sports branding, split layouts, and paper texture aesthetics.",
    details: "Created a high-fidelity commercial advertising poster for the Nike Air series. Combines a split-backdrop canvas style, realistic crumbled paper textures, hand-drawn design guidelines, and bold brand typography.",
    tech: ["Adobe Photoshop", "Visual Compositing", "Typography Layouts", "Commercial Art"],
    date: "December 2025",
    links: { github: "#", live: "#" },
    mockup: (
      <img src={nikeAiirPoster} alt="Metropolis Cyber Campaign" className="w-full h-full object-cover object-center" />
    )
  },
  {
    id: 7,
    title: "Poulls Eco-Friendly Real Estate",
    category: "webdev",
    categoryLabel: "MERN Stack",
    brief: "Sunny, nature-integrated web landing page for discovering and purchasing eco-friendly modern homes.",
    details: "Created a modern corporate real estate listing web application. Implemented interactive location searching, custom green landscape cards, filter controls for eco-friendly architectural parameters, agent detail modals, and responsive feedback forms.",
    tech: ["React.js", "Tailwind CSS", "Framer Motion", "Real Estate API"],
    date: "January 2026",
    links: { github: "#", live: "#" },
    mockup: (
      <img src={poullsRealEstateWeb} alt="Poulls Eco-Friendly Real Estate" className="w-full h-full object-cover object-top" />
    )
  },
  {
    id: 8,
    title: "Orange Juice Product Poster",
    category: "design",
    categoryLabel: "Graphic Design",
    brief: "Vibrant advertising poster design highlighting product drops, orange splashes, and clean branding.",
    details: "Designed a professional product poster for organic orange juice. Incorporates high-resolution food grouping compositing, detailed water droplets, studio light reflections, dynamic splashes, and a clean product description layout.",
    tech: ["Adobe Photoshop", "Product Branding", "Compositing", "Commercial Design"],
    date: "November 2025",
    links: { github: "#", live: "#" },
    mockup: (
      <img src={orangeJuicePoster} alt="Orange Juice Product Poster" className="w-full h-full object-cover object-center" />
    )
  },
  {
    id: 9,
    title: "Nadlity Food Tracker UI",
    category: "uiux",
    categoryLabel: "UI/UX Design",
    brief: "Interactive daily health tracking application designed for nutrition logging and personalized meal planning.",
    details: "Designed a clean, modern health and food tracking mobile application mockup. Features high-fidelity dual screens for a personalized dashboard with nutrient statistics, caloric goals, and visual meal selection guides.",
    tech: ["Figma UI", "Mobile App UI", "Nutrition Tracker UX", "Dashboard Layouts"],
    date: "October 2025",
    links: { github: "#", live: "#" },
    mockup: (
      <img src={healthyFoodBlueV2Ui} alt="Nadlity Food Tracker UI" className="w-full h-full object-cover object-center" />
    )
  }
];

const filterTabs = [
  { id: 'all', name: 'All Work' },
  { id: 'design', name: 'Graphic Design' },
  { id: 'uiux', name: 'UI/UX Design' },
  { id: 'webdev', name: 'Web Dev' }
];

// ── 3D TILT WRAPPER COMPONENT ──
function TiltCard({ children, className }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-8, 8]);
  const springConfig = { damping: 15, stiffness: 120, mass: 0.8 };
  const springX = useSpring(rotateX, springConfig);
  const springY = useSpring(rotateY, springConfig);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX: springX, rotateY: springY, transformStyle: 'preserve-3d' }}
      className={className}
    >
      <div style={{ transform: 'translateZ(12px)' }} className="h-full w-full">
        {children}
      </div>
    </motion.div>
  );
}

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const gridRef = useRef(null);
  const isInView = useInView(gridRef, { once: true, margin: '-80px' });

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter(p => p.category === activeFilter);

  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.94 },
    visible: (i) => ({
      opacity: 1, y: 0, scale: 1,
      transition: { duration: 0.5, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }
    })
  };

  const modalContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.3, staggerChildren: 0.1 }
    }
  };

  const modalItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 90, damping: 15 }
    }
  };

  return (
    <section
      id="portfolio"
      className="relative py-28 w-full bg-slate-50 dark:bg-[#0f172a] text-slate-800 dark:text-white overflow-hidden grid-background transition-colors duration-500"
    >
      {/* Background gradients */}
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] rounded-full bg-accent-dark/5 blur-[120px] -z-10 animate-pulse-slow" />

      <motion.div
        initial={{ opacity: 0, y: 45 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-7xl mx-auto px-6 md:px-12 w-full"
      >

        {/* Section Title */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.span
            initial={{ opacity: 0, letterSpacing: "0.1em" }}
            whileInView={{ opacity: 1, letterSpacing: "0.25em" }}
            viewport={{ once: true }}
            className="text-accent dark:text-accent-light text-xs font-semibold uppercase mb-3"
          >
            MY SHOWCASE
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-heading font-black tracking-tight"
          >
            Portfolio & <span className="text-gradient-accent">Case Studies</span>
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "4rem" }}
            viewport={{ once: true }}
            transition={{ delay: 0.25 }}
            className="h-1 bg-accent rounded-full mt-5"
          />
        </div>

        {/* Filters tab buttons row with sliding indicator highlight */}
        <div className="flex flex-wrap justify-center gap-2 mb-16 p-1.5 bg-slate-100 dark:bg-slate-950/60 rounded-full max-w-2xl mx-auto relative border border-slate-200/50 dark:border-slate-800/50">
          {filterTabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className="flex-1 py-2.5 px-4 rounded-full text-xs font-bold uppercase tracking-wider transition-colors duration-300 relative z-10 text-slate-600 dark:text-slate-400 cursor-pointer"
            >
              {activeFilter === tab.id && (
                <motion.div
                  layoutId="activePortfolioTab"
                  className="absolute inset-0 bg-white dark:bg-slate-900 rounded-full shadow-sm border border-slate-200/50 dark:border-slate-800/80 -z-10"
                  transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                />
              )}
              <span className={activeFilter === tab.id ? 'text-accent dark:text-accent-light font-black' : ''}>
                {tab.name}
              </span>
            </button>
          ))}
        </div>

        {/* Project Cards Grid */}
        <motion.div
          ref={gridRef}
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                custom={i}
                variants={cardVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                exit={{ opacity: 0, scale: 0.92, transition: { duration: 0.25 } }}
                className="w-full"
              >
                <TiltCard className="w-full h-full">
                  <div
                    onClick={() => setSelectedProject(project)}
                    className="glass-card rounded-2xl overflow-hidden cursor-pointer group flex flex-col justify-between h-full border border-slate-200/50 dark:border-slate-800/60 shadow-sm hover:shadow-neon hover:border-accent/30 dark:hover:border-accent-light/25 duration-350 relative"
                  >
                    {/* Thumbnail Display Wrapper */}
                    <div className="w-full relative overflow-hidden aspect-video border-b border-slate-200/50 dark:border-slate-850">
                      <div className="w-full h-full transform group-hover:scale-105 transition-transform duration-600 ease-out">
                        {project.mockup}
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-start p-4">
                        <span className="flex items-center gap-2 px-4 py-2.5 bg-accent/90 text-white font-bold rounded-xl text-xs tracking-wider uppercase shadow-lg transform translate-y-3 group-hover:translate-y-0 transition-transform duration-300">
                          View Case Study <FiArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                      {/* Category pill on image */}
                      <div className="absolute top-3 left-3">
                        <span className="px-3 py-1 bg-slate-950/70 backdrop-blur-sm text-accent dark:text-accent-light text-[9px] font-black uppercase tracking-widest rounded-full border border-accent/25">
                          {project.categoryLabel}
                        </span>
                      </div>
                    </div>

                    {/* Info Section */}
                    <div className="p-6 space-y-3.5 flex-1 flex flex-col justify-between">
                      <div className="space-y-2.5">
                        <h3 className="text-lg font-heading font-extrabold text-slate-900 dark:text-white group-hover:text-accent dark:group-hover:text-accent-light transition-colors duration-200">
                          {project.title}
                        </h3>
                        <p className="text-sm text-slate-550 dark:text-slate-400 line-clamp-2 leading-relaxed font-sans">
                          {project.brief}
                        </p>
                      </div>

                      <div className="space-y-3.5 pt-3 border-t border-slate-200/60 dark:border-slate-800/40">
                        <div className="flex flex-wrap gap-1.5">
                          {project.tech.slice(0, 3).map((tag) => (
                            <span key={tag} className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-900/60 text-slate-500 dark:text-slate-400 border border-slate-200/80 dark:border-slate-800/50">
                              {tag}
                            </span>
                          ))}
                          {project.tech.length > 3 && (
                            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-accent/10 text-accent dark:text-accent-light border border-accent/20">
                              +{project.tech.length - 3}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5 text-slate-400 text-xs">
                            <FiCalendar className="w-3 h-3" />
                            {project.date}
                          </div>
                          <span className="text-xs font-bold text-accent dark:text-accent-light flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            Details <FiArrowRight className="w-3 h-3" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* Project Details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 overflow-hidden">
            {/* Overlay background */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-slate-950/80 backdrop-filter backdrop-blur-md"
            />

            {/* Modal Card content wrapper */}
            <motion.div
              variants={modalContainerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="relative w-full max-w-4xl max-h-[90vh] bg-slate-900 border border-slate-800 rounded-2xl overflow-y-auto shadow-2xl z-10 p-6 md:p-8 text-white"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-2.5 rounded-full bg-slate-800/60 border border-slate-700/60 text-slate-400 hover:text-white hover:border-slate-500 transition-colors cursor-pointer z-10"
                aria-label="Close modal"
              >
                <FiX className="w-5 h-5" />
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4">
                {/* Left Column: Mockup */}
                <motion.div
                  variants={modalItemVariants}
                  className="lg:col-span-7 rounded-xl overflow-hidden border border-slate-800 shadow-lg"
                >
                  {selectedProject.mockup}
                </motion.div>

                {/* Right Column: Metadata & Details */}
                <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <motion.div
                      variants={modalItemVariants}
                      className="inline-flex items-center gap-2 text-xs font-bold text-accent dark:text-accent-light uppercase tracking-widest px-3.5 py-1 rounded-full bg-slate-950 border border-slate-850"
                    >
                      <FiLayers className="w-3.5 h-3.5" />
                      {selectedProject.categoryLabel}
                    </motion.div>

                    <motion.h3
                      variants={modalItemVariants}
                      className="text-2xl md:text-3xl font-heading font-black tracking-tight leading-none text-slate-100"
                    >
                      {selectedProject.title}
                    </motion.h3>

                    <motion.div
                      variants={modalItemVariants}
                      className="flex items-center gap-2 text-slate-500 text-xs font-semibold uppercase tracking-wider"
                    >
                      <FiCalendar className="w-4 h-4" />
                      {selectedProject.date}
                    </motion.div>

                    <motion.p
                      variants={modalItemVariants}
                      className="text-sm text-slate-400 leading-relaxed font-sans pt-2"
                    >
                      {selectedProject.details}
                    </motion.p>
                  </div>

                  {/* Tech Badges */}
                  <motion.div variants={modalItemVariants} className="space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Technologies Implemented</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tech.map((tag) => (
                        <span key={tag} className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-950 border border-slate-850 text-slate-300">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </motion.div>

                  {/* CTAs */}
                  <motion.div variants={modalItemVariants} className="flex gap-4 pt-4">
                    <a
                      href={selectedProject.links.live}
                      className="flex-1 px-5 py-3.5 bg-gradient-to-r from-accent to-accent-light hover:brightness-110 shadow-neon text-white text-center font-bold rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <FiExternalLink className="w-4.5 h-4.5" />
                      Live Demo
                    </a>
                    <a
                      href={selectedProject.links.github}
                      className="px-5 py-3.5 rounded-xl border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 bg-slate-850 text-center font-bold transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <FiGithub className="w-4.5 h-4.5" />
                      Code
                    </a>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
