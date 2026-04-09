"use client";

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
  const [hovered, setHovered] = React.useState<number | null>(null);

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
            <span
              className={cn(
                "text-xs mb-1 transition-colors",
                hovered === i ? "font-semibold text-foreground" : "text-muted-foreground"
              )}
            >
              {seg.percentage}%
            </span>
          </div>
        ))}
      </div>

      {/* Progress bar with tooltips */}
      <div className="relative flex h-3 w-full overflow-visible rounded-full gap-px">
        {segments.map((seg, i) => (
          <div
            key={i}
            className="relative h-full rounded-full transition-all duration-200 cursor-pointer"
            style={{
              width: `${seg.percentage}%`,
              backgroundColor: seg.color,
              opacity: hovered === null || hovered === i ? 1 : 0.4,
              transform: hovered === i ? "scaleY(1.4)" : "scaleY(1)",
              transformOrigin: "center",
            }}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
          >
            {/* Tooltip */}
            {hovered === i && (
              <div
                className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 z-20 whitespace-nowrap rounded-xl border border-border bg-card px-3 py-1.5 shadow-xl pointer-events-none"
              >
                <div className="flex items-center gap-1.5">
                  <span
                    className="size-2 rounded-full shrink-0"
                    style={{ backgroundColor: seg.color }}
                  />
                  <span className="text-xs font-semibold text-foreground">{seg.label}</span>
                </div>
                <p className="mt-0.5 text-sm font-bold" style={{ color: seg.color }}>
                  {seg.percentage}%
                </p>
                {/* Arrow */}
                <span
                  className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent"
                  style={{ borderTopColor: "var(--border)" }}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4">
        {segments.map((seg, i) => (
          <div
            key={i}
            className="flex cursor-default items-center gap-1.5"
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
          >
            <span
              className="size-2 rounded-full transition-transform"
              style={{
                backgroundColor: seg.color,
                transform: hovered === i ? "scale(1.4)" : "scale(1)",
              }}
            />
            <span
              className={cn(
                "text-xs transition-colors",
                hovered === i ? "text-foreground font-medium" : "text-muted-foreground"
              )}
            >
              {seg.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export { BudgetProgress };
