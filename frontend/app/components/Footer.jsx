'use client';
import Image from 'next/image';
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
import { FaLinkedinIn, FaTwitter, FaFacebookF, FaInstagram } from 'react-icons/fa';

const quickLinks = [
  { name: 'About Us', href: '#about' }, { name: 'Products', href: '#products' },
  { name: 'Why Choose Us', href: '#why-us' }, { name: 'Global Presence', href: '#global' },
  { name: 'Contact', href: '#contact' },
];
const productLinks = [
  { name: 'Bright Bars', href: '#products' }, { name: 'Black Bars', href: '#products' },
  { name: 'Alloy Steel', href: '#products' }, { name: 'Carbon Steel', href: '#products' },
];
const socials = [
  { icon: FaLinkedinIn, href: '#', label: 'LinkedIn' }, { icon: FaTwitter, href: '#', label: 'Twitter' },
  { icon: FaFacebookF, href: '#', label: 'Facebook' }, { icon: FaInstagram, href: '#', label: 'Instagram' },
];

export default function Footer() {
  const scrollTo = (e, href) => { e.preventDefault(); document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' }); };
  return (
    <footer className="gradient-primary text-white">
      <div className="h-1 gradient-accent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="relative w-[130px] h-[70px] shrink-0">
                <Image src="/images/logo-icon.png" alt="UBG Logo" fill className="object-contain brightness-0 invert drop-shadow-md" sizes="130px" />
              </div>
              <div>
                <h3 className="font-bold text-base font-[Poppins] leading-tight">United Brothers</h3>
                <p className="text-accent text-[9px] font-semibold tracking-[0.15em] uppercase">Global Trade Solutions</p>
              </div>
            </div>
            <p className="text-white/50 text-sm leading-relaxed mb-5 max-w-xs">Your trusted partner for premium engineering materials — delivering worldwide.</p>
            <div className="flex gap-2.5">
              {socials.map((s, i) => (
                <a key={i} href={s.href} aria-label={s.label} className="w-9 h-9 bg-white/[0.08] rounded-lg flex items-center justify-center hover:bg-accent transition-colors duration-300">
                  <s.icon className="text-sm" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-sm font-[Poppins] mb-5">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((l, i) => <li key={i}><a href={l.href} onClick={(e) => scrollTo(e, l.href)} className="text-white/50 text-sm hover:text-accent transition-colors">{l.name}</a></li>)}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-bold text-sm font-[Poppins] mb-5">Products</h4>
            <ul className="space-y-3">
              {productLinks.map((p, i) => <li key={i}><a href={p.href} onClick={(e) => scrollTo(e, p.href)} className="text-white/50 text-sm hover:text-accent transition-colors">{p.name}</a></li>)}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-sm font-[Poppins] mb-5">Contact</h4>
            <div className="space-y-4">
              {[
                { icon: FiMapPin, text: 'Mumbai, Maharashtra, India' },
                { icon: FiMail, text: 'info@ubglobal.in' },
                { icon: FiPhone, text: '+91 7887799370 /+91 93700 30733' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <item.icon className="text-accent text-sm mt-0.5 shrink-0" />
                  <span className="text-white/50 text-sm break-all">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/[0.08] pt-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/30 text-sm">&copy; {new Date().getFullYear()} United Brothers Global. All rights reserved.</p>
          <p className="text-white/20 text-xs">Import &bull; Export &bull; Trade Solutions</p>
        </div>
      </div>
    </footer>
  );
}
