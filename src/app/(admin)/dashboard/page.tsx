"use client";
import { useEffect, useState } from "react";
import { FileText, Calendar, Users, AlertCircle, PoundSterling, ClipboardList } from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function Dashboard() {
  const [stats, setStats] = useState({ outstanding: 0, paid: 0, customers: 0, jobs: 0 });
  const [recentInvoices, setRecentInvoices] = useState<any[]>([]);

  useEffect(() => {
    async function load() {
      const [inv, cust, jobs] = await Promise.all([
        supabase.from("invoices").select("status, total"),
        supabase.from("customers").select("id", { count: "exact", head: true }),
        supabase.from("jobs").select("id", { count: "exact", head: true }),
      ]);
      const invoices = inv.data || [];
      setStats({
        outstanding: invoices.filter(i => i.status !== "paid").reduce((s, i) => s + Number(i.total), 0),
        paid: invoices.filter(i => i.status === "paid").reduce((s, i) => s + Number(i.total), 0),
        customers: cust.count || 0,
        jobs: jobs.count || 0,
      });
      const { data: recent } = await supabase.from("invoices").select("*").order("created_at", { ascending: false }).limit(4);
      setRecentInvoices(recent || []);
    }
    load();
  }, []);

  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-xl font-bold text-gray-900 mb-4">Dashboard</h1>
      <div className="grid grid-cols-2 gap-3 mb-6">
        {[
          { label: "Outstanding", value: `£${stats.outstanding.toFixed(2)}`, icon: AlertCircle, color: "text-amber-600 bg-amber-50" },
          { label: "Paid", value: `£${stats.paid.toFixed(2)}`, icon: PoundSterling, color: "text-green-600 bg-green-50" },
          { label: "Customers", value: stats.customers, icon: Users, color: "text-blue-600 bg-blue-50" },
          { label: "Jobs", value: stats.jobs, icon: Calendar, color: "text-purple-600 bg-purple-50" },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-2 ${color}`}><Icon className="w-4 h-4" /></div>
            <div className="text-xl font-bold text-gray-900">{value}</div>
            <div className="text-xs text-gray-500 mt-0.5">{label}</div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-3 mb-6">
        {[
          { href: "/invoices", label: "New Invoice", icon: FileText, color: "bg-blue-700 text-white" },
          { href: "/quotes", label: "New Quote", icon: ClipboardList, color: "bg-blue-100 text-blue-700" },
          { href: "/jobs", label: "Add Job", icon: Calendar, color: "bg-blue-100 text-blue-700" },
          { href: "/customers", label: "Add Customer", icon: Users, color: "bg-blue-100 text-blue-700" },
        ].map(({ href, label, icon: Icon, color }) => (
          <Link key={href} href={href} className={`flex items-center gap-2 justify-center rounded-xl py-3 text-sm font-semibold ${color}`}>
            <Icon className="w-4 h-4" />{label}
          </Link>
        ))}
      </div>
      {recentInvoices.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm mb-4">
          <div className="px-4 py-3 border-b border-gray-50 flex items-center gap-2">
            <FileText className="w-4 h-4 text-blue-600" />
            <span className="font-semibold text-sm text-gray-900">Recent Invoices</span>
          </div>
          {recentInvoices.map(inv => (
            <div key={inv.id} className="px-4 py-3 flex items-center justify-between border-b border-gray-50 last:border-0">
              <div>
                <div className="font-medium text-sm text-gray-900">{inv.invoice_number}</div>
                <div className="text-xs text-gray-400">{inv.due_date || "—"}</div>
              </div>
              <div className="text-right">
                <div className="font-semibold text-sm">£{Number(inv.total).toFixed(2)}</div>
                <span className={`text-xs px-2 py-0.5 rounded-full ${inv.status === "paid" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}>{inv.status}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
