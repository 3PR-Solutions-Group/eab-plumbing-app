"use client";
import { useState } from "react";
import { Plus, Phone, Mail, MapPin } from "lucide-react";

export default function CustomersPage() {
  const [customers, setCustomers] = useState([
    { id: "1", name: "John Smith", email: "john@example.com", phone: "07700 900001", address: "12 Oak Street, Norwich, NR1 2AB", jobs: 1, invoices: 1 },
  ]);
  const [showing, setShowing] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "" });

  const submit = () => { setCustomers(cs => [...cs, { ...form, id: Date.now().toString(), jobs: 0, invoices: 0 }]); setForm({ name: "", email: "", phone: "", address: "" }); setShowing(false); };

  if (showing) return (
    <div className="max-w-lg mx-auto">
      <div className="flex items-center gap-3 mb-5">
        <button onClick={() => setShowing(false)} className="text-blue-600 font-medium text-sm">← Back</button>
        <h1 className="text-lg font-bold text-gray-900">New Customer</h1>
      </div>
      <div className="space-y-3 mb-5">
        <input className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-white" placeholder="Full name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
        <input className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-white" placeholder="Email" type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
        <input className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-white" placeholder="Phone" type="tel" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
        <input className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-white" placeholder="Address" value={form.address} onChange={e => setForm(f => ({ ...f, address: e.target.value }))} />
      </div>
      <button onClick={submit} className="w-full bg-blue-700 text-white py-4 rounded-xl font-semibold text-sm">Save Customer</button>
    </div>
  );

  return (
    <div className="max-w-lg mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold text-gray-900">Customers</h1>
        <button onClick={() => setShowing(true)} className="flex items-center gap-1.5 bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-semibold">
          <Plus className="w-4 h-4" /> New
        </button>
      </div>
      <div className="space-y-3">
        {customers.map(c => (
          <div key={c.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
            <div className="font-semibold text-gray-900 mb-2">{c.name}</div>
            <div className="space-y-1 mb-3">
              {c.phone && <a href={`tel:${c.phone}`} className="flex items-center gap-2 text-sm text-blue-600"><Phone className="w-3.5 h-3.5" />{c.phone}</a>}
              {c.email && <a href={`mailto:${c.email}`} className="flex items-center gap-2 text-sm text-blue-600"><Mail className="w-3.5 h-3.5" />{c.email}</a>}
              {c.address && <div className="flex items-center gap-2 text-sm text-gray-500"><MapPin className="w-3.5 h-3.5" />{c.address}</div>}
            </div>
            <div className="flex gap-4 pt-2 border-t border-gray-50">
              <div><span className="font-bold text-blue-700">{c.jobs}</span> <span className="text-xs text-gray-400">jobs</span></div>
              <div><span className="font-bold text-blue-700">{c.invoices}</span> <span className="text-xs text-gray-400">invoices</span></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
