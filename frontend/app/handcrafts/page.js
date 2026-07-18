import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import BreadcrumbNav from '../components/layout/BreadcrumbNav';
import WhatsAppButton from '../components/ui/WhatsAppButton';
import ScrollToTop from '../components/ui/ScrollToTop';
import HandcraftsContent from './HandcraftsContent';

export const metadata = {
  title: 'Handcrafts | Traditional Clay Diyas, Decorative Items & Gift Sets',
  description: 'Premium handcrafted Indian products — Traditional Clay Diyas, Hand-Painted Decorative Diyas, Floating Diyas, Tea Light Holders, Pooja Accessories, Festival Decorations & Gift Sets. OEM & Private Label manufacturing available.',
  keywords: ['handcrafts exporter India', 'clay diyas manufacturer', 'decorative diyas', 'floating diyas', 'tea light holders', 'pooja accessories', 'festival decorations', 'OEM manufacturing India', 'private label diyas'],
};

export default function HandcraftsPage() {
  return (
    <>
      <Navbar />
      <main className="pt-[72px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <BreadcrumbNav items={[{ name: 'Handcrafts' }]} />
        </div>
        <HandcraftsContent />
      </main>
      <Footer />
      <WhatsAppButton />
      <ScrollToTop />
    </>
  );
}
