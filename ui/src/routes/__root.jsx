import * as React from "react";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { Search } from "lucide-react";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <React.Fragment>
      <div className="bg-white text-black flex justify-between items-center p-4">
        <h1 className="text-2xl">ShoppingStorage</h1>
        <div>
          <input type="text" />
          <Search />
        </div>
        <div>
          <ul>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>
      </div>
      <Outlet />
    </React.Fragment>
  );
}
