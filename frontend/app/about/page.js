import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import BreadcrumbNav from '../components/layout/BreadcrumbNav';
import WhatsAppButton from '../components/ui/WhatsAppButton';
import ScrollToTop from '../components/ui/ScrollToTop';
import AboutContent from './AboutContent';

export const metadata = {
  title: 'About Us',
  description: 'Learn about United Brothers Global — a diversified trading company with 15+ years of experience in Engineering Materials, Fruits & Vegetables export, and IT Services. Based in Mumbai, serving 50+ countries.',
  openGraph: {
    title: 'About United Brothers Global',
    description: 'Discover our story, values, and 15+ year journey serving clients across 50+ countries in engineering, agriculture, and technology.',
  },
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="pt-[72px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <BreadcrumbNav items={[{ name: 'About Us' }]} />
        </div>
        <AboutContent />
      </main>
      <Footer />
      <WhatsAppButton />
      <ScrollToTop />
    </>
  );
}
