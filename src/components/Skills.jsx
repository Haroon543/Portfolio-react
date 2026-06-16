import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { 
  SiHtml5, SiCss, SiJavascript, SiReact, SiNodedotjs, 
  SiExpress, SiMongodb, SiTailwindcss, SiFigma
} from 'react-icons/si';

const categories = [
  { id: 'all', name: 'All Stack' },
  { id: 'design', name: 'Graphic Design' },
  { id: 'uiux', name: 'UI/UX Design' },
  { id: 'frontend', name: 'Frontend Dev' },
  { id: 'backend', name: 'Backend Dev' },
  { id: 'mern', name: 'MERN Stack' }
];

const skills = [
  { 
    name: 'Adobe Photoshop', 
    level: 90, 
    color: '#31A8FF',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 text-[#31A8FF] fill-current" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="24" rx="4" fill="#001d26"/>
        <path d="M7.5 7h3.3c1.5 0 2.2.7 2.2 2.1 0 1.3-.7 2-2.1 2H9v3.4H7.5V7zm1.5 1.5v2.7h1.6c.7 0 1-.3 1-1.3 0-.9-.3-1.4-1-1.4H9zM14.5 11.7c0-1 .6-1.5 1.6-1.5.8 0 1.3.4 1.4.9h1.4c-.1-1.3-1.1-2-2.8-2-2 0-3 1.1-3 2.7v.5c0 1.6 1 2.7 3 2.7 1.7 0 2.7-.7 2.8-2h-1.4c-.1.5-.6.9-1.4.9-1 0-1.6-.5-1.6-1.5v-.7z" />
      </svg>
    ), 
    categories: ['design'] 
  },
  { 
    name: 'Adobe Illustrator', 
    level: 85, 
    color: '#FF9A00',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 text-[#FF9A00] fill-current" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="24" rx="4" fill="#261300"/>
        <path d="M6.2 14.5h2.6l.4 1.5h1.7L8.6 7H6.4L4.1 16h1.7l.4-1.5zm1.3-4.8l.9 3.3H6.6l.9-3.3zm6.3-2.7h1.6v9H13.8v-9zM13.8 4.5h1.6V6h-1.6V4.5z" />
      </svg>
    ), 
    categories: ['design'] 
  },
  { name: 'Figma Visuals', level: 92, color: '#F24E1E', icon: <SiFigma className="w-6 h-6 text-[#F24E1E]" />, categories: ['design', 'uiux'] },
  { name: 'Figma Wireframing', level: 95, color: '#A259FF', icon: <SiFigma className="w-6 h-6 text-[#A259FF]" />, categories: ['uiux'] },
  { name: 'UI Prototyping', level: 92, color: '#0ACF83', icon: <SiFigma className="w-6 h-6 text-[#0ACF83]" />, categories: ['uiux'] },
  { name: 'User Testing', level: 80, color: '#1ABCFE', icon: <SiFigma className="w-6 h-6 text-[#1ABCFE]" />, categories: ['uiux'] },
  { name: 'HTML5', level: 95, color: '#E34F26', icon: <SiHtml5 className="w-6 h-6 text-[#E34F26]" />, categories: ['frontend'] },
  { name: 'CSS3', level: 90, color: '#1572B6', icon: <SiCss className="w-6 h-6 text-[#1572B6]" />, categories: ['frontend'] },
  { name: 'JavaScript (ES6)', level: 88, color: '#F7DF1E', icon: <SiJavascript className="w-6 h-6 text-[#F7DF1E]" />, categories: ['frontend', 'mern'] },
  { name: 'React.js', level: 90, color: '#61DAFB', icon: <SiReact className="w-6 h-6 text-[#61DAFB]" />, categories: ['frontend', 'mern'] },
  { name: 'Tailwind CSS', level: 95, color: '#06B6D4', icon: <SiTailwindcss className="w-6 h-6 text-[#06B6D4]" />, categories: ['frontend'] },
  { name: 'Node.js', level: 85, color: '#339933', icon: <SiNodedotjs className="w-6 h-6 text-[#339933]" />, categories: ['backend', 'mern'] },
  { name: 'Express.js', level: 82, color: '#475569', icon: <SiExpress className="w-6 h-6 text-slate-700 dark:text-slate-350" />, categories: ['backend', 'mern'] },
  { name: 'MongoDB', level: 88, color: '#47A248', icon: <SiMongodb className="w-6 h-6 text-[#47A248]" />, categories: ['backend', 'mern'] }
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

// ── CIRCULAR PROGRESS COMPONENT ──
function CircularProgress({ percentage, color = "#0ea5e9", isInView }) {
  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative w-16 h-16 flex items-center justify-center">
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 80 80">
        <circle
          cx="40"
          cy="40"
          r={radius}
          className="stroke-slate-200 dark:stroke-slate-800"
          strokeWidth="5.5"
          fill="transparent"
        />
        <motion.circle
          cx="40"
          cy="40"
          r={radius}
          stroke={color}
          strokeWidth="5.5"
          fill="transparent"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={isInView ? { strokeDashoffset } : { strokeDashoffset: circumference }}
          transition={{ duration: 1.4, ease: 'easeOut', delay: 0.1 }}
          strokeLinecap="round"
        />
      </svg>
      <span className="absolute text-xs font-heading font-black text-slate-850 dark:text-white">
        {percentage}%
      </span>
    </div>
  );
}

