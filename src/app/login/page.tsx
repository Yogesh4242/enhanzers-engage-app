"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

type UserRole = "owner" | "worker" | "customer";

const roleDashboardMap: Record<UserRole, string> = {
  owner: "/dashboard/owner-dashboard",
  worker: "/dashboard/worker-dashboard",
  customer: "/dashboard/customer-dashboard",
};

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    setMessage("");

    const redirectUrl =
      typeof window !== "undefined"
        ? `${window.location.origin}/auth/callback`
        : "http://localhost:3000/auth/callback";

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: redirectUrl,
        queryParams: {
          prompt: "select_account",
        },
      },
    });

    if (error) {
      setMessage(error.message);
      setGoogleLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage(error.message);
      setLoading(false);
      return;
    }

    const user = data.user;

    if (!user) {
      setMessage("Login failed. Please try again.");
      setLoading(false);
      return;
    }

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (profileError || !profile?.role) {
      setMessage("Profile not found. Please contact admin.");
      setLoading(false);
      return;
    }

    const role = profile.role as UserRole;
    const dashboardPath = roleDashboardMap[role];

    if (!dashboardPath) {
      setMessage("Invalid user role. Please contact admin.");
      setLoading(false);
      return;
    }

    router.replace(dashboardPath);
    router.refresh();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-950 text-white px-4">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-2xl p-8 space-y-5"
      >
        <div>
          <h1 className="text-3xl font-bold">Login</h1>
          <p className="text-neutral-400 mt-2">Enter your account details</p>
        </div>

        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={googleLoading || loading}
          className="w-full py-3 rounded-xl bg-white text-black font-semibold hover:bg-neutral-200 transition disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {googleLoading ? "Redirecting..." : "Continue with Google"}
        </button>

        <div className="flex items-center gap-3">
          <div className="h-px flex-1 bg-neutral-800" />
          <span className="text-sm text-neutral-500">or</span>
          <div className="h-px flex-1 bg-neutral-800" />
        </div>

        <div>
          <label className="block mb-2 text-sm">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-xl bg-neutral-800 border border-neutral-700 outline-none"
            placeholder="Enter email"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-xl bg-neutral-800 border border-neutral-700 outline-none"
            placeholder="Enter password"
          />
        </div>

        <div className="text-right">
          <Link
            href="/reset-password"
            className="text-sm text-neutral-400 hover:text-white transition"
          >
            Forgot password?
          </Link>
        </div>

        {message && <p className="text-sm text-red-400">{message}</p>}

        <button
          type="submit"
          disabled={loading || googleLoading}
          className="w-full py-3 rounded-xl bg-white text-black font-semibold hover:bg-neutral-200 transition disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-sm text-neutral-400 text-center">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-white hover:underline">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}