// Cookie utility functions for SSR-compatible storage

export const getCookie = (name: string): string | null => {
  if (typeof document === "undefined") return null; // SSR check

  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop()?.split(";").shift() || null;
  }
  return null;
};

export const setCookie = (name: string, value: string, days = 30): void => {
  if (typeof document === "undefined") return; // SSR check

  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
};

export const deleteCookie = (name: string): void => {
  if (typeof document === "undefined") return; // SSR check

  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
};

// Server-side cookie parsing (for SSR)
export const parseCookies = (
  cookieHeader: string | undefined
): Record<string, string> => {
  if (!cookieHeader) return {};

  return cookieHeader.split(";").reduce(
    (cookies, cookie) => {
      const [name, value] = cookie.trim().split("=");
      if (name && value) {
        cookies[name] = decodeURIComponent(value);
      }
      return cookies;
    },
    {} as Record<string, string>
  );
};
