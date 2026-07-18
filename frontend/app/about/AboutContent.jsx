'use client';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiGlobe, FiAward, FiUsers, FiShield, FiTarget, FiHeart } from 'react-icons/fi';
import { GiSteelClaws, GiWheat, GiProcessor } from 'react-icons/gi';
import SectionHeader from '../components/sections/SectionHeader';
import StatCounter from '../components/sections/StatCounter';
import CTABanner from '../components/sections/CTABanner';

const timeline = [
  { year: '2009', title: 'Founded', description: 'United Brothers Global established in Mumbai as an engineering materials trading firm.' },
  { year: '2013', title: 'Global Expansion', description: 'Expanded exports to 20+ countries across Middle East, Europe, and Asia-Pacific.' },
  { year: '2018', title: 'Agriculture Division', description: 'Launched Fruits & Vegetables export division with APEDA and FSSAI certifications.' },
  { year: '2021', title: 'IT Services', description: 'Started IT Services division offering web development, ERP, and cloud solutions.' },
  { year: '2024', title: '50+ Countries', description: 'Reached 50+ country export network with 1000+ satisfied clients worldwide.' },
  { year: '2025', title: 'Handcrafts Division', description: 'Launched Handcrafts division — Traditional Clay Diyas, Decorative Items, Pooja Accessories & OEM manufacturing.' },
  { year: '2026', title: 'Digital Transformation', description: 'Modernized operations and expanded IT consultancy services globally.' },
];

const values = [
  { icon: FiShield, title: 'Quality First', description: 'Every product and service undergoes rigorous quality checks before delivery.' },
  { icon: FiTarget, title: 'Client Focus', description: 'We tailor solutions to each client\'s unique requirements and specifications.' },
  { icon: FiGlobe, title: 'Global Reach', description: 'Our network spans 50+ countries, ensuring reliable delivery worldwide.' },
  { icon: FiHeart, title: 'Trust & Integrity', description: 'Built on transparent business practices and long-term partnerships.' },
];

export default function AboutContent() {
  const [ref, inView] = useInView({ threshold: 0.05, triggerOnce: true });
  const [ref2, inView2] = useInView({ threshold: 0.05, triggerOnce: true });

  return (
    <>
      {/* Hero */}
      <section className="py-12 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6 }}>
              <span className="text-eng font-semibold text-xs tracking-[0.2em] uppercase">About Us</span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mt-3 mb-5 font-[family-name:var(--font-poppins)] leading-tight">
                Your Trusted Partner in <span className="text-gradient-eng">Global Trade</span>
              </h1>
              <div className="section-divider mb-6" />
              <p className="text-secondary text-base leading-relaxed mb-4">
                United Brothers Global is a diversified trading and services company headquartered in Mumbai, India. With over 15 years of industry experience, we have established ourselves across three key verticals — Engineering Materials, Fruits & Vegetables, and IT Services.
              </p>
              <p className="text-secondary text-sm leading-relaxed mb-8">
                Our commitment to quality, competitive pricing, and timely delivery has earned us the trust of over 1000 clients in 50+ countries. We hold APEDA and FSSAI certifications for our agricultural exports, ensuring the highest standards of quality and compliance.
              </p>
              <div className="flex flex-wrap gap-3">
                {[
                  { icon: GiSteelClaws, text: 'Engineering Materials', color: 'text-eng' },
                  { icon: GiWheat, text: 'Agriculture Export', color: 'text-agri' },
                  { icon: GiProcessor, text: 'IT Services', color: 'text-it' },
                ].map((b, i) => (
                  <div key={i} className="flex items-center gap-2 bg-surface px-4 py-2 rounded-lg border border-surface-darker/50">
                    <b.icon className={`${b.color} text-sm`} /><span className="text-xs font-medium text-primary">{b.text}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.15 }} className="grid grid-cols-2 gap-5">
              {[
                { icon: FiAward, value: '15', suffix: '+', label: 'Years of Excellence', desc: 'Since 2009' },
                { icon: FiGlobe, value: '50', suffix: '+', label: 'Countries Reached', desc: 'Global network' },
                { icon: FiUsers, value: '1000', suffix: '+', label: 'Happy Clients', desc: 'Trusted partnerships' },
                { icon: FiShield, value: '100', suffix: '%', label: 'Quality Assured', desc: 'Certified processes' },
              ].map((stat, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
                  className="counter-card bg-surface rounded-2xl p-6 text-center border border-surface-darker/40 group hover:bg-primary hover:border-primary"
                >
                  <div className="w-12 h-12 mx-auto bg-eng/10 rounded-xl flex items-center justify-center mb-3 group-hover:bg-eng/20 transition-colors">
                    <stat.icon className="text-eng text-xl" />
                  </div>
                  <StatCounter target={stat.value} suffix={stat.suffix} />
                  <div className="text-primary font-semibold mt-2 group-hover:text-white transition-colors text-sm">{stat.label}</div>
                  <div className="text-secondary-light text-xs mt-0.5 group-hover:text-white/50 transition-colors">{stat.desc}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 sm:py-28 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="Our Values" title="What Drives Us" description="The core principles that guide every decision and partnership at United Brothers Global." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.1 }}
                className="bg-white rounded-2xl p-7 border border-surface-darker/40 group hover:shadow-xl hover:shadow-primary/5 transition-all duration-400 hover:-translate-y-2 text-center"
              >
                <div className="w-16 h-16 mx-auto bg-primary/5 rounded-xl flex items-center justify-center mb-5 group-hover:bg-eng/10 transition-colors">
                  <v.icon className="text-primary text-2xl group-hover:text-eng transition-colors" />
                </div>
                <h3 className="text-lg font-bold text-primary font-[family-name:var(--font-poppins)] mb-3">{v.title}</h3>
                <p className="text-secondary text-sm leading-relaxed">{v.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 sm:py-28 bg-white" ref={ref2}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="Our Journey" title="Growing Through the Years" description="Key milestones in our path from a Mumbai-based trading firm to a diversified global enterprise." />
          <div className="max-w-3xl mx-auto">
            {timeline.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }} animate={inView2 ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex gap-6 mb-8 last:mb-0"
              >
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full gradient-eng flex items-center justify-center text-white font-bold text-xs shrink-0">
                    {item.year}
                  </div>
                  {i < timeline.length - 1 && <div className="w-0.5 flex-1 bg-surface-darker mt-2" />}
                </div>
                <div className="pb-8">
                  <h3 className="text-base font-bold text-primary font-[family-name:var(--font-poppins)] mb-1">{item.title}</h3>
                  <p className="text-secondary text-sm leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <CTABanner title="Ready to work with us?" description="Explore our divisions or get in touch for a personalized quote" buttonText="Contact Us" buttonHref="/contact" variant="light" />
        </div>
      </section>
    </>
  );
}
