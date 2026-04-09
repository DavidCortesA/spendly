import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const chipVariants = cva(
  "inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-full border font-medium transition-all select-none",
  {
    variants: {
      variant: {
        default: "border-border bg-muted text-muted-foreground hover:bg-secondary hover:text-foreground",
        active: "border-primary bg-primary text-primary-foreground",
        outline: "border-border bg-transparent text-foreground hover:bg-muted",
      },
      size: {
        sm: "h-7 px-3 text-xs",
        md: "h-8 px-4 text-sm",
        lg: "h-9 px-5 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export interface ChipProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof chipVariants> {
  active?: boolean;
}

function Chip({ className, variant, size, active, ...props }: ChipProps) {
  return (
    <button
      className={cn(chipVariants({ variant: active ? "active" : variant, size, className }))}
      {...props}
    />
  );
}

export { Chip, chipVariants };
