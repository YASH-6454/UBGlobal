'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';

export default function ServiceCard({ title, description, icon: Icon, features = [], href, gradient = 'from-blue-500 to-blue-600', index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.45, delay: index * 0.1 }}
    >
      <Link
        href={href}
        className="card-hover bg-white rounded-2xl p-7 border border-surface-darker/40 group cursor-pointer flex flex-col h-full block"
      >
        <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-lg`}>
          {Icon && <Icon className="text-white text-xl" />}
        </div>
        <h3 className="text-lg font-bold text-primary font-[family-name:var(--font-poppins)] mb-2 group-hover:text-it transition-colors">
          {title}
        </h3>
        <p className="text-secondary text-sm leading-relaxed mb-4 flex-1">
          {description}
        </p>
        {features.length > 0 && (
          <div className="space-y-2 mb-4">
            {features.map((f, j) => (
              <div key={j} className="flex items-center gap-2 text-xs text-secondary">
                <span className="w-1.5 h-1.5 bg-it rounded-full shrink-0" />
                {f}
              </div>
            ))}
          </div>
        )}
        <div className="pt-4 border-t border-surface-darker/50">
          <span className="text-it text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
            Learn More <FiArrowRight className="text-xs" />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
