'use client';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';

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
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className={`rounded-2xl p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-5 ${
        isDark
          ? 'bg-white/[0.06] backdrop-blur-sm border border-white/[0.08]'
          : 'bg-surface border border-surface-darker/40'
      } ${className}`}
    >
      <div className="text-center sm:text-left">
        <h3 className={`text-xl sm:text-2xl font-bold font-[family-name:var(--font-poppins)] ${isDark ? 'text-white' : 'text-primary'}`}>
          {title}
        </h3>
        <p className={`text-sm mt-1.5 ${isDark ? 'text-white/50' : 'text-secondary'}`}>
          {description}
        </p>
      </div>
      <Link
        href={buttonHref}
        className="gradient-eng text-white px-8 py-3.5 rounded-xl text-sm font-semibold hover:shadow-lg hover:shadow-eng/25 transition-all hover:-translate-y-0.5 whitespace-nowrap shrink-0 flex items-center gap-2 group"
      >
        {buttonText}
        <FiArrowRight className="text-sm group-hover:translate-x-1 transition-transform" />
      </Link>
    </motion.div>
  );
}
