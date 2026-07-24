import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import WhatsAppButton from '../components/ui/WhatsAppButton';
import ScrollToTop from '../components/ui/ScrollToTop';
import AboutContent from './AboutContent';

export const metadata = {
  title: 'About Us',
  description: 'Learn about United Brothers Global — a diversified trading company with 15+ years of experience in Engineering Materials, Fruits & Vegetables export, Handcrafts, and IT Services. Based in Mumbai, serving 50+ countries.',
  openGraph: {
    title: 'About United Brothers Global',
    description: 'Discover our story, values, and 15+ year journey serving clients across 50+ countries in engineering, agriculture, handcrafts, and technology.',
  },
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="pt-[72px]">
        <AboutContent />
      </main>
      <Footer />
      <WhatsAppButton />
      <ScrollToTop />
    </>
  );
}
