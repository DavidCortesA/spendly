# Spendly — Financial Control Dashboard

A modern personal finance dashboard built with Next.js 16, React 19, TypeScript, Tailwind CSS v4, and Zustand.

## Features

- **Dashboard** — live stats (total income, savings, expenses), budget usage, income breakdown, and recent transactions
- **Expenses** — full CRUD table with category badges and payment method filters
- **Income** — income records with source breakdown, recurring flag, and revenue trend chart
- **Budgets** — visual progress bars per category with usage percentages
- **Dark / Light mode** — system-aware toggle via `next-themes`, accessible from header and sidebar
- **Notifications** — real-time panel with auto-notifications on every add action, mark-as-read, dismiss, and clear-all
- **Filter chips** — filter transactions by payment method (cash, wire transfer, crypto, etc.)
- **Export CSV** — download expenses, income, or all data as `.csv`
- **Reset data** — restore defaults from Settings → Danger Zone
- **localStorage persistence** — all data survives page reloads via Zustand `persist` middleware

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16.2 (App Router) |
| UI Library | React 19 |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4 + shadcn/ui tokens |
| State | Zustand 5 + `persist` middleware |
| Theme | next-themes |
| Icons | Lucide React |
| Architecture | Atomic Design (atoms → molecules → organisms → templates) |

## Project Structure

```
app/                  # Next.js App Router pages
  dashboard/          # Main dashboard
  expenses/           # Expense management
  income/             # Income management
  budgets/            # Budget tracking
  categories/         # Category breakdown
  wallet/             # Wallet overview
  settings/           # Preferences, export, reset

components/
  atoms/              # Base: Card, Modal, Badge, Avatar, Typography…
  molecules/          # Composite: StatCard, NotificationPanel, ThemeToggle, FilterTabs…
  organisms/          # Sections: Header, Sidebar, TransactionsSection, AddExpenseModal…
  templates/          # Layouts: DashboardLayout, AuthLayout
  charts/             # SVG/canvas charts: RevenueChart, IncomeChart, BudgetChart

store/
  useFinanceStore.ts  # expenses, income, categories, budgets (persisted)
  useNotificationStore.ts # notifications (persisted)
  dashboard.ts        # UI state: activeFilter, sidebarOpen

hooks/
  useFinance.ts       # Derived calculations: totals, balance, monthly data
  useExport.ts        # CSV export helpers

types/                # TypeScript interfaces: Expense, Income, Budget, Notification…
constants/            # EXPENSE_CATEGORIES, INCOME_SOURCES, PAYMENT_METHODS
lib/
  format.ts           # formatCurrency, formatCompact, formatPercent
  mock-data.ts        # Seed data (loaded on first visit)
```

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The app redirects to `/dashboard` by default.

## Key Interactions

| Action | Where |
|---|---|
| Add expense | Expenses page → `+ Add Expense`, or Dashboard → `TrendingDown` button |
| Add income | Income page → `+ Add Income`, or Dashboard → `TrendingUp` button |
| Filter transactions | Dashboard filter chips (All / Cash / Wire Transfer / …) |
| Toggle dark mode | Header or Sidebar toggle, or Settings → Preferences |
| View notifications | Header → Bell icon → dropdown panel |
| Export data | Settings → Export Data |
| Reset to defaults | Settings → Danger Zone → Reset all data |

## LocalStorage Keys

| Key | Contents |
|---|---|
| `spendly-storage` | expenses, income, categories, budgets |
| `spendly-notifications` | notification list with read state |
