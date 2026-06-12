// src/app/dashboard/owner-dashboard/feedback/page.tsx
"use client";

import SidePanel from "../components/sidepanel";
import { Bell, MessageSquare, Search, Star, ThumbsUp, TriangleAlert } from "lucide-react";
import LogoutButton from "@/components/LogoutButton";

type FeedbackRow = {
  id: number;
  customerName: string;
  rating: number;
  comment: string;
  category: string;
  date: string;
  status: "Positive" | "Neutral" | "Needs Attention";
};

const feedbackRows: FeedbackRow[] = [
  { id: 1, customerName: "Aarav Sharma", rating: 5, comment: "Food quality is consistent and the reward points make me come back often.", category: "Food Quality", date: "12 Jun 2026", status: "Positive" },
  { id: 2, customerName: "Meera Nair",   rating: 5, comment: "The offers feel useful and the restaurant updates are easy to follow.",     category: "Offers",       date: "10 Jun 2026", status: "Positive" },
  { id: 3, customerName: "Kavin Raj",    rating: 4, comment: "Good experience overall. I would like more combo offers.",                  category: "Menu Offers",  date: "08 Jun 2026", status: "Neutral" },
  { id: 4, customerName: "Rahul Kumar",  rating: 2, comment: "Service was slow during my last visit.",                                   category: "Service",      date: "06 Jun 2026", status: "Needs Attention" },
];

export default function FeedbackPage() {
  const totalFeedback   = feedbackRows.length;
  const averageRating   = feedbackRows.reduce((sum, f) => sum + f.rating, 0) / totalFeedback;
  const positiveFeedback = feedbackRows.filter((f) => f.status === "Positive").length;
  const needsAttention  = feedbackRows.filter((f) => f.status === "Needs Attention").length;

  return (
    <div >

      <main >
        {/* Desktop Header */}
       

        {/* Page Content */}
        <div className="mx-auto max-w-6xl space-y-8 px-4 py-8 sm:px-8 lg:py-10">

          {/* ── Stats ── */}
          <section>
            <div className="mb-4">
              <h1 className="text-xl font-extrabold tracking-tight text-[#1F2933]">
                Customer Feedback
              </h1>
              <p className="mt-1 text-xs font-medium text-[#8A8175]">
                View customer comments, ratings and feedback status. These are temporary
                frontend values and can later be replaced with Supabase feedback data.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
              <FeedbackStatCard icon={<MessageSquare size={18} />} title="Total Feedback"    value={totalFeedback.toString()}         helper="Later from feedback table count" />
              <FeedbackStatCard icon={<Star size={18} />}          title="Average Rating"    value={`${averageRating.toFixed(1)}/5`}  helper="Later from average rating" />
              <FeedbackStatCard icon={<ThumbsUp size={18} />}      title="Positive Feedback" value={positiveFeedback.toString()}      helper="Later from positive status count" />
              <FeedbackStatCard icon={<TriangleAlert size={18} />} title="Needs Attention"   value={needsAttention.toString()}        helper="Later from low rating feedback" />
            </div>
          </section>

          {/* ── Table ── */}
          <section className="rounded-3xl border border-[#DDD3C5] bg-white p-4 shadow-sm">
            <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-base font-extrabold text-[#1F2933]">Recent Feedback</h2>
                <p className="mt-1 text-xs text-[#8A8175]">
                  Later, this list can be fetched directly from Supabase.
                </p>
              </div>
              <button className="w-fit rounded-2xl border border-[#DDD3C5] bg-[#FFF8EC] px-3 py-2 text-xs font-extrabold text-[#5C554C] hover:bg-[#F8EEDC]">
                Filter Feedback
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[850px] text-left text-xs">
                <thead>
                  <tr className="border-b border-[#E7DCCB] text-[11px] uppercase text-[#9A8F80]">
                    <th className="py-3">Customer</th>
                    <th className="py-3">Rating</th>
                    <th className="py-3">Comment</th>
                    <th className="py-3">Category</th>
                    <th className="py-3">Date</th>
                    <th className="py-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {feedbackRows.map((feedback) => (
                    <tr key={feedback.id} className="border-b border-[#F0E6D8]">
                      <td className="py-4 font-extrabold text-[#1F2933]">{feedback.customerName}</td>
                      <td className="py-4">
                        <div className="flex items-center gap-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star key={i} size={13} className={i < feedback.rating ? "fill-amber-400 text-amber-400" : "text-[#DDD3C5]"} />
                          ))}
                        </div>
                      </td>
                      <td className="max-w-[320px] py-4 leading-5 text-[#746C60]">"{feedback.comment}"</td>
                      <td className="py-4 font-bold text-[#5C554C]">{feedback.category}</td>
                      <td className="py-4 text-[#746C60]">{feedback.date}</td>
                      <td className="py-4">
                        <span className={`rounded-full border px-3 py-1 text-[11px] font-extrabold ${
                          feedback.status === "Positive"       ? "border-emerald-100 bg-emerald-50 text-emerald-700"
                          : feedback.status === "Neutral"      ? "border-sky-100 bg-sky-50 text-sky-700"
                          : "border-rose-100 bg-rose-50 text-rose-700"
                        }`}>
                          {feedback.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* ── Cards ── */}
          <section className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            {feedbackRows.slice(0, 3).map((feedback) => (
              <div key={feedback.id} className="rounded-3xl border border-[#DDD3C5] bg-white p-4 shadow-sm">
                <div className="mb-3 flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-extrabold text-[#1F2933]">{feedback.customerName}</p>
                    <p className="mt-0.5 text-[11px] text-[#8A8175]">{feedback.category} • {feedback.date}</p>
                  </div>
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={13} className={i < feedback.rating ? "fill-amber-400 text-amber-400" : "text-[#DDD3C5]"} />
                    ))}
                  </div>
                </div>
                <p className="text-xs leading-5 text-[#746C60]">"{feedback.comment}"</p>
              </div>
            ))}
          </section>

        </div>
      </main>
    </div>
  );
}

function FeedbackStatCard({ icon, title, value, helper }: { icon: React.ReactNode; title: string; value: string; helper: string }) {
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