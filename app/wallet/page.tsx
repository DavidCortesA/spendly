import { DashboardLayout } from "@/components/templates/DashboardLayout";
import { Card } from "@/components/atoms/Card";
import { mockTransactions } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/format";
import { TransactionItem } from "@/components/molecules/TransactionItem";

export default function WalletPage() {
  const credits = mockTransactions.filter((t) => t.type === "credit");
  const debits = mockTransactions.filter((t) => t.type === "debit");
  const balance = credits.reduce((s, t) => s + t.amount, 0) - debits.reduce((s, t) => s + t.amount, 0);

  return (
    <DashboardLayout title="My Wallet">
      <div className="flex flex-col gap-5">
        {/* Wallet card */}
        <div
          className="relative overflow-hidden rounded-2xl p-6"
          style={{
            background: "linear-gradient(135deg, #7C3AED 0%, #3b82f6 50%, #C6FF00 100%)",
          }}
        >
          <div className="flex flex-col gap-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-white/70">Total Balance</p>
                <p className="text-3xl font-bold text-white">{formatCurrency(Math.abs(balance))}</p>
              </div>
              <div className="rounded-xl bg-white/20 px-3 py-1.5 text-xs font-medium text-white">
                Visa **** 4242
              </div>
            </div>
            <div className="flex items-center gap-8">
              <div>
                <p className="text-xs text-white/70">Income</p>
                <p className="text-base font-semibold text-white">
                  +{formatCurrency(credits.reduce((s, t) => s + t.amount, 0))}
                </p>
              </div>
              <div>
                <p className="text-xs text-white/70">Expense</p>
                <p className="text-base font-semibold text-white">
                  -{formatCurrency(debits.reduce((s, t) => s + t.amount, 0))}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* All transactions */}
        <Card>
          <h3 className="text-sm font-semibold text-foreground mb-4">All Transactions</h3>
          <div className="overflow-hidden rounded-xl border border-border">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="py-2.5 pl-4 text-left text-xs font-medium text-muted-foreground">User</th>
                  <th className="py-2.5 px-4 text-left text-xs font-medium text-muted-foreground">Description</th>
                  <th className="py-2.5 px-4 text-left text-xs font-medium text-muted-foreground">Created</th>
                  <th className="py-2.5 pr-4 text-right text-xs font-medium text-muted-foreground">Amount</th>
                </tr>
              </thead>
              <tbody>
                {mockTransactions.map((tx) => (
                  <TransactionItem key={tx.id} transaction={tx} />
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
