import { Outlet } from "react-router";
import { MobileNav } from "../components/MobileNav";

export function RootLayout() {
  return (
    <div className="min-h-screen bg-white">
      <Outlet />
      <MobileNav />
    </div>
  );
}