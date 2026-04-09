"use client";

import * as React from "react";
import { Card } from "@/components/atoms/Card";
import { TransactionItem } from "@/components/molecules/TransactionItem";
import { ArrowUpRight, DollarSign } from "lucide-react";
import { useFinanceStore } from "@/store/useFinanceStore";
import type { Transaction } from "@/types/user";

function TransactionsSection() {
  const { expenses, income } = useFinanceStore();

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

    return [...expenseTransactions, ...incomeTransactions]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 5);
  }, [expenses, income]);

  return (
    <Card className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-foreground">Transaction</h3>
        <div className="flex items-center gap-2">
          <button className="flex size-9 items-center justify-center rounded-full bg-muted text-muted-foreground hover:text-foreground transition-colors">
            <DollarSign size={16} />
          </button>
          <button className="flex size-9 items-center justify-center rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
            <ArrowUpRight size={16} />
          </button>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-border">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="py-3 pl-4 pr-4 text-left text-xs font-medium text-muted-foreground">User</th>
              <th className="py-3 pr-4 text-left text-xs font-medium text-muted-foreground">Description</th>
              <th className="py-3 pr-4 text-left text-xs font-medium text-muted-foreground">Created</th>
              <th className="py-3 pr-4 text-right text-xs font-medium text-muted-foreground">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/50">
            {transactions.map((tx) => (
              <TransactionItem key={tx.id} transaction={tx} />
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

export { TransactionsSection };
