'use client';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';

/** Typographic call-to-action: hairline rules, a serif line and one solid button. */
export default function CTABanner({
  title = 'Ready to partner with us?',
  description = 'Get a competitive quote within 24 hours',
  buttonText = 'Request Quote',
  buttonHref = '/contact',
  variant = 'dark',
  className = '',
}) {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  const isDark = variant === 'dark';

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 12 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`py-8 sm:py-10 flex flex-col sm:flex-row items-center justify-between gap-6 border-y ${
        isDark ? 'border-white/20' : 'border-primary/15'
      } ${className}`}
    >
      <div className="text-center sm:text-left">
        <h3
          className={`text-2xl sm:text-3xl font-medium font-[family-name:var(--font-heading)] leading-tight ${
            isDark ? 'text-white' : 'text-primary'
          }`}
        >
          {title}
        </h3>
        <p className={`text-sm mt-2 ${isDark ? 'text-white/60' : 'text-secondary'}`}>{description}</p>
      </div>
      <Link
        href={buttonHref}
        className={`px-7 py-3.5 rounded-md text-sm font-semibold whitespace-nowrap shrink-0 flex items-center gap-2 group transition-colors duration-200 ${
          isDark
            ? 'bg-white text-primary hover:bg-surface-dark'
            : 'bg-primary text-white hover:bg-primary-light'
        }`}
      >
        {buttonText}
        <FiArrowRight
          className="text-sm group-hover:translate-x-1 transition-transform"
          style={{ color: 'var(--division-accent, #F97316)' }}
        />
      </Link>
    </motion.div>
  );
}
