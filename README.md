# Mini Expense Tracker

A full-stack, responsive web application for managing personal finances. Built with a React (Vite) frontend and an Express/SQLite backend.

## Features
- **Add Expenses:** Log your daily expenses with specific dates, categories, notes, and amounts. Timezone handling included.
- **Dashboard Summary:** View total monthly spend, your highest single expense, and a beautiful interactive breakdown chart.
- **Budget Alerts:** Visual warnings when your monthly spending exceeds your preset budget.
- **Filter & Search:** Filter your expense history by category.
- **Inline Editing & Deleting:** Instantly update or remove mistakes without leaving the page.
- **CSV Export:** Download your data instantly into a spreadsheet for external bookkeeping.
- **Fully Responsive:** Perfectly optimized for desktops, tablets, and mobile devices.

## Technology Stack
- **Frontend:** React, TypeScript, Vite, Tailwind CSS v4, Recharts
- **Backend:** Node.js, Express, TypeScript, `better-sqlite3` (SQLite)
- **Database:** SQLite (persisted locally via `database.sqlite`)

## Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm

### 1. Start the Backend
The backend runs on **Port 5005** to avoid Windows OS system port conflicts.
```bash
cd Backend
npm install
npm run dev
```

### 2. Start the Frontend
The frontend runs via Vite.
```bash
cd Frontend
npm install
npm run dev
```
Open your browser and navigate to `http://localhost:5173`.

## Architecture Details
- The database is initialized automatically upon starting the backend.
- The `better-sqlite3` driver was explicitly chosen as a reliable, synchronous local database that is perfect for a side-project without requiring a running MongoDB cluster.
- Strict Typescript is enforced across both Frontend and Backend, guaranteeing type safety.
