import * as React from "react";
import { expenseChartData } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/format";

function ExpensesBanner() {
  const maxAmount = Math.max(...expenseChartData.map((d) => d.amount));

  return (
    <div className="flex gap-4 overflow-x-auto pb-2">
      {expenseChartData.map((item) => {
        const barHeight = (item.amount / maxAmount) * 60;
        return (
          <div key={item.category} className="flex min-w-[180px] flex-col gap-2">
            <p className="text-xs text-muted-foreground">{item.category}</p>
            <p className="text-base font-semibold text-foreground">
              {formatCurrency(item.amount)}
            </p>
            {/* Mini bar chart */}
            <div className="flex items-end gap-px h-16">
              {Array.from({ length: 20 }).map((_, i) => {
                const filled = i < Math.floor((item.amount / maxAmount) * 20);
                return (
                  <div
                    key={i}
                    className="w-1.5 rounded-sm transition-all"
                    style={{
                      height: `${20 + Math.random() * barHeight}px`,
                      backgroundColor: filled ? item.color : "#1C1D22",
                      opacity: filled ? 1 : 1,
                    }}
                  />
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export { ExpensesBanner };
