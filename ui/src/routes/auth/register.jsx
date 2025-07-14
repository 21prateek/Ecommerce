import { createFileRoute } from "@tanstack/react-router";
import RegisterForm from "../../components/RegisterForm";

import { dasboardToAuth } from "../../lib/checkAuth";

export const Route = createFileRoute("/auth/register")({
  beforeLoad: async () => {
    await dasboardToAuth();
  },
  component: RouteComponent,
});

function RouteComponent() {
  return <RegisterForm />;
}
