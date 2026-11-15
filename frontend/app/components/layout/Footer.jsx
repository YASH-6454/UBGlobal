import Image from 'next/image';
import Link from 'next/link';
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
import { FaLinkedinIn, FaTwitter, FaFacebookF, FaInstagram } from 'react-icons/fa';

const divisionLinks = [
  {
    title: 'Engineering Materials',
    links: [
      { name: 'Bright Bars', href: '/engineering/bright-bars' },
      { name: 'Black Bars', href: '/engineering/black-bars' },
      { name: 'Alloy Steel', href: '/engineering/alloy-steel' },
      { name: 'Carbon Steel', href: '/engineering/carbon-steel' },
    ],
  },
  {
    title: 'Agriculture',
    links: [
      { name: 'Fresh Fruits', href: '/agriculture/fruits' },
      { name: 'Vegetables', href: '/agriculture/vegetables' },
      { name: 'Spices', href: '/agriculture/spices' },
    ],
  },
  {
    title: 'IT Services',
    links: [
      { name: 'Web Development', href: '/it-services/web-development' },
      { name: 'App Development', href: '/it-services/app-development' },
      { name: 'Cloud & DevOps', href: '/it-services/cloud-devops' },
    ],
  },
  {
    title: 'Handcrafts',
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

const accents = ['#F97316', '#22C55E', '#3B82F6', '#D97706'];

const contactItems = [
  { icon: FiMapPin, label: 'Office', text: 'Mumbai, Maharashtra, India' },
  { icon: FiMail, label: 'Email', text: 'info@ubglobal.in', href: 'mailto:info@ubglobal.in' },
  { icon: FiPhone, label: 'Phone', text: '+91 7887799370', href: 'tel:+917887799370' },
];

export default function Footer() {
  // Only show social links that actually point somewhere
  const liveSocials = socials.filter((s) => s.href && s.href !== '#');

  return (
    <footer className="bg-primary-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-8">
        {/* Statement + contact */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 pb-14 border-b border-white/15">
          <div className="lg:col-span-6">
            <div className="relative w-[110px] h-[60px] mb-7">
              <Image src="/images/logo-icon.png" alt="United Brothers Global Logo" fill className="object-contain brightness-0 invert" sizes="110px" />
            </div>
            <p className="font-[family-name:var(--font-heading)] text-2xl sm:text-3xl leading-snug text-white/90 max-w-xl">
              Premium engineering materials, fresh produce and IT solutions &mdash; delivered <em className="text-eng font-normal">worldwide</em>.
            </p>
            <div className="flex flex-wrap gap-2 mt-7">
              {certifications.map((cert, i) => (
                <span key={i} className="px-3 py-1 border border-white/20 rounded-full text-[11px] font-medium text-white/65 tracking-wide">
                  {cert}
                </span>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 lg:col-start-8 grid gap-6 content-start">
            {contactItems.map((item, i) => {
              const inner = (
                <>
                  <span className="flex items-center gap-2 text-[11px] font-medium tracking-[0.2em] uppercase text-white/45 mb-1.5">
                    <item.icon className="text-eng text-sm" /> {item.label}
                  </span>
                  <span className="text-lg text-white/90 break-all">{item.text}</span>
                </>
              );
              return item.href ? (
                <a key={i} href={item.href} className="block group hover:text-white transition-colors">{inner}</a>
              ) : (
                <div key={i}>{inner}</div>
              );
            })}
            {liveSocials.length > 0 && (
              <div className="flex gap-2.5 pt-1">
                {liveSocials.map((s, i) => (
                  <a key={i} href={s.href} aria-label={s.label} className="w-9 h-9 border border-white/20 rounded-md flex items-center justify-center hover:bg-white hover:text-primary transition-colors duration-200">
                    <s.icon className="text-sm" />
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Link columns */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-x-8 gap-y-10 py-12">
          {divisionLinks.map((div, i) => (
            <div key={i}>
              <div className="h-0.5 mb-5" style={{ background: accents[i] }} />
              <p className="text-[11px] font-medium tracking-[0.2em] text-white/40 mb-1">0{i + 1}</p>
              <h4 className="font-[family-name:var(--font-heading)] text-lg font-medium mb-4">{div.title}</h4>
              <ul className="space-y-2.5">
                {div.links.map((l, j) => (
                  <li key={j}>
                    <Link href={l.href} className="text-white/60 text-sm hover:text-white transition-colors duration-200">
                      {l.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <div className="h-0.5 mb-5 bg-white/30" />
            <p className="text-[11px] font-medium tracking-[0.2em] text-white/40 mb-1">05</p>
            <h4 className="font-[family-name:var(--font-heading)] text-lg font-medium mb-4">Company</h4>
            <ul className="space-y-2.5">
              {quickLinks.map((l, i) => (
                <li key={i}>
                  <Link href={l.href} className="text-white/60 text-sm hover:text-white transition-colors duration-200">
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/15 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/45 text-sm">&copy; {new Date().getFullYear()} United Brothers Global. All rights reserved.</p>
          <p className="text-white/35 text-xs">Engineering Materials &bull; Fruits &amp; Vegetables &bull; IT Services &bull; Handcrafts</p>
        </div>
      </div>
    </footer>
  );
}
