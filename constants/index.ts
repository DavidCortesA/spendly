import type { ExpenseCategory, PaymentMethod } from "@/types/expense";
import type { IncomeSource } from "@/types/income";

export const PAYMENT_METHODS: { value: PaymentMethod; label: string }[] = [
  { value: "cash", label: "Cash" },
  { value: "check", label: "Check" },
  { value: "wire_transfer", label: "Wire Transfer" },
  { value: "mobile_payment", label: "Mobile Payment" },
  { value: "cryptocurrency", label: "Cryptocurrency" },
  { value: "gift_card", label: "Gift Card" },
];

export const EXPENSE_CATEGORIES: { value: ExpenseCategory; label: string; color: string }[] = [
  { value: "rent", label: "Rent & Utilities", color: "#C6FF00" },
  { value: "groceries", label: "Groceries", color: "#f59e0b" },
  { value: "debt", label: "Debt Repayment", color: "#3b82f6" },
  { value: "subscriptions", label: "Subscriptions", color: "#7C3AED" },
  { value: "savings", label: "Savings Account", color: "#10b981" },
  { value: "transport", label: "Transport", color: "#f97316" },
  { value: "entertainment", label: "Entertainment", color: "#ec4899" },
  { value: "health", label: "Health", color: "#06b6d4" },
  { value: "education", label: "Education", color: "#8b5cf6" },
  { value: "other", label: "Other", color: "#94a3b8" },
];

export const INCOME_SOURCES: { value: IncomeSource; label: string; icon: string }[] = [
  { value: "salary", label: "Salary", icon: "briefcase" },
  { value: "freelance", label: "Freelance", icon: "laptop" },
  { value: "investment", label: "Investment", icon: "trending-up" },
  { value: "rental", label: "Rental", icon: "home" },
  { value: "business", label: "Business", icon: "building-2" },
  { value: "other", label: "Other", icon: "circle-dot" },
];

export const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard", icon: "layout-dashboard" },
  { href: "/wallet", label: "My Wallet", icon: "wallet" },
  { href: "/expenses", label: "Transfer", icon: "arrow-left-right" },
  { href: "/income", label: "Transactions", icon: "clock" },
  { href: "/budgets", label: "Payment", icon: "credit-card" },
  { href: "/categories", label: "Exchange", icon: "repeat-2" },
  { href: "/settings", label: "Settings", icon: "settings" },
] as const;

export const CURRENCY_SYMBOL = "$";
