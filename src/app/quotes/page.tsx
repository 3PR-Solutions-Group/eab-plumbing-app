"use client";
import { useState } from "react";
import { Plus, ArrowRight } from "lucide-react";

const TEMPLATES = [
  { name: "Boiler Service", items: [{ description: "Annual Boiler Service & Safety Check", quantity: 1, unitPrice: 85 }] },
  { name: "CP12 Gas Safety Certificate", items: [{ description: "Gas Safety Certificate (CP12)", quantity: 1, unitPrice: 65 }] },
  { name: "Emergency Callout", items: [{ description: "Emergency Callout (first hour)", quantity: 1, unitPrice: 120 }, { description: "Additional labour per hour", quantity: 0, unitPrice: 65 }] },
  { name: "General Plumbing", items: [{ description: "Labour (per hour)", quantity: 1, unitPrice: 65 }, { description: "Parts & materials", quantity: 1, unitPrice: 0 }] },
];

export default function QuotesPage() {
  const [quotes, setQuotes] = useState<any[]>([]);
  const [showing, setShowing] = useState(false);
  const [form, setForm] = useState({ customerName: "", template: "", items: [] as any[] });

  const selectTemplate = (name: string) => {
    const t = TEMPLATES.find(t => t.name === name);
    setForm(f => ({ ...f, template: name, items: t ? t.items.map(i => ({ ...i })) : [] }));
  };

  const updateItem = (idx: number, field: string, val: any) => setForm(f => ({ ...f, items: f.items.map((it, i) => i === idx ? { ...it, [field]: val } : it) }));
  const total = form.items.reduce((s, i) => s + i.quantity * i.unitPrice, 0);

  const submit = () => {
    setQuotes(qs => [...qs, { ...form, id: Date.now().toString(), total, status: "draft", date: new Date().toISOString().split("T")[0] }]);
    setForm({ customerName: "", template: "", items: [] });
    setShowing(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Quotes</h1>
        <button onClick={() => setShowing(true)} className="flex items-center gap-2 bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-800">
          <Plus className="w-4 h-4" /> New Quote
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {TEMPLATES.map(t => (
          <button key={t.name} onClick={() => { setForm({ customerName: "", template: t.name, items: t.items.map(i => ({ ...i })) }); setShowing(true); }}
            className="bg-white border border-gray-200 rounded-xl p-4 text-left hover:border-blue-400 hover:shadow-sm transition-all">
            <div className="font-medium text-gray-900 text-sm mb-1">{t.name}</div>
            <div className="text-xs text-gray-500">£{t.items.reduce((s, i) => s + i.quantity * i.unitPrice, 0)} base</div>
          </button>
        ))}
      </div>

      {showing && (
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6 shadow-sm">
          <h2 className="font-semibold mb-4">{form.template || "New Quote"}</h2>
          <input className="border rounded-lg px-3 py-2 text-sm w-full mb-4" placeholder="Customer name" value={form.customerName} onChange={e => setForm(f => ({ ...f, customerName: e.target.value }))} />
          <div className="space-y-2 mb-4">
            {form.items.map((it, idx) => (
              <div key={idx} className="grid grid-cols-12 gap-2">
                <input className="col-span-6 border rounded-lg px-3 py-2 text-sm" value={it.description} onChange={e => updateItem(idx, "description", e.target.value)} />
                <input className="col-span-2 border rounded-lg px-3 py-2 text-sm" type="number" value={it.quantity} onChange={e => updateItem(idx, "quantity", +e.target.value)} />
                <input className="col-span-3 border rounded-lg px-3 py-2 text-sm" type="number" value={it.unitPrice} onChange={e => updateItem(idx, "unitPrice", +e.target.value)} />
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between">
            <span className="font-semibold">Total: £{total.toFixed(2)}</span>
            <div className="flex gap-2">
              <button onClick={() => setShowing(false)} className="px-4 py-2 text-sm text-gray-600">Cancel</button>
              <button onClick={submit} className="bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium">Save Quote</button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
        {quotes.length === 0 ? (
          <div className="p-8 text-center text-gray-400 text-sm">No quotes yet. Select a template above to get started.</div>
        ) : (
          <table className="w-full text-sm">
            <thead><tr className="border-b border-gray-100 text-left text-xs text-gray-500 font-medium">
              <th className="p-4">Customer</th><th className="p-4">Template</th><th className="p-4">Date</th><th className="p-4">Total</th><th className="p-4">Status</th>
            </tr></thead>
            <tbody className="divide-y divide-gray-50">
              {quotes.map(q => (
                <tr key={q.id} className="hover:bg-gray-50">
                  <td className="p-4 font-medium">{q.customerName}</td>
                  <td className="p-4 text-gray-600">{q.template}</td>
                  <td className="p-4 text-gray-500">{q.date}</td>
                  <td className="p-4 font-semibold">£{q.total.toFixed(2)}</td>
                  <td className="p-4"><span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">{q.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
