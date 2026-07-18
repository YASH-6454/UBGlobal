import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import BreadcrumbNav from '../../components/layout/BreadcrumbNav';
import WhatsAppButton from '../../components/ui/WhatsAppButton';
import ScrollToTop from '../../components/ui/ScrollToTop';
import ProductDetail from '../../components/ui/ProductDetail';

export const metadata = {
  title: 'Private Label (OEM) Manufacturing & Custom Packaging | Handcrafts',
  description: 'Private label and OEM manufacturing of handcrafted products from India. Custom retail packaging, white-label diyas, tea light holders, and festival items for global brands.',
};

const productData = {
  productName: 'Private Label (OEM) Manufacturing & Custom Packaging',
  division: 'handcrafts',
  description: 'United Brothers Global offers end-to-end private label and OEM manufacturing services for handcrafted products. Whether you are a retail chain, e-commerce brand, or corporate gifting company — we can manufacture any of our products under your brand name with custom designs, packaging, and specifications. Our manufacturing facility supports large-volume production with consistent quality control, ensuring your brand standards are met in every piece. From concept to delivery, we handle the entire process.',
  image: '/images/hero-bg.png',
  specs: [
    'Services: OEM manufacturing, white-label production, custom design',
    'Products: Diyas, tea light holders, pooja items, décor items, gift sets',
    'Packaging: Custom retail boxes, branded inserts, barcode labels',
    'MOQ: 2,000–5,000 pieces depending on product type',
    'Lead Time: 3–6 weeks for samples, 6–10 weeks for bulk production',
  ],
  applications: [
    { title: 'Retail Chains & Supermarkets', desc: 'White-label handcrafted products for seasonal and year-round retail shelves.' },
    { title: 'E-commerce Brands', desc: 'Custom branded products with individual packaging for Amazon, Etsy, and direct-to-consumer stores.' },
    { title: 'Corporate & Promotional', desc: 'Branded gift sets and promotional items for corporate events, conferences, and employee gifting programs.' },
  ],
  relatedProducts: [
    { name: 'Diyas', href: '/handcrafts/diyas', image: '/images/hero-bg.png' },
    { name: 'Tea Light Holders', href: '/handcrafts/tea-light-holders', image: '/images/hero-bg.png' },
    { name: 'Festival Decor & Gifts', href: '/handcrafts/festival-decor', image: '/images/hero-bg.png' },
  ],
  faqs: [
    { question: 'What is the process for starting a private label order?', answer: 'Step 1: Share your requirements (product type, design, quantity, packaging). Step 2: We create samples (1–2 weeks). Step 3: Approve samples and confirm order. Step 4: Bulk production (4–8 weeks). Step 5: Quality check and shipment.' },
    { question: 'Can you match a specific design or product from another brand?', answer: 'We can create products inspired by design references while ensuring originality. Share images and specifications, and our design team will develop custom molds and finishes tailored to your brand identity.' },
  ],
};

export default function PrivateLabelPage() {
  return (
    <>
      <Navbar />
      <main className="pt-[72px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <BreadcrumbNav items={[{ name: 'Handcrafts', href: '/handcrafts' }, { name: 'Private Label / OEM' }]} />
        </div>
        <ProductDetail {...productData} />
      </main>
      <Footer />
      <WhatsAppButton />
      <ScrollToTop />
    </>
  );
}
