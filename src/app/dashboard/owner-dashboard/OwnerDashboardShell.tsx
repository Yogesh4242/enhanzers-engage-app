//owner-dashboard/OwnerDashboardShell.tsx
"use client";

import LogoutButton from "@/components/LogoutButton";
import {
  Bell,
  Heart,
  Home,
  LayoutDashboard,
  Megaphone,
  MessageSquare,
  Search,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const sidebarItems = [
  {
    name: "Overview",
    icon: LayoutDashboard,
    href: "/dashboard/owner-dashboard/overview",
  },
  {
    name: "Customer Insights",
    icon: Users,
    href: "/dashboard/owner-dashboard/customer-insights",
  },
  {
    name: "Customer List",
    icon: Heart,
    href: "/dashboard/owner-dashboard/customer-list",
  },
  {
    name: "Campaigns",
    icon: Megaphone,
    href: "/dashboard/owner-dashboard/campaigns",
  },
  {
    name: "Activity",
    icon: MessageSquare,
    href: "/dashboard/owner-dashboard/activity",
  },
];

export default function OwnerDashboardShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#F6F1E8] text-[#1F2933]">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.16),_transparent_35%),radial-gradient(circle_at_top_right,_rgba(251,191,36,0.16),_transparent_32%)]" />

      <aside className="fixed left-0 top-0 hidden h-screen w-64 border-r border-[#D8CFC0] bg-[#FFFDF8]/95 px-4 py-5 shadow-sm backdrop-blur-xl lg:block">
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-sm font-black text-white shadow-md">
            E
          </div>

          <div>
            <h1 className="text-sm font-extrabold tracking-tight text-[#1F2933]">
              Enhanzers Engage
            </h1>
            <p className="text-[11px] font-medium text-[#7B7468]">
              Owner Dashboard
            </p>
          </div>
        </div>

        <nav className="space-y-1.5">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-left text-[13px] font-bold transition ${
                  isActive
                    ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/20"
                    : "text-[#746C60] hover:bg-[#F0E8DC] hover:text-[#1F2933]"
                }`}
              >
                <Icon size={16} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-5 left-4 right-4">
          <Link
            href="/"
            className="flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-[13px] font-bold text-[#746C60] hover:bg-[#F0E8DC] hover:text-[#1F2933]"
          >
            <Home size={16} />
            Back to Website
          </Link>
        </div>
      </aside>

      <div className="sticky top-0 z-40 border-b border-[#D8CFC0] bg-[#FFFDF8]/95 px-4 py-3 backdrop-blur-xl lg:hidden">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-sm font-extrabold text-[#1F2933]">
              Owner Dashboard
            </h1>
            <p className="text-[11px] text-[#7B7468]">Enhanzers Engage</p>
          </div>

          <div className="[&_button]:rounded-xl [&_button]:bg-red-500 [&_button]:px-3 [&_button]:py-2 [&_button]:text-xs [&_button]:font-bold [&_button]:text-white">
            <LogoutButton />
          </div>
        </div>
      </div>

      <main className="lg:ml-64">
        <header className="sticky top-0 z-30 hidden border-b border-[#D8CFC0] bg-[#F6F1E8]/90 px-6 py-4 backdrop-blur-xl lg:block">
          <div className="flex items-center justify-between gap-5">
            <div>
              <p className="text-xs font-bold text-emerald-700">
                Restaurant CRM / Customer Insights
              </p>
              <h2 className="text-2xl font-extrabold tracking-tight text-[#1F2933]">
                Owner Dashboard
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 rounded-2xl border border-[#DDD3C5] bg-white px-3 py-2 shadow-sm">
                <Search size={16} className="text-[#9A8F80]" />
                <input
                  placeholder="Search customers..."
                  className="w-52 bg-transparent text-xs font-medium text-[#1F2933] outline-none placeholder:text-[#A79C8D]"
                />
              </div>

              <button className="flex items-center gap-2 rounded-2xl border border-[#DDD3C5] bg-white px-3 py-2 text-xs font-bold text-[#5C554C] shadow-sm hover:bg-[#FFF8EC]">
                <Bell size={16} />
                Alerts
              </button>

              <div className="rounded-2xl bg-white p-1.5 shadow-sm [&_button]:rounded-xl [&_button]:border-0 [&_button]:bg-red-500 [&_button]:px-3 [&_button]:py-2 [&_button]:text-xs [&_button]:font-bold [&_button]:text-white hover:[&_button]:bg-red-600">
                <LogoutButton />
              </div>
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-5 lg:px-6">
          {children}
        </div>
      </main>
    </div>
  );
}