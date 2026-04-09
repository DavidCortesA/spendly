"use client";

import { DashboardLayout } from "@/components/templates/DashboardLayout";
import { Card } from "@/components/atoms/Card";
import { Divider } from "@/components/atoms/Divider";
import { Avatar } from "@/components/atoms/Avatar";
import { ThemeToggle } from "@/components/molecules/ThemeToggle";
import { useFinanceStore } from "@/store/useFinanceStore";
import { useExport } from "@/hooks/useExport";
import { Download } from "lucide-react";

export default function SettingsPage() {
  const { resetData } = useFinanceStore();
  const { exportAll, exportExpenses, exportIncome } = useExport();

  function handleReset() {
    if (window.confirm("Reset all data to defaults? This cannot be undone.")) {
      resetData();
    }
  }

  return (
    <DashboardLayout title="Settings">
      <div className="flex flex-col gap-5 max-w-2xl">
        {/* Profile */}
        <Card>
          <h3 className="text-sm font-semibold text-foreground mb-4">Profile</h3>
          <div className="flex items-center gap-4 mb-4">
            <Avatar
              fallback="DC"
              size="xl"
              className="bg-primary/20 text-primary"
            />
            <div>
              <p className="text-base font-semibold text-foreground">David Cortez</p>
              <p className="text-sm text-muted-foreground">david@spendly.app</p>
            </div>
          </div>
          <Divider className="my-4" />
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Full Name", value: "David Cortez" },
              { label: "Email", value: "david@spendly.app" },
              { label: "Currency", value: "USD ($)" },
              { label: "Time Zone", value: "America/New_York" },
            ].map(({ label, value }) => (
              <div key={label} className="flex flex-col gap-1">
                <label className="text-xs text-muted-foreground">{label}</label>
                <div className="rounded-xl border border-border bg-muted px-3 py-2 text-sm text-foreground">
                  {value}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Preferences */}
        <Card>
          <h3 className="text-sm font-semibold text-foreground mb-4">Preferences</h3>
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="text-sm font-medium text-foreground">Dark Mode</p>
                <p className="text-xs text-muted-foreground">Toggle light / dark theme</p>
              </div>
              <ThemeToggle />
            </div>
            {[
              { label: "Email Notifications", description: "Receive budget alerts via email", enabled: true },
              { label: "Budget Alerts", description: "Alert when budget exceeds 80%", enabled: false },
            ].map(({ label, description, enabled }) => (
              <div key={label} className="flex items-center justify-between py-2">
                <div>
                  <p className="text-sm font-medium text-foreground">{label}</p>
                  <p className="text-xs text-muted-foreground">{description}</p>
                </div>
                <div
                  className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${enabled ? "bg-primary" : "bg-muted"}`}
                >
                  <span
                    className={`inline-block size-3.5 rounded-full bg-white shadow transition-transform ${enabled ? "translate-x-4" : "translate-x-1"}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Export */}
        <Card>
          <h3 className="text-sm font-semibold text-foreground mb-3">Export Data</h3>
          <p className="text-xs text-muted-foreground mb-4">
            Download your financial data as CSV files.
          </p>
          <div className="flex gap-3 flex-wrap">
            <button
              onClick={exportAll}
              className="flex items-center gap-2 rounded-xl border border-border px-4 py-2 text-xs font-medium text-foreground hover:bg-muted transition-colors"
            >
              <Download size={13} />
              All Data
            </button>
            <button
              onClick={exportExpenses}
              className="flex items-center gap-2 rounded-xl border border-border px-4 py-2 text-xs font-medium text-foreground hover:bg-muted transition-colors"
            >
              <Download size={13} />
              Expenses CSV
            </button>
            <button
              onClick={exportIncome}
              className="flex items-center gap-2 rounded-xl border border-border px-4 py-2 text-xs font-medium text-foreground hover:bg-muted transition-colors"
            >
              <Download size={13} />
              Income CSV
            </button>
          </div>
        </Card>

        {/* Danger zone */}
        <Card className="border-destructive/30">
          <h3 className="text-sm font-semibold text-destructive mb-3">Danger Zone</h3>
          <p className="text-xs text-muted-foreground mb-4">
            These actions are irreversible. Please proceed with caution.
          </p>
          <div className="flex gap-3">
            <button
              onClick={handleReset}
              className="rounded-xl border border-destructive/40 px-4 py-2 text-xs font-medium text-destructive hover:bg-destructive/10 transition-colors"
            >
              Reset all data
            </button>
            <button className="rounded-xl border border-destructive/40 bg-destructive/10 px-4 py-2 text-xs font-medium text-destructive hover:bg-destructive/20 transition-colors">
              Delete account
            </button>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
