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
- Comparison tool (compare up to 3 universities)
- Favorites management with localStorage persistence
- Advanced filtering and sorting
- Internationalization (i18n) — English, Kazakh, Russian
- Responsive UI built with TailwindCSS and Radix components
- 🆕 **AI Chat Widget** — Floating chat for personalized university recommendations
  - Admin-configured Google Gemini API (no user key entry)
  - Available on every page (floating button in bottom-left)
  - Natural chat interface with message history
  - Multi-language support (en/kz/ru)

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

## 🆕 AI Chat Widget Setup

The app includes a floating AI chat widget for personalized university recommendations:

1. **Get API Key:**
   - Visit https://makersuite.google.com/app/apikey
   - Create a free API key (no credit card required)

2. **Configure:**
   - Copy `.env.example` to `.env`
   - Add your API key: `VITE_GEMINI_API_KEY=your_key_here`

3. **Use:**
   - Start the dev server: `npm run dev:client`
   - Look for the sparkle icon (⨯) in bottom-left corner
   - Click it to open the chat
   - Type your profile: "I have 6.0 IELTS, 3.5 GPA, interested in Engineering"
   - AI suggests matching universities

**Full documentation:** See [AI_CHAT_DOCUMENTATION_INDEX.md](AI_CHAT_DOCUMENTATION_INDEX.md)

## Testing Translations (i18n)

- The translation dictionary lives in `client/src/lib/i18n.tsx`.
- To test translations in the running app:
  1. Open `http://localhost:5000/` in your browser.
  2. Use the language switcher in the navbar to switch between English (`en`), Kazakh (`kz`), and Russian (`ru`).
  3. Verify that all UI text (labels, buttons, headings) updates. University names intentionally remain untranslated.
  4. The AI Chat Widget also updates based on language selection.

If you find a hardcoded string, add a new key to `client/src/lib/i18n.tsx` and call `t('your.key')` from the component.

## Troubleshooting

- **Chat widget not visible:** Restart dev server after adding `.env` file
- **API error in chat:** Check that `VITE_GEMINI_API_KEY` is set correctly in `.env`
- Vite/Babel errors (e.g. "Identifier 'X' has already been declared"): check for duplicate imports in the affected file.
- If the dev server fails to start on port `5000`, verify nothing else is using that port: `netstat -ano | findstr ":5000"`.
- If HMR shows stale errors, stop Node processes and restart:

```powershell
Get-Process node -ErrorAction SilentlyContinue | Stop-Process -Force
npm run dev:client
```

- Ensure you're in the project root `Uni-Info\Uni-Info` when running `npm` scripts.

## Documentation

- [AI Chat Widget - Quick Start](QUICK_START_AI_CHAT.md)
- [AI Chat Widget - Full Setup Guide](AI_CHAT_SETUP.md)  
- [AI Chat Widget - Implementation Details](AI_CHAT_IMPLEMENTATION.md)
- [AI Chat Widget - Visual Guide](AI_CHAT_VISUAL_GUIDE.md)
- [AI Chat Widget - Testing Checklist](AI_CHAT_VERIFICATION_CHECKLIST.md)
- [AI Chat Widget - Documentation Index](AI_CHAT_DOCUMENTATION_INDEX.md)

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
