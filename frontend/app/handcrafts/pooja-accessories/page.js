import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import BreadcrumbNav from '../../components/layout/BreadcrumbNav';
import WhatsAppButton from '../../components/ui/WhatsAppButton';
import ScrollToTop from '../../components/ui/ScrollToTop';
import ProductDetail from '../../components/ui/ProductDetail';

export const metadata = {
  title: 'Pooja Accessories | Handcrafted Worship Items from India',
  description: 'Handcrafted pooja accessories including incense holders, bell sets, aarti thalis, kumkum boxes, and more. Made from natural clay and metals by skilled Indian artisans.',
};

const productData = {
  productName: 'Pooja Accessories',
  division: 'handcrafts',
  description: 'Our handcrafted pooja accessories bring traditional Indian worship essentials to global markets. From beautifully crafted incense holders and aarti thalis to kumkum boxes and small deity platforms — every piece is made with devotion and artistry. These products cater to the Indian diaspora worldwide as well as wellness and spiritual lifestyle retailers. We offer bulk supply with custom packaging for temple stores, spiritual product brands, and online retailers.',
  image: '/images/hero-bg.png',
  specs: [
    'Products: Incense holders, aarti thalis, kumkum boxes, agarbatti stands',
    'Materials: Clay, brass-finish, terracotta, painted ceramic',
    'Styles: Traditional, ornate, minimalist modern',
    'Sets: Individual items and curated pooja kits',
    'Packaging: Gift boxes, retail-ready packaging, bulk cartons',
  ],
  applications: [
    { title: 'Temple & Spiritual Stores', desc: 'Wholesale supply of pooja items for temple shops and spiritual retailers.' },
    { title: 'Indian Diaspora Markets', desc: 'Essential pooja items for Indian communities worldwide — retail and online.' },
    { title: 'Wellness & Lifestyle Brands', desc: 'Meditation and mindfulness product lines with handcrafted accessories.' },
  ],
  relatedProducts: [
    { name: 'Diyas', href: '/handcrafts/diyas', image: '/images/hero-bg.png' },
    { name: 'Festival Decor & Gifts', href: '/handcrafts/festival-decor', image: '/images/hero-bg.png' },
  ],
  faqs: [
    { question: 'Do you offer complete pooja kits?', answer: 'Yes, we curate complete pooja kits with multiple accessories packaged together. These are popular for gifting and retail, especially during festival seasons like Diwali, Navratri, and Ganesh Chaturthi.' },
    { question: 'Can you supply for online retail with individual packaging?', answer: 'Yes, we provide individually packaged and labeled products ready for e-commerce fulfillment. We can include your brand labels, inserts, and custom box designs.' },
  ],
};

export default function PoojaAccessoriesPage() {
  return (
    <>
      <Navbar />
      <main className="pt-[72px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <BreadcrumbNav items={[{ name: 'Handcrafts', href: '/handcrafts' }, { name: 'Pooja Accessories' }]} />
        </div>
        <ProductDetail {...productData} />
      </main>
      <Footer />
      <WhatsAppButton />
      <ScrollToTop />
    </>
  );
}
