export const ADMIN_TOKEN_COOKIE = "admin_token";

export type AdminUser = {
  id: string;
  email: string;
  role?: string;
};

export function getAdminTokenFromCookie(cookieHeader: string | null): string | undefined {
  if (!cookieHeader) return undefined;
  const match = cookieHeader.match(new RegExp(`(?:^|; )${ADMIN_TOKEN_COOKIE}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : undefined;
}
