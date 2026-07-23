'use client';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import Image from 'next/image';
import { GiSteelClaws, GiWheat, GiProcessor, GiFlame } from 'react-icons/gi';
import { FiArrowRight, FiGlobe, FiAward, FiUsers, FiShield, FiCheckCircle, FiDollarSign, FiTruck } from 'react-icons/fi';
import SectionHeader from './components/sections/SectionHeader';
import StatCounter from './components/sections/StatCounter';
import CTABanner from './components/sections/CTABanner';
import TestimonialCarousel from './components/sections/TestimonialCarousel';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import WhatsAppButton from './components/ui/WhatsAppButton';
import ScrollToTop from './components/ui/ScrollToTop';
import GlobalPresence from './components/GlobalPresence';
import { FiCalendar, FiUser, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useState, useEffect } from 'react';

/* ─── Division Data ─── */
const divisions = [
  {
    name: 'Engineering Materials',
    href: '/engineering',
    icon: GiSteelClaws,
    color: 'text-eng',
    bgColor: 'bg-eng',
    bgLight: 'bg-eng/10',
    gradient: 'from-eng to-eng-dark',
    description: 'Premium steel products — Bright Bars, Black Bars, Alloy & Carbon Steel exported to 50+ countries worldwide.',
    stats: '50+ Countries',
    image: '/images/bright-bars.png',
  },
  {
    name: 'Fruits & Vegetables',
    href: '/agriculture',
    icon: GiWheat,
    color: 'text-agri',
    bgColor: 'bg-agri',
    bgLight: 'bg-agri/10',
    gradient: 'from-agri to-agri-dark',
    description: 'APEDA & FSSAI certified export of fresh Alphonso Mangoes, Onions, Pomegranates, Coconut, and more.',
    stats: 'APEDA Certified',
    image: '/images/hero-bg.png',
  },
  {
    name: 'IT Services',
    href: '/it-services',
    icon: GiProcessor,
    color: 'text-it',
    bgColor: 'bg-it',
    bgLight: 'bg-it/10',
    gradient: 'from-it to-it-dark',
    description: 'Web Development, ERP Solutions, Cloud Services, and IT Consultancy for businesses across the globe.',
    stats: 'Full Stack',
    image: '/images/hero-bg.png',
  },
  {
    name: 'Handcrafts',
    href: '/handcrafts',
    icon: GiFlame,
    color: 'text-craft',
    bgColor: 'bg-craft',
    bgLight: 'bg-craft/10',
    gradient: 'from-craft to-craft-dark',
    description: 'Traditional Clay Diyas, Hand-Painted Decorative Diyas, Tea Light Holders, Pooja Accessories & Gift Sets — crafted by Indian artisans.',
    stats: 'Artisan Made',
    image: '/images/hero-bg.png',
  },
];

const features = [
  { icon: FiCheckCircle, title: 'Premium Quality', description: 'Every product sourced from certified suppliers with rigorous quality checks.', gradient: 'from-blue-500 to-blue-600' },
  { icon: FiDollarSign, title: 'Competitive Pricing', description: 'Direct sourcing and efficient supply chain for the best market prices.', gradient: 'from-emerald-500 to-green-600' },
  { icon: FiTruck, title: 'Global Delivery', description: 'Streamlined logistics to any destination worldwide with tracking.', gradient: 'from-orange-500 to-red-500' },
  { icon: FiGlobe, title: 'Multi-Industry Expertise', description: 'Three diverse business verticals serving varied industry needs.', gradient: 'from-violet-500 to-indigo-600' },
];

