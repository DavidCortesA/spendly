import { DashboardLayout } from "@/components/templates/DashboardLayout";
import { Card } from "@/components/atoms/Card";
import { EXPENSE_CATEGORIES } from "@/constants";
import { mockExpenses } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/format";

export default function CategoriesPage() {
  const categoryTotals = EXPENSE_CATEGORIES.map((cat) => ({
    ...cat,
    total: mockExpenses
      .filter((e) => e.category === cat.value)
      .reduce((s, e) => s + e.amount, 0),
  }));

  const grand = categoryTotals.reduce((s, c) => s + c.total, 0) || 1;

  return (
    <DashboardLayout title="Exchange">
      <div className="flex flex-col gap-5">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {categoryTotals.map((cat) => (
            <Card key={cat.value} className="flex flex-col gap-3">
              <div
                className="flex size-10 items-center justify-center rounded-xl"
                style={{ backgroundColor: `${cat.color}20` }}
              >
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: cat.color }}
                />
              </div>
              <div className="flex flex-col gap-0.5">
                <p className="text-xs text-muted-foreground">{cat.label}</p>
                <p className="text-base font-bold text-foreground">
                  {formatCurrency(cat.total)}
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <div className="h-1 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${((cat.total / grand) * 100).toFixed(0)}%`,
                      backgroundColor: cat.color,
                    }}
                  />
                </div>
                <p className="text-[10px] text-muted-foreground">
                  {((cat.total / grand) * 100).toFixed(1)}% of total
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
