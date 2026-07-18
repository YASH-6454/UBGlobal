import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import BreadcrumbNav from '../components/layout/BreadcrumbNav';
import WhatsAppButton from '../components/ui/WhatsAppButton';
import ScrollToTop from '../components/ui/ScrollToTop';
import ITServicesContent from './ITServicesContent';

export const metadata = {
  title: 'IT Services | Web Development, ERP, Cloud & Consultancy',
  description: 'Professional IT services — Web Development, ERP Solutions, Cloud & DevOps, and IT Consultancy. Custom software solutions for businesses worldwide by United Brothers Global.',
  keywords: ['web development India', 'ERP solutions', 'cloud services', 'IT consultancy', 'app development', 'DevOps services', 'custom software'],
};

export default function ITServicesPage() {
  return (
    <>
      <Navbar />
      <main className="pt-[72px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <BreadcrumbNav items={[{ name: 'IT Services' }]} />
        </div>
        <ITServicesContent />
      </main>
      <Footer />
      <WhatsAppButton />
      <ScrollToTop />
    </>
  );
}
