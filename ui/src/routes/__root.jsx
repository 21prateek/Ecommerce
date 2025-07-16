// src/routes/__root.jsx
import * as React from "react";
import {
  Outlet,
  createRootRoute,
  useRouterState,
} from "@tanstack/react-router";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  //so this useRouterState hook tell us if a route is loading, current route info,pending transitions,location changes
  const isLoading = useRouterState({
    select: (s) => s.status === "pending", //status are 3 "idel":-	Nothing is loading,"pending":- A new route is loading or transitioning or "error":-	There was a problem during loading
  });

  return (
    <React.Fragment>
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* Main layout UI */}
      {/* <div className="bg-white text-black flex justify-between items-center p-4">
        <h1 className="text-2xl">ShoppingStorage</h1>
        <input type="text" placeholder="Search..." className="border p-1" />
      </div> */}
      <div></div>

      <Outlet />
    </React.Fragment>
  );
}
