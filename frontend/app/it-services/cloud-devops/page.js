import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import BreadcrumbNav from '../../components/layout/BreadcrumbNav';
import WhatsAppButton from '../../components/ui/WhatsAppButton';
import ScrollToTop from '../../components/ui/ScrollToTop';
import ProductDetail from '../../components/ui/ProductDetail';

export const metadata = {
  title: 'Cloud & DevOps Services | AWS, Azure Cloud Migration',
  description: 'Professional Cloud migration and DevOps services. Optimize infrastructure, automate CI/CD pipelines, and ensure scalable, secure operations.',
};

const productData = {
  productName: 'Cloud & DevOps',
  division: 'it-services',
  description: 'Modernize your IT infrastructure with our Cloud & DevOps services. We help businesses migrate from legacy on-premise servers to scalable cloud environments like AWS, Google Cloud, and Microsoft Azure. Our DevOps engineers implement CI/CD pipelines, automate infrastructure deployment, and set up robust monitoring systems. This ensures your applications run reliably with 99.99% uptime while accelerating your time-to-market for new features.',
  image: '/images/hero-bg.png', 
  specs: [
    'Cloud Platforms: AWS, Google Cloud (GCP), Microsoft Azure',
    'Containerization: Docker, Kubernetes',
    'CI/CD Tools: GitHub Actions, Jenkins, GitLab CI',
    'Infrastructure as Code: Terraform, AWS CloudFormation',
    'Monitoring: Prometheus, Grafana, Datadog'
  ],
  applications: [
    { title: 'Cloud Migration', desc: 'Seamlessly transition your existing applications and data to the cloud with minimal downtime.' },
    { title: 'Cost Optimization', desc: 'Audit your cloud usage and implement right-sizing strategies to significantly reduce monthly AWS/GCP bills.' },
    { title: 'High-Availability Architectures', desc: 'Design systems that automatically scale under load and failover smoothly during outages.' }
  ],
  relatedProducts: [
    { name: 'Web Development', href: '/it-services/web-development', image: '/images/hero-bg.png' },
    { name: 'ERP Solutions', href: '/it-services/app-development', image: '/images/hero-bg.png' }
  ],
  faqs: [
    { question: 'Will migrating to the cloud disrupt our current operations?', answer: 'We plan migrations carefully, often utilizing a phased approach or executing the final switchover during off-peak hours (e.g., weekends) to ensure zero to minimal disruption.' },
    { question: 'Do you offer 24/7 monitoring services?', answer: 'Yes, we set up automated alerts and offer managed services to ensure any infrastructure issues are identified and resolved proactively.' }
  ]
};

export default function CloudDevopsPage() {
  return (
    <>
      <Navbar />
      <main className="pt-[72px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <BreadcrumbNav items={[{ name: 'IT Services', href: '/it-services' }, { name: 'Cloud & DevOps' }]} />
        </div>
        <ProductDetail {...productData} />
      </main>
      <Footer />
      <WhatsAppButton />
      <ScrollToTop />
    </>
  );
}
