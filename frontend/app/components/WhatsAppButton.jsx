'use client';
import { FaWhatsapp } from 'react-icons/fa';

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/917887799370?text=Hi%2C%20I%27m%20interested%20in%20your%20engineering%20materials."
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg shadow-[#25D366]/30 hover:shadow-xl hover:shadow-[#25D366]/40 hover:scale-110 transition-all duration-300 pulse-glow"
      style={{ '--tw-shadow-color': '#25D366' }}
    >
      <FaWhatsapp className="text-white text-2xl" />
    </a>
  );
}
