import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import BreadcrumbNav from '../../components/layout/BreadcrumbNav';
import WhatsAppButton from '../../components/ui/WhatsAppButton';
import ScrollToTop from '../../components/ui/ScrollToTop';
import ProductDetail from '../../components/ui/ProductDetail';

export const dynamic = 'force-dynamic';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://ubglobal-api.onrender.com';

async function getProduct(slug) {
  try {
    const res = await fetch(`${API_URL}/api/products/by-slug/${slug}`, { cache: 'no-store' });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.error('Error fetching product by slug:', err);
  }

  // Fallback: Try fetching all products and matching slug
  try {
    const res = await fetch(`${API_URL}/api/products`, { cache: 'no-store' });
    if (res.ok) {
      const products = await res.json();
      const match = products.find(p => p.slug === slug || (p.name && p.name.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-') === slug));
      if (match) return match;
    }
  } catch (err) {
    console.error('Error fetching products list:', err);
  }

  return null;
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) return { title: 'Product Not Found | United Brothers Global' };

  return {
    title: `${product.name} | United Brothers Global`,
    description: product.description,
  };
}

export default async function HandcraftsProductPage({ params }) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    return (
      <>
        <Navbar />
        <main className="pt-[72px] min-h-screen flex flex-col items-center justify-center gap-4 bg-white">
          <h1 className="text-2xl font-bold text-primary font-[family-name:var(--font-poppins)]">Product Not Found</h1>
          <p className="text-secondary">The product you're looking for doesn't exist.</p>
          <a href="/handcrafts" className="text-craft font-semibold hover:underline">← Back to Handcrafts</a>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="pt-[72px] bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <BreadcrumbNav items={[{ name: 'Handcrafts', href: '/handcrafts' }, { name: product.name }]} />
        </div>
        <ProductDetail
          productName={product.name}
          division="handcrafts"
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
