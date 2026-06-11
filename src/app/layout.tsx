import type { Metadata } from "next";
import "./globals.css";
import MobileNav from "@/components/MobileNav";

export const metadata: Metadata = {
  title: "EAB Plumbing & Heating",
  description: "Job management for EAB Plumbing & Heating",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen">
        <div className="pb-20 min-h-screen">
          <header className="bg-blue-800 text-white px-4 py-3 flex items-center gap-2 sticky top-0 z-40">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
            <span className="font-bold text-sm">EAB Plumbing & Heating</span>
          </header>
          <main className="px-4 py-4">{children}</main>
        </div>
        <MobileNav />
      </body>
    </html>
  );
}
