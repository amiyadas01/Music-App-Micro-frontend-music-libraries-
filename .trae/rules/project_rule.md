# Project Rules — Music Library App

These rules apply to every task in this project, regardless of what's
currently being built. They do not change between phases.

## Tech stack (locked — do not substitute or add libraries without flagging first)
- Build tool: Vite, both apps
- Package manager: pnpm, pnpm workspaces
- Language: TypeScript, both apps
- Micro Frontend: `@originjs/vite-plugin-federation`
- Data fetching: `@tanstack/react-query` — always behind custom hooks
- Forms: `react-hook-form`
- Styling: Tailwind CSS v3, consistent across both apps
- Auth: mock JWT, Context + localStorage, main-app only
- State management: `useState` / `useReducer` / Context only — no Redux, no
  other state libraries
- Mock writes: MSW — no real backend

## Code style rules
- No component ever calls `useQuery` or `useMutation` directly — always
  through a custom hook.
- No raw external API field names (e.g. iTunes' `trackName`, `artistName`,
  etc.) are read outside their single dedicated mapping function.
- Prefer small, focused components. If a component grows past ~150 lines,
  consider splitting it.
- Shared types (`Song`, `User`) always come from `@music-library-app/shared-types`
  — never redeclared locally in either app.

## Commit conventions
- Conventional Commits only: `feat:`, `fix:`, `chore:`, `refactor:`, `docs:`
- Incremental commit history — never one giant commit for a whole phase or feature
- Example: `feat: add useSongsQuery hook and itunes field mapping`

## General discipline
- Do not introduce new libraries not already listed in this file without
  asking first.
- Do not silently work around a locked architectural decision (e.g. don't add
  auth logic to the remote to "make it easier") — flag the conflict instead
  and wait for a decision.
- Match whatever the current task's explicit scope says — don't build ahead
  into future work unless asked.