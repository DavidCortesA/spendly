"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Chip } from "@/components/atoms/Chip";
import { SlidersHorizontal, LayoutGrid } from "lucide-react";

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
    <div className={cn("flex items-center gap-2", className)}>
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
      <div className="flex items-center gap-2 ml-auto">
        <button className="flex size-8 items-center justify-center rounded-xl border border-border bg-muted text-muted-foreground transition-colors hover:text-foreground">
          <SlidersHorizontal size={14} />
        </button>
        <button className="flex size-8 items-center justify-center rounded-xl border border-border bg-muted text-muted-foreground transition-colors hover:text-foreground">
          <LayoutGrid size={14} />
        </button>
      </div>
    </div>
  );
}

export { FilterTabs };
