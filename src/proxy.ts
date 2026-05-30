import { NextRequest, NextResponse } from 'next/server';

export default function proxy(request: NextRequest) {
  // 1. Clone the incoming request URL
  const url = request.nextUrl.clone();

  // 2. Example: Redirect /old-path to /new-path
  if (url.pathname === '/old-path') {
    url.pathname = '/new-path';
    return NextResponse.redirect(url);
  }

  // 3. Example: Rewrite to an external API (e.g., masking API routes)
  if (url.pathname.startsWith('/api-proxy')) {
    return NextResponse.rewrite(new URL('https://example.com'));
  }

  // 4. Continue the request normally
  return NextResponse.next();
}

// 5. Matcher config to run proxy only on specific routes
export const config = {
  matcher: ['/old-path', '/api-proxy/:path*'], 
};
