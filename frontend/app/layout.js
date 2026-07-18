import { Inter, Poppins } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://ubglobal.in"),
  title: {
    default: "United Brothers Global | Engineering Materials, Agriculture, IT Services & Handcrafts",
    template: "%s | United Brothers Global",
  },
  description:
    "United Brothers Global is a leading import-export and services company specializing in Engineering Materials (Bright Bars, Alloy Steel), Fresh Fruits & Vegetables, IT Solutions, and Handcrafted Products (Diyas, Pooja Accessories & Festival Decor). Trusted by 1000+ clients across 50+ countries.",
  keywords: [
    "United Brothers Global", "UBGlobal", "import export India",
    "bright bars exporter", "alloy steel supplier", "carbon steel exporter",
    "fresh fruits exporter India", "vegetables exporter", "onion exporter India",
    "mango exporter India", "IT services India", "web development",
    "engineering materials", "APEDA certified", "FSSAI certified",
    "handcrafts exporter India", "clay diyas manufacturer", "decorative diyas",
    "tea light holders", "pooja accessories", "festival decorations",
  ],
  authors: [{ name: "United Brothers Global" }],
  creator: "United Brothers Global",
  publisher: "United Brothers Global",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "United Brothers Global | Engineering, Agriculture, IT Services & Handcrafts",
    description:
      "Global supply of premium engineering materials, fresh fruits & vegetables, IT solutions, and handcrafted products. Trusted by 1000+ clients across 50+ countries.",
    type: "website",
    locale: "en_US",
    siteName: "United Brothers Global",
    url: "https://ubglobal.in",
  },
  twitter: {
    card: "summary_large_image",
    title: "United Brothers Global | Engineering, Agriculture, IT Services & Handcrafts",
    description:
      "Global supply of premium engineering materials, fresh fruits & vegetables, IT solutions, and handcrafted products.",
  },
  icons: {
    icon: "/favicon.ico?v=2",
    apple: "/apple-touch-icon.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "United Brothers Global",
    alternateName: "UBGlobal",
    url: "https://ubglobal.in",
    logo: "https://ubglobal.in/images/logo-full.png",
    description:
      "Leading import-export company specializing in Engineering Materials, Fresh Fruits & Vegetables, IT Services, and Handcrafted Products.",
    foundingDate: "2009",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Mumbai",
      addressRegion: "Maharashtra",
      addressCountry: "IN",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+91-7887799370",
        contactType: "sales",
        areaServed: "Worldwide",
        availableLanguage: ["English", "Hindi"],
      },
      {
        "@type": "ContactPoint",
        telephone: "+91-9370030733",
        contactType: "customer service",
        areaServed: "Worldwide",
        availableLanguage: ["English", "Hindi"],
      },
    ],
    sameAs: [],
    numberOfEmployees: {
      "@type": "QuantitativeValue",
      minValue: 10,
    },
    areaServed: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: 19.076,
        longitude: 72.877,
      },
      geoRadius: "20000 km",
    },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "United Brothers Global",
    url: "https://ubglobal.in",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://ubglobal.in/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <html
      lang="en"
      className={`${inter.variable} ${poppins.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema).replace(/</g, "\\u003c"),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema).replace(/</g, "\\u003c"),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
