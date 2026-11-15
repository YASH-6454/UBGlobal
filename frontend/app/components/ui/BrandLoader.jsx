import Image from 'next/image';

/**
 * Logo-based loading animation. Pure CSS (see "Brand loader" in globals.css),
 * so it also works in server-rendered HTML before JavaScript has loaded.
 */
export default function BrandLoader({ size = 'lg', className = '' }) {
  return (
    <div className={`brand-loader ${size === 'sm' ? 'brand-loader--sm' : ''} ${className}`} role="status" aria-label="Loading">
      <div className="brand-loader__mark">
        <span className="brand-loader__ring" aria-hidden="true" />
        <Image
          src="/images/logo-loader.webp"
          alt="United Brothers Global"
          width={520}
          height={239}
          priority
          unoptimized
        />
        <span className="brand-loader__shine" aria-hidden="true" />
      </div>
      <div className="brand-loader__bar" aria-hidden="true"><span /></div>
    </div>
  );
}
