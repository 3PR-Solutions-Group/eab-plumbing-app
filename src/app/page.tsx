import Link from "next/link";
import ChatBot from "@/components/ChatBot";

const RICK = "+447344624714";
const WA = "https://wa.me/447344624714";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur border-b border-gray-100 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-blue-700 rounded-lg flex items-center justify-center">
              <WrenchIcon className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-gray-900 text-sm">EAB Plumbing <span className="text-blue-700">&</span> Heating</span>
          </div>
          <a href={`tel:${RICK}`} className="bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-1.5">
            <PhoneIcon className="w-4 h-4" /> Call Now
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-28 pb-16 px-4 bg-gradient-to-b from-blue-950 to-blue-900 text-white">
        <div className="max-w-2xl mx-auto text-center">
          <div className="flex items-center justify-center mb-8">
            <div className="relative">
              <div className="w-24 h-24 bg-blue-600 rounded-2xl flex items-center justify-center shadow-2xl">
                <WrenchIcon className="w-12 h-12 text-white" strokeWidth={1.5} />
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                <FlameIcon className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
          <div className="inline-flex items-center gap-2 bg-blue-800/50 border border-blue-700 rounded-full px-4 py-1.5 text-xs text-blue-200 mb-5">
            <span className="w-2 h-2 bg-green-400 rounded-full inline-block"></span>
            Gas Safe Registered · Norfolk, Suffolk, Essex & London
          </div>
          <h1 className="text-4xl font-black mb-4 leading-tight">Your Local Gas Safe<br /><span className="text-orange-400">Engineer & Plumber</span></h1>
          <p className="text-blue-200 text-lg mb-8 leading-relaxed">Boiler services, gas safety certificates, emergency callouts, and plumbing repairs. Fast, reliable, Gas Safe registered.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href={`tel:${RICK}`} className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-xl font-bold text-base flex items-center justify-center gap-2 transition-colors">
              <PhoneIcon className="w-5 h-5" /> Call Rick Now
            </a>
            <a href={WA} target="_blank" rel="noopener noreferrer" className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-bold text-base flex items-center justify-center gap-2 transition-colors">
              <WhatsAppIcon className="w-5 h-5" /> WhatsApp Rick
            </a>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-black text-gray-900 text-center mb-2">Our Services</h2>
          <p className="text-gray-500 text-center text-sm mb-10">Everything for your home heating and plumbing</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: <FlameIcon className="w-6 h-6" />, title: "Boiler Service", desc: "Annual service & safety check" },
              { icon: <ClipboardIcon className="w-6 h-6" />, title: "Gas Safety Cert", desc: "CP12 certificates — same day available" },
              { icon: <AlertIcon className="w-6 h-6" />, title: "Emergency Callouts", desc: "No heating, gas leak, burst pipe" },
              { icon: <WrenchIcon className="w-6 h-6" />, title: "Plumbing Repairs", desc: "Leaks, taps, drains, bathrooms" },
              { icon: <SettingsIcon className="w-6 h-6" />, title: "Boiler Repairs", desc: "All major boiler brands" },
              { icon: <ShowerIcon className="w-6 h-6" />, title: "Bathroom Fitting", desc: "Full installations & wet rooms" },
              { icon: <RadioatorIcon className="w-6 h-6" />, title: "Radiators", desc: "Install, bleed, power flush" },
              { icon: <HomeIcon className="w-6 h-6" />, title: "Landlord Services", desc: "Annual gas checks & CP12s" },
            ].map(s => (
              <div key={s.title} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-700 mb-3">{s.icon}</div>
                <div className="font-bold text-gray-900 text-sm mb-1">{s.title}</div>
                <div className="text-xs text-gray-500 leading-relaxed">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-black text-gray-900 text-center mb-10">Why Choose EAB?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: <ShieldIcon className="w-8 h-8 text-blue-700" />, title: "Gas Safe Registered", desc: "All engineers are fully Gas Safe registered — legally compliant and your guarantee of safety." },
              { icon: <BoltIcon className="w-8 h-8 text-blue-700" />, title: "Fast Response", desc: "Emergency callouts across Norfolk, Suffolk, Essex and London. When heating fails, we get there fast." },
              { icon: <StarIcon className="w-8 h-8 text-blue-700" />, title: "Honest Pricing", desc: "Clear quote before we start. No hidden charges, no surprises on the invoice." },
            ].map(w => (
              <div key={w.title} className="text-center p-6">
                <div className="flex justify-center mb-3 opacity-90">{w.icon}</div>
                <div className="font-bold text-gray-900 mb-2">{w.title}</div>
                <div className="text-sm text-gray-500 leading-relaxed">{w.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coverage */}
      <section className="py-12 px-4 bg-blue-900 text-white">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-xl font-black mb-3">Areas We Cover</h2>
          <p className="text-blue-200 text-sm mb-6">Based in Norfolk with full coverage across the region and London</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {["Norfolk", "Suffolk", "Essex", "London", "Norwich", "Ipswich", "Chelmsford", "Colchester"].map(a => (
              <span key={a} className="bg-blue-800 border border-blue-700 text-blue-100 px-3 py-1.5 rounded-full text-xs font-medium">{a}</span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-md mx-auto text-center">
          <h2 className="text-2xl font-black text-gray-900 mb-3">Need a Gas Engineer?</h2>
          <p className="text-gray-500 text-sm mb-6">Call or WhatsApp for a fast quote. We typically respond within the hour.</p>
          <a href={`tel:${RICK}`} className="flex items-center justify-center gap-2 w-full bg-blue-700 hover:bg-blue-800 text-white py-4 rounded-xl font-bold text-base mb-3 transition-colors">
            <PhoneIcon className="w-5 h-5" /> Call Rick — {RICK}
          </a>
          <a href={WA} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-semibold text-base transition-colors">
            <WhatsAppIcon className="w-5 h-5" /> WhatsApp Rick
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 text-center py-8 px-4">
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
            <WrenchIcon className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="text-sm font-medium text-gray-300">EAB Plumbing & Heating</span>
        </div>
        <p className="text-xs">Gas Safe Registered · Norfolk · Suffolk · Essex · London</p>
        <div className="mt-4 pt-4 border-t border-gray-800">
          <Link href="/admin" className="text-xs text-gray-600 hover:text-gray-400">Admin Login</Link>
        </div>
      </footer>

      <ChatBot />
    </div>
  );
}

/* ── Inline SVG icon components ── */
function WrenchIcon({ className, strokeWidth = 2 }: { className?: string; strokeWidth?: number }) {
  return <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>;
}
function FlameIcon({ className }: { className?: string }) {
  return <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>;
}
function PhoneIcon({ className }: { className?: string }) {
  return <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.82 12 19.79 19.79 0 0 1 1.75 3.38 2 2 0 0 1 3.74 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.69a16 16 0 0 0 6.29 6.29l1.06-1.06a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>;
}
function WhatsAppIcon({ className }: { className?: string }) {
  return <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>;
}
function ClipboardIcon({ className }: { className?: string }) {
  return <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="8" y="2" width="8" height="4" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><line x1="12" y1="11" x2="16" y2="11"/><line x1="12" y1="16" x2="16" y2="16"/><line x1="8" y1="11" x2="8.01" y2="11"/><line x1="8" y1="16" x2="8.01" y2="16"/></svg>;
}
function AlertIcon({ className }: { className?: string }) {
  return <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>;
}
function SettingsIcon({ className }: { className?: string }) {
  return <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>;
}
function ShowerIcon({ className }: { className?: string }) {
  return <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12h16M4 12a9.96 9.96 0 0 0 1 4.25M4 12V6a2 2 0 0 1 2-2h2M20 12a9.96 9.96 0 0 1-1 4.25M9 4h6"/><line x1="8" y1="17" x2="8" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/><line x1="16" y1="17" x2="16" y2="21"/></svg>;
}
function RadioatorIcon({ className }: { className?: string }) {
  return <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="6" width="20" height="12" rx="2"/><line x1="7" y1="6" x2="7" y2="18"/><line x1="12" y1="6" x2="12" y2="18"/><line x1="17" y1="6" x2="17" y2="18"/></svg>;
}
function HomeIcon({ className }: { className?: string }) {
  return <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
}
function ShieldIcon({ className }: { className?: string }) {
  return <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>;
}
function BoltIcon({ className }: { className?: string }) {
  return <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>;
}
function StarIcon({ className }: { className?: string }) {
  return <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>;
}
