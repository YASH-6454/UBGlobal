import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import BreadcrumbNav from '../../components/layout/BreadcrumbNav';
import WhatsAppButton from '../../components/ui/WhatsAppButton';
import ScrollToTop from '../../components/ui/ScrollToTop';
import ProductDetail from '../../components/ui/ProductDetail';

export const metadata = {
  title: 'Fresh Vegetables Export | Premium Indian Produce',
  description: 'APEDA certified exporter of fresh Indian vegetables — Red Onions, White Onions, Drumstick (Moringa), and more. Premium quality for global markets.',
};

const productData = {
  productName: 'Fresh Vegetables Export',
  division: 'agriculture',
  description: 'We source and export premium fresh vegetables directly from India\'s best farming regions. With a strong focus on quality control, sorting, and grading, our vegetables meet the strict import regulations of destination countries. We specialize in bulk exports of Onions (from Nashik) and high-demand vegetables like Drumstick (Moringa). Our APEDA certification ensures complete traceability and food safety.',
  image: '/images/hero-bg.png', 
  specs: [
    'Key Products: Red Onion, White Onion, Drumstick (Moringa)',
    'Onion Sizes: 25-35mm, 40-55mm, 55-65mm+',
    'Certifications: APEDA, FSSAI',
    'Packaging: Mesh bags, Jute bags, Custom cartons',
    'Logistics: Temperature-controlled reefers'
  ],
  applications: [
    { title: 'Supermarket Chains', desc: 'Retail-ready packaged fresh vegetables for international grocery chains.' },
    { title: 'Wholesale Markets', desc: 'Bulk volume supply for regional fresh produce distributors.' },
    { title: 'Food Service', desc: 'Consistent supply of staple vegetables for the hospitality and restaurant sectors.' }
  ],
  relatedProducts: [
    { name: 'Fresh Fruits', href: '/agriculture/fruits', image: '/images/hero-bg.png' },
    { name: 'Indian Spices', href: '/agriculture/spices', image: '/images/hero-bg.png' }
  ],
  faqs: [
    { question: 'What is the shelf life of exported onions?', answer: 'With proper sorting, curing, and temperature-controlled shipping, our export-grade onions can maintain quality for 3-4 months.' },
    { question: 'Can you pack onions in consumer-sized bags?', answer: 'Yes, we can pack onions in 1kg, 2kg, or 5kg mesh bags based on your retail requirements, packed into larger master cartons.' }
  ]
};

export default function VegetablesPage() {
  return (
    <>
      <Navbar />
      <main className="pt-[72px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <BreadcrumbNav items={[{ name: 'Agriculture', href: '/agriculture' }, { name: 'Fresh Vegetables' }]} />
        </div>
        <ProductDetail {...productData} />
      </main>
      <Footer />
      <WhatsAppButton />
      <ScrollToTop />
    </>
  );
}
