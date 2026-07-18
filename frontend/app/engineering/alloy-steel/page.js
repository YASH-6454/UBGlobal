import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import BreadcrumbNav from '../../components/layout/BreadcrumbNav';
import WhatsAppButton from '../../components/ui/WhatsAppButton';
import ScrollToTop from '../../components/ui/ScrollToTop';
import ProductDetail from '../../components/ui/ProductDetail';

export const metadata = {
  title: 'Alloy Steel | Premium Grade Steel Exporter',
  description: 'Premium alloy steel (EN19, EN24, EN31, EN36) for automotive, aerospace, and defense manufacturing. Export quality from India.',
};

const productData = {
  productName: 'Alloy Steel',
  division: 'engineering',
  description: 'Our Alloy Steel products are engineered by combining carbon steel with specific alloying elements like chromium, molybdenum, nickel, and vanadium. This precise metallurgy enhances mechanical properties such as hardness, toughness, wear resistance, and high-temperature strength. We supply grades like EN19, EN24, EN31, and EN36, which are critical for high-stress applications in heavy manufacturing.',
  image: '/images/alloy-steel.png',
  specs: [
    'Grades: EN19, EN24, EN31, EN36, SAE 4140, SAE 4340',
    'Forms: Round Bars, Flat Bars, Forged Blocks',
    'Condition: Annealed, Normalized, Hardened & Tempered',
    'Ultrasonic Testing: 100% OK',
    'Certification: EN 10204 3.1 MTC'
  ],
  applications: [
    { title: 'Aerospace & Defense', desc: 'Critical components requiring high strength-to-weight ratios and extreme fatigue resistance.' },
    { title: 'Heavy Machinery', desc: 'Used for manufacturing gears, heavy-duty shafts, and structural parts in industrial equipment.' },
    { title: 'Automotive Transmission', desc: 'Ideal for transmission gears and drive shafts that endure high torque and continuous friction.' }
  ],
  relatedProducts: [
    { name: 'Carbon Steel', href: '/engineering/carbon-steel', image: '/images/carbon-steel.png' },
    { name: 'Bright Bars', href: '/engineering/bright-bars', image: '/images/bright-bars.png' }
  ],
  faqs: [
    { question: 'Do you provide heat-treated alloy steel?', answer: 'Yes, we can supply alloy steel in various heat-treated conditions including annealed, normalized, or hardened and tempered (H&T) to meet specific mechanical property requirements.' },
    { question: 'Is ultrasonic testing done on these bars?', answer: 'Yes, our premium alloy steel undergoes 100% ultrasonic flaw detection to ensure internal soundness.' }
  ]
};

export default function AlloySteelPage() {
  return (
    <>
      <Navbar />
      <main className="pt-[72px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <BreadcrumbNav items={[{ name: 'Engineering', href: '/engineering' }, { name: 'Alloy Steel' }]} />
        </div>
        <ProductDetail {...productData} />
      </main>
      <Footer />
      <WhatsAppButton />
      <ScrollToTop />
    </>
  );
}
