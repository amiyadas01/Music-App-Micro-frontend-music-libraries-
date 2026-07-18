# Architecture — Music Library App

## System overview
A Music Library app built as two independently deployable Vite apps connected
via Module Federation: a host (main-app) that owns auth/routing, and a remote
(music-library) that owns the song browsing/editing UI. They are developed,
built, and deployed separately but composed together at runtime.

## Monorepo structure
music-library-app/
├── apps/
│   ├── main-app/        (host — Vite + React + TS + Tailwind)
│   │   └── owns: auth, routing, JWT/role state, hosts the remote
│   └── music-library/   (remote — Vite + React + TS + Tailwind)
│       └── owns: song data fetching, list/filter/sort UI, add/edit form, mock writes
├── packages/
│   └── shared-types/    (Song, User interfaces — consumed by both apps)
├── package.json
└── pnpm-workspace.yaml

## Micro Frontend architecture
- Module Federation via `@originjs/vite-plugin-federation` — NOT Webpack MF.
- Remote exposes exactly one entry point: `./MusicLibraryApp`. One clean seam —
  no granular per-component exposes.
- Host consumes the remote via `React.lazy(() => import('musicLibrary/MusicLibraryApp'))`,
  wrapped in `<Suspense>`.
- `react`, `react-dom`, `@tanstack/react-query` are listed in `shared` in BOTH
  apps' federation config, with matching versions — prevents duplicate React
  instances, which silently breaks hooks.
- Remote URL is always read from `VITE_REMOTE_URL` env var at build-config time
  via Vite's `loadEnv` — never hardcoded.
- Pinned tooling (required for federation plugin compatibility):
  `vite@^5.4.11`, `@vitejs/plugin-react@^4.3.4`. Do not upgrade either without
  first confirming `@originjs/vite-plugin-federation` compatibility.
- `@originjs/vite-plugin-federation` must be imported via `createRequire`
  (CJS/ESM interop workaround), not a plain ESM default import, in both
  `vite.config.ts` files.

## Auth boundary (non-negotiable)
- Auth and role state live exclusively in main-app: mock JWT decoded/stored in
  Context + localStorage.
- The music-library remote NEVER contains auth logic and NEVER reads
  localStorage directly.
- The remote receives `userRole` and `token` purely as **props** passed down
  from main-app. This keeps the remote reusable/testable in isolation and
  avoids fragile cross-boundary Context sharing between independently built apps.

## Data flow
- **Reads:** iTunes Search API (`https://itunes.apple.com/search?term=...&entity=song`),
  fetched from within music-library.
- **Writes:** MSW (Mock Service Worker) intercepts `POST /songs` and
  `DELETE /songs/:id` in the browser. No real backend. Deploys as static files.
- All server-state access goes through `@tanstack/react-query`, always wrapped
  in custom hooks (`useSongsQuery`, `useAddSongMutation`, etc.) — components
  never call `useQuery`/`useMutation` directly.
- Raw iTunes response fields (`trackName`, `artistName`, `collectionName`,
  `releaseDate`) are mapped to the internal shape (`title`, `artist`, `album`,
  `year`) in exactly one dedicated mapping function. UI components never touch
  raw iTunes fields.

## Deployment model
- music-library deploys first as a standalone static site; its live URL is
  captured.
- main-app is deployed/redeployed second, pointed at that captured URL via
  `VITE_REMOTE_URL`.
- Both apps must work correctly across origins (this is the whole point of
  the `cors: true` dev/preview server config and the env-based remote URL).