import { DashboardLayout } from "@/components/templates/DashboardLayout";
import { Card } from "@/components/atoms/Card";
import { mockBudgets } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/format";
import { BudgetChart } from "@/components/charts/BudgetChart";
import { EXPENSE_CATEGORIES } from "@/constants";

export default function BudgetsPage() {
  const totalBudget = mockBudgets.reduce((s, b) => s + b.limit, 0);
  const totalSpent = mockBudgets.reduce((s, b) => s + b.spent, 0);
  const remaining = totalBudget - totalSpent;

  return (
    <DashboardLayout title="Payment">
      <div className="flex flex-col gap-5">
        {/* Summary */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="flex flex-col gap-1">
            <p className="text-xs text-muted-foreground">Total Budget</p>
            <p className="text-xl font-bold text-foreground">{formatCurrency(totalBudget)}</p>
          </Card>
          <Card className="flex flex-col gap-1">
            <p className="text-xs text-muted-foreground">Total Spent</p>
            <p className="text-xl font-bold text-foreground">{formatCurrency(totalSpent)}</p>
          </Card>
          <Card className="flex flex-col gap-1">
            <p className="text-xs text-muted-foreground">Remaining</p>
            <p className="text-xl font-bold text-[#C6FF00]">{formatCurrency(remaining)}</p>
          </Card>
        </div>

        {/* Budget progress chart */}
        <Card>
          <h3 className="text-sm font-semibold text-foreground mb-4">Budget vs Spent</h3>
          <BudgetChart />
        </Card>

        {/* Budget cards grid */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
          {mockBudgets.map((budget) => {
            const pct = Math.min((budget.spent / budget.limit) * 100, 100);
            const color = EXPENSE_CATEGORIES.find((c) => c.value === budget.category)?.color ?? "#94a3b8";
            const label = EXPENSE_CATEGORIES.find((c) => c.value === budget.category)?.label ?? budget.category;
            const status = pct > 90 ? "exceeded" : pct > 70 ? "warning" : "safe";
            return (
              <Card key={budget.id} className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-muted-foreground">{label}</span>
                  <span
                    className="rounded-full px-2 py-0.5 text-[10px] font-semibold"
                    style={{
                      backgroundColor: status === "exceeded" ? "#ef444420" : status === "warning" ? "#f59e0b20" : "#C6FF0020",
                      color: status === "exceeded" ? "#ef4444" : status === "warning" ? "#f59e0b" : "#C6FF00",
                    }}
                  >
                    {status}
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-foreground font-medium">{formatCurrency(budget.spent)}</span>
                    <span className="text-muted-foreground">{formatCurrency(budget.limit)}</span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${pct}%`, backgroundColor: color }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground text-right">{pct.toFixed(0)}%</p>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
}
