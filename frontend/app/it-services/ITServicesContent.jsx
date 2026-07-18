'use client';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiCode, FiServer, FiCloud, FiUsers, FiArrowRight, FiCheckCircle, FiZap, FiHeadphones } from 'react-icons/fi';
import Link from 'next/link';
import SectionHeader from '../components/sections/SectionHeader';
import CTABanner from '../components/sections/CTABanner';
import TestimonialCarousel from '../components/sections/TestimonialCarousel';
import FAQSection from '../components/sections/FAQSection';

const services = [
  {
    title: 'Web Development',
    icon: FiCode,
    href: '/it-services/web-development',
    gradient: 'from-blue-500 to-indigo-600',
    description: 'Custom websites, web applications, and e-commerce platforms built with modern technologies.',
    features: ['React & Next.js', 'Responsive Design', 'SEO Optimized', 'CMS Integration'],
  },
  {
    title: 'ERP Solutions',
    icon: FiServer,
    href: '/it-services/app-development',
    gradient: 'from-violet-500 to-purple-600',
    description: 'Enterprise Resource Planning systems tailored to your business processes and workflows.',
    features: ['Custom Modules', 'Inventory Management', 'Financial Reporting', 'HR & Payroll'],
  },
  {
    title: 'Cloud & DevOps',
    icon: FiCloud,
    href: '/it-services/cloud-devops',
    gradient: 'from-cyan-500 to-blue-600',
    description: 'Cloud infrastructure, deployment automation, and managed services for scalable operations.',
    features: ['AWS / Azure / GCP', 'CI/CD Pipelines', 'Monitoring & Alerts', 'Infrastructure as Code'],
  },
  {
    title: 'IT Consultancy',
    icon: FiUsers,
    href: '/contact',
    gradient: 'from-emerald-500 to-teal-600',
    description: 'Strategic technology consulting to help businesses make informed IT decisions and digital transformations.',
    features: ['Technology Audit', 'Digital Strategy', 'Process Optimization', 'Vendor Management'],
  },
];

const techStack = [
  { name: 'React', category: 'Frontend' },
  { name: 'Next.js', category: 'Frontend' },
  { name: 'Node.js', category: 'Backend' },
  { name: 'Python', category: 'Backend' },
  { name: 'PostgreSQL', category: 'Database' },
  { name: 'MongoDB', category: 'Database' },
  { name: 'AWS', category: 'Cloud' },
  { name: 'Docker', category: 'DevOps' },
];

const process_ = [
  { step: '01', title: 'Discovery', desc: 'Understanding your requirements, goals, and challenges through in-depth consultation.' },
  { step: '02', title: 'Design', desc: 'Creating wireframes, prototypes, and architecture plans for your approval.' },
  { step: '03', title: 'Develop', desc: 'Building your solution with agile methodology, regular updates, and quality checks.' },
  { step: '04', title: 'Deploy & Support', desc: 'Launching your project with full deployment support and ongoing maintenance.' },
];

const faqs = [
  { question: 'What technologies do you use for web development?', answer: 'We primarily use React, Next.js, Node.js, and Python for our web projects. For databases, we work with PostgreSQL and MongoDB. We also integrate with popular CMS platforms and payment gateways.' },
  { question: 'How long does a typical web development project take?', answer: 'A standard website takes 4-8 weeks, while complex web applications can take 3-6 months. ERP implementations typically run 6-12 months depending on scope and customization requirements.' },
  { question: 'Do you provide ongoing support after project delivery?', answer: 'Yes, we offer comprehensive post-launch support including bug fixes, feature updates, server monitoring, and security patches. We have monthly support plans available.' },
  { question: 'Can you work with our existing tech infrastructure?', answer: 'Absolutely. Our consultancy team assesses your current infrastructure and recommends integration strategies that leverage your existing investments while introducing improvements where needed.' },
];

