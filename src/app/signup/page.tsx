"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function SignupPage() {
  const router = useRouter();
  const supabase = createClient();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    const cleanEmail = email.trim().toLowerCase();

    const { data, error } = await supabase.auth.signUp({
      email: cleanEmail,
      password,
    });

    if (error) {
      setMessage(error.message);
      setLoading(false);
      return;
    }

    const user = data.user;

    if (!user) {
      setMessage("Signup successful. Please check your email to confirm your account.");
      setLoading(false);
      return;
    }

    const { error: profileError } = await supabase.rpc(
      "create_profile_for_signup",
      {
        user_id: user.id,
        user_full_name: fullName,
        user_email: cleanEmail,
      }
    );

    if (profileError) {
      setMessage(profileError.message);
      setLoading(false);
      return;
    }

    setMessage("Signup successful! Please login.");
    setLoading(false);

    router.replace("/login");
    router.refresh();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-950 text-white px-4">
      <form
        onSubmit={handleSignup}
        className="w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-2xl p-8 space-y-5"
      >
        <div>
          <h1 className="text-3xl font-bold">Create Account</h1>
          <p className="text-neutral-400 mt-2">
            Signup to access the restaurant system
          </p>
        </div>

        <div>
          <label className="block mb-2 text-sm">Full Name</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-xl bg-neutral-800 border border-neutral-700 outline-none"
            placeholder="Enter full name"
          />
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
            minLength={6}
            className="w-full px-4 py-3 rounded-xl bg-neutral-800 border border-neutral-700 outline-none"
            placeholder="Enter password"
          />
        </div>

        <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-4 text-sm text-neutral-400">
          New users are created as customers by default. Staff and owner access
          is assigned only to approved emails.
        </div>

        {message && <p className="text-sm text-yellow-400">{message}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-xl bg-white text-black font-semibold hover:bg-neutral-200 transition disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "Creating..." : "Sign Up"}
        </button>

        <p className="text-sm text-neutral-400 text-center">
          Already have an account?{" "}
          <Link href="/login" className="text-white hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}