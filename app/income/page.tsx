"use client";

import * as React from "react";
import { DashboardLayout } from "@/components/templates/DashboardLayout";
import { Card } from "@/components/atoms/Card";
import { AddIncomeModal } from "@/components/organisms/AddIncomeModal";
import { useFinanceStore } from "@/store/useFinanceStore";
import { useFinance } from "@/hooks/useFinance";
import { formatCurrency } from "@/lib/format";
import { RevenueChart } from "@/components/charts/RevenueChart";
import { INCOME_SOURCES } from "@/constants";
import { Plus, Trash2, Repeat2 } from "lucide-react";

export default function IncomePage() {
  const { income, removeIncome } = useFinanceStore();
  const { totalIncome, incomeBySource } = useFinance();
  const [open, setOpen] = React.useState(false);

  const sorted = [...income].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const salaryTotal = incomeBySource.find((s) => s.source === "salary")?.total ?? 0;
  const otherTotal = incomeBySource
    .filter((s) => s.source !== "salary")
    .reduce((sum, s) => sum + s.total, 0);

  return (
    <DashboardLayout title="Income">
      <div className="flex flex-col gap-5">
        {/* Summary */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="flex flex-col gap-1">
            <p className="text-xs text-muted-foreground">Total Income</p>
            <p className="text-xl font-bold text-foreground">{formatCurrency(totalIncome)}</p>
          </Card>
          <Card className="flex flex-col gap-1">
            <p className="text-xs text-muted-foreground">Salary</p>
            <p className="text-xl font-bold text-foreground">{formatCurrency(salaryTotal)}</p>
          </Card>
          <Card className="flex flex-col gap-1">
            <p className="text-xs text-muted-foreground">Other Sources</p>
            <p className="text-xl font-bold text-foreground">{formatCurrency(otherTotal)}</p>
          </Card>
        </div>

        {/* Revenue chart */}
        <Card>
          <h3 className="text-sm font-semibold text-foreground mb-3">Revenue Trend</h3>
          <RevenueChart />
        </Card>

        {/* Income list */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-foreground">Income Records</h3>
            <button
              onClick={() => setOpen(true)}
              className="flex items-center gap-1.5 rounded-xl bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              <Plus size={13} />
              Add Income
            </button>
          </div>

          {sorted.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border py-12 text-center">
              <p className="text-sm font-medium text-muted-foreground">No income records yet</p>
              <p className="mt-1 text-xs text-muted-foreground/60">Click &quot;Add Income&quot; to record your first entry</p>
            </div>
          ) : (
            <div className="flex flex-col divide-y divide-border">
              {sorted.map((item) => {
                const sourceMeta = INCOME_SOURCES.find((s) => s.value === item.source);
                return (
                  <div
                    key={item.id}
                    className="group flex items-center justify-between py-3"
                  >
                    <div className="flex flex-col gap-0.5">
                      <p className="text-sm font-medium text-foreground">{item.description}</p>
                      <p className="text-xs text-muted-foreground capitalize">
                        {sourceMeta?.label ?? item.source} ·{" "}
                        {new Date(item.date).toLocaleDateString("en-US", {
                          month: "short", day: "numeric", year: "numeric",
                        })}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      {item.recurring && (
                        <span className="flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">
                          <Repeat2 size={10} />
                          Recurring
                        </span>
                      )}
                      <span className="text-sm font-semibold text-[#C6FF00]">
                        +{formatCurrency(item.amount)}
                      </span>
                      <button
                        onClick={() => removeIncome(item.id)}
                        className="invisible group-hover:visible flex size-7 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </Card>
      </div>

      <AddIncomeModal open={open} onClose={() => setOpen(false)} />
    </DashboardLayout>
  );
}
