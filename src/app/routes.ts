import { createBrowserRouter } from "react-router";
import { LandingPage } from "./pages/LandingPage";
import { Dashboard } from "./pages/Dashboard";
import { ArbitroDashboard } from "./pages/ArbitroDashboard";
import { MatchDetail } from "./pages/MatchDetail";
import { Events } from "./pages/Events";
import { Profile } from "./pages/Profile";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Matches } from "./pages/Matches";
import { Schedule } from "./pages/Schedule";
import { Scores } from "./pages/Scores";
import { Tournament } from "./pages/Tournament";
import { RootLayout } from "./layouts/RootLayout";

export const router = createBrowserRouter([
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/register",
    Component: Register,
  },
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: LandingPage },
      { path: "dashboard", Component: Dashboard },
      { path: "dashboard-arbitro", Component: ArbitroDashboard },
      { path: "dashboard-arbitro/partido/:id", Component: MatchDetail },
      { path: "events", Component: Events },
      { path: "profile", Component: Profile },
      { path: "matches", Component: Matches },
      { path: "schedule", Component: Schedule },
      { path: "scores", Component: Scores },
      { path: "tournament", Component: Tournament },
    ],
  },
]);