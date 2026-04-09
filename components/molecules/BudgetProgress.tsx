import * as React from "react";
import { cn } from "@/lib/utils";

interface BudgetSegment {
  label: string;
  percentage: number;
  color: string;
}

interface BudgetProgressProps {
  segments: BudgetSegment[];
  className?: string;
}

function BudgetProgress({ segments, className }: BudgetProgressProps) {
  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {/* Percentage labels */}
      <div className="flex items-end gap-px">
        {segments.map((seg, i) => (
          <div
            key={i}
            className="flex flex-col items-start"
            style={{ width: `${seg.percentage}%` }}
          >
            <span className="text-xs text-muted-foreground mb-1">{seg.percentage}%</span>
          </div>
        ))}
      </div>

      {/* Progress bar */}
      <div className="flex h-1.5 w-full overflow-hidden rounded-full gap-px">
        {segments.map((seg, i) => (
          <div
            key={i}
            className="h-full rounded-full transition-all"
            style={{ width: `${seg.percentage}%`, backgroundColor: seg.color }}
          />
        ))}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4">
        {segments.map((seg, i) => (
          <div key={i} className="flex items-center gap-1.5">
            <span
              className="size-1.5 rounded-full"
              style={{ backgroundColor: seg.color }}
            />
            <span className="text-xs text-muted-foreground">{seg.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export { BudgetProgress };
