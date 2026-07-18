import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import BreadcrumbNav from '../../components/layout/BreadcrumbNav';
import WhatsAppButton from '../../components/ui/WhatsAppButton';
import ScrollToTop from '../../components/ui/ScrollToTop';
import ProductDetail from '../../components/ui/ProductDetail';

export const metadata = {
  title: 'Festival Decoration Items & Gift Sets | Handcrafted from India',
  description: 'Handcrafted festival decoration items and curated gift sets from India. Diwali decorations, rangoli accessories, torans, wall hangings, and premium gift boxes for global retail.',
};

const productData = {
  productName: 'Festival Decoration Items & Gift Sets',
  division: 'handcrafts',
  description: 'Celebrate every occasion with our handcrafted festival decoration items and curated gift sets. From vibrant Diwali decoration ensembles and rangoli accessories to elegant torans, wall hangings, and festive table décor — our products capture the essence of Indian festivals. Our premium gift sets combine multiple handcrafted items in beautifully designed boxes, ideal for corporate gifting, retail, and personal celebrations. All items are crafted from eco-friendly materials by skilled artisans.',
  image: '/images/hero-bg.png',
  specs: [
    'Festival Items: Diwali décor sets, rangoli kits, torans, bandarwals',
    'Gift Sets: Curated boxes with diyas, candles, sweets packaging, accessories',
    'Materials: Clay, fabric, recycled paper, natural fibers',
    'Occasions: Diwali, Navratri, Christmas, weddings, housewarming',
    'Packaging: Premium gift boxes, custom branding, retail-ready',
  ],
  applications: [
    { title: 'Retail & Supermarket Chains', desc: 'Seasonal festival decoration and gift set collections for large retailers.' },
    { title: 'Corporate Gifting', desc: 'Branded corporate gift sets for Diwali and festive season employee/client gifting.' },
    { title: 'E-commerce & Online Retail', desc: 'Individually packaged gift sets and decorations for online marketplaces.' },
  ],
  relatedProducts: [
    { name: 'Diyas', href: '/handcrafts/diyas', image: '/images/hero-bg.png' },
    { name: 'Tea Light Holders', href: '/handcrafts/tea-light-holders', image: '/images/hero-bg.png' },
    { name: 'Private Label / OEM', href: '/handcrafts/private-label', image: '/images/hero-bg.png' },
  ],
  faqs: [
    { question: 'Can you create custom gift sets with our branding?', answer: 'Yes, we specialize in creating custom gift sets with your branding, logo, and custom box design. We handle everything from product selection to packaging design and production.' },
    { question: 'What is the lead time for festival season orders?', answer: 'We recommend placing festival season orders 2–3 months in advance. For Diwali collections, orders should be confirmed by July–August for timely delivery. Rush orders can be accommodated for smaller quantities.' },
  ],
};

export default function FestivalDecorPage() {
  return (
    <>
      <Navbar />
      <main className="pt-[72px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <BreadcrumbNav items={[{ name: 'Handcrafts', href: '/handcrafts' }, { name: 'Festival Decor & Gifts' }]} />
        </div>
        <ProductDetail {...productData} />
      </main>
      <Footer />
      <WhatsAppButton />
      <ScrollToTop />
    </>
  );
}
