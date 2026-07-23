'use client';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { FiArrowRight, FiCheckCircle, FiShield, FiTruck, FiAward, FiX } from 'react-icons/fi';
import SectionHeader from '../components/sections/SectionHeader';
import CTABanner from '../components/sections/CTABanner';
import TestimonialCarousel from '../components/sections/TestimonialCarousel';
import FAQSection from '../components/sections/FAQSection';

import { useState, useEffect, useRef } from 'react';

export default function AgricultureContent() {
  const [heroRef, heroInView] = useInView({ threshold: 0.05, triggerOnce: true });
  const [produce, setProduce] = useState([]);
  const searchParams = useSearchParams();
  const urlCategory = searchParams.get('category');
  const [selectedCategory, setSelectedCategory] = useState(urlCategory || null);
  const productsRef = useRef(null);

  // Sync with URL param on mount/change
  useEffect(() => {
    setSelectedCategory(urlCategory || null);
    if (urlCategory && productsRef.current) {
      setTimeout(() => productsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' }), 300);
    }
  }, [urlCategory]);
  
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/products?division=Agriculture`)
      .then(res => res.json())
      .then(data => setProduce(data))
      .catch(console.error);
  }, []);

  // Build categories dynamically from products
  const categoryColors = {
    'Fruits': { emoji: '🍎', color: 'bg-green-50 border-green-200 hover:bg-green-100' },
    'Vegetables': { emoji: '🥬', color: 'bg-emerald-50 border-emerald-200 hover:bg-emerald-100' },
    'Spices': { emoji: '🌶️', color: 'bg-orange-50 border-orange-200 hover:bg-orange-100' },
  };

  const categoryMap = {};
  produce.forEach(p => {
    const cat = p.category || 'Other';
    if (!categoryMap[cat]) categoryMap[cat] = [];
    categoryMap[cat].push(p);
  });

  const categories = Object.keys(categoryMap).map(cat => ({
    name: cat,
    count: categoryMap[cat].length,
    emoji: categoryColors[cat]?.emoji || '📦',
    color: categoryColors[cat]?.color || 'bg-gray-50 border-gray-200 hover:bg-gray-100',
  }));

  const handleCategoryClick = (catName) => {
    setSelectedCategory(prev => prev === catName ? null : catName);
    if (productsRef.current) {
      setTimeout(() => productsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
    }
  };

  const filteredProduce = selectedCategory
    ? produce.filter(p => (p.category || 'Other') === selectedCategory)
    : produce;

  return (
    <>
      {/* Hero */}
      <section className="relative py-16 sm:py-24 overflow-hidden bg-gradient-to-br from-primary via-primary to-agri-dark/30">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 20% 80%, rgba(34,197,94,0.3), transparent 50%), radial-gradient(circle at 80% 20%, rgba(74,222,128,0.2), transparent 50%)' }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" ref={heroRef}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-agri/20 rounded-full px-4 py-1.5 mb-6">
              <span className="w-1.5 h-1.5 bg-agri rounded-full" />
              <span className="text-agri text-xs font-semibold tracking-wide">Agriculture Division</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-[1.1] font-[family-name:var(--font-poppins)] mb-5">
              Fresh Indian <span className="text-gradient-agri">Fruits & Vegetables</span> for the World
            </h1>
            <p className="text-white/60 text-base sm:text-lg leading-relaxed mb-6">
              APEDA & FSSAI certified exporter of premium Indian produce — Alphonso Mangoes, Onions, Pomegranates, Bananas, Spices, and more.
            </p>
            <div className="flex flex-wrap gap-3 mb-8">
              {['APEDA Certified', 'FSSAI Licensed', 'Cold Chain Logistics'].map((badge, i) => (
                <span key={i} className="px-3 py-1.5 bg-white/10 rounded-full text-white text-xs font-semibold flex items-center gap-1.5">
                  <FiShield className="text-agri text-[10px]" /> {badge}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-6 pt-6 border-t border-white/10">
              {[{ v: `${produce.length}+`, l: 'Products' }, { v: 'APEDA', l: 'Certified' }, { v: '24/7', l: 'Cold Chain' }].map((s, i) => (
                <div key={i}><div className="text-2xl font-bold text-agri">{s.v}</div><div className="text-white/40 text-xs">{s.l}</div></div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {categories.map((cat, i) => (
              <button key={i} onClick={() => handleCategoryClick(cat.name)} className={`flex items-center gap-4 p-5 rounded-2xl border transition-all duration-300 group text-left ${selectedCategory === cat.name ? 'ring-2 ring-agri shadow-lg scale-[1.02]' : ''} ${cat.color}`}>
                <span className="text-3xl">{cat.emoji}</span>
                <div>
                  <h3 className="font-bold text-primary font-[family-name:var(--font-poppins)]">{cat.name}</h3>
                  <p className="text-sm text-secondary">{cat.count} products</p>
                </div>
                <FiArrowRight className="ml-auto text-secondary group-hover:translate-x-1 transition-transform" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* All Produce Grid */}
      <section className="py-20 sm:py-28 bg-surface" ref={productsRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="Our Produce" title="Export Quality" titleHighlight={selectedCategory || 'Indian Produce'} highlightClass="text-gradient-agri" description="Fresh, certified, and carefully sourced from the best farms across India." />
          {selectedCategory && (
            <div className="flex items-center gap-3 mb-6">
              <span className="text-sm text-secondary">Showing <strong className="text-primary">{filteredProduce.length}</strong> products in <strong className="text-agri">{selectedCategory}</strong></span>
              <button onClick={() => setSelectedCategory(null)} className="inline-flex items-center gap-1 text-xs font-semibold text-red-500 hover:text-red-700 bg-red-50 px-3 py-1.5 rounded-full transition-colors">
                <FiX className="text-xs" /> Clear Filter
              </button>
            </div>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredProduce.map((item, i) => {
              const slug = item.slug || item.name.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-');
              return (
              <motion.div key={item.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.05 }}
                className="bg-white rounded-2xl p-6 border border-surface-darker/40 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group cursor-pointer"
                onClick={() => window.location.href = `/agriculture/${slug}`}
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="text-4xl">{item.emoji}</span>
                  <span className="px-2 py-0.5 bg-agri/10 text-agri text-[10px] font-bold rounded-full">{item.category}</span>
                </div>
                <h3 className="text-base font-bold text-primary font-[family-name:var(--font-poppins)] mb-1 group-hover:text-agri transition-colors">{item.name}</h3>
                <p className="text-secondary text-xs leading-relaxed mb-3">{item.desc || item.description}</p>
                <div className="flex items-center gap-1.5 text-xs text-secondary-light">
                  <span className="w-1.5 h-1.5 bg-agri rounded-full" />
                  {item.specs?.[0] || 'Premium Quality'}
                </div>
              </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 sm:py-28 bg-gradient-to-br from-primary via-primary to-agri-dark/20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeader label="Why Choose Us" title="The Agriculture Advantage" description="From farm to port — quality assured at every step." light />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: FiAward, title: 'APEDA Certified', desc: 'Government-recognized certification for agricultural exports.' },
              { icon: FiShield, title: 'FSSAI Licensed', desc: 'Food safety compliance as per Indian regulations.' },
              { icon: FiTruck, title: 'Cold Chain', desc: 'Temperature-controlled supply chain for maximum freshness.' },
              { icon: FiCheckCircle, title: 'Farm Fresh', desc: 'Sourced directly from premium Indian farms.' },
            ].map((f, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.1 }}
                className="bg-white/[0.06] backdrop-blur-sm border border-white/[0.08] rounded-2xl p-7 group hover:bg-white/[0.12] transition-all hover:-translate-y-2"
              >
                <div className="w-14 h-14 rounded-xl gradient-agri flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-lg">
                  <f.icon className="text-white text-xl" />
                </div>
                <h3 className="text-base font-bold text-white mb-2">{f.title}</h3>
                <p className="text-white/50 text-sm">{f.desc}</p>
              </motion.div>
            ))}
          </div>
          <CTABanner title="Need fresh produce for your market?" description="Get pricing and availability for any season" className="mt-14" variant="dark" />
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="Client Testimonials" title="Trusted by Food Importers" description="What our agriculture clients say about our produce quality and service." />
          <TestimonialCarousel division="agriculture" light={false} />
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 sm:py-28 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="FAQ" title="Frequently Asked Questions" description="Common questions about our agricultural exports and processes." />
          <FAQSection faqs={[
            { question: 'What certifications do you hold for food exports?', answer: 'We are APEDA (Agricultural & Processed Food Products Export Development Authority) registered and hold a valid FSSAI (Food Safety and Standards Authority of India) license, ensuring our produce meets international food safety standards.' },
            { question: 'Which countries do you export fruits and vegetables to?', answer: 'We export to markets across the Middle East (UAE, Saudi Arabia, Qatar, Oman, Kuwait), Southeast Asia (Singapore, Malaysia), Europe, and Africa. Our logistics network supports delivery to any international port.' },
            { question: 'How do you ensure freshness during shipping?', answer: 'We use cold chain logistics with temperature-controlled containers, proper packaging with ventilation, and pre-cooling facilities. All produce undergoes quality checks before packing.' },
            { question: 'What is the minimum order quantity for produce?', answer: 'MOQ varies by product — typically one full container (20-40 ft) for international orders. For smaller quantities, we can arrange consolidated shipments. Contact us for specific requirements.' },
            { question: 'Can you provide customized packaging?', answer: 'Yes, we offer customized packaging solutions including private labeling, specific box sizes, and branding for supermarket and retail clients.' }
          ]} />
        </div>
      </section>
    </>
  );
}
