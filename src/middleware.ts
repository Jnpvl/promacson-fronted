import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ADMIN_TOKEN_COOKIE } from "@/lib/admin-auth";
import { routes } from "@/lib/routes";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === routes.admin.root) {
    return NextResponse.next();
  }

  if (pathname.startsWith(`${routes.admin.root}/`)) {
    const token = request.cookies.get(ADMIN_TOKEN_COOKIE)?.value;
    if (!token) {
      return NextResponse.redirect(new URL(routes.admin.root, request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
