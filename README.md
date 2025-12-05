# Datahub V1 - University Information Platform

A full-stack web application for exploring, comparing, and managing university information. Built with modern web technologies including React, Express, TypeScript, and PostgreSQL.

## 🎯 Overview

Datahub V1 is a comprehensive university information portal that allows users to:
- Browse university information with detailed profiles
- Compare multiple universities side-by-side
- Save favorite universities
- Filter universities by various criteria
- Access university data in multiple languages (i18n support)

## ✨ Features

- **University Directory**: Browse a comprehensive list of universities with detailed information
- **University Profiles**: View detailed information for individual universities
- **Comparison Tool**: Compare multiple universities side-by-side
- **Favorites System**: Save and manage your favorite universities
- **Advanced Filtering**: Filter universities by various criteria using the sidebar
- **Multi-language Support**: i18n support for international users
- **Responsive Design**: Beautiful, responsive UI built with Radix UI components
- **Dark Mode Support**: Theme switching with next-themes
- **Real-time Updates**: WebSocket support for real-time data updates

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI framework
- **TypeScript** - Type-safe development
- **Vite** - Build tool and dev server
- **TailwindCSS** - Utility-first CSS framework
- **Radix UI** - Unstyled, accessible component library
- **React Query (TanStack)** - Server state management
- **Wouter** - Lightweight client-side routing
- **React Hook Form** - Form state management
- **Zod** - Schema validation
- **Framer Motion** - Animation library
- **Recharts** - Data visualization

### Backend
- **Express** - Node.js web framework
- **TypeScript** - Type-safe backend development
- **Drizzle ORM** - Type-safe SQL query builder
- **PostgreSQL** - Database
- **Passport.js** - Authentication
- **Express Session** - Session management
- **WebSocket (ws)** - Real-time communication

### Development Tools
- **tsx** - TypeScript execution
- **Drizzle Kit** - Database schema management
- **PostCSS** - CSS processing
- **ESBuild** - JavaScript bundler

## 📦 Project Structure

```
Uni-Info/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── lib/           # Utilities and contexts
│   │   ├── data/          # Data files
│   │   ├── App.tsx        # Main app component
│   │   └── main.tsx       # Entry point
│   ├── index.html         # HTML template
│   └── public/            # Static assets
├── server/                # Express backend
│   ├── index.ts           # Server entry point
│   ├── routes.ts          # API routes
│   ├── storage.ts         # Database operations
│   ├── static.ts          # Static file serving
│   └── vite.ts            # Vite integration
├── shared/                # Shared code
│   └── schema.ts          # Database schema
├── script/                # Build scripts
├── attached_assets/       # University data and assets
├── vite.config.ts         # Vite configuration
├── drizzle.config.ts      # Drizzle ORM configuration
└── tsconfig.json          # TypeScript configuration
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- PostgreSQL (for production)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Mehmetscolfield/Datahub-V1.git
   cd Datahub-V1
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```bash
   DATABASE_URL=postgresql://user:password@localhost:5432/uni_info
   NODE_ENV=development
   PORT=5000
   ```

4. **Set up the database**
   ```bash
   npm run db:push
   ```

### Development

1. **Start the development client server**
   ```bash
   npm run dev:client
   ```
   The client will be available at `http://localhost:5000/`

2. **In a separate terminal, start the backend server**
   ```bash
   npm run dev
   ```

### Production Build

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Start the production server**
   ```bash
   npm start
   ```
   The app will be available at `http://localhost:5000/`

## 📝 Available Scripts

- `npm run dev:client` - Start Vite dev server for frontend (port 5000)
- `npm run dev` - Start Express backend server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run check` - Run TypeScript type checking
- `npm run db:push` - Push database schema changes

## 🏗️ Architecture

### Frontend Architecture
- **Routing**: Client-side routing with Wouter
- **State Management**: React Context for global state (Favorites, Compare)
- **Server State**: React Query for API data
- **Forms**: React Hook Form with Zod validation
- **Styling**: TailwindCSS with component library

### Backend Architecture
- **API Routes**: RESTful endpoints under `/api`
- **Database**: Drizzle ORM for type-safe queries
- **Authentication**: Passport.js with local strategy
- **Session**: Express session with PostgreSQL store
- **Real-time**: WebSocket support via Express HTTP server

## 📄 Pages

- **Home** (`/`) - Landing page
- **Universities** (`/universities`) - Browse all universities
- **University Details** (`/university/:id`) - View specific university details
- **Compare** (`/compare`) - Compare multiple universities
- **Not Found** (`*`) - 404 page

## 🔐 Security

- TypeScript for type safety
- Zod for runtime validation
- Passport.js for authentication
- Express session for secure session management
- CORS configuration for cross-origin requests

## 🌍 Internationalization

The application includes i18n support for multiple languages. Configure language preferences in the I18n context.

## 🎨 UI Components

Built with Radix UI and custom components:
- Accordion
- Alert & Alert Dialog
- Avatar
- Badge
- Button & Button Group
- Card
- Carousel
- Checkbox
- Command
- Dialog & Drawer
- Dropdown Menu
- Form & Input
- Pagination
- Progress
- Radio Group
- Select
- Tabs
- Toast/Toaster
- And many more...

## 📊 Data

University data is stored in `attached_assets/` with JSON files containing information about various universities in Kazakhstan and other regions.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For support, please open an issue on the GitHub repository.

## 🔗 Links

- **Repository**: [https://github.com/Mehmetscolfield/Datahub-V1](https://github.com/Mehmetscolfield/Datahub-V1)
- **Live Demo**: Available when deployed

---

**Built with ❤️ using React, Express, and TypeScript**
