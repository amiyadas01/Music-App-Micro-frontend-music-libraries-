# Music Library App - Setup & Usage

## Overview

A micro-frontend music library application with a host app and a remote app built with Vite, React, TypeScript, and Module Federation.

## Online Demos

- **Main App (Host)**: https://micro-frontend-music-app.netlify.app
- **Music Library (Remote)**: https://musicapp-library.netlify.app

## Prerequisites

- Node.js (LTS version recommended)
- pnpm (package manager)

## Setup Instructions

1. Clone the repository
2. Install dependencies:
```bash
pnpm install
```

## Usage

### Local Development

#### Start Music Library Remote
```bash
cd apps/music-library
pnpm dev
```
Runs on http://localhost:5001

#### Start Main App (Host)
```bash
cd apps/main-app
pnpm dev
```
Runs on http://localhost:5000

### Build for Production
```bash
# Build both apps
pnpm --filter main-app build
pnpm --filter music-library build
```

### Offline Usage

The app uses MSW (Mock Service Worker) to handle API requests locally, so no internet connection is required once dependencies are installed.

- Songs are fetched from mock iTunes API
- Admin songs are stored in localStorage
- Add/Delete functionality works offline

## Demo Accounts

| Role   | Username | Password  |
|--------|----------|-----------|
| Admin  | admin    | admin123  |
| User   | user     | user123   |

## Tech Stack

- React 18
- TypeScript
- Vite
- Module Federation (@originjs/vite-plugin-federation)
- Tailwind CSS
- React Query
- React Hook Form
- MSW (Mock Service Worker)
