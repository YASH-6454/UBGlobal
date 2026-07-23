'use client';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import Link from 'next/link';
import { FiArrowRight, FiCheckCircle } from 'react-icons/fi';
import SectionHeader from '../sections/SectionHeader';
import FAQSection from '../sections/FAQSection';
import CTABanner from '../sections/CTABanner';

export default function ProductDetail({ 
  productName, 
  division,
  description, 
  image, 
  specs = [], 
  applications = [],
  relatedProducts = [],
  faqs = []
}) {
  const [ref, inView] = useInView({ threshold: 0.05, triggerOnce: true });

  const colorMap = {
    engineering: { text: 'text-eng', bg: 'bg-eng', lightBg: 'bg-eng/10' },
    agriculture: { text: 'text-agri', bg: 'bg-agri', lightBg: 'bg-agri/10' },
    'it-services': { text: 'text-it', bg: 'bg-it', lightBg: 'bg-it/10' },
    handcrafts: { text: 'text-craft', bg: 'bg-craft', lightBg: 'bg-craft/10' },
  };
  const colors = colorMap[division] || colorMap.engineering;
  const divisionColor = colors.text;
  const divisionBg = colors.bg;
  const divisionLightBg = colors.lightBg;

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: productName,
    description: description,
    image: image.startsWith('http') ? image : `https://ubglobal.in${image}`,
    brand: {
      '@type': 'Brand',
      name: 'United Brothers Global'
    },
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      priceCurrency: 'USD',
      price: '0.00',
      priceValidUntil: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
      url: 'https://ubglobal.in/contact'
    }
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema).replace(/</g, '\\u003c') }} />
      
      {/* Hero Product Info */}
      <section className="py-12 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6 }} className="relative h-[300px] sm:h-[400px] lg:h-[500px] rounded-3xl overflow-hidden border border-surface-darker/50 shadow-xl shadow-primary/5 bg-surface">
              <Image src={image} alt={productName} fill className="object-contain p-4" priority sizes="(max-width: 1024px) 100vw, 50vw" />
            </motion.div>
            
            <motion.div initial={{ opacity: 0, x: 30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.15 }}>
              <div className={`inline-flex items-center gap-2 ${divisionLightBg} rounded-full px-4 py-1.5 mb-6`}>
                <span className={`w-1.5 h-1.5 ${divisionBg} rounded-full`} />
                <span className={`${divisionColor} text-xs font-semibold tracking-wide uppercase`}>{division} Division</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-5 font-[family-name:var(--font-poppins)]">
                {productName}
              </h1>
              <div className="section-divider mb-6" />
              <p className="text-secondary text-base leading-relaxed mb-8">
                {description}
              </p>
              
              {specs.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-sm font-bold text-primary uppercase tracking-wider mb-4 font-[family-name:var(--font-poppins)]">Key Specifications</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {specs.map((spec, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <FiCheckCircle className={divisionColor} />
                        <span className="text-sm text-secondary font-medium">{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <Link href={`/contact?division=${division}&product=${encodeURIComponent(productName)}`}
                className={`inline-flex items-center gap-2 text-white px-8 py-4 rounded-xl text-base font-semibold hover:shadow-lg transition-all hover:-translate-y-0.5 bg-gradient-to-r from-${divisionColor.replace('text-', '')} to-${divisionColor.replace('text-', '')}-dark`}
                style={{ backgroundImage: `linear-gradient(to right, var(--color-${divisionColor.replace('text-', '')}), var(--color-${divisionColor.replace('text-', '')}-dark))` }}
              >
                Request a Quote <FiArrowRight />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Applications */}
      {applications.length > 0 && (
        <section className="py-20 bg-surface">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader label="Applications" title="Where it's used" description={`Common applications and industries that utilize our ${productName.toLowerCase()}.`} />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {applications.map((app, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="bg-white rounded-2xl p-6 border border-surface-darker/40 hover:shadow-md transition-shadow"
                >
                  <h4 className="text-lg font-bold text-primary font-[family-name:var(--font-poppins)] mb-2">{app.title}</h4>
                  <p className="text-sm text-secondary leading-relaxed">{app.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQs */}
      {faqs.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader label="FAQ" title={`About ${productName}`} />
            <FAQSection faqs={faqs} />
          </div>
        </section>
      )}

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-20 bg-surface">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader label="Explore More" title="Related Products" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((prod, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }}>
                  <Link href={prod.href} className="group block bg-white rounded-2xl overflow-hidden border border-surface-darker/40 hover:shadow-lg transition-all">
                    <div className="relative h-40">
                      <Image src={prod.image} alt={prod.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="p-4">
                      <h4 className="font-bold text-primary group-hover:text-eng transition-colors">{prod.name}</h4>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="pb-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <CTABanner title={`Interested in our ${productName}?`} description="Get a competitive quote within 24 hours." buttonText="Get Quote" buttonHref={`/contact?division=${division}`} />
        </div>
      </section>
    </>
  );
}
