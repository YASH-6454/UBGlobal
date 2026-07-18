import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import BreadcrumbNav from '../../components/layout/BreadcrumbNav';
import WhatsAppButton from '../../components/ui/WhatsAppButton';
import ScrollToTop from '../../components/ui/ScrollToTop';
import ProductDetail from '../../components/ui/ProductDetail';

export const metadata = {
  title: 'Traditional & Decorative Diyas | Clay Diyas, Hand-Painted & Floating Diyas',
  description: 'Handcrafted Traditional Clay Diyas, Hand-Painted Decorative Diyas, and Floating Diyas from India. Made by skilled artisans using eco-friendly natural clay. Bulk export & OEM available.',
};

const productData = {
  productName: 'Traditional & Decorative Diyas',
  division: 'handcrafts',
  description: 'United Brothers Global offers an exquisite range of handcrafted diyas — from traditional clay diyas used in daily worship and festivals like Diwali, to intricately hand-painted decorative diyas and elegant floating diyas. Each piece is crafted by skilled Indian artisans using natural, eco-friendly clay. Our diyas come in a wide variety of sizes, shapes, and designs suitable for homes, temples, events, and gifting. We support private label manufacturing and custom retail packaging for international brands.',
  image: '/images/hero-bg.png',
  specs: [
    'Traditional Clay Diyas: Plain, terracotta, various sizes',
    'Hand-Painted Diyas: Decorative designs, vibrant colors, lacquer finish',
    'Floating Diyas: Wax-filled, decorative, multi-color options',
    'Material: Natural eco-friendly clay, non-toxic paints',
    'Packaging: Custom boxes, bulk cartons, retail-ready packaging',
  ],
  applications: [
    { title: 'Festival & Diwali Sales', desc: 'Bulk supply of traditional and decorative diyas for festival season retail.' },
    { title: 'Home Decor Stores', desc: 'Premium hand-painted diyas for home décor and lifestyle retail chains.' },
    { title: 'Event & Wedding Decor', desc: 'Floating and decorative diyas for event decoration and hospitality industry.' },
  ],
  relatedProducts: [
    { name: 'Tea Light Holders', href: '/handcrafts/tea-light-holders', image: '/images/hero-bg.png' },
    { name: 'Pooja Accessories', href: '/handcrafts/pooja-accessories', image: '/images/hero-bg.png' },
    { name: 'Festival Decor & Gifts', href: '/handcrafts/festival-decor', image: '/images/hero-bg.png' },
  ],
  faqs: [
    { question: 'What sizes are available for traditional clay diyas?', answer: 'We offer diyas in small (3–4 cm), medium (5–7 cm), and large (8–12 cm) sizes. Custom sizes can be produced for bulk orders.' },
    { question: 'Are the paints used on hand-painted diyas safe?', answer: 'Yes, all our hand-painted diyas use non-toxic, lead-free paints and lacquer finishes that are safe for indoor use and meet international safety standards.' },
  ],
};

export default function DiyasPage() {
  return (
    <>
      <Navbar />
      <main className="pt-[72px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <BreadcrumbNav items={[{ name: 'Handcrafts', href: '/handcrafts' }, { name: 'Diyas' }]} />
        </div>
        <ProductDetail {...productData} />
      </main>
      <Footer />
      <WhatsAppButton />
      <ScrollToTop />
    </>
  );
}
