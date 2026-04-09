"use client";

import * as React from "react";
import { Modal } from "@/components/atoms/Modal";
import { useFinanceStore } from "@/store/useFinanceStore";
import { INCOME_SOURCES } from "@/constants";
import type { IncomeSource } from "@/types/income";
import { cn } from "@/lib/utils";

interface AddIncomeModalProps {
  open: boolean;
  onClose: () => void;
}

const EMPTY = {
  description: "",
  amount: "",
  source: "salary" as IncomeSource,
  date: new Date().toISOString().split("T")[0],
  recurring: false,
};

function AddIncomeModal({ open, onClose }: AddIncomeModalProps) {
  const addIncome = useFinanceStore((s) => s.addIncome);
  const [form, setForm] = React.useState(EMPTY);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    if (open) {
      setForm(EMPTY);
      setError("");
    }
  }, [open]);

  function set<K extends keyof typeof EMPTY>(key: K, value: (typeof EMPTY)[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const amount = parseFloat(form.amount);
    if (!form.description.trim()) return setError("Description is required.");
    if (isNaN(amount) || amount <= 0) return setError("Enter a valid amount.");
    if (!form.date) return setError("Date is required.");

    addIncome({
      userId: "u1",
      description: form.description.trim(),
      amount,
      source: form.source,
      date: form.date,
      recurring: form.recurring,
    });

    onClose();
  }

  return (
    <Modal open={open} onClose={onClose} title="Add Income">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Description */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-muted-foreground">Description</label>
          <input
            type="text"
            placeholder="e.g. Monthly salary"
            value={form.description}
            onChange={(e) => set("description", e.target.value)}
            className={cn(
              "rounded-xl border border-border bg-muted px-3 py-2.5 text-sm text-foreground",
              "placeholder:text-muted-foreground/50 outline-none transition-colors",
              "focus:border-primary focus:ring-1 focus:ring-primary/30"
            )}
          />
        </div>

        {/* Amount */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-muted-foreground">Amount (USD)</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">$</span>
            <input
              type="number"
              min="0.01"
              step="0.01"
              placeholder="0.00"
              value={form.amount}
              onChange={(e) => set("amount", e.target.value)}
              className={cn(
                "w-full rounded-xl border border-border bg-muted pl-7 pr-3 py-2.5 text-sm text-foreground",
                "placeholder:text-muted-foreground/50 outline-none transition-colors",
                "focus:border-primary focus:ring-1 focus:ring-primary/30"
              )}
            />
          </div>
        </div>

        {/* Source + Date */}
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-muted-foreground">Source</label>
            <select
              value={form.source}
              onChange={(e) => set("source", e.target.value as IncomeSource)}
              className={cn(
                "rounded-xl border border-border bg-muted px-3 py-2.5 text-sm text-foreground",
                "outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary/30"
              )}
            >
              {INCOME_SOURCES.map((s) => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-muted-foreground">Date</label>
            <input
              type="date"
              value={form.date}
              onChange={(e) => set("date", e.target.value)}
              className={cn(
                "rounded-xl border border-border bg-muted px-3 py-2.5 text-sm text-foreground",
                "outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary/30"
              )}
            />
          </div>
        </div>

        {/* Recurring toggle */}
        <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-border bg-muted/50 px-3 py-2.5">
          <div
            onClick={() => set("recurring", !form.recurring)}
            className={cn(
              "relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors",
              form.recurring ? "bg-primary" : "bg-border"
            )}
          >
            <span
              className={cn(
                "inline-block size-3.5 rounded-full bg-white shadow transition-transform",
                form.recurring ? "translate-x-4" : "translate-x-1"
              )}
            />
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">Recurring</p>
            <p className="text-xs text-muted-foreground">This income repeats every month</p>
          </div>
        </label>

        {/* Error */}
        {error && (
          <p className="rounded-xl bg-destructive/10 px-3 py-2 text-xs text-destructive">{error}</p>
        )}

        {/* Actions */}
        <div className="flex gap-3 pt-1">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-xl border border-border py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 rounded-xl bg-primary py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            Save Income
          </button>
        </div>
      </form>
    </Modal>
  );
}

export { AddIncomeModal };
