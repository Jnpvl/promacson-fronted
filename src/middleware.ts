import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ADMIN_TOKEN_COOKIE } from "@/lib/admin-auth";
import { routes } from "@/lib/routes";

/** El panel no debe indexarse; también en redirecciones. */
const ADMIN_ROBOTS = "noindex, nofollow";

function withNoindex(response: NextResponse): NextResponse {
  response.headers.set("X-Robots-Tag", ADMIN_ROBOTS);
  return response;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === routes.admin.root) {
    return withNoindex(NextResponse.next());
  }

  if (pathname.startsWith(`${routes.admin.root}/`)) {
    const token = request.cookies.get(ADMIN_TOKEN_COOKIE)?.value;
    if (!token) {
      return withNoindex(NextResponse.redirect(new URL(routes.admin.root, request.url)));
    }
  }

  return withNoindex(NextResponse.next());
}

export const config = {
  matcher: ["/admin/:path*"],
};
