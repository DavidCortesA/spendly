"use client";

import * as React from "react";
import { DashboardLayout } from "@/components/templates/DashboardLayout";
import { Card } from "@/components/atoms/Card";
import { AddExpenseModal } from "@/components/organisms/AddExpenseModal";
import { useFinanceStore } from "@/store/useFinanceStore";
import { useFinance } from "@/hooks/useFinance";
import { formatCurrency } from "@/lib/format";
import { EXPENSE_CATEGORIES } from "@/constants";
import { Plus, Trash2 } from "lucide-react";

function getCategoryMeta(cat: string) {
  return EXPENSE_CATEGORIES.find((c) => c.value === cat) ?? { label: cat, color: "#94a3b8" };
}

export default function ExpensesPage() {
  const { expenses, removeExpense } = useFinanceStore();
  const { totalExpenses, monthlyExpenses } = useFinance();
  const [open, setOpen] = React.useState(false);

  const sorted = [...expenses].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <DashboardLayout title="Expenses">
      <div className="flex flex-col gap-5">
        {/* Summary cards */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="flex flex-col gap-1">
            <p className="text-xs text-muted-foreground">Total Expenses</p>
            <p className="text-xl font-bold text-foreground">{formatCurrency(totalExpenses)}</p>
          </Card>
          <Card className="flex flex-col gap-1">
            <p className="text-xs text-muted-foreground">This Month</p>
            <p className="text-xl font-bold text-foreground">{formatCurrency(monthlyExpenses)}</p>
          </Card>
          <Card className="flex flex-col gap-1">
            <p className="text-xs text-muted-foreground">Records</p>
            <p className="text-xl font-bold text-foreground">{expenses.length}</p>
          </Card>
        </div>

        {/* Table */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-foreground">All Expenses</h3>
            <button
              onClick={() => setOpen(true)}
              className="flex items-center gap-1.5 rounded-xl bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              <Plus size={13} />
              Add Expense
            </button>
          </div>

          {sorted.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border py-12 text-center">
              <p className="text-sm font-medium text-muted-foreground">No expenses yet</p>
              <p className="mt-1 text-xs text-muted-foreground/60">Click "Add Expense" to record your first one</p>
            </div>
          ) : (
            <div className="overflow-hidden rounded-xl border border-border">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/50">
                    <th className="py-2.5 pl-4 text-left text-xs font-medium text-muted-foreground">Description</th>
                    <th className="py-2.5 px-4 text-left text-xs font-medium text-muted-foreground">Category</th>
                    <th className="py-2.5 px-4 text-left text-xs font-medium text-muted-foreground">Method</th>
                    <th className="py-2.5 px-4 text-left text-xs font-medium text-muted-foreground">Date</th>
                    <th className="py-2.5 pr-4 text-right text-xs font-medium text-muted-foreground">Amount</th>
                    <th className="py-2.5 pr-4 text-right text-xs font-medium text-muted-foreground" />
                  </tr>
                </thead>
                <tbody>
                  {sorted.map((expense) => {
                    const meta = getCategoryMeta(expense.category);
                    return (
                      <tr
                        key={expense.id}
                        className="border-b border-border/50 last:border-0 hover:bg-muted/30 transition-colors group"
                      >
                        <td className="py-3 pl-4 text-sm text-foreground">{expense.description}</td>
                        <td className="py-3 px-4">
                          <span
                            className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium"
                            style={{
                              backgroundColor: `${meta.color}20`,
                              color: meta.color,
                            }}
                          >
                            {meta.label}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-xs text-muted-foreground capitalize">
                          {expense.paymentMethod.replace(/_/g, " ")}
                        </td>
                        <td className="py-3 px-4 text-xs text-muted-foreground">
                          {new Date(expense.date).toLocaleDateString("en-US", {
                            month: "short", day: "numeric", year: "numeric",
                          })}
                        </td>
                        <td className="py-3 pr-4 text-right text-sm font-semibold text-foreground">
                          {formatCurrency(expense.amount)}
                        </td>
                        <td className="py-3 pr-3 text-right">
                          <button
                            onClick={() => removeExpense(expense.id)}
                            className="invisible group-hover:visible flex size-7 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                          >
                            <Trash2 size={13} />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </div>

      <AddExpenseModal open={open} onClose={() => setOpen(false)} />
    </DashboardLayout>
  );
}
