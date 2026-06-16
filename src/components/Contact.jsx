import React, { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { FiMail, FiMapPin, FiPhone, FiSend, FiCheck } from 'react-icons/fi';

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
      <div style={{ transform: 'translateZ(10px)' }} className="h-full w-full">
        {children}
      </div>
    </motion.div>
  );
}

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle, sending, success, error

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
      return;
    }

    setStatus('sending');
    try {
      // Use the environment variable for the backend URL, fallback to localhost for local development
      const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
      
      const response = await fetch(`${backendUrl}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setStatus('idle'), 4000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 3000);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <section
      id="contact"
      className="relative py-28 w-full bg-slate-50 dark:bg-[#0f172a] text-slate-800 dark:text-white overflow-hidden grid-background transition-colors duration-500"
    >
      {/* Background radial glow */}
      <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-[450px] h-[450px] rounded-full bg-accent/6 dark:bg-accent/4 blur-[130px] -z-10 animate-pulse-slow" />

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
            GET IN TOUCH
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-heading font-black tracking-tight"
          >
            Contact <span className="text-gradient-accent">My Studio</span>
          </motion.h2>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: "4rem" }}
            viewport={{ once: true }}
            transition={{ delay: 0.25 }}
            className="h-1 bg-accent rounded-full mt-5" 
          />
        </div>

        {/* Contact Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left Column: Contact Cards & Google Maps */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            <div className="space-y-4">
              {[
                {
                  icon: <FiMail className="w-5 h-5 text-accent" />,
                  title: "Direct Email",
                  value: "haroon.design@gmail.com",
                  href: "mailto:haroon.design@gmail.com"
                },
                {
                  icon: <FiPhone className="w-5 h-5 text-emerald-400" />,
                  title: "Call Direct",
                  value: "+1 (555) 749-2384",
                  href: "tel:+15557492384"
                },
                {
                  icon: <FiMapPin className="w-5 h-5 text-indigo-400" />,
                  title: "Base Location",
                  value: "Multan, Pakistan",
                  href: "#"
                }
              ].map((info, idx) => (
                <TiltCard key={idx} className="w-full">
                  <a
                    href={info.href}
                    className="glass-card rounded-2xl p-5 flex items-center gap-5 hover:shadow-neon border border-slate-200/50 dark:border-slate-800/60 shadow-sm duration-300 block relative group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-tr from-accent/0 to-accent/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    <div className="p-3 bg-slate-100 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700/60 group-hover:scale-105 transition-transform duration-300">
                      {info.icon}
                    </div>
                    <div>
                      <h4 className="text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500">{info.title}</h4>
                      <p className="text-sm font-extrabold text-slate-900 dark:text-slate-200 mt-1.5 font-sans transition-colors duration-200 group-hover:text-accent dark:group-hover:text-accent-light">{info.value}</p>
                    </div>
                  </a>
                </TiltCard>
              ))}
            </div>

            {/* Custom Styled Google Maps Iframe */}
            <div className="w-full h-64 rounded-2xl overflow-hidden border border-slate-250 dark:border-slate-800/60 relative shadow-md group hover:border-accent/30 dark:hover:border-accent-light/25 duration-300">
              <iframe
                title="Office Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d110439.12458428387!2d71.40578147683935!3d30.180424564883445!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x393b33e1176885b1%3A0xf5103ecdd036987f!2sMultan%2C%20Punjab%2C%20Pakistan!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full grayscale invert-[0.85] hue-rotate-[195deg] contrast-[1.2] dark:opacity-75 transition-opacity"
              />
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="glass-card rounded-3xl p-8 relative flex flex-col justify-between h-full border border-slate-200/50 dark:border-slate-800/60 shadow-md">
              <h3 className="text-2xl font-heading font-extrabold mb-6 text-slate-900 dark:text-white">
                Send a Message
              </h3>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-slate-500">Your Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Haroon"
                      className="w-full px-4 py-3.5 rounded-xl bg-slate-100/70 dark:bg-slate-900/40 border border-slate-250 dark:border-slate-800/60 focus:border-accent dark:focus:border-accent-light focus:bg-white dark:focus:bg-slate-950/80 text-sm text-slate-900 dark:text-slate-255 placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-accent dark:focus:ring-accent-light transition-all duration-300 font-sans"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-slate-500">Your Email *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="vance.design@gmail.com"
                      className="w-full px-4 py-3.5 rounded-xl bg-slate-100/70 dark:bg-slate-900/40 border border-slate-250 dark:border-slate-800/60 focus:border-accent dark:focus:border-accent-light focus:bg-white dark:focus:bg-slate-950/80 text-sm text-slate-900 dark:text-slate-255 placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-accent dark:focus:ring-accent-light transition-all duration-300 font-sans"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="text-xs font-bold uppercase tracking-wider text-slate-500">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Project partnership opportunities"
                    className="w-full px-4 py-3.5 rounded-xl bg-slate-100/70 dark:bg-slate-900/40 border border-slate-250 dark:border-slate-800/60 focus:border-accent dark:focus:border-accent-light focus:bg-white dark:focus:bg-slate-950/80 text-sm text-slate-900 dark:text-slate-255 placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-accent dark:focus:ring-accent-light transition-all duration-300 font-sans"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-xs font-bold uppercase tracking-wider text-slate-500">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Hi Haroon, I would love to collaborate on a MERN backend redesign..."
                    className="w-full px-4 py-3.5 rounded-xl bg-slate-100/70 dark:bg-slate-900/40 border border-slate-250 dark:border-slate-800/60 focus:border-accent dark:focus:border-accent-light focus:bg-white dark:focus:bg-slate-950/80 text-sm text-slate-900 dark:text-slate-255 placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-accent dark:focus:ring-accent-light transition-all duration-300 font-sans resize-none font-medium"
                  />
                </div>

                {/* Animated Send Button */}
                <motion.button
                  whileTap={{ scale: 0.975 }}
                  whileHover={{ scale: 1.01 }}
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full py-4 bg-gradient-to-r from-accent to-accent-light hover:brightness-110 shadow-neon hover:shadow-neon-hover text-white font-bold rounded-xl flex items-center justify-center gap-2.5 transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === 'sending' ? (
                    <>
                      <div className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <FiSend className="w-4.5 h-4.5" />
                      Send Message
                    </>
                  )}
                </motion.button>
              </form>

              {/* Status Alert Overlay Popups */}
              <AnimatePresence>
                {status === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ type: 'spring', damping: 20 }}
                    className="absolute inset-0 bg-white dark:bg-[#070b13] rounded-3xl p-8 flex flex-col items-center justify-center text-center space-y-4 border border-emerald-500/25 z-25"
                  >
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', delay: 0.1 }}
                      className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500 flex items-center justify-center text-emerald-500 shadow-neon"
                    >
                      <FiCheck className="w-8 h-8" />
                    </motion.div>
                    <h3 className="text-2xl font-heading font-black text-slate-900 dark:text-slate-100">Message Received!</h3>
                    <p className="text-slate-500 dark:text-slate-400 font-sans text-sm max-w-sm">
                      Thank you for reaching out. I've received your note and will get back to you within 24 hours.
                    </p>
                  </motion.div>
                )}
                
                {status === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 12 }}
                    className="absolute bottom-6 right-6 px-5 py-3 rounded-xl bg-red-500/10 border border-red-500/40 text-red-650 dark:text-red-400 font-extrabold text-xs tracking-wide shadow-md"
                  >
                    Please fill out all required fields.
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>
      </motion.div>
    </section>
  );
}
