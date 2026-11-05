import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Coming Soon gate. This rewrites every page request to /coming-soon.
 * It does not send an HTTP redirect, so the browser URL stays as requested.
 *
 * To restore the marketing site, delete this file and src/app/coming-soon/page.tsx.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname === "/coming-soon" || pathname.startsWith("/coming-soon/")) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = "/coming-soon";
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
