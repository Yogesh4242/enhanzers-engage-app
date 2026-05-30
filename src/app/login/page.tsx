"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabaseClient";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
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

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (profileError) {
      setMessage(profileError.message);
      setLoading(false);
      return;
    }

    setLoading(false);

    if (profile.role === "owner") {
  router.push("/dashboard/owner-dashboard");
} else if (profile.role === "worker") {
  router.push("/dashboard/worker-dashboard");
} else {
  router.push("/dashboard/customer-dashboard");
}
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-950 text-white px-4">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-2xl p-8 space-y-5"
      >
        <div>
          <h1 className="text-3xl font-bold">Login</h1>
          <p className="text-neutral-400 mt-2">
            Enter your account details
          </p>
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

        {message && <p className="text-sm text-red-400">{message}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-xl bg-white text-black font-semibold hover:bg-neutral-200 transition"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}