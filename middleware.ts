import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const hostname = req.headers.get("host") || "";

  // 1. DEV & UAT: Password protect, then allow /offers to work as a normal path.
  if (
    hostname.includes("dev.vvstudiolabs.com") ||
    hostname.includes("uat.vvstudiolabs.com")
  ) {
    const basicAuth = req.headers.get("authorization");
    if (basicAuth) {
      const authValue = basicAuth.split(" ")[1];
      const [user, pwd] = atob(authValue).split(":");
      if (
        user === process.env.BASIC_AUTH_USER &&
        pwd === process.env.BASIC_AUTH_PASSWORD
      ) {
        // Authenticated — let /offers (and everything else) pass through normally.
        return NextResponse.next();
      } else {
        return new NextResponse("Authentication Required", {
          status: 401,
          headers: { "WWW-Authenticate": 'Basic realm="Secure Agency Portal"' },
        });
      }
    } else {
      return new NextResponse("Authentication Required", {
        status: 401,
        headers: { "WWW-Authenticate": 'Basic realm="Secure Agency Portal"' },
      });
    }
  }

  // 2. SUBDOMAIN ROUTER: offers.vvstudiolabs.com → internally rewrite to /offers
  //    The URL in the browser stays as offers.vvstudiolabs.com (no visible /offers).
  if (hostname === "offers.vvstudiolabs.com") {
    if (!url.pathname.startsWith("/offers")) {
      url.pathname =
        url.pathname === "/" ? "/offers" : `/offers${url.pathname}`;
      return NextResponse.rewrite(url);
    }
    return NextResponse.next();
  }

  // 3. PROD REDIRECT: www.vvstudiolabs.com/offers → 301 to offers.vvstudiolabs.com
  //    Strips the /offers prefix since the subdomain itself represents the offers page.
  if (url.pathname.startsWith("/offers")) {
    const redirectUrl = new URL(req.url);
    redirectUrl.hostname = "offers.vvstudiolabs.com";
    redirectUrl.pathname = redirectUrl.pathname.replace(/^\/offers/, "") || "/";
    return NextResponse.redirect(redirectUrl, 301);
  }

  // Allow all other traffic to proceed normally
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:webp|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|otf)$).*)",
  ],
};
