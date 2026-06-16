import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { 
  FiCheckSquare, FiAward, FiUsers, FiCpu, 
  FiLayers, FiCompass, FiChevronDown, FiBookOpen 
} from 'react-icons/fi';

// ── 3D TILT WRAPPER COMPONENT ──
function TiltCard({ children, className }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Maps coordinates (-0.5 to 0.5) to tilt degree rotation
  const rotateX = useTransform(y, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-10, 10]);

  // Spring values for fluid, organic return-to-center physics
  const springConfig = { damping: 15, stiffness: 120, mass: 0.8 };
  const springX = useSpring(rotateX, springConfig);
  const springY = useSpring(rotateY, springConfig);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Normalizing mouse coordinate relative to card center from -0.5 to 0.5
    const mouseX = (e.clientX - rect.left) / width - 0.5;
    const mouseY = (e.clientY - rect.top) / height - 0.5;

    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: springX,
        rotateY: springY,
        transformStyle: 'preserve-3d',
      }}
      className={`${className} transition-shadow duration-300`}
    >
      <div style={{ transform: 'translateZ(15px)' }} className="h-full w-full">
        {children}
      </div>
    </motion.div>
  );
}

// ── COUNTER FOR NUMBERS ──
function Counter({ value, duration = 1.2 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = parseInt(value, 10);
      if (start === end) return;

      const totalMiliseconds = duration * 1000;
      const stepTime = Math.abs(Math.floor(totalMiliseconds / end));

      const timer = setInterval(() => {
        start += 1;
        setCount(start);
        if (start === end) {
          clearInterval(timer);
        }
      }, Math.max(stepTime, 14));

      return () => clearInterval(timer);
    }
  }, [isInView, value, duration]);

  return <span ref={ref}>{count}</span>;
}

