import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EAB Plumbing & Heating",
  description: "Gas Safe engineers covering Norfolk, Suffolk, Essex & London. Boiler services, CP12 certificates, emergency callouts and plumbing repairs.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white">{children}</body>
    </html>
  );
}
