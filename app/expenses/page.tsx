import { DashboardLayout } from "@/components/templates/DashboardLayout";
import { Card } from "@/components/atoms/Card";
import { mockExpenses } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/format";
import { EXPENSE_CATEGORIES } from "@/constants";

export default function ExpensesPage() {
  const getCategoryLabel = (cat: string) =>
    EXPENSE_CATEGORIES.find((c) => c.value === cat)?.label ?? cat;
  const getCategoryColor = (cat: string) =>
    EXPENSE_CATEGORIES.find((c) => c.value === cat)?.color ?? "#94a3b8";

  return (
    <DashboardLayout title="Transfer">
      <div className="flex flex-col gap-5">
        {/* Summary cards */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="flex flex-col gap-1">
            <p className="text-xs text-muted-foreground">Total Expenses</p>
            <p className="text-xl font-bold text-foreground">
              {formatCurrency(mockExpenses.reduce((s, e) => s + e.amount, 0))}
            </p>
          </Card>
          <Card className="flex flex-col gap-1">
            <p className="text-xs text-muted-foreground">This Month</p>
            <p className="text-xl font-bold text-foreground">
              {formatCurrency(19270.56)}
            </p>
          </Card>
          <Card className="flex flex-col gap-1">
            <p className="text-xs text-muted-foreground">Categories</p>
            <p className="text-xl font-bold text-foreground">{mockExpenses.length}</p>
          </Card>
        </div>

        {/* Expenses table */}
        <Card>
          <h3 className="text-sm font-semibold text-foreground mb-4">All Expenses</h3>
          <div className="overflow-hidden rounded-xl border border-border">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="py-2.5 pl-4 text-left text-xs font-medium text-muted-foreground">Description</th>
                  <th className="py-2.5 px-4 text-left text-xs font-medium text-muted-foreground">Category</th>
                  <th className="py-2.5 px-4 text-left text-xs font-medium text-muted-foreground">Method</th>
                  <th className="py-2.5 px-4 text-left text-xs font-medium text-muted-foreground">Date</th>
                  <th className="py-2.5 pr-4 text-right text-xs font-medium text-muted-foreground">Amount</th>
                </tr>
              </thead>
              <tbody>
                {mockExpenses.map((expense) => (
                  <tr key={expense.id} className="border-b border-border/50 last:border-0 hover:bg-muted/30 transition-colors">
                    <td className="py-3 pl-4 text-sm text-foreground">{expense.description}</td>
                    <td className="py-3 px-4">
                      <span
                        className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium"
                        style={{
                          backgroundColor: `${getCategoryColor(expense.category)}20`,
                          color: getCategoryColor(expense.category),
                        }}
                      >
                        {getCategoryLabel(expense.category)}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-xs text-muted-foreground capitalize">
                      {expense.paymentMethod.replace("_", " ")}
                    </td>
                    <td className="py-3 px-4 text-xs text-muted-foreground">{expense.date}</td>
                    <td className="py-3 pr-4 text-right text-sm font-semibold text-foreground">
                      {formatCurrency(expense.amount)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
