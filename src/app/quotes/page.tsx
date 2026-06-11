"use client";
import { useState } from "react";
import { Plus } from "lucide-react";
import InfoModal from "@/components/InfoModal";

const QUOTE_INFO = [
  { heading: "📋 What is a Quote?", text: "A quote tells a customer what a job will cost before you do it. Once they agree, you can convert it into an invoice with one tap." },
  { heading: "🔥 Templates", text: "You have 4 pre-built templates for your most common jobs — Boiler Service, CP12, Emergency Callout, and General Plumbing. Tap one to start a quote instantly." },
  { heading: "✏️ Editing Prices", text: "All prices in the template are editable. If a job costs more than the base rate, just change the price before saving." },
  { heading: "📤 Sending Quotes", text: "Once email is wired up, you'll be able to send quotes directly to customers. For now, save the quote and call the customer with the price." },
  { heading: "💡 Tip", text: "Always do a quote before starting a job — it protects you if a customer disputes the price later." },
];

const TEMPLATES = [
  { name: "Boiler Service", emoji: "🔥", items: [{ description: "Annual Boiler Service & Safety Check", quantity: 1, unitPrice: 85 }] },
  { name: "CP12 Certificate", emoji: "📋", items: [{ description: "Gas Safety Certificate (CP12)", quantity: 1, unitPrice: 65 }] },
  { name: "Emergency Callout", emoji: "🚨", items: [{ description: "Emergency Callout (first hour)", quantity: 1, unitPrice: 120 }] },
  { name: "General Plumbing", emoji: "🔧", items: [{ description: "Labour (per hour)", quantity: 1, unitPrice: 65 }, { description: "Parts & materials", quantity: 1, unitPrice: 0 }] },
];

export default function QuotesPage() {
  const [quotes, setQuotes] = useState<any[]>([]);
  const [showing, setShowing] = useState(false);
  const [form, setForm] = useState({ customerName: "", template: "", items: [] as any[] });

  const total = form.items.reduce((s: number, i: any) => s + i.quantity * i.unitPrice, 0);
  const updateItem = (idx: number, field: string, val: any) => setForm(f => ({ ...f, items: f.items.map((it: any, i: number) => i === idx ? { ...it, [field]: val } : it) }));

  const submit = () => {
    setQuotes((qs: any[]) => [...qs, { ...form, id: Date.now().toString(), total, status: "draft", date: new Date().toISOString().split("T")[0] }]);
    setForm({ customerName: "", template: "", items: [] }); setShowing(false);
  };

  if (showing) return (
    <div className="max-w-lg mx-auto">
      <div className="flex items-center gap-3 mb-5">
        <button onClick={() => setShowing(false)} className="text-blue-600 font-medium text-sm">← Back</button>
        <h1 className="text-lg font-bold text-gray-900">{form.template || "New Quote"}</h1>
      </div>
      <input className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-white mb-3" placeholder="Customer name" value={form.customerName} onChange={e => setForm(f => ({ ...f, customerName: e.target.value }))} />
      <div className="space-y-2 mb-4">
        {form.items.map((it: any, idx: number) => (
          <div key={idx} className="bg-white border border-gray-200 rounded-xl p-3 space-y-2">
            <input className="w-full border border-gray-100 rounded-lg px-3 py-2 text-sm" value={it.description} onChange={e => updateItem(idx, "description", e.target.value)} />
            <div className="grid grid-cols-2 gap-2">
              <input className="border border-gray-100 rounded-lg px-3 py-2 text-sm" type="number" placeholder="Qty" value={it.quantity} onChange={e => updateItem(idx, "quantity", +e.target.value)} />
              <input className="border border-gray-100 rounded-lg px-3 py-2 text-sm" type="number" placeholder="£ Price" value={it.unitPrice} onChange={e => updateItem(idx, "unitPrice", +e.target.value)} />
            </div>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-xl border border-gray-100 p-4 mb-5 flex justify-between">
        <span className="font-semibold text-gray-700">Total</span>
        <span className="font-bold text-lg text-blue-700">£{total.toFixed(2)}</span>
      </div>
      <button onClick={submit} className="w-full bg-blue-700 text-white py-4 rounded-xl font-semibold text-sm active:scale-95 transition-transform">Save Quote</button>
    </div>
  );

  return (
    <div className="max-w-lg mx-auto">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-xl font-bold text-gray-900">Quotes</h1>
        <InfoModal title="How to use Quotes" content={QUOTE_INFO} />
      </div>
      <p className="text-sm text-gray-500 mb-4">Tap a template to get started</p>
      <div className="grid grid-cols-2 gap-3 mb-6">
        {TEMPLATES.map(t => (
          <button key={t.name} onClick={() => { setForm({ customerName: "", template: t.name, items: t.items.map((i: any) => ({ ...i })) }); setShowing(true); }}
            className="bg-white border border-gray-200 rounded-xl p-4 text-left hover:border-blue-400 active:scale-95 transition-all">
            <div className="text-2xl mb-1">{t.emoji}</div>
            <div className="font-medium text-gray-900 text-sm">{t.name}</div>
            <div className="text-xs text-blue-600 mt-0.5">from £{t.items.reduce((s: number, i: any) => s + i.quantity * i.unitPrice, 0)}</div>
          </button>
        ))}
      </div>
      {quotes.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
          {quotes.map((q: any) => (
            <div key={q.id} className="p-4 border-b border-gray-50 last:border-0 flex justify-between items-center">
              <div>
                <div className="font-medium text-sm text-gray-900">{q.customerName}</div>
                <div className="text-xs text-gray-400">{q.template}</div>
              </div>
              <div className="text-right">
                <div className="font-bold text-sm">£{q.total.toFixed(2)}</div>
                <span className="text-xs text-gray-400">{q.status}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
