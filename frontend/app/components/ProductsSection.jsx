'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import { FiArrowRight } from 'react-icons/fi';
import InquiryModal from './InquiryModal';

const products = [
  { id: 1, name: 'Bright Bars', image: '/images/bright-bars.png', description: 'Precision-finished bright steel bars with superior surface quality for automotive and engineering applications.', specs: ['EN8, EN9, EN19, EN24', 'Diameter: 3mm – 200mm', 'Tolerance: h9, h10, h11'] },
  { id: 2, name: 'Black Bars', image: '/images/black-bars.png', description: 'Hot-rolled black steel bars with excellent structural integrity for construction and heavy engineering.', specs: ['MS, EN8, EN9', 'Diameter: 10mm – 300mm', 'As-rolled finish'] },
  { id: 3, name: 'Alloy Steel', image: '/images/alloy-steel.png', description: 'Premium alloy steel grades with enhanced properties for automotive, aerospace, and defense manufacturing.', specs: ['EN19, EN24, EN31, EN36', 'Custom compositions', 'Heat-treated options'] },
  { id: 4, name: 'Carbon Steel', image: '/images/carbon-steel.png', description: 'High-quality carbon steel in coils, sheets, and bars for general engineering and structural applications.', specs: ['C45, C55, C60, C70', 'Low / Medium / High carbon', 'Multiple form factors'] },
];

export default function ProductsSection() {
  const [ref, inView] = useInView({ threshold: 0.05, triggerOnce: true });
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState('');

  return (
    <>
      <section id="products" className="py-20 sm:py-28 bg-surface relative">
        <div className="absolute top-0 left-0 right-0 h-1 gradient-accent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="text-center mb-14">
            <span className="text-accent font-semibold text-xs tracking-[0.2em] uppercase">Our Products</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mt-3 mb-4 font-[Poppins]">Engineering Materials</h2>
            <div className="section-divider mx-auto mb-5" />
            <p className="text-secondary max-w-2xl mx-auto text-base">A comprehensive range of engineering-grade steel products, sourced from certified mills and delivered to international standards.</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((p, i) => (
              <motion.div key={p.id} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.45, delay: i * 0.1 }}
                className="product-card bg-white rounded-2xl overflow-hidden border border-surface-darker/40 group cursor-pointer flex flex-col"
                onClick={() => { setSelectedProduct(p.name); setModalOpen(true); }}
              >
                <div className="relative h-48 overflow-hidden shrink-0">
                  <Image src={p.image} alt={p.name} fill sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 25vw" className="object-cover product-image transition-transform duration-700" />
                  <div className="product-overlay absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-0 transition-opacity duration-400 flex items-end justify-center pb-4">
                    <span className="text-white text-sm font-semibold flex items-center gap-1">Inquire Now <FiArrowRight className="text-xs" /></span>
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="text-lg font-bold text-primary font-[Poppins] mb-2 group-hover:text-accent transition-colors">{p.name}</h3>
                  <p className="text-secondary text-sm leading-relaxed mb-4 flex-1">{p.description}</p>
                  <div className="space-y-1.5">
                    {p.specs.map((spec, j) => (
                      <div key={j} className="flex items-center gap-2 text-xs text-secondary-light">
                        <span className="w-1 h-1 bg-accent rounded-full shrink-0" />{spec}
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t border-surface-darker/50">
                    <button className="text-accent text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">Get Quote <FiArrowRight className="text-xs" /></button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <InquiryModal isOpen={modalOpen} onClose={() => setModalOpen(false)} productName={selectedProduct} />
    </>
  );
}
