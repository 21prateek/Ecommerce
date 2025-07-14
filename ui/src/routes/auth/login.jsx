import { createFileRoute } from "@tanstack/react-router";
import LoginForm from "../../components/LoginForm";

import { dasboardToAuth } from "../../lib/checkAuth";

export const Route = createFileRoute("/auth/login")({
  beforeLoad: async () => {
    await dasboardToAuth();
  },
  component: RouteComponent,
});

function RouteComponent() {
  return <LoginForm />;
}
