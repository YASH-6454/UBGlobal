import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import BreadcrumbNav from '../components/layout/BreadcrumbNav';
import WhatsAppButton from '../components/ui/WhatsAppButton';
import ScrollToTop from '../components/ui/ScrollToTop';
import ContactContent from './ContactContent';

export const metadata = {
  title: 'Contact Us',
  description: 'Get in touch with United Brothers Global for Engineering Materials, Fruits & Vegetables export, or IT Services. Based in Mumbai, India. Call +91 7887799370 or email info@ubglobal.in.',
  openGraph: {
    title: 'Contact United Brothers Global',
    description: 'Reach out for a quote on engineering materials, fresh produce, or IT solutions. Response within 24 hours.',
  },
};

export default function ContactPage() {
  const contactSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'United Brothers Global',
    image: 'https://ubglobal.in/images/logo-full.png',
    telephone: '+91-7887799370',
    email: 'info@ubglobal.in',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Mumbai',
      addressRegion: 'Maharashtra',
      addressCountry: 'IN',
    },
    openingHours: ['Mo-Fr 09:00-18:00', 'Sa 09:00-14:00'],
    url: 'https://ubglobal.in/contact',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema).replace(/</g, '\\u003c') }}
      />
      <Navbar />
      <main className="pt-[72px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <BreadcrumbNav items={[{ name: 'Contact Us' }]} />
        </div>
        <ContactContent />
      </main>
      <Footer />
      <WhatsAppButton />
      <ScrollToTop />
    </>
  );
}
