import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import BreadcrumbNav from '../../components/layout/BreadcrumbNav';
import WhatsAppButton from '../../components/ui/WhatsAppButton';
import ScrollToTop from '../../components/ui/ScrollToTop';
import Image from 'next/image';
import { FiCalendar, FiUser } from 'react-icons/fi';
import { blogPosts } from '../blogData';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return { title: 'Post Not Found' };

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  
  if (!post) {
    notFound();
  }

  const getDivisionColor = (category) => {
    if (category === 'Engineering') return 'text-eng bg-eng/10';
    if (category === 'Agriculture') return 'text-agri bg-agri/10';
    return 'text-it bg-it/10';
  };

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    image: `https://ubglobal.in${post.image}`,
    author: {
      '@type': 'Person',
      name: post.author
    },
    publisher: {
      '@type': 'Organization',
      name: 'United Brothers Global',
      logo: {
        '@type': 'ImageObject',
        url: 'https://ubglobal.in/images/logo-full.png'
      }
    },
    datePublished: post.date,
    description: post.excerpt
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema).replace(/</g, '\\u003c') }} />
      <Navbar />
      <main className="pt-[72px] bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <BreadcrumbNav items={[{ name: 'Blog', href: '/blog' }, { name: post.title }]} />
        </div>
        
        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="mb-8">
            <span className={`inline-block px-3 py-1 rounded-full text-[11px] font-bold mb-4 ${getDivisionColor(post.category)}`}>
              {post.category}
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-6 font-[family-name:var(--font-poppins)] leading-tight">
              {post.title}
            </h1>
            <div className="flex items-center gap-6 text-sm text-secondary-light border-b border-surface-darker/50 pb-6">
              <div className="flex items-center gap-2"><FiCalendar /> {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</div>
              <div className="flex items-center gap-2"><FiUser /> {post.author}</div>
            </div>
          </div>
          
          <div className="relative h-[300px] sm:h-[400px] w-full rounded-2xl overflow-hidden mb-10 border border-surface-darker/50">
            <Image src={post.image} alt={post.title} fill className="object-cover" priority />
          </div>
          
          <div className="prose prose-lg prose-blue max-w-none text-secondary">
            {post.content.split('\n\n').map((paragraph, i) => {
              if (paragraph.trim().startsWith('###')) {
                return <h3 key={i} className="text-2xl font-bold text-primary mt-8 mb-4 font-[family-name:var(--font-poppins)]">{paragraph.replace('### ', '')}</h3>
              }
              if (paragraph.trim().startsWith('*')) {
                return (
                  <ul key={i} className="list-disc pl-5 mb-6 space-y-2">
                    {paragraph.split('\n').map((item, j) => {
                      if(item.trim()) return <li key={j}>{item.replace('*', '').trim()}</li>
                      return null;
                    })}
                  </ul>
                )
              }
              if (paragraph.trim().startsWith('1.')) {
                return (
                  <ol key={i} className="list-decimal pl-5 mb-6 space-y-2">
                    {paragraph.split('\n').map((item, j) => {
                      if(item.trim()) return <li key={j}>{item.replace(/^\d+\.\s/, '').trim()}</li>
                      return null;
                    })}
                  </ol>
                )
              }
              return <p key={i} className="mb-6 leading-relaxed">{paragraph}</p>;
            })}
          </div>
        </article>
      </main>
      <Footer />
      <WhatsAppButton />
      <ScrollToTop />
    </>
  );
}
