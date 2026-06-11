"use client";
import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import InfoModal from "@/components/InfoModal";
import { supabase } from "@/lib/supabase";

const JOBS_INFO = [
  { heading: "📅 What are Jobs?", text: "Jobs is your diary. Every time you book in a piece of work — a boiler service, an emergency callout, a plumbing repair — log it here so you always know what's coming up." },
  { heading: "➕ Adding a Job", text: "Tap 'New', fill in the customer name, job type, date and time. That's it. You can add notes too if there's anything useful to remember about the job." },
  { heading: "🔄 Updating Status", text: "Jobs start as 'Scheduled'. When you're on the way, change it to 'In Progress'. When done, mark it 'Completed'. This keeps your diary accurate." },
  { heading: "📆 Job Types", text: "Pick from common job types — Boiler Service, CP12, Emergency Callout, Plumbing Repair, and more. This helps you see what work you're doing most." },
  { heading: "💡 Tip", text: "After completing a job, head to Invoices and create the invoice while it's fresh — you'll remember exactly what was done and what parts you used." },
];

const JOB_TYPES = ["Boiler Service", "CP12 Gas Safety Cert", "Emergency Callout", "Boiler Repair", "Plumbing Repair", "Bathroom Fit", "Radiator Install", "Other"];

type Job = { id: string; customerName: string; title: string; jobType: string; date: string; time: string; status: string; notes: string };

function parseJob(row: any): Job {
  let customerName = "", time = "", userNotes = "";
  try { const p = JSON.parse(row.notes || "{}"); customerName = p.customerName || ""; time = p.time || ""; userNotes = p.userNotes || ""; } catch { userNotes = row.notes || ""; }
  return {
    id: row.id,
    customerName: customerName || row.address || "—",
    title: row.title || "",
    jobType: row.description || "",
    date: row.scheduled_date || "",
    time,
    status: row.status || "pending",
    notes: userNotes,
  };
}

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [showing, setShowing] = useState(false);
  const [form, setForm] = useState({ customerName: "", title: "", jobType: "", date: "", time: "", notes: "", status: "scheduled" });

  useEffect(() => {
    supabase.from("jobs").select("*").order("created_at", { ascending: false })
      .then(({ data }) => { if (data) setJobs(data.map(parseJob)); setLoading(false); });
  }, []);

  const submit = async () => {
    const { data, error } = await supabase.from("jobs").insert({
      title: form.title || form.jobType,
      description: form.jobType,
      status: form.status === "scheduled" ? "pending" : form.status,
      scheduled_date: form.date || null,
      address: form.customerName,
      notes: JSON.stringify({ customerName: form.customerName, time: form.time, userNotes: form.notes }),
    }).select().single();

    if (data && !error) setJobs(js => [parseJob(data), ...js]);
    setForm({ customerName: "", title: "", jobType: "", date: "", time: "", notes: "", status: "scheduled" });
    setShowing(false);
  };

  const statusColor = (s: string) => s === "completed" ? "bg-green-100 text-green-700" : s === "in-progress" ? "bg-blue-100 text-blue-700" : "bg-amber-100 text-amber-700";
  const displayStatus = (s: string) => s === "pending" ? "scheduled" : s;

  if (showing) return (
    <div className="max-w-lg mx-auto">
      <div className="flex items-center gap-3 mb-5">
        <button onClick={() => setShowing(false)} className="text-blue-600 font-medium text-sm">← Back</button>
        <h1 className="text-lg font-bold text-gray-900">New Job</h1>
      </div>
      <div className="space-y-3 mb-5">
        <input className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-white" placeholder="Customer name" value={form.customerName} onChange={e => setForm(f => ({ ...f, customerName: e.target.value }))} />
        <input className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-white" placeholder="Job title" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} />
        <select className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-white" value={form.jobType} onChange={e => setForm(f => ({ ...f, jobType: e.target.value }))}>
          <option value="">Select job type</option>
          {JOB_TYPES.map(t => <option key={t}>{t}</option>)}
        </select>
        <div className="grid grid-cols-2 gap-3">
          <input className="border border-gray-200 rounded-xl px-4 py-3 text-sm bg-white" type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} />
          <input className="border border-gray-200 rounded-xl px-4 py-3 text-sm bg-white" type="time" value={form.time} onChange={e => setForm(f => ({ ...f, time: e.target.value }))} />
        </div>
        <select className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-white" value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))}>
          <option value="scheduled">Scheduled</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        <textarea className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-white" rows={3} placeholder="Notes (optional)" value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} />
      </div>
      <button onClick={submit} className="w-full bg-blue-700 text-white py-4 rounded-xl font-semibold text-sm active:scale-95 transition-transform">Save Job</button>
    </div>
  );

  return (
    <div className="max-w-lg mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold text-gray-900">Jobs</h1>
        <div className="flex items-center gap-2">
          <InfoModal title="How to use Jobs" content={JOBS_INFO} />
          <button onClick={() => setShowing(true)} className="flex items-center gap-1.5 bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-semibold">
            <Plus className="w-4 h-4" /> New
          </button>
        </div>
      </div>
      {loading ? <div className="text-center text-gray-400 py-8">Loading…</div> : (
        <div className="space-y-2">
          {jobs.map(job => (
            <div key={job.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex items-center gap-4">
              {job.date && (
                <div className="text-center min-w-10 bg-blue-50 rounded-lg py-1.5 px-1">
                  <div className="text-base font-bold text-blue-700 leading-none">{job.date.split("-")[2]}</div>
                  <div className="text-xs text-blue-400">{new Date(job.date + "T12:00:00").toLocaleString("en-GB", { month: "short" })}</div>
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm text-gray-900 truncate">{job.title || job.jobType}</div>
                <div className="text-xs text-gray-400">{job.customerName}{job.time ? ` · ${job.time}` : ""}</div>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full font-medium whitespace-nowrap ${statusColor(job.status)}`}>{displayStatus(job.status)}</span>
            </div>
          ))}
          {jobs.length === 0 && <div className="text-center text-gray-400 py-8">No jobs yet</div>}
        </div>
      )}
    </div>
  );
}
