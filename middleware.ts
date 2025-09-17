import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Only apply middleware to admin routes (except the login API)
  if (request.nextUrl.pathname.startsWith("/admin") && !request.nextUrl.pathname.startsWith("/api/admin/auth")) {
    // Check if user is authenticated (this is a simple check, in production you'd use JWT or similar)
    const isAuthenticated = request.headers.get("authorization") || request.cookies.get("admin_session")

    // For client-side routes, we'll let the component handle authentication
    // This middleware is mainly for API protection if needed
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}
