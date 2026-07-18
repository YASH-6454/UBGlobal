'use client';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function SectionHeader({
  label,
  title,
  description,
  titleHighlight,
  highlightClass = 'text-gradient-eng',
  align = 'center',
  light = false,
  className = '',
}) {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className={`${align === 'center' ? 'text-center' : 'text-left'} mb-14 ${className}`}
    >
      {label && (
        <span className={`font-semibold text-xs tracking-[0.2em] uppercase ${light ? 'text-eng' : 'text-eng'}`}>
          {label}
        </span>
      )}
      <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 mb-4 font-[family-name:var(--font-poppins)] leading-tight ${light ? 'text-white' : 'text-primary'}`}>
        {titleHighlight ? (
          <>
            {title}{' '}
            <span className={highlightClass}>{titleHighlight}</span>
          </>
        ) : (
          title
        )}
      </h2>
      <div className={`section-divider ${align === 'center' ? 'mx-auto' : ''} mb-5`} />
      {description && (
        <p className={`max-w-2xl text-base ${align === 'center' ? 'mx-auto' : ''} ${light ? 'text-white/55' : 'text-secondary'}`}>
          {description}
        </p>
      )}
    </motion.div>
  );
}
