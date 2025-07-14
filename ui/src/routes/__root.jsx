import * as React from "react";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { Search } from "lucide-react";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <React.Fragment>
      <div></div>
      <Outlet />
    </React.Fragment>
  );
}
