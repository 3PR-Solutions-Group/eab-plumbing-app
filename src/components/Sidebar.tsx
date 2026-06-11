"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FileText, ClipboardList, Calendar, Users, Wrench } from "lucide-react";

const nav = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/invoices", label: "Invoices", icon: FileText },
  { href: "/quotes", label: "Quotes", icon: ClipboardList },
  { href: "/jobs", label: "Jobs", icon: Calendar },
  { href: "/customers", label: "Customers", icon: Users },
];

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-blue-800 text-white flex flex-col">
      <div className="p-6 border-b border-blue-700">
        <div className="flex items-center gap-2">
          <Wrench className="w-6 h-6" />
          <div>
            <div className="font-bold text-lg leading-tight">EAB Plumbing</div>
            <div className="text-blue-300 text-xs">& Heating</div>
          </div>
        </div>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {nav.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              pathname === href
                ? "bg-blue-600 text-white"
                : "text-blue-200 hover:bg-blue-700 hover:text-white"
            }`}
          >
            <Icon className="w-4 h-4" />
            {label}
          </Link>
        ))}
      </nav>
      <div className="p-4 border-t border-blue-700 text-xs text-blue-400">
        Gas Safe Registered
      </div>
    </div>
  );
}
