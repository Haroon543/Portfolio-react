import React, { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { FiBriefcase, FiBookOpen, FiActivity } from 'react-icons/fi';

const timelineData = [
  {
    id: 1,
    type: 'experience',
    period: '2024 - Present',
    title: ' MERN Developer & Designer',
    company: 'Apex Digital Labs',
    desc: 'Led a cross-functional squad creating scalable responsive SaaS dashboards. Developed secure Express backend APIs, designed high-fidelity Figma prototypes, and implemented dynamic Framer Motion animations.'
  },
  {
    id: 2,
    type: 'experience',
    period: '2022 - 2024',
    title: 'UI/UX Specialist & Web Developer',
    company: 'Upwork',
    desc: 'Collaborated with clients to design wireframes, user personas, and branding guidelines. Translated designs into robust React components with custom Tailwind styling.'
  },
  {
    id: 3,
    type: 'education',
    period: '2020 - 2022',
    title: 'F.S.C ',
    company: 'Muslim Group of Colleges',
    desc: 'Specialized in accessibility guidelines, cognitive walkthrough models, rapid user interface prototyping, and quantitative user study tests.'
  },
  {
    id: 4,
    type: 'experience',
    period: '2019 - 2020',
    title: 'Junior Front-End Developer',
    company: 'Fiver',
    desc: 'Configured fluid responsive front-ends using HTML, CSS, JavaScript, and initial React concepts. Created graphic assets, vector logos, and social media flyers.'
  },
  {
    id: 5,
    type: 'education',
    period: '2023 - 2027',
    title: 'B.S. in Software Engineering',
    company: 'Comsats University  Islamabad',
    desc: 'Built foundation in algorithm optimization, database design models (SQL & NoSQL), network systems, and OOP paradigms.'
  }
];

const timelineFilters = [
  { id: 'all', label: 'All Journey', icon: <FiActivity className="w-3.5 h-3.5" /> },
  { id: 'experience', label: 'Experience Only', icon: <FiBriefcase className="w-3.5 h-3.5" /> },
  { id: 'education', label: 'Education Only', icon: <FiBookOpen className="w-3.5 h-3.5" /> }
];

function TimelineItem({ item, index, isEven }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const cardVariants = {
    hidden: {
      opacity: 0,
      x: isEven ? -40 : 40,
      y: 15
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { type: 'spring', stiffness: 90, damping: 14 }
    }
  };

  return (
    <div
      ref={ref}
      className={`relative flex flex-col md:flex-row items-center justify-between w-full mb-14 last:mb-0 ${isEven ? 'md:flex-row-reverse' : ''
        }`}
    >
      {/* Spacer (Desktop alignment helper) */}
      <div className="hidden md:block w-[45%]" />

      {/* Circle Icon Badge */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : {}}
        transition={{ type: 'spring', delay: 0.15, stiffness: 220, damping: 15 }}
        whileHover={{ scale: 1.15, rotate: 10 }}
        className="absolute left-0 md:left-1/2 md:-translate-x-1/2 w-11 h-11 rounded-full flex items-center justify-center bg-white dark:bg-slate-900 border border-accent/40 dark:border-accent-light/40 shadow-neon hover:border-accent dark:hover:border-accent-light z-10 cursor-pointer group"
      >
        <span className="group-hover:scale-110 transition-transform duration-300">
          {item.type === 'experience'
            ? <FiBriefcase className="w-4.5 h-4.5 text-accent dark:text-accent-light" />
            : <FiBookOpen className="w-4.5 h-4.5 text-accent-light" />
          }
        </span>
      </motion.div>

      {/* Main timeline card */}
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="w-full md:w-[45%] pl-14 md:pl-0"
      >
        <div className="glass-card rounded-2xl p-6 hover:shadow-neon duration-300 border border-slate-200/50 dark:border-slate-800/60 shadow-md relative group hover:border-accent/30 dark:hover:border-accent-light/35">
          <div className="absolute inset-0 bg-gradient-to-tr from-accent/0 to-accent/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <span className="px-3.5 py-1 bg-accent/8 dark:bg-accent-light/8 border border-accent/20 text-accent dark:text-accent-light text-xs font-bold rounded-full font-heading tracking-wide">
              {item.period}
            </span>
            <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">
              {item.type}
            </span>
          </div>

          <h3 className="text-xl font-heading font-extrabold text-slate-900 dark:text-white mb-1 transition-colors duration-200 group-hover:text-accent dark:group-hover:text-accent-light">
            {item.title}
          </h3>

          <h4 className="text-xs font-bold text-slate-650 dark:text-slate-450 font-heading tracking-wide mb-4 uppercase">
            {item.company}
          </h4>

          <p className="text-sm text-slate-550 dark:text-slate-400 font-sans leading-relaxed">
            {item.desc}
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default function Timeline() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredData = activeFilter === 'all'
    ? timelineData
    : timelineData.filter(item => item.type === activeFilter);

  return (
    <section
      id="timeline"
      className="relative py-28 w-full bg-slate-50 dark:bg-[#0f172a] text-slate-800 dark:text-white overflow-hidden grid-background transition-colors duration-500"
    >
      {/* Background radial glow */}
      <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] rounded-full bg-accent-dark/5 blur-[110px] -z-10 animate-pulse-slow" />

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
            MY JOURNEY
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-heading font-black tracking-tight"
          >
            Education & <span className="text-gradient-accent">Experience</span>
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "4rem" }}
            viewport={{ once: true }}
            transition={{ delay: 0.25 }}
            className="h-1 bg-accent rounded-full mt-5"
          />
        </div>

        {/* Timeline Dynamic Filtering Tab list */}
        <div className="flex flex-wrap justify-center gap-2 mb-16 p-1.5 bg-slate-100 dark:bg-slate-950/60 rounded-full max-w-2xl mx-auto relative border border-slate-200/50 dark:border-slate-800/50">
          {timelineFilters.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-full text-xs font-bold uppercase tracking-wider transition-colors duration-300 relative z-10 text-slate-600 dark:text-slate-400 cursor-pointer"
            >
              {activeFilter === tab.id && (
                <motion.div
                  layoutId="activeTimelineTab"
                  className="absolute inset-0 bg-white dark:bg-slate-900 rounded-full shadow-sm border border-slate-200/50 dark:border-slate-800/80 -z-10"
                  transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                />
              )}
              <span className={activeFilter === tab.id ? 'text-accent dark:text-accent-light' : ''}>
                {tab.icon}
              </span>
              <span className={activeFilter === tab.id ? 'text-slate-900 dark:text-white font-black' : ''}>
                {tab.label}
              </span>
            </button>
          ))}
        </div>

        {/* Timeline body wrapper */}
        <div
          ref={containerRef}
          className="relative max-w-5xl mx-auto flex flex-col justify-start min-h-[500px]"
        >
          {/* Vertical central line path */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.4, ease: 'easeInOut' }}
            className="absolute left-[20px] md:left-1/2 md:-translate-x-1/2 top-2 bottom-2 w-[3px] bg-gradient-to-b from-accent via-accent-light to-accent-dark/30 origin-top opacity-30 pointer-events-none"
          />

          {/* Active path pointer dot */}
          {isInView && (
            <motion.div
              initial={{ top: 0, opacity: 0 }}
              animate={{ top: "98%", opacity: 1 }}
              transition={{ duration: 1.8, ease: "easeInOut", delay: 0.2 }}
              className="absolute left-[17.5px] md:left-[50.2%] md:-translate-x-1/2 w-2 h-2 rounded-full bg-accent dark:bg-accent-light shadow-neon pointer-events-none z-10"
            />
          )}

          {/* Timeline Nodes */}
          <div className="space-y-2">
            <AnimatePresence mode="popLayout">
              {filteredData.map((item, index) => {
                // Ensure alternate even/odd pattern is correct even when filtered
                const isEven = index % 2 === 0;
                return (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.94 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.2 } }}
                    transition={{ duration: 0.4 }}
                  >
                    <TimelineItem item={item} index={index} isEven={isEven} />
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
