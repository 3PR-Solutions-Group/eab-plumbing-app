import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EAB Plumbing & Heating | Gas Safe Engineers",
  description: "Gas Safe registered plumbers covering Norfolk, Suffolk, Essex & London. Boiler services, CP12 gas safety certificates, emergency callouts and plumbing repairs. Call 07344 624714.",
  metadataBase: new URL("https://eabplumbing.co.uk"),
  openGraph: {
    type: "website",
    url: "https://eabplumbing.co.uk",
    siteName: "EAB Plumbing & Heating",
    title: "EAB Plumbing & Heating | Gas Safe Engineers",
    description: "Gas Safe registered engineers covering Norfolk, Suffolk, Essex & London. Boiler services, CP12 certificates, emergency callouts & plumbing repairs. Call 07344 624714.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "EAB Plumbing & Heating — Gas Safe Registered Engineers",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "EAB Plumbing & Heating | Gas Safe Engineers",
    description: "Gas Safe registered engineers covering Norfolk, Suffolk, Essex & London. Boiler services, CP12 certificates, emergency callouts & plumbing repairs.",
    images: ["/og-image.jpg"],
  },
  keywords: [
    "plumber Norfolk",
    "plumber Suffolk", 
    "boiler service Norfolk",
    "CP12 gas safety certificate",
    "Gas Safe engineer",
    "emergency plumber",
    "EAB Plumbing",
    "plumber Essex",
    "plumber London",
    "heating engineer",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white">{children}</body>
    </html>
  );
}
