'use client';
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  FiGlobe, FiAward, FiUsers, FiShield, FiTarget, FiHeart,
  FiArrowRight, FiChevronRight, FiMapPin, FiTrendingUp, FiCheckCircle, FiStar
} from 'react-icons/fi';
import { GiSteelClaws, GiWheat, GiProcessor, GiFlame } from 'react-icons/gi';
import SectionHeader from '../components/sections/SectionHeader';
import StatCounter from '../components/sections/StatCounter';
import CTABanner from '../components/sections/CTABanner';

/* ─── Data ─── */
const timeline = [
  { year: '2009', title: 'Founded', description: 'United Brothers Global established in Mumbai as an engineering materials trading firm.', icon: FiStar },
  { year: '2013', title: 'Global Expansion', description: 'Expanded exports to 20+ countries across Middle East, Europe, and Asia-Pacific.', icon: FiGlobe },
  { year: '2018', title: 'Agriculture Division', description: 'Launched Fruits & Vegetables export division with APEDA and FSSAI certifications.', icon: FiTrendingUp },
  { year: '2021', title: 'IT Services', description: 'Started IT Services division offering web development, ERP, and cloud solutions.', icon: FiCheckCircle },
  { year: '2024', title: '50+ Countries', description: 'Reached 50+ country export network with 1000+ satisfied clients worldwide.', icon: FiMapPin },
  { year: '2025', title: 'Handcrafts Division', description: 'Launched Handcrafts division — Traditional Clay Diyas, Decorative Items, Pooja Accessories & OEM manufacturing.', icon: GiFlame },
  { year: '2026', title: 'Digital Transformation', description: 'Modernized operations and expanded IT consultancy services globally.', icon: FiArrowRight },
];

const values = [
  { icon: FiShield, title: 'Quality First', description: 'Every product and service undergoes rigorous quality checks before delivery.', gradient: 'from-blue-500 to-indigo-600' },
  { icon: FiTarget, title: 'Client Focus', description: 'We tailor solutions to each client\'s unique requirements and specifications.', gradient: 'from-eng to-eng-dark' },
  { icon: FiGlobe, title: 'Global Reach', description: 'Our network spans 50+ countries, ensuring reliable delivery worldwide.', gradient: 'from-emerald-500 to-green-600' },
  { icon: FiHeart, title: 'Trust & Integrity', description: 'Built on transparent business practices and long-term partnerships.', gradient: 'from-violet-500 to-purple-600' },
];

const divisions = [
  { name: 'Engineering Materials', icon: GiSteelClaws, color: 'eng', href: '/engineering', description: 'Premium steel products exported to 50+ countries — Bright Bars, Black Bars, Alloy & Carbon Steel.' },
  { name: 'Fruits & Vegetables', icon: GiWheat, color: 'agri', href: '/agriculture', description: 'APEDA & FSSAI certified export of fresh Alphonso Mangoes, Onions, Pomegranates & more.' },
  { name: 'IT Services', icon: GiProcessor, color: 'it', href: '/it-services', description: 'Web Development, ERP Solutions, Cloud Services, and IT Consultancy for global businesses.' },
  { name: 'Handcrafts', icon: GiFlame, color: 'craft', href: '/handcrafts', description: 'Traditional Clay Diyas, Hand-Painted Decorative Diyas, Tea Light Holders & Pooja Accessories.' },
];

const stats = [
  { icon: FiAward, value: '15', suffix: '+', label: 'Years of Excellence', desc: 'Since 2009' },
  { icon: FiGlobe, value: '50', suffix: '+', label: 'Countries Reached', desc: 'Global network' },
  { icon: FiUsers, value: '1000', suffix: '+', label: 'Happy Clients', desc: 'Trusted partnerships' },
  { icon: FiShield, value: '100', suffix: '%', label: 'Quality Assured', desc: 'Certified processes' },
];

