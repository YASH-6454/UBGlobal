'use client';
import { useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiGlobe, FiMapPin } from 'react-icons/fi';

// Dynamic import for Leaflet (no SSR)
const LeafletMap = dynamic(() => import('./LeafletMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full rounded-2xl bg-surface flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="loader-ring w-8 h-8" />
        <span className="text-secondary text-sm">Loading interactive map...</span>
      </div>
    </div>
  ),
});

const DESTINATIONS = [
  { name: 'United States', flag: '🇺🇸' },
  { name: 'United Kingdom', flag: '🇬🇧' },
  { name: 'Germany', flag: '🇩🇪' },
  { name: 'France', flag: '🇫🇷' },
  { name: 'Italy', flag: '🇮🇹' },
  { name: 'UAE', flag: '🇦🇪' },
  { name: 'Saudi Arabia', flag: '🇸🇦' },
  { name: 'Qatar', flag: '🇶🇦' },
  { name: 'Oman', flag: '🇴🇲' },
  { name: 'Kuwait', flag: '🇰🇼' },
  { name: 'Singapore', flag: '🇸🇬' },
  { name: 'Malaysia', flag: '🇲🇾' },
  { name: 'Thailand', flag: '🇹🇭' },
  { name: 'Vietnam', flag: '🇻🇳' },
  { name: 'South Africa', flag: '🇿🇦' },
  { name: 'Nigeria', flag: '🇳🇬' },
  { name: 'Kenya', flag: '🇰🇪' },
  { name: 'Australia', flag: '🇦🇺' },
  { name: 'New Zealand', flag: '🇳🇿' },
  { name: 'Brazil', flag: '🇧🇷' },
  { name: 'Mexico', flag: '🇲🇽' },
  { name: 'Turkey', flag: '🇹🇷' },
  { name: 'Japan', flag: '🇯🇵' },
  { name: 'South Korea', flag: '🇰🇷' },
];

export default function GlobalPresence() {
  const [ref, inView] = useInView({ threshold: 0.05, triggerOnce: true });
  const [selectedCountry, setSelectedCountry] = useState(null);

  const handleCountrySelect = useCallback((name) => {
    setSelectedCountry((prev) => (prev === name ? null : name));
  }, []);

  return (
    <section id="global" className="py-20 sm:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="text-eng font-semibold text-xs tracking-[0.2em] uppercase">Global Presence</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mt-3 mb-4 font-[family-name:var(--font-poppins)]">
            Delivering Across <span className="text-gradient-eng">50+ Countries</span>
          </h2>
        </motion.div>

        {/* Interactive Map */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="relative isolate rounded-3xl mb-8 border border-surface-darker/40 shadow-2xl overflow-hidden"
        >
          <div className="w-full h-[400px] sm:h-[500px] lg:h-[550px] overflow-hidden rounded-3xl">
            <LeafletMap selectedCountry={selectedCountry} onCountrySelect={handleCountrySelect} />
          </div>

          {/* Selected indicator */}
          {selectedCountry && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute top-4 left-4 bg-white/95 backdrop-blur-md rounded-xl px-4 py-2.5 shadow-lg border border-surface-darker/30 flex items-center gap-2 z-10"
            >
              <FiMapPin className="text-eng" />
              <span className="text-sm font-semibold text-primary">
                India → {selectedCountry}
              </span>
              <button
                onClick={() => setSelectedCountry(null)}
                className="ml-2 text-xs text-secondary hover:text-red-500 transition-colors"
              >
                ✕
              </button>
            </motion.div>
          )}
        </motion.div>

        {/* Destination Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="flex items-center justify-center gap-2 mb-5">
            <FiGlobe className="text-eng" />
            <h3 className="text-base font-bold text-primary font-[family-name:var(--font-poppins)]">Export Destinations</h3>
          </div>

          <div className="flex items-center justify-center gap-2 mb-4">
            <button
              onClick={() => setSelectedCountry(null)}
              className={`px-5 py-2 text-sm rounded-full font-semibold transition-all duration-300 ${
                !selectedCountry
                  ? 'gradient-eng text-white shadow-lg shadow-eng/25'
                  : 'bg-surface text-secondary border border-surface-darker/40 hover:bg-primary/5'
              }`}
            >
              Show All Routes
            </button>
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {DESTINATIONS.map((dest, i) => (
              <motion.button
                key={dest.name}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.25, delay: 0.4 + i * 0.015 }}
                onClick={() => handleCountrySelect(dest.name)}
                className={`px-4 py-2 text-sm rounded-full border transition-all duration-300 cursor-pointer ${
                  selectedCountry === dest.name
                    ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20 scale-105'
                    : 'bg-surface text-secondary border-surface-darker/40 hover:bg-primary hover:text-white hover:border-primary hover:shadow-md'
                }`}
              >
                {dest.flag} {dest.name}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
