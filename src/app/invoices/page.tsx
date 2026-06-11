"use client";
import { useState } from "react";
import { Plus, FileText, Send, CheckCircle2 } from "lucide-react";

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
    const inv = { ...form, id: Date.now().toString(), number: `INV-${String(counter).padStart(3, "0")}`, total, status: "outstanding", date: new Date().toISOString().split("T")[0] };
    setInvoices(is => [...is, inv]);
    setCounter(c => c + 1);
    setForm(INITIAL);
    setShowing(false);
  };

  const markPaid = (id: string) => setInvoices(is => is.map(i => i.id === id ? { ...i, status: "paid" } : i));

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Invoices</h1>
        <button onClick={() => setShowing(true)} className="flex items-center gap-2 bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-800">
          <Plus className="w-4 h-4" /> New Invoice
        </button>
      </div>

      {showing && (
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6 shadow-sm">
          <h2 className="font-semibold text-gray-900 mb-4">New Invoice</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <input className="border rounded-lg px-3 py-2 text-sm" placeholder="Customer name" value={form.customerName} onChange={e => setForm(f => ({ ...f, customerName: e.target.value }))} />
            <input className="border rounded-lg px-3 py-2 text-sm" placeholder="Customer email" value={form.customerEmail} onChange={e => setForm(f => ({ ...f, customerEmail: e.target.value }))} />
            <input className="border rounded-lg px-3 py-2 text-sm" placeholder="Due date" type="date" value={form.dueDate} onChange={e => setForm(f => ({ ...f, dueDate: e.target.value }))} />
          </div>
          <input className="border rounded-lg px-3 py-2 text-sm w-full mb-4" placeholder="Customer address" value={form.customerAddress} onChange={e => setForm(f => ({ ...f, customerAddress: e.target.value }))} />
          <div className="space-y-2 mb-4">
            <div className="grid grid-cols-12 gap-2 text-xs text-gray-500 font-medium px-1">
              <div className="col-span-6">Description</div><div className="col-span-2">Qty</div><div className="col-span-3">Unit Price (£)</div>
            </div>
            {form.items.map((it, idx) => (
              <div key={idx} className="grid grid-cols-12 gap-2">
                <input className="col-span-6 border rounded-lg px-3 py-2 text-sm" placeholder="Description" value={it.description} onChange={e => updateItem(idx, "description", e.target.value)} />
                <input className="col-span-2 border rounded-lg px-3 py-2 text-sm" type="number" min="1" value={it.quantity} onChange={e => updateItem(idx, "quantity", +e.target.value)} />
                <input className="col-span-3 border rounded-lg px-3 py-2 text-sm" type="number" min="0" step="0.01" value={it.unitPrice} onChange={e => updateItem(idx, "unitPrice", +e.target.value)} />
              </div>
            ))}
            <button onClick={addItem} className="text-blue-600 text-sm hover:underline">+ Add line item</button>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-semibold text-gray-900">Total: £{total.toFixed(2)}</span>
            <div className="flex gap-2">
              <button onClick={() => setShowing(false)} className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900">Cancel</button>
              <button onClick={submit} className="bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-800">Create Invoice</button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
        <table className="w-full text-sm">
          <thead><tr className="border-b border-gray-100 text-left text-xs text-gray-500 font-medium">
            <th className="p-4">Invoice</th><th className="p-4">Customer</th><th className="p-4">Date</th><th className="p-4">Due</th><th className="p-4">Total</th><th className="p-4">Status</th><th className="p-4"></th>
          </tr></thead>
          <tbody className="divide-y divide-gray-50">
            {invoices.map(inv => (
              <tr key={inv.id} className="hover:bg-gray-50">
                <td className="p-4 font-medium text-blue-700">{inv.number}</td>
                <td className="p-4 text-gray-700">{inv.customerName}</td>
                <td className="p-4 text-gray-500">{inv.date}</td>
                <td className="p-4 text-gray-500">{inv.dueDate}</td>
                <td className="p-4 font-semibold">£{inv.total.toFixed(2)}</td>
                <td className="p-4"><span className={`text-xs px-2 py-1 rounded-full font-medium ${inv.status === "paid" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}>{inv.status}</span></td>
                <td className="p-4">
                  {inv.status !== "paid" && <button onClick={() => markPaid(inv.id)} className="text-green-600 hover:text-green-800 flex items-center gap-1 text-xs"><CheckCircle2 className="w-3 h-3" />Mark Paid</button>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
