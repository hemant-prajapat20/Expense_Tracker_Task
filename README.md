# Mini Expense Tracker

## Project Title & Brief Description

I chose the **Mini Expense Tracker** exercise to build a full-stack, responsive web application for managing personal finances. This project provides a comprehensive dashboard where users can seamlessly log, edit, and categorize their daily expenses. It features a local SQLite database for instant data persistence, real-time interactive chart visualisations, and bonus features like CSV data export and visual budget-limit warnings.

---

## Live Demo Links

- **Frontend (Vercel):** [https://expense-tracker-task-olive.vercel.app/](https://expense-tracker-task-olive.vercel.app/)
- **Backend API (Render):** [https://expense-tracker-task.onrender.com](https://expense-tracker-task.onrender.com)

---

## How We Met the Evaluation Criteria

### 1. Code Quality (25%)

- **TypeScript Type Safety:** Strict typing is enforced on both the React frontend and the Express backend to prevent runtime type errors.
- **Separation of Concerns:** The backend cleanly splits logic into config (database connection), controllers (business logic), models (direct SQL queries), and routes.
- **Modern React Hooks:** State management, pagination, and API fetching are cleanly written using hooks (`useState`, `useEffect`) and cleanly passed to child components.

### 2. Functionality (25%)

- **Complete CRUD Operations:** Full capability to create, read, update (edit), and delete expenses with real-time screen updates.
- **Real-time Charting:** The pie chart dynamically updates as expenses are added, edited, or deleted.

### 3. Full Stack Integration (20%)

- **Robust REST API:** Designed standard, semantic HTTP methods (`GET`, `POST`, `PUT`, `DELETE`).
- **Input Validation:** The backend validates fields before database writes (e.g., checking that the amount is a positive number and that dates are not set too far into the future).
- **SQLite Persistence:** Uses `better-sqlite3` to persist data on server-side disk rather than memory.

### 4. UI / UX (15%)

- **Modern Look & Feel:** Built with modern CSS colors, soft shadow boxes, clean typography, and subtle transitions.
- **Responsive Design:** Completely optimized for mobile and desktop viewports, with collapsible tables and dynamic sizing.
- **Budget Indicator:** Visually alerts users if their spending exceeds their budget limit.

### 5. Documentation, Git & Deployment (10% + 5% Bonus)

- **Detailed Docs:** Full API documentation including exact JSON request bodies and response shapes.
- **Clean Commits:** Clean Git commit logs showing logical progression.
- **Vercel & Render Integration:** Successfully deployed for immediate review.

---

## Tech Stack

- **Frontend Framework:** **React (with Vite)** for blazing fast hot-module-reloading and modern component architecture.
- **Language:** **TypeScript** across both frontend and backend to strictly enforce types and eliminate runtime bugs.
- **Styling:** **Tailwind CSS v4** to rapidly build a beautiful, responsive, and highly-polished UI without writing bloated CSS files.
- **Charts:** **Recharts** for lightweight, dynamic SVG-based pie charts.
- **Backend:** **Node.js & Express** for a robust and standard REST API implementation.
- **Database:** **SQLite (`better-sqlite3`)** because it provides an incredibly fast, synchronous, and zero-configuration local database that perfectly fits a lightweight expense tracker without the overhead of a heavy database cluster.

---

## How to Run Locally

Assuming you have Node.js installed on your machine.

### 1. Clone and Setup

```bash
# Navigate into the project directory
cd ExpenseTracker
```

### 2. Start the Backend

```bash
cd Backend
npm install
# Start the Express server on Port 5005
npm run dev
```

### 3. Start the Frontend

Open a new terminal window:

```bash
cd Frontend
npm install
# Start the React Vite server
npm run dev
```

### 4. View the App

Open your browser and navigate to the Local URL provided by Vite (usually `http://localhost:5173`).

---

## API Documentation

**Base URL:** `http://localhost:5005/api/expenses` or `https://expense-tracker-task.onrender.com/api/expenses`

### Endpoints

#### 1. Get All Expenses

- **Method:** `GET`
- **Path:** `/`
- **Query Parameters:** `category` (optional, filter), `startDate` (optional, YYYY-MM-DD), `endDate` (optional, YYYY-MM-DD)
- **Response Shape (200 OK):**

```json
[
  {
    "id": "a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d",
    "amount": 2500,
    "category": "Food",
    "date": "2026-06-04T12:00:00",
    "note": "Lunch at restaurant"
  }
]
```

#### 2. Get Expense Summary

- **Method:** `GET`
- **Path:** `/summary`
- **Response Shape (200 OK):**

```json
{
  "totalThisMonth": 2500,
  "highestExpense": 2500,
  "categoryTotals": {
    "Food": 2500
  }
}
```

#### 3. Create Expense

- **Method:** `POST`
- **Path:** `/`
- **Request Body:**

```json
{
  "amount": 1200,
  "category": "Transport",
  "date": "2026-06-04T10:15:00",
  "note": "Train ticket to city center"
}
```

- **Response Shape (201 Created):**

```json
{
  "id": "uuid-string-here",
  "amount": 1200,
  "category": "Transport",
  "date": "2026-06-04T10:15:00",
  "note": "Train ticket to city center"
}
```

#### 4. Update Expense

- **Method:** `PUT`
- **Path:** `/:id`
- **Request Body:**

```json
{
  "amount": 1500,
  "category": "Transport",
  "date": "2026-06-04T10:15:00",
  "note": "Train ticket (updated price)"
}
```

- **Response Shape (200 OK):**

```json
{
  "id": "uuid-string-here",
  "amount": 1500,
  "category": "Transport",
  "date": "2026-06-04T10:15:00",
  "note": "Train ticket (updated price)"
}
```

#### 5. Delete Expense

- **Method:** `DELETE`
- **Path:** `/:id`
- **Response Shape (200 OK):**

```json
{
  "success": true
}
```

---

## Project Structure

```text
ExpenseTracker/
│
├── Backend/                    # Node.js + Express API
│   ├── src/
│   │   ├── config/db.ts        # SQLite database initialization
│   │   ├── controllers/        # API business logic and validation
│   │   ├── models/Expense.ts   # Database SQL queries
│   │   ├── routes/             # Express API routing definitions
│   │   └── index.ts            # Server entry point
│   ├── tsconfig.json           # Compiler rules for TypeScript
│   └── package.json            
│
└── Frontend/                   # React + Vite Application
    ├── src/
    │   ├── components/         # Reusable UI components (Chart, Form, List, Summary)
    │   ├── types/              # Shared TypeScript interfaces
    │   ├── utils/api.ts        # Axios API client functions
    │   ├── App.tsx             # Main dashboard layout
    │   ├── index.css           # Tailwind CSS directives
    │   └── main.tsx            # React DOM rendering entry point
    └── package.json            
```

---

## Next Steps

**What I chose not to do:**

- I chose not to implement user authentication (Login/Signup) or multi-user accounts. For the scope of this exercise, a single-user local database was sufficient to demonstrate full CRUD functionality and data visualization without overcomplicating the architecture.

**What I would build next:**

- **Receipt Uploads:** Integrate an AWS S3 bucket to allow users to upload images of physical receipts alongside their expense logs.
- **Multi-Currency Support:** Add a dropdown to select different currencies and use a real-time exchange rate API to standardize the database amounts.
- **Dark Mode:** Implement a dark mode toggle to improve the UI accessibility and aesthetics for users in low-light environments.
