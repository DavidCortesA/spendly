import type { ExpenseCategory } from "./expense";

export interface Budget {
  id: string;
  userId: string;
  category: ExpenseCategory;
  limit: number;
  spent: number;
  period: "monthly" | "weekly" | "yearly";
  startDate: string;
  endDate: string;
}

export interface BudgetProgress {
  budget: Budget;
  percentage: number;
  remaining: number;
  status: "safe" | "warning" | "exceeded";
}

export interface BudgetSummary {
  totalBudget: number;
  totalSpent: number;
  unused: number;
  used: number;
  reserved: number;
}
