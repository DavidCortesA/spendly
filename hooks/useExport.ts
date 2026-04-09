"use client";

import { useFinanceStore } from "@/store/useFinanceStore";

function rowsToCsv(rows: Record<string, unknown>[]): string {
  if (rows.length === 0) return "";
  const headers = Object.keys(rows[0]);
  const lines = [
    headers.join(","),
    ...rows.map((row) =>
      headers
        .map((h) => {
          const val = String(row[h] ?? "");
          return val.includes(",") ? `"${val}"` : val;
        })
        .join(",")
    ),
  ];
  return lines.join("\n");
}

function downloadCsv(filename: string, content: string) {
  const blob = new Blob([content], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function useExport() {
  const { expenses, income, budgets } = useFinanceStore();

  function exportExpenses() {
    const rows = expenses.map((e) => ({
      id: e.id,
      description: e.description,
      amount: e.amount,
      category: e.category,
      paymentMethod: e.paymentMethod,
      date: e.date,
    }));
    downloadCsv("spendly-expenses.csv", rowsToCsv(rows));
  }

  function exportIncome() {
    const rows = income.map((i) => ({
      id: i.id,
      source: i.source,
      description: i.description,
      amount: i.amount,
      date: i.date,
      recurring: i.recurring,
    }));
    downloadCsv("spendly-income.csv", rowsToCsv(rows));
  }

  function exportAll() {
    const expenseRows = expenses.map((e) => ({
      type: "expense",
      id: e.id,
      description: e.description,
      amount: e.amount,
      category: e.category,
      date: e.date,
    }));
    const incomeRows = income.map((i) => ({
      type: "income",
      id: i.id,
      description: i.description,
      amount: i.amount,
      category: i.source,
      date: i.date,
    }));
    downloadCsv("spendly-all.csv", rowsToCsv([...expenseRows, ...incomeRows]));
  }

  return { exportExpenses, exportIncome, exportAll };
}
