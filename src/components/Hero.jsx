import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  FiGithub, FiLinkedin, FiBookOpen, FiFacebook,
  FiDownload, FiMail
} from 'react-icons/fi';
import { SiReact, SiNodedotjs, SiMongodb, SiFigma, SiJavascript } from 'react-icons/si';
import profileImg from '../assets/haroon.jpg';

/* ─── Data ─────────────────────────────────────────────────────────── */
const roles = ['Graphic Designer', 'UI/UX Designer', 'MERN Stack Developer'];

// 7 skills evenly spaced at 360/7 ≈ 51.4° apart, starting at -90° (top)
const SKILL_COUNT = 7;
const orbitSkills = [
  { name: 'React',       icon: <SiReact      className="w-5 h-5 text-[#61DAFB]" /> },
  { name: 'Node.js',     icon: <SiNodedotjs  className="w-5 h-5 text-[#339933]" /> },
  { name: 'MongoDB',     icon: <SiMongodb    className="w-5 h-5 text-[#47A248]" /> },
  { name: 'Figma',       icon: <SiFigma      className="w-5 h-5 text-[#F24E1E]" /> },
  {
    name: 'Photoshop',
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="24" rx="4" fill="#001d26" />
        <path fill="#31A8FF" d="M7.5 7h3.3c1.5 0 2.2.7 2.2 2.1 0 1.3-.7 2-2.1 2H9v3.4H7.5V7zm1.5 1.5v2.7h1.6c.7 0 1-.3 1-1.3 0-.9-.3-1.4-1-1.4H9zM14.5 11.7c0-1 .6-1.5 1.6-1.5.8 0 1.3.4 1.4.9h1.4c-.1-1.3-1.1-2-2.8-2-2 0-3 1.1-3 2.7v.5c0 1.6 1 2.7 3 2.7 1.7 0 2.7-.7 2.8-2h-1.4c-.1.5-.6.9-1.4.9-1 0-1.6-.5-1.6-1.5v-.7z" />
      </svg>
    ),
  },
  {
    name: 'Illustrator',
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="24" rx="4" fill="#261300" />
        <path fill="#FF9A00" d="M6.2 14.5h2.6l.4 1.5h1.7L8.6 7H6.4L4.1 16h1.7l.4-1.5zm1.3-4.8l.9 3.3H6.6l.9-3.3zm6.3-2.7h1.6v9H13.8v-9zM13.8 4.5h1.6V6h-1.6V4.5z" />
      </svg>
    ),
  },
  { name: 'JavaScript', icon: <SiJavascript  className="w-5 h-5 text-[#F7DF1E]" /> },
].map((s, i) => ({
  ...s,
  // Start at -90° (top) and space evenly clockwise
  angleDeg: -90 + i * (360 / SKILL_COUNT),
}));

/* ─── Typewriter hook (phase-based, no stuck states) ───────────────── */
function useTypewriter(words, { typingMs = 100, deletingMs = 48, pauseMs = 2000 } = {}) {
  const [text,    setText]    = useState('');
  const [wordIdx, setWordIdx] = useState(0);
  const [phase,   setPhase]   = useState('typing');

  useEffect(() => {
    const word = words[wordIdx];
    let t;
    if (phase === 'typing') {
      if (text.length < word.length) {
        t = setTimeout(() => setText(word.slice(0, text.length + 1)), typingMs);
      } else {
        t = setTimeout(() => setPhase('pausing'), pauseMs);
      }
    } else if (phase === 'pausing') {
      setPhase('deleting');
    } else {
      if (text.length > 0) {
        t = setTimeout(() => setText(text.slice(0, -1)), deletingMs);
      } else {
        setWordIdx(i => (i + 1) % words.length);
        setPhase('typing');
      }
    }
    return () => clearTimeout(t);
  }, [text, phase, wordIdx, words, typingMs, deletingMs, pauseMs]);

  return text;
}

