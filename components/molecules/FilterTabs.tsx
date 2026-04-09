"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Chip } from "@/components/atoms/Chip";

interface FilterTab {
  value: string;
  label: string;
}

interface FilterTabsProps {
  tabs: FilterTab[];
  activeTab: string;
  onTabChange: (value: string) => void;
  className?: string;
}

function FilterTabs({ tabs, activeTab, onTabChange, className }: FilterTabsProps) {
  return (
    <div className={cn("flex items-center gap-2 flex-wrap", className)}>
      <div className="flex items-center gap-2 flex-1 flex-wrap">
        {tabs.map((tab) => (
          <Chip
            key={tab.value}
            active={activeTab === tab.value}
            onClick={() => onTabChange(tab.value)}
          >
            {tab.label}
          </Chip>
        ))}
      </div>
    </div>
  );
}

export { FilterTabs };
