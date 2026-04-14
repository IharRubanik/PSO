import { NextRequest, NextResponse } from "next/server";

const locales = ["ru", "en"];
const defaultLocale = "ru";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip api routes, _next, static files, admin panel
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/assets") ||
    pathname.startsWith("/admin") ||
    pathname.includes(".")
  ) {
    return;
  }

  // Check if locale is already in path
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  // Redirect to default locale
  request.nextUrl.pathname = `/${defaultLocale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: ["/((?!api|admin|_next/static|_next/image|assets|favicon.ico).*)"],
};
