'use client';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiCheckCircle, FiDollarSign, FiTruck, FiGlobe } from 'react-icons/fi';

const features = [
  { icon: FiCheckCircle, title: 'High Quality Materials', description: 'Every product sourced from ISO-certified mills and undergoes rigorous quality checks before shipment.', gradient: 'from-blue-500 to-blue-600' },
  { icon: FiDollarSign, title: 'Competitive Pricing', description: 'Direct mill procurement and efficient supply chain management enable the best market prices.', gradient: 'from-emerald-500 to-green-600' },
  { icon: FiTruck, title: 'Fast Delivery', description: 'Streamlined logistics network ensures timely delivery to any port worldwide with tracking.', gradient: 'from-orange-500 to-red-500' },
  { icon: FiGlobe, title: 'Global Export Network', description: 'Established trade relationships and documentation expertise for seamless transactions.', gradient: 'from-violet-500 to-indigo-600' },
];

export default function WhyChooseUs() {
  const [ref, inView] = useInView({ threshold: 0.05, triggerOnce: true });
  return (
    <section id="why-us" className="py-20 sm:py-28 gradient-primary relative overflow-hidden">
      <div className="absolute top-0 right-0 w-72 h-72 bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" ref={ref}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="text-center mb-14">
          <span className="text-accent font-semibold text-xs tracking-[0.2em] uppercase">Why Choose Us</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-3 mb-4 font-[Poppins]">The United Brothers Advantage</h2>
          <div className="section-divider mx-auto mb-5" />
          <p className="text-white/55 max-w-2xl mx-auto text-base">We go beyond supplying materials - we build lasting partnerships founded on trust, quality, and mutual growth.</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.45, delay: i * 0.1 }}
              className="bg-white/[0.06] backdrop-blur-sm border border-white/[0.08] rounded-2xl p-7 group hover:bg-white/[0.12] transition-all duration-400 hover:-translate-y-2"
            >
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${f.gradient} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-lg`}>
                <f.icon className="text-white text-xl" />
              </div>
              <h3 className="text-base font-bold text-white mb-2 font-[Poppins]">{f.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{f.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-14 bg-white/[0.06] backdrop-blur-sm border border-white/[0.08] rounded-2xl p-8 flex flex-col sm:flex-row items-center justify-between gap-5"
        >
          <div className="text-center sm:text-left">
            <h3 className="text-xl font-bold text-white font-[Poppins]">Ready to source premium materials?</h3>
            <p className="text-white/50 text-sm mt-1">Get a competitive quote within 24 hours</p>
          </div>
          <a href="#contact" onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}
            className="gradient-accent text-white px-8 py-3 rounded-xl text-sm font-semibold hover:shadow-lg hover:shadow-accent/25 transition-all hover:-translate-y-0.5 whitespace-nowrap shrink-0"
          >Request Quote</a>
        </motion.div>
      </div>
    </section>
  );
}
