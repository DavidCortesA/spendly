import * as React from "react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/atoms/Card";
import { Badge } from "@/components/atoms/Badge";

interface StatCardProps {
  label: string;
  value: string;
  trend?: number;
  className?: string;
}

function StatCard({ label, value, trend, className }: StatCardProps) {
  const isPositive = trend !== undefined && trend >= 0;

  return (
    <Card className={cn("flex flex-col gap-2", className)}>
      <p className="text-sm text-muted-foreground">{label}</p>
      <div className="flex items-center gap-3">
        <span className="text-2xl font-bold tracking-tight text-foreground">{value}</span>
        {trend !== undefined && (
          <Badge variant={isPositive ? "positive" : "negative"} size="sm">
            {isPositive ? "+" : ""}{trend}%
          </Badge>
        )}
      </div>
    </Card>
  );
}

export { StatCard };
