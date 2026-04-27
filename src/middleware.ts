import { NextRequest, NextResponse } from "next/server";

const locales = ["ru", "en"] as const;
const defaultLocale = "ru";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip API, internal Next assets, static files, admin panel, public assets
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/assets") ||
    pathname.startsWith("/admin") ||
    pathname.includes(".")
  ) {
    return;
  }

  // English locale stays prefixed in the URL
  if (pathname === "/en" || pathname.startsWith("/en/")) {
    return;
  }

  // Drop /ru prefix from URL — render at canonical, prefix-less path
  if (pathname === `/${defaultLocale}` || pathname.startsWith(`/${defaultLocale}/`)) {
    const stripped = pathname.slice(`/${defaultLocale}`.length) || "/";
    const url = request.nextUrl.clone();
    url.pathname = stripped;
    return NextResponse.redirect(url);
  }

  // Any other path: render Russian content while keeping the URL clean
  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/((?!api|admin|_next/static|_next/image|assets|favicon.ico).*)"],
};

// suppress unused-locale warning
void locales;
