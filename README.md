🌐 Datahub V1 — University Information Platform

A modern full-stack application for exploring, comparing, and managing university information across Kazakhstan.

Datahub V1 delivers a clean, fast, and interactive experience for students, parents, and researchers looking to explore universities, compare programs, save favorites, and switch languages effortlessly.
Built with React 19, Express, TypeScript, Drizzle ORM, and Vite, the platform is designed for scalability, extensibility, and high performance.

🚀 Features
🏫 University Directory

Browse universities with images, metadata, tuition, and program information

View complete profiles: admissions, programs, stats, cooperation partners, etc.

⚖️ Comparison Tool

Compare universities side-by-side

Tuition, rankings, language requirements, UNT/IELTS, programs

⭐ Favorites System

Save universities to a personal “favorites” list (local storage)

🔍 Advanced Filtering & Sorting

Filter universities by:

Region / City

Tuition range

Language of instruction

Program tags (IT, Business, Medicine, Engineering, etc.)

Requirements (UNT, IELTS)

Sort by tuition, ranking, or alphabetical order

🌍 Internationalization (i18n)

Full UI support for:

English (en)

Kazakh (kz)

Russian (ru)

🤖 Optional AI Recommendations

Users can input their own Gemini API key client-side

AI suggests relevant universities based on profile input

No server-side storage of keys (secure & privacy-friendly)

📱 Responsive UI

Built with TailwindCSS + Radix UI components

Mobile-first responsive layout

🧰 Tech Stack
Frontend

React 19

TypeScript

Vite

TailwindCSS

Radix UI

Backend

Express.js

TypeScript

Drizzle ORM

PostgreSQL

Dev Tools

tsx

PostCSS

ESLint

npm scripts

📁 Project Structure
client/               → React frontend (Vite)
server/               → Express backend (TypeScript)
attached_assets/      → University JSON files + images/videos

⚙️ Getting Started
1️⃣ Prerequisites

Node.js 18+

npm

PostgreSQL (if using the DB features)

2️⃣ Clone the Repository
git clone https://github.com/Mehmetscolfield/Datahub-V1.git
cd Datahub-V1

3️⃣ Install Dependencies
npm install

4️⃣ Environment Setup

Create a .env file in the project root:

DATABASE_URL=postgresql://user:password@localhost:5432/uni_info
NODE_ENV=development
PORT=5000

5️⃣ Initialize Database (Optional)
npm run db:push

6️⃣ Start Development
Frontend:
npm run dev:client

Backend (separate terminal):
npm run dev


Frontend runs at:

http://localhost:5000

🌍 Testing Translations (i18n)

Translation dictionary is at:

client/src/lib/i18n.tsx


To test:

Run the app

Open the language switcher

Toggle EN / KZ / RU

Ensure UI elements translate correctly

University names remain unchanged intentionally

If you see a hardcoded string:

Add translation key to i18n.tsx

Replace text with t('your.key')

🤖 AI Recommendation System (Optional)

Located at:

client/src/components/ai-suggestion.tsx


Users can:

Paste a Google Gemini API key

Enter preferences

Receive personalized university suggestions

⚠️ The key is never saved; stays in the browser only.

🐛 Troubleshooting
❗ Duplicate import errors

Example:

"Identifier 'useI18n' has already been declared"


→ Remove one of the duplicate imports.

❗ Port 5000 already in use

Check:

netstat -ano | findstr ":5000"

❗ Stale HMR errors

Restart all Node processes:

Get-Process node -ErrorAction SilentlyContinue | Stop-Process -Force
npm run dev:client

❗ Wrong folder

Always run commands inside:

Datahub-V1/

🧪 Scripts
Command	Description
npm run dev:client	Start frontend
npm run dev	Start backend
npm run build	Build production assets
npm start	Start production server
npm run db:push	Apply Drizzle schema
