// src/components/Navbar.tsx

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

type UserRole = "owner" | "worker" | "customer";

const navItems = [
  { name: "Product", href: "#product" },
  { name: "Solution", href: "#solution" },
  { name: "Resources", href: "#resources" },
  { name: "Pricing", href: "#pricing" },
  { name: "About us", href: "#about" },
];

const roleDashboardMap: Record<UserRole, string> = {
  owner: "/dashboard/owner-dashboard",
  worker: "/dashboard/worker-dashboard",
  customer: "/dashboard/customer-dashboard",
};

export default function Navbar() {
  const router = useRouter();
  const supabase = createClient();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [dashboardPath, setDashboardPath] = useState<string | null>(null);

  const checkSession = async () => {
    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setDashboardPath(null);
      setLoading(false);
      return;
    }

    const { data: profile, error } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (error || !profile?.role) {
      setDashboardPath(null);
      setLoading(false);
      return;
    }

    const role = profile.role as UserRole;
    setDashboardPath(roleDashboardMap[role] || null);
    setLoading(false);
  };

  useEffect(() => {
    checkSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      checkSession();
    });

    const handlePageShow = () => {
      checkSession();
    };

    window.addEventListener("pageshow", handlePageShow);

    return () => {
      subscription.unsubscribe();
      window.removeEventListener("pageshow", handlePageShow);
    };
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();

    setDashboardPath(null);
    setIsMenuOpen(false);

    router.replace("/");
    router.refresh();
  };

  return (
    <nav className="bg-white shadow-sm fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="w-8 h-8 bg-amber-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">E</span>
            </div>
            <span className="ml-2 font-bold text-xl text-gray-800">
              Enhanzers Engage
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-600 hover:text-amber-600 transition"
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {loading ? (
              <div className="h-10 w-32 rounded-lg bg-gray-100" />
            ) : dashboardPath ? (
              <>
                <Link
                  href={dashboardPath}
                  className="px-4 py-2 text-gray-600 hover:text-amber-600 transition"
                >
                  Dashboard
                </Link>

                <button
                  type="button"
                  onClick={handleSignOut}
                  className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-4 py-2 text-gray-600 hover:text-amber-600 transition"
                >
                  Login
                </Link>

                <Link
                  href="/contact"
                  className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition"
                >
                  Contact us
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 text-gray-800"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block py-2 text-gray-600 hover:text-amber-600"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}

            <div className="pt-4 space-y-2">
              {loading ? (
                <div className="h-10 w-full rounded-lg bg-gray-100" />
              ) : dashboardPath ? (
                <>
                  <Link
                    href={dashboardPath}
                    className="block py-2 text-gray-600 hover:text-amber-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>

                  <button
                    type="button"
                    onClick={handleSignOut}
                    className="block w-full py-2 bg-amber-600 text-white text-center rounded-lg hover:bg-amber-700"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="block py-2 text-gray-600 hover:text-amber-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>

                  <Link
                    href="/contact"
                    className="block py-2 bg-amber-600 text-white text-center rounded-lg hover:bg-amber-700"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Contact us
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}