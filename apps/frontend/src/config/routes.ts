import { settings } from "./app-settings";

export const routes = {
  home: { path: "/", href: () => "/" },
  login: { path: "/login", href: () => "/login" },
};

export function apiUrl(path: string) {
  return new URL(path, settings.apiHost).toString();
}