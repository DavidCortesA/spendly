"use client";

import * as React from "react";
import { StatCard } from "@/components/molecules/StatCard";
import { formatCurrency } from "@/lib/format";
import { Button } from "@/components/atoms/Button";
import { Settings2 } from "lucide-react";
import { useFinance } from "@/hooks/useFinance";

function StatsSection() {
  const { totalIncome, totalExpenses, balance } = useFinance();

  const savingsRate =
    totalIncome > 0 ? Math.round((balance / totalIncome) * 100) : 0;
  const expenseTrend =
    totalIncome > 0 ? -Math.round((totalExpenses / totalIncome) * 100) : 0;

  return (
    <div className="flex items-stretch gap-4">
      <StatCard
        label="Total Revenue"
        value={formatCurrency(totalIncome)}
        trend={savingsRate}
        className="flex-1"
      />
      <StatCard
        label="Total Saving"
        value={formatCurrency(balance)}
        trend={savingsRate}
        className="flex-1"
      />
      <StatCard
        label="Monthly Expense"
        value={formatCurrency(totalExpenses)}
        trend={expenseTrend}
        className="flex-1"
      />
      <div className="flex items-center">
        <Button variant="outline" className="gap-2 h-10 rounded-xl border-border px-4">
          <Settings2 size={14} />
          <span className="text-sm">Manage Balance</span>
        </Button>
      </div>
    </div>
  );
}

export { StatsSection };
