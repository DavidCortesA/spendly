import { DashboardLayout } from "@/components/templates/DashboardLayout";
import { Card } from "@/components/atoms/Card";
import { mockIncome, incomeSources } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/format";
import { RevenueChart } from "@/components/charts/RevenueChart";

export default function IncomePage() {
  return (
    <DashboardLayout title="Transactions">
      <div className="flex flex-col gap-5">
        {/* Summary */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="flex flex-col gap-1">
            <p className="text-xs text-muted-foreground">Total Income</p>
            <p className="text-xl font-bold text-foreground">
              {formatCurrency(incomeSources.total)}
            </p>
          </Card>
          <Card className="flex flex-col gap-1">
            <p className="text-xs text-muted-foreground">Salary</p>
            <p className="text-xl font-bold text-foreground">
              {formatCurrency(incomeSources.breakdown[0].amount)}
            </p>
          </Card>
          <Card className="flex flex-col gap-1">
            <p className="text-xs text-muted-foreground">Freelance + Investment</p>
            <p className="text-xl font-bold text-foreground">
              {formatCurrency(incomeSources.breakdown[1].amount + incomeSources.breakdown[2].amount)}
            </p>
          </Card>
        </div>

        {/* Revenue chart */}
        <Card>
          <h3 className="text-sm font-semibold text-foreground mb-4">Revenue Trend</h3>
          <RevenueChart />
        </Card>

        {/* Income list */}
        <Card>
          <h3 className="text-sm font-semibold text-foreground mb-4">Income Records</h3>
          <div className="flex flex-col divide-y divide-border">
            {mockIncome.map((item) => (
              <div key={item.id} className="flex items-center justify-between py-3">
                <div className="flex flex-col gap-0.5">
                  <p className="text-sm font-medium text-foreground">{item.description}</p>
                  <p className="text-xs text-muted-foreground capitalize">{item.source} · {item.date}</p>
                </div>
                <div className="flex items-center gap-3">
                  {item.recurring && (
                    <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">
                      Recurring
                    </span>
                  )}
                  <span className="text-sm font-semibold text-[#C6FF00]">
                    +{formatCurrency(item.amount)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
