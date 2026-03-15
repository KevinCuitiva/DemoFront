import { createBrowserRouter } from "react-router";
import { LandingPage } from "./pages/LandingPage";
import { Dashboard } from "./pages/Dashboard";
import { ArbitroDashboard } from "./pages/ArbitroDashboard";
import { OrganizerDashboard } from "./pages/OrganizerDashboard";
import { CreateTournament } from "./pages/CreateTournament";
import { PaymentReport } from "./pages/PaymentReport";
import { ManageTournaments } from "./pages/ManageTournaments";
import { TournamentDetail } from "./pages/TournamentDetail";
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
      { path: "dashboard-organizer", Component: OrganizerDashboard },
      { path: "organizer/create-tournament", Component: CreateTournament },
      { path: "organizer/payment-report", Component: PaymentReport },
      { path: "organizer/tournaments", Component: ManageTournaments },
      { path: "organizer/tournaments/:id", Component: TournamentDetail },
      { path: "events", Component: Events },
      { path: "profile", Component: Profile },
      { path: "matches", Component: Matches },
      { path: "schedule", Component: Schedule },
      { path: "scores", Component: Scores },
      { path: "tournament", Component: Tournament },
    ],
  },
]);