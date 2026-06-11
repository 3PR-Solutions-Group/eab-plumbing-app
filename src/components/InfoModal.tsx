"use client";
import { useState } from "react";
import { Info, X } from "lucide-react";

interface InfoModalProps {
  title: string;
  content: { heading: string; text: string }[];
}

export default function InfoModal({ title, content }: InfoModalProps) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button onClick={() => setOpen(true)} className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors" aria-label="How to use">
        <Info className="w-4 h-4" />
      </button>
      {open && (
        <div className="fixed inset-0 z-50 flex items-end justify-center" onClick={() => setOpen(false)}>
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative bg-white rounded-t-2xl w-full max-w-lg p-6 pb-10 shadow-xl max-h-[80vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-gray-900">{title}</h2>
              <button onClick={() => setOpen(false)} className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200"><X className="w-4 h-4 text-gray-600" /></button>
            </div>
            <div className="space-y-4">
              {content.map((item, i) => (
                <div key={i}>
                  <div className="font-semibold text-sm text-gray-900 mb-1">{item.heading}</div>
                  <div className="text-sm text-gray-500 leading-relaxed">{item.text}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
