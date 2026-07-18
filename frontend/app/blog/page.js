import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import BreadcrumbNav from '../components/layout/BreadcrumbNav';
import WhatsAppButton from '../components/ui/WhatsAppButton';
import ScrollToTop from '../components/ui/ScrollToTop';
import BlogListingContent from './BlogListingContent';

export const metadata = {
  title: 'Blog & Industry Insights | United Brothers Global',
  description: 'Read the latest insights, industry trends, and company news on engineering materials, global agriculture exports, and IT services.',
};

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <main className="pt-[72px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <BreadcrumbNav items={[{ name: 'Blog' }]} />
        </div>
        <BlogListingContent />
      </main>
      <Footer />
      <WhatsAppButton />
      <ScrollToTop />
    </>
  );
}
