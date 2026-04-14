// import userRoutes from "@/domain/user/routes";
import { authRoutes } from "@/domain/auth/routes";
import { userRoutes } from "@/domain/user/routes";
// import buildingRoutes from "@/domain/building/routes";

export const routes = {
  auth: authRoutes,
  user: userRoutes,
  // building: buildingRoutes,
};
