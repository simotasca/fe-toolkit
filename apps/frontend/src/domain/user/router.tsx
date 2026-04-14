import { AllUsersPage } from "@/domain/user/pages/AllUsersPage";
import { userRoutes } from "@/domain/user/routes";
import { Route } from "react-router";

export const userRouter = (
  <>
    <Route path={userRoutes.all.path} Component={AllUsersPage} />
  </>
);
