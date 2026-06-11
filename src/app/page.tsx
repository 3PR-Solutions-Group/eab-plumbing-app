import Link from "next/link";

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
          <a href="tel:+44" className="bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold">Call Now</a>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-28 pb-16 px-4 bg-gradient-to-b from-blue-950 to-blue-900 text-white">
        <div className="max-w-2xl mx-auto text-center">
          {/* Logo */}
          <div className="flex items-center justify-center mb-8">
            <div className="relative">
              <div className="w-24 h-24 bg-blue-600 rounded-2xl flex items-center justify-center shadow-2xl">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a5 5 0 0 1 5 5c0 3.5-5 11-5 11S7 10.5 7 7a5 5 0 0 1 5-5z"/></svg>
              </div>
            </div>
          </div>
          <div className="inline-flex items-center gap-2 bg-blue-800/50 border border-blue-700 rounded-full px-4 py-1.5 text-xs text-blue-200 mb-5">
            <span className="w-2 h-2 bg-green-400 rounded-full inline-block"></span>
            Gas Safe Registered · Norfolk, Suffolk, Essex & London
          </div>
          <h1 className="text-4xl font-black mb-4 leading-tight">Your Local Gas Safe<br /><span className="text-orange-400">Engineer & Plumber</span></h1>
          <p className="text-blue-200 text-lg mb-8 leading-relaxed">Boiler services, gas safety certificates, emergency callouts, and plumbing repairs. Fast, reliable, and Gas Safe registered.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="tel:+44" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-xl font-bold text-base flex items-center justify-center gap-2 transition-colors">
              📞 Call for a Quote
            </a>
            <a href="mailto:info@eabplumbing.co.uk" className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-4 rounded-xl font-semibold text-base flex items-center justify-center gap-2 transition-colors">
              ✉️ Email Us
            </a>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-black text-gray-900 text-center mb-2">Our Services</h2>
          <p className="text-gray-500 text-center text-sm mb-10">Everything for your home heating and plumbing needs</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { emoji: "🔥", title: "Boiler Service", desc: "Annual service & safety check to keep your boiler efficient and safe" },
              { emoji: "📋", title: "Gas Safety Cert", desc: "CP12 certificates for landlords and homeowners — same day available" },
              { emoji: "🚨", title: "Emergency Callouts", desc: "No heating, gas leak, burst pipe? We're available when you need us most" },
              { emoji: "🔧", title: "Plumbing Repairs", desc: "Leaks, dripping taps, blocked drains, bathroom installs and more" },
              { emoji: "🌡️", title: "Boiler Repairs", desc: "Fault diagnosis and repair on all major boiler brands" },
              { emoji: "🚿", title: "Bathroom Fitting", desc: "Full bathroom installations and wet room conversions" },
              { emoji: "🏠", title: "Radiators", desc: "New radiator installation, bleeding, and power flushing" },
              { emoji: "💧", title: "Landlord Services", desc: "Annual gas safety checks, CP12s, and property maintenance packages" },
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
              { icon: "🛡️", title: "Gas Safe Registered", desc: "All our engineers are fully Gas Safe registered — it's a legal requirement and your guarantee of safety." },
              { icon: "⚡", title: "Fast Response", desc: "Emergency callouts across Norfolk, Suffolk, Essex and London. We understand when heating fails, you need help fast." },
              { icon: "💬", title: "Honest Pricing", desc: "No hidden charges. We give you a clear quote before starting any work. No surprises on the invoice." },
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
          <p className="text-gray-500 text-sm mb-6">Get in touch for a free quote. We typically respond within the hour.</p>
          <a href="tel:+44" className="block w-full bg-blue-700 hover:bg-blue-800 text-white py-4 rounded-xl font-bold text-base mb-3 transition-colors">
            📞 Call Now
          </a>
          <a href="mailto:info@eabplumbing.co.uk" className="block w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-4 rounded-xl font-semibold text-sm transition-colors">
            ✉️ Send an Email
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
    </div>
  );
}
