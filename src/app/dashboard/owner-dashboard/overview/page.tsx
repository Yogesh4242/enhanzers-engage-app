// src/app/dashboard/owner-dashboard/overview/page.tsx
"use client";

import dynamic from "next/dynamic";
import { ShoppingBag, Star, Users, Wallet, Bell, Search } from "lucide-react";
import type { ReactNode } from "react";
import LogoutButton from "@/components/LogoutButton";

const CustomerRetentionChart = dynamic(
  () => import("./_charts").then((m) => m.CustomerRetentionChart),
  { ssr: false, loading: () => <ChartSkeleton /> }
);

const CustomerSegmentChart = dynamic(
  () => import("./_charts").then((m) => m.CustomerSegmentChart),
  { ssr: false, loading: () => <ChartSkeleton /> }
);

const WeeklySalesChart = dynamic(
  () => import("./_charts").then((m) => m.WeeklySalesChart),
  { ssr: false, loading: () => <ChartSkeleton /> }
);

export default function OwnerOverviewPage() {
  return (

      <main >
        {/* Desktop Header */}
        

        {/* Page Content */}
        <div className="mx-auto max-w-6xl space-y-8 px-4 py-8 sm:px-8 lg:py-10">

          {/* ── Stats ── */}
          <section>
            <SectionTitle
              title="Customer Snapshot"
              text="Quick summary of customers, orders, loyalty and ratings."
            />
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
              <StatCard icon={<Users size={18} />}       title="Total Customers" value="223"   helper="Temporary value. Later from Supabase customers table." />
              <StatCard icon={<ShoppingBag size={18} />} title="Total Orders"    value="1,248" helper="Temporary value. Later from orders table." />
              <StatCard icon={<Wallet size={18} />}      title="Total Sales"     value="₹4.8L" helper="Temporary value. Later from order totals." />
              <StatCard icon={<Star size={18} />}        title="Average Rating"  value="4.8/5" helper="Temporary value. Later from reviews table." />
            </div>
          </section>

          {/* ── Bar + Pie ── */}
          <section className="grid grid-cols-1 gap-4 xl:grid-cols-3">
            <div className="rounded-3xl border border-[#DDD3C5] bg-white p-4 shadow-sm xl:col-span-2">
              <div className="mb-5">
                <h3 className="text-base font-extrabold text-[#1F2933]">
                  New vs Returning vs Lost Customers
                </h3>
                <p className="mt-1 text-xs text-[#8A8175]">
                  Recharts bar chart. Later this data can come directly from backend.
                </p>
              </div>
              <div className="h-80 w-full">
                <CustomerRetentionChart />
              </div>
            </div>

            <div className="rounded-3xl border border-[#DDD3C5] bg-white p-4 shadow-sm">
              <div className="mb-5">
                <h3 className="text-base font-extrabold text-[#1F2933]">Customer Segments</h3>
                <p className="mt-1 text-xs text-[#8A8175]">
                  Pie chart for loyal, new, lost and other customers.
                </p>
              </div>
              <div className="h-80 w-full">
                <CustomerSegmentChart />
              </div>
            </div>
          </section>

          {/* ── Weekly Sales ── */}
          <section className="rounded-3xl border border-[#DDD3C5] bg-white p-4 shadow-sm">
            <div className="mb-5">
              <h3 className="text-base font-extrabold text-[#1F2933]">
                Weekly Sales &amp; Orders
              </h3>
              <p className="mt-1 text-xs text-[#8A8175]">
                Temporary data. Later it can use real order data.
              </p>
            </div>
            <div className="h-80 w-full">
              <WeeklySalesChart />
            </div>
          </section>

        </div>
      </main>
  
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function ChartSkeleton() {
  return <div className="h-full w-full animate-pulse rounded-2xl bg-[#F2F2F2]" />;
}

function SectionTitle({ title, text }: { title: string; text: string }) {
  return (
    <div className="mb-4">
      <h3 className="text-xl font-extrabold tracking-tight text-[#1F2933]">{title}</h3>
      <p className="mt-1 text-xs font-medium text-[#8A8175]">{text}</p>
    </div>
  );
}

function StatCard({ icon, title, value, helper }: { icon: ReactNode; title: string; value: string; helper: string }) {
  return (
    <div className="rounded-3xl border border-[#DDD3C5] bg-white p-4 shadow-sm">
      <div className="mb-5 flex items-center justify-between">
        <div className="rounded-2xl bg-emerald-100 p-2.5 text-emerald-700">{icon}</div>
      </div>
      <p className="text-xs font-bold text-[#8A8175]">{title}</p>
      <p className="mt-1 text-3xl font-extrabold tracking-tight text-[#1F2933]">{value}</p>
      <p className="mt-1.5 text-[11px] font-medium text-[#8A8175]">{helper}</p>
    </div>
  );
}