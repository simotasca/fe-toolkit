import { authRoutes } from "@/domain/auth/routes";
import { UnexpectedStatusError } from "@pkg/api";

export const AUTH_TOKEN_STORAGE_KEY = "authToken";

export function storeAuthToken(token: string): void {
  localStorage.setItem(AUTH_TOKEN_STORAGE_KEY, token);
}

export function logout() {
  localStorage.removeItem(AUTH_TOKEN_STORAGE_KEY);
  window.location.href = authRoutes.login.href();
}

export async function fetchWithAuth(
  input: RequestInfo | URL,
  init?: RequestInit
) {
  const { headers = {}, ...rest } = init || {};

  const token = localStorage.getItem(AUTH_TOKEN_STORAGE_KEY);
  if (token) headers["Authorization"] = `Bearer ${token}`;

  return fetch(input, { ...rest, headers }).then(async (res) => {
    const { pathname } = new URL(res.url);
    if (
      (res.status === 403 || res.status === 401) && // TODO: should forbidden responses throw out of the app?
      !pathname.startsWith("/auth/login") &&
      !pathname.startsWith("/auth/reset-password")
    ) {
      console.warn("Unauthorized response, logging out...");
      logout();
      throw new UnexpectedStatusError(res);
    }
    return res;
  });
}