'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiMail, FiPhone, FiMapPin, FiSend, FiCheck, FiAlertCircle, FiChevronDown } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import SectionHeader from '../components/sections/SectionHeader';

const COUNTRY_CODES = [
  { code: '+91', country: 'India', flag: '🇮🇳', length: 10 },
  { code: '+1', country: 'USA/Canada', flag: '🇺🇸', length: 10 },
  { code: '+44', country: 'UK', flag: '🇬🇧', length: 10 },
  { code: '+971', country: 'UAE', flag: '🇦🇪', min: 7, max: 9 },
  { code: '+65', country: 'Singapore', flag: '🇸🇬', length: 8 },
  { code: '+61', country: 'Australia', flag: '🇦🇺', length: 9 },
  { code: '+49', country: 'Germany', flag: '🇩🇪', min: 10, max: 11 },
  { code: '+33', country: 'France', flag: '🇫🇷', length: 9 },
  { code: '+81', country: 'Japan', flag: '🇯🇵', length: 10 },
  { code: '+86', country: 'China', flag: '🇨🇳', length: 11 },
  { code: '+966', country: 'Saudi Arabia', flag: '🇸🇦', length: 9 },
  { code: '+974', country: 'Qatar', flag: '🇶🇦', length: 8 },
  { code: '+965', country: 'Kuwait', flag: '🇰🇼', length: 8 },
];

const DIVISIONS = [
  { value: '', label: 'Select Division' },
  { value: 'engineering', label: '🔧 Engineering Materials' },
  { value: 'agriculture', label: '🌿 Fruits & Vegetables' },
  { value: 'it-services', label: '💻 IT Services' },
  { value: 'handcrafts', label: '🏺 Handcrafts' },
  { value: 'general', label: '📋 General Inquiry' },
];

