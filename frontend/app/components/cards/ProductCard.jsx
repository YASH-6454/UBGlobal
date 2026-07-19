'use client';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';

export default function ProductCard({ name, image, description, href = "#", specs = [], index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.45, delay: index * 0.1 }}
    >
      <Link
        href={href}
        className="product-card bg-white rounded-2xl overflow-hidden border border-surface-darker/40 group cursor-pointer flex flex-col h-full block"
      >
        <div className="relative h-48 overflow-hidden shrink-0">
          <Image
            src={image}
            alt={name}
            fill
            sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 25vw"
            className="object-cover product-image transition-transform duration-700"
          />
          <div className="product-overlay absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-0 transition-opacity duration-400 flex items-end justify-center pb-4">
            <span className="text-white text-sm font-semibold flex items-center gap-1">
              Learn More <FiArrowRight className="text-xs" />
            </span>
          </div>
        </div>
        <div className="p-5 flex flex-col flex-1">
          <h3 className="text-lg font-bold text-primary font-[family-name:var(--font-poppins)] mb-2 group-hover:text-eng transition-colors">
            {name}
          </h3>
          <p className="text-secondary text-sm leading-relaxed mb-4 flex-1">
            {description}
          </p>
          {specs.length > 0 && (
            <div className="space-y-1.5">
              {specs.map((spec, j) => (
                <div key={j} className="flex items-center gap-2 text-xs text-secondary-light">
                  <span className="w-1 h-1 bg-eng rounded-full shrink-0" />
                  {spec}
                </div>
              ))}
            </div>
          )}
          <div className="mt-4 pt-4 border-t border-surface-darker/50">
            <span className="text-eng text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
              View Details <FiArrowRight className="text-xs" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