/* ─── Hero ─── */
function HeroSection({ banners }) {
  const [ref, inView] = useInView({ threshold: 0.05, triggerOnce: true });
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentBanner = banners && banners.length > 0 ? banners[currentIndex] : null;

  const nextBanner = () => {
    if (banners && banners.length > 0) {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }
  };

  const prevBanner = () => {
    if (banners && banners.length > 0) {
      setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length);
    }
  };

  if (!currentBanner) {
    return <section className="relative min-h-screen flex items-center overflow-hidden group bg-primary" />;
  }

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden group">
      <div className="absolute inset-0 transition-all duration-1000">
        <Image src={currentBanner.image} alt={currentBanner.title} fill className="object-cover" priority quality={90} />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/95 via-primary/90 to-primary-light/90" />
      </div>
      <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '80px 80px' }} />

      {banners && banners.length > 1 && (
        <>
          <button onClick={prevBanner} className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white opacity-0 group-hover:opacity-100 transition-all">
            <FiChevronLeft size={24} />
          </button>
          <button onClick={nextBanner} className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white opacity-0 group-hover:opacity-100 transition-all">
            <FiChevronRight size={24} />
          </button>
        </>
      )}

      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 pt-28 pb-20">
        <div className="max-w-3xl mx-auto text-center lg:text-left lg:mx-0">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
            <div className="inline-flex items-center gap-2 bg-white/[0.07] backdrop-blur-md border border-white/10 rounded-full px-4 py-1.5 mb-7">
              <span className="w-1.5 h-1.5 bg-eng rounded-full animate-pulse" />
              <span className="text-white/80 text-xs font-medium tracking-wide">Trusted by 1000+ Global Clients</span>
            </div>
          </motion.div>

          <motion.h1 key={`title-${currentIndex}`} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.1] font-[family-name:var(--font-poppins)] mb-6"
          >
            {currentBanner.title.split('\n').map((line, i) => {
              const color = i === 0 ? currentBanner.title_color : i === 1 ? currentBanner.title_color_2 : currentBanner.title_color_3;
              return (
                <span key={i} style={{ color: color || '#ffffff', display: 'block' }}>
                  {line}
                </span>
              );
            })}
          </motion.h1>

          <motion.p key={`desc-${currentIndex}`} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
            className="text-base sm:text-lg max-w-xl mb-10 leading-relaxed lg:mx-0 mx-auto"
            style={{ color: currentBanner.description_color || 'rgba(255, 255, 255, 0.6)' }}
          >
            {currentBanner.description}
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 mb-14 justify-center lg:justify-start"
          >
            <Link href={currentBanner.cta_link || '/contact'}
              className="group gradient-eng text-white px-8 py-4 rounded-xl text-base font-semibold hover:shadow-xl hover:shadow-eng/25 transition-all duration-300 hover:-translate-y-0.5 text-center inline-flex items-center justify-center gap-2"
            >
              {currentBanner.cta_text || 'Get a Quote'}
              <FiArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link href="#divisions"
              className="bg-white/[0.08] backdrop-blur-md border border-white/15 text-white px-8 py-4 rounded-xl text-base font-semibold hover:bg-white/[0.14] transition-all duration-300 hover:-translate-y-0.5 text-center"
            >
              Explore Divisions
            </Link>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-wrap gap-10 sm:gap-14 pt-8 border-t border-white/10 justify-center lg:justify-start"
          >
            {[
              { value: '15+', label: 'Years Experience' },
              { value: '50+', label: 'Countries Served' },
              { value: '1000+', label: 'Satisfied Clients' },
              { value: '4', label: 'Business Divisions' },
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-3xl sm:text-4xl font-bold text-eng font-[family-name:var(--font-poppins)]">{stat.value}</div>
                <div className="text-white/40 text-sm mt-1 font-medium">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white/80 to-transparent" />

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden sm:flex flex-col items-center gap-1.5"
      >
        <span className="text-white/30 text-[10px] tracking-[0.2em] uppercase font-medium">Scroll</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-5 h-8 border-2 border-white/20 rounded-full flex justify-center pt-2"
        >
          <div className="w-1 h-2 bg-eng rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ─── Division Selector (Bento Grid) ─── */
function DivisionSelector() {
  const [ref, inView] = useInView({ threshold: 0.05, triggerOnce: true });

  return (
    <section id="divisions" className="py-20 sm:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <SectionHeader
          label="Our Divisions"
          title="Four Verticals,"
          titleHighlight="One Vision"
          highlightClass="text-gradient-eng"
          description="From engineering materials to fresh produce and digital solutions — we deliver excellence across industries."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {divisions.map((div, i) => (
            <motion.div
              key={div.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.15 }}
            >
              <Link href={div.href} className={`division-card ${div.name.includes('Engineering') ? 'eng' : div.name.includes('Agriculture') || div.name.includes('Fruits') ? 'agri' : div.name.includes('Handcrafts') ? 'craft' : 'it'} bg-surface rounded-3xl overflow-hidden border border-surface-darker/40 group block h-full`}>
                <div className="relative h-48 overflow-hidden">
                  <Image src={div.image} alt={div.name} fill className="object-cover transition-transform duration-700 group-hover:scale-110" sizes="(max-width:1024px) 100vw, 33vw" />
                  <div className={`absolute inset-0 bg-gradient-to-t ${div.gradient} opacity-80`} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
                      <div.icon className="text-white text-4xl" />
                    </div>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-[11px] font-semibold">
                      {div.stats}
                    </span>
                  </div>
                </div>
                <div className="p-6 relative z-10">
                  <h3 className="text-xl font-bold text-primary font-[family-name:var(--font-poppins)] mb-2 group-hover:text-eng transition-colors">
                    {div.name}
                  </h3>
                  <p className="text-secondary text-sm leading-relaxed mb-4">
                    {div.description}
                  </p>
                  <span className={`inline-flex items-center gap-1.5 text-sm font-semibold ${div.color} group-hover:gap-3 transition-all`}>
                    Explore <FiArrowRight className="text-xs" />
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

/* ─── Why UBGlobal ─── */
function WhyUBGlobal() {
  const [ref, inView] = useInView({ threshold: 0.05, triggerOnce: true });

  return (
    <section className="py-20 sm:py-28 gradient-primary relative overflow-hidden">
      <div className="absolute top-0 right-0 w-72 h-72 bg-eng/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" ref={ref}>
        <SectionHeader
          label="Why Choose Us"
          title="The United Brothers Advantage"
          description="We go beyond supplying products — we build lasting partnerships founded on trust, quality, and mutual growth."
          light
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.45, delay: i * 0.1 }}
              className="bg-white/[0.06] backdrop-blur-sm border border-white/[0.08] rounded-2xl p-7 group hover:bg-white/[0.12] transition-all duration-400 hover:-translate-y-2"
            >
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${f.gradient} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-lg`}>
                <f.icon className="text-white text-xl" />
              </div>
              <h3 className="text-base font-bold text-white mb-2 font-[family-name:var(--font-poppins)]">{f.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{f.description}</p>
            </motion.div>
          ))}
        </div>

        <CTABanner
          title="Ready to partner with us?"
          description="Get a competitive quote within 24 hours across any division"
          buttonText="Request Quote"
          buttonHref="/contact"
          variant="dark"
          className="mt-14"
        />
      </div>
    </section>
  );
}

/* ─── Stats Section ─── */
function StatsSection() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  const stats = [
    { icon: FiAward, value: '15', suffix: '+', label: 'Years of Excellence', desc: 'Delivering quality since 2009' },
    { icon: FiGlobe, value: '50', suffix: '+', label: 'Countries Reached', desc: 'Global export network' },
    { icon: FiUsers, value: '1000', suffix: '+', label: 'Happy Clients', desc: 'Trusted partnerships' },
    { icon: FiShield, value: '100', suffix: '%', label: 'Quality Assured', desc: 'Certified processes' },
  ];

  return (
    <section className="py-20 sm:py-28 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <SectionHeader
          label="Our Impact"
          title="Numbers That"
          titleHighlight="Speak"
          highlightClass="text-gradient-eng"
          description="Over 15 years of building trust, delivering quality, and expanding global reach."
        />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((stat, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
              className="counter-card bg-white rounded-2xl p-6 text-center border border-surface-darker/40 group hover:bg-primary hover:border-primary"
            >
              <div className="w-12 h-12 mx-auto bg-eng/10 rounded-xl flex items-center justify-center mb-3 group-hover:bg-eng/20 transition-colors">
                <stat.icon className="text-eng text-xl" />
              </div>
              <StatCounter target={stat.value} suffix={stat.suffix} />
              <div className="text-primary font-semibold mt-2 group-hover:text-white transition-colors text-sm">{stat.label}</div>
              <div className="text-secondary-light text-xs mt-0.5 group-hover:text-white/50 transition-colors">{stat.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Certifications ─── */
function Certifications() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const certs = [
    { name: 'APEDA', full: 'Agricultural & Processed Food Products Export Development Authority', desc: 'Certified for export of agricultural products from India' },
    { name: 'FSSAI', full: 'Food Safety and Standards Authority of India', desc: 'Licensed for food safety compliance and quality assurance' },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}
          className="bg-surface rounded-3xl p-8 sm:p-10 border border-surface-darker/40"
        >
          <div className="flex flex-col sm:flex-row items-center gap-8">
            <div className="shrink-0">
              <div className="flex items-center gap-2 mb-2">
                <FiShield className="text-eng text-xl" />
                <h3 className="text-lg font-bold text-primary font-[family-name:var(--font-poppins)]">Certified & Licensed</h3>
              </div>
              <p className="text-secondary text-sm max-w-xs">Our operations are backed by recognized certifications ensuring quality and compliance.</p>
            </div>
            <div className="flex flex-wrap gap-4 flex-1">
              {certs.map((cert, i) => (
                <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
                  className="bg-white rounded-xl p-5 border border-surface-darker/40 flex-1 min-w-[200px] hover:shadow-lg transition-shadow"
                >
                  <div className="text-2xl font-extrabold text-eng font-[family-name:var(--font-poppins)] mb-1">{cert.name}</div>
                  <div className="text-xs font-medium text-primary mb-1">{cert.full}</div>
                  <div className="text-xs text-secondary">{cert.desc}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Testimonials Wrapper ─── */
function TestimonialsSection() {
  return (
    <section className="py-20 sm:py-28 gradient-primary relative overflow-hidden">
      <div className="absolute top-16 left-10 w-56 h-56 bg-eng/5 rounded-full blur-3xl" />
      <div className="absolute bottom-16 right-10 w-72 h-72 bg-white/[0.02] rounded-full blur-3xl" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          label="Testimonials"
          title="What Our Clients Say"
          description="Hear from our valued clients across the globe and across all our business divisions."
          light
        />
        <TestimonialCarousel division="all" light />
      </div>
    </section>
  );
}

/* ─── Blog Preview ─── */
function BlogPreview({ blogs }) {
  const [ref, inView] = useInView({ threshold: 0.05, triggerOnce: true });

  const getDivisionColor = (category) => {
    if (category === 'Engineering') return 'text-eng bg-eng/10';
    if (category === 'Agriculture') return 'text-agri bg-agri/10';
    if (category === 'Handcrafts') return 'text-craft bg-craft/10';
    return 'text-it bg-it/10';
  };

  return (
    <section className="py-20 sm:py-28 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <SectionHeader
          label="Latest Insights"
          title="From Our Blog"
          description="Stay updated with industry trends, export insights, and company news."
        />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogs && blogs.map((post, i) => {
            const imageSrc = post.image || '/images/hero-bg.png';
            const postDate = post.date || post.created_at || new Date().toISOString();

            return (
              <motion.div key={post.slug || i} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.45, delay: i * 0.1 }}>
                <Link href={`/blog/${post.slug}`} className="bg-white rounded-2xl overflow-hidden border border-surface-darker/40 group block h-full flex flex-col hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <div className="relative h-48 overflow-hidden shrink-0 bg-surface">
                    <Image src={imageSrc} alt={post.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 rounded-full text-[11px] font-bold ${getDivisionColor(post.category)}`}>
                        {post.category || 'General'}
                      </span>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-lg font-bold text-primary font-[family-name:var(--font-poppins)] mb-3 group-hover:text-eng transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-surface-darker/50 text-xs text-secondary-light">
                      <div className="flex items-center gap-1.5">
                        <FiCalendar /> {new Date(postDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default function HomePageClient({ initialBanners, initialBlogs }) {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection banners={initialBanners} />
        <DivisionSelector />
        <StatsSection />
        <WhyUBGlobal />
        <GlobalPresence />
        <Certifications />
        <TestimonialsSection />
        <BlogPreview blogs={initialBlogs} />
      </main>
      <Footer />
      <WhatsAppButton />
      <ScrollToTop />
    </>
  );
}
