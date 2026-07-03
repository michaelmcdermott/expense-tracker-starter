# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Starter project for a Claude Code course (codewithmosh.com). A small React + Vite expense/finance tracker. Per the README, it **originally** had an intentional bug, poor UI, and messy code, meant to be fixed progressively during the course. The string/number totals bug and the single-file `App.jsx` have since been addressed (see Architecture below) — don't assume remaining rough edges (e.g. plain unstyled UI) are accidental unless asked to address them.

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

Small React app, no routing, no state management library, no persistence (transactions live in `useState` only — a page reload resets to the hardcoded seed data).

- `src/main.jsx` — entry point, mounts `<App />` into `#root` inside `StrictMode`.
- `src/App.jsx` — owns the `transactions` state (seed data + `handleAddTransaction`) and the shared `categories` array, and composes the three components below. Does not compute totals or filtering itself.
- `src/Summary.jsx` — takes `transactions` as a prop and computes `totalIncome`/`totalExpenses`/`balance` internally.
- `src/TransactionForm.jsx` — takes `categories` and `onAddTransaction` as props; owns its own form field state (description/amount/type/category) and calls `onAddTransaction` with a fully-formed transaction on submit.
- `src/TransactionList.jsx` — takes `transactions` and `categories` as props; owns its own `filterType`/`filterCategory` state and derives `filteredTransactions` internally.
- `src/App.css` / `src/index.css` — plain CSS, no CSS-in-JS or utility framework.
- Transaction shape: `{ id, description, amount, type: "income"|"expense", category, date }`. `amount` is stored as a **number** — both the seed data and `TransactionForm`'s submit handler (`Number(amount)`) enforce this, since summing string amounts was the project's original intentional bug (now fixed).
- `categories` is a fixed array (`food, housing, utilities, transport, entertainment, salary, other`) owned by `App.jsx` and passed down; there's no separate category/type model, income vs. expense is just the `type` field.