export default function ITServicesContent() {
  const [heroRef, heroInView] = useInView({ threshold: 0.05, triggerOnce: true });

  return (
    <>
      {/* Hero */}
      <section className="relative py-16 sm:py-24 overflow-hidden bg-gradient-to-br from-primary via-primary-light to-it-dark/30">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 80% 80%, rgba(59,130,246,0.3), transparent 50%), radial-gradient(circle at 20% 20%, rgba(96,165,250,0.2), transparent 50%)' }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" ref={heroRef}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-it/20 rounded-full px-4 py-1.5 mb-6">
              <span className="w-1.5 h-1.5 bg-it rounded-full" />
              <span className="text-it text-xs font-semibold tracking-wide">IT Services Division</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-[1.1] font-[family-name:var(--font-poppins)] mb-5">
              Digital Solutions That <span className="text-gradient-it">Drive Growth</span>
            </h1>
            <p className="text-white/60 text-base sm:text-lg leading-relaxed mb-8">
              Web Development, ERP Solutions, Cloud & DevOps, and IT Consultancy — building technology that powers your business forward.
            </p>
            <div className="flex flex-wrap gap-6 pt-6 border-t border-white/10">
              {[{ v: '4', l: 'Service Areas' }, { v: '8+', l: 'Technologies' }, { v: '100%', l: 'Client Satisfaction' }].map((s, i) => (
                <div key={i}><div className="text-2xl font-bold text-it">{s.v}</div><div className="text-white/40 text-xs">{s.l}</div></div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 sm:py-28 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="Our Services" title="What We" titleHighlight="Build" highlightClass="text-gradient-it" description="End-to-end IT solutions tailored to your business needs." />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {services.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.1 }}>
                <Link href={s.href} className="card-hover bg-white rounded-2xl p-7 border border-surface-darker/40 group cursor-pointer flex flex-col h-full block">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${s.gradient} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-lg`}>
                    <s.icon className="text-white text-xl" />
                  </div>
                  <h3 className="text-lg font-bold text-primary font-[family-name:var(--font-poppins)] mb-2 group-hover:text-it transition-colors">{s.title}</h3>
                  <p className="text-secondary text-sm leading-relaxed mb-4 flex-1">{s.description}</p>
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    {s.features.map((f, j) => (
                      <div key={j} className="flex items-center gap-1.5 text-xs text-secondary">
                        <FiCheckCircle className="text-it text-[10px] shrink-0" /> {f}
                      </div>
                    ))}
                  </div>
                  <div className="pt-4 border-t border-surface-darker/50">
                    <span className="text-it text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                      Learn More <FiArrowRight className="text-xs" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="Our Process" title="How We Work" description="A proven four-step process that delivers results on time and on budget." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {process_.map((p, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }}
                className="relative bg-surface rounded-2xl p-6 border border-surface-darker/40 text-center group hover:shadow-lg transition-all"
              >
                <div className="text-4xl font-extrabold text-it/10 font-[family-name:var(--font-poppins)] mb-2 group-hover:text-it/20 transition-colors">{p.step}</div>
                <h3 className="text-base font-bold text-primary font-[family-name:var(--font-poppins)] mb-2">{p.title}</h3>
                <p className="text-secondary text-sm leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-20 sm:py-28 bg-gradient-to-br from-primary via-primary-light to-it-dark/20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeader label="Tech Stack" title="Technologies We Use" description="Modern, battle-tested technologies for reliable and scalable solutions." light />
          <div className="flex flex-wrap justify-center gap-4">
            {techStack.map((tech, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.85 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: i * 0.05 }}
                className="bg-white/[0.08] backdrop-blur-sm border border-white/[0.08] rounded-xl px-5 py-3 hover:bg-white/[0.15] transition-all"
              >
                <div className="text-white font-semibold text-sm">{tech.name}</div>
                <div className="text-white/40 text-xs">{tech.category}</div>
              </motion.div>
            ))}
          </div>
          <CTABanner title="Have a project in mind?" description="Let's discuss your requirements and build something great" buttonText="Start a Project" className="mt-14" variant="dark" />
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 sm:py-28 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="Client Testimonials" title="What Our IT Clients Say" description="Success stories from businesses we've helped transform digitally." />
          <TestimonialCarousel division="it" light={false} />
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="FAQ" title="Frequently Asked Questions" description="Common questions about our IT services and development process." />
          <FAQSection faqs={faqs} />
        </div>
      </section>
    </>
  );
}
