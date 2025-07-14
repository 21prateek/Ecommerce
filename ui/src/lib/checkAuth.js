import { useAuthStore } from "../store/useAuthStore";
import { redirect } from "@tanstack/react-router";

export const dashboardRefresh = async () => {
  //here if we try to go dashboard and if we are not logged in then it will send us to login page and if we are logged in then it will
  //show us this component
  const { checkAuth } = useAuthStore.getState();
  await checkAuth();

  const user = useAuthStore.getState().authUser;
  if (!user) {
    throw redirect({ to: "/auth/login" });
  }
};

export const dasboardToAuth = async () => {
  const { checkAuth } = useAuthStore.getState();
  await checkAuth();
  const user = useAuthStore.getState().authUser;
  if (user) {
    throw redirect({ to: "/" });
  }
};
