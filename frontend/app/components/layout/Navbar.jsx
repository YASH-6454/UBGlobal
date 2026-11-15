'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenu, HiX } from 'react-icons/hi';
import { FiChevronDown } from 'react-icons/fi';
import { GiSteelClaws, GiWheat, GiProcessor, GiFlame } from 'react-icons/gi';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

// Division definitions — static design constants
const divisionDefs = [
  {
    name: 'Engineering Materials',
    href: '/engineering',
    divisionKey: 'Engineering',
    icon: GiSteelClaws,
    color: 'text-eng',
    bg: 'bg-eng/10',
    accent: '#F97316',
    description: 'Bright Bars, Black Bars, Alloy & Carbon Steel',
  },
  {
    name: 'Fruits & Vegetables',
    href: '/agriculture',
    divisionKey: 'Agriculture',
    icon: GiWheat,
    color: 'text-agri',
    bg: 'bg-agri/10',
    accent: '#22C55E',
    description: 'Fresh produce export — Mangoes, Onions, Spices & more',
  },
  {
    name: 'IT Services',
    href: '/it-services',
    divisionKey: 'IT Services',
    icon: GiProcessor,
    color: 'text-it',
    bg: 'bg-it/10',
    accent: '#3B82F6',
    description: 'Web Development, ERP, Cloud & Consultancy',
  },
  {
    name: 'Handcrafts',
    href: '/handcrafts',
    divisionKey: 'Handcrafts',
    icon: GiFlame,
    color: 'text-craft',
    bg: 'bg-craft/10',
    accent: '#D97706',
    description: 'Clay Diyas, Tea Light Holders, Pooja Items & Gift Sets',
  },
];

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Divisions', href: '#', hasMega: true },
  { name: 'About', href: '/about' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact', href: '/contact' },
];

const linkBase =
  'relative px-3.5 py-2 text-[13px] font-medium tracking-wide transition-colors duration-200 after:absolute after:left-3.5 after:right-3.5 after:-bottom-px after:h-px after:origin-left after:scale-x-0 after:bg-eng after:transition-transform after:duration-300 hover:after:scale-x-100';

