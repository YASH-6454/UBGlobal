import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import BreadcrumbNav from '../../components/layout/BreadcrumbNav';
import WhatsAppButton from '../../components/ui/WhatsAppButton';
import ScrollToTop from '../../components/ui/ScrollToTop';
import ProductDetail from '../../components/ui/ProductDetail';

export const metadata = {
  title: 'Bright Bars | Engineering Materials Export',
  description: 'Precision-finished bright steel bars (EN8, EN9, EN19, EN24) with superior surface quality for automotive and engineering applications. Exported globally.',
};

const productData = {
  productName: 'Bright Bars',
  division: 'engineering',
  description: 'Our Bright Bars are precision-finished steel bars known for their exact dimensional tolerances, smooth surface finish, and enhanced mechanical properties. Cold drawing and peeling processes give these bars their characteristic bright finish. We supply them in various grades like EN8, EN9, EN19, and EN24, catering primarily to the automotive and precision engineering sectors.',
  image: '/images/bright-bars.png',
  specs: [
    'Grades: EN8, EN9, EN19, EN24, MS',
    'Diameter: 3mm – 200mm',
    'Tolerance: h9, h10, h11',
    'Finish: Cold Drawn, Peeled, Ground',
    'Shapes: Round, Hexagon, Square',
    'Certification: EN 10204 3.1 MTC'
  ],
  applications: [
    { title: 'Automotive Components', desc: 'Used extensively in manufacturing engine parts, axles, and steering components due to high tensile strength.' },
    { title: 'Precision Machining', desc: 'Ideal for CNC machining as the accurate dimensions reduce raw material wastage and processing time.' },
    { title: 'Fasteners & Shafts', desc: 'Used to produce high-strength bolts, nuts, and industrial shafts that require tight tolerances.' }
  ],
  relatedProducts: [
    { name: 'Black Bars', href: '/engineering/black-bars', image: '/images/black-bars.png' },
    { name: 'Alloy Steel', href: '/engineering/alloy-steel', image: '/images/alloy-steel.png' }
  ],
  faqs: [
    { question: 'What is the difference between bright bars and black bars?', answer: 'Black bars have a rough, scaly surface from hot rolling. Bright bars are black bars that have undergone further cold processing (drawing, peeling, or grinding) to achieve precise dimensions, a smooth finish, and improved mechanical properties.' },
    { question: 'Do you offer custom lengths?', answer: 'Yes, we can cut bright bars to specific lengths based on your manufacturing requirements, reducing your scrap rate.' }
  ]
};

export default function BrightBarsPage() {
  return (
    <>
      <Navbar />
      <main className="pt-[72px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <BreadcrumbNav items={[{ name: 'Engineering', href: '/engineering' }, { name: 'Bright Bars' }]} />
        </div>
        <ProductDetail {...productData} />
      </main>
      <Footer />
      <WhatsAppButton />
      <ScrollToTop />
    </>
  );
}
