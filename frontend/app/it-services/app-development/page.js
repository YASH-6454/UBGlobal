import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import BreadcrumbNav from '../../components/layout/BreadcrumbNav';
import WhatsAppButton from '../../components/ui/WhatsAppButton';
import ScrollToTop from '../../components/ui/ScrollToTop';
import ProductDetail from '../../components/ui/ProductDetail';

export const metadata = {
  title: 'ERP & Custom Software Solutions | IT Services',
  description: 'Custom Enterprise Resource Planning (ERP) systems and software development to streamline your business operations, inventory, and finance.',
};

const productData = {
  productName: 'ERP & Custom Software',
  division: 'it-services',
  description: 'Off-the-shelf software rarely fits a growing business perfectly. We develop custom Enterprise Resource Planning (ERP) systems and tailored software applications that align exactly with your operational workflows. From inventory and supply chain management to HR and financial reporting, our custom ERPs eliminate data silos, automate repetitive tasks, and provide real-time insights to drive informed decision-making.',
  image: '/images/hero-bg.png', 
  specs: [
    'Modules: Inventory, Sales, HR, Finance, CRM',
    'Integration: Third-party APIs, Payment Gateways, Legacy Systems',
    'Deployment: Cloud-based or On-Premise',
    'Security: Role-based access control, data encryption',
    'Analytics: Custom reporting dashboards'
  ],
  applications: [
    { title: 'Manufacturing & Export', desc: 'Track raw materials, production cycles, and international shipments in real-time.' },
    { title: 'Retail & Distribution', desc: 'Multi-warehouse inventory management with automated reorder alerts.' },
    { title: 'Services Sector', desc: 'Project management, time tracking, and automated client billing systems.' }
  ],
  relatedProducts: [
    { name: 'Web Development', href: '/it-services/web-development', image: '/images/hero-bg.png' },
    { name: 'Cloud & DevOps', href: '/it-services/cloud-devops', image: '/images/hero-bg.png' }
  ],
  faqs: [
    { question: 'How long does it take to implement a custom ERP?', answer: 'A custom ERP implementation typically takes between 4 to 12 months, depending on the number of modules, complexity of workflows, and data migration requirements from legacy systems.' },
    { question: 'Can the ERP integrate with our existing accounting software?', answer: 'Yes, we frequently build custom integrations with popular accounting software like Tally, QuickBooks, and Xero via their APIs.' }
  ]
};

export default function AppDevPage() {
  return (
    <>
      <Navbar />
      <main className="pt-[72px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <BreadcrumbNav items={[{ name: 'IT Services', href: '/it-services' }, { name: 'ERP Solutions' }]} />
        </div>
        <ProductDetail {...productData} />
      </main>
      <Footer />
      <WhatsAppButton />
      <ScrollToTop />
    </>
  );
}
