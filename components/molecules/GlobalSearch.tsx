"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Search, X, TrendingDown, TrendingUp } from "lucide-react";
import { useFinanceStore } from "@/store/useFinanceStore";
import { EXPENSE_CATEGORIES } from "@/constants";
import { formatCurrency } from "@/lib/format";
import { cn } from "@/lib/utils";

function getCategoryColor(cat: string) {
  return EXPENSE_CATEGORIES.find((c) => c.value === cat)?.color ?? "#94a3b8";
}

type Result =
  | { kind: "expense"; id: string; label: string; sub: string; amount: number; color: string }
  | { kind: "income"; id: string; label: string; sub: string; amount: number };

export function GlobalSearch({ containerClassName }: { containerClassName?: string }) {
  const router = useRouter();
  const { expenses, income } = useFinanceStore();
  const [query, setQuery] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const wrapRef = React.useRef<HTMLDivElement>(null);

  const results: Result[] = React.useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return [];

    const expenseResults: Result[] = expenses
      .filter(
        (e) =>
          e.description.toLowerCase().includes(q) ||
          e.category.toLowerCase().includes(q)
      )
      .slice(0, 4)
      .map((e) => ({
        kind: "expense",
        id: e.id,
        label: e.description,
        sub: e.category,
        amount: e.amount,
        color: getCategoryColor(e.category),
      }));

    const incomeResults: Result[] = income
      .filter(
        (i) =>
          i.description.toLowerCase().includes(q) ||
          i.source.toLowerCase().includes(q)
      )
      .slice(0, 4)
      .map((i) => ({
        kind: "income",
        id: i.id,
        label: i.description,
        sub: i.source,
        amount: i.amount,
      }));

    return [...expenseResults, ...incomeResults].slice(0, 6);
  }, [query, expenses, income]);

  // close on outside click
  React.useEffect(() => {
    function handler(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  function handleSelect(r: Result) {
    router.push(r.kind === "expense" ? "/expenses" : "/income");
    setQuery("");
    setOpen(false);
  }

  function clear() {
    setQuery("");
    setOpen(false);
    inputRef.current?.focus();
  }

  return (
    <div ref={wrapRef} className={cn("relative", containerClassName)}>
      <div className="relative flex items-center">
        <Search size={14} className="absolute left-3 text-muted-foreground pointer-events-none" />
        <input
          ref={inputRef}
          type="search"
          placeholder="Search expenses, income…"
          value={query}
          onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
          onFocus={() => query && setOpen(true)}
          className="h-9 w-full rounded-xl border border-border bg-muted pl-9 pr-8 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-colors focus:border-ring focus:ring-2 focus:ring-ring/20"
        />
        {query && (
          <button
            onClick={clear}
            className="absolute right-2.5 flex size-4 items-center justify-center rounded-full text-muted-foreground hover:text-foreground"
          >
            <X size={12} />
          </button>
        )}
      </div>

      {open && query.trim() && (
        <div className="absolute left-0 top-11 z-50 w-80 rounded-2xl border border-border bg-card shadow-xl overflow-hidden">
          {results.length === 0 ? (
            <p className="px-4 py-6 text-center text-xs text-muted-foreground">
              No results for "{query}"
            </p>
          ) : (
            <ul>
              {results.map((r) => (
                <li key={r.id}>
                  <button
                    onClick={() => handleSelect(r)}
                    className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-muted/60 border-b border-border/50 last:border-0"
                  >
                    <span
                      className="flex size-7 shrink-0 items-center justify-center rounded-full"
                      style={{
                        backgroundColor:
                          r.kind === "expense" ? `${r.color}20` : "#C6FF0020",
                      }}
                    >
                      {r.kind === "expense" ? (
                        <TrendingDown
                          size={13}
                          style={{ color: (r as { color: string }).color }}
                        />
                      ) : (
                        <TrendingUp size={13} className="text-[#C6FF00]" />
                      )}
                    </span>
                    <div className="flex flex-1 flex-col min-w-0">
                      <span className="truncate text-xs font-medium text-foreground">
                        {r.label}
                      </span>
                      <span className="text-[10px] capitalize text-muted-foreground">
                        {r.sub}
                      </span>
                    </div>
                    <span
                      className={cn(
                        "shrink-0 text-xs font-semibold",
                        r.kind === "income" ? "text-[#C6FF00]" : "text-foreground"
                      )}
                    >
                      {r.kind === "income" ? "+" : "-"}
                      {formatCurrency(r.amount)}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
