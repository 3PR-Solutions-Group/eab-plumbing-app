"use client";
import { useState } from "react";
import { Plus, CheckCircle2, Clock, AlertCircle } from "lucide-react";

const JOB_TYPES = ["Boiler Service", "CP12 Gas Safety Certificate", "Emergency Callout", "Boiler Repair", "Plumbing Repair", "Bathroom Fit", "Radiator Install", "Other"];

export default function JobsPage() {
  const [jobs, setJobs] = useState([
    { id: "1", customerName: "John Smith", title: "Annual Boiler Service", jobType: "Boiler Service", date: new Date().toISOString().split("T")[0], time: "09:00", status: "scheduled", notes: "" },
  ]);
  const [showing, setShowing] = useState(false);
  const [form, setForm] = useState({ customerName: "", title: "", jobType: "", date: "", time: "", notes: "", status: "scheduled" });

  const submit = () => {
    setJobs(js => [...js, { ...form, id: Date.now().toString() }]);
    setForm({ customerName: "", title: "", jobType: "", date: "", time: "", notes: "", status: "scheduled" });
    setShowing(false);
  };

  const statusIcon = (s: string) => s === "completed" ? <CheckCircle2 className="w-3 h-3 text-green-500" /> : s === "in-progress" ? <Clock className="w-3 h-3 text-blue-500" /> : <AlertCircle className="w-3 h-3 text-amber-500" />;
  const statusColor = (s: string) => s === "completed" ? "bg-green-100 text-green-700" : s === "in-progress" ? "bg-blue-100 text-blue-700" : "bg-amber-100 text-amber-700";

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Jobs</h1>
        <button onClick={() => setShowing(true)} className="flex items-center gap-2 bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-800">
          <Plus className="w-4 h-4" /> New Job
        </button>
      </div>

      {showing && (
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6 shadow-sm">
          <h2 className="font-semibold mb-4">New Job</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input className="border rounded-lg px-3 py-2 text-sm" placeholder="Customer name" value={form.customerName} onChange={e => setForm(f => ({ ...f, customerName: e.target.value }))} />
            <input className="border rounded-lg px-3 py-2 text-sm" placeholder="Job title" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} />
            <select className="border rounded-lg px-3 py-2 text-sm" value={form.jobType} onChange={e => setForm(f => ({ ...f, jobType: e.target.value }))}>
              <option value="">Select job type</option>
              {JOB_TYPES.map(t => <option key={t}>{t}</option>)}
            </select>
            <input className="border rounded-lg px-3 py-2 text-sm" type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} />
            <input className="border rounded-lg px-3 py-2 text-sm" type="time" value={form.time} onChange={e => setForm(f => ({ ...f, time: e.target.value }))} />
            <select className="border rounded-lg px-3 py-2 text-sm" value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))}>
              <option value="scheduled">Scheduled</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <textarea className="border rounded-lg px-3 py-2 text-sm w-full mb-4" rows={2} placeholder="Notes" value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} />
          <div className="flex justify-end gap-2">
            <button onClick={() => setShowing(false)} className="px-4 py-2 text-sm text-gray-600">Cancel</button>
            <button onClick={submit} className="bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium">Save Job</button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {jobs.map(job => (
          <div key={job.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-center min-w-12">
                <div className="text-lg font-bold text-blue-700">{job.date.split("-")[2]}</div>
                <div className="text-xs text-gray-500">{new Date(job.date + "T12:00:00").toLocaleString("en-GB", { month: "short" })}</div>
              </div>
              <div>
                <div className="font-medium text-gray-900">{job.title || job.jobType}</div>
                <div className="text-sm text-gray-500">{job.customerName} · {job.time}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {statusIcon(job.status)}
              <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusColor(job.status)}`}>{job.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
