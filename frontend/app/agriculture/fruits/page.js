import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import BreadcrumbNav from '../../components/layout/BreadcrumbNav';
import WhatsAppButton from '../../components/ui/WhatsAppButton';
import ScrollToTop from '../../components/ui/ScrollToTop';
import ProductDetail from '../../components/ui/ProductDetail';

export const metadata = {
  title: 'Fresh Fruits Export | Alphonso Mango, Bananas, Pomegranates',
  description: 'APEDA certified exporter of premium Indian fresh fruits including Alphonso Mangoes, Kesar Mangoes, Pomegranates, Bananas, and more.',
};

const productData = {
  productName: 'Fresh Fruits Export',
  division: 'agriculture',
  description: 'United Brothers Global is a leading exporter of premium fresh fruits from India. With APEDA and FSSAI certifications, we guarantee that our fruits meet stringent international quality and safety standards. We specialize in India\'s world-famous mango varieties, alongside a wide selection of tropical fruits. Our robust cold chain logistics ensure farm-fresh delivery to markets in the Middle East, Europe, and Asia.',
  image: '/images/hero-bg.png', // Fallback, would normally be a fruit image
  specs: [
    'Mangoes: Ratnagiri Alphonso, Gujarat Kesar',
    'Other Fruits: Pomegranate (Bhagwa), Banana (Cavendish), Coconut, Watermelon, Orange',
    'Certifications: APEDA, FSSAI',
    'Packaging: Custom corrugated boxes, ventilated',
    'Logistics: Temperature-controlled reefers'
  ],
  applications: [
    { title: 'Supermarket Chains', desc: 'Retail-ready packaged fresh fruits for international grocery chains.' },
    { title: 'Wholesale Markets', desc: 'Bulk volume supply for regional fresh produce distributors.' },
    { title: 'Food Processing', desc: 'High-quality fruit supply for juice, puree, and dried fruit manufacturers.' }
  ],
  relatedProducts: [
    { name: 'Fresh Vegetables', href: '/agriculture/vegetables', image: '/images/hero-bg.png' },
    { name: 'Indian Spices', href: '/agriculture/spices', image: '/images/hero-bg.png' }
  ],
  faqs: [
    { question: 'When is the Indian Mango season?', answer: 'The Alphonso season typically runs from March to June, while Kesar mangoes are available from April to July.' },
    { question: 'How do you handle ripening during transit?', answer: 'We export mature but unripe fruits in temperature-controlled reefers to pause the ripening process, ensuring they arrive at the destination ready for final market ripening.' }
  ]
};

export default function FruitsPage() {
  return (
    <>
      <Navbar />
      <main className="pt-[72px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <BreadcrumbNav items={[{ name: 'Agriculture', href: '/agriculture' }, { name: 'Fresh Fruits' }]} />
        </div>
        <ProductDetail {...productData} />
      </main>
      <Footer />
      <WhatsAppButton />
      <ScrollToTop />
    </>
  );
}
