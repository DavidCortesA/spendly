"use client";

import * as React from "react";
import { Card } from "@/components/atoms/Card";
import { ChartHeader } from "@/components/molecules/ChartHeader";
import { BudgetProgress } from "@/components/molecules/BudgetProgress";
import { formatCurrency } from "@/lib/format";
import { useFinance } from "@/hooks/useFinance";

function BudgetSection() {
  const { budgetSummary } = useFinance();

  const segments = [
    {
      label: "Unused",
      percentage: Math.round(budgetSummary.unusedPercent),
      color: "#3b82f6",
    },
    {
      label: "Used",
      percentage: Math.round(budgetSummary.usedPercent),
      color: "#7C3AED",
    },
    {
      label: "Reserved",
      percentage: Math.max(0, 100 - Math.round(budgetSummary.unusedPercent) - Math.round(budgetSummary.usedPercent)),
      color: "#f1f5f9",
    },
  ];

  return (
    <Card className="flex flex-col gap-4">
      <ChartHeader
        title="Budget usage"
        value={formatCurrency(budgetSummary.totalBudget)}
      />
      <BudgetProgress segments={segments} />
    </Card>
  );
}

export { BudgetSection };
