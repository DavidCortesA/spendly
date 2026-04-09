"use client";

import * as React from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  containerClassName?: string;
}

function SearchInput({ className, containerClassName, ...props }: SearchInputProps) {
  return (
    <div className={cn("relative flex items-center", containerClassName)}>
      <Search size={14} className="absolute left-3 text-muted-foreground pointer-events-none" />
      <input
        type="search"
        className={cn(
          "h-9 w-full rounded-xl border border-border bg-muted pl-9 pr-4 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-colors focus:border-ring focus:ring-2 focus:ring-ring/20",
          className
        )}
        {...props}
      />
    </div>
  );
}

export { SearchInput };
