import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import BreadcrumbNav from '../components/layout/BreadcrumbNav';
import WhatsAppButton from '../components/ui/WhatsAppButton';
import ScrollToTop from '../components/ui/ScrollToTop';
import EngineeringContent from './EngineeringContent';

export const metadata = {
  title: 'Engineering Materials | Steel Products Export',
  description: 'Premium engineering materials exporter — Bright Bars, Black Bars, Alloy Steel & Carbon Steel. EN8, EN9, EN19, EN24 grades. ISO quality, competitive pricing, global delivery to 50+ countries.',
  keywords: ['bright bars exporter', 'black bars supplier', 'alloy steel India', 'carbon steel exporter', 'engineering materials', 'steel export India', 'EN19', 'EN24'],
  openGraph: {
    title: 'Engineering Materials | United Brothers Global',
    description: 'Global supply of premium Bright Bars, Black Bars, Alloy & Carbon Steel from India to 50+ countries.',
  },
};

export default function EngineeringPage() {
  return (
    <>
      <Navbar />
      <main className="pt-[72px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <BreadcrumbNav items={[{ name: 'Engineering Materials' }]} />
        </div>
        <EngineeringContent />
      </main>
      <Footer />
      <WhatsAppButton />
      <ScrollToTop />
    </>
  );
}
