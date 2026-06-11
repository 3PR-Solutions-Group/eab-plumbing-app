import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EAB Plumbing & Heating | Gas Safe Engineer — Norfolk, Suffolk, Essex & London",
  description: "Gas Safe registered plumber and heating engineer covering Norfolk, Suffolk, Essex and London. Boiler services, CP12 gas safety certificates, emergency callouts and plumbing repairs. Fast response, honest pricing.",
  keywords: "gas engineer Norfolk, gas safe engineer Norfolk, boiler service Norwich, CP12 gas safety certificate, emergency plumber Norfolk, plumber Suffolk, heating engineer Essex, boiler repair Norwich, gas safety certificate landlord",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/apple-touch-icon.svg", type: "image/svg+xml" },
    ],
  },
  openGraph: {
    title: "EAB Plumbing & Heating | Gas Safe Engineer",
    description: "Gas Safe registered engineer covering Norfolk, Suffolk, Essex & London. Boiler services, CP12s, emergency callouts.",
    url: "https://eabplumbing.co.uk",
    siteName: "EAB Plumbing & Heating",
    type: "website",
    images: [{ url: "https://eabplumbing.co.uk/og-image.png", width: 512, height: 512, alt: "EAB Plumbing & Heating" }],
    locale: "en_GB",
  },
  twitter: {
    card: "summary",
    images: ["https://eabplumbing.co.uk/og-image.png"],
    title: "EAB Plumbing & Heating | Gas Safe Engineer",
    description: "Gas Safe registered engineer covering Norfolk, Suffolk, Essex & London.",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://eabplumbing.co.uk" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.svg" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "@id": "https://eabplumbing.co.uk",
            "name": "EAB Plumbing & Heating",
            "description": "Gas Safe registered plumber and heating engineer covering Norfolk, Suffolk, Essex and London.",
            "url": "https://eabplumbing.co.uk",
            "telephone": "+447344624714",
            "email": "info@eabplumbing.co.uk",
            "areaServed": ["Norfolk", "Suffolk", "Essex", "London", "Norwich", "Ipswich", "Chelmsford", "Colchester"],
            "serviceType": ["Boiler Service", "Gas Safety Certificate", "CP12", "Emergency Plumber", "Heating Engineer", "Boiler Repair", "Plumbing Repairs", "Bathroom Fitting"],
            "hasCredential": {
              "@type": "EducationalOccupationalCredential",
              "name": "Gas Safe Registered",
              "credentialCategory": "Professional Certification"
            },
            "sameAs": ["https://wa.me/447344624714"],
            "priceRange": "££",
            "openingHoursSpecification": [
              { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"], "opens": "08:00", "closes": "19:00" },
              { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Saturday"], "opens": "08:00", "closes": "17:00" }
            ]
          })}}
        />
      </head>
      <body className="bg-white">{children}</body>
    </html>
  );
}
