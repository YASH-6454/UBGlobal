'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenu, HiX } from 'react-icons/hi';
import Image from 'next/image';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Products', href: '#products' },
  { name: 'Why Us', href: '#why-us' },
  { name: 'Industries', href: '#industries' },
  { name: 'Global', href: '#global' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      // Get all sections on the page, check which one is currently in view
      const allSections = document.querySelectorAll('section[id]');
      let currentId = 'home';
      allSections.forEach((section) => {
        if (section.getBoundingClientRect().top <= 150) {
          currentId = section.id;
        }
      });
      // Map to a navLink id (e.g. testimonials → industries since testimonials isn't in nav)
      const navIds = navLinks.map((l) => l.href.replace('#', ''));
      if (navIds.includes(currentId)) {
        setActiveSection(currentId);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (e, href) => {
    e.preventDefault();
    setMobileOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-primary/95 backdrop-blur-xl shadow-2xl shadow-black/10 border-b border-white/5'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-[72px]">
          {/* Logo */}
          <a href="#home" onClick={(e) => scrollTo(e, '#home')} className="flex items-center gap-3 shrink-0">
            <div className="relative w-[90px] h-[50px] shrink-0">
              <Image
                src="/images/logo-icon.png"
                alt="UBG Logo"
                fill
                className="object-contain brightness-0 invert drop-shadow-md"
                sizes="90px"
                priority
              />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-white font-bold text-[15px] font-[Poppins] leading-tight">United Brothers</h1>
              <p className="text-accent text-[9px] font-semibold tracking-[0.18em] uppercase leading-none mt-0.5">Global Trade</p>
              <p className="text-accent text-[9px] font-semibold tracking-[0.18em] uppercase leading-none mt-0.5">Solutions</p>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden xl:flex items-center gap-0.5">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <a key={link.name} href={link.href} onClick={(e) => scrollTo(e, link.href)}
                  className={`relative px-3.5 py-2 text-[13px] font-medium rounded-md transition-all duration-300 ${
                    isActive ? 'text-accent' : 'text-white/75 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.div layoutId="navIndicator"
                      className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-5 h-[2px] bg-accent rounded-full"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <a href="#contact" onClick={(e) => scrollTo(e, '#contact')}
              className="hidden lg:inline-flex gradient-accent text-white px-5 py-2 rounded-lg text-[13px] font-semibold hover:shadow-lg hover:shadow-accent/25 transition-all duration-300 hover:-translate-y-0.5"
            >Get Quote</a>
            <button onClick={() => setMobileOpen(!mobileOpen)} className="xl:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors" aria-label="Toggle menu">
              {mobileOpen ? <HiX size={22} /> : <HiMenu size={22} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 xl:hidden" onClick={() => setMobileOpen(false)} />
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 220 }}
              className="fixed top-0 right-0 bottom-0 w-72 bg-primary z-50 xl:hidden flex flex-col shadow-2xl"
            >
              <div className="flex justify-between items-center p-5 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="relative w-[70px] h-[40px]">
                    <Image src="/images/logo-icon.png" alt="UBG" fill className="object-contain brightness-0 invert" sizes="70px" />
                  </div>
                  <span className="text-white font-bold text-base font-[Poppins]">Menu</span>
                </div>
                <button onClick={() => setMobileOpen(false)} className="text-white/60 hover:text-white p-1.5 rounded-lg hover:bg-white/10"><HiX size={20} /></button>
              </div>
              <div className="flex flex-col p-4 gap-1 flex-1 overflow-y-auto">
                {navLinks.map((link, i) => (
                  <motion.a key={link.name} href={link.href} onClick={(e) => scrollTo(e, link.href)}
                    initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}
                    className={`px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                      activeSection === link.href.replace('#', '') ? 'text-accent bg-accent/10' : 'text-white/65 hover:text-white hover:bg-white/5'
                    }`}
                  >{link.name}</motion.a>
                ))}
              </div>
              <div className="p-4 border-t border-white/10">
                <a href="#contact" onClick={(e) => scrollTo(e, '#contact')} className="block gradient-accent text-white text-center py-3 rounded-lg font-semibold text-sm">Get Quote</a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
