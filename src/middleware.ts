import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ADMIN_PATHS = ["/dashboard", "/invoices", "/quotes", "/jobs", "/customers"];
const PASSWORD = "2026herewego!";
const COOKIE = "eab_auth";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isAdmin = ADMIN_PATHS.some(p => pathname.startsWith(p));
  if (!isAdmin) return NextResponse.next();
  const auth = request.cookies.get(COOKIE)?.value;
  if (auth === PASSWORD) return NextResponse.next();
  const loginUrl = new URL("/login", request.url);
  loginUrl.searchParams.set("redirect", pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/dashboard/:path*", "/invoices/:path*", "/quotes/:path*", "/jobs/:path*", "/customers/:path*"],
};