export default function About() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [activeTab, setActiveTab] = useState('visual');
  const [openPhilosophy, setOpenPhilosophy] = useState(null);

  // Expertise domains detail mapping
  const domains = {
    visual: {
      title: "Visual Art & Identity",
      highlight: "Graphic layouts, color systems, and vector assets.",
      desc: "Forming the creative root of my pipeline. I blend aesthetic theory, brand design principles, and custom asset layouts to create layouts that tell stories and engage users instantly.",
      skills: ["Adobe Illustrator", "Photoshop Layouts", "Vector Traces", "Identity Systems", "Type Scales"]
    },
    ux: {
      title: "UI/UX Experience Design",
      highlight: "Interactive Figma wireframes, layouts, and system mappings.",
      desc: "Structuring interface interactions focused on simplicity. I design modern client prototypes, build responsive layouts, and map comprehensive design systems before coding.",
      skills: ["Figma Wireframes", "Design Systems", "User Journey Maps", "Micro-interactions", "Usability Specs"]
    },
    mern: {
      title: "MERN Stack Development",
      highlight: "Scalable backend pipelines and lightning-fast frontends.",
      desc: "Engineering performant web ecosystems. I combine highly modular React templates, secure Express route calls, scalable MongoDB schemas, and clean, readable code architectures.",
      skills: ["React / Vite Hooks", "Node.js & Express", "MongoDB Schema", "Tailwind styling", "RESTful Routing"]
    }
  };

  const philosophies = [
    {
      id: "user",
      title: "User-Centric Architecture",
      desc: "An application is only as valuable as the user's ease of navigation. I sketch pathways, build interactive wireframes, and refine user pathways long before deploying back-end structures."
    },
    {
      id: "pixel",
      title: "Pixel-Perfect Consistency",
      desc: "Consistency breeds trust. Every card, button spacing, border width, and transition length is mathematically aligned to custom grid tokens, ensuring uniform visual quality."
    },
    {
      id: "syntax",
      title: "Clean Readable Syntax",
      desc: "Codebases are living ecosystems. I maintain modular components, clear naming conventions, and thoroughly documented hooks to guarantee future extensibility and scaling."
    },
    {
      id: "perf",
      title: "Highly Responsive Frameworks",
      desc: "Performance is usability. I analyze bundle size payloads, lazy-load graphic wrappers, and throttle redundant side-effects to achieve fluid, 60fps responsiveness."
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { type: 'spring', stiffness: 90, damping: 14 } 
    }
  };

  return (
    <section
      id="about"
      className="relative py-28 w-full bg-slate-50 dark:bg-[#0f172a] text-slate-800 dark:text-white overflow-hidden grid-background transition-colors duration-500"
    >
      {/* ── AMBIENT BACKGROUND GLOW ORBS ── */}
      <div className="absolute top-12 -right-12 w-96 h-96 rounded-full bg-accent/8 dark:bg-accent/6 blur-[120px] pointer-events-none animate-pulse-slow -z-10" />
      <div className="absolute -bottom-16 -left-16 w-[450px] h-[450px] rounded-full bg-[#818cf8]/8 dark:bg-[#818cf8]/5 blur-[130px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative z-10">
        
        {/* ── SECTION HEADER ── */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, letterSpacing: "0.1em" }}
            whileInView={{ opacity: 1, letterSpacing: "0.25em" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-accent dark:text-accent-light text-xs font-semibold uppercase mb-3"
          >
            DISCOVER ME
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="text-3xl md:text-5xl font-heading font-black tracking-tight"
          >
            About My <span className="text-gradient-accent">Creative Engine</span>
          </motion.h2>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: "4rem" }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="h-1 bg-accent rounded-full mt-5" 
          />
        </div>

        {/* ── STATS ROW (FULL WIDTH) ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
        >
          {[
            { 
              icon: <FiAward className="w-6 h-6 text-accent" />, 
              title: "Experience", 
              value: "3", 
              suffix: "+ Years", 
              borderColor: "hover:border-accent/40"
            },
            { 
              icon: <FiCheckSquare className="w-6 h-6 text-emerald-400" />, 
              title: "Completed", 
              value: "15", 
              suffix: "+ Projects", 
              borderColor: "hover:border-emerald-400/40"
            },
            { 
              icon: <FiUsers className="w-6 h-6 text-indigo-400" />, 
              title: "Happy Clients", 
              value: "10", 
              suffix: "+ Clients", 
              borderColor: "hover:border-indigo-400/40"
            },
            { 
              icon: <FiCpu className="w-6 h-6 text-pink-400" />, 
              title: "Technologies", 
              value: "15", 
              suffix: "+ Techs", 
              borderColor: "hover:border-pink-400/40"
            }
          ].map((stat, idx) => (
            <TiltCard key={idx} className="w-full">
              <motion.div
                variants={itemVariants}
                className={`glass-card rounded-2xl p-6 flex flex-col justify-between h-44 border border-slate-200/50 dark:border-slate-800/60 shadow-md hover:shadow-neon duration-300 relative overflow-hidden group ${stat.borderColor}`}
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-accent/0 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="p-3 bg-slate-100 dark:bg-slate-800/80 rounded-xl w-fit border border-slate-200 dark:border-slate-700/80 group-hover:scale-110 transition-transform duration-300">
                  {stat.icon}
                </div>
                <div>
                  <h3 className="text-3xl font-heading font-extrabold text-slate-900 dark:text-slate-100 tracking-tight mt-3">
                    <Counter value={stat.value} />
                    {stat.suffix}
                  </h3>
                  <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1 uppercase tracking-wide">
                    {stat.title}
                  </p>
                </div>
              </motion.div>
            </TiltCard>
          ))}
        </motion.div>

        {/* ── CONTENT GRID (2 COLUMNS) ── */}
        <motion.div
          ref={containerRef}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start"
        >
          {/* Left Column: Biography & Expertise Tabs */}
          <div className="lg:col-span-6 space-y-10">
            <motion.div variants={itemVariants} className="space-y-4">
              <h3 className="text-2xl font-heading font-bold text-slate-900 dark:text-white leading-snug">
                Bridging the gap between artistic design and robust modern stack architectures.
              </h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-sans text-base">
                Hello! I am Haroon, a hybrid creator specializing in graphic layouts, user experience mapping, and full-stack React node environments. My passion lies in constructing highly engaging vector dynamics and pairing them with resilient backend workflows.
              </p>
            </motion.div>

            {/* Tabbed Panel */}
            <motion.div variants={itemVariants} className="w-full">
              {/* Tab headers */}
              <div className="flex border-b border-slate-200 dark:border-slate-800 mb-6 p-1 bg-slate-100 dark:bg-slate-950/60 rounded-xl relative">
                {[
                  { id: 'visual', label: 'Visual Art', icon: <FiLayers className="w-4 h-4" /> },
                  { id: 'ux', label: 'UI/UX Craft', icon: <FiCompass className="w-4 h-4" /> },
                  { id: 'mern', label: 'MERN Stack', icon: <FiCpu className="w-4 h-4" /> }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className="flex-1 flex items-center justify-center gap-2 py-3 px-2 text-xs md:text-sm font-semibold rounded-lg relative transition-colors duration-300 z-10 text-slate-600 dark:text-slate-400"
                  >
                    {activeTab === tab.id && (
                      <motion.div
                        layoutId="activeTabGlow"
                        className="absolute inset-0 bg-white dark:bg-slate-900 rounded-lg shadow-sm border border-slate-200 dark:border-slate-800 -z-10"
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                    <span className={activeTab === tab.id ? 'text-accent dark:text-accent-light' : ''}>
                      {tab.icon}
                    </span>
                    <span className={activeTab === tab.id ? 'text-slate-900 dark:text-white font-bold' : ''}>
                      {tab.label}
                    </span>
                  </button>
                ))}
              </div>

              {/* Tab Content Box */}
              <div className="min-h-[200px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -15 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    <div className="flex items-center gap-3">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent animate-ping" />
                      <h4 className="text-lg font-bold font-heading text-slate-900 dark:text-white">
                        {domains[activeTab].title}
                      </h4>
                    </div>
                    
                    <p className="text-sm font-semibold text-accent/95 dark:text-accent-light/95 italic">
                      {domains[activeTab].highlight}
                    </p>
                    
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
                      {domains[activeTab].desc}
                    </p>

                    {/* Skill Badges */}
                    <div className="flex flex-wrap gap-2 pt-3">
                      {domains[activeTab].skills.map((skill, index) => (
                        <span
                          key={index}
                          className="text-xs font-semibold px-3.5 py-1.5 rounded-full bg-slate-200/50 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300 border border-slate-300/40 dark:border-slate-700/40 hover:border-accent/35 transition-colors duration-300"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Core Philosophy Accordions */}
          <div className="lg:col-span-6 space-y-6">
            <motion.div variants={itemVariants}>
              <h4 className="font-heading font-extrabold text-slate-700 dark:text-slate-300 mb-6 tracking-wide uppercase text-xs">
                Core Philosophy
              </h4>
              <div className="space-y-3">
                {philosophies.map((philo) => {
                  const isOpen = openPhilosophy === philo.id;
                  return (
                    <div
                      key={philo.id}
                      className="border border-slate-200/70 dark:border-slate-800/80 rounded-xl overflow-hidden bg-slate-100/50 dark:bg-slate-950/20 transition-colors duration-300"
                    >
                      <button
                        onClick={() => setOpenPhilosophy(isOpen ? null : philo.id)}
                        className="w-full flex items-center justify-between p-4 text-left transition-colors duration-200 hover:bg-slate-100/80 dark:hover:bg-slate-900/40"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                          <span className="font-heading font-bold text-sm text-slate-800 dark:text-slate-200">
                            {philo.title}
                          </span>
                        </div>
                        <motion.div
                          animate={{ rotate: isOpen ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                          className="text-slate-400 dark:text-slate-500"
                        >
                          <FiChevronDown className="w-4 h-4" />
                        </motion.div>
                      </button>
                      
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                          >
                            <div className="px-5 pb-5 pt-1 text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-sans border-t border-slate-200/30 dark:border-slate-800/30">
                              {philo.desc}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
