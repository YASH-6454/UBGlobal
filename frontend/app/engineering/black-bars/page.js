import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import BreadcrumbNav from '../../components/layout/BreadcrumbNav';
import WhatsAppButton from '../../components/ui/WhatsAppButton';
import ScrollToTop from '../../components/ui/ScrollToTop';
import ProductDetail from '../../components/ui/ProductDetail';

export const metadata = {
  title: 'Black Bars | Engineering Materials Export',
  description: 'Hot-rolled black steel bars (MS, EN8, EN9) with excellent structural integrity for construction and heavy engineering.',
};

const productData = {
  productName: 'Black Bars',
  division: 'engineering',
  description: 'Our Black Bars are hot-rolled steel bars featuring a dark, scaled surface. While they lack the precise dimensional tolerance of bright bars, they offer exceptional structural integrity, strength, and weldability at a more economical price point. Available in Mild Steel (MS) and medium carbon grades like EN8 and EN9, they are the backbone of construction and heavy fabrication industries.',
  image: '/images/black-bars.png',
  specs: [
    'Grades: Mild Steel (MS), EN8, EN9',
    'Diameter: 10mm – 300mm',
    'Finish: As-rolled (Black)',
    'Shapes: Round, Square, Flat',
    'Certification: EN 10204 3.1 MTC'
  ],
  applications: [
    { title: 'Construction & Infrastructure', desc: 'Used extensively as reinforcement and structural supports in buildings and bridges.' },
    { title: 'Heavy Fabrication', desc: 'Ideal for fabricating large equipment frames, industrial grates, and heavy machinery bases.' },
    { title: 'Forging Industry', desc: 'Used as raw material for closed-die forging of automotive and industrial components.' }
  ],
  relatedProducts: [
    { name: 'Bright Bars', href: '/engineering/bright-bars', image: '/images/bright-bars.png' },
    { name: 'Carbon Steel', href: '/engineering/carbon-steel', image: '/images/carbon-steel.png' }
  ],
  faqs: [
    { question: 'Why choose black bars over bright bars?', answer: 'Black bars are more economical and perfectly suited for applications where precise dimensional tolerance and surface finish are not critical, such as structural framing and forging blanks.' }
  ]
};

export default function BlackBarsPage() {
  return (
    <>
      <Navbar />
      <main className="pt-[72px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <BreadcrumbNav items={[{ name: 'Engineering', href: '/engineering' }, { name: 'Black Bars' }]} />
        </div>
        <ProductDetail {...productData} />
      </main>
      <Footer />
      <WhatsAppButton />
      <ScrollToTop />
    </>
  );
}
