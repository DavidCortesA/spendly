"use client";

import * as React from "react";
import { Card } from "@/components/atoms/Card";
import { ChartHeader } from "@/components/molecules/ChartHeader";
import { IncomeItem } from "@/components/molecules/IncomeItem";
import { formatCurrency } from "@/lib/format";
import { IncomeChart } from "@/components/charts/IncomeChart";
import { AddIncomeModal } from "@/components/organisms/AddIncomeModal";
import { useFinance } from "@/hooks/useFinance";

const SOURCE_ICONS: Record<string, string> = {
  salary: "briefcase",
  freelance: "laptop",
  investment: "trending-up",
  rental: "home",
  business: "building",
  other: "more-horizontal",
};

function IncomeSection() {
  const { totalIncome, incomeBySource, monthlyData } = useFinance();
  const [open, setOpen] = React.useState(false);

  const prevMonthData = monthlyData[new Date().getMonth() - 1];
  const currMonthData = monthlyData[new Date().getMonth()];

  return (
    <>
      <Card className="flex flex-col gap-4">
        <ChartHeader
          title="Income Sources"
          value={formatCurrency(totalIncome)}
          onAdd={() => setOpen(true)}
          href="/income"
        />

        <IncomeChart />

        <div className="flex justify-between px-1">
          <span className="text-xs text-muted-foreground">
            {prevMonthData
              ? `${prevMonthData.month}, ${formatCurrency(prevMonthData.income)}`
              : "—"}
          </span>
          <span className="text-xs text-muted-foreground">
            {currMonthData
              ? `${currMonthData.month}, ${formatCurrency(currMonthData.income)}`
              : "—"}
          </span>
        </div>

        <div className="flex flex-col">
          {incomeBySource.length === 0 ? (
            <p className="py-4 text-center text-xs text-muted-foreground">
              No income records — click + to add one
            </p>
          ) : (
            incomeBySource.map((item) => (
              <IncomeItem
                key={item.source}
                icon={SOURCE_ICONS[item.source] ?? "circle"}
                label={item.source.charAt(0).toUpperCase() + item.source.slice(1)}
                amount={item.total}
              />
            ))
          )}
        </div>
      </Card>

      <AddIncomeModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}

export { IncomeSection };
