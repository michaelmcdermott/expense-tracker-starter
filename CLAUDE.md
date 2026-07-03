# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Starter project for a Claude Code course (codewithmosh.com). A small React + Vite expense/finance tracker. Per the README, it **intentionally** has a bug, poor UI, and messy code, meant to be fixed progressively during the course — don't assume messiness or the bug are accidental unless asked to address them.

## Commands

```bash
npm install       # install dependencies
npm run dev       # start Vite dev server at http://localhost:5173
npm run build     # production build
npm run preview   # preview the production build
npm run lint      # run ESLint over the project
```

There is no test suite configured in this project.

## Architecture

This is an unusually small, single-file app — there is no component split, no routing, and no state management library.

- `src/main.jsx` — entry point, mounts `<App />` into `#root` inside `StrictMode`.
- `src/App.jsx` — the entire application: transaction state, the add-transaction form, filters, and the summary/table UI all live in one component function. Transactions are kept in local `useState` only (no persistence — a page reload resets to the hardcoded seed data).
- `src/App.css` / `src/index.css` — plain CSS, no CSS-in-JS or utility framework.
- Transaction shape: `{ id, description, amount, type: "income"|"expense", category, date }`. `amount` is stored as a **string** (from form input), which is the source of the intentional bug: `totalIncome`/`totalExpenses` are computed via `reduce((sum, t) => sum + t.amount, 0)` without numeric coercion, so amounts concatenate as strings instead of summing.
- `categories` is a fixed local array (`food, housing, utilities, transport, entertainment, salary, other`); there's no separate category/type model, income vs. expense is just the `type` field.
