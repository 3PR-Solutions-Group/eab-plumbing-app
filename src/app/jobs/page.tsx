"use client";
import { useState } from "react";
import { Plus, CheckCircle2, Clock, AlertCircle } from "lucide-react";

const JOB_TYPES = ["Boiler Service", "CP12 Gas Safety Cert", "Emergency Callout", "Boiler Repair", "Plumbing Repair", "Bathroom Fit", "Radiator Install", "Other"];

export default function JobsPage() {
  const [jobs, setJobs] = useState([
    { id: "1", customerName: "John Smith", title: "Annual Boiler Service", jobType: "Boiler Service", date: new Date().toISOString().split("T")[0], time: "09:00", status: "scheduled", notes: "" },
  ]);
  const [showing, setShowing] = useState(false);
  const [form, setForm] = useState({ customerName: "", title: "", jobType: "", date: "", time: "", notes: "", status: "scheduled" });

  const submit = () => { setJobs(js => [...js, { ...form, id: Date.now().toString() }]); setForm({ customerName: "", title: "", jobType: "", date: "", time: "", notes: "", status: "scheduled" }); setShowing(false); };
  const statusColor = (s: string) => s === "completed" ? "bg-green-100 text-green-700" : s === "in-progress" ? "bg-blue-100 text-blue-700" : "bg-amber-100 text-amber-700";

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
        <textarea className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-white" rows={3} placeholder="Notes" value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} />
      </div>
      <button onClick={submit} className="w-full bg-blue-700 text-white py-4 rounded-xl font-semibold text-sm">Save Job</button>
    </div>
  );

  return (
    <div className="max-w-lg mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold text-gray-900">Jobs</h1>
        <button onClick={() => setShowing(true)} className="flex items-center gap-1.5 bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-semibold">
          <Plus className="w-4 h-4" /> New
        </button>
      </div>
      <div className="space-y-2">
        {jobs.map(job => (
          <div key={job.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex items-center gap-4">
            <div className="text-center min-w-10 bg-blue-50 rounded-lg py-1.5">
              <div className="text-base font-bold text-blue-700 leading-none">{job.date.split("-")[2]}</div>
              <div className="text-xs text-blue-400">{new Date(job.date + "T12:00:00").toLocaleString("en-GB", { month: "short" })}</div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-sm text-gray-900 truncate">{job.title || job.jobType}</div>
              <div className="text-xs text-gray-400">{job.customerName} · {job.time}</div>
            </div>
            <span className={`text-xs px-2 py-1 rounded-full font-medium whitespace-nowrap ${statusColor(job.status)}`}>{job.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
