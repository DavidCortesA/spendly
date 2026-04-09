"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Expense, ExpenseCategory } from "@/types/expense";
import type { Income } from "@/types/income";
import type { Budget } from "@/types/budget";
import { mockExpenses, mockIncome, mockBudgets } from "@/lib/mock-data";
import { pushNotification } from "@/store/useNotificationStore";

export interface Category {
  id: string;
  name: string;
  color: string;
  icon: string;
}

interface FinanceState {
  expenses: Expense[];
  income: Income[];
  categories: Category[];
  budgets: Budget[];

  // Expense actions
  addExpense: (expense: Omit<Expense, "id" | "createdAt">) => void;
  removeExpense: (id: string) => void;
  updateExpense: (id: string, updates: Partial<Expense>) => void;

  // Income actions
  addIncome: (income: Omit<Income, "id" | "createdAt">) => void;
  removeIncome: (id: string) => void;

  // Category actions
  addCategory: (category: Omit<Category, "id">) => void;
  removeCategory: (id: string) => void;

  // Budget actions
  addBudget: (budget: Omit<Budget, "id">) => void;
  updateBudget: (id: string, updates: Partial<Budget>) => void;

  // Utility
  resetData: () => void;
}

const DEFAULT_CATEGORIES: Category[] = [
  { id: "cat-rent", name: "Rent", color: "#C6FF00", icon: "home" },
  { id: "cat-groceries", name: "Groceries", color: "#f59e0b", icon: "shopping-cart" },
  { id: "cat-debt", name: "Debt", color: "#3b82f6", icon: "credit-card" },
  { id: "cat-subscriptions", name: "Subscriptions", color: "#7C3AED", icon: "repeat" },
  { id: "cat-savings", name: "Savings", color: "#10b981", icon: "piggy-bank" },
  { id: "cat-transport", name: "Transport", color: "#f97316", icon: "car" },
  { id: "cat-entertainment", name: "Entertainment", color: "#ec4899", icon: "film" },
  { id: "cat-health", name: "Health", color: "#06b6d4", icon: "heart" },
  { id: "cat-education", name: "Education", color: "#8b5cf6", icon: "book" },
  { id: "cat-other", name: "Other", color: "#94a3b8", icon: "more-horizontal" },
];

function generateId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

export const useFinanceStore = create<FinanceState>()(
  persist(
    (set) => ({
      expenses: mockExpenses,
      income: mockIncome,
      categories: DEFAULT_CATEGORIES,
      budgets: mockBudgets,

      addExpense: (expense) => {
        set((state) => ({
          expenses: [
            ...state.expenses,
            {
              ...expense,
              id: generateId("e"),
              createdAt: new Date().toISOString(),
            },
          ],
        }));
        pushNotification({
          title: "Expense recorded",
          message: `${expense.description} — $${expense.amount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} added to ${expense.category}.`,
          type: "info",
        });
      },

      removeExpense: (id) =>
        set((state) => ({
          expenses: state.expenses.filter((e) => e.id !== id),
        })),

      updateExpense: (id, updates) =>
        set((state) => ({
          expenses: state.expenses.map((e) =>
            e.id === id ? { ...e, ...updates } : e
          ),
        })),

      addIncome: (income) => {
        set((state) => ({
          income: [
            ...state.income,
            {
              ...income,
              id: generateId("i"),
              createdAt: new Date().toISOString(),
            },
          ],
        }));
        pushNotification({
          title: "Income recorded",
          message: `${income.description} — $${income.amount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} from ${income.source}.`,
          type: "success",
        });
      },

      removeIncome: (id) =>
        set((state) => ({
          income: state.income.filter((i) => i.id !== id),
        })),

      addCategory: (category) =>
        set((state) => ({
          categories: [
            ...state.categories,
            { ...category, id: generateId("cat") },
          ],
        })),

      removeCategory: (id) =>
        set((state) => ({
          categories: state.categories.filter((c) => c.id !== id),
        })),

      addBudget: (budget) =>
        set((state) => ({
          budgets: [
            ...state.budgets,
            { ...budget, id: generateId("b") },
          ],
        })),

      updateBudget: (id, updates) =>
        set((state) => ({
          budgets: state.budgets.map((b) =>
            b.id === id ? { ...b, ...updates } : b
          ),
        })),

      resetData: () =>
        set({
          expenses: mockExpenses,
          income: mockIncome,
          categories: DEFAULT_CATEGORIES,
          budgets: mockBudgets,
        }),
    }),
    {
      name: "spendly-storage",
    }
  )
);
