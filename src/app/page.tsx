import Link from "next/link";
import ChatBot from "@/components/ChatBot";

const RICK = "+447344624714";
const WA = "https://wa.me/447344624714";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-blue-700 rounded-lg flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
            </div>
            <span className="font-bold text-gray-900 text-sm">EAB Plumbing <span className="text-blue-700">&</span> Heating</span>
          </div>
          <a href={`tel:${RICK}`} className="bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold">Call Now</a>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-28 pb-16 px-4 bg-gradient-to-b from-blue-950 to-blue-900 text-white">
        <div className="max-w-2xl mx-auto text-center">
          <div className="flex items-center justify-center mb-8">
            <div className="relative">
              <div className="w-24 h-24 bg-blue-600 rounded-2xl flex items-center justify-center shadow-2xl">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
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
              📞 Call Rick Now
            </a>
            <a href={WA} target="_blank" rel="noopener noreferrer" className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-bold text-base flex items-center justify-center gap-2 transition-colors">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              WhatsApp Rick
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
              { emoji: "🔥", title: "Boiler Service", desc: "Annual service & safety check" },
              { emoji: "📋", title: "Gas Safety Cert", desc: "CP12 certificates — same day available" },
              { emoji: "🚨", title: "Emergency Callouts", desc: "No heating, gas leak, burst pipe" },
              { emoji: "🔧", title: "Plumbing Repairs", desc: "Leaks, taps, drains, bathrooms" },
              { emoji: "🌡️", title: "Boiler Repairs", desc: "All major boiler brands" },
              { emoji: "🚿", title: "Bathroom Fitting", desc: "Full installations & wet rooms" },
              { emoji: "🏠", title: "Radiators", desc: "Install, bleed, power flush" },
              { emoji: "💧", title: "Landlord Services", desc: "Annual gas checks & CP12s" },
            ].map(s => (
              <div key={s.title} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                <div className="text-2xl mb-2">{s.emoji}</div>
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
              { icon: "🛡️", title: "Gas Safe Registered", desc: "All engineers are fully Gas Safe registered — legally compliant and your guarantee of safety." },
              { icon: "⚡", title: "Fast Response", desc: "Emergency callouts across Norfolk, Suffolk, Essex and London. When heating fails, we get there fast." },
              { icon: "💬", title: "Honest Pricing", desc: "Clear quote before we start. No hidden charges, no surprises on the invoice." },
            ].map(w => (
              <div key={w.title} className="text-center p-6">
                <div className="text-4xl mb-3">{w.icon}</div>
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
            📞 Call Rick — {RICK}
          </a>
          <a href={WA} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-semibold text-sm transition-colors">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            WhatsApp Rick
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 text-center py-8 px-4">
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
          </div>
          <span className="text-sm font-medium text-gray-300">EAB Plumbing & Heating</span>
        </div>
        <p className="text-xs">Gas Safe Registered · Norfolk · Suffolk · Essex · London</p>
        <div className="mt-4 pt-4 border-t border-gray-800">
          <Link href="/login" className="text-xs text-gray-600 hover:text-gray-400">Admin Login</Link>
        </div>
      </footer>

      <ChatBot />
    </div>
  );
}
