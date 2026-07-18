import Link from 'next/link';
import { FiChevronRight, FiHome } from 'react-icons/fi';

export default function BreadcrumbNav({ items = [], className = '' }) {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://ubglobal.in' },
      ...items.map((item, i) => ({
        '@type': 'ListItem',
        position: i + 2,
        name: item.name,
        ...(item.href ? { item: `https://ubglobal.in${item.href}` } : {}),
      })),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema).replace(/</g, '\\u003c'),
        }}
      />
      <nav aria-label="Breadcrumb" className={`flex items-center gap-1.5 text-sm ${className}`}>
        <Link href="/" className="breadcrumb-link flex items-center gap-1 text-secondary hover:text-primary transition-colors">
          <FiHome className="text-xs" />
          <span>Home</span>
        </Link>
        {items.map((item, i) => (
          <span key={i} className="flex items-center gap-1.5">
            <FiChevronRight className="text-xs text-secondary-light" />
            {item.href && i < items.length - 1 ? (
              <Link href={item.href} className="breadcrumb-link text-secondary hover:text-primary transition-colors">
                {item.name}
              </Link>
            ) : (
              <span className="text-primary font-medium">{item.name}</span>
            )}
          </span>
        ))}
      </nav>
    </>
  );
}
