"use client";
import { useState } from "react";
import { Plus, CheckCircle2, ChevronRight } from "lucide-react";

const INITIAL = { customerName: "", customerEmail: "", customerAddress: "", items: [{ description: "", quantity: 1, unitPrice: 0 }], notes: "", dueDate: "" };

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState([
    { id: "1", number: "INV-001", customerName: "John Smith", customerEmail: "john@example.com", customerAddress: "12 Oak Street, Norwich", items: [{ description: "Annual Boiler Service", quantity: 1, unitPrice: 85 }], total: 85, status: "outstanding", date: new Date().toISOString().split("T")[0], dueDate: new Date(Date.now() + 14 * 86400000).toISOString().split("T")[0], notes: "" },
  ]);
  const [form, setForm] = useState(INITIAL);
  const [showing, setShowing] = useState(false);
  const [counter, setCounter] = useState(2);

  const total = form.items.reduce((s, i) => s + i.quantity * i.unitPrice, 0);
  const addItem = () => setForm(f => ({ ...f, items: [...f.items, { description: "", quantity: 1, unitPrice: 0 }] }));
  const updateItem = (idx: number, field: string, val: string | number) => setForm(f => ({ ...f, items: f.items.map((it, i) => i === idx ? { ...it, [field]: val } : it) }));

  const submit = () => {
    setInvoices(is => [...is, { ...form, id: Date.now().toString(), number: `INV-${String(counter).padStart(3, "0")}`, total, status: "outstanding", date: new Date().toISOString().split("T")[0] }]);
    setCounter(c => c + 1); setForm(INITIAL); setShowing(false);
  };

  const markPaid = (id: string) => setInvoices(is => is.map(i => i.id === id ? { ...i, status: "paid" } : i));

  if (showing) return (
    <div className="max-w-lg mx-auto">
      <div className="flex items-center gap-3 mb-5">
        <button onClick={() => setShowing(false)} className="text-blue-600 font-medium text-sm">← Back</button>
        <h1 className="text-lg font-bold text-gray-900">New Invoice</h1>
      </div>
      <div className="space-y-3 mb-5">
        <input className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-white" placeholder="Customer name" value={form.customerName} onChange={e => setForm(f => ({ ...f, customerName: e.target.value }))} />
        <input className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-white" placeholder="Customer email" type="email" value={form.customerEmail} onChange={e => setForm(f => ({ ...f, customerEmail: e.target.value }))} />
        <input className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-white" placeholder="Customer address" value={form.customerAddress} onChange={e => setForm(f => ({ ...f, customerAddress: e.target.value }))} />
        <input className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-white" type="date" placeholder="Due date" value={form.dueDate} onChange={e => setForm(f => ({ ...f, dueDate: e.target.value }))} />
      </div>
      <h2 className="font-semibold text-sm text-gray-700 mb-2">Line Items</h2>
      <div className="space-y-2 mb-3">
        {form.items.map((it, idx) => (
          <div key={idx} className="bg-white border border-gray-200 rounded-xl p-3 space-y-2">
            <input className="w-full border border-gray-100 rounded-lg px-3 py-2 text-sm" placeholder="Description" value={it.description} onChange={e => updateItem(idx, "description", e.target.value)} />
            <div className="grid grid-cols-2 gap-2">
              <input className="border border-gray-100 rounded-lg px-3 py-2 text-sm" type="number" placeholder="Qty" value={it.quantity} onChange={e => updateItem(idx, "quantity", +e.target.value)} />
              <input className="border border-gray-100 rounded-lg px-3 py-2 text-sm" type="number" placeholder="£ Price" value={it.unitPrice} onChange={e => updateItem(idx, "unitPrice", +e.target.value)} />
            </div>
          </div>
        ))}
        <button onClick={addItem} className="text-blue-600 text-sm font-medium">+ Add item</button>
      </div>
      <div className="bg-white rounded-xl border border-gray-100 p-4 mb-5 flex justify-between">
        <span className="font-semibold text-gray-700">Total</span>
        <span className="font-bold text-lg text-blue-700">£{total.toFixed(2)}</span>
      </div>
      <button onClick={submit} className="w-full bg-blue-700 text-white py-4 rounded-xl font-semibold text-sm">Create Invoice</button>
    </div>
  );

  return (
    <div className="max-w-lg mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold text-gray-900">Invoices</h1>
        <button onClick={() => setShowing(true)} className="flex items-center gap-1.5 bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-semibold">
          <Plus className="w-4 h-4" /> New
        </button>
      </div>
      <div className="space-y-2">
        {invoices.map(inv => (
          <div key={inv.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex items-center justify-between">
            <div>
              <div className="font-semibold text-sm text-gray-900">{inv.number} · {inv.customerName}</div>
              <div className="text-xs text-gray-400 mt-0.5">Due {inv.dueDate}</div>
              <span className={`inline-block mt-1 text-xs px-2 py-0.5 rounded-full font-medium ${inv.status === "paid" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}>{inv.status}</span>
            </div>
            <div className="text-right">
              <div className="font-bold text-base text-gray-900">£{inv.total.toFixed(2)}</div>
              {inv.status !== "paid" && <button onClick={() => markPaid(inv.id)} className="mt-1 text-xs text-green-600 flex items-center gap-0.5 ml-auto"><CheckCircle2 className="w-3 h-3" />Paid</button>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
