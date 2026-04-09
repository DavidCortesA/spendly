import * as React from "react";
import { Avatar } from "@/components/atoms/Avatar";
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/lib/format";
import type { Transaction } from "@/types/user";

interface TransactionItemProps {
  transaction: Transaction;
  className?: string;
}

function TransactionItem({ transaction, className }: TransactionItemProps) {
  const isCredit = transaction.type === "credit";

  return (
    <tr className={cn("border-b border-border/50 last:border-0 hover:bg-muted/30 transition-colors", className)}>
      <td className="py-3 pr-4">
        <div className="flex items-center gap-3">
          <Avatar
            src={transaction.userAvatar}
            fallback={transaction.userName}
            size="sm"
          />
          <span className="text-sm font-medium text-foreground">{transaction.userName}</span>
        </div>
      </td>
      <td className="py-3 pr-4">
        <span className="text-sm text-muted-foreground">{transaction.description}</span>
      </td>
      <td className="py-3 pr-4">
        <span className="text-sm text-muted-foreground">{transaction.date}</span>
      </td>
      <td className="py-3 text-right">
        <span className={cn("text-sm font-semibold", isCredit ? "text-[#C6FF00]" : "text-foreground")}>
          {isCredit ? "+" : "-"}{formatCurrency(transaction.amount)}
        </span>
      </td>
    </tr>
  );
}

export { TransactionItem };
