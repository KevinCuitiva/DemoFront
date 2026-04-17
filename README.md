# DemoFront

Frontend application built with React + TypeScript + Vite.

## Requirements

Before running this project, make sure you have:

- Node.js 20.x LTS (recommended)
- npm 10+ (comes with modern Node.js versions)
- Git
- VS Code (recommended)

## Install

```bash
npm install
```

## Run In Development

```bash
npm run dev
```

Default local URL:

```text
http://localhost:5173
```

If you need access from other devices in the same network:

```bash
npm run dev -- --host
```

## Build For Production

```bash
npm run build
```

## Preview Production Build

```bash
npm run preview
```

## Project Folder Organization (Team-Based)

This project is now organized by shared core code and feature modules, so each team can work in isolated areas.

```text
src/
├─ core/                          # Shared code (cross-team)
│  ├─ api/                        # API clients and service adapters
│  ├─ auth/                       # Shared auth utilities/guards (reserved)
│  ├─ components/                 # Shared UI components (Header, Sidebar, ui/*)
│  ├─ routes/                     # Global routing and app layout
│  │  ├─ RootLayout.tsx
│  │  └─ router.ts
│  └─ utils/                      # Shared utility functions
│
├─ modules/                       # Feature modules (team ownership)
│  ├─ auth/                       # Squad: Identity / access flows
│  │  └─ pages/
│  │     ├─ LandingPage.tsx
│  │     ├─ Login.tsx
│  │     └─ Register.tsx
│  │
│  ├─ users/                      # Squad: Users and player profile domain
│  │  └─ pages/
│  │     └─ Profile.tsx
│  │
│  ├─ teams/                      # Squad: Teams/match operation domain
│  │  ├─ data/
│  │  │  └─ matchesData.ts
│  │  └─ pages/
│  │     ├─ ArbitroDashboard.tsx
│  │     └─ MatchDetail.tsx
│  │
│  ├─ tournament/                 # Squad: Tournament management domain
│  │  └─ pages/
│  │     ├─ OrganizerDashboard.tsx
│  │     ├─ CreateTournament.tsx
│  │     ├─ ManageTournaments.tsx
│  │     ├─ Tournament.tsx
│  │     ├─ TournamentDetail.tsx
│  │     └─ PaymentReport.tsx
│  │
│  └─ competition/                # Squad: Competition and stats views
│     └─ pages/
│        ├─ Dashboard.tsx
│        ├─ Events.tsx
│        ├─ Matches.tsx
│        ├─ Schedule.tsx
│        └─ Scores.tsx
│
├─ App.tsx                        # App shell using RouterProvider
├─ main.tsx                       # React entrypoint
├─ assets/                        # Static assets
└─ styles/                        # Global styles and theme files
```

## How Responsive Behavior Works In This React Project

The app uses CSS utility classes and responsive breakpoints (mainly from Tailwind-style patterns) to adapt layout and spacing.

Key principles used:

- Mobile-first styling: base classes target small screens first
- Breakpoint overrides: `sm:`, `md:`, `lg:`, etc. progressively enhance layout
- Flexible containers: `flex`, `grid`, wrapping, and width constraints (`max-w-*`)
- Conditional navigation patterns: desktop navigation and mobile navigation components
- Fluid spacing and typography: responsive padding, margin, and font-size classes

Recommended responsive workflow:

1. Build and validate each page at mobile width first.
2. Add breakpoint refinements for tablet and desktop.
3. Test critical pages in browser responsive mode (Chrome/Edge DevTools).
4. Keep reusable layout behavior in shared `core/components` when possible.

## Team Collaboration Rules (Current Scope)

- Put cross-feature reusable code in `src/core/*`.
- Put feature-specific views and logic in `src/modules/<feature>/*`.
- Avoid importing one module directly from another unless approved.
- Keep routing centralized in `src/core/routes/router.ts`.

This README currently focuses on setup + folder organization + responsive behavior. Error-handling and frontend architecture conventions will be defined in the next step.
