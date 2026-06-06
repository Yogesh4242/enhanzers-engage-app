"use client";

import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function AuthCallbackPage() {
  const router = useRouter();
  const supabase = useMemo(() => createClient(), []);

  useEffect(() => {
    const handleGoogleCallback = async () => {
      await new Promise((resolve) => setTimeout(resolve, 800));

      const { data: sessionData } = await supabase.auth.getSession();

      if (!sessionData.session) {
        router.push("/login");
        return;
      }

      const user = sessionData.session.user;

      const { data: existingProfile, error: profileFetchError } = await supabase
        .from("profiles")
        .select("id, role")
        .eq("id", user.id)
        .single();

      if (profileFetchError && profileFetchError.code !== "PGRST116") {
        router.push("/login");
        return;
      }

      if (!existingProfile) {
        const { error: insertError } = await supabase.from("profiles").insert({
          id: user.id,
          full_name:
            user.user_metadata?.full_name ||
            user.user_metadata?.name ||
            "Google User",
          email: user.email,
          role: "customer",
        });

        if (insertError) {
          console.log(insertError.message);
          router.push("/login");
          return;
        }

        router.push("/dashboard/customer-dashboard");
        return;
      }

      if (existingProfile.role === "owner") {
        router.push("/dashboard/owner-dashboard");
      } else if (existingProfile.role === "worker") {
        router.push("/dashboard/worker-dashboard");
      } else {
        router.push("/dashboard/customer-dashboard");
      }
    };

    handleGoogleCallback();
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-950 text-white">
      <p>Signing you in with Google...</p>
    </div>
  );
}