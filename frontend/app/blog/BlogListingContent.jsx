'use client';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import Image from 'next/image';
import { FiArrowRight, FiCalendar, FiUser } from 'react-icons/fi';
import SectionHeader from '../components/sections/SectionHeader';
import { blogPosts } from './blogData';

export default function BlogListingContent() {
  const [ref, inView] = useInView({ threshold: 0.05, triggerOnce: true });

  const getDivisionColor = (category) => {
    if (category === 'Engineering') return 'text-eng bg-eng/10';
    if (category === 'Agriculture') return 'text-agri bg-agri/10';
    return 'text-it bg-it/10';
  };

  return (
    <section className="py-12 sm:py-20 bg-surface min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <SectionHeader 
          label="Our Blog" 
          title="Insights &" 
          titleHighlight="Industry News" 
          description="Stay updated with the latest trends, tips, and insights across engineering materials, agricultural exports, and enterprise technology." 
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, i) => (
            <motion.div 
              key={post.slug} 
              initial={{ opacity: 0, y: 30 }} 
              animate={inView ? { opacity: 1, y: 0 } : {}} 
              transition={{ duration: 0.5, delay: i * 0.15 }}
            >
              <Link href={`/blog/${post.slug}`} className="bg-white rounded-2xl overflow-hidden border border-surface-darker/40 group block h-full flex flex-col hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="relative h-56 overflow-hidden shrink-0">
                  <Image src={post.image} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-[11px] font-bold ${getDivisionColor(post.category)}`}>
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-bold text-primary font-[family-name:var(--font-poppins)] mb-3 group-hover:text-eng transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-secondary text-sm leading-relaxed mb-5 flex-1 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-surface-darker/50 text-xs text-secondary-light">
                    <div className="flex items-center gap-1.5"><FiCalendar /> {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</div>
                    <div className="flex items-center gap-1.5"><FiUser /> {post.author}</div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
