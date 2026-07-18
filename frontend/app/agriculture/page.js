import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import BreadcrumbNav from '../components/layout/BreadcrumbNav';
import WhatsAppButton from '../components/ui/WhatsAppButton';
import ScrollToTop from '../components/ui/ScrollToTop';
import AgricultureContent from './AgricultureContent';

export const metadata = {
  title: 'Fruits & Vegetables Export | APEDA & FSSAI Certified',
  description: 'APEDA & FSSAI certified exporter of fresh Indian produce — Alphonso Mangoes, Kesar Mangoes, Onions, Pomegranates, Bananas, Coconut, G4 Chilli, Drumstick, and more. Export quality to global markets.',
  keywords: ['fruits exporter India', 'vegetables exporter', 'alphonso mango export', 'onion exporter India', 'APEDA certified', 'FSSAI', 'fresh produce export', 'Indian spices', 'pomegranate exporter'],
};

export default function AgriculturePage() {
  return (
    <>
      <Navbar />
      <main className="pt-[72px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <BreadcrumbNav items={[{ name: 'Fruits & Vegetables' }]} />
        </div>
        <AgricultureContent />
      </main>
      <Footer />
      <WhatsAppButton />
      <ScrollToTop />
    </>
  );
}
