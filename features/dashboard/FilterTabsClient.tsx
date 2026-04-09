"use client";

import * as React from "react";
import { FilterTabs } from "@/components/molecules/FilterTabs";
import { useDashboardStore } from "@/store/dashboard";
import { PAYMENT_METHODS } from "@/constants";

const tabs = [
  { value: "all", label: "All" },
  ...PAYMENT_METHODS.map((m) => ({ value: m.value, label: m.label })),
];

function FilterTabsClient() {
  const { activeFilter, setActiveFilter } = useDashboardStore();

  return (
    <FilterTabs
      tabs={tabs}
      activeTab={activeFilter}
      onTabChange={(val) => setActiveFilter(val as typeof activeFilter)}
    />
  );
}

export { FilterTabsClient };
