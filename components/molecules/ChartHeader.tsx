import * as React from "react";
import { ArrowUpRight, DollarSign } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChartHeaderProps {
  title: string;
  value: string;
  className?: string;
}

function ChartHeader({ title, value, className }: ChartHeaderProps) {
  return (
    <div className={cn("flex items-start justify-between", className)}>
      <div className="flex flex-col gap-1">
        <p className="text-sm text-muted-foreground">{title}</p>
        <p className="text-2xl font-bold text-foreground">{value}</p>
      </div>
      <div className="flex items-center gap-2">
        <button className="flex size-9 items-center justify-center rounded-full bg-muted text-muted-foreground hover:text-foreground transition-colors">
          <DollarSign size={16} />
        </button>
        <button className="flex size-9 items-center justify-center rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
          <ArrowUpRight size={16} />
        </button>
      </div>
    </div>
  );
}

export { ChartHeader };
