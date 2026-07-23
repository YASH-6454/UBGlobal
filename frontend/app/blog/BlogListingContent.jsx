'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import Image from 'next/image';
import { FiCalendar, FiUser } from 'react-icons/fi';
import SectionHeader from '../components/sections/SectionHeader';
import { blogPosts as fallbackPosts } from './blogData';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export default function BlogListingContent() {
  const [ref, inView] = useInView({ threshold: 0.05, triggerOnce: true });
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadBlogs() {
      try {
        const res = await fetch(`${API_URL}/api/blogs`);
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setBlogs(data);
            setLoading(false);
            return;
          }
        }
      } catch (err) {
        console.error('Failed to fetch blogs from API, using fallback:', err);
      }
      setBlogs(fallbackPosts);
      setLoading(false);
    }

    loadBlogs();
  }, []);

  const getDivisionColor = (category) => {
    if (category === 'Engineering') return 'text-eng bg-eng/10';
    if (category === 'Agriculture') return 'text-agri bg-agri/10';
    if (category === 'Handcrafts') return 'text-craft bg-craft/10';
    return 'text-it bg-it/10';
  };

  const getExcerpt = (post) => {
    if (post.excerpt) return post.excerpt;
    if (!post.content) return '';
    // Clean markdown headings/symbols for clean excerpt
    const plain = post.content.replace(/#+/g, '').replace(/[*_~`]/g, '').trim();
    return plain.length > 150 ? plain.slice(0, 150) + '...' : plain;
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

        {loading ? (
          <div className="flex justify-center py-16">
            <div className="loader-ring w-8 h-8" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((post, i) => {
              const imageSrc = post.image || '/images/hero-bg.png';
              const postDate = post.date || post.created_at || new Date().toISOString();

              return (
                <motion.div 
                  key={post.slug || post.id || i} 
                  initial={{ opacity: 0, y: 30 }} 
                  animate={inView ? { opacity: 1, y: 0 } : {}} 
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                >
                  <Link href={`/blog/${post.slug}`} className="bg-white rounded-2xl overflow-hidden border border-surface-darker/40 group block h-full flex flex-col hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                    <div className="relative h-56 overflow-hidden shrink-0 bg-surface">
                      <Image 
                        src={imageSrc} 
                        alt={post.title} 
                        fill 
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500" 
                      />
                      <div className="absolute top-4 left-4">
                        <span className={`px-3 py-1 rounded-full text-[11px] font-bold ${getDivisionColor(post.category)}`}>
                          {post.category || 'General'}
                        </span>
                      </div>
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <h3 className="text-xl font-bold text-primary font-[family-name:var(--font-poppins)] mb-3 group-hover:text-eng transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-secondary text-sm leading-relaxed mb-5 flex-1 line-clamp-3">
                        {getExcerpt(post)}
                      </p>
                      <div className="flex items-center justify-between pt-4 border-t border-surface-darker/50 text-xs text-secondary-light">
                        <div className="flex items-center gap-1.5">
                          <FiCalendar /> {new Date(postDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <FiUser /> {post.author || 'UBGlobal Admin'}
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
