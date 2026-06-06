// src/app/dashboard/owner-dashboard/loyalty/page.tsx
"use client";
import { useState } from "react";
import SidePanel from "../components/sidepanel";
import { Bell, Search, ArrowRight, ChevronRight, X } from "lucide-react";
// ─── Types ────────────────────────────────────────────────────────────────────
type LoyaltyType = "cashback" | "amount_spent" | "visit_made";
interface LoyaltyOption {
  id: LoyaltyType;
  label: string;
  description: string;
  popular?: boolean;
  illustration: React.ReactNode;
  howItWorks: string;
}
// ─── SVG Illustrations ────────────────────────────────────────────────────────
const CashbackIllustration = () => (
  <svg viewBox="0 0 160 120" fill="none" className="w-full h-full">
    {/* Hand */}
    <ellipse cx="80" cy="95" rx="38" ry="12" fill="#E5E5E5" opacity="0.4" />
    <path d="M55 90 Q58 70 68 65 L80 62 L92 65 Q102 70 105 90" fill="#D4D4D4" />
    <path d="M60 88 Q62 72 70 68 L80 65 L90 68 Q98 72 100 88" fill="#F5F5F5" stroke="#E5E5E5" strokeWidth="1" />
    {/* Fingers */}
    <rect x="63" y="64" width="7" height="22" rx="3.5" fill="#F5F5F5" stroke="#E5E5E5" strokeWidth="1" />
    <rect x="72" y="60" width="7" height="26" rx="3.5" fill="#F5F5F5" stroke="#E5E5E5" strokeWidth="1" />
    <rect x="81" y="59" width="7" height="27" rx="3.5" fill="#F5F5F5" stroke="#E5E5E5" strokeWidth="1" />
    <rect x="90" y="62" width="7" height="24" rx="3.5" fill="#F5F5F5" stroke="#E5E5E5" strokeWidth="1" />
    <rect x="54" y="72" width="7" height="18" rx="3.5" fill="#F5F5F5" stroke="#E5E5E5" strokeWidth="1" transform="rotate(-15 57 78)" />
    {/* Coin */}
    <circle cx="80" cy="38" r="22" fill="#0A0A0A" />
    <circle cx="80" cy="38" r="18" fill="#0A0A0A" stroke="#525252" strokeWidth="1" />
    <text x="80" y="44" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold" fontFamily="serif">$</text>
    {/* Sparkles */}
    <circle cx="112" cy="22" r="3" fill="#A3A3A3" />
    <circle cx="48" cy="18" r="2" fill="#A3A3A3" />
    <circle cx="118" cy="48" r="2" fill="#D4D4D4" />
    <line x1="112" y1="14" x2="112" y2="30" stroke="#A3A3A3" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="104" y1="22" x2="120" y2="22" stroke="#A3A3A3" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);
