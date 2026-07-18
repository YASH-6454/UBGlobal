'use client';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import dynamic from 'next/dynamic';

// Dynamic import to avoid SSR issues with Three.js
const ParticleGlobe = dynamic(() => import('./ParticleGlobe'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-12 h-12 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
    </div>
  ),
});

export default function HeroSection() {
  const [ref, inView] = useInView({ threshold: 0.05, triggerOnce: true });

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <Image src="/images/hero-bg.png" alt="Industrial steel warehouse" fill className="object-cover" priority quality={90} />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/95 via-primary/88 to-primary-light/90" />
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '80px 80px' }} />

      {/* Sparks */}
      {[
        { l: 25, t: 62 }, { l: 45, t: 58 }, { l: 68, t: 72 }, { l: 35, t: 80 },
        { l: 55, t: 65 }, { l: 78, t: 55 }, { l: 40, t: 85 }, { l: 60, t: 70 },
      ].map((pos, i) => (
        <div key={i} className="spark" style={{ left: `${pos.l}%`, top: `${pos.t}%`, animationDelay: `${i * 0.6}s`, width: '3px', height: '3px' }} />
      ))}

      {/* Content — Two Column Layout */}
      <div ref={ref} className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 pt-28 pb-16">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-4">

          {/* LEFT COLUMN — Text Content */}
          <div className="w-full lg:w-[52%] lg:pr-4">
            {/* Badge */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
              <div className="inline-flex items-center gap-2 bg-white/[0.07] backdrop-blur-md border border-white/10 rounded-full px-4 py-1.5 mb-7">
                <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
                <span className="text-white/80 text-xs font-medium tracking-wide">Trusted by 1000+ Global Clients</span>
              </div>
            </motion.div>

            {/* Heading */}
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.2rem] xl:text-6xl font-extrabold text-white leading-[1.1] font-[Poppins] mb-6"
            >
              Global Supply of{' '}<br className="hidden sm:block" />
              <span className="text-gradient-accent">Premium</span>{' '}
              <br className="hidden md:block" />
              Engineering Materials
            </motion.h1>

            {/* Subheading */}
            <motion.p initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.2 }}
              className="text-base sm:text-lg text-white/60 max-w-xl mb-10 leading-relaxed"
            >
              Bright Bars, Black Bars & Industrial Steel - delivering quality engineering materials to manufacturers worldwide with unmatched reliability.
            </motion.p>

            {/* CTA */}
            <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 mb-14"
            >
              <a href="#contact" onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}
                className="group gradient-accent text-white px-8 py-4 rounded-xl text-base font-semibold hover:shadow-xl hover:shadow-accent/25 transition-all duration-300 hover:-translate-y-0.5 text-center inline-flex items-center justify-center gap-2"
              >
                Get a Quote
                <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </a>
              <a href="#products" onClick={(e) => { e.preventDefault(); document.querySelector('#products')?.scrollIntoView({ behavior: 'smooth' }); }}
                className="bg-white/[0.08] backdrop-blur-md border border-white/15 text-white px-8 py-4 rounded-xl text-base font-semibold hover:bg-white/[0.14] transition-all duration-300 hover:-translate-y-0.5 text-center"
              >View Products</a>
            </motion.div>

            {/* Stats */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.4 }}
              className="flex flex-wrap gap-10 sm:gap-14 pt-8 border-t border-white/10"
            >
              {[{ value: '15+', label: 'Years Experience' }, { value: '50+', label: 'Countries Served' }, { value: '1000+', label: 'Satisfied Clients' }].map((stat, i) => (
                <div key={i}>
                  <div className="text-3xl sm:text-4xl font-bold text-accent font-[Poppins]">{stat.value}</div>
                  <div className="text-white/40 text-sm mt-1 font-medium">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT COLUMN — Globe */}
          <div className="w-full lg:w-[48%] relative hidden lg:block">
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full aspect-square max-w-[600px] mx-auto"
            >
              {/* Globe container */}
              <div className="absolute inset-0">
                <ParticleGlobe />
              </div>

              {/* Floating Card — Active Route (top-right) */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 1.0 }}
                className="absolute top-[8%] right-[-8%] xl:right-[-5%] z-20"
              >
                <div className="hero-glass-card rounded-xl px-4 py-3 min-w-[180px]">
                  <div className="text-[10px] font-semibold tracking-[0.15em] uppercase text-accent/80 mb-1">Active Route</div>
                  <div className="text-white text-sm font-bold tracking-wide">Mumbai → Rotterdam</div>
                  <div className="flex items-center gap-1.5 mt-1.5">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                    <span className="text-emerald-400 text-[11px] font-medium">In Transit</span>
                  </div>
                </div>
              </motion.div>

              {/* Floating Card — Trade Routes (bottom-left) */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 1.3 }}
                className="absolute bottom-[15%] left-[-5%] xl:left-[0%] z-20"
              >
                <div className="hero-glass-card rounded-xl px-4 py-3 min-w-[200px]">
                  <div className="text-[10px] font-semibold tracking-[0.15em] uppercase text-white/40 mb-1">Trade Routes</div>
                  <div className="text-white text-base font-bold">142 Countries Connected</div>
                  <div className="mt-2 h-[3px] rounded-full bg-white/10 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={inView ? { width: '72%' } : {}}
                      transition={{ duration: 1.5, delay: 1.8, ease: 'easeOut' }}
                      className="h-full rounded-full bg-gradient-to-r from-accent to-accent-light"
                    />
                  </div>
                </div>
              </motion.div>

              {/* Floating Card — Live Shipment (middle-left) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 1.6 }}
                className="absolute top-[42%] left-[-12%] xl:left-[-8%] z-20"
              >
                <div className="hero-glass-card rounded-xl px-3.5 py-2.5">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-accent/15 flex items-center justify-center">
                      <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                    </div>
                    <div>
                      <div className="text-white text-xs font-bold">+23%</div>
                      <div className="text-white/40 text-[10px]">Export Growth</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white/80 to-transparent" />

      {/* Scroll indicator */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden sm:flex flex-col items-center gap-1.5"
      >
        <span className="text-white/30 text-[10px] tracking-[0.2em] uppercase font-medium">Scroll</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-5 h-8 border-2 border-white/20 rounded-full flex justify-center pt-2"
        >
          <div className="w-1 h-2 bg-accent rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
