import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

let _trailCounter = 0;

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [trail, setTrail] = useState([]);
  const trailRef = useRef([]);
  const frameRef = useRef(null);
  const mousePos = useRef({ x: -200, y: -200 });

  const cursorX = useMotionValue(-200);
  const cursorY = useMotionValue(-200);

  const springConfig = { damping: 28, stiffness: 300, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const dotX = useMotionValue(-200);
  const dotY = useMotionValue(-200);

  useEffect(() => {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    setIsVisible(true);
    document.body.style.cursor = 'none';

    const moveCursor = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      dotX.set(e.clientX);
      dotY.set(e.clientY);

      // Add trail point with unique ID
      const id = ++_trailCounter;
      trailRef.current = [
        { x: e.clientX, y: e.clientY, id },
        ...trailRef.current.slice(0, 7)
      ];
      setTrail([...trailRef.current]);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (!target) return;
      const isClickable =
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('cursor-pointer') ||
        window.getComputedStyle(target).cursor === 'pointer';
      setIsHovered(!!isClickable);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'auto';
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [cursorX, cursorY, dotX, dotY]);

  if (!isVisible) return null;

  return (
    <>
      {/* Trail dots */}
      {trail.map((point, i) => (
        <motion.div
          key={point.id}
          className="pointer-events-none fixed top-0 left-0 rounded-full z-[9998]"
          style={{
            x: point.x,
            y: point.y,
            translateX: '-50%',
            translateY: '-50%',
            width: Math.max(3, 8 - i),
            height: Math.max(3, 8 - i),
            backgroundColor: `rgba(56, 189, 248, ${Math.max(0.03, 0.25 - i * 0.035)})`,
          }}
          initial={{ opacity: 0.4, scale: 1 }}
          animate={{ opacity: 0, scale: 0.3 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      ))}

      {/* Outer magnetic ring */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 rounded-full z-[9999]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: isClicking ? 22 : isHovered ? 44 : 30,
          height: isClicking ? 22 : isHovered ? 44 : 30,
          borderWidth: isHovered ? 2 : 1.5,
          borderColor: isHovered ? 'rgba(56, 189, 248, 0.9)' : 'rgba(14, 165, 233, 0.55)',
          backgroundColor: isHovered ? 'rgba(56, 189, 248, 0.12)' : 'rgba(14, 165, 233, 0)',
          boxShadow: isHovered
            ? '0 0 18px rgba(56, 189, 248, 0.4), inset 0 0 10px rgba(56, 189, 248, 0.1)'
            : '0 0 6px rgba(14, 165, 233, 0.2)',
          rotate: isHovered ? 45 : 0,
        }}
        transition={{
          width: { type: 'spring', stiffness: 400, damping: 28 },
          height: { type: 'spring', stiffness: 400, damping: 28 },
          borderColor: { duration: 0.2 },
          backgroundColor: { duration: 0.2 },
          boxShadow: { duration: 0.3 },
          rotate: { type: 'spring', stiffness: 300, damping: 20 },
        }}
        style={{ borderStyle: 'solid', borderRadius: isHovered ? '8px' : '50%' }}
      />

      {/* Inner dot */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 rounded-full z-[9999]"
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: isClicking ? 10 : isHovered ? 5 : 6,
          height: isClicking ? 10 : isHovered ? 5 : 6,
          backgroundColor: isHovered ? '#38bdf8' : '#0ea5e9',
          opacity: isHovered ? 0.7 : 1,
          scale: isClicking ? 1.4 : 1,
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      />

      {/* Click ripple */}
      {isClicking && (
        <motion.div
          className="pointer-events-none fixed top-0 left-0 rounded-full border border-accent z-[9997]"
          style={{
            x: cursorXSpring,
            y: cursorYSpring,
            translateX: '-50%',
            translateY: '-50%',
          }}
          initial={{ width: 20, height: 20, opacity: 0.8 }}
          animate={{ width: 60, height: 60, opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      )}
    </>
  );
}
