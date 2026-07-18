'use client';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect, useState } from 'react';
import { FiGlobe, FiAward, FiUsers, FiShield } from 'react-icons/fi';

function AnimatedCounter({ target, suffix = '' }) {
  const [count, setCount] = useState(0);
  const [ref, inView] = useInView({ threshold: 0.5, triggerOnce: true });
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const end = parseInt(target);
    const step = end / (2000 / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setCount(end); clearInterval(timer); } else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);
  return <span ref={ref} className="text-3xl sm:text-4xl font-bold text-accent font-[Poppins]">{count}{suffix}</span>;
}

const stats = [
  { icon: FiAward, value: '15', suffix: '+', label: 'Years of Excellence', desc: 'Delivering quality since 2009' },
  { icon: FiGlobe, value: '50', suffix: '+', label: 'Countries Reached', desc: 'Global export network' },
  { icon: FiUsers, value: '1000', suffix: '+', label: 'Happy Clients', desc: 'Trusted partnerships' },
  { icon: FiShield, value: '100', suffix: '%', label: 'Quality Assured', desc: 'ISO certified processes' },
];

export default function AboutSection() {
  const [ref, inView] = useInView({ threshold: 0.05, triggerOnce: true });
  return (
    <section id="about" className="py-20 sm:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6 }}>
            <span className="text-accent font-semibold text-xs tracking-[0.2em] uppercase">About Us</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mt-3 mb-5 font-[Poppins] leading-tight">
              Your Trusted Partner in <span className="text-gradient-accent">Engineering Materials</span>
            </h2>
            <div className="section-divider mb-6" />
            <p className="text-secondary text-base leading-relaxed mb-4">
              United Brothers Global is a premier import-export company specializing in high-quality engineering materials. With over 15 years of industry experience, we have established ourselves as a reliable supplier of Bright Bars, Black Bars, Alloy Steel, and Carbon Steel to manufacturers across the globe.
            </p>
            <p className="text-secondary text-sm leading-relaxed mb-8">
              Our commitment to quality, competitive pricing, and timely delivery has earned us the trust of over 1000 clients in 50+ countries.
            </p>
            <div className="flex flex-wrap gap-3">
              {[{ icon: FiShield, text: 'ISO 9001 Certified' }, { icon: FiAward, text: 'Premium Quality' }, { icon: FiGlobe, text: 'Global Reach' }].map((b, i) => (
                <div key={i} className="flex items-center gap-2 bg-surface px-4 py-2 rounded-lg border border-surface-darker/50">
                  <b.icon className="text-accent text-sm" /><span className="text-xs font-medium text-primary">{b.text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.15 }} className="grid grid-cols-2 gap-5">
            {stats.map((stat, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
                className="counter-card bg-surface rounded-2xl p-6 text-center border border-surface-darker/40 group hover:bg-primary hover:border-primary"
              >
                <div className="w-12 h-12 mx-auto bg-accent/10 rounded-xl flex items-center justify-center mb-3 group-hover:bg-accent/20 transition-colors">
                  <stat.icon className="text-accent text-xl" />
                </div>
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                <div className="text-primary font-semibold mt-2 group-hover:text-white transition-colors text-sm">{stat.label}</div>
                <div className="text-secondary-light text-xs mt-0.5 group-hover:text-white/50 transition-colors">{stat.desc}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
