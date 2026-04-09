import * as React from "react";
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/lib/format";
import { EXPENSE_CATEGORIES, PAYMENT_METHODS } from "@/constants";
import type { Transaction } from "@/types/user";
import {
  TrendingUp, TrendingDown,
  Banknote, CreditCard, Landmark, Smartphone, Bitcoin, Gift,
} from "lucide-react";

const METHOD_ICONS: Record<string, React.ReactNode> = {
  cash: <Banknote size={10} />,
  check: <Landmark size={10} />,
  wire_transfer: <Landmark size={10} />,
  mobile_payment: <Smartphone size={10} />,
  cryptocurrency: <Bitcoin size={10} />,
  gift_card: <Gift size={10} />,
};

function getCategoryColor(cat: string) {
  return EXPENSE_CATEGORIES.find((c) => c.value === cat)?.color ?? "#94a3b8";
}

function getMethodLabel(method: string) {
  return (
    PAYMENT_METHODS.find((m) => m.value === method)?.label ??
    method.replace(/_/g, " ")
  );
}

interface TransactionItemProps {
  transaction: Transaction;
  className?: string;
}

function TransactionItem({ transaction, className }: TransactionItemProps) {
  const isCredit = transaction.type === "credit";
  const color = isCredit ? "#C6FF00" : getCategoryColor(transaction.category);
  const methodLabel = getMethodLabel(transaction.paymentMethod);
  const methodIcon = METHOD_ICONS[transaction.paymentMethod] ?? <CreditCard size={10} />;

  return (
    <tr
      className={cn(
        "border-b border-border/40 last:border-0 transition-colors hover:bg-muted/30",
        className
      )}
    >
      {/* Color bar + type icon */}
      <td className="py-3 pl-3 pr-2 w-10">
        <div
          className="flex size-8 shrink-0 items-center justify-center rounded-xl"
          style={{ backgroundColor: `${color}18` }}
        >
          {isCredit ? (
            <TrendingUp size={14} style={{ color }} />
          ) : (
            <TrendingDown size={14} style={{ color }} />
          )}
        </div>
      </td>

      {/* Description + method */}
      <td className="py-3 pr-4">
        <div className="flex flex-col gap-0.5">
          <span className="text-sm font-medium text-foreground leading-tight">
            {transaction.description}
          </span>
          <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
            {methodIcon}
            {methodLabel}
          </span>
        </div>
      </td>

      {/* Category pill */}
      <td className="py-3 pr-4 hidden sm:table-cell">
        <span
          className="inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium capitalize"
          style={{
            backgroundColor: `${color}18`,
            color,
          }}
        >
          {transaction.category.replace(/_/g, " ")}
        </span>
      </td>

      {/* Date */}
      <td className="py-3 pr-4 hidden md:table-cell">
        <span className="text-xs text-muted-foreground">{transaction.date}</span>
      </td>

      {/* Amount */}
      <td className="py-3 pr-3 text-right">
        <div className="flex flex-col items-end gap-0.5">
          <span
            className="text-sm font-bold"
            style={{ color: isCredit ? "#C6FF00" : "var(--foreground)" }}
          >
            {isCredit ? "+" : "−"}{formatCurrency(transaction.amount)}
          </span>
          <span
            className={cn(
              "rounded-full px-1.5 py-px text-[9px] font-medium",
              isCredit
                ? "bg-[#C6FF00]/10 text-[#C6FF00]"
                : "bg-muted text-muted-foreground"
            )}
          >
            {isCredit ? "income" : "expense"}
          </span>
        </div>
      </td>
    </tr>
  );
}

export { TransactionItem };
