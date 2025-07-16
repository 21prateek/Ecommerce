import { createFileRoute } from "@tanstack/react-router";

import { dashboardRefresh } from "../lib/checkAuth.js";
import NavBar from "../components/NavBar.jsx";
import Footer from "../components/Footer.jsx";
import Content from "../components/Content.jsx";

export const Route = createFileRoute("/")({
  beforeLoad: async () => {
    //written this in another file
    await dashboardRefresh();
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="min-h-screen bg-white">
      <NavBar />
      <Content />
      <Footer />
    </div>
  );
}