/* ─── Component ─────────────────────────────────────────────────────── */
export default function Hero() {
  const typedText  = useTypewriter(roles);
  const canvasRef  = useRef(null);

  /* Particle canvas */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let raf;
    const pts = [];

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    window.addEventListener('resize', resize);
    resize();

    class P {
      constructor() { this.init(); }
      init() {
        this.x  = Math.random() * canvas.width;
        this.y  = Math.random() * canvas.height;
        this.r  = Math.random() * 1.6 + 0.4;
        this.vx = (Math.random() - 0.5) * 0.38;
        this.vy = (Math.random() - 0.5) * 0.38;
        this.a  = Math.random() * 0.22 + 0.07;
      }
      tick() {
        this.x += this.vx; this.y += this.vy;
        if (this.x > canvas.width)  this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(56,189,248,${this.a})`;
        ctx.shadowBlur = 4; ctx.shadowColor = '#38bdf8';
        ctx.fill(); ctx.shadowBlur = 0;
      }
    }

    for (let i = 0; i < 70; i++) pts.push(new P());

    const frame = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pts.forEach(p => { p.tick(); p.draw(); });
      // draw connecting lines
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
          const d  = Math.sqrt(dx * dx + dy * dy);
          if (d < 120) {
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = `rgba(14,165,233,${(1 - d / 120) * 0.07})`;
            ctx.lineWidth = 0.5; ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(frame);
    };
    frame();
    return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(raf); };
  }, []);

  const scrollTo = useCallback(id => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), []);

  /* ─── Layout constants (all in px) ──────────────────────────────────
     Everything shares a single square "orbit box".
     Centre of orbit box = centre of profile = pivot of orbit.

     ORBIT_R  : radius from centre to badge centre
     BADGE_R  : half-width of a badge (p-2.5 ≈ 10px pad + 20px icon = 40px → 22px)
     BOX      : orbit box side length = (ORBIT_R + BADGE_R) * 2 + 4px clearance
  ─────────────────────────────────────────────────────────────────── */
  const ORBIT_R   = 150;
  const BADGE_R   = 22;
  const BOX       = (ORBIT_R + BADGE_R) * 2 + 8;   // 348px  → use 350
  const PROFILE_D = 210;                             // profile diameter

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex items-center justify-center bg-slate-50 dark:bg-[#0f172a] text-slate-800 dark:text-white overflow-hidden pt-20 pb-16"
    >
      {/* ── Particle canvas ── */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" />

      {/* ── Available for Freelance — top-left corner badge ── */}
      <motion.div
        initial={{ opacity: 0, x: -30, y: -10 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.6, delay: 1.4, type: 'spring', stiffness: 160, damping: 18 }}
        className="absolute top-24 left-8 z-20"
      >
        <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-white/90 dark:bg-slate-900/90 border border-emerald-400/40 shadow-lg shadow-emerald-500/10 backdrop-blur-md">
          <span className="relative flex h-2.5 w-2.5 flex-shrink-0">
            <span className="animate-ping absolute inset-0 rounded-full bg-emerald-400 opacity-65" />
            <span className="relative h-2.5 w-2.5 rounded-full bg-emerald-500" />
          </span>
          <span className="text-[11px] font-black tracking-wider uppercase text-slate-700 dark:text-slate-200 whitespace-nowrap">
            Available for Freelance
          </span>
        </div>
      </motion.div>


      {/* ── Full-page background glow blobs ──────────────────────────
          These are purely decorative, centred on the viewport.        */}
      {/* Blob 1 – centre warm sky glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-sky-400/10 dark:bg-sky-400/8 blur-[100px] pointer-events-none z-0 animate-pulse-slow" />
      {/* Blob 2 – wider outer halo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[680px] h-[680px] rounded-full bg-accent/5 dark:bg-accent/4 blur-[160px] pointer-events-none z-0" />
      {/* Blob 3 – top-left indigo accent */}
      <div className="absolute top-12 left-[8%] w-[200px] h-[200px] rounded-full bg-indigo-400/8 blur-[70px] pointer-events-none z-0 animate-pulse-slow" style={{ animationDelay: '3.5s' }} />
      {/* Blob 4 – bottom-right sky accent */}
      <div className="absolute bottom-12 right-[8%] w-[180px] h-[180px] rounded-full bg-sky-300/8 blur-[60px] pointer-events-none z-0 animate-pulse-slow" style={{ animationDelay: '1.5s' }} />

      {/* ── Main content column ── */}
      <div className="relative max-w-5xl mx-auto px-6 w-full flex flex-col items-center text-center gap-5 z-10">

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.12 }}
          className="text-5xl sm:text-6xl md:text-7xl font-heading font-black tracking-tight leading-[1.1]"
        >
          Hi, I&apos;m <span className="text-gradient-accent">Haroon</span>
        </motion.h1>

        {/* Typewriter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.28 }}
          className="h-10 flex items-center justify-center"
        >
          <p className="text-xl sm:text-2xl font-semibold text-slate-500 dark:text-slate-300 tracking-wide">
            I&apos;m a&nbsp;
            <span className="text-accent dark:text-accent-light font-bold">
              {typedText}
              <span className="inline-block w-[2px] h-[1.1em] ml-0.5 align-middle bg-accent dark:bg-accent-light animate-pulse" />
            </span>
          </p>
        </motion.div>

        {/* ══════════════════════════════════════════════════════════
            ORBIT SYSTEM
            Strategy:
            • One square "orbit box" of side BOX px.
            • ALL children use `position:absolute; inset:0;
              display:flex; align-items:center; justify-content:center`
              to pin their OWN centre to the box centre.
            • Spinning rings go INSIDE a centered wrapper — so CSS
              `transform: rotate()` from the animation has no
              conflict with any translate centering.
            • The orbit pivot is a 0×0 div inside a centered wrapper.
            • Profile floats inside its own centered wrapper.
            • "Available" badge sits BELOW the orbit box as a sibling.
        ══════════════════════════════════════════════════════════ */}
        <motion.div
          className="flex flex-col items-center gap-4"
          initial={{ opacity: 0, scale: 0.84 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.38, type: 'spring', stiffness: 90, damping: 18 }}
        >
          {/* ── Orbit box ── */}
          <div
            className="relative select-none"
            style={{ width: BOX, height: BOX }}
          >

            {/* ── Ring A : innermost solid circle (profile hug) ──────
                Centered via flexbox. The div itself does NOT rotate,
                so there is no transform conflict.                    */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div
                className="rounded-full border border-accent/18"
                style={{ width: PROFILE_D + 20, height: PROFILE_D + 20 }}
              />
            </div>

            {/* ── Ring B : dashed spinning (orbit path) ─────────────
                Wrapper is centered via flexbox (no transform).
                Inner ring rotates — no conflict.                     */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div
                className="rounded-full border border-dashed border-accent/30 animate-spin-slow"
                style={{ width: ORBIT_R * 2 + 14, height: ORBIT_R * 2 + 14 }}
              />
            </div>

            {/* ── Ring C : outer dotted reverse-spin ────────────────*/}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div
                className="rounded-full border border-dotted border-indigo-400/20 animate-spin-slow"
                style={{
                  width: ORBIT_R * 2 + 54,
                  height: ORBIT_R * 2 + 54,
                  animationDuration: '42s',
                  animationDirection: 'reverse',
                }}
              />
            </div>

            {/* ── Orbit pivot + skill badges ─────────────────────────
                Flex wrapper centres a 0×0 pivot div.
                The pivot rotates; children use trig offsets + counter-
                rotation to stay upright.                              */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              {/* The rotating pivot — 0 × 0 */}
              <div className="animate-orbit" style={{ position: 'relative', width: 0, height: 0 }}>
                {orbitSkills.map((skill, i) => {
                  const rad = (skill.angleDeg * Math.PI) / 180;
                  const x   = ORBIT_R * Math.cos(rad);   // px right of centre
                  const y   = ORBIT_R * Math.sin(rad);   // px below centre
                  return (
                    <div
                      key={i}
                      className="absolute pointer-events-auto"
                      style={{ left: x, top: y, transform: 'translate(-50%, -50%)' }}
                      title={skill.name}
                    >
                      {/* Counter-rotate so icon stays upright */}
                      <div className="animate-counter-orbit group">
                        <div className="relative p-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-accent/25 shadow-md group-hover:border-accent group-hover:shadow-neon group-hover:scale-125 transition-all duration-300 cursor-pointer">
                          {skill.icon}
                          {/* Tooltip */}
                          <span className="absolute -top-9 left-1/2 -translate-x-1/2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-[9px] font-black uppercase tracking-wider px-2 py-1 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 z-30 shadow-lg">
                            {skill.name}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ── Profile image ──────────────────────────────────────
                Flex wrapper centres the image.
                animate-float only does translateY — no conflict.     */}
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div
                className="animate-float relative flex-shrink-0"
                style={{ width: PROFILE_D, height: PROFILE_D }}
              >
                {/* Ambient glow (blurred gradient behind image) */}
                <div
                  className="absolute rounded-full bg-gradient-to-br from-accent via-sky-300 to-indigo-400 opacity-30 blur-xl animate-pulse pointer-events-none"
                  style={{ inset: -16 }}
                />

                {/* Gradient border shell */}
                <div
                  className="absolute rounded-full bg-gradient-to-br from-accent via-accent-light to-indigo-400 pointer-events-none"
                  style={{ inset: -3, opacity: 0.75 }}
                />

                {/* White/dark gap ring */}
                <div
                  className="absolute rounded-full bg-white dark:bg-[#0f172a] pointer-events-none"
                  style={{ inset: -1 }}
                />

                {/* Photo */}
                <div className="relative w-full h-full rounded-full overflow-hidden">
                  <img
                    src={profileImg}
                    alt="Haroon — Graphic Designer & MERN Developer"
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    style={{ objectPosition: 'center 8%' }}
                  />
                </div>
              </div>
            </div>

          </div>{/* end orbit box */}

        </motion.div>
        {/* ══════════════════════════════════════════════════════════ */}

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.56 }}
          className="text-base sm:text-lg text-slate-500 dark:text-slate-400 max-w-[480px] leading-relaxed"
        >
          Crafting premium digital experiences where graphic design, UI/UX, and full-stack MERN development converge.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.68 }}
          className="flex flex-col sm:flex-row gap-3 justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.06, y: -2 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => scrollTo('contact')}
            className="px-8 py-3.5 bg-gradient-to-r from-accent to-accent-light text-white font-semibold rounded-xl shadow-neon hover:shadow-neon-hover hover:brightness-110 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
          >
            <FiMail className="w-4 h-4" />
            Hire Me
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.06, y: -2 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => scrollTo('portfolio')}
            className="px-8 py-3.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-white glass-panel font-semibold hover:text-accent dark:hover:text-accent-light hover:border-accent/50 dark:hover:border-accent-light/40 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
          >
            <FiDownload className="w-4 h-4" />
            View My Work
          </motion.button>
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.86 }}
          className="flex items-center gap-3 pt-1"
        >
          {[
            { icon: <FiGithub   className="w-5 h-5" />, url: '#', label: 'GitHub'   },
            { icon: <FiLinkedin className="w-5 h-5" />, url: '#', label: 'LinkedIn' },
            { icon: <FiBookOpen className="w-5 h-5" />, url: '#', label: 'Behance'  },
            { icon: <FiFacebook className="w-5 h-5" />, url: '#', label: 'Facebook' },
          ].map((s, idx) => (
            <motion.a
              key={idx}
              href={s.url}
              aria-label={s.label}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35, delay: 0.92 + idx * 0.07 }}
              whileHover={{ scale: 1.22, y: -3 }}
              whileTap={{ scale: 0.88 }}
              className="p-3 rounded-full border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 glass-panel hover:text-accent dark:hover:text-accent-light hover:border-accent/40 hover:shadow-neon transition-all duration-300"
            >
              {s.icon}
            </motion.a>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