const AmountSpentIllustration = () => (
  <svg viewBox="0 0 160 120" fill="none" className="w-full h-full">
    {/* Shadow */}
    <ellipse cx="80" cy="108" rx="40" ry="6" fill="#E5E5E5" opacity="0.5" />
    {/* Phone body */}
    <rect x="55" y="20" width="50" height="85" rx="8" fill="#F5F5F5" stroke="#E5E5E5" strokeWidth="2" />
    <rect x="59" y="26" width="42" height="60" rx="4" fill="white" />
    {/* Screen content */}
    <rect x="63" y="30" width="34" height="6" rx="2" fill="#E5E5E5" />
    <rect x="63" y="40" width="20" height="4" rx="2" fill="#F2F2F2" />
    {/* Cart icon on screen */}
    <rect x="68" y="50" width="24" height="16" rx="3" fill="#0A0A0A" />
    <path d="M73 54 L75 62 L85 62 L87 54" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <circle cx="76" cy="65" r="1.5" fill="white" />
    <circle cx="83" cy="65" r="1.5" fill="white" />
    {/* Points badge */}
    <rect x="63" y="72" width="34" height="10" rx="3" fill="#F9F9F9" stroke="#E5E5E5" />
    <text x="80" y="80" textAnchor="middle" fill="#0A0A0A" fontSize="6" fontWeight="600" fontFamily="sans-serif">+250 pts</text>
    {/* Home indicator */}
    <rect x="72" y="99" width="16" height="2.5" rx="1.25" fill="#D4D4D4" />
    {/* Stars floating */}
    <circle cx="40" cy="45" r="4" fill="#0A0A0A" opacity="0.15" />
    <circle cx="120" cy="35" r="3" fill="#0A0A0A" opacity="0.12" />
    <circle cx="125" cy="65" r="5" fill="#A3A3A3" opacity="0.2" />
  </svg>
);
const VisitMadeIllustration = () => (
  <svg viewBox="0 0 160 120" fill="none" className="w-full h-full">
    {/* Door frame */}
    <rect x="85" y="20" width="42" height="78" rx="3" fill="#E5E5E5" />
    <rect x="88" y="23" width="36" height="72" rx="2" fill="#F5F5F5" stroke="#D4D4D4" strokeWidth="1" />
    {/* Door knob */}
    <circle cx="92" cy="60" r="3" fill="#A3A3A3" />
    {/* Door lines (panels) */}
    <rect x="93" y="30" width="25" height="22" rx="2" fill="white" stroke="#E5E5E5" strokeWidth="1" />
    <rect x="93" y="57" width="25" height="32" rx="2" fill="white" stroke="#E5E5E5" strokeWidth="1" />
    {/* Shadow */}
    <ellipse cx="70" cy="108" rx="30" ry="5" fill="#E5E5E5" opacity="0.4" />
    {/* Person body */}
    <circle cx="58" cy="38" r="11" fill="#0A0A0A" />
    <circle cx="58" cy="38" r="8" fill="#F5F5F5" />
    {/* Person walking */}
    <rect x="51" y="52" width="14" height="30" rx="7" fill="#0A0A0A" />
    {/* Arms */}
    <path d="M51 62 Q40 68 38 78" stroke="#0A0A0A" strokeWidth="5" strokeLinecap="round" />
    <path d="M65 62 Q74 60 78 55" stroke="#0A0A0A" strokeWidth="5" strokeLinecap="round" />
    {/* Legs */}
    <path d="M55 80 Q52 92 48 100" stroke="#0A0A0A" strokeWidth="5" strokeLinecap="round" />
    <path d="M61 80 Q65 92 70 100" stroke="#0A0A0A" strokeWidth="5" strokeLinecap="round" />
    {/* Feet */}
    <ellipse cx="48" cy="101" rx="6" ry="3" fill="#0A0A0A" />
    <ellipse cx="70" cy="101" rx="6" ry="3" fill="#0A0A0A" />
    {/* Stars */}
    <circle cx="30" cy="40" r="3" fill="#A3A3A3" opacity="0.4" />
    <circle cx="140" cy="50" r="3" fill="#A3A3A3" opacity="0.3" />
    {/* Motion lines */}
    <line x1="30" y1="55" x2="42" y2="55" stroke="#E5E5E5" strokeWidth="2" strokeLinecap="round" />
    <line x1="28" y1="63" x2="40" y2="63" stroke="#E5E5E5" strokeWidth="2" strokeLinecap="round" />
    <line x1="32" y1="71" x2="42" y2="71" stroke="#E5E5E5" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
// ─── Data ─────────────────────────────────────────────────────────────────────
const loyaltyOptions: LoyaltyOption[] = [
  {
    id: "cashback",
    label: "Cashback",
    description: "Customers earn a percentage of their amount spent back in cash.",
    popular: true,
    illustration: <CashbackIllustration />,
    howItWorks:
      "Set a cashback percentage (e.g. 5%). Every time a customer makes a purchase, they automatically receive that percentage as cashback credited to their wallet.",
  },
  {
    id: "amount_spent",
    label: "Amount Spent",
    description: "Customers earn points based on how much they spend.",
    illustration: <AmountSpentIllustration />,
    howItWorks:
      "Define a points-per-rupee ratio (e.g. 1 point per ₹10 spent). Points accumulate with every purchase and can be redeemed for rewards.",
  },
  {
    id: "visit_made",
    label: "Visit Made",
    description: "Customers earn fixed points on every visit.",
    illustration: <VisitMadeIllustration />,
    howItWorks:
      "Award a fixed number of points each time a customer visits your store, regardless of their spend. Great for driving foot traffic.",
  },
];
// ─── Backend stubs (fill these in later) ─────────────────────────────────────
// async function saveLoyaltyType(type: LoyaltyType, config: object) {
//   // TODO: POST /api/loyalty/setup
// }
// async function fetchCurrentLoyaltyConfig() {
//   // TODO: GET /api/loyalty/config
// }
// ─── Page ─────────────────────────────────────────────────────────────────────
export default function LoyaltyPage() {
  const [selected, setSelected] = useState<LoyaltyType | null>(null);
  const [howItWorksOpen, setHowItWorksOpen] = useState<LoyaltyType | null>(null);
  const [step, setStep] = useState<"choose" | "configure">("choose");
  // ── Handlers (backend logic goes inside these) ──────────────────────────────
  function handleChooseAndCustomise(type: LoyaltyType) {
    setSelected(type);
    setStep("configure");
    // TODO: call saveLoyaltyType(type, {}) once backend is ready
  }
  function handleSaveConfiguration(e: React.FormEvent) {
    e.preventDefault();
    // TODO: collect form values and call saveLoyaltyType(selected!, formValues)
  }
  function handleBack() {
    setStep("choose");
    setSelected(null);
  }
  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#F9F9F9] text-[#0A0A0A] selection:bg-black selection:text-white">
      <SidePanel />
      <main className="lg:ml-64">
        {/* Desktop Header */}
        <header className="sticky top-0 z-30 hidden border-b border-[#E5E5E5] bg-white/80 px-8 py-5 backdrop-blur-md lg:block">
          <div className="flex items-center justify-between gap-5">
            <div>
              <h2 className="text-xl font-semibold tracking-tight text-[#0A0A0A]">
                Loyalty Performance
              </h2>
              <p className="mt-0.5 text-sm text-[#737373]">
                Set up and manage your customer loyalty program
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 rounded-full border border-[#E5E5E5] bg-[#F9F9F9] px-4 py-2 transition-colors focus-within:border-black focus-within:bg-white">
                <Search size={14} className="text-[#A3A3A3]" />
                <input
                  placeholder="Search..."
                  className="w-48 bg-transparent text-sm font-medium text-[#0A0A0A] outline-none placeholder:text-[#A3A3A3]"
                />
              </div>
              <button className="flex h-9 w-9 items-center justify-center rounded-full border border-[#E5E5E5] bg-white text-[#525252] transition-colors hover:bg-[#F2F2F2] hover:text-black">
                <Bell size={16} />
              </button>
            </div>
          </div>
        </header>
        {/* ── How It Works Drawer ── */}
        {howItWorksOpen && (
          <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
            <div
              className="absolute inset-0 bg-black/20 backdrop-blur-sm"
              onClick={() => setHowItWorksOpen(null)}
            />
            <div className="relative z-10 w-full max-w-md rounded-2xl border border-[#E5E5E5] bg-white p-8 shadow-2xl mx-4">
              <button
                onClick={() => setHowItWorksOpen(null)}
                className="absolute right-5 top-5 flex h-7 w-7 items-center justify-center rounded-full bg-[#F2F2F2] text-[#525252] transition-colors hover:bg-[#E5E5E5]"
              >
                <X size={14} />
              </button>
              <div className="mb-4 h-32 w-full">
                {loyaltyOptions.find((o) => o.id === howItWorksOpen)?.illustration}
              </div>
              <h3 className="text-lg font-semibold text-[#0A0A0A]">
                {loyaltyOptions.find((o) => o.id === howItWorksOpen)?.label}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#525252]">
                {loyaltyOptions.find((o) => o.id === howItWorksOpen)?.howItWorks}
              </p>
              <button
                onClick={() => {
                  handleChooseAndCustomise(howItWorksOpen);
                  setHowItWorksOpen(null);
                }}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-black py-3 text-sm font-medium text-white transition-colors hover:bg-[#333333]"
              >
                Choose and Customise <ArrowRight size={14} />
              </button>
            </div>
          </div>
        )}
        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-8">
          {/* ── Step: Choose Type ── */}
          {step === "choose" && (
            <div>
              <div className="mb-8">
                <h3 className="text-2xl font-bold tracking-tight text-[#0A0A0A]">
                  Choose Loyalty Type
                </h3>
                <p className="mt-1 text-sm text-[#737373]">
                  Pick the reward model that fits your business best.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                {loyaltyOptions.map((option) => (
                  <div
                    key={option.id}
                    className="group relative flex flex-col rounded-2xl border border-[#E5E5E5] bg-white p-6 transition-all hover:border-[#D4D4D4] hover:shadow-[0_8px_30px_-6px_rgba(0,0,0,0.10)]"
                  >
                    {/* Popular badge */}
                    {option.popular && (
                      <div className="absolute -top-3 left-6">
                        <span className="rounded-full bg-black px-3 py-1 text-xs font-semibold text-white">
                          Popular
                        </span>
                      </div>
                    )}
                    {/* Illustration */}
                    <div className="mb-5 h-36 w-full overflow-hidden rounded-xl bg-[#F9F9F9] p-4">
                      {option.illustration}
                    </div>
                    {/* Text */}
                    <h4 className="text-base font-bold text-[#0A0A0A]">{option.label}</h4>
                    <p className="mt-1.5 flex-1 text-sm leading-relaxed text-[#737373]">
                      {option.description}
                    </p>
                    {/* See how it works */}
                    <button
                      onClick={() => setHowItWorksOpen(option.id)}
                      className="mt-4 flex items-center gap-1 text-sm font-medium text-[#525252] underline-offset-2 transition-colors hover:text-black hover:underline"
                    >
                      See how it works <ChevronRight size={13} />
                    </button>
                    {/* CTA */}
                    <button
                      onClick={() => handleChooseAndCustomise(option.id)}
                      className="mt-3 flex w-full items-center justify-center gap-2 rounded-full bg-black py-2.5 text-sm font-medium text-white transition-all hover:bg-[#333333] group-hover:gap-3"
                    >
                      Choose and Customise <ArrowRight size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
          {/* ── Step: Configure ── */}
          {step === "configure" && selected && (
            <div>
              {/* Back */}
              <button
                onClick={handleBack}
                className="mb-6 flex items-center gap-2 text-sm font-medium text-[#525252] transition-colors hover:text-black"
              >
                ← Back to Loyalty Types
              </button>
              <div className="mb-8 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#F2F2F2]">
                  <div className="h-8 w-8">
                    {loyaltyOptions.find((o) => o.id === selected)?.illustration}
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold tracking-tight text-[#0A0A0A]">
                    Customise{" "}
                    <span className="capitalize">
                      {loyaltyOptions.find((o) => o.id === selected)?.label}
                    </span>
                  </h3>
                  <p className="text-sm text-[#737373]">
                    Configure your loyalty program settings below.
                  </p>
                </div>
              </div>
              <form
                onSubmit={handleSaveConfiguration}
                className="max-w-xl space-y-6 rounded-2xl border border-[#E5E5E5] bg-white p-8"
              >
                {/* ── Cashback fields ── */}
                {selected === "cashback" && (
                  <>
                    <FormField
                      label="Cashback Percentage"
                      hint="% of spend returned to customer"
                      id="cashback_pct"
                      placeholder="e.g. 5"
                      suffix="%"
                    />
                    <FormField
                      label="Maximum Cashback per Order"
                      hint="Cap the cashback amount (₹)"
                      id="cashback_max"
                      placeholder="e.g. 200"
                      prefix="₹"
                    />
                    <FormField
                      label="Minimum Order Value"
                      hint="Order must be at least this value"
                      id="cashback_min_order"
                      placeholder="e.g. 100"
                      prefix="₹"
                    />
                  </>
                )}
                {/* ── Amount Spent fields ── */}
                {selected === "amount_spent" && (
                  <>
                    <FormField
                      label="Points per ₹ Spent"
                      hint="How many points per rupee"
                      id="pts_per_rupee"
                      placeholder="e.g. 1"
                    />
                    <FormField
                      label="Minimum Spend to Earn"
                      hint="Minimum order value to earn points"
                      id="min_spend"
                      placeholder="e.g. 50"
                      prefix="₹"
                    />
                    <FormField
                      label="Points Expiry (days)"
                      hint="Leave blank for no expiry"
                      id="expiry_days"
                      placeholder="e.g. 365"
                    />
                  </>
                )}
                {/* ── Visit Made fields ── */}
                {selected === "visit_made" && (
                  <>
                    <FormField
                      label="Points per Visit"
                      hint="Fixed points awarded on each visit"
                      id="pts_per_visit"
                      placeholder="e.g. 50"
                    />
                    <FormField
                      label="Minimum Spend to Count as Visit"
                      hint="Optional minimum spend"
                      id="visit_min_spend"
                      placeholder="e.g. 0"
                      prefix="₹"
                    />
                    <FormField
                      label="Cooldown Between Visits (hrs)"
                      hint="Prevent duplicate visits on same day"
                      id="visit_cooldown"
                      placeholder="e.g. 24"
                    />
                  </>
                )}
                {/* Shared: program name */}
                <FormField
                  label="Program Name"
                  hint="Shown to customers in their wallet"
                  id="program_name"
                  placeholder="e.g. Enhanzers Rewards"
                />
                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="submit"
                    className="flex-1 rounded-full bg-black py-3 text-sm font-medium text-white transition-colors hover:bg-[#333333]"
                  >
                    Save &amp; Activate Program
                  </button>
                  <button
                    type="button"
                    onClick={handleBack}
                    className="rounded-full border border-[#E5E5E5] px-6 py-3 text-sm font-medium text-[#525252] transition-colors hover:bg-[#F2F2F2] hover:text-black"
                  >
                    Cancel
                  </button>
                </div>
                <p className="text-center text-xs text-[#A3A3A3]">
                  You can change these settings at any time.
                </p>
              </form>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
// ─── FormField helper ─────────────────────────────────────────────────────────
function FormField({
  label,
  hint,
  id,
  placeholder,
  prefix,
  suffix,
}: {
  label: string;
  hint?: string;
  id: string;
  placeholder?: string;
  prefix?: string;
  suffix?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold text-[#0A0A0A]">
        {label}
      </label>
      {hint && <p className="mb-1.5 mt-0.5 text-xs text-[#A3A3A3]">{hint}</p>}
      <div className="flex overflow-hidden rounded-lg border border-[#E5E5E5] transition-colors focus-within:border-black">
        {prefix && (
          <span className="flex items-center border-r border-[#E5E5E5] bg-[#F9F9F9] px-3 text-sm font-medium text-[#737373]">
            {prefix}
          </span>
        )}
        <input
          id={id}
          type="number"
          placeholder={placeholder}
          className="flex-1 bg-white px-4 py-2.5 text-sm text-[#0A0A0A] outline-none placeholder:text-[#A3A3A3]"
          // onChange={(e) => {}} // TODO: wire to form state
        />
        {suffix && (
          <span className="flex items-center border-l border-[#E5E5E5] bg-[#F9F9F9] px-3 text-sm font-medium text-[#737373]">
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
}
