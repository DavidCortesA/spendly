"use client";

import { useMemo } from "react";
import { useFinanceStore } from "@/store/useFinanceStore";
import type { ExpenseCategory } from "@/types/expense";
import type { IncomeSource } from "@/types/income";

export function useFinance() {
  const { expenses, income, budgets } = useFinanceStore();

  const getTotalIncome = useMemo(() => {
    return income.reduce((sum, item) => sum + item.amount, 0);
  }, [income]);

  const getTotalExpenses = useMemo(() => {
    return expenses.reduce((sum, item) => sum + item.amount, 0);
  }, [expenses]);

  const getBalance = useMemo(() => {
    return getTotalIncome - getTotalExpenses;
  }, [getTotalIncome, getTotalExpenses]);

  const getMonthlyExpenses = useMemo(() => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    return expenses
      .filter((e) => {
        const d = new Date(e.date);
        return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
      })
      .reduce((sum, e) => sum + e.amount, 0);
  }, [expenses]);

  const getMonthlyData = useMemo(() => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return months.map((month, index) => {
      const monthExpenses = expenses
        .filter((e) => new Date(e.date).getMonth() === index)
        .reduce((sum, e) => sum + e.amount, 0);
      const monthIncome = income
        .filter((i) => new Date(i.date).getMonth() === index)
        .reduce((sum, i) => sum + i.amount, 0);
      return { month, expenses: monthExpenses, income: monthIncome };
    });
  }, [expenses, income]);

  const getExpensesByCategory = useMemo(() => {
    const totals: Partial<Record<ExpenseCategory, number>> = {};
    for (const e of expenses) {
      totals[e.category] = (totals[e.category] ?? 0) + e.amount;
    }
    const total = Object.values(totals).reduce((sum, v) => sum + (v ?? 0), 0);
    return Object.entries(totals).map(([category, amount]) => ({
      category: category as ExpenseCategory,
      total: amount ?? 0,
      percentage: total > 0 ? ((amount ?? 0) / total) * 100 : 0,
    }));
  }, [expenses]);

  const getIncomeBySource = useMemo(() => {
    const totals: Partial<Record<IncomeSource, number>> = {};
    for (const i of income) {
      totals[i.source] = (totals[i.source] ?? 0) + i.amount;
    }
    const total = Object.values(totals).reduce((sum, v) => sum + (v ?? 0), 0);
    return Object.entries(totals).map(([source, amount]) => ({
      source: source as IncomeSource,
      total: amount ?? 0,
      percentage: total > 0 ? ((amount ?? 0) / total) * 100 : 0,
    }));
  }, [income]);

  const getBudgetSummary = useMemo(() => {
    const totalBudget = budgets.reduce((sum, b) => sum + b.limit, 0);
    const totalSpent = budgets.reduce((sum, b) => sum + b.spent, 0);
    const remaining = totalBudget - totalSpent;
    return {
      totalBudget,
      totalSpent,
      remaining,
      usedPercent: totalBudget > 0 ? (totalSpent / totalBudget) * 100 : 0,
      unusedPercent: totalBudget > 0 ? (remaining / totalBudget) * 100 : 0,
    };
  }, [budgets]);

  return {
    totalIncome: getTotalIncome,
    totalExpenses: getTotalExpenses,
    balance: getBalance,
    monthlyExpenses: getMonthlyExpenses,
    monthlyData: getMonthlyData,
    expensesByCategory: getExpensesByCategory,
    incomeBySource: getIncomeBySource,
    budgetSummary: getBudgetSummary,
  };
}