/* ─── Floating Particle ─── */
function FloatingParticle({ delay, size, x, y, duration }) {
  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        width: size,
        height: size,
        left: `${x}%`,
        top: `${y}%`,
        background: `radial-gradient(circle, rgba(249,115,22,0.3), transparent)`,
      }}
      animate={{
        y: [-20, 20, -20],
        x: [-10, 10, -10],
        opacity: [0.2, 0.5, 0.2],
        scale: [0.8, 1.2, 0.8],
      }}
      transition={{
        duration: duration || 6,
        repeat: Infinity,
        delay: delay || 0,
        ease: 'easeInOut',
      }}
    />
  );
}

/* ─── Hero Section ─── */
function HeroSection() {
  const [ref, inView] = useInView({ threshold: 0.05, triggerOnce: true });

  return (
    <section className="relative py-20 sm:py-28 lg:py-36 overflow-hidden gradient-primary" ref={ref}>
      {/* Ambient background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-eng/[0.06] blur-[100px]" />
        <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] rounded-full bg-it/[0.04] blur-[80px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-eng/[0.03] blur-[120px]" />
        <FloatingParticle delay={0} size={6} x={10} y={20} duration={7} />
        <FloatingParticle delay={1} size={4} x={80} y={15} duration={5} />
        <FloatingParticle delay={2} size={8} x={60} y={70} duration={8} />
        <FloatingParticle delay={0.5} size={5} x={25} y={80} duration={6} />
        <FloatingParticle delay={1.5} size={3} x={90} y={50} duration={9} />
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 bg-white/[0.06] backdrop-blur-sm border border-white/[0.08] px-4 py-2 rounded-full mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-eng animate-pulse" />
              <span className="text-white/70 text-xs font-medium tracking-wide uppercase">About United Brothers Global</span>
            </motion.div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mt-2 mb-6 font-[family-name:var(--font-poppins)] leading-[1.1]">
              Your Trusted{' '}
              <span className="relative inline-block">
                <span className="text-gradient-eng">Partner</span>
                <motion.span
                  className="absolute -bottom-1 left-0 h-[3px] bg-gradient-to-r from-eng to-eng-light rounded-full"
                  initial={{ width: 0 }}
                  animate={inView ? { width: '100%' } : {}}
                  transition={{ duration: 0.8, delay: 0.6 }}
                />
              </span>{' '}
              in Global Trade
            </h1>

            <p className="text-white/55 text-base sm:text-lg leading-relaxed mb-8 max-w-xl">
              A diversified trading and services company headquartered in Mumbai, India.
              With over 15 years of industry experience, we've built trust across
              Engineering Materials, Agriculture Exports, Handcrafts & IT Services — serving 50+ countries worldwide.
            </p>

            <div className="flex flex-wrap gap-3 mb-8">
              {[
                { icon: GiSteelClaws, text: 'Engineering', color: 'eng' },
                { icon: GiWheat, text: 'Agriculture', color: 'agri' },
                { icon: GiFlame, text: 'Handcrafts', color: 'craft' },
                { icon: GiProcessor, text: 'IT Services', color: 'it' },
              ].map((b, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.4 + i * 0.08 }}
                  className="flex items-center gap-2 bg-white/[0.06] backdrop-blur-sm border border-white/[0.08] px-4 py-2.5 rounded-xl hover:bg-white/[0.1] transition-all cursor-default group"
                >
                  <b.icon className={`text-${b.color} text-sm group-hover:scale-110 transition-transform`} />
                  <span className="text-xs font-medium text-white/80">{b.text}</span>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <Link href="/contact" className="gradient-eng text-white px-7 py-3.5 rounded-xl text-sm font-semibold hover:shadow-lg hover:shadow-eng/25 transition-all hover:-translate-y-0.5 flex items-center gap-2 group">
                Get in Touch
                <FiArrowRight className="text-sm group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/engineering" className="bg-white/[0.06] backdrop-blur-sm border border-white/[0.1] text-white px-7 py-3.5 rounded-xl text-sm font-semibold hover:bg-white/[0.12] transition-all hover:-translate-y-0.5">
                Explore Divisions
              </Link>
            </div>
          </motion.div>

          {/* Right — Stats grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="grid grid-cols-2 gap-4 sm:gap-5"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                className="glass-card-dark rounded-2xl p-6 sm:p-7 text-center group hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-12 h-12 mx-auto bg-eng/15 rounded-xl flex items-center justify-center mb-4 group-hover:bg-eng/25 group-hover:scale-110 transition-all duration-300">
                  <stat.icon className="text-eng text-xl" />
                </div>
                <StatCounter target={stat.value} suffix={stat.suffix} className="!text-white" />
                <div className="text-white font-semibold mt-2 text-sm">{stat.label}</div>
                <div className="text-white/35 text-xs mt-0.5">{stat.desc}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─── Story Section ─── */
function StorySection() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section className="py-20 sm:py-28 bg-white overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          {/* Left — Visual element */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="relative bg-surface rounded-3xl p-8 sm:p-10 border border-surface-darker/40 overflow-hidden">
              {/* Decorative gradient blobs */}
              <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-eng/[0.08] blur-[60px]" />
              <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-agri/[0.06] blur-[60px]" />

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 gradient-eng rounded-xl flex items-center justify-center">
                    <FiMapPin className="text-white text-lg" />
                  </div>
                  <div>
                    <div className="text-primary font-bold text-base font-[family-name:var(--font-poppins)]">Mumbai, India</div>
                    <div className="text-secondary text-xs">Global Headquarters</div>
                  </div>
                </div>

                <div className="space-y-4">
                  {[
                    { label: 'APEDA Certified', sublabel: 'Agriculture Export', color: 'agri' },
                    { label: 'FSSAI Certified', sublabel: 'Food Safety Compliance', color: 'agri' },
                    { label: 'ISO Standards', sublabel: 'Quality Management', color: 'eng' },
                    { label: 'BIS Certified', sublabel: 'Engineering Materials', color: 'eng' },
                  ].map((cert, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -16 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                      className="flex items-center gap-3 bg-white rounded-xl p-3.5 border border-surface-darker/30 group hover:shadow-md transition-all"
                    >
                      <div className={`w-9 h-9 rounded-lg bg-${cert.color}/10 flex items-center justify-center shrink-0`}>
                        <FiCheckCircle className={`text-${cert.color} text-base`} />
                      </div>
                      <div>
                        <div className="text-primary font-semibold text-sm">{cert.label}</div>
                        <div className="text-secondary text-xs">{cert.sublabel}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating stat card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="absolute -bottom-6 -right-4 sm:-right-6 bg-white rounded-2xl p-5 shadow-xl shadow-primary/10 border border-surface-darker/30"
            >
              <div className="text-3xl font-bold text-eng font-[family-name:var(--font-poppins)]">15+</div>
              <div className="text-primary font-semibold text-sm">Years Strong</div>
              <div className="text-secondary-light text-xs">& growing</div>
            </motion.div>
          </motion.div>

          {/* Right — Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <span className="text-eng font-semibold text-xs tracking-[0.2em] uppercase">Our Story</span>
            <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-primary mt-3 mb-5 font-[family-name:var(--font-poppins)] leading-tight">
              Building Bridges Across{' '}
              <span className="text-gradient-eng">Continents</span>
            </h2>
            <div className="section-divider mb-6" />

            <p className="text-secondary text-base leading-relaxed mb-4">
              Founded in 2009, United Brothers Global began as a small engineering materials trading firm in Mumbai.
              What started with a vision to deliver world-class steel products to international markets has evolved into
              a diversified global enterprise spanning four verticals.
            </p>
            <p className="text-secondary text-sm leading-relaxed mb-6">
              Our commitment to quality, competitive pricing, and timely delivery has earned us the trust of over
              1000 clients in 50+ countries. We hold APEDA and FSSAI certifications for our agricultural exports,
              ensuring the highest standards of quality and compliance. Today, our portfolio includes
              Engineering Materials, Fresh Fruits & Vegetables, Handcrafted Products, and IT Services.
            </p>

            <div className="grid grid-cols-3 gap-4 mb-8">
              {[
                { value: '50+', label: 'Countries' },
                { value: '1000+', label: 'Clients' },
                { value: '4', label: 'Divisions' },
              ].map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
                  className="text-center bg-surface rounded-xl p-4 border border-surface-darker/30"
                >
                  <div className="text-2xl font-bold text-eng font-[family-name:var(--font-poppins)]">{s.value}</div>
                  <div className="text-secondary text-xs font-medium mt-0.5">{s.label}</div>
                </motion.div>
              ))}
            </div>

            <Link href="/contact" className="inline-flex items-center gap-2 text-eng font-semibold text-sm hover:gap-3 transition-all group">
              Learn More About Our Journey
              <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─── Divisions Showcase ─── */
function DivisionsSection() {
  return (
    <section className="py-20 sm:py-28 bg-surface overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="Our Divisions"
          title="What We"
          titleHighlight="Do"
          description="Four specialized verticals delivering excellence across engineering, agriculture, handcrafts, and technology."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {divisions.map((div, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link href={div.href} className={`block division-card ${div.color} bg-white rounded-2xl p-7 border border-surface-darker/40 group hover:shadow-xl hover:shadow-primary/5 h-full`}>
                <div className="relative z-10">
                  <div className={`w-14 h-14 bg-${div.color}/10 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                    <div.icon className={`text-${div.color} text-2xl`} />
                  </div>
                  <h3 className="text-lg font-bold text-primary font-[family-name:var(--font-poppins)] mb-2 group-hover:text-primary transition-colors">
                    {div.name}
                  </h3>
                  <p className="text-secondary text-sm leading-relaxed mb-4">{div.description}</p>
                  <span className={`inline-flex items-center gap-1.5 text-${div.color} text-xs font-semibold group-hover:gap-2.5 transition-all`}>
                    Explore
                    <FiChevronRight className="text-xs group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Values Section ─── */
function ValuesSection() {
  return (
    <section className="py-20 sm:py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="Our Values"
          title="What Drives"
          titleHighlight="Us"
          description="The core principles that guide every decision and partnership at United Brothers Global."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative bg-surface rounded-2xl p-7 border border-surface-darker/40 group hover:shadow-xl hover:shadow-primary/5 transition-all duration-400 hover:-translate-y-2 text-center overflow-hidden"
            >
              {/* Hover gradient overlay */}
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${v.gradient} rounded-2xl`} />

              <div className="relative z-10">
                <div className="w-16 h-16 mx-auto bg-primary/5 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-white/20 transition-all duration-300 group-hover:scale-110">
                  <v.icon className="text-primary text-2xl group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-lg font-bold text-primary font-[family-name:var(--font-poppins)] mb-3 group-hover:text-white transition-colors duration-300">
                  {v.title}
                </h3>
                <p className="text-secondary text-sm leading-relaxed group-hover:text-white/80 transition-colors duration-300">
                  {v.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Timeline Section ─── */
function TimelineSection() {
  const [ref, inView] = useInView({ threshold: 0.05, triggerOnce: true });
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <section className="py-20 sm:py-28 overflow-hidden gradient-primary relative" ref={ref}>
      {/* Ambient background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[400px] h-[400px] rounded-full bg-eng/[0.06] blur-[100px]" />
        <div className="absolute -bottom-40 -left-40 w-[300px] h-[300px] rounded-full bg-it/[0.04] blur-[80px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          label="Our Journey"
          title="Growing Through the"
          titleHighlight="Years"
          highlightClass="text-gradient-eng"
          description="Key milestones in our path from a Mumbai-based trading firm to a diversified global enterprise."
          light
        />

        <div className="max-w-4xl mx-auto">
          {timeline.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="flex gap-5 sm:gap-8 group"
              onMouseEnter={() => setActiveIndex(i)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              {/* Timeline line + dot */}
              <div className="flex flex-col items-center">
                <motion.div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 border-2 transition-all duration-300 ${
                    activeIndex === i
                      ? 'gradient-eng border-eng shadow-lg shadow-eng/30 scale-105'
                      : 'bg-white/[0.06] border-white/[0.1]'
                  }`}
                  whileHover={{ scale: 1.1 }}
                >
                  <item.icon className={`text-lg transition-colors ${activeIndex === i ? 'text-white' : 'text-eng'}`} />
                </motion.div>
                {i < timeline.length - 1 && (
                  <div className="w-[2px] flex-1 mt-2 bg-gradient-to-b from-white/20 to-transparent min-h-[40px]" />
                )}
              </div>

              {/* Content */}
              <div className={`pb-10 transition-all duration-300 ${activeIndex === i ? 'translate-x-1' : ''}`}>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-eng font-bold text-xs tracking-wide bg-eng/15 px-3 py-1 rounded-full">{item.year}</span>
                </div>
                <h3 className={`text-lg font-bold font-[family-name:var(--font-poppins)] mb-1.5 transition-colors duration-300 ${
                  activeIndex === i ? 'text-white' : 'text-white/90'
                }`}>
                  {item.title}
                </h3>
                <p className={`text-sm leading-relaxed transition-colors duration-300 ${
                  activeIndex === i ? 'text-white/65' : 'text-white/40'
                }`}>
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Why Choose Us Section ─── */
function WhyChooseSection() {
  const reasons = [
    { icon: FiAward, title: '15+ Years Experience', description: 'Deep industry expertise across engineering, agriculture, handcrafts, and technology sectors.' },
    { icon: FiGlobe, title: 'Global Network', description: 'Export network spanning 50+ countries with established logistics and trade partnerships.' },
    { icon: FiCheckCircle, title: 'Certified Quality', description: 'APEDA, FSSAI, and BIS certified operations ensuring highest standards of quality.' },
    { icon: FiUsers, title: 'Client-Centric Approach', description: 'Dedicated account management and customized solutions for every client requirement.' },
    { icon: FiTrendingUp, title: 'Competitive Pricing', description: 'Direct sourcing and efficient supply chain for the best market prices.' },
    { icon: FiShield, title: 'Reliable Delivery', description: 'On-time delivery with end-to-end tracking and comprehensive insurance coverage.' },
  ];

  return (
    <section className="py-20 sm:py-28 bg-surface overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="Why Choose Us"
          title="The United Brothers"
          titleHighlight="Advantage"
          description="What sets us apart as your trusted global trade partner."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="bg-white rounded-2xl p-6 border border-surface-darker/30 group hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1 flex gap-4"
            >
              <div className="w-12 h-12 gradient-eng rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-sm shadow-eng/20">
                <r.icon className="text-white text-lg" />
              </div>
              <div>
                <h3 className="text-base font-bold text-primary font-[family-name:var(--font-poppins)] mb-1.5">{r.title}</h3>
                <p className="text-secondary text-sm leading-relaxed">{r.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── CTA Section ─── */
function CTASection() {
  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="gradient-primary rounded-3xl p-10 sm:p-14 text-center relative overflow-hidden"
        >
          {/* Decorative elements */}
          <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-eng/[0.1] blur-[80px]" />
          <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-it/[0.06] blur-[60px]" />

          <div className="relative z-10">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-eng font-semibold text-xs tracking-[0.2em] uppercase"
            >
              Start Today
            </motion.span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-3 mb-5 font-[family-name:var(--font-poppins)] leading-tight">
              Ready to Partner with Us?
            </h2>
            <p className="text-white/50 text-base max-w-2xl mx-auto mb-8">
              Whether you need engineering materials, fresh agricultural products, handcrafted items, or IT solutions —
              we're here to deliver excellence to your doorstep.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="gradient-eng text-white px-8 py-4 rounded-xl text-sm font-semibold hover:shadow-lg hover:shadow-eng/30 transition-all hover:-translate-y-0.5 flex items-center gap-2 group">
                Get a Free Quote
                <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/engineering" className="bg-white/[0.08] backdrop-blur-sm border border-white/[0.12] text-white px-8 py-4 rounded-xl text-sm font-semibold hover:bg-white/[0.15] transition-all hover:-translate-y-0.5">
                Explore Products
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Main Component ─── */
export default function AboutContent() {
  return (
    <>
      <HeroSection />
      <StorySection />
      <DivisionsSection />
      <ValuesSection />
      <TimelineSection />
      <WhyChooseSection />
      <CTASection />
    </>
  );
}
