import * as React from "react";
import { mockBudgets } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/format";

const colors = ["#C6FF00", "#f59e0b", "#3b82f6", "#7C3AED", "#10b981"];
const labels = ["Rent & Utilities", "Groceries", "Debt Repayment", "Subscriptions", "Savings"];

function BudgetChart() {
  return (
    <div className="flex flex-col gap-3">
      {mockBudgets.map((budget, i) => {
        const pct = Math.min((budget.spent / budget.limit) * 100, 100);
        return (
          <div key={budget.id} className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">{labels[i]}</span>
              <span className="text-xs font-medium text-foreground">
                {formatCurrency(budget.spent)} / {formatCurrency(budget.limit)}
              </span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full transition-all"
                style={{ width: `${pct}%`, backgroundColor: colors[i] }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export { BudgetChart };
