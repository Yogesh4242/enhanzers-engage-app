"use client";

import { useEffect, useMemo, useState } from "react";
import type { User as SupabaseUser } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Star,
  Gift,
  Settings,
  Users,
  ArrowRight,
  Megaphone,
  QrCode,
  LayoutDashboard,
  LogOut,
  Menu,
  X,
  User as UserIcon,
  ChevronDown,
  Check,
  BookOpen,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

type UserRole = "owner" | "worker" | "customer";

const roleDashboardMap: Record<UserRole, string> = {
  owner: "/dashboard/owner-dashboard",
  worker: "/dashboard/worker-dashboard",
  customer: "/dashboard/customer-dashboard",
};

export default function HomePage() {
  const router = useRouter();
  const supabase = useMemo(() => createClient(), []);

  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<SupabaseUser | null>(null);
  const [role, setRole] = useState<UserRole>("customer");
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const getDashboardPath = (userRole: UserRole) => {
    return roleDashboardMap[userRole] || "/dashboard/customer-dashboard";
  };

  const checkSession = async () => {
    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setCurrentUser(null);
      setIsLoggedIn(false);
      setRole("customer");
      setLoading(false);
      return;
    }

    setCurrentUser(user);
    setIsLoggedIn(true);

    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (
      profile?.role === "owner" ||
      profile?.role === "worker" ||
      profile?.role === "customer"
    ) {
      setRole(profile.role);
    } else {
      setRole("customer");
    }

    setLoading(false);
  };

  useEffect(() => {
    checkSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      checkSession();
    });

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    const handlePageShow = () => {
      checkSession();
    };

    const handleFocus = () => {
      checkSession();
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("pageshow", handlePageShow);
    window.addEventListener("focus", handleFocus);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("pageshow", handlePageShow);
      window.removeEventListener("focus", handleFocus);
      subscription.unsubscribe();
    };
  }, [supabase]);

  const handleLogout = async () => {
    await supabase.auth.signOut();

    setIsLoggedIn(false);
    setCurrentUser(null);
    setRole("customer");
    setMobileMenuOpen(false);

    router.replace("/");
    router.refresh();
  };

  const handleScrollTo = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    id: string
  ) => {
    e.preventDefault();

    const element = document.getElementById(id);

    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    setMobileMenuOpen(false);
  };

  const avatarSeed = currentUser?.id || currentUser?.email || "demo-seed";
  const avatarUrl = `https://api.dicebear.com/9.x/bottts-neutral/svg?seed=${avatarSeed}&backgroundColor=E5E7EB`;
  const dashboardPath = getDashboardPath(role);

  return (
    <div className="min-h-screen bg-[#F7F5F0] text-[#2A2A2A] font-sans antialiased overflow-x-hidden scroll-smooth">
      <nav
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrolled || mobileMenuOpen
            ? "bg-[#F7F5F0] border-b border-[#2A2A2A]/10 shadow-sm py-4"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center">
          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-lg sm:text-xl tracking-tight z-50"
          >
            <div className="w-8 h-8 bg-[#2A2A2A] text-[#F7F5F0] rounded flex items-center justify-center">
              E
            </div>
            <span>Enhanzers Engage</span>
          </Link>

          <div className="hidden md:flex items-center gap-8 font-medium text-sm text-[#2A2A2A]/90">
            <div className="relative group pt-2 pb-2">
              <a
                href="#product"
                onClick={(e) => handleScrollTo(e, "product")}
                className="flex items-center gap-1 hover:text-black transition cursor-pointer py-1"
              >
                Product{" "}
                <ChevronDown
                  size={14}
                  className="group-hover:rotate-180 transition-transform duration-200"
                />
              </a>

              <div className="absolute left-1/2 -translate-x-1/2 top-full mt-1 w-64 bg-white border border-[#2A2A2A]/10 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top translate-y-2 group-hover:translate-y-0 p-3 grid gap-1">
                <a
                  href="#product"
                  onClick={(e) => handleScrollTo(e, "product")}
                  className="flex items-start gap-3 p-2 hover:bg-[#F7F5F0] rounded-lg transition"
                >
                  <Gift size={16} className="mt-0.5 text-gray-600" />
                  <div>
                    <div className="font-bold text-xs text-[#2A2A2A]">
                      Smart Loyalty Engine
                    </div>
                    <div className="text-[11px] text-[#2A2A2A]/60">
                      Automated points & cashback rules.
                    </div>
                  </div>
                </a>

                <a
                  href="#product"
                  onClick={(e) => handleScrollTo(e, "product")}
                  className="flex items-start gap-3 p-2 hover:bg-[#F7F5F0] rounded-lg transition"
                >
                  <Settings size={16} className="mt-0.5 text-gray-600" />
                  <div>
                    <div className="font-bold text-xs text-[#2A2A2A]">
                      POS Integrations
                    </div>
                    <div className="text-[11px] text-[#2A2A2A]/60">
                      Direct layout sync for orders.
                    </div>
                  </div>
                </a>
              </div>
            </div>

            <a
              href="#solutions"
              onClick={(e) => handleScrollTo(e, "solutions")}
              className="hover:text-black transition py-1"
            >
              Solutions
            </a>

            <a
              href="#resources"
              onClick={(e) => handleScrollTo(e, "resources")}
              className="hover:text-black transition py-1"
            >
              Resources
            </a>

            <a
              href="#pricing"
              onClick={(e) => handleScrollTo(e, "pricing")}
              className="hover:text-black transition py-1"
            >
              Pricing
            </a>

            <a
              href="#about"
              onClick={(e) => handleScrollTo(e, "about")}
              className="hover:text-black transition py-1"
            >
              About Us
            </a>
          </div>

          <div className="hidden md:flex items-center gap-4 font-medium">
            {loading ? (
              <div className="h-10 w-32 rounded-lg bg-[#2A2A2A]/10 animate-pulse" />
            ) : isLoggedIn ? (
              <>
                <Link
                  href={dashboardPath}
                  className="px-4 py-2 border border-[#2A2A2A]/20 hover:bg-[#2A2A2A]/5 text-[#2A2A2A] rounded-lg transition text-sm flex items-center gap-2 font-semibold"
                >
                  <LayoutDashboard size={15} />
                  Dashboard
                </Link>

                <div className="relative group pt-2 pb-2">
                  <div className="w-11 h-11 rounded-full bg-[#2A2A2A]/10 border-2 border-transparent group-hover:border-[#2A2A2A] cursor-pointer transition-all duration-300 transform group-hover:scale-105 shadow-sm overflow-hidden flex items-center justify-center">
                    <img
                      src={avatarUrl}
                      alt="User Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-[#2A2A2A]/10 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right translate-y-2 group-hover:translate-y-0">
                    <div className="p-2 flex flex-col gap-1">
                      <a
                        href="#"
                        className="flex items-center gap-3 px-3 py-2.5 hover:bg-[#F7F5F0] rounded-lg text-sm font-medium transition-colors"
                      >
                        <UserIcon size={16} className="text-[#2A2A2A]/70" />{" "}
                        View Profile
                      </a>

                      <Link
                        href={dashboardPath}
                        className="flex items-center gap-3 px-3 py-2.5 hover:bg-[#F7F5F0] rounded-lg text-sm font-medium transition-colors"
                      >
                        <LayoutDashboard
                          size={16}
                          className="text-[#2A2A2A]/70"
                        />{" "}
                        Dashboard
                      </Link>

                      <div className="h-px bg-[#2A2A2A]/10 my-1" />

                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-3 py-2.5 hover:bg-red-50 text-red-600 rounded-lg text-sm font-medium transition-colors text-left w-full"
                      >
                        <LogOut size={16} /> Sign Out
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  href="/login"
                  className="px-4 py-2 hover:bg-[#2A2A2A]/5 rounded-lg transition text-sm"
                >
                  Log In
                </Link>

                <Link
                  href="/signup"
                  className="px-4 py-2 bg-[#2A2A2A] text-[#F7F5F0] rounded-lg hover:bg-black transition text-sm"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden z-50 p-2 text-[#2A2A2A] focus:outline-none"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <div
          className={`fixed inset-x-0 top-0 bg-[#F7F5F0] transition-all duration-300 transform ${
            mobileMenuOpen
              ? "opacity-100 translate-y-0 h-screen pointer-events-auto"
              : "opacity-0 -translate-y-full h-0 pointer-events-none"
          } z-40 md:hidden flex flex-col justify-center px-6`}
        >
          <div className="flex flex-col gap-5 text-center text-lg font-bold max-h-[85vh] overflow-y-auto py-8">
            <a
              href="#product"
              onClick={(e) => handleScrollTo(e, "product")}
              className="py-1"
            >
              Product
            </a>

            <a
              href="#solutions"
              onClick={(e) => handleScrollTo(e, "solutions")}
              className="py-1"
            >
              Solutions
            </a>

            <a
              href="#resources"
              onClick={(e) => handleScrollTo(e, "resources")}
              className="py-1"
            >
              Resources
            </a>

            <a
              href="#pricing"
              onClick={(e) => handleScrollTo(e, "pricing")}
              className="py-1"
            >
              Pricing
            </a>

            <a
              href="#about"
              onClick={(e) => handleScrollTo(e, "about")}
              className="py-1"
            >
              About Us
            </a>

            <div className="h-px bg-[#2A2A2A]/10 my-2" />

            {loading ? (
              <div className="h-12 w-full rounded-xl bg-[#2A2A2A]/10 animate-pulse" />
            ) : isLoggedIn ? (
              <div className="flex flex-col items-center w-full">
                <div className="w-16 h-16 rounded-full bg-[#2A2A2A]/10 border-2 border-[#2A2A2A] shadow-md overflow-hidden mb-4 flex items-center justify-center">
                  <img
                    src={avatarUrl}
                    alt="User Profile"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="w-full flex flex-col gap-3">
                  <a
                    href="#"
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-2.5 flex items-center justify-center gap-3 border border-[#2A2A2A]/10 rounded-xl bg-white text-sm"
                  >
                    <UserIcon size={18} /> View Profile
                  </a>

                  <Link
                    href={dashboardPath}
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-2.5 flex items-center justify-center gap-3 border border-[#2A2A2A]/10 rounded-xl bg-white text-sm"
                  >
                    <LayoutDashboard size={18} /> Dashboard
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="flex items-center justify-center gap-2 w-full py-3 bg-[#2A2A2A] text-[#F7F5F0] rounded-xl text-sm font-medium"
                  >
                    <LogOut size={18} /> Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <div className="w-full flex flex-col gap-3">
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-3 border border-[#2A2A2A] rounded-xl text-center text-sm"
                >
                  Log In
                </Link>

                <Link
                  href="/signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-3 bg-[#2A2A2A] text-[#F7F5F0] rounded-xl text-center text-sm"
                >
                  Sign Up Free
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>

      <section className="pt-32 pb-16 sm:pt-40 sm:pb-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 border border-[#2A2A2A] px-3 py-1.5 rounded-full mb-6 max-w-full">
              <Star className="w-3.5 h-3.5 text-[#2A2A2A] fill-[#2A2A2A] flex-shrink-0" />
              <span className="text-xs font-semibold tracking-wide uppercase truncate">
                The Complete Restaurant Loyalty Engine
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
              Smarter Dining. <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2A2A2A] to-gray-500">
                Unmatched Retention.
              </span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-[#2A2A2A]/70 max-w-2xl mx-auto mb-8 sm:mb-10 px-2">
              Transform your restaurant experience with integrated POS loyalty,
              targeted marketing campaigns, and seamless table-based QR
              ordering.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center max-w-sm mx-auto sm:max-w-md">
              <Link
                href={isLoggedIn ? dashboardPath : "/signup"}
                className="w-full sm:w-auto px-8 py-3.5 bg-[#2A2A2A] text-[#F7F5F0] rounded-lg font-semibold hover:bg-black transition inline-flex items-center justify-center gap-2"
              >
                {isLoggedIn ? "Go to Dashboard" : "Get Started Free"}{" "}
                <ArrowRight size={18} />
              </Link>

              <a
                href="#product"
                onClick={(e) => handleScrollTo(e, "product")}
                className="w-full sm:w-auto px-8 py-3.5 border-2 border-[#2A2A2A] rounded-lg font-semibold hover:bg-[#2A2A2A]/5 transition text-center"
              >
                Explore Features
              </a>
            </div>
          </div>
        </div>
      </section>

      <section
        id="product"
        className="py-16 sm:py-24 px-4 sm:px-6 border-t border-[#2A2A2A]/10 scroll-mt-20"
      >
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 sm:mb-16 text-center sm:text-left">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Core Platform Features
            </h2>
            <p className="text-[#2A2A2A]/70 text-base sm:text-lg max-w-2xl">
              Everything you need to capture customer data, run campaigns, and
              track performance seamlessly.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#2A2A2A]/5 hover:shadow-md transition">
              <Gift className="w-10 h-10 mb-5 text-[#2A2A2A]" />
              <h3 className="text-xl font-bold mb-3">Smart Loyalty</h3>
              <ul className="space-y-3 text-sm text-[#2A2A2A]/80">
                <li className="flex items-start gap-2">
                  ✓ <span>Points based on spent amount</span>
                </li>
                <li className="flex items-start gap-2">
                  ✓ <span>Separate cashback offers to collect data</span>
                </li>
                <li className="flex items-start gap-2">
                  ✓ <span>Campaign engagement rewards</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#2A2A2A]/5 hover:shadow-md transition">
              <Settings className="w-10 h-10 mb-5 text-[#2A2A2A]" />
              <h3 className="text-xl font-bold mb-3">Auto Config & POS</h3>
              <ul className="space-y-3 text-sm text-[#2A2A2A]/80">
                <li className="flex items-start gap-2">
                  ✓ <span>Zero manual entry for customer info</span>
                </li>
                <li className="flex items-start gap-2">
                  ✓{" "}
                  <span>Deep integration with existing billing systems</span>
                </li>
                <li className="flex items-start gap-2">
                  ✓ <span>Automated data sync metrics</span>
                </li>
              </ul>
            </div>

            <div className="bg-[#2A2A2A] text-[#F7F5F0] p-6 sm:p-8 rounded-2xl hover:shadow-md transition sm:col-span-2 lg:col-span-1">
              <Megaphone className="w-10 h-10 mb-5 text-[#F7F5F0]" />
              <h3 className="text-xl font-bold mb-3">Campaign Manager</h3>
              <ul className="space-y-3 text-sm text-[#F7F5F0]/80">
                <li className="flex items-start gap-2">
                  ✓ <span>Omnichannel: SMS, Email & WhatsApp</span>
                </li>
                <li className="flex items-start gap-2">
                  ✓ <span>Automated triggers Birthdays, Sales</span>
                </li>
                <li className="flex items-start gap-2">
                  ✓ <span>Advanced audience segment filtering</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section
        id="solutions"
        className="py-16 sm:py-24 px-4 sm:px-6 bg-[#2A2A2A] text-[#F7F5F0] scroll-mt-20"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Tailored Dining Solutions
            </h2>
            <p className="text-[#F7F5F0]/70 text-base sm:text-lg max-w-2xl mx-auto">
              Elevate retention metrics across layout setups with custom dining
              modules.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <div className="bg-[#F7F5F0]/5 p-6 sm:p-8 rounded-2xl border border-[#F7F5F0]/10">
              <QrCode className="w-12 h-12 mb-5 text-white" />
              <h3 className="text-xl sm:text-2xl font-bold mb-4">
                Table-Based QR Engine
              </h3>
              <div className="space-y-4 text-sm text-[#F7F5F0]/80">
                <p>
                  Every dynamic desk area links straight to localized digital
                  checkouts mapping client orders seamlessly.
                </p>
                <ul className="space-y-2 list-disc pl-4 text-xs">
                  <li>Group split order capabilities</li>
                  <li>Gamified table rewards interaction tracking</li>
                </ul>
              </div>
            </div>

            <div className="bg-[#F7F5F0]/5 p-6 sm:p-8 rounded-2xl border border-[#F7F5F0]/10">
              <Users className="w-12 h-12 mb-5 text-white" />
              <h3 className="text-xl sm:text-2xl font-bold mb-4">
                Feedback Intelligence
              </h3>
              <div className="space-y-4 text-sm text-[#F7F5F0]/80">
                <p>
                  Isolate structural operational bottlenecks down to specific
                  shift logs automatically based on checkouts.
                </p>
                <p>
                  Collect party parameters, milestone times, and performance
                  analytics natively on one interface.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="resources"
        className="py-16 sm:py-24 px-4 sm:px-6 bg-white border-b border-[#2A2A2A]/10 scroll-mt-20"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Developer & Growth Resources
            </h2>
            <p className="text-[#2A2A2A]/70 text-sm sm:text-base">
              Everything you need to link operations natively with enterprise
              dashboards, APIs, and guides.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 bg-[#F7F5F0] rounded-xl">
              <BookOpen className="w-8 h-8 mb-4 text-[#2A2A2A]" />
              <h4 className="font-bold text-lg mb-2">API Documentation</h4>
              <p className="text-sm text-[#2A2A2A]/70 mb-4">
                Connect POS machines to cloud loyalty sync channels with less
                code structure overhead.
              </p>
              <span className="text-xs font-bold underline cursor-pointer">
                Read API Guides →
              </span>
            </div>

            <div className="p-6 bg-[#F7F5F0] rounded-xl">
              <Sparkles className="w-8 h-8 mb-4 text-[#2A2A2A]" />
              <h4 className="font-bold text-lg mb-2">Growth Case Studies</h4>
              <p className="text-sm text-[#2A2A2A]/70 mb-4">
                See how casual food chains improved client return visits by 43%
                in three months.
              </p>
              <span className="text-xs font-bold underline cursor-pointer">
                View Strategy Papers →
              </span>
            </div>

            <div className="p-6 bg-[#F7F5F0] rounded-xl sm:col-span-2 lg:col-span-1">
              <ShieldCheck className="w-8 h-8 mb-4 text-[#2A2A2A]" />
              <h4 className="font-bold text-lg mb-2">Compliance & Trust</h4>
              <p className="text-sm text-[#2A2A2A]/70 mb-4">
                Secure data frameworks featuring end-to-end cloud encryption
                safeguards for user nodes.
              </p>
              <span className="text-xs font-bold underline cursor-pointer">
                Security Certifications →
              </span>
            </div>
          </div>
        </div>
      </section>

      <section
        id="pricing"
        className="py-16 sm:py-24 px-4 sm:px-6 bg-[#F7F5F0] scroll-mt-20"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Simple, Transparent Plans
            </h2>
            <p className="text-[#2A2A2A]/70 text-sm sm:text-base">
              No hidden setup fees. Choose the model optimized to scale with
              your venue footprint.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            <div className="bg-white border border-[#2A2A2A]/10 p-8 rounded-2xl flex flex-col justify-between">
              <div>
                <h4 className="font-bold text-lg uppercase tracking-wider text-gray-500 mb-2">
                  Starter
                </h4>
                <div className="text-3xl font-extrabold text-[#2A2A2A] mb-4">
                  $49
                  <span className="text-sm font-normal text-gray-500">
                    /mo
                  </span>
                </div>
                <p className="text-xs text-[#2A2A2A]/70 mb-6">
                  Perfect for single cafe installations starting with customer
                  data loyalty capturing channels.
                </p>
                <div className="h-px bg-gray-100 my-4" />
                <ul className="space-y-2 text-xs text-gray-600">
                  <li className="flex items-center gap-2">
                    <Check size={12} /> 1 Active Venue Location
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={12} /> Smart Points Engine
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={12} /> Standard Email Campaigns
                  </li>
                </ul>
              </div>

              <Link
                href={isLoggedIn ? dashboardPath : "/signup"}
                className="mt-8 block text-center py-3 border border-[#2A2A2A] rounded-lg font-medium text-xs hover:bg-[#2A2A2A] hover:text-white transition"
              >
                Get Started
              </Link>
            </div>

            <div className="bg-white border-2 border-[#2A2A2A] p-8 rounded-2xl relative flex flex-col justify-between shadow-lg">
              <span className="absolute top-0 right-6 transform -translate-y-1/2 bg-[#2A2A2A] text-[#F7F5F0] text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                Most Popular
              </span>

              <div>
                <h4 className="font-bold text-lg uppercase tracking-wider text-[#2A2A2A] mb-2">
                  Growth
                </h4>
                <div className="text-3xl font-extrabold text-[#2A2A2A] mb-4">
                  $129
                  <span className="text-sm font-normal text-gray-500">
                    /mo
                  </span>
                </div>
                <p className="text-xs text-[#2A2A2A]/70 mb-6">
                  Built for expanding setups requiring advanced custom feedback
                  loops and full CRM tracking tools.
                </p>
                <div className="h-px bg-gray-100 my-4" />
                <ul className="space-y-2 text-xs text-gray-600">
                  <li className="flex items-center gap-2">
                    <Check size={12} /> Up to 3 Venue Locations
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={12} /> Table QR Code Module Sync
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={12} /> Omnichannel Automation Engine
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={12} /> Standard POS API access
                  </li>
                </ul>
              </div>

              <Link
                href={isLoggedIn ? dashboardPath : "/signup"}
                className="mt-8 block text-center py-3 bg-[#2A2A2A] text-white rounded-lg font-medium text-xs hover:bg-black transition"
              >
                Choose Growth
              </Link>
            </div>

            <div className="bg-white border border-[#2A2A2A]/10 p-8 rounded-2xl flex flex-col justify-between">
              <div>
                <h4 className="font-bold text-lg uppercase tracking-wider text-gray-500 mb-2">
                  Enterprise
                </h4>
                <div className="text-3xl font-extrabold text-[#2A2A2A] mb-4">
                  Custom
                </div>
                <p className="text-xs text-[#2A2A2A]/70 mb-6">
                  Tailored configurations engineered for established chains with
                  multi-region dashboard operations.
                </p>
                <div className="h-px bg-gray-100 my-4" />
                <ul className="space-y-2 text-xs text-gray-600">
                  <li className="flex items-center gap-2">
                    <Check size={12} /> Unlimited Chain Branches
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={12} /> Dedicated Database Architecture
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={12} /> Custom API / Custom Frontend
                  </li>
                </ul>
              </div>

              <a
                href="mailto:sales@enhanzers.com"
                className="mt-8 block text-center py-3 border border-[#2A2A2A] rounded-lg font-medium text-xs hover:bg-[#2A2A2A] hover:text-white transition"
              >
                Contact Sales
              </a>
            </div>
          </div>
        </div>
      </section>

      <section
        id="about"
        className="py-16 sm:py-24 px-4 sm:px-6 bg-white scroll-mt-20"
      >
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block px-3 py-1 bg-[#F7F5F0] rounded-full text-xs font-semibold uppercase text-gray-600 mb-4">
            Our Background
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#2A2A2A] mb-6">
            Bridging Code Architecture with Restaurant Hospitality
          </h2>

          <p className="text-sm sm:text-base text-[#2A2A2A]/70 leading-relaxed mb-6">
            Enhanzers Engage was founded with a singular focus: to modernize
            retention technology. We build streamlined cloud dashboards and
            integrated database systems that put full brand control back into
            managers' hands, replacing outdated hardware with seamless
            experiences.
          </p>
        </div>
      </section>

      <section className="py-20 sm:py-24 px-4 sm:px-6 bg-[#F7F5F0]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6">
            Ready to Upgrade Your Venue?
          </h2>

          <p className="text-sm sm:text-base text-[#2A2A2A]/70 max-w-xl mx-auto mb-8">
            Join leading hospitality operators leveraging automation engines to
            boost customer life cycle value metrics.
          </p>

          <Link
            href={isLoggedIn ? dashboardPath : "/signup"}
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#2A2A2A] text-[#F7F5F0] rounded-lg font-semibold hover:bg-black transition text-sm"
          >
            {isLoggedIn ? "Go to Dashboard" : "Get Started Instantly"}{" "}
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <footer className="py-8 px-4 sm:px-6 border-t border-[#2A2A2A]/10 bg-[#F7F5F0] text-center text-xs text-[#2A2A2A]/50">
        <p>
          &copy; {new Date().getFullYear()} Enhanzers Engage. All architecture
          pipelines secured.
        </p>
      </footer>
    </div>
  );
}