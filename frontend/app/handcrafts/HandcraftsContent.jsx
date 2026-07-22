'use client';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import { FiArrowRight, FiCheckCircle, FiShield, FiTruck, FiHeart } from 'react-icons/fi';
import SectionHeader from '../components/sections/SectionHeader';
import CTABanner from '../components/sections/CTABanner';
import TestimonialCarousel from '../components/sections/TestimonialCarousel';
import FAQSection from '../components/sections/FAQSection';

import { useState, useEffect } from 'react';

export default function HandcraftsContent() {
  const [heroRef, heroInView] = useInView({ threshold: 0.05, triggerOnce: true });
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/products?division=Handcrafts`)
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(console.error);
  }, []);

  // Build categories dynamically from products
  const categoryColors = {
    'Diyas': { emoji: '🪔', color: 'bg-amber-50 border-amber-200 hover:bg-amber-100' },
    'Tea Light Holders': { emoji: '🕯️', color: 'bg-orange-50 border-orange-200 hover:bg-orange-100' },
    'Pooja Accessories': { emoji: '🙏', color: 'bg-yellow-50 border-yellow-200 hover:bg-yellow-100' },
    'Festival Decor': { emoji: '🎊', color: 'bg-red-50 border-red-200 hover:bg-red-100' },
    'Gift Sets': { emoji: '🎊', color: 'bg-red-50 border-red-200 hover:bg-red-100' },
    'Private Label': { emoji: '🏭', color: 'bg-stone-50 border-stone-200 hover:bg-stone-100' },
  };

  const categoryMap = {};
  products.forEach(p => {
    const cat = p.category || 'Other';
    if (!categoryMap[cat]) categoryMap[cat] = [];
    categoryMap[cat].push(p);
  });

  const categories = Object.keys(categoryMap).map(cat => ({
    name: cat,
    href: `/handcrafts?category=${encodeURIComponent(cat)}`,
    count: categoryMap[cat].length,
    emoji: categoryColors[cat]?.emoji || '📦',
    color: categoryColors[cat]?.color || 'bg-gray-50 border-gray-200 hover:bg-gray-100',
  }));

  return (
    <>
      {/* Hero */}
      <section className="relative py-16 sm:py-24 overflow-hidden bg-gradient-to-br from-primary via-primary to-craft-dark/30">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 20% 80%, rgba(217,119,6,0.3), transparent 50%), radial-gradient(circle at 80% 20%, rgba(245,158,11,0.2), transparent 50%)' }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" ref={heroRef}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-craft/20 rounded-full px-4 py-1.5 mb-6">
              <span className="w-1.5 h-1.5 bg-craft rounded-full" />
              <span className="text-craft text-xs font-semibold tracking-wide">Handcrafts Division</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-[1.1] font-[family-name:var(--font-poppins)] mb-5">
              Artisan <span className="text-gradient-craft">Handcrafted Products</span> from India
            </h1>
            <p className="text-white/60 text-base sm:text-lg leading-relaxed mb-6">
              Traditional Clay Diyas, Hand-Painted Decorative Diyas, Floating Diyas, Tea Light Holders, Pooja Accessories, Festival Decorations &amp; Gift Sets — crafted by skilled Indian artisans.
            </p>
            <div className="flex flex-wrap gap-3 mb-8">
              {['Artisan Crafted', 'Eco-Friendly Clay', 'Custom Branding'].map((badge, i) => (
                <span key={i} className="px-3 py-1.5 bg-white/10 rounded-full text-white text-xs font-semibold flex items-center gap-1.5">
                  <FiShield className="text-craft text-[10px]" /> {badge}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-6 pt-6 border-t border-white/10">
              {[{ v: '100+', l: 'Designs' }, { v: 'Eco', l: 'Friendly' }, { v: 'OEM', l: 'Available' }].map((s, i) => (
                <div key={i}><div className="text-2xl font-bold text-craft">{s.v}</div><div className="text-white/40 text-xs">{s.l}</div></div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {categories.map((cat, i) => (
              <Link key={i} href={cat.href} className={`flex items-center gap-4 p-5 rounded-2xl border transition-all duration-300 group ${cat.color}`}>
                <span className="text-3xl">{cat.emoji}</span>
                <div>
                  <h3 className="font-bold text-primary font-[family-name:var(--font-poppins)] text-sm">{cat.name}</h3>
                  <p className="text-sm text-secondary">{cat.count} products</p>
                </div>
                <FiArrowRight className="ml-auto text-secondary group-hover:translate-x-1 transition-transform" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* All Products Grid */}
      <section className="py-20 sm:py-28 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="Our Products" title="Handcrafted" titleHighlight="Indian Artistry" highlightClass="text-gradient-craft" description="Traditional craftsmanship meets modern design — every piece tells a story of India's rich heritage." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {products.map((item, i) => {
              const slug = item.slug || item.name.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-');
              return (
              <motion.div key={item.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.05 }}
                className="bg-white rounded-2xl p-6 border border-surface-darker/40 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group cursor-pointer"
                onClick={() => window.location.href = `/handcrafts/${slug}`}
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="text-4xl">{item.emoji}</span>
                  <span className="px-2 py-0.5 bg-craft/10 text-craft text-[10px] font-bold rounded-full">{item.category}</span>
                </div>
                <h3 className="text-base font-bold text-primary font-[family-name:var(--font-poppins)] mb-1 group-hover:text-craft transition-colors">{item.name}</h3>
                <p className="text-secondary text-xs leading-relaxed mb-3">{item.desc || item.description}</p>
                <div className="flex items-center gap-1.5 text-xs text-secondary-light">
                  <span className="w-1.5 h-1.5 bg-craft rounded-full" />
                  {item.specs?.[0] || 'Handcrafted Quality'}
                </div>
              </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 sm:py-28 bg-gradient-to-br from-primary via-primary to-craft-dark/20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeader label="Why Choose Us" title="The Handcrafts Advantage" description="Authentic Indian artistry — handcrafted with care, exported with precision." light />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: FiHeart, title: 'Artisan Crafted', desc: 'Handmade by skilled Indian artisans preserving traditional techniques.' },
              { icon: FiShield, title: 'Eco-Friendly', desc: 'Made from natural clay and eco-friendly materials — 100% sustainable.' },
              { icon: FiCheckCircle, title: 'Custom Branding', desc: 'Private label & OEM manufacturing with your brand packaging.' },
              { icon: FiTruck, title: 'Bulk Export', desc: 'Large volume export capability with secure, damage-proof packaging.' },
            ].map((f, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.1 }}
                className="bg-white/[0.06] backdrop-blur-sm border border-white/[0.08] rounded-2xl p-7 group hover:bg-white/[0.12] transition-all hover:-translate-y-2"
              >
                <div className="w-14 h-14 rounded-xl gradient-craft flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-lg">
                  <f.icon className="text-white text-xl" />
                </div>
                <h3 className="text-base font-bold text-white mb-2">{f.title}</h3>
                <p className="text-white/50 text-sm">{f.desc}</p>
              </motion.div>
            ))}
          </div>
          <CTABanner title="Looking for handcrafted products?" description="Get custom quotes for bulk orders, OEM manufacturing & private label packaging" className="mt-14" variant="dark" />
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="Client Testimonials" title="Trusted by Global Buyers" description="What our handcrafts clients say about our products and service." />
          <TestimonialCarousel division="handcrafts" light={false} />
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 sm:py-28 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="FAQ" title="Frequently Asked Questions" description="Common questions about our handcrafted products and export process." />
          <FAQSection faqs={[
            { question: 'What types of diyas do you manufacture?', answer: 'We manufacture Traditional Clay Diyas, Hand-Painted Decorative Diyas, Floating Diyas in various sizes and designs. Each piece is handcrafted by skilled artisans using natural clay and eco-friendly materials.' },
            { question: 'Do you offer private label / OEM manufacturing?', answer: 'Yes, we offer complete private label and OEM manufacturing services. We can produce products with your branding, custom designs, and packaging specifications. Minimum order quantities apply based on the product type.' },
            { question: 'What is the minimum order quantity for export?', answer: 'MOQ varies by product — typically 1,000 pieces for standard designs and 2,000–5,000 for custom/private label orders. We can also arrange mixed container shipments with multiple product types.' },
            { question: 'How do you ensure safe shipping of fragile clay products?', answer: 'We use specialized multi-layer packaging with individual wrapping, corrugated inserts, and foam cushioning. Our packaging has been tested for international shipping and ensures minimal breakage during transit.' },
            { question: 'Can you create custom designs for our brand?', answer: 'Absolutely! We work with talented artisans who can create custom designs based on your specifications. We provide samples for approval before bulk production. Lead time for custom designs is typically 3–4 weeks.' },
          ]} />
        </div>
      </section>
    </>
  );
}
