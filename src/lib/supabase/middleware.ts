import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

type UserRole = "owner" | "worker" | "customer";

const protectedRoutes: Record<string, UserRole[]> = {
  "/dashboard/owner-dashboard": ["owner"],
  "/dashboard/worker-dashboard": ["owner", "worker"],
  "/dashboard/customer-dashboard": ["customer"],
};

function getAllowedRoles(pathname: string): UserRole[] | null {
  for (const route of Object.keys(protectedRoutes)) {
    if (pathname.startsWith(route)) {
      return protectedRoutes[route];
    }
  }

  return null;
}

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },

      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => {
          request.cookies.set(name, value);
        });

        supabaseResponse = NextResponse.next({
          request,
        });

        cookiesToSet.forEach(({ name, value, options }) => {
          supabaseResponse.cookies.set(name, value, options);
        });
      },
    },
  });

  const pathname = request.nextUrl.pathname;
  const allowedRoles = getAllowedRoles(pathname);

  // Public pages like /login, /signup, /contact, /profile are allowed
  if (!allowedRoles) {
    return supabaseResponse;
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Protected page, but user is not logged in
  if (!user) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/login";
    return NextResponse.redirect(loginUrl);
  }

  // Get logged-in user's role from profiles table
  const { data: profile, error } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  // Logged in, but profile/role missing
  if (error || !profile?.role) {
    const notFoundUrl = request.nextUrl.clone();
    notFoundUrl.pathname = "/not-found";
    return NextResponse.rewrite(notFoundUrl);
  }

  const userRole = profile.role as UserRole;

  // Logged in, but trying to access wrong dashboard
  if (!allowedRoles.includes(userRole)) {
    const notFoundUrl = request.nextUrl.clone();
    notFoundUrl.pathname = "/not-found";
    return NextResponse.rewrite(notFoundUrl);
  }

  return supabaseResponse;
}