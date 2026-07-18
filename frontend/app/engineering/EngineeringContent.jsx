'use client';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import { FiCheckCircle, FiDollarSign, FiTruck, FiShield } from 'react-icons/fi';
import SectionHeader from '../components/sections/SectionHeader';
import ProductCard from '../components/cards/ProductCard';
import CTABanner from '../components/sections/CTABanner';
import TestimonialCarousel from '../components/sections/TestimonialCarousel';
import FAQSection from '../components/sections/FAQSection';

import { useState, useEffect } from 'react';

const industries = [
  { name: 'Automotive', emoji: '🚗', description: 'Engine components, chassis parts, and transmission systems.' },
  { name: 'Construction', emoji: '🏗️', description: 'Structural steel and reinforcement for infrastructure.' },
  { name: 'Manufacturing', emoji: '⚙️', description: 'CNC machining, forging, and precision manufacturing.' },
  { name: 'Oil & Gas', emoji: '🛢️', description: 'Pipelines, drilling equipment, and refinery infrastructure.' },
];

const faqs = [
  { question: 'What steel grades do you supply?', answer: 'We supply a wide range of grades including EN8, EN9, EN19, EN24, EN31, EN36 for alloy steel, and C45, C55, C60, C70 for carbon steel. Custom grades available on request.' },
  { question: 'What is the minimum order quantity?', answer: 'Our MOQ varies by product — typically 5 MT for standard grades. For custom specifications, please contact us for specific requirements.' },
  { question: 'Do you provide material test certificates?', answer: 'Yes, all shipments include Mill Test Certificates (MTC) conforming to EN 10204 3.1 standards.' },
  { question: 'Which countries do you export to?', answer: 'We export to 50+ countries including UAE, Saudi Arabia, Germany, USA, UK, Singapore, Australia, and many more. We handle all export documentation.' },
  { question: 'What are the payment terms?', answer: 'We offer flexible payment terms including L/C, T/T, and DA/DP. Specific terms are discussed based on order size and client relationship.' },
];

import dynamic from 'next/dynamic';

const ParticleGlobe = dynamic(() => import('../components/ParticleGlobe'), {
  ssr: false,
  loading: () => <div className="w-full h-full animate-pulse bg-white/5 rounded-full" />,
});

export default function EngineeringContent() {
  const [heroRef, heroInView] = useInView({ threshold: 0.05, triggerOnce: true });
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/products?division=Engineering`)
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(console.error);
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="relative py-16 sm:py-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/hero-bg.png" alt="Engineering materials" fill className="object-cover" quality={85} />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/95 via-primary/90 to-eng/20" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" ref={heroRef}>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={heroInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7 }} className="max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-eng/20 rounded-full px-4 py-1.5 mb-6">
                <span className="w-1.5 h-1.5 bg-eng rounded-full" />
                <span className="text-eng text-xs font-semibold tracking-wide">Engineering Division</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-[1.1] font-[family-name:var(--font-poppins)] mb-5">
                Premium <span className="text-gradient-eng">Engineering Materials</span> for Global Industry
              </h1>
              <p className="text-white/60 text-base sm:text-lg leading-relaxed mb-8">
                Bright Bars, Black Bars, Alloy & Carbon Steel — sourced from certified mills, delivered to international standards across 50+ countries.
              </p>
              <div className="flex flex-wrap gap-6 pt-6 border-t border-white/10">
                {[{ v: '50+', l: 'Countries' }, { v: '4', l: 'Product Lines' }, { v: '1000+', l: 'Clients' }].map((s, i) => (
                  <div key={i}><div className="text-2xl font-bold text-eng">{s.v}</div><div className="text-white/40 text-xs">{s.l}</div></div>
                ))}
              </div>
            </motion.div>
            
            <motion.div initial={{ opacity: 0, x: 30 }} animate={heroInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, delay: 0.2 }} className="hidden lg:block relative h-[500px]">
              <ParticleGlobe />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="py-20 sm:py-28 bg-surface">
        <div className="absolute top-0 left-0 right-0 h-1 gradient-eng" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="Our Products" title="Engineering Materials" description="A comprehensive range of engineering-grade steel products, sourced from certified mills and delivered to international standards." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((p, i) => <ProductCard key={p.name} {...p} index={i} />)}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="Industries Served" title="Powering Key Industries" description="Our materials fuel critical operations across diverse industry verticals worldwide." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {industries.map((ind, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.1 }}
                className="bg-surface rounded-2xl p-7 border border-surface-darker/40 group hover:shadow-xl hover:shadow-primary/5 transition-all duration-400 hover:-translate-y-2 text-center relative overflow-hidden"
              >
                <div className="absolute -right-3 -bottom-3 text-7xl opacity-[0.04] group-hover:opacity-[0.08] transition-opacity select-none">{ind.emoji}</div>
                <div className="text-4xl mb-4">{ind.emoji}</div>
                <h3 className="text-lg font-bold text-primary font-[family-name:var(--font-poppins)] mb-3">{ind.name}</h3>
                <p className="text-secondary text-sm leading-relaxed relative z-10">{ind.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 sm:py-28 gradient-primary relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeader label="Why Choose Us" title="The Engineering Advantage" description="Direct mill sourcing, quality certifications, and reliable global logistics." light />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: FiCheckCircle, title: 'Mill Test Certified', desc: 'Every shipment includes EN 10204 3.1 certificates.' },
              { icon: FiDollarSign, title: 'Competitive Pricing', desc: 'Direct procurement for best market prices.' },
              { icon: FiTruck, title: 'Global Logistics', desc: 'Delivery to any port worldwide with tracking.' },
              { icon: FiShield, title: 'Quality Assured', desc: 'Rigorous QC checks before every shipment.' },
            ].map((f, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.1 }}
                className="bg-white/[0.06] backdrop-blur-sm border border-white/[0.08] rounded-2xl p-7 group hover:bg-white/[0.12] transition-all hover:-translate-y-2"
              >
                <div className="w-14 h-14 rounded-xl gradient-eng flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-lg">
                  <f.icon className="text-white text-xl" />
                </div>
                <h3 className="text-base font-bold text-white mb-2">{f.title}</h3>
                <p className="text-white/50 text-sm">{f.desc}</p>
              </motion.div>
            ))}
          </div>
          <CTABanner title="Need engineering materials?" description="Get a competitive quote within 24 hours" className="mt-14" variant="dark" />
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 sm:py-28 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="Client Testimonials" title="Trusted by Manufacturers Worldwide" description="What our engineering clients say about our products and service." />
          <TestimonialCarousel division="engineering" light={false} />
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="FAQ" title="Frequently Asked Questions" description="Common questions about our engineering materials and export process." />
          <FAQSection faqs={faqs} />
        </div>
      </section>
    </>
  );
}
