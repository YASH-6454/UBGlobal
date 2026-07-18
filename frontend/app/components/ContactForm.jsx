'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiMail, FiPhone, FiMapPin, FiSend, FiCheck, FiAlertCircle, FiChevronDown } from 'react-icons/fi';

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

export default function ContactForm() {
  const [ref, inView] = useInView({ threshold: 0.05, triggerOnce: true });
  const [form, setForm] = useState({ name: '', email: '', countryCode: '+91', phone: '', message: '' });
  const [status, setStatus] = useState('idle');
  const [errors, setErrors] = useState({});

  const validateField = (name, value, currentCountryCode) => {
    let error = '';
    const code = currentCountryCode || form.countryCode;

    if (name === 'name') {
      if (!value.trim()) error = 'Full Name is required';
      else if (value.trim().length < 2) error = 'Name must be at least 2 characters';
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
    } else if (name === 'message') {
      if (!value.trim()) error = 'Please describe your requirement';
      else if (value.trim().length < 10) error = 'Message must be at least 10 characters';
    }
    return error;
  };

  const validate = () => {
    const newErrors = {};
    ['name', 'email', 'phone', 'message'].forEach(key => {
      const error = validateField(key, form[key]);
      if (error) newErrors[key] = error;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedForm = { ...form, [name]: value };
    setForm(updatedForm);

    // Real-time validation
    if (name === 'countryCode') {
      // Re-validate phone when country code changes
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

    if (!process.env.NEXT_PUBLIC_WEB3FORMS_KEY) {
      console.error('Web3Forms Access Key is missing!');
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
      return;
    }

    try {
      const fullPhone = `${form.countryCode} ${form.phone}`;
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY,
          ...form,
          phone: fullPhone,
          subject: 'New Inquiry from UB Global Website',
          from_name: form.name,
        }),
      });

      const result = await response.json();
      if (result.success) {
        setStatus('success');
        setForm({ name: '', email: '', countryCode: '+91', phone: '', message: '' });
      } else {
        console.error('Web3Forms Error:', result);
        setStatus('error');
      }
    } catch (err) {
      console.error('Submission Error:', err);
      setStatus('error');
    }

    setTimeout(() => setStatus('idle'), 5000);
  };

  const inputClass = (field) => `w-full px-4 py-3 rounded-xl border ${errors[field] ? 'border-red-400 ring-1 ring-red-100' : 'border-surface-darker'} bg-white text-primary text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all placeholder:text-secondary-light`;

  return (
    <section id="contact" className="py-20 sm:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="text-center mb-14">
          <span className="text-accent font-semibold text-xs tracking-[0.2em] uppercase">Contact Us</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mt-3 mb-4 font-[Poppins]">Get in Touch</h2>
          <div className="section-divider mx-auto mb-5" />
          <p className="text-secondary max-w-2xl mx-auto text-base">Have a requirement? Send us your inquiry and we&apos;ll get back to you within 24 hours.</p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8 items-start">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5, delay: 0.15 }} className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="bg-surface rounded-2xl p-6 sm:p-8 border border-surface-darker/40">
              <div className="grid sm:grid-cols-2 gap-5 mb-5">
                <div>
                  <label className="text-sm font-medium text-primary mb-2 block">Full Name *</label>
                  <input type="text" name="name" value={form.name} onChange={handleChange} className={inputClass('name')} placeholder="John Doe" />
                  {errors.name && <p className="text-red-500 text-xs mt-1 font-medium">{errors.name}</p>}
                </div>
                <div>
                  <label className="text-sm font-medium text-primary mb-2 block">Email Address *</label>
                  <input type="email" name="email" value={form.email} onChange={handleChange} className={inputClass('email')} placeholder="john@company.com" />
                  {errors.email && <p className="text-red-500 text-xs mt-1 font-medium">{errors.email}</p>}
                </div>
              </div>
              <div className="mb-5">
                <label className="text-sm font-medium text-primary mb-2 block">Phone Number</label>
                <div className="flex gap-2">
                  <div className="relative flex items-center shrink-0">
                    <select
                      name="countryCode"
                      value={form.countryCode}
                      onChange={handleChange}
                      className="pl-3 pr-8 py-3 rounded-xl border border-surface-darker bg-white text-primary text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all cursor-pointer w-auto appearance-none"
                    >
                      {COUNTRY_CODES.map(c => (
                        <option key={c.code} value={c.code}>{c.flag} {c.code}</option>
                      ))}
                    </select>
                    <FiChevronDown className="absolute right-2.5 text-primary/50 pointer-events-none" />
                  </div>
                  <input type="tel" name="phone" value={form.phone} onChange={handleChange} className={inputClass('phone')} placeholder="98765 43210" />
                </div>
                {errors.phone && <p className="text-red-500 text-xs mt-1 font-medium">{errors.phone}</p>}
              </div>
              <div className="mb-6">
                <label className="text-sm font-medium text-primary mb-2 block">Your Requirement *</label>
                <textarea name="message" value={form.message} onChange={handleChange} rows={5} className={`${inputClass('message')} resize-none`} placeholder="Describe your material requirements, quantities, specifications..." />
                {errors.message && <p className="text-red-500 text-xs mt-1 font-medium">{errors.message}</p>}
              </div>
              <button type="submit" disabled={status === 'loading'}
                className={`w-full py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-300 ${status === 'success' ? 'bg-green-500 text-white' : status === 'error' ? 'bg-red-500 text-white' : 'gradient-accent text-white hover:shadow-lg hover:shadow-accent/25'
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
              <h3 className="text-lg font-bold font-[Poppins] mb-6">Contact Information</h3>
              <div className="space-y-5">
                {[
                  { icon: FiMapPin, label: 'Office Address', value: 'Mumbai, Maharashtra, India' },
                  { icon: FiMail, label: 'Email', value: 'info@ubglobal.in' },
                  { icon: FiPhone, label: 'Phone', value: '+91 7887799370 /+91 93700 30733' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center shrink-0"><item.icon className="text-accent text-sm" /></div>
                    <div><div className="font-medium text-sm">{item.label}</div><div className="text-white/55 text-sm mt-0.5">{item.value}</div></div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-surface rounded-2xl p-7 border border-surface-darker/40">
              <h3 className="text-base font-bold text-primary font-[Poppins] mb-4">Business Hours</h3>
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
