// src/app/dashboard/owner-dashboard/components/sidepanel.tsx
"use client";

import LogoutButton from "@/components/LogoutButton";
import {
  Heart,
  Home,
  LayoutDashboard,
  Megaphone,
  Menu,
  MessageSquare,
  SquareChartGantt,
  Users,
  X,
  HandPlatter,
  
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const sidebarItems = [

  { name: "Customers", icon: Users,             href: "/dashboard/worker-dashboard/" },
  { name: "Owner ?", icon: Users,             href: "/dashboard/owner-dashboard/" },

];

export default function SidePanel() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close drawer whenever route changes
  useEffect(() => { setOpen(false); }, [pathname]);

  // Prevent body scroll while drawer is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const isActive = (href: string) =>
    href === "/dashboard/owner-dashboard"
      ? pathname === "/dashboard/owner-dashboard"
      : pathname.startsWith(href);

  const NavLinks = () => (
    <nav className="space-y-1">
      {sidebarItems.map((item) => {
        const Icon = item.icon;
        const active = isActive(item.href);
        return (
          <Link
            key={item.name}
            href={item.href}
            className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
              active
                ? "bg-black text-white"
                : "text-[#525252] hover:bg-[#F2F2F2] hover:text-black"
            }`}
          >
            <Icon size={16} strokeWidth={active ? 2.5 : 2} />
            {item.name}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <>
      {/* ═══════════════════════════════════════════════
          DESKTOP SIDEBAR — visible only at lg+
      ═══════════════════════════════════════════════ */}
      <aside className="fixed left-0 top-0 z-30 hidden h-screen w-64 flex-col justify-between border-r border-[#E5E5E5] bg-white px-5 py-6 lg:flex">
        <div>
          <div className="mb-10 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center bg-black text-sm font-bold text-white">E</div>
            <div>
              <h1 className="text-sm font-bold tracking-tight text-[#0A0A0A]">Enhanzers Engage</h1>
              <p className="text-[11px] font-medium text-[#737373]">Owner Dashboard</p>
            </div>
          </div>
          <NavLinks />
        </div>
        <Link
          href="/"
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-[#525252] transition-all hover:bg-[#F2F2F2] hover:text-black"
        >
          <Home size={16} strokeWidth={2} />
          Back to Website
        </Link>
      </aside>

      {/* ═══════════════════════════════════════════════
          MOBILE TOP BAR — visible only below lg
      ═══════════════════════════════════════════════ */}
      <div className="sticky top-0 z-40 flex items-center justify-between border-b border-[#E5E5E5] bg-white px-4 py-3 lg:hidden">
        <div className="flex items-center gap-3">
          {/* Hamburger */}
          <button
            onClick={() => setOpen(true)}
            aria-label="Open navigation"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#E5E5E5] text-[#525252] transition-colors hover:bg-[#F2F2F2] hover:text-black"
          >
            <Menu size={18} />
          </button>
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center bg-black text-xs font-bold text-white">E</div>
            <span className="text-sm font-bold text-[#0A0A0A]">Owner Dashboard</span>
          </div>
        </div>

        <div className="[&_button]:rounded-md [&_button]:bg-[#F2F2F2] [&_button]:px-3 [&_button]:py-1.5 [&_button]:text-xs [&_button]:font-medium [&_button]:text-black hover:[&_button]:bg-[#E5E5E5]">
          <LogoutButton />
        </div>
      </div>

      {/* ═══════════════════════════════════════════════
          MOBILE DRAWER + BACKDROP
          Using inline styles for transform so Tailwind
          class purging never strips them.
      ═══════════════════════════════════════════════ */}

      {/* Backdrop */}
      <div
        aria-hidden={!open}
        onClick={() => setOpen(false)}
        style={{
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transition: "opacity 0.3s ease",
        }}
        className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm lg:hidden"
      />

      {/* Drawer */}
      <div
        aria-hidden={!open}
        style={{
          transform: open ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 0.3s ease",
        }}
        className="fixed left-0 top-0 z-50 flex h-full w-72 flex-col justify-between border-r border-[#E5E5E5] bg-white px-5 py-6 shadow-2xl lg:hidden"
      >
        <div>
          {/* Drawer header */}
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center bg-black text-sm font-bold text-white">E</div>
              <div>
                <h1 className="text-sm font-bold tracking-tight text-[#0A0A0A]">Enhanzers Engage</h1>
                <p className="text-[11px] font-medium text-[#737373]">Owner Dashboard</p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close navigation"
              className="flex h-8 w-8 items-center justify-center rounded-lg text-[#525252] transition-colors hover:bg-[#F2F2F2] hover:text-black"
            >
              <X size={18} />
            </button>
          </div>

          <NavLinks />
        </div>

        {/* Drawer footer */}
        <div className="space-y-2">
          <Link
            href="/"
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-[#525252] transition-all hover:bg-[#F2F2F2] hover:text-black pl-12"
          >
            <Home  size={16} strokeWidth={2} />
            Back to Website
          </Link>
          <div className="border-t border-[#E5E5E5] pt-2 [&_button]:w-full [&_button]:rounded-lg [&_button]:bg-[#F2F2F2] [&_button]:px-3 [&_button]:py-2.5 [&_button]:text-sm [&_button]:font-medium [&_button]:text-[#0A0A0A] hover:[&_button]:bg-[#E5E5E5]">
            <LogoutButton />
          </div>
        </div>
      </div>
    </>
  );
}