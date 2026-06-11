"use client";
import { useEffect, useState } from "react";
import { Plus, CheckCircle2, FileText } from "lucide-react";
import { supabase } from "@/lib/supabase";

type Invoice = { id: string; invoice_number: string; customer_id: string; status: string; line_items: any[]; total: number; due_date: string; notes: string; created_at: string; };
type LineItem = { description: string; quantity: number; unit_price: number; };
const EMPTY_ITEM: LineItem = { description: "", quantity: 1, unit_price: 0 };
const EMPTY = { customer_name: "", customer_email: "", customer_address: "", due_date: "", notes: "", items: [EMPTY_ITEM] };

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [form, setForm] = useState(EMPTY);
  const [showing, setShowing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => { load(); }, []);

  async function load() {
    setLoading(true);
    const { data } = await supabase.from("invoices").select("*").order("created_at", { ascending: false });
    setInvoices(data || []);
    setLoading(false);
  }

  const total = form.items.reduce((s, i) => s + i.quantity * i.unit_price, 0);

  async function submit() {
    const { count } = await supabase.from("invoices").select("*", { count: "exact", head: true });
    const num = `INV-${String((count || 0) + 1).padStart(3, "0")}`;
    await supabase.from("invoices").insert([{
      invoice_number: num,
      status: "outstanding",
      line_items: form.items,
      subtotal: total,
      vat_rate: 0,
      vat_amount: 0,
      total,
      due_date: form.due_date,
      notes: form.notes,
      sent_to_email: form.customer_email,
    }]);
    setForm(EMPTY); setShowing(false); load();
  }

  async function markPaid(id: string) {
    await supabase.from("invoices").update({ status: "paid", paid_date: new Date().toISOString().split("T")[0] }).eq("id", id);
    load();
  }

  const updateItem = (idx: number, field: string, val: string | number) =>
    setForm(p => ({ ...p, items: p.items.map((it, i) => i === idx ? { ...it, [field]: val } : it) }));

  if (showing) return (
    <div className="max-w-lg mx-auto">
      <div className="flex items-center gap-3 mb-5">
        <button onClick={() => setShowing(false)} className="text-blue-600 font-medium text-sm">← Back</button>
        <h1 className="text-lg font-bold text-gray-900">New Invoice</h1>
      </div>
      <div className="space-y-3 mb-5">
        {["customer_name","customer_email","customer_address"].map(f => (
          <input key={f} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-white" placeholder={f.replace("customer_","").replace("_"," ")} value={(form as any)[f]} onChange={e => setForm(p => ({...p,[f]:e.target.value}))} />
        ))}
        <input className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-white" type="date" value={form.due_date} onChange={e => setForm(p => ({...p,due_date:e.target.value}))} />
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
      {loading ? <div className="text-sm text-gray-400 text-center py-8">Loading...</div> : invoices.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-100 p-8 text-center">
          <FileText className="w-8 h-8 text-gray-300 mx-auto mb-2" />
          <p className="text-sm text-gray-400">No invoices yet</p>
        </div>
      ) : (
        <div className="space-y-2">
          {invoices.map(inv => (
            <div key={inv.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex items-center justify-between">
              <div>
                <div className="font-semibold text-sm text-gray-900">{inv.invoice_number}</div>
                {inv.due_date && <div className="text-xs text-gray-400 mt-0.5">Due {inv.due_date}</div>}
                <span className={`inline-block mt-1 text-xs px-2 py-0.5 rounded-full font-medium ${inv.status === "paid" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}>{inv.status}</span>
              </div>
              <div className="text-right">
                <div className="font-bold text-base text-gray-900">£{Number(inv.total).toFixed(2)}</div>
                {inv.status !== "paid" && <button onClick={() => markPaid(inv.id)} className="mt-1 text-xs text-green-600 flex items-center gap-0.5 ml-auto"><CheckCircle2 className="w-3 h-3" />Paid</button>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
