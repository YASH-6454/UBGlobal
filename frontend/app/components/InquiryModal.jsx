'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiSend, FiCheck, FiAlertCircle } from 'react-icons/fi';

export default function InquiryModal({ isOpen, onClose, productName = '' }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState('idle');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setStatus('loading');
    try {
      const payload = {
        access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY,
        subject: `Product Inquiry: ${productName} — UB Global`,
        from_name: 'UB Global Website',
        name: form.name,
        email: form.email,
        phone: form.phone,
        message: `[Product: ${productName}] ${form.message}`,
      };
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        setStatus('success');
        setForm({ name: '', email: '', phone: '', message: '' });
        setTimeout(() => { setStatus('idle'); onClose(); }, 2000);
      } else setStatus('error');
    } catch { setStatus('error'); }
    setTimeout(() => { if (status === 'error') setStatus('idle'); }, 3000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/60 z-50" onClick={onClose} />
          <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-lg mx-4">
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              <div className="gradient-primary p-6 flex items-center justify-between">
                <div>
                  <h3 className="text-white font-bold text-lg font-[Poppins]">Product Inquiry</h3>
                  <p className="text-accent text-sm mt-1">{productName}</p>
                </div>
                <button onClick={onClose} className="text-white/70 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-colors"><FiX size={20} /></button>
              </div>
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <input type="text" placeholder="Your Name *" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required className="w-full px-4 py-3 rounded-lg border border-surface-darker bg-surface text-primary text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent" />
                <input type="email" placeholder="Email Address *" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required className="w-full px-4 py-3 rounded-lg border border-surface-darker bg-surface text-primary text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent" />
                <input type="tel" placeholder="Phone Number" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full px-4 py-3 rounded-lg border border-surface-darker bg-surface text-primary text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent" />
                <textarea placeholder="Describe your requirement *" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required rows={3} className="w-full px-4 py-3 rounded-lg border border-surface-darker bg-surface text-primary text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent resize-none" />
                <button type="submit" disabled={status === 'loading'} className="w-full gradient-accent text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:shadow-lg transition-all disabled:opacity-60">
                  {status === 'loading' ? <><div className="loader-ring w-5 h-5" /> Sending...</> : status === 'success' ? <><FiCheck /> Sent!</> : status === 'error' ? <><FiAlertCircle /> Failed</> : <><FiSend /> Send Inquiry</>}
                </button>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
