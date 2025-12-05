# Datahub V1 - University Information Platform

A full-stack web application for exploring, comparing, and managing university information. Built with React, Express, TypeScript, and other modern tools.

## Overview

Datahub V1 lets users browse university profiles, compare universities side-by-side, save favorites, filter by criteria, and view content in multiple languages (English, Kazakh, Russian).

## Quick Links

- `client/` — React frontend
- `server/` — Express backend
- `attached_assets/` — University JSON data and assets

## Features

- University directory and detailed profiles
- Comparison tool
- Favorites management
- Advanced filtering and sorting
- Internationalization (i18n) — English, Kazakh, Russian
- Responsive UI built with TailwindCSS and Radix components
- Optional AI-powered recommendations feature (client-side API key input)

## Tech Stack (short)

- Frontend: React 19, TypeScript, Vite, TailwindCSS
- Backend: Express, TypeScript, Drizzle ORM (PostgreSQL)
- Dev tools: `tsx`, PostCSS, Vite

## Getting Started

Prerequisites

- Node.js 18+ and npm
- PostgreSQL (for production/DB work)

Clone and install

```powershell
git clone https://github.com/Mehmetscolfield/Datahub-V1.git
cd "Uni-Info\Uni-Info"
npm install
```

Environment

Create a `.env` in the project root (example values):

```text
DATABASE_URL=postgresql://user:password@localhost:5432/uni_info
NODE_ENV=development
PORT=5000
```

Database (optional)

```powershell
npm run db:push
```

## Development

Start the frontend (Vite dev server):

```powershell
npm run dev:client
```

Start the backend (Express server) in a separate terminal:

```powershell
npm run dev
```

The frontend runs at `http://localhost:5000/` by default.

## Testing Translations (i18n)

- The translation dictionary lives in `client/src/lib/i18n.tsx`.
- To test translations in the running app:
  1. Open `http://localhost:5000/` in your browser.
  2. Use the language switcher in the navbar to switch between English (`en`), Kazakh (`kz`), and Russian (`ru`).
  3. Verify that all UI text (labels, buttons, headings) updates. University names intentionally remain untranslated.

If you find a hardcoded string, add a new key to `client/src/lib/i18n.tsx` and call `t('your.key')` from the component.

## AI Recommendations (optional)

- The AI suggestion component (`client/src/components/ai-suggestion.tsx`) lets users paste a Google Gemini API key and a short profile to get recommendations.
- The API key is entered on the client UI (no server-side key by default). Keep your key private — do not commit it to the repo.

## Troubleshooting

- Vite/Babel errors (e.g. "Identifier 'X' has already been declared"): check for duplicate imports in the affected file. Recent example: duplicate `useI18n` import in `ai-suggestion.tsx`.
- If the dev server fails to start on port `5000`, verify nothing else is using that port: `netstat -ano | findstr ":5000"`.
- If HMR shows stale errors, stop Node processes and restart:

```powershell
Get-Process node -ErrorAction SilentlyContinue | Stop-Process -Force
npm run dev:client
```

- Ensure you're in the project root `Uni-Info\Uni-Info` when running `npm` scripts.

## Contributing

1. Fork or branch from `main`.
2. Make changes in a feature branch.
3. Add tests if applicable.
4. Commit and push, then open a Pull Request.

## Scripts

- `npm run dev:client` — Start frontend dev server (Vite)
- `npm run dev` — Start backend server (Express)
- `npm run build` — Build production assets
- `npm start` — Start production server
- `npm run db:push` — Push Drizzle schema changes

## License

MIT

---

If you want, I can replace the repository `README.md` with this cleaned version and commit the change. Would you like me to do that now?
