"use client";
import { useState } from "react";
import { Plus, Phone, Mail, MapPin } from "lucide-react";

export default function CustomersPage() {
  const [customers, setCustomers] = useState([
    { id: "1", name: "John Smith", email: "john@example.com", phone: "07700 900001", address: "12 Oak Street, Norwich, NR1 2AB", jobs: 1, invoices: 1 },
  ]);
  const [showing, setShowing] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "" });

  const submit = () => {
    setCustomers(cs => [...cs, { ...form, id: Date.now().toString(), jobs: 0, invoices: 0 }]);
    setForm({ name: "", email: "", phone: "", address: "" });
    setShowing(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Customers</h1>
        <button onClick={() => setShowing(true)} className="flex items-center gap-2 bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-800">
          <Plus className="w-4 h-4" /> New Customer
        </button>
      </div>

      {showing && (
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6 shadow-sm">
          <h2 className="font-semibold mb-4">New Customer</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input className="border rounded-lg px-3 py-2 text-sm" placeholder="Full name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
            <input className="border rounded-lg px-3 py-2 text-sm" placeholder="Email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
            <input className="border rounded-lg px-3 py-2 text-sm" placeholder="Phone" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
            <input className="border rounded-lg px-3 py-2 text-sm" placeholder="Address" value={form.address} onChange={e => setForm(f => ({ ...f, address: e.target.value }))} />
          </div>
          <div className="flex justify-end gap-2">
            <button onClick={() => setShowing(false)} className="px-4 py-2 text-sm text-gray-600">Cancel</button>
            <button onClick={submit} className="bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium">Save Customer</button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {customers.map(c => (
          <div key={c.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <div className="font-semibold text-gray-900 mb-3">{c.name}</div>
            <div className="space-y-1.5 mb-4">
              {c.email && <div className="flex items-center gap-2 text-sm text-gray-500"><Mail className="w-3.5 h-3.5" />{c.email}</div>}
              {c.phone && <div className="flex items-center gap-2 text-sm text-gray-500"><Phone className="w-3.5 h-3.5" />{c.phone}</div>}
              {c.address && <div className="flex items-center gap-2 text-sm text-gray-500"><MapPin className="w-3.5 h-3.5" />{c.address}</div>}
            </div>
            <div className="flex gap-4 border-t border-gray-50 pt-3">
              <div className="text-center"><div className="text-lg font-bold text-blue-700">{c.jobs}</div><div className="text-xs text-gray-400">Jobs</div></div>
              <div className="text-center"><div className="text-lg font-bold text-blue-700">{c.invoices}</div><div className="text-xs text-gray-400">Invoices</div></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
