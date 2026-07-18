import Link from 'next/link';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import { FiHome, FiArrowRight } from 'react-icons/fi';

export const metadata = {
  title: 'Page Not Found',
  description: 'The page you are looking for does not exist.',
};

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-[72px] flex items-center justify-center bg-surface relative overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-eng/10 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl opacity-50" />
        
        <div className="relative z-10 text-center px-4 max-w-xl mx-auto">
          <div className="text-8xl md:text-9xl font-extrabold text-primary/10 font-[family-name:var(--font-poppins)] mb-4">
            404
          </div>
          <h1 className="text-2xl md:text-4xl font-bold text-primary mb-4 font-[family-name:var(--font-poppins)]">
            Page Not Found
          </h1>
          <p className="text-secondary mb-8">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="gradient-eng text-white px-8 py-3.5 rounded-xl font-semibold inline-flex items-center justify-center gap-2 hover:shadow-lg hover:-translate-y-0.5 transition-all"
            >
              <FiHome className="text-lg" /> Back to Home
            </Link>
            <Link
              href="/contact"
              className="bg-white border border-surface-darker text-primary px-8 py-3.5 rounded-xl font-semibold inline-flex items-center justify-center gap-2 hover:bg-surface transition-all"
            >
              Contact Support <FiArrowRight />
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
