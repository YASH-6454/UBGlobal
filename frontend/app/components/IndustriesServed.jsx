'use client';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiTruck, FiHome, FiSettings, FiDroplet } from 'react-icons/fi';

const industries = [
  { icon: FiTruck, name: 'Automotive', description: 'Precision-grade steel for engine components, chassis parts, and transmission systems.', emoji: '🚗' },
  { icon: FiHome, name: 'Construction', description: 'Structural steel and reinforcement materials for commercial and infrastructure projects.', emoji: '🏗️' },
  { icon: FiSettings, name: 'Manufacturing', description: 'Raw materials for CNC machining, forging, and precision manufacturing operations.', emoji: '⚙️' },
  { icon: FiDroplet, name: 'Oil & Gas', description: 'High-performance alloy steel for pipelines, drilling equipment, and refinery infrastructure.', emoji: '🛢️' },
];

export default function IndustriesServed() {
  const [ref, inView] = useInView({ threshold: 0.05, triggerOnce: true });
  return (
    <section id="industries" className="py-20 sm:py-28 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="text-center mb-14">
          <span className="text-accent font-semibold text-xs tracking-[0.2em] uppercase">Industries Served</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mt-3 mb-4 font-[Poppins]">Powering Key Industries</h2>
          <div className="section-divider mx-auto mb-5" />
          <p className="text-secondary max-w-2xl mx-auto text-base">Our materials fuel critical operations across diverse industry verticals worldwide.</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {industries.map((ind, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.45, delay: i * 0.1 }}
              className="bg-white rounded-2xl p-7 border border-surface-darker/40 group hover:shadow-xl hover:shadow-primary/5 transition-all duration-400 hover:-translate-y-2 text-center relative overflow-hidden"
            >
              <div className="absolute -right-3 -bottom-3 text-7xl opacity-[0.04] group-hover:opacity-[0.08] transition-opacity select-none">{ind.emoji}</div>
              <div className="w-16 h-16 mx-auto bg-primary/5 rounded-xl flex items-center justify-center mb-5 group-hover:bg-accent/10 transition-colors">
                <ind.icon className="text-primary text-2xl group-hover:text-accent transition-colors" />
              </div>
              <h3 className="text-lg font-bold text-primary font-[Poppins] mb-3">{ind.name}</h3>
              <p className="text-secondary text-sm leading-relaxed relative z-10">{ind.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
