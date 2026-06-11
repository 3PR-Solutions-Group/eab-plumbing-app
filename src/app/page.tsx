import { store } from "@/lib/store";
import { FileText, Calendar, Users, PoundSterling, AlertCircle, CheckCircle2 } from "lucide-react";

export default function Dashboard() {
  const invoices = store.getInvoices();
  const jobs = store.getJobs();
  const customers = store.getCustomers();
  const outstanding = invoices.filter(i => i.status === "outstanding").reduce((s, i) => s + i.total, 0);
  const paid = invoices.filter(i => i.status === "paid").reduce((s, i) => s + i.total, 0);
  const todayJobs = jobs.filter(j => j.date === new Date().toISOString().split("T")[0]);

  const stats = [
    { label: "Outstanding", value: `£${outstanding.toFixed(2)}`, icon: AlertCircle, color: "text-amber-600 bg-amber-50" },
    { label: "Paid This Month", value: `£${paid.toFixed(2)}`, icon: PoundSterling, color: "text-green-600 bg-green-50" },
    { label: "Total Customers", value: customers.length, icon: Users, color: "text-blue-600 bg-blue-50" },
    { label: "Jobs Today", value: todayJobs.length, icon: Calendar, color: "text-purple-600 bg-purple-50" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${color}`}>
              <Icon className="w-5 h-5" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{value}</div>
            <div className="text-sm text-gray-500 mt-1">{label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-4 border-b border-gray-100 flex items-center gap-2">
            <FileText className="w-4 h-4 text-blue-600" />
            <h2 className="font-semibold text-gray-900">Recent Invoices</h2>
          </div>
          <div className="divide-y divide-gray-50">
            {invoices.slice(0, 5).map(inv => (
              <div key={inv.id} className="p-4 flex items-center justify-between">
                <div>
                  <div className="font-medium text-gray-900 text-sm">{inv.number}</div>
                  <div className="text-xs text-gray-500">{inv.customerName}</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-gray-900">£{inv.total.toFixed(2)}</div>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${inv.status === "paid" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}>
                    {inv.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-4 border-b border-gray-100 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-blue-600" />
            <h2 className="font-semibold text-gray-900">Upcoming Jobs</h2>
          </div>
          <div className="divide-y divide-gray-50">
            {jobs.slice(0, 5).map(job => (
              <div key={job.id} className="p-4 flex items-center justify-between">
                <div>
                  <div className="font-medium text-gray-900 text-sm">{job.title}</div>
                  <div className="text-xs text-gray-500">{job.customerName}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-700">{job.time}</div>
                  <div className="text-xs text-gray-500">{job.date}</div>
                </div>
              </div>
            ))}
            {jobs.length === 0 && <div className="p-4 text-sm text-gray-400 text-center">No upcoming jobs</div>}
          </div>
        </div>
      </div>
    </div>
  );
}
