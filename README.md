# Mini Expense Tracker

## Project Title & Brief Description

I chose the **Mini Expense Tracker** exercise to build a full-stack, responsive web application for managing personal finances. This project provides a comprehensive dashboard where users can seamlessly log, edit, and categorize their daily expenses. It features a local SQLite database for instant data persistence, real-time interactive chart visualisations, and bonus features like CSV data export and visual budget-limit warnings.

## Live Demo Links

- **Deployed App:** *(N/A - This project was built to be run locally for the assessment. If deployed later, insert the Vercel/Render link here).*

## Tech Stack

- **Frontend Framework:** **React (with Vite)** for blazing fast hot-module-reloading and modern component architecture.
- **Language:** **TypeScript** across both frontend and backend to strictly enforce types and eliminate runtime bugs.
- **Styling:** **Tailwind CSS v4** to rapidly build a beautiful, responsive, and highly-polished UI without writing bloated CSS files.
- **Charts:** **Recharts** for lightweight, dynamic SVG-based pie charts.
- **Backend:** **Node.js & Express** for a robust and standard REST API implementation.
- **Database:** **SQLite (`better-sqlite3`)** because it provides an incredibly fast, synchronous, and zero-configuration local database that perfectly fits a lightweight expense tracker without the overhead of a heavy MongoDB cluster.

## How to Run Locally

*Assuming you have Node.js installed:*

1. **Clone and Setup**

   ```bash
   # Navigate into the project directory
   cd ExpenseTracker
   ```

2. **Start the Backend**

   ```bash
   cd Backend
   npm install
   # Start the Express server on Port 5005
   npm run dev
   ```

3. **Start the Frontend**

   *(Open a new terminal window)*

   ```bash
   cd Frontend
   npm install
   # Start the React Vite server
   npm run dev
   ```

4. **View the App**

   Open your browser and navigate to the Local URL provided by Vite (usually `http://localhost:5173`).

---

## API Documentation

**Base URL:** `http://localhost:5005/api/expenses`

| Method | Path | Request Body | Description |
| --- | --- | --- | --- |
| `GET` | `/` | *None* | Retrieves an array of all expenses. Supports query filters (`?category=Food`). |
| `GET` | `/summary` | *None* | Retrieves aggregated data (`totalThisMonth`, `highestExpense`, `categoryTotals`). |
| `POST` | `/` | `{ amount: number, category: string, date: string, note?: string }` | Creates a new expense in the database. Returns the created expense object. |
| `PUT` | `/:id` | `{ amount: number, category: string, date: string, note?: string }` | Updates an existing expense by ID. Returns the updated expense object. |
| `DELETE` | `/:id` | *None* | Deletes an expense by ID. Returns `{ success: true }`. |

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
│   ├── database.sqlite         # Automatically generated local database file
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
