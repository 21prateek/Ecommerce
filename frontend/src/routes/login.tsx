import { createFileRoute } from "@tanstack/react-router";
import RegisterForm from "../component/RegisterForm";

export const Route = createFileRoute("/login")({
  component: RouteComponent,
});

function RouteComponent() {
  return <RegisterForm />;
}
