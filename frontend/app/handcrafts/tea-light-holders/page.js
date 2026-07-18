import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import BreadcrumbNav from '../../components/layout/BreadcrumbNav';
import WhatsAppButton from '../../components/ui/WhatsAppButton';
import ScrollToTop from '../../components/ui/ScrollToTop';
import ProductDetail from '../../components/ui/ProductDetail';

export const metadata = {
  title: 'Decorative Tea Light Holders | Handcrafted Clay & Ceramic Holders',
  description: 'Handcrafted decorative tea light holders from India. Available in clay, ceramic, and terracotta finishes. Bulk export and OEM manufacturing for global retailers.',
};

const productData = {
  productName: 'Decorative Tea Light Holders',
  division: 'handcrafts',
  description: 'Our decorative tea light holders are handcrafted from natural clay and terracotta, designed to add warm ambient lighting to any space. Available in a wide range of styles — from rustic traditional designs to contemporary geometric patterns — these holders are perfect for home décor, restaurant ambiance, wedding décor, and seasonal retail. Each piece is carefully finished and tested for candle safety. We offer custom designs and private label packaging for international retailers.',
  image: '/images/hero-bg.png',
  specs: [
    'Materials: Natural clay, terracotta, ceramic',
    'Styles: Traditional, contemporary, geometric, floral',
    'Finishes: Glazed, matte, hand-painted, metallic accent',
    'Sizes: Single tea light to multi-holder arrangements',
    'Packaging: Individual boxes, gift sets, bulk cartons',
  ],
  applications: [
    { title: 'Home Décor Retail', desc: 'Premium tea light holders for lifestyle and home décor stores.' },
    { title: 'Hospitality Industry', desc: 'Restaurant and hotel ambiance lighting with custom branded holders.' },
    { title: 'Gift & Seasonal Retail', desc: 'Festive gift sets and seasonal collections for retail chains.' },
  ],
  relatedProducts: [
    { name: 'Diyas', href: '/handcrafts/diyas', image: '/images/hero-bg.png' },
    { name: 'Festival Decor & Gifts', href: '/handcrafts/festival-decor', image: '/images/hero-bg.png' },
  ],
  faqs: [
    { question: 'Are the tea light holders heat-resistant?', answer: 'Yes, our clay and terracotta holders are naturally heat-resistant and designed to safely hold standard tea light candles without cracking or discoloration.' },
    { question: 'Can you produce holders with our custom design?', answer: 'Absolutely. We accept custom mold requests and can produce holders in any shape, size, or design. Samples are provided for approval before bulk production.' },
  ],
};

export default function TeaLightHoldersPage() {
  return (
    <>
      <Navbar />
      <main className="pt-[72px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <BreadcrumbNav items={[{ name: 'Handcrafts', href: '/handcrafts' }, { name: 'Tea Light Holders' }]} />
        </div>
        <ProductDetail {...productData} />
      </main>
      <Footer />
      <WhatsAppButton />
      <ScrollToTop />
    </>
  );
}
