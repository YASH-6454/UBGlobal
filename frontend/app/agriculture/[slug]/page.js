'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import BreadcrumbNav from '../../components/layout/BreadcrumbNav';
import WhatsAppButton from '../../components/ui/WhatsAppButton';
import ScrollToTop from '../../components/ui/ScrollToTop';
import ProductDetail from '../../components/ui/ProductDetail';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export default function AgricultureProductPage() {
  const params = useParams();
  const slug = params.slug;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!slug) return;
    fetch(`${API_URL}/api/products/by-slug/${slug}`)
      .then(res => {
        if (!res.ok) throw new Error('Not found');
        return res.json();
      })
      .then(data => {
        setProduct(data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="pt-[72px] min-h-screen flex items-center justify-center">
          <div className="animate-pulse text-secondary">Loading product...</div>
        </main>
        <Footer />
      </>
    );
  }

  if (error || !product) {
    return (
      <>
        <Navbar />
        <main className="pt-[72px] min-h-screen flex flex-col items-center justify-center gap-4">
          <h1 className="text-2xl font-bold text-primary">Product Not Found</h1>
          <p className="text-secondary">The product you're looking for doesn't exist.</p>
          <a href="/agriculture" className="text-agri font-semibold hover:underline">← Back to Agriculture</a>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="pt-[72px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <BreadcrumbNav items={[{ name: 'Agriculture', href: '/agriculture' }, { name: product.name }]} />
        </div>
        <ProductDetail
          productName={product.name}
          division="agriculture"
          description={product.description}
          image={product.image || '/images/hero-bg.png'}
          specs={product.specs || []}
          applications={[]}
          relatedProducts={[]}
          faqs={[]}
        />
      </main>
      <Footer />
      <WhatsAppButton />
      <ScrollToTop />
    </>
  );
}
