import * as React from "react";
import Link from "next/link";
import { ArrowUpRight, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChartHeaderProps {
  title: string;
  value: string;
  /** URL de navegación para el botón ArrowUpRight */
  href?: string;
  /** Abre un modal / dispara una acción al hacer clic en el botón + */
  onAdd?: () => void;
  className?: string;
}

function ChartHeader({ title, value, href, onAdd, className }: ChartHeaderProps) {
  const hasActions = href || onAdd;

  return (
    <div className={cn("flex items-start justify-between", className)}>
      <div className="flex flex-col gap-1">
        <p className="text-sm text-muted-foreground">{title}</p>
        <p className="text-2xl font-bold text-foreground">{value}</p>
      </div>

      {hasActions && (
        <div className="flex items-center gap-2">
          {onAdd && (
            <button
              onClick={onAdd}
              title="Add"
              className="flex size-9 items-center justify-center rounded-full bg-muted text-muted-foreground hover:text-foreground transition-colors"
            >
              <Plus size={16} />
            </button>
          )}
          {href && (
            <Link
              href={href}
              title="View all"
              className="flex size-9 items-center justify-center rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              <ArrowUpRight size={16} />
            </Link>
          )}
        </div>
      )}
    </div>
  );
}

export { ChartHeader };