export default function Navbar() {
  const pathname = usePathname();
  const isActive = (href) => (href === '/' ? pathname === '/' : href !== '#' && pathname.startsWith(href));
  const divisionActive = divisionDefs.some((d) => pathname.startsWith(d.href));
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileDivExpanded, setMobileDivExpanded] = useState(null);
  const [divisions, setDivisions] = useState(
    divisionDefs.map(d => ({ ...d, links: [] }))
  );
  const megaTimeout = useRef(null);

  // Fetch products from API and build dynamic sub-links
  useEffect(() => {
    fetch(`${API_URL}/api/products`)
      .then(res => res.json())
      .then(products => {
        const divisionMap = {};
        for (const div of divisionDefs) {
          divisionMap[div.divisionKey] = [];
        }
        for (const product of products) {
          const key = product.division;
          if (divisionMap[key]) {
            const slug = product.slug || product.name.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-');
            const divDef = divisionDefs.find(d => d.divisionKey === key);
            divisionMap[key].push({
              name: product.name,
              href: `${divDef.href}/${slug}`,
            });
          }
        }
        setDivisions(
          divisionDefs.map(d => ({
            ...d,
            links: divisionMap[d.divisionKey] || [],
          }))
        );
      })
      .catch(() => {
        // Silently fail — keep empty links
      });
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMegaEnter = () => {
    if (megaTimeout.current) clearTimeout(megaTimeout.current);
    setMegaOpen(true);
  };

  const handleMegaLeave = () => {
    megaTimeout.current = setTimeout(() => setMegaOpen(false), 200);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 bg-primary border-b transition-[border-color,box-shadow] duration-500 ${
          scrolled
            ? 'border-white/15 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.5)]'
            : 'border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-[72px]">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <div className="relative w-[90px] h-[50px] shrink-0">
              <Image
                src="/images/logo-icon.png"
                alt="United Brothers Global Logo"
                fill
                className="object-contain brightness-0 invert drop-shadow-md"
                sizes="90px"
                priority
              />
            </div>
            <div className="hidden sm:block border-l border-white/20 pl-3">
              <span className="block text-white font-medium text-[17px] font-[family-name:var(--font-heading)] leading-none tracking-tight">
                United Brothers
              </span>
              <span className="block text-white/55 text-[9px] font-medium tracking-[0.22em] uppercase leading-none mt-1.5">
                Global Trade Solutions
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden xl:flex items-center gap-1">
            {navLinks.map((link) =>
              link.hasMega ? (
                <div
                  key={link.name}
                  className="relative nav-item"
                  onMouseEnter={handleMegaEnter}
                  onMouseLeave={handleMegaLeave}
                >
                  <button
                    className={`${linkBase} flex items-center gap-1 ${divisionActive ? 'text-white after:scale-x-100' : 'text-white/70 hover:text-white'}`}
                    onClick={() => setMegaOpen(!megaOpen)}
                  >
                    {link.name}
                    <FiChevronDown
                      className={`text-xs transition-transform duration-300 ${megaOpen ? 'rotate-180' : ''}`}
                    />
                  </button>

                  {/* Mega Menu */}
                  <AnimatePresence>
                    {megaOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[920px] bg-white rounded-lg shadow-[var(--shadow-lift)] border border-surface-darker overflow-hidden"
                        onMouseEnter={handleMegaEnter}
                        onMouseLeave={handleMegaLeave}
                      >
                        <div className="p-6">
                          <p className="text-[11px] font-medium text-secondary tracking-[0.2em] uppercase mb-4 pb-3 border-b border-surface-darker">
                            Our Business Divisions
                          </p>
                          <div className="grid grid-cols-4 gap-4">
                            {divisions.map((div) => (
                              <div key={div.name} className="group">
                                <Link
                                  href={div.href}
                                  className="block p-4 rounded-md hover:bg-surface transition-colors duration-300"
                                  onClick={() => setMegaOpen(false)}
                                >
                                  <div className="h-0.5 w-8 mb-4 transition-all duration-300 group-hover:w-14" style={{ background: div.accent }} />
                                  <h3 className="text-base font-medium text-primary font-[family-name:var(--font-heading)] mb-1.5">
                                    {div.name}
                                  </h3>
                                  <p className="text-xs text-secondary leading-relaxed mb-3 min-h-[3.75rem]">
                                    {div.description}
                                  </p>
                                </Link>
                                <div className="px-4 space-y-0.5">
                                  {div.links.map((sub) => (
                                    <Link
                                      key={sub.name}
                                      href={sub.href}
                                      className="block py-1.5 text-xs text-secondary hover:text-primary hover:translate-x-1 transition-all duration-200"
                                      onClick={() => setMegaOpen(false)}
                                    >
                                      {sub.name}
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`${linkBase} ${isActive(link.href) ? 'text-white after:scale-x-100' : 'text-white/70 hover:text-white'}`}
                  aria-current={isActive(link.href) ? 'page' : undefined}
                >
                  {link.name}
                </Link>
              )
            )}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="hidden lg:inline-flex items-center gap-2 bg-eng text-primary-dark px-5 py-2.5 rounded-md text-[13px] font-semibold hover:bg-eng-light transition-colors duration-200"
            >
              Get Quote
            </Link>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="xl:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <HiX size={22} /> : <HiMenu size={22} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 xl:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 220 }}
              className="fixed top-0 right-0 bottom-0 w-80 bg-primary z-50 xl:hidden flex flex-col shadow-2xl"
            >
              <div className="flex justify-between items-center p-5 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="relative w-[70px] h-[40px]">
                    <Image src="/images/logo-icon.png" alt="UBG" fill className="object-contain brightness-0 invert" sizes="70px" />
                  </div>
                  <span className="text-white font-medium text-lg font-[family-name:var(--font-heading)]">Menu</span>
                </div>
                <button onClick={() => setMobileOpen(false)} className="text-white/60 hover:text-white p-1.5 rounded-lg hover:bg-white/10">
                  <HiX size={20} />
                </button>
              </div>

              <div className="flex flex-col p-4 gap-1 flex-1 overflow-y-auto">
                <Link
                  href="/"
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-3 rounded-lg text-sm font-medium text-white/65 hover:text-white hover:bg-white/5 transition-all"
                >
                  Home
                </Link>

                {/* Division Links */}
                <div className="mt-2 mb-1">
                  <p className="px-4 text-[10px] font-semibold tracking-[0.15em] uppercase text-white/30 mb-2">
                    Divisions
                  </p>
                  {divisions.map((div, i) => (
                    <div key={div.name}>
                      <button
                        onClick={() => setMobileDivExpanded(mobileDivExpanded === i ? null : i)}
                        className="w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium text-white/65 hover:text-white hover:bg-white/5 transition-all"
                      >
                        <span className="flex items-center gap-2">
                          <div.icon className={div.color} />
                          {div.name}
                        </span>
                        <FiChevronDown
                          className={`text-xs transition-transform duration-300 ${mobileDivExpanded === i ? 'rotate-180' : ''}`}
                        />
                      </button>
                      <AnimatePresence>
                        {mobileDivExpanded === i && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <Link
                              href={div.href}
                              onClick={() => setMobileOpen(false)}
                              className="block px-8 py-2 text-xs font-semibold text-white/50 hover:text-white transition-colors"
                            >
                              View All →
                            </Link>
                            {div.links.map((sub) => (
                              <Link
                                key={sub.name}
                                href={sub.href}
                                onClick={() => setMobileOpen(false)}
                                className="block px-8 py-2 text-sm text-white/40 hover:text-white transition-colors"
                              >
                                {sub.name}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>

                <Link href="/about" onClick={() => setMobileOpen(false)} className="px-4 py-3 rounded-lg text-sm font-medium text-white/65 hover:text-white hover:bg-white/5 transition-all">
                  About Us
                </Link>
                <Link href="/blog" onClick={() => setMobileOpen(false)} className="px-4 py-3 rounded-lg text-sm font-medium text-white/65 hover:text-white hover:bg-white/5 transition-all">
                  Blog
                </Link>
                <Link href="/contact" onClick={() => setMobileOpen(false)} className="px-4 py-3 rounded-lg text-sm font-medium text-white/65 hover:text-white hover:bg-white/5 transition-all">
                  Contact
                </Link>
              </div>

              <div className="p-4 border-t border-white/10">
                <Link
                  href="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="block bg-eng text-primary-dark text-center py-3 rounded-md font-semibold text-sm hover:bg-eng-light transition-colors"
                >
                  Get Quote
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
