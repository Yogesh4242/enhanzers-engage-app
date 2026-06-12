// src/app/dashboard/owner-dashboard/components/Navbar.tsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Bell,
  ChevronDown,
  LogOut,
  Mail,
  Search,
  Settings,
  User,
  UserCircle,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

const pageTitles: Record<string, string> = {
  "/dashboard/worker-dashboard": "Dashboard - Home",
  "/dashboard/worker-dashboard/overview": "Dashboard - Overview",
  "/dashboard/worker-dashboard/campaigns": "Dashboard - Campaigns",
  "/dashboard/worker-dashboard/loyalty": "Dashboard - Loyalty",
  "/dashboard/worker-dashboard/feedback": "Dashboard - Feedback",
  "/dashboard/worker-dashboard/customers": "Dashboard - Customers",
  "/dashboard/worker-dashboard/tables": "Dashboard - Tables"
};

const searchPlaceholders: Record<string, string> = {
  "/dashboard/worker-dashboard": "Search...",
  "/dashboard/worker-dashboard/overview": "Search analytics...",
  "/dashboard/worker-dashboard/campaigns": "Search campaigns...",
  "/dashboard/worker-dashboard/loyalty": "Search loyalty...",
  "/dashboard/worker-dashboard/feedback": "Search feedback...",
  "/dashboard/worker-dashboard/tables": "Search tables..."
};

type ProfileData = {
  full_name: string | null;
  email: string | null;
  role: string | null;
};

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = useMemo(() => createClient(), []);

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const title = pageTitles[pathname] || "Owner Dashboard";
  const searchPlaceholder = searchPlaceholders[pathname] || "Search...";

  useEffect(() => {
    async function loadUserProfile() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.replace("/login");
        return;
      }

      const { data } = await supabase
        .from("profiles")
        .select("full_name, email, role")
        .eq("id", user.id)
        .single();

      setProfile({
        full_name:
          data?.full_name ||
          user.user_metadata?.full_name ||
          user.user_metadata?.name ||
          "User",
        email: data?.email || user.email || "",
        role: data?.role || "owner",
      });
    }

    loadUserProfile();
  }, [router, supabase]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    setLoggingOut(true);

    await supabase.auth.signOut();

    router.replace("/login");
    router.refresh();
  };

  const displayName = profile?.full_name || "User";
  const displayEmail = profile?.email || "";

  return (
    <header className="sticky top-0 z-30 hidden border-b border-[#E5E5E5] bg-white/80 px-8 py-5 backdrop-blur-md lg:block">
      <div className="flex items-center justify-between gap-5">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-[#0A0A0A]">
            {title}
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-full border border-[#E5E5E5] bg-[#F9F9F9] px-4 py-2 transition-colors focus-within:border-black focus-within:bg-white">
            <Search size={14} className="text-[#A3A3A3]" />

            <input
              type="text"
              placeholder={searchPlaceholder}
              className="w-48 bg-transparent text-sm font-medium text-[#0A0A0A] outline-none placeholder:text-[#A3A3A3]"
            />
          </div>

          <button
            type="button"
            aria-label="Notifications"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[#E5E5E5] bg-white text-[#525252] transition-colors hover:bg-[#F2F2F2] hover:text-black"
          >
            <Bell size={16} />
          </button>

          <div ref={dropdownRef} className="relative ml-2">
            <button
  type="button"
  onClick={() => setMenuOpen((current) => !current)}
  className="group flex h-10 items-center gap-2 rounded-full border border-[#E5E5E5] bg-white px-2.5 pr-3 text-sm font-medium text-[#171717] shadow-sm transition hover:border-[#D4D4D4] hover:bg-[#FAFAFA] hover:shadow-md"
>
  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#111111] text-xs font-semibold uppercase text-white">
    {displayName.charAt(0).toUpperCase()}
  </span>

  <span className="hidden max-w-24 truncate text-sm font-semibold sm:block">
    {displayName}
  </span>

  <ChevronDown
    size={14}
    className={`text-[#737373] transition-transform group-hover:text-black ${
      menuOpen ? "rotate-180" : ""
    }`}
  />
</button>

            {menuOpen && (
              <div className="absolute right-0 mt-3 w-72 overflow-hidden rounded-2xl border border-[#E5E5E5] bg-white shadow-xl">
                <div className="border-b border-[#E5E5E5] px-5 py-4">
                  <p className="text-sm text-[#737373]">Signed in as</p>

                  <p className="mt-1 truncate text-base font-semibold text-[#0A0A0A]">
                    {displayName}
                  </p>

                  {displayEmail && (
                    <p className="mt-1 truncate text-sm text-[#737373]">
                      {displayEmail}
                    </p>
                  )}
                </div>

                <div className="p-2">
                  <Link
                    href="/profile"
                    onClick={() => setMenuOpen(false)}
                    className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium text-[#171717] transition hover:bg-[#F5F5F5]"
                  >
                    <User size={17} />
                    View Profile
                  </Link>

                  <Link
                    href="/contact"
                    onClick={() => setMenuOpen(false)}
                    className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium text-[#171717] transition hover:bg-[#F5F5F5]"
                  >
                    <Mail size={17} />
                    Contact Us
                  </Link>

                  <Link
                    href="/settings"
                    onClick={() => setMenuOpen(false)}
                    className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium text-[#171717] transition hover:bg-[#F5F5F5]"
                  >
                    <Settings size={17} />
                    Settings
                  </Link>

                  <button
                    type="button"
                    onClick={handleLogout}
                    disabled={loggingOut}
                    className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <LogOut size={17} />
                    {loggingOut ? "Logging out..." : "Logout"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}