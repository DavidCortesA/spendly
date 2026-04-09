import * as React from "react";
import { cn } from "@/lib/utils";

interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical";
  label?: string;
}

function Divider({ className, orientation = "horizontal", label, ...props }: DividerProps) {
  if (label) {
    return (
      <div className={cn("flex items-center gap-3", className)} {...props}>
        <div className="h-px flex-1 bg-border" />
        <span className="text-xs text-muted-foreground">{label}</span>
        <div className="h-px flex-1 bg-border" />
      </div>
    );
  }

  return (
    <div
      className={cn(
        orientation === "horizontal" ? "h-px w-full bg-border" : "w-px self-stretch bg-border",
        className
      )}
      {...props}
    />
  );
}

export { Divider };
