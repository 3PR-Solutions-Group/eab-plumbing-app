"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

function LoginForm() {
  const [pw, setPw] = useState("");
  const [error, setError] = useState(false);
  const router = useRouter();
  const params = useSearchParams();
  const redirect = params.get("redirect") || "/invoices";

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/auth", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password: pw }) });
    if (res.ok) { router.push(redirect); router.refresh(); }
    else { setError(true); setPw(""); }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center px-4">
      <div className="mb-8 text-center">
        <div className="flex items-center justify-center gap-3 mb-2">
          <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
          </div>
        </div>
        <div className="text-white font-bold text-xl">EAB Plumbing & Heating</div>
        <div className="text-gray-400 text-sm mt-1">Admin Portal</div>
      </div>
      <form onSubmit={submit} className="w-full max-w-sm">
        <input
          type="password"
          placeholder="Enter password"
          value={pw}
          onChange={e => { setPw(e.target.value); setError(false); }}
          className={`w-full bg-gray-800 text-white border rounded-xl px-4 py-3 text-sm mb-3 outline-none focus:border-blue-500 ${error ? "border-red-500" : "border-gray-700"}`}
          autoFocus
        />
        {error && <div className="text-red-400 text-xs mb-3 text-center">Incorrect password</div>}
        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold text-sm transition-colors">
          Sign In
        </button>
      </form>
    </div>
  );
}

export default function LoginPage() {
  return <Suspense><LoginForm /></Suspense>;
}
