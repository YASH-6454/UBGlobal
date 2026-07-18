import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import BreadcrumbNav from '../../components/layout/BreadcrumbNav';
import WhatsAppButton from '../../components/ui/WhatsAppButton';
import ScrollToTop from '../../components/ui/ScrollToTop';
import ProductDetail from '../../components/ui/ProductDetail';

export const metadata = {
  title: 'Indian Spices Export | G4 Chilli, Turmeric, Cumin',
  description: 'Exporter of premium Indian spices. Specializing in high-pungency G4/Teja S17 dried red chillies, Turmeric, and Cumin. APEDA certified.',
};

const productData = {
  productName: 'Indian Spices Export',
  division: 'agriculture',
  description: 'India is the spice bowl of the world, and United Brothers Global exports the finest quality spices to global markets. We specialize in high-demand spices like the G4 (Teja S17) dried red chilli, known for its intense pungency and deep color. We also supply turmeric, cumin, and coriander. All our spices undergo rigorous cleaning, grading, and testing to ensure they are free from aflatoxins and meet international food safety standards.',
  image: '/images/hero-bg.png', 
  specs: [
    'Key Products: G4/Teja S17 Chilli, Turmeric, Cumin, Coriander',
    'Chilli Pungency: 75,000 - 100,000 SHU (G4 variety)',
    'Certifications: APEDA, Spice Board of India, FSSAI',
    'Packaging: Gunny bags, PP bags, Custom cartons',
    'Processing: Sun-dried, machine cleaned, stemless options'
  ],
  applications: [
    { title: 'Spice Blending Companies', desc: 'Raw whole spices for large-scale spice grinding and blending operations.' },
    { title: 'Food Processing', desc: 'Essential flavor and color ingredients for sauces, snacks, and ready-to-eat meals.' },
    { title: 'Wholesale Distributors', desc: 'Bulk supply for regional markets and ethnic grocery distributors.' }
  ],
  relatedProducts: [
    { name: 'Fresh Vegetables', href: '/agriculture/vegetables', image: '/images/hero-bg.png' },
    { name: 'Fresh Fruits', href: '/agriculture/fruits', image: '/images/hero-bg.png' }
  ],
  faqs: [
    { question: 'Do you supply stemless chillies?', answer: 'Yes, we offer both with-stem and stemless dried red chillies based on customer requirements.' },
    { question: 'Are your spices tested for aflatoxins and pesticide residues?', answer: 'Absolutely. We provide lab test reports from accredited laboratories confirming that our spices comply with the strict MRL (Maximum Residue Limit) standards of the destination country.' }
  ]
};

export default function SpicesPage() {
  return (
    <>
      <Navbar />
      <main className="pt-[72px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <BreadcrumbNav items={[{ name: 'Agriculture', href: '/agriculture' }, { name: 'Indian Spices' }]} />
        </div>
        <ProductDetail {...productData} />
      </main>
      <Footer />
      <WhatsAppButton />
      <ScrollToTop />
    </>
  );
}
