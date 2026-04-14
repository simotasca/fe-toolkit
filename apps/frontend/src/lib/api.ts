import { settings } from "@/config/app-settings";
import authApi from "@/domain/auth/api";
import { fetchWithAuth } from "@/domain/auth/utils";
import userApi from "@/domain/user/api";
// import buildingApi from "@/domain/building/api";
// import userApi from "@/domain/user/api";
import { Parser, Service } from "@pkg/api";

const s = new Service(settings.apiHost, {
  init: { headers: { "Content-Type": "application/json" } },
  customFetch: async (input, init) => {
    return fetchWithAuth(input, init);
  },
});

const p = new Parser();

export const api = {
  auth: authApi(s, p),
  user: userApi(s, p),
  // building: buildingApi(s, p),
};