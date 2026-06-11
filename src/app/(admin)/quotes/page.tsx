"use client";
import { useEffect, useState } from "react";
import { Plus, ClipboardList } from "lucide-react";
import { supabase } from "@/lib/supabase";

type Quote = { id: string; quote_number: string; status: string; line_items: any[]; total: number; valid_until: string; notes: string; created_at: string; };
type LineItem = { description: string; quantity: number; unit_price: number; };
const EMPTY_ITEM: LineItem = { description: "", quantity: 1, unit_price: 0 };
const EMPTY = { customer_name: "", valid_until: "", notes: "", items: [EMPTY_ITEM] };

export default function QuotesPage() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [form, setForm] = useState(EMPTY);
  const [showing, setShowing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => { load(); }, []);

  async function load() {
    setLoading(true);
    const { data } = await supabase.from("quotes").select("*").order("created_at", { ascending: false });
    setQuotes(data || []);
    setLoading(false);
  }

  const total = form.items.reduce((s, i) => s + i.quantity * i.unit_price, 0);

  async function submit() {
    const { count } = await supabase.from("quotes").select("*", { count: "exact", head: true });
    const num = `QUO-${String((count || 0) + 1).padStart(3, "0")}`;
    await supabase.from("quotes").insert([{
      quote_number: num,
      status: "draft",
      line_items: form.items,
      subtotal: total,
      vat_rate: 0,
      vat_amount: 0,
      total,
      valid_until: form.valid_until,
      notes: form.notes,
    }]);
    setForm(EMPTY); setShowing(false); load();
  }

  const updateItem = (idx: number, field: string, val: string | number) =>
    setForm(p => ({ ...p, items: p.items.map((it, i) => i === idx ? { ...it, [field]: val } : it) }));

  if (showing) return (
    <div className="max-w-lg mx-auto">
      <div className="flex items-center gap-3 mb-5">
        <button onClick={() => setShowing(false)} className="text-blue-600 font-medium text-sm">← Back</button>
        <h1 className="text-lg font-bold text-gray-900">New Quote</h1>
      </div>
      <div className="space-y-3 mb-5">
        <input className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-white" placeholder="Customer name" value={form.customer_name} onChange={e => setForm(p => ({...p,customer_name:e.target.value}))} />
        <input className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-white" type="date" placeholder="Valid until" value={form.valid_until} onChange={e => setForm(p => ({...p,valid_until:e.target.value}))} />
      </div>
      <h2 className="font-semibold text-sm text-gray-700 mb-2">Line Items</h2>
      <div className="space-y-2 mb-3">
        {form.items.map((it, idx) => (
          <div key={idx} className="bg-white border border-gray-200 rounded-xl p-3 space-y-2">
            <input className="w-full border border-gray-100 rounded-lg px-3 py-2 text-sm" placeholder="Description" value={it.description} onChange={e => updateItem(idx, "description", e.target.value)} />
            <div className="grid grid-cols-2 gap-2">
              <input className="border border-gray-100 rounded-lg px-3 py-2 text-sm" type="number" placeholder="Qty" value={it.quantity} onChange={e => updateItem(idx, "quantity", +e.target.value)} />
              <input className="border border-gray-100 rounded-lg px-3 py-2 text-sm" type="number" placeholder="£ Price" value={it.unit_price} onChange={e => updateItem(idx, "unit_price", +e.target.value)} />
            </div>
          </div>
        ))}
        <button onClick={() => setForm(p => ({...p, items: [...p.items, EMPTY_ITEM]}))} className="text-blue-600 text-sm font-medium">+ Add item</button>
      </div>
      <div className="bg-white rounded-xl border border-gray-100 p-4 mb-5 flex justify-between">
        <span className="font-semibold text-gray-700">Total</span>
        <span className="font-bold text-lg text-blue-700">£{total.toFixed(2)}</span>
      </div>
      <button onClick={submit} className="w-full bg-blue-700 text-white py-4 rounded-xl font-semibold text-sm">Create Quote</button>
    </div>
  );

  return (
    <div className="max-w-lg mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold text-gray-900">Quotes</h1>
        <button onClick={() => setShowing(true)} className="flex items-center gap-1.5 bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-semibold">
          <Plus className="w-4 h-4" /> New
        </button>
      </div>
      {loading ? <div className="text-sm text-gray-400 text-center py-8">Loading...</div> : quotes.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-100 p-8 text-center">
          <ClipboardList className="w-8 h-8 text-gray-300 mx-auto mb-2" />
          <p className="text-sm text-gray-400">No quotes yet</p>
        </div>
      ) : (
        <div className="space-y-2">
          {quotes.map(q => (
            <div key={q.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex items-center justify-between">
              <div>
                <div className="font-semibold text-sm text-gray-900">{q.quote_number}</div>
                {q.valid_until && <div className="text-xs text-gray-400 mt-0.5">Valid until {q.valid_until}</div>}
                <span className="inline-block mt-1 text-xs px-2 py-0.5 rounded-full font-medium bg-gray-100 text-gray-600">{q.status}</span>
              </div>
              <div className="font-bold text-base text-gray-900">£{Number(q.total).toFixed(2)}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
