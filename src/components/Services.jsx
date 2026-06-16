import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { FiEdit3, FiSliders, FiGlobe, FiSmartphone, FiCpu, FiZap } from 'react-icons/fi';

const servicesList = [
  {
    icon: <FiEdit3 className="w-7 h-7 text-accent transition-transform duration-300 group-hover:rotate-12 group-hover:-translate-y-1" />,
    title: "Graphic Design",
    desc: "Crafting beautiful vector systems, logo standards, visual guides, print systems, and brand assets that make a lasting impact.",
    bullets: ["Corporate Identity Guidelines", "Custom Vector Illustrations", "Print & Digital Poster Systems"]
  },
  {
    icon: <FiSliders className="w-7 h-7 text-accent-light transition-transform duration-300 group-hover:translate-x-1 group-hover:scale-105" />,
    title: "UI/UX Design",
    desc: "Mapping out user experiences from initial research and interactive wireframes to polished high-fidelity mobile prototypes.",
    bullets: ["Conversion-Optimized Flows", "Interactive Clickable Prototypes", "Detailed User Research Plans"]
  },
  {
    icon: <FiGlobe className="w-7 h-7 text-sky-400 transition-transform duration-500 group-hover:rotate-90 group-hover:scale-110" />,
    title: "Website Development",
    desc: "Building clean MERN stack websites with robust MongoDB data structures, secure Express endpoints, and lightning fast clients.",
    bullets: ["Custom React Dashboards", "REST API Development", "Performance Optimization & SEO"]
  },
  {
    icon: <FiSmartphone className="w-7 h-7 text-accent-dark transition-all duration-300 group-hover:skew-x-3 group-hover:scale-110" />,
    title: "Responsive Web Design",
    desc: "Ensuring web assets scale cleanly across mobile viewports, tablet screens, large monitors, and touch interfaces.",
    bullets: ["Mobile-First Grid Layouts", "Flexible Typography Scales", "Cross-Browser Quality Checks"]
  },
  {
    icon: <FiCpu className="w-7 h-7 text-accent transition-transform duration-700 group-hover:rotate-180 group-hover:scale-110" />,
    title: "Branding Design",
    desc: "Building a coherent narrative with bespoke color schemes, grid-aligned typography guides, and premium design tokens.",
    bullets: ["Color Mapping & Typography", "Brand Positioning Mockups", "Comprehensive Asset Toolkits"]
  },
  {
    icon: <FiZap className="w-7 h-7 text-amber-400 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12" />,
    title: "SEO & Optimization",
    desc: "Optimizing web platforms for core vital performance metrics, executing structured sitemaps metadata practices, and boosting organic visibility.",
    bullets: ["Lighthouse Performance Tuning", "Semantic HTML SEO Mappings", "Structured Data Schema Markup"]
  }
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
      <div style={{ transform: 'translateZ(15px)' }} className="h-full w-full">
        {children}
      </div>
    </motion.div>
  );
}

function ServiceCard({ service, index }) {
  const cardRef = useRef(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCoords({ x, y });
  };

  return (
    <TiltCard className="h-full w-full">
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, delay: index * 0.1, type: 'spring', stiffness: 80, damping: 14 }}
        className="relative glass-card rounded-2xl p-8 overflow-hidden group flex flex-col justify-between h-full hover:shadow-neon hover:border-accent/30 duration-300"
      >
        {/* Mouse Track Radial Spot Light */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(350px circle at ${coords.x}px ${coords.y}px, rgba(14, 165, 233, 0.12), transparent 75%)`
          }}
        />

        <div className="space-y-6 z-10">
          {/* Service Icon */}
          <div className="p-4 bg-slate-100 dark:bg-slate-800/80 rounded-2xl w-fit border border-slate-200 dark:border-slate-700/80 group-hover:scale-105 transition-transform duration-300">
            {service.icon}
          </div>

          {/* Title & Desc */}
          <div className="space-y-3">
            <h3 className="text-2xl font-heading font-extrabold text-slate-900 dark:text-white transition-colors duration-200 group-hover:text-accent dark:group-hover:text-accent-light">
              {service.title}
            </h3>
            <p className="text-sm text-slate-550 dark:text-slate-400 leading-relaxed font-sans">
              {service.desc}
            </p>
          </div>
        </div>

        {/* Bullet Features */}
        <ul className="space-y-2.5 mt-6 pt-6 border-t border-slate-200 dark:border-slate-850 z-10">
          {service.bullets.map((bullet, idx) => (
            <li key={idx} className="flex items-center gap-2.5 text-xs font-semibold text-slate-600 dark:text-slate-400 font-sans">
              <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              {bullet}
            </li>
          ))}
        </ul>
      </motion.div>
    </TiltCard>
  );
}

export default function Services() {
  return (
    <section
      id="services"
      className="relative py-28 w-full bg-slate-50 dark:bg-[#0f172a] text-slate-800 dark:text-white overflow-hidden grid-background transition-colors duration-500"
    >
      {/* Radial ambient background light */}
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] rounded-full bg-accent-dark/5 blur-[120px] -z-10 animate-pulse-slow" />

      <motion.div
        initial={{ opacity: 0, y: 45 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-7xl mx-auto px-6 md:px-12 w-full"
      >
        {/* Section Title */}
        <div className="flex flex-col items-center text-center mb-20">
          <motion.span 
            initial={{ opacity: 0, letterSpacing: "0.1em" }}
            whileInView={{ opacity: 1, letterSpacing: "0.25em" }}
            viewport={{ once: true }}
            className="text-accent dark:text-accent-light text-xs font-semibold uppercase mb-3"
          >
            WHAT I DELIVER
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-heading font-black tracking-tight"
          >
            Professional <span className="text-gradient-accent">Services</span>
          </motion.h2>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: "4rem" }}
            viewport={{ once: true }}
            transition={{ delay: 0.25 }}
            className="h-1 bg-accent rounded-full mt-5" 
          />
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesList.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
