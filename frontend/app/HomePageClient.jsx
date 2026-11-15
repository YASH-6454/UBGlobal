'use client';
import { useState } from 'react';
import { motion, MotionConfig } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { FiArrowRight, FiArrowDown, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import SectionHeader from './components/sections/SectionHeader';
import StatCounter from './components/sections/StatCounter';
import CTABanner from './components/sections/CTABanner';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import WhatsAppButton from './components/ui/WhatsAppButton';
import ScrollToTop from './components/ui/ScrollToTop';
import GlobalPresence from './components/GlobalPresence';

/* ─── Content ─── */
const divisions = [
  {
    name: 'Engineering Materials',
    href: '/engineering',
    accent: '#F97316',
    tag: 'Exported to 50+ countries',
    description: 'Premium steel products — Bright Bars, Black Bars, Alloy & Carbon Steel exported to 50+ countries worldwide.',
    image: '/images/bright-bars.png',
  },
  {
    name: 'Fruits & Vegetables',
    href: '/agriculture',
    accent: '#22C55E',
    tag: 'APEDA certified',
    description: 'APEDA & FSSAI certified export of fresh Alphonso Mangoes, Onions, Pomegranates, Coconut, and more.',
  },
  {
    name: 'IT Services',
    href: '/it-services',
    accent: '#3B82F6',
    tag: 'Full stack',
    description: 'Web Development, ERP Solutions, Cloud Services, and IT Consultancy for businesses across the globe.',
  },
  {
    name: 'Handcrafts',
    href: '/handcrafts',
    accent: '#D97706',
    tag: 'Artisan made',
    description: 'Traditional Clay Diyas, Hand-Painted Decorative Diyas, Tea Light Holders, Pooja Accessories & Gift Sets — crafted by Indian artisans.',
  },
];

const reasons = [
  { title: 'Premium Quality', description: 'Every product sourced from certified suppliers with rigorous quality checks.' },
  { title: 'Competitive Pricing', description: 'Direct sourcing and efficient supply chain for the best market prices.' },
  { title: 'Global Delivery', description: 'Streamlined logistics to any destination worldwide with tracking.' },
  { title: 'Multi-Industry Expertise', description: 'Four diverse business verticals serving varied industry needs.' },
];

// Matches foundingDate in the Organization schema (layout.js)
const FOUNDED_YEAR = 2009;

const stats = [
  { value: String(new Date().getFullYear() - FOUNDED_YEAR), suffix: '+', label: 'Years of experience', desc: `Trading since ${FOUNDED_YEAR}` },
  { value: '50', suffix: '+', label: 'Countries served', desc: 'Global export network' },
  { value: '1000', suffix: '+', label: 'Clients', desc: 'Trusted partnerships' },
  { value: '4', suffix: '', label: 'Business divisions', desc: 'Under one roof' },
];

const certs = [
  { name: 'APEDA', full: 'Agricultural & Processed Food Products Export Development Authority', desc: 'Certified for export of agricultural products from India' },
  { name: 'FSSAI', full: 'Food Safety and Standards Authority of India', desc: 'Licensed for food safety compliance and quality assurance' },
];

// Shown when the CMS has no banners yet, so the hero is never empty
const FALLBACK_BANNER = {
  title: 'Engineering.\nAgriculture.\nTechnology.',
  description:
    'United Brothers Global — a diversified trading and services company delivering premium engineering materials, fresh produce, and IT solutions across 50+ countries.',
  cta_text: 'Get a Quote',
  cta_link: '/contact',
  image: '/images/bright-bars.png',
};

/* One shared, restrained scroll reveal */
function Reveal({ children, delay = 0, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Hero ─── */
function HeroSection({ banners }) {
  const [index, setIndex] = useState(0);
  const list = banners && banners.length > 0 ? banners : [FALLBACK_BANNER];
  const banner = list[index % list.length];
  const go = (dir) => setIndex((i) => (i + dir + list.length) % list.length);

  return (
    <section className="relative min-h-[100svh] flex items-center overflow-hidden bg-primary">
      {banner.image && (
        <div className="absolute inset-0">
          <Image src={banner.image} alt="" fill className="object-cover" priority quality={90} sizes="100vw" />
          {/* Photo stays visible on the right; text side is anchored in navy */}
          <div className="absolute inset-0 bg-primary/60 lg:bg-transparent" />
          <div className="absolute inset-0 hidden lg:block bg-gradient-to-r from-primary from-35% via-primary/80 to-primary/10" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-primary/70 to-transparent" />
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 pt-32 pb-28">
        <div className="max-w-2xl">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-3 text-[11px] font-medium tracking-[0.24em] uppercase text-white/70 mb-8"
          >
            <span aria-hidden="true" className="h-px w-10 bg-eng" />
            Import &middot; Export &middot; Trade Solutions
          </motion.p>

          <motion.h1
            key={`title-${index}`}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-[2.75rem] sm:text-6xl lg:text-7xl font-medium leading-[1.03] tracking-tight font-[family-name:var(--font-heading)] mb-7"
          >
            {banner.title.split('\n').map((line, i) => {
              const color = i === 0 ? banner.title_color : i === 1 ? banner.title_color_2 : banner.title_color_3;
              return (
                <span key={i} style={{ color: color || '#ffffff', display: 'block' }}>
                  {line}
                </span>
              );
            })}
          </motion.h1>

          <motion.p
            key={`desc-${index}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="text-base sm:text-lg max-w-xl mb-10 leading-relaxed"
            style={{ color: banner.description_color || 'rgba(255, 255, 255, 0.72)' }}
          >
            {banner.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-8"
          >
            <Link
              href={banner.cta_link || '/contact'}
              className="group inline-flex items-center justify-center gap-2 bg-eng text-primary-dark px-8 py-4 rounded-md text-base font-semibold hover:bg-eng-light transition-colors duration-200"
            >
              {banner.cta_text || 'Get a Quote'}
              <FiArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              href="#divisions"
              className="group inline-flex self-start items-center gap-2 text-white text-base font-medium border-b border-white/40 pb-1 hover:border-white transition-colors"
            >
              Explore divisions
              <FiArrowDown className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-0.5" />
            </Link>
          </motion.div>
        </div>
      </div>

      {list.length > 1 && (
        <div className="absolute bottom-8 left-0 right-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-4 text-white">
            <button onClick={() => go(-1)} aria-label="Previous banner" className="w-10 h-10 border border-white/30 rounded-md flex items-center justify-center hover:bg-white hover:text-primary transition-colors">
              <FiChevronLeft />
            </button>
            <button onClick={() => go(1)} aria-label="Next banner" className="w-10 h-10 border border-white/30 rounded-md flex items-center justify-center hover:bg-white hover:text-primary transition-colors">
              <FiChevronRight />
            </button>
            <span className="text-sm tracking-widest text-white/70 tabular-nums">
              {String((index % list.length) + 1).padStart(2, '0')} / {String(list.length).padStart(2, '0')}
            </span>
          </div>
        </div>
      )}
    </section>
  );
}

/* ─── Divisions: one lead feature + a numbered list ─── */
function DivisionSelector() {
  const [lead, ...rest] = divisions;

  return (
    <section id="divisions" className="py-20 sm:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="Our Divisions"
          title="Four verticals,"
          titleHighlight="one vision"
          highlightClass="text-gradient-eng"
          align="left"
          description="From engineering materials to fresh produce and digital solutions — we deliver excellence across industries."
        />

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14">
          <Reveal className="lg:col-span-7">
            <Link href={lead.href} className="group relative block min-h-[420px] lg:min-h-[560px] h-full rounded-lg overflow-hidden bg-primary">
              <Image
                src={lead.image}
                alt={lead.name}
                fill
                className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 58vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/65 to-primary/10" />
              <div className="absolute inset-x-0 bottom-0 p-7 sm:p-10 text-white">
                <p className="text-[11px] font-medium tracking-[0.22em] uppercase text-white/70 mb-4">01 &mdash; {lead.tag}</p>
                <div className="h-0.5 w-10 mb-5" style={{ background: lead.accent }} />
                <h3 className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl font-medium mb-3">{lead.name}</h3>
                <p className="text-white/75 max-w-md leading-relaxed mb-6">{lead.description}</p>
                <span className="inline-flex items-center gap-2 text-sm font-semibold group-hover:gap-4 transition-all duration-300">
                  Explore division <FiArrowRight />
                </span>
              </div>
            </Link>
          </Reveal>

          <div className="lg:col-span-5 flex flex-col">
            {rest.map((div, i) => (
              <Reveal key={div.name} delay={i * 0.08} className="flex-1">
                <Link
                  href={div.href}
                  style={{ '--acc': div.accent }}
                  className="group h-full flex items-start gap-5 py-8 border-t border-primary/15 hover:border-[color:var(--acc)] transition-colors duration-300 last:border-b"
                >
                  <span className="text-sm font-medium text-secondary tabular-nums pt-1.5 w-8 shrink-0">0{i + 2}</span>
                  <span className="flex-1">
                    <span className="block font-[family-name:var(--font-heading)] text-2xl font-medium text-primary mb-2">{div.name}</span>
                    <span className="block text-sm text-secondary leading-relaxed mb-3">{div.description}</span>
                    <span className="text-[11px] font-medium tracking-[0.2em] uppercase" style={{ color: div.accent }}>{div.tag}</span>
                  </span>
                  <FiArrowRight className="mt-2 text-primary/40 group-hover:text-primary group-hover:translate-x-1 transition-all duration-300 shrink-0" />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Stats: shown once, as large figures ─── */
function StatsSection() {
  return (
    <section className="py-20 sm:py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <p className="flex items-center gap-3 text-[11px] font-medium tracking-[0.24em] uppercase text-secondary mb-10">
            <span aria-hidden="true" className="h-px w-8 bg-eng" />
            Our impact
          </p>
          <div className="grid grid-cols-2 lg:grid-cols-4 border-t border-primary/15">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className={`py-8 lg:py-10 pr-4 ${i % 2 === 1 ? 'pl-5 border-l border-primary/15' : ''} ${i >= 2 ? 'border-t lg:border-t-0 border-primary/15' : ''} ${i >= 1 ? 'lg:pl-8 lg:border-l lg:border-primary/15' : ''}`}
              >
                <StatCounter
                  target={stat.value}
                  suffix={stat.suffix}
                  align="left"
                  valueClassName="text-5xl sm:text-6xl lg:text-7xl font-normal text-primary leading-none"
                />
                <div className="text-primary font-medium mt-4 text-sm sm:text-base">{stat.label}</div>
                <div className="text-secondary text-xs sm:text-sm mt-1">{stat.desc}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── Why UBGlobal: sticky heading + numbered list ─── */
function WhyUBGlobal() {
  return (
    <section className="py-20 sm:py-28 bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-4">
            <SectionHeader
              label="Why Choose Us"
              title="The United Brothers"
              titleHighlight="advantage"
              highlightClass="text-gradient-eng"
              align="left"
              light
              className="lg:sticky lg:top-28 !mb-0"
              description="We go beyond supplying products — we build lasting partnerships founded on trust, quality, and mutual growth."
            />
          </div>
          <div className="lg:col-span-8">
            {reasons.map((r, i) => (
              <Reveal key={r.title} delay={i * 0.06}>
                <div className="grid sm:grid-cols-[5rem_1fr] gap-2 sm:gap-6 py-8 border-t border-white/15 last:border-b">
                  <span className="font-[family-name:var(--font-heading)] text-3xl text-white/30 tabular-nums">0{i + 1}</span>
                  <div>
                    <h3 className="font-[family-name:var(--font-heading)] text-2xl font-medium text-white mb-2">{r.title}</h3>
                    <p className="text-white/65 leading-relaxed max-w-lg">{r.description}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <CTABanner
          title="Ready to partner with us?"
          description="Get a competitive quote within 24 hours across any division"
          buttonText="Request Quote"
          buttonHref="/contact"
          variant="dark"
          className="mt-20"
        />
      </div>
    </section>
  );
}

/* ─── Certifications: typographic, no boxes ─── */
function Certifications() {
  return (
    <section className="py-20 sm:py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
          <Reveal className="lg:col-span-4">
            <p className="flex items-center gap-3 text-[11px] font-medium tracking-[0.24em] uppercase text-secondary mb-5">
              <span aria-hidden="true" className="h-px w-8 bg-eng" />
              Certified &amp; licensed
            </p>
            <p className="font-[family-name:var(--font-heading)] text-2xl sm:text-3xl text-primary leading-snug">
              Operations backed by recognised certifications, for quality and compliance.
            </p>
          </Reveal>
          <div className="lg:col-span-8 grid sm:grid-cols-2 gap-x-10 gap-y-10">
            {certs.map((c, i) => (
              <Reveal key={c.name} delay={i * 0.08}>
                <div className="border-t border-primary/20 pt-6">
                  <div className="font-[family-name:var(--font-heading)] text-5xl text-primary mb-4">{c.name}</div>
                  <div className="text-sm font-medium text-primary mb-1.5">{c.full}</div>
                  <div className="text-sm text-secondary">{c.desc}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Blog preview: borderless editorial grid ─── */
function BlogPreview({ blogs }) {
  if (!blogs || blogs.length === 0) return null;

  return (
    <section className="py-20 sm:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-14">
          <SectionHeader
            label="Latest Insights"
            title="From our"
            titleHighlight="blog"
            highlightClass="text-gradient-eng"
            align="left"
            className="!mb-0"
            description="Industry trends, export insights, and company news."
          />
          <Link href="/blog" className="group inline-flex items-center gap-2 text-sm font-semibold text-primary border-b border-primary/30 pb-1 hover:border-primary transition-colors self-start sm:self-auto">
            All articles <FiArrowRight className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-12">
          {blogs.map((post, i) => {
            const imageSrc = post.image || '/images/hero-bg.png';
            const postDate = post.date || post.created_at;
            return (
              <Reveal key={post.slug || i} delay={i * 0.08}>
                <Link href={`/blog/${post.slug}`} className="group block">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-md bg-surface mb-5">
                    <Image src={imageSrc} alt={post.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-secondary mb-3">
                    {post.category || 'General'}
                    {postDate && (
                      <>
                        <span className="mx-2 text-secondary/50">/</span>
                        {new Date(postDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </>
                    )}
                  </p>
                  <h3 className="font-[family-name:var(--font-heading)] text-xl sm:text-2xl font-medium text-primary leading-snug line-clamp-3 group-hover:underline decoration-1 underline-offset-4">
                    {post.title}
                  </h3>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default function HomePageClient({ initialBanners, initialBlogs }) {
  return (
    <MotionConfig reducedMotion="user">
      <Navbar />
      <main>
        <HeroSection banners={initialBanners} />
        <DivisionSelector />
        <StatsSection />
        <WhyUBGlobal />
        <GlobalPresence />
        <Certifications />
        <BlogPreview blogs={initialBlogs} />
      </main>
      <Footer />
      <WhatsAppButton />
      <ScrollToTop />
    </MotionConfig>
  );
}
