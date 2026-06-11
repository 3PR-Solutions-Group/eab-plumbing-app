"use client";
import { useEffect, useState } from "react";
import { Plus, Users } from "lucide-react";
import { supabase } from "@/lib/supabase";

type Customer = { id: string; name: string; email: string; phone: string; address: string; notes: string; created_at: string; };
const EMPTY = { name: "", email: "", phone: "", address: "", notes: "" };

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [form, setForm] = useState(EMPTY);
  const [showing, setShowing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => { load(); }, []);

  async function load() {
    setLoading(true);
    const { data } = await supabase.from("customers").select("*").order("created_at", { ascending: false });
    setCustomers(data || []);
    setLoading(false);
  }

  async function submit() {
    await supabase.from("customers").insert([form]);
    setForm(EMPTY); setShowing(false); load();
  }

  if (showing) return (
    <div className="max-w-lg mx-auto">
      <div className="flex items-center gap-3 mb-5">
        <button onClick={() => setShowing(false)} className="text-blue-600 font-medium text-sm">← Back</button>
        <h1 className="text-lg font-bold text-gray-900">New Customer</h1>
      </div>
      <div className="space-y-3 mb-5">
        {["name","email","phone","address"].map(f => (
          <input key={f} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-white" placeholder={f.charAt(0).toUpperCase()+f.slice(1)} value={(form as any)[f]} onChange={e => setForm(p => ({...p,[f]:e.target.value}))} />
        ))}
        <textarea className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-white" rows={3} placeholder="Notes" value={form.notes} onChange={e => setForm(p => ({...p,notes:e.target.value}))} />
      </div>
      <button onClick={submit} className="w-full bg-blue-700 text-white py-4 rounded-xl font-semibold text-sm">Add Customer</button>
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
      {loading ? <div className="text-sm text-gray-400 text-center py-8">Loading...</div> : customers.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-100 p-8 text-center">
          <Users className="w-8 h-8 text-gray-300 mx-auto mb-2" />
          <p className="text-sm text-gray-400">No customers yet</p>
        </div>
      ) : (
        <div className="space-y-2">
          {customers.map(c => (
            <div key={c.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
              <div className="font-semibold text-sm text-gray-900">{c.name}</div>
              {c.email && <div className="text-xs text-gray-400 mt-0.5">{c.email}</div>}
              {c.phone && <div className="text-xs text-gray-400">{c.phone}</div>}
              {c.address && <div className="text-xs text-gray-400">{c.address}</div>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
