import * as React from "react";
import { Briefcase, Laptop, TrendingUp, Home, Building2, CircleDot } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/lib/format";

const iconMap: Record<string, React.ElementType> = {
  briefcase: Briefcase,
  laptop: Laptop,
  "trending-up": TrendingUp,
  home: Home,
  "building-2": Building2,
  "circle-dot": CircleDot,
};

interface IncomeItemProps {
  icon: string;
  label: string;
  amount: number;
  className?: string;
}

function IncomeItem({ icon, label, amount, className }: IncomeItemProps) {
  const Icon = iconMap[icon] ?? CircleDot;

  return (
    <div className={cn("flex items-center gap-3 py-3 border-b border-border last:border-0", className)}>
      <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-muted text-muted-foreground">
        <Icon size={16} />
      </div>
      <span className="flex-1 text-sm font-medium text-foreground">{label}</span>
      <span className="text-sm font-semibold text-foreground">{formatCurrency(amount)}</span>
    </div>
  );
}

export { IncomeItem };
