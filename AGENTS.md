<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Spendly — Agent Guide

## Stack at a glance
- **Next.js 16** (App Router, `app/` directory, no `pages/`)
- **React 19** — use `"use client"` on any component that uses hooks or browser APIs
- **TypeScript** — strict mode, path alias `@/` maps to project root
- **Tailwind CSS v4** — no `tailwind.config.js`; theme tokens live in `app/globals.css`
- **Zustand 5** — stores in `store/`; use `persist` for anything that must survive reload
- **next-themes** — `ThemeProvider` wraps the app in `app/layout.tsx`

## Architecture rules (do not break)

### Atomic Design
Components must live at the correct level — never skip layers:

| Level | Folder | Rule |
|---|---|---|
| Atom | `components/atoms/` | No state, no store imports, no side effects |
| Molecule | `components/molecules/` | May use store reads; no forms that mutate |
| Organism | `components/organisms/` | Can mutate store, open modals, use hooks |
| Template | `components/templates/` | Layout only — no business logic |
| Page | `app/**/page.tsx` | Thin wrappers; delegate to organisms |

### Stores
- `useFinanceStore` — single source of truth for expenses, income, budgets, categories
- `useNotificationStore` — notification list; use `pushNotification()` (non-React helper) to emit from other stores
- `useDashboardStore` — UI-only state (activeFilter, sidebarOpen); do **not** persist business data here
- Never import React in store files; Zustand state is plain JS

### Types
All domain types live in `types/`. Do not redefine them inline. Key types:
- `Expense`, `ExpenseCategory`, `PaymentMethod` → `types/expense.ts`
- `Income`, `IncomeSource` → `types/income.ts`
- `Budget` → `types/budget.ts`
- `Notification`, `NotificationType` → `types/notification.ts`
- `Category` → defined in `store/useFinanceStore.ts`

## Styling conventions
- Use `cn()` from `lib/utils` for conditional classNames
- Use CSS custom properties (`--primary`, `--background`, etc.) — never hardcode colors except chart palette
- Chart palette: `#C6FF00` (lime), `#7C3AED` (purple), `#3b82f6` (blue), `#f59e0b` (amber), `#10b981` (green)
- Border radius: `rounded-xl` for cards/inputs, `rounded-full` for buttons/avatars
- Do not add arbitrary `px-`/`py-` values — prefer spacing tokens already used in context

## Adding features — checklist
1. Read existing code in the affected area before writing anything
2. Check if a type already exists in `types/` before creating one
3. Add store actions to the correct store; emit a notification if the action is user-visible
4. Keep pages as thin shells — put logic in hooks (`hooks/`) or organisms
5. New modals → extend `Modal` atom, follow `AddExpenseModal` as template
6. New routes → add to `components/organisms/Sidebar.tsx` nav array

## Things to avoid
- Do not use `mockData` in new components — always read from the store
- Do not add `console.log` or debug statements
- Do not create `*.test.ts` files unless explicitly asked
- Do not install new dependencies without confirming with the user
- Do not use `any` — use `unknown` or proper types
- Do not add comments that just restate what the code does
