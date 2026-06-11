import { store } from "@/lib/store";
import { FileText, Calendar, Users, AlertCircle, PoundSterling } from "lucide-react";
import Link from "next/link";
import InfoModal from "@/components/InfoModal";

const DASHBOARD_INFO = [
  { heading: "📊 Your Dashboard", text: "Home screen showing a quick summary — what's owed, what's paid, your customers, and booked jobs." },
  { heading: "💰 Outstanding", text: "Total on invoices not yet paid. Tap Invoices to chase or mark paid." },
  { heading: "✅ Paid", text: "Total money received. When you mark an invoice paid it moves here." },
  { heading: "Quick Actions", text: "Shortcuts to create a new invoice, quote, job, or customer." },
  { heading: "💡 Tip", text: "Save to your home screen — tap Share in your browser then 'Add to Home Screen'." },
];

export default function Dashboard() {
  const invoices = store.getInvoices();
  const jobs = store.getJobs();
  const customers = store.getCustomers();
  const outstanding = invoices.filter(i => i.status === "outstanding").reduce((s, i) => s + i.total, 0);
  const paid = invoices.filter(i => i.status === "paid").reduce((s, i) => s + i.total, 0);

  return (
    <div className="max-w-lg mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
        <InfoModal title="How to use Dashboard" content={DASHBOARD_INFO} />
      </div>
      <div className="grid grid-cols-2 gap-3 mb-6">
        {[
          { label: "Outstanding", value: `£${outstanding.toFixed(2)}`, icon: AlertCircle, color: "text-amber-600 bg-amber-50" },
          { label: "Paid", value: `£${paid.toFixed(2)}`, icon: PoundSterling, color: "text-green-600 bg-green-50" },
          { label: "Customers", value: customers.length, icon: Users, color: "text-blue-600 bg-blue-50" },
          { label: "Jobs", value: jobs.length, icon: Calendar, color: "text-purple-600 bg-purple-50" },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-2 ${color}`}><Icon className="w-4 h-4" /></div>
            <div className="text-xl font-bold text-gray-900">{value}</div>
            <div className="text-xs text-gray-500 mt-0.5">{label}</div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-3 mb-6">
        {[
          { href: "/invoices", label: "New Invoice", color: "bg-blue-700 text-white" },
          { href: "/quotes", label: "New Quote", color: "bg-blue-100 text-blue-700" },
          { href: "/jobs", label: "Add Job", color: "bg-blue-100 text-blue-700" },
          { href: "/customers", label: "Add Customer", color: "bg-blue-100 text-blue-700" },
        ].map(({ href, label, color }) => (
          <Link key={href} href={href} className={`flex items-center gap-2 justify-center rounded-xl py-3 text-sm font-semibold ${color} active:scale-95 transition-transform`}>{label}</Link>
        ))}
      </div>
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
        <div className="px-4 py-3 border-b border-gray-50 flex items-center gap-2">
          <FileText className="w-4 h-4 text-blue-600" />
          <span className="font-semibold text-sm text-gray-900">Recent Invoices</span>
        </div>
        {invoices.slice(0, 4).map(inv => (
          <div key={inv.id} className="px-4 py-3 flex items-center justify-between border-b border-gray-50 last:border-0">
            <div>
              <div className="font-medium text-sm text-gray-900">{inv.number}</div>
              <div className="text-xs text-gray-400">{inv.customerName}</div>
            </div>
            <div className="text-right">
              <div className="font-semibold text-sm">£{inv.total.toFixed(2)}</div>
              <span className={`text-xs px-2 py-0.5 rounded-full ${inv.status === "paid" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}>{inv.status}</span>
            </div>
          </div>
        ))}
        {invoices.length === 0 && <div className="p-4 text-sm text-gray-400 text-center">No invoices yet</div>}
      </div>
    </div>
  );
}