export default function ContactContent() {
  const [ref, inView] = useInView({ threshold: 0.05, triggerOnce: true });
  const [form, setForm] = useState({ name: '', email: '', countryCode: '+91', phone: '', division: '', company: '', message: '' });
  const [status, setStatus] = useState('idle');
  const [errors, setErrors] = useState({});

  const validateField = (name, value, currentCountryCode) => {
    let error = '';
    const code = currentCountryCode || form.countryCode;

    if (name === 'name') {
      if (!value.trim()) error = 'Full Name is required';
      else if (value.trim().length < 2) error = 'Name must be at least 2 characters';
      else if (!/^[a-zA-Z\s'-]+$/.test(value.trim())) error = 'Name contains invalid characters';
    } else if (name === 'email') {
      if (!value.trim()) error = 'Email Address is required';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = 'Invalid email format';
    } else if (name === 'phone') {
      if (value.trim()) {
        const country = COUNTRY_CODES.find(c => c.code === code);
        const digits = value.replace(/\D/g, '');
        if (country) {
          if (country.length && digits.length !== country.length) {
            error = `Should be ${country.length} digits for ${country.country}`;
          } else if (country.min && (digits.length < country.min || digits.length > country.max)) {
            error = `Should be ${country.min}-${country.max} digits`;
          }
        } else if (!/^[\d\s-]{7,15}$/.test(value)) {
          error = 'Invalid phone number';
        }
      }
    } else if (name === 'division') {
      if (!value) error = 'Please select a division';
    } else if (name === 'message') {
      if (!value.trim()) error = 'Please describe your requirement';
      else if (value.trim().length < 10) error = 'Message must be at least 10 characters';
      else if (value.trim().length > 5000) error = 'Message must be under 5000 characters';
    } else if (name === 'company') {
      if (value.trim() && value.trim().length < 2) error = 'Company name must be at least 2 characters';
    }
    return error;
  };

  const validate = () => {
    const newErrors = {};
    ['name', 'email', 'phone', 'division', 'message'].forEach(key => {
      const error = validateField(key, form[key]);
      if (error) newErrors[key] = error;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (name === 'countryCode') {
      const phoneError = validateField('phone', form.phone, value);
      setErrors(prev => ({ ...prev, phone: phoneError }));
    } else {
      const error = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus('loading');

    try {
      const fullPhone = form.phone ? `${form.countryCode} ${form.phone}` : 'Not provided';
      const divLabel = DIVISIONS.find(d => d.value === form.division)?.label || form.division;

      // Send to backend API
      const backendRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: fullPhone,
          message: `[Division: ${divLabel}] [Company: ${form.company || 'N/A'}] ${form.message}`,
        }),
      }).catch(() => null);

      // Also send via Web3Forms as backup
      if (process.env.NEXT_PUBLIC_WEB3FORMS_KEY) {
        await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY,
            name: form.name,
            email: form.email,
            phone: fullPhone,
            division: divLabel,
            company: form.company || 'N/A',
            message: form.message,
            subject: `New Inquiry: ${divLabel} — UB Global`,
            from_name: 'UB Global Website',
          }),
        }).catch(() => null);
      }

      setStatus('success');
      setForm({ name: '', email: '', countryCode: '+91', phone: '', division: '', company: '', message: '' });
      setErrors({});
    } catch (err) {
      console.error('Submission Error:', err);
      setStatus('error');
    }

    setTimeout(() => setStatus('idle'), 5000);
  };

  const inputClass = (field) => `w-full px-4 py-3 rounded-xl border ${errors[field] ? 'border-red-400 ring-1 ring-red-100' : 'border-surface-darker'} bg-white text-primary text-sm focus:outline-none focus:ring-2 focus:ring-eng/20 focus:border-eng transition-all placeholder:text-secondary-light`;

  return (
    <section className="py-8 sm:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <SectionHeader label="Contact Us" title="Get in Touch" description="Have a requirement? Send us your inquiry and we'll get back to you within 24 hours." />

        <div className="grid lg:grid-cols-5 gap-8 items-start">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5, delay: 0.15 }} className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="bg-surface rounded-2xl p-6 sm:p-8 border border-surface-darker/40" noValidate>
              <div className="grid sm:grid-cols-2 gap-5 mb-5">
                <div>
                  <label htmlFor="contact-name" className="text-sm font-medium text-primary mb-2 block">Full Name *</label>
                  <input id="contact-name" type="text" name="name" value={form.name} onChange={handleChange} className={inputClass('name')} placeholder="John Doe" />
                  {errors.name && <p className="text-red-500 text-xs mt-1 font-medium">{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="contact-email" className="text-sm font-medium text-primary mb-2 block">Email Address *</label>
                  <input id="contact-email" type="email" name="email" value={form.email} onChange={handleChange} className={inputClass('email')} placeholder="john@company.com" />
                  {errors.email && <p className="text-red-500 text-xs mt-1 font-medium">{errors.email}</p>}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-5 mb-5">
                <div>
                  <label htmlFor="contact-division" className="text-sm font-medium text-primary mb-2 block">Division *</label>
                  <div className="relative">
                    <select id="contact-division" name="division" value={form.division} onChange={handleChange} className={`${inputClass('division')} appearance-none cursor-pointer`}>
                      {DIVISIONS.map(d => <option key={d.value} value={d.value}>{d.label}</option>)}
                    </select>
                    <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-primary/50 pointer-events-none" />
                  </div>
                  {errors.division && <p className="text-red-500 text-xs mt-1 font-medium">{errors.division}</p>}
                </div>
                <div>
                  <label htmlFor="contact-company" className="text-sm font-medium text-primary mb-2 block">Company Name</label>
                  <input id="contact-company" type="text" name="company" value={form.company} onChange={handleChange} className={inputClass('company')} placeholder="Your Company Ltd." />
                  {errors.company && <p className="text-red-500 text-xs mt-1 font-medium">{errors.company}</p>}
                </div>
              </div>

              <div className="mb-5">
                <label htmlFor="contact-phone" className="text-sm font-medium text-primary mb-2 block">Phone Number</label>
                <div className="flex gap-2">
                  <div className="relative flex items-center shrink-0">
                    <select name="countryCode" value={form.countryCode} onChange={handleChange} className="pl-3 pr-8 py-3 rounded-xl border border-surface-darker bg-white text-primary text-sm focus:outline-none focus:ring-2 focus:ring-eng/20 focus:border-eng transition-all cursor-pointer w-auto appearance-none">
                      {COUNTRY_CODES.map(c => <option key={c.code} value={c.code}>{c.flag} {c.code}</option>)}
                    </select>
                    <FiChevronDown className="absolute right-2.5 text-primary/50 pointer-events-none" />
                  </div>
                  <input id="contact-phone" type="tel" name="phone" value={form.phone} onChange={handleChange} className={inputClass('phone')} placeholder="98765 43210" />
                </div>
                {errors.phone && <p className="text-red-500 text-xs mt-1 font-medium">{errors.phone}</p>}
              </div>

              <div className="mb-6">
                <label htmlFor="contact-message" className="text-sm font-medium text-primary mb-2 block">Your Requirement *</label>
                <textarea id="contact-message" name="message" value={form.message} onChange={handleChange} rows={5} className={`${inputClass('message')} resize-none`} placeholder="Describe your requirements, quantities, specifications..." />
                <div className="flex justify-between mt-1">
                  {errors.message && <p className="text-red-500 text-xs font-medium">{errors.message}</p>}
                  <p className="text-xs text-secondary-light ml-auto">{form.message.length}/5000</p>
                </div>
              </div>

              <button type="submit" disabled={status === 'loading'}
                className={`w-full py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-300 ${
                  status === 'success' ? 'bg-green-500 text-white' :
                  status === 'error' ? 'bg-red-500 text-white' :
                  'gradient-eng text-white hover:shadow-lg hover:shadow-eng/25'
                } disabled:opacity-60`}
              >
                {status === 'loading' ? <><div className="loader-ring w-5 h-5" /> Sending...</> :
                  status === 'success' ? <><FiCheck /> Sent Successfully!</> :
                  status === 'error' ? <><FiAlertCircle /> Failed — Try Again</> :
                  <><FiSend /> Send Inquiry</>}
              </button>
            </form>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5, delay: 0.25 }} className="lg:col-span-2 flex flex-col gap-6">
            <div className="bg-primary rounded-2xl p-7 text-white">
              <h3 className="text-lg font-bold font-[family-name:var(--font-poppins)] mb-6">Contact Information</h3>
              <div className="space-y-5">
                {[
                  { icon: FiMapPin, label: 'Office Address', value: 'Mumbai, Maharashtra, India' },
                  { icon: FiMail, label: 'Email', value: 'info@ubglobal.in' },
                  { icon: FiPhone, label: 'Phone', value: '+91 7887799370 / +91 93700 30733' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center shrink-0"><item.icon className="text-eng text-sm" /></div>
                    <div><div className="font-medium text-sm">{item.label}</div><div className="text-white/55 text-sm mt-0.5">{item.value}</div></div>
                  </div>
                ))}
              </div>
              <a href="https://wa.me/917887799370" target="_blank" rel="noopener noreferrer" className="mt-6 w-full flex items-center justify-center gap-2 bg-[#25D366] text-white py-3 rounded-xl font-semibold text-sm hover:bg-[#20BD5A] transition-colors">
                <FaWhatsapp className="text-lg" /> Chat on WhatsApp
              </a>
            </div>
            <div className="bg-surface rounded-2xl p-7 border border-surface-darker/40">
              <h3 className="text-base font-bold text-primary font-[family-name:var(--font-poppins)] mb-4">Business Hours</h3>
              <div className="space-y-3 text-sm text-secondary">
                <div className="flex justify-between"><span>Monday – Friday</span><span className="font-medium text-primary">9:00 AM – 6:00 PM</span></div>
                <div className="flex justify-between"><span>Saturday</span><span className="font-medium text-primary">9:00 AM – 2:00 PM</span></div>
                <div className="flex justify-between"><span>Sunday</span><span className="text-red-500 font-medium">Closed</span></div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
