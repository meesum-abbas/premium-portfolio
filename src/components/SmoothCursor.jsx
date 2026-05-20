import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const interactiveSelector = 'a, button, input, textarea, select, label, [role="button"]';
const MotionDiv = motion.div;

export function SmoothCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springX = useSpring(cursorX, { stiffness: 420, damping: 34, mass: 0.45 });
  const springY = useSpring(cursorY, { stiffness: 420, damping: 34, mass: 0.45 });

  useEffect(() => {
    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!canHover || reduceMotion) {
      return undefined;
    }

    setEnabled(true);
    document.documentElement.classList.add('has-smooth-cursor');

    const handlePointerMove = (event) => {
      cursorX.set(event.clientX - 14);
      cursorY.set(event.clientY - 14);
      setHovering(Boolean(event.target.closest(interactiveSelector)));
    };

    const handlePointerDown = () => setPressed(true);
    const handlePointerUp = () => setPressed(false);

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointerup', handlePointerUp);

    return () => {
      document.documentElement.classList.remove('has-smooth-cursor');
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [cursorX, cursorY]);

  if (!enabled) {
    return null;
  }

  return (
    <MotionDiv
      className="smooth-cursor"
      aria-hidden="true"
      style={{ x: springX, y: springY }}
      animate={{
        scale: pressed ? 0.72 : hovering ? 1.85 : 1,
        opacity: hovering ? 0.72 : 0.92,
      }}
      transition={{ type: 'spring', stiffness: 420, damping: 30 }}
    >
      <span />
    </MotionDiv>
  );
}
