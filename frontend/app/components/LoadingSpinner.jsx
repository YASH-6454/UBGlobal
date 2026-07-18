'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export default function LoadingSpinner() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] gradient-primary flex flex-col items-center justify-center"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center"
          >
            {/* Logo mark */}
            <div className="relative w-20 h-20 mb-6">
              <Image
                src="/images/logo-icon.png"
                alt="UBG Logo"
                fill
                className="object-contain brightness-0 invert drop-shadow-lg"
                sizes="80px"
                priority
              />
            </div>
            <div className="loader-ring w-8 h-8 mb-4" />
            <p className="text-white/50 text-xs font-semibold tracking-[0.25em] uppercase">Loading</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
