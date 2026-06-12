// src/app/dashboard/owner-dashboard/page.tsx
"use client";

import {
  ArrowRight,
  Bell,
  Heart,
  LayoutDashboard,
  Megaphone,
  MessageSquare,
  Search,
  ShoppingBag,
  Star,
  TrendingUp,
  Users,
  Wallet,
} from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

// ─── Mini chart data ──────────────────────────────────────────────────────────

const customerChartData = [
  { month: "Jan", newCustomers: 34, returning: 52, lost: 20 },
  { month: "Feb", newCustomers: 40, returning: 48, lost: 25 },
  { month: "Mar", newCustomers: 44, returning: 61, lost: 18 },
  { month: "Apr", newCustomers: 38, returning: 70, lost: 22 },
  { month: "May", newCustomers: 55, returning: 78, lost: 16 },
  { month: "Jun", newCustomers: 49, returning: 72, lost: 19 },
];

// ─── Section CTAs ─────────────────────────────────────────────────────────────

const sections = [
  {
    href: "/dashboard/owner-dashboard/overview",
    icon: LayoutDashboard,
    label: "Overview",
    description:
      "Deep-dive into customer retention, weekly sales trends, and segment breakdowns.",
    badge: "Charts & Analytics",
    accent: "#0A0A0A",
    accentBg: "#F2F2F2",
  },
  {
    href: "/dashboard/owner-dashboard/campaigns",
    icon: Megaphone,
    label: "Campaigns",
    description:
      "Create and launch marketing campaigns from ready-made templates or from scratch.",
    badge: "Marketing",
    accent: "#0A0A0A",
    accentBg: "#F2F2F2",
  },
  {
    href: "/dashboard/owner-dashboard/loyalty",
    icon: Heart,
    label: "Loyalty",
    description:
      "Set up cashback, points, or visit-based loyalty programs and manage member tiers.",
    badge: "Retention",
    accent: "#0A0A0A",
    accentBg: "#F2F2F2",
  },
  {
    href: "/dashboard/owner-dashboard/feedback",
    icon: MessageSquare,
    label: "Feedback",
    description:
      "Monitor customer ratings, comments, and sentiment to act on what matters.",
    badge: "Customer Voice",
    accent: "#0A0A0A",
    accentBg: "#F2F2F2",
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function OwnerDashboardPage() {
  const now = new Date();
  const hour = now.getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (

      <main >
        {/* Desktop Header */}
       
        <div className="mx-auto max-w-6xl space-y-10 px-4 py-8 sm:px-8 lg:py-10">

          {/* ── Greeting ── */}
          <section className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-medium text-[#A3A3A3]">{greeting} 👋</p>
              <h3 className="mt-1 text-2xl font-bold tracking-tight text-[#0A0A0A]">
                Welcome back to Enhanzers - Engage 
              </h3>
              <p className="mt-1 text-sm text-[#737373]">
                Here's what's happening with your business today.
              </p>
            </div>
            <Link
              href="/dashboard/owner-dashboard/overview"
              className="flex w-fit items-center gap-2 rounded-full bg-black px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#333333]"
            >
              Full Analytics <ArrowRight size={14} />
            </Link>
          </section>

          {/* ── Quick Stats ── */}
          <section>
            <div className="mb-5">
              <h4 className="text-base font-semibold text-[#0A0A0A]">At a Glance</h4>
              <p className="mt-0.5 text-sm text-[#737373]">Performance metrics for the last 30 days.</p>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <StatCard icon={<Users size={18} strokeWidth={2} />}       title="Total Customers" value="223"    helper="+12% from last month" />
              <StatCard icon={<ShoppingBag size={18} strokeWidth={2} />} title="Total Orders"    value="1,248"  helper="Orders tracked this month" />
              <StatCard icon={<Wallet size={18} strokeWidth={2} />}      title="Total Sales"     value="₹4.8L"  helper="Revenue generated" />
              <StatCard icon={<Star size={18} strokeWidth={2} />}        title="Avg. Rating"     value="4.8"    helper="Based on 142 reviews" />
            </div>
          </section>

          {/* ── Mini Chart + Trend ── */}
          <section className="grid grid-cols-1 gap-5 lg:grid-cols-3">

            {/* Bar chart preview */}
            <div className="lg:col-span-2 rounded-xl border border-[#E5E5E5] bg-white p-6 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h4 className="text-base font-semibold text-[#0A0A0A]">Customer Retention</h4>
                  <p className="text-sm text-[#737373]">New vs Returning vs Lost — last 6 months</p>
                </div>
                <div className="flex flex-wrap gap-3 text-xs font-medium text-[#525252]">
                  <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-black" />New</span>
                  <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-[#A3A3A3]" />Returning</span>
                  <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full border border-[#E5E5E5] bg-[#F9F9F9]" />Lost</span>
                </div>
              </div>
              <div className="flex h-48 items-end gap-2 sm:gap-5">
                {customerChartData.map((item) => (
                  <div key={item.month} className="group flex flex-1 flex-col items-center gap-2">
                    <div className="flex h-40 w-full flex-col justify-end gap-0.5 overflow-hidden rounded-md bg-[#F9F9F9] p-1 transition-colors group-hover:bg-[#F2F2F2]">
                      <div className="w-full rounded-sm border border-[#E5E5E5] bg-white" style={{ height: `${item.lost}%` }} />
                      <div className="w-full rounded-sm bg-[#A3A3A3]" style={{ height: `${item.returning}%` }} />
                      <div className="w-full rounded-sm bg-black" style={{ height: `${item.newCustomers}%` }} />
                    </div>
                    <p className="text-[11px] font-medium text-[#737373]">{item.month}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Trend card */}
            <div className="flex flex-col gap-4">
              <div className="flex-1 rounded-xl border border-[#E5E5E5] bg-white p-5 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-[#F2F2F2]">
                  <TrendingUp size={18} className="text-[#0A0A0A]" />
                </div>
                <p className="text-sm font-medium text-[#737373]">Repeat Purchase Rate</p>
                <p className="mt-1 text-3xl font-bold tracking-tight text-[#0A0A0A]">67%</p>
                <p className="mt-1 text-xs text-[#A3A3A3]">+5% vs last quarter</p>
                <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-[#F2F2F2]">
                  <div className="h-full w-[67%] rounded-full bg-black transition-all" />
                </div>
              </div>

              <div className="flex-1 rounded-xl border border-[#E5E5E5] bg-white p-5 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-[#F2F2F2]">
                  <Heart size={18} className="text-[#0A0A0A]" />
                </div>
                <p className="text-sm font-medium text-[#737373]">Loyalty Members</p>
                <p className="mt-1 text-3xl font-bold tracking-tight text-[#0A0A0A]">1,842</p>
                <p className="mt-1 text-xs text-[#A3A3A3]">+8% from last month</p>
                <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-[#F2F2F2]">
                  <div className="h-full w-[82%] rounded-full bg-black transition-all" />
                </div>
              </div>
            </div>
          </section>

          {/* ── Section CTAs ── */}
          <section>
            <div className="mb-5">
              <h4 className="text-base font-semibold text-[#0A0A0A]">Quick Access</h4>
              <p className="mt-0.5 text-sm text-[#737373]">Jump straight to any section of your dashboard.</p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {sections.map((s) => {
                const Icon = s.icon;
                return (
                  <Link
                    key={s.href}
                    href={s.href}
                    className="group flex flex-col justify-between rounded-xl border border-[#E5E5E5] bg-white p-6 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] transition-all hover:border-[#D4D4D4] hover:shadow-[0_8px_30px_-6px_rgba(0,0,0,0.10)]"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F2F2F2] text-[#0A0A0A] transition-colors group-hover:bg-black group-hover:text-white">
                        <Icon size={20} strokeWidth={2} />
                      </div>
                      <span className="rounded-full border border-[#E5E5E5] bg-[#F9F9F9] px-2.5 py-1 text-[11px] font-medium text-[#737373]">
                        {s.badge}
                      </span>
                    </div>

                    <div className="mt-5">
                      <h5 className="text-base font-bold text-[#0A0A0A]">{s.label}</h5>
                      <p className="mt-1.5 text-sm leading-relaxed text-[#737373]">{s.description}</p>
                    </div>

                    <div className="mt-5 flex items-center gap-1.5 text-sm font-semibold text-[#0A0A0A] transition-all group-hover:gap-2.5">
                      Go to {s.label} <ArrowRight size={14} />
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>

        </div>
      </main>
  );
}

// ─── StatCard ─────────────────────────────────────────────────────────────────

function StatCard({ icon, title, value, helper }: { icon: ReactNode; title: string; value: string; helper: string }) {
  return (
    <div className="flex flex-col justify-between rounded-xl border border-[#E5E5E5] bg-white p-5 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] transition-all hover:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.08)]">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#F2F2F2] text-[#0A0A0A]">
          {icon}
        </div>
      </div>
      <div>
        <p className="text-sm font-medium text-[#737373]">{title}</p>
        <p className="mt-1 text-2xl font-semibold tracking-tight text-[#0A0A0A]">{value}</p>
        <p className="mt-2 text-xs text-[#A3A3A3]">{helper}</p>
      </div>
    </div>
  );
}