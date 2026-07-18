import Image from 'next/image';
import Link from 'next/link';
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
import { FaLinkedinIn, FaTwitter, FaFacebookF, FaInstagram } from 'react-icons/fa';
import { GiSteelClaws, GiWheat, GiProcessor, GiFlame } from 'react-icons/gi';

const divisionLinks = [
  {
    title: 'Engineering Materials',
    icon: GiSteelClaws,
    color: 'text-eng',
    links: [
      { name: 'Bright Bars', href: '/engineering/bright-bars' },
      { name: 'Black Bars', href: '/engineering/black-bars' },
      { name: 'Alloy Steel', href: '/engineering/alloy-steel' },
      { name: 'Carbon Steel', href: '/engineering/carbon-steel' },
    ],
  },
  {
    title: 'Agriculture',
    icon: GiWheat,
    color: 'text-agri',
    links: [
      { name: 'Fresh Fruits', href: '/agriculture/fruits' },
      { name: 'Vegetables', href: '/agriculture/vegetables' },
      { name: 'Spices', href: '/agriculture/spices' },
    ],
  },
  {
    title: 'IT Services',
    icon: GiProcessor,
    color: 'text-it',
    links: [
      { name: 'Web Development', href: '/it-services/web-development' },
      { name: 'App Development', href: '/it-services/app-development' },
      { name: 'Cloud & DevOps', href: '/it-services/cloud-devops' },
    ],
  },
  {
    title: 'Handcrafts',
    icon: GiFlame,
    color: 'text-craft',
    links: [
      { name: 'Diyas', href: '/handcrafts/diyas' },
      { name: 'Tea Light Holders', href: '/handcrafts/tea-light-holders' },
      { name: 'Pooja Accessories', href: '/handcrafts/pooja-accessories' },
      { name: 'Festival Decor', href: '/handcrafts/festival-decor' },
      { name: 'Private Label', href: '/handcrafts/private-label' },
    ],
  },
];

const quickLinks = [
  { name: 'Home', href: '/' },
  { name: 'About Us', href: '/about' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact', href: '/contact' },
];

const certifications = [
  'APEDA Certified',
  'FSSAI Licensed',
];

const socials = [
  { icon: FaLinkedinIn, href: '#', label: 'LinkedIn' },
  { icon: FaTwitter, href: '#', label: 'Twitter' },
  { icon: FaFacebookF, href: '#', label: 'Facebook' },
  { icon: FaInstagram, href: '#', label: 'Instagram' },
];

export default function Footer() {
  return (
    <footer className="gradient-primary text-white">
      <div className="h-1 bg-gradient-to-r from-eng via-agri to-it" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-10 mb-12">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="relative w-[100px] h-[55px] shrink-0">
                <Image src="/images/logo-icon.png" alt="United Brothers Global Logo" fill className="object-contain brightness-0 invert drop-shadow-md" sizes="100px" />
              </div>
            </div>
            <p className="text-white/50 text-sm leading-relaxed mb-4 max-w-xs">
              Your trusted partner for premium engineering materials, fresh produce, and IT solutions — delivering worldwide.
            </p>
            <div className="flex flex-wrap gap-2 mb-5">
              {certifications.map((cert, i) => (
                <span key={i} className="px-3 py-1 bg-white/[0.08] rounded-full text-[10px] font-semibold text-white/60 tracking-wide">
                  {cert}
                </span>
              ))}
            </div>
            <div className="flex gap-2.5">
              {socials.map((s, i) => (
                <a key={i} href={s.href} aria-label={s.label} className="w-9 h-9 bg-white/[0.08] rounded-lg flex items-center justify-center hover:bg-eng transition-colors duration-300">
                  <s.icon className="text-sm" />
                </a>
              ))}
            </div>
          </div>

          {/* Division Links */}
          {divisionLinks.map((div, i) => (
            <div key={i}>
              <h4 className="font-bold text-sm font-[family-name:var(--font-poppins)] mb-5 flex items-center gap-2">
                <div.icon className={`${div.color} text-base`} />
                {div.title}
              </h4>
              <ul className="space-y-3">
                {div.links.map((l, j) => (
                  <li key={j}>
                    <Link href={l.href} className="text-white/50 text-sm hover:text-white transition-colors duration-200">
                      {l.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact + Quick Links */}
          <div>
            <h4 className="font-bold text-sm font-[family-name:var(--font-poppins)] mb-5">Quick Links</h4>
            <ul className="space-y-3 mb-6">
              {quickLinks.map((l, i) => (
                <li key={i}>
                  <Link href={l.href} className="text-white/50 text-sm hover:text-white transition-colors duration-200">
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
            <h4 className="font-bold text-sm font-[family-name:var(--font-poppins)] mb-4">Contact</h4>
            <div className="space-y-3">
              {[
                { icon: FiMapPin, text: 'Mumbai, Maharashtra, India' },
                { icon: FiMail, text: 'info@ubglobal.in' },
                { icon: FiPhone, text: '+91 7887799370' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <item.icon className="text-eng text-sm mt-0.5 shrink-0" />
                  <span className="text-white/50 text-sm break-all">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/[0.08] pt-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/30 text-sm">&copy; {new Date().getFullYear()} United Brothers Global. All rights reserved.</p>
          <p className="text-white/20 text-xs">Engineering Materials &bull; Fruits & Vegetables &bull; IT Services &bull; Handcrafts</p>
        </div>
      </div>
    </footer>
  );
}
