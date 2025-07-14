import { createFileRoute } from "@tanstack/react-router";

import { dashboardRefresh } from "../lib/checkAuth.js";

export const Route = createFileRoute("/")({
  beforeLoad: async () => {
    //written this in another file
    await dashboardRefresh();
  },
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/actual"!</div>;
}
