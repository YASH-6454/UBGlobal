import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import BreadcrumbNav from '../../components/layout/BreadcrumbNav';
import WhatsAppButton from '../../components/ui/WhatsAppButton';
import ScrollToTop from '../../components/ui/ScrollToTop';
import ProductDetail from '../../components/ui/ProductDetail';

export const metadata = {
  title: 'Carbon Steel | Engineering Materials Export',
  description: 'High-quality carbon steel (C45, C55, C60, C70) for general engineering and structural applications. Exported from India.',
};

const productData = {
  productName: 'Carbon Steel',
  division: 'engineering',
  description: 'We supply premium Carbon Steel across all carbon ranges — Low, Medium, and High Carbon. Our carbon steel products offer an excellent balance of strength, ductility, and machinability. They are widely used across general engineering applications where high wear resistance and toughness are required. We stock grades like C45, C55, C60, and C70 in various form factors.',
  image: '/images/carbon-steel.png',
  specs: [
    'Grades: C45, C55, C60, C70',
    'Carbon Content: 0.05% to 1.50%',
    'Forms: Coils, Sheets, Bars, Plates',
    'Condition: Hot Rolled, Cold Rolled',
    'Certification: EN 10204 3.1 MTC'
  ],
  applications: [
    { title: 'General Engineering', desc: 'Used for manufacturing tools, springs, and high-strength wire ropes.' },
    { title: 'Automotive Parts', desc: 'Ideal for axles, shafts, and connecting rods requiring high fatigue strength.' },
    { title: 'Railway Infrastructure', desc: 'Used in the production of railway tracks and carriage components.' }
  ],
  relatedProducts: [
    { name: 'Alloy Steel', href: '/engineering/alloy-steel', image: '/images/alloy-steel.png' },
    { name: 'Black Bars', href: '/engineering/black-bars', image: '/images/black-bars.png' }
  ],
  faqs: [
    { question: 'What forms does your carbon steel come in?', answer: 'We can supply carbon steel in coils, sheets, plates, round bars, and flat bars depending on the grade and customer requirement.' }
  ]
};

export default function CarbonSteelPage() {
  return (
    <>
      <Navbar />
      <main className="pt-[72px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <BreadcrumbNav items={[{ name: 'Engineering', href: '/engineering' }, { name: 'Carbon Steel' }]} />
        </div>
        <ProductDetail {...productData} />
      </main>
      <Footer />
      <WhatsAppButton />
      <ScrollToTop />
    </>
  );
}
