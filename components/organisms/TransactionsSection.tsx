"use client";

import * as React from "react";
import { Card } from "@/components/atoms/Card";
import { TransactionItem } from "@/components/molecules/TransactionItem";
import { ArrowUpRight, TrendingDown, TrendingUp } from "lucide-react";
import { useFinanceStore } from "@/store/useFinanceStore";
import { useDashboardStore } from "@/store/dashboard";
import { AddExpenseModal } from "@/components/organisms/AddExpenseModal";
import { AddIncomeModal } from "@/components/organisms/AddIncomeModal";
import type { Transaction } from "@/types/user";

function TransactionsSection() {
  const { expenses, income } = useFinanceStore();
  const activeFilter = useDashboardStore((s) => s.activeFilter);
  const [expenseOpen, setExpenseOpen] = React.useState(false);
  const [incomeOpen, setIncomeOpen] = React.useState(false);

  const transactions: Transaction[] = React.useMemo(() => {
    const expenseTransactions: Transaction[] = expenses.map((e) => ({
      id: e.id,
      userId: e.userId,
      userName: "Me",
      description: e.description,
      amount: e.amount,
      type: "debit" as const,
      category: e.category,
      paymentMethod: e.paymentMethod,
      date: new Date(e.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      createdAt: e.createdAt,
    }));

    const incomeTransactions: Transaction[] = income.map((i) => ({
      id: i.id,
      userId: i.userId,
      userName: "Me",
      description: i.description,
      amount: i.amount,
      type: "credit" as const,
      category: i.source,
      paymentMethod: "wire_transfer",
      date: new Date(i.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      createdAt: i.createdAt,
    }));

    const all = [...expenseTransactions, ...incomeTransactions].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    const filtered =
      activeFilter === "all"
        ? all
        : all.filter((tx) => tx.paymentMethod === activeFilter);

    return filtered.slice(0, 8);
  }, [expenses, income, activeFilter]);

  return (
    <>
      <Card className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold text-foreground">Transaction</h3>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setExpenseOpen(true)}
              title="Add Expense"
              className="flex size-9 items-center justify-center rounded-full bg-muted text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
            >
              <TrendingDown size={16} />
            </button>
            <button
              onClick={() => setIncomeOpen(true)}
              title="Add Income"
              className="flex size-9 items-center justify-center rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              <TrendingUp size={16} />
            </button>
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border border-border">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="py-3 pl-3 pr-2 w-10" />
                <th className="py-3 pr-4 text-left text-xs font-medium text-muted-foreground">Description</th>
                <th className="py-3 pr-4 text-left text-xs font-medium text-muted-foreground hidden sm:table-cell">Category</th>
                <th className="py-3 pr-4 text-left text-xs font-medium text-muted-foreground hidden md:table-cell">Date</th>
                <th className="py-3 pr-3 text-right text-xs font-medium text-muted-foreground">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {transactions.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-xs text-muted-foreground">
                    {activeFilter === "all"
                      ? "No transactions yet — add an expense or income above"
                      : `No transactions with payment method "${activeFilter.replace(/_/g, " ")}"`}
                  </td>
                </tr>
              ) : (
                transactions.map((tx) => (
                  <TransactionItem key={tx.id} transaction={tx} />
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      <AddExpenseModal open={expenseOpen} onClose={() => setExpenseOpen(false)} />
      <AddIncomeModal open={incomeOpen} onClose={() => setIncomeOpen(false)} />
    </>
  );
}

export { TransactionsSection };