export default function Skills() {
  const [activeTab, setActiveTab] = useState('all');
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const filteredSkills = activeTab === 'all' 
    ? skills 
    : skills.filter(skill => skill.categories.includes(activeTab));

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-28 w-full bg-slate-50 dark:bg-[#0f172a] text-slate-800 dark:text-white overflow-hidden grid-background transition-colors duration-500"
    >
      {/* Ambient background glow orb */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-accent/8 dark:bg-accent/6 blur-[110px] -z-10 animate-pulse-slow" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
        
        {/* Section Title */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, letterSpacing: "0.1em" }}
            whileInView={{ opacity: 1, letterSpacing: "0.25em" }}
            viewport={{ once: true }}
            className="text-accent dark:text-accent-light text-xs font-semibold uppercase mb-3"
          >
            MY POWERHOUSE
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-heading font-black tracking-tight"
          >
            Technical & <span className="text-gradient-accent">Creative Stack</span>
          </motion.h2>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: "4rem" }}
            viewport={{ once: true }}
            transition={{ delay: 0.25 }}
            className="h-1 bg-accent rounded-full mt-5" 
          />
        </div>

        {/* Categories sliding tab row */}
        <div className="flex flex-wrap justify-center gap-2 mb-16 p-1.5 bg-slate-100 dark:bg-slate-950/60 rounded-full max-w-4xl mx-auto relative border border-slate-200/50 dark:border-slate-800/50">
          {categories.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="px-6 py-2.5 rounded-full text-xs md:text-sm font-semibold tracking-wider transition-colors duration-300 relative z-10 text-slate-600 dark:text-slate-400 cursor-pointer"
            >
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeSkillTab"
                  className="absolute inset-0 bg-white dark:bg-slate-900 rounded-full shadow-sm border border-slate-200/50 dark:border-slate-800/80 -z-10"
                  transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                />
              )}
              <span className={activeTab === tab.id ? 'text-accent dark:text-accent-light font-bold' : ''}>
                {tab.name}
              </span>
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill) => (
              <motion.div
                key={skill.name}
                layout
                initial={{ opacity: 0, scale: 0.92, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: 15 }}
                transition={{ duration: 0.35 }}
                className="w-full"
              >
                <TiltCard className="w-full">
                  <div
                    style={{ 
                      '--skill-glow': `${skill.color}15`, 
                      '--skill-glow-active': `${skill.color}25` 
                    }}
                    className="glass-card rounded-2xl p-6 flex items-center justify-between border border-slate-200/50 dark:border-slate-800/60 shadow-sm hover:shadow-[0_10px_30px_var(--skill-glow)] dark:hover:shadow-[0_10px_35px_var(--skill-glow-active)] hover:border-accent/30 dark:hover:border-accent-light/25 duration-350 relative overflow-hidden group"
                  >
                    {/* Glow radial overlay */}
                    <div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                      style={{ background: `radial-gradient(200px circle at 50% 50%, ${skill.color}10, transparent 80%)` }}
                    />

                    {/* Left Side: Logo & Labels */}
                    <div className="flex items-center gap-4 z-10">
                      <div className="p-3 bg-slate-100 dark:bg-slate-800/80 rounded-2xl border border-slate-200/60 dark:border-slate-700/60 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                        {skill.icon}
                      </div>
                      <div>
                        <h3 className="font-heading font-extrabold text-base text-slate-900 dark:text-slate-100">
                          {skill.name}
                        </h3>
                        <p className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-1">
                          {skill.categories
                            .map(catId => categories.find(c => c.id === catId)?.name)
                            .filter(Boolean)
                            .join(' / ')}
                        </p>
                      </div>
                    </div>

                    {/* Right Side: Circular Gauge */}
                    <div className="z-10 flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
                      <CircularProgress percentage={skill.level} color={skill.color} isInView={isInView} />
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
