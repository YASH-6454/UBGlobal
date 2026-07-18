import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import BreadcrumbNav from '../../components/layout/BreadcrumbNav';
import WhatsAppButton from '../../components/ui/WhatsAppButton';
import ScrollToTop from '../../components/ui/ScrollToTop';
import ProductDetail from '../../components/ui/ProductDetail';

export const metadata = {
  title: 'Web Development Services | Next.js & React Experts',
  description: 'Custom web development services — responsive websites, web applications, and e-commerce platforms built with React, Next.js, and modern tech stacks.',
};

const productData = {
  productName: 'Web Development Services',
  division: 'it-services',
  description: 'Our web development team builds high-performance, scalable, and secure digital platforms. Whether you need a corporate website, a complex web application, or a robust e-commerce platform, we deliver tailored solutions. We specialize in modern Javascript frameworks like React and Next.js, ensuring your application is blazing fast, SEO-optimized, and provides an exceptional user experience across all devices.',
  image: '/images/hero-bg.png', 
  specs: [
    'Frontend: React, Next.js, Vue.js',
    'Backend: Node.js, Python (FastAPI/Django)',
    'Databases: PostgreSQL, MongoDB, MySQL',
    'Architecture: Serverless, Microservices, SPA/SSR',
    'Design: Tailwind CSS, Material UI, Custom Design Systems'
  ],
  applications: [
    { title: 'Corporate Websites', desc: 'SEO-optimized, fast-loading websites that establish brand authority and generate leads.' },
    { title: 'Custom Web Applications', desc: 'Complex, data-driven applications tailored to automate and streamline your unique business processes.' },
    { title: 'E-Commerce Platforms', desc: 'Secure, scalable online stores with integrated payment gateways and inventory management.' }
  ],
  relatedProducts: [
    { name: 'App Development (ERP)', href: '/it-services/app-development', image: '/images/hero-bg.png' },
    { name: 'Cloud & DevOps', href: '/it-services/cloud-devops', image: '/images/hero-bg.png' }
  ],
  faqs: [
    { question: 'Will my website be mobile-friendly?', answer: 'Yes, all our web development projects follow a mobile-first responsive design approach, ensuring they look and function perfectly on smartphones, tablets, and desktops.' },
    { question: 'Do you provide SEO services along with development?', answer: 'We build our websites with strong technical SEO foundations (like structured data, fast load times, and semantic HTML). We can also provide ongoing content SEO services upon request.' }
  ]
};

export default function WebDevPage() {
  return (
    <>
      <Navbar />
      <main className="pt-[72px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <BreadcrumbNav items={[{ name: 'IT Services', href: '/it-services' }, { name: 'Web Development' }]} />
        </div>
        <ProductDetail {...productData} />
      </main>
      <Footer />
      <WhatsAppButton />
      <ScrollToTop />
    </>
  );
}
