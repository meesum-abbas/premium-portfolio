import { motion, useAnimationFrame, useMotionValue, useScroll, useSpring, useTransform, useVelocity } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const MotionDiv = motion.div;

function wrap(min, max, value) {
  const range = max - min;
  return ((((value - min) % range) + range) % range) + min;
}

export function ScrollVelocityContainer({ children, className = '' }) {
  return <div className={`scroll-velocity ${className}`}>{children}</div>;
}

export function ScrollVelocityRow({ children, baseVelocity = 28, direction = 1 }) {
  const segmentRef = useRef(null);
  const [segmentWidth, setSegmentWidth] = useState(0);
  const baseX = useMotionValue(0);
  const x = useTransform(baseX, (value) => `${value}px`);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const directionFactor = useRef(direction);

  useEffect(() => {
    if (!segmentRef.current) {
      return undefined;
    }

    const updateWidth = () => setSegmentWidth(segmentRef.current?.offsetWidth ?? 0);
    updateWidth();

    const resizeObserver = new ResizeObserver(updateWidth);
    resizeObserver.observe(segmentRef.current);

    return () => resizeObserver.disconnect();
  }, []);

  useAnimationFrame((_, delta) => {
    if (!segmentWidth) {
      return;
    }

    const velocityFactor = Math.min(Math.abs(smoothVelocity.get()) / 4200, 0.35);

    if (smoothVelocity.get() < 0) {
      directionFactor.current = -direction;
    } else if (smoothVelocity.get() > 0) {
      directionFactor.current = direction;
    }

    const moveBy = directionFactor.current * baseVelocity * (delta / 1000) * (1 + velocityFactor);
    baseX.set(wrap(-segmentWidth, 0, baseX.get() + moveBy));
  });

  return (
    <div className="scroll-velocity-row" aria-hidden="true">
      <MotionDiv className="scroll-velocity-track" style={{ x }}>
        {Array.from({ length: 8 }).map((_, index) => (
          <span ref={index === 0 ? segmentRef : null} key={`${children}-${index}`}>{children}</span>
        ))}
      </MotionDiv>
    </div>
  );
}
