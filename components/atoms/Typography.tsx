import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const typographyVariants = cva("", {
  variants: {
    variant: {
      h1: "scroll-m-20 text-4xl font-bold tracking-tight",
      h2: "scroll-m-20 text-3xl font-semibold tracking-tight",
      h3: "scroll-m-20 text-2xl font-semibold tracking-tight",
      h4: "scroll-m-20 text-xl font-semibold tracking-tight",
      large: "text-lg font-semibold",
      body: "text-base leading-7",
      small: "text-sm leading-5",
      xs: "text-xs leading-4",
      muted: "text-sm text-muted-foreground",
      label: "text-xs font-medium uppercase tracking-wider text-muted-foreground",
    },
  },
  defaultVariants: { variant: "body" },
});

type TypographyElement = "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div" | "label";

export interface TypographyProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof typographyVariants> {
  as?: TypographyElement;
}

const variantElementMap: Record<string, TypographyElement> = {
  h1: "h1", h2: "h2", h3: "h3", h4: "h4",
  large: "p", body: "p", small: "p", xs: "span",
  muted: "p", label: "span",
};

function Typography({ className, variant = "body", as, children, ...props }: TypographyProps) {
  const Tag = (as ?? variantElementMap[variant!] ?? "p") as React.ElementType;
  return (
    <Tag className={cn(typographyVariants({ variant, className }))} {...props}>
      {children}
    </Tag>
  );
}

export { Typography };
