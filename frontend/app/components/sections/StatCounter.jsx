'use client';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

export default function StatCounter({ target, suffix = '', label, description, className = '' }) {
  const [count, setCount] = useState(0);
  const [ref, inView] = useInView({ threshold: 0.5, triggerOnce: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const end = parseInt(target);
    const duration = 2000;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <div ref={ref} className={`text-center ${className}`}>
      <div className="text-3xl sm:text-4xl font-bold text-eng font-[family-name:var(--font-poppins)]">
        {count}{suffix}
      </div>
      {label && <div className="text-primary font-semibold mt-2 text-sm">{label}</div>}
      {description && <div className="text-secondary-light text-xs mt-0.5">{description}</div>}
    </div>
  );
}
