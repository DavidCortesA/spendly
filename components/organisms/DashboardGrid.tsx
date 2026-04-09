import * as React from "react";
import { StatsSection } from "./StatsSection";
import { ExpensesBanner } from "./ExpensesBanner";
import { BudgetSection } from "./BudgetSection";
import { IncomeSection } from "./IncomeSection";
import { TransactionsSection } from "./TransactionsSection";
import { FilterTabsClient } from "@/features/dashboard/FilterTabsClient";

function DashboardGrid() {
  return (
    <div className="flex flex-col gap-5">
      {/* Top stats row */}
      <StatsSection />

      {/* Expenses banner */}
      <ExpensesBanner />

      {/* Filter tabs */}
      <FilterTabsClient />

      {/* Bottom two-column grid */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <div className="flex flex-col gap-5">
          <BudgetSection />
          <TransactionsSection />
        </div>
        <div className="flex flex-col gap-5">
          <IncomeSection />
        </div>
      </div>
    </div>
  );
}

export { DashboardGrid };
