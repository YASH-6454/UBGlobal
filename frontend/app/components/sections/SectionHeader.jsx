'use client';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

/**
 * Editorial section heading: a ruled eyebrow label, a serif title with an
 * optional italic highlight, and a measured description.
 * `highlightClass` is still accepted (e.g. 'text-gradient-agri') and mapped to
 * the matching solid text colour, so existing callers keep their division colour.
 */
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
  const centered = align === 'center';
  const highlightColor = highlightClass.replace('text-gradient-', 'text-');

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 14 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`${centered ? 'text-center' : 'text-left'} mb-14 ${className}`}
    >
      {label && (
        <span
          className={`inline-flex items-center gap-3 text-[11px] font-medium tracking-[0.24em] uppercase ${
            light ? 'text-white/70' : 'text-secondary'
          }`}
        >
          <span aria-hidden="true" className="h-px w-8" style={{ background: 'var(--division-accent, #F97316)' }} />
          {label}
          {centered && (
            <span aria-hidden="true" className="h-px w-8" style={{ background: 'var(--division-accent, #F97316)' }} />
          )}
        </span>
      )}
      <h2
        className={`text-3xl sm:text-4xl lg:text-[3.25rem] font-medium mt-4 mb-5 font-[family-name:var(--font-heading)] leading-[1.1] ${
          light ? 'text-white' : 'text-primary'
        } ${centered ? 'mx-auto max-w-3xl' : 'max-w-3xl'}`}
      >
        {titleHighlight ? (
          <>
            {title}{' '}
            <em className={`${highlightColor} font-normal`}>{titleHighlight}</em>
          </>
        ) : (
          title
        )}
      </h2>
      {description && (
        <p
          className={`max-w-xl text-base leading-relaxed ${centered ? 'mx-auto' : ''} ${
            light ? 'text-white/60' : 'text-secondary'
          }`}
        >
          {description}
        </p>
      )}
    </motion.div>
  );
}
