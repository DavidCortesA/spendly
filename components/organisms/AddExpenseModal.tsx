"use client";

import * as React from "react";
import { Modal } from "@/components/atoms/Modal";
import { useFinanceStore } from "@/store/useFinanceStore";
import { EXPENSE_CATEGORIES, PAYMENT_METHODS } from "@/constants";
import type { ExpenseCategory, PaymentMethod } from "@/types/expense";
import { cn } from "@/lib/utils";

interface AddExpenseModalProps {
  open: boolean;
  onClose: () => void;
}

const EMPTY = {
  description: "",
  amount: "",
  category: "other" as ExpenseCategory,
  paymentMethod: "cash" as PaymentMethod,
  date: new Date().toISOString().split("T")[0],
};

function AddExpenseModal({ open, onClose }: AddExpenseModalProps) {
  const addExpense = useFinanceStore((s) => s.addExpense);
  const [form, setForm] = React.useState(EMPTY);
  const [error, setError] = React.useState("");

  // Reset on open
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

    addExpense({
      userId: "u1",
      description: form.description.trim(),
      amount,
      category: form.category,
      paymentMethod: form.paymentMethod,
      date: form.date,
    });

    onClose();
  }

  return (
    <Modal open={open} onClose={onClose} title="Add Expense">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Description */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-muted-foreground">Description</label>
          <input
            type="text"
            placeholder="e.g. Monthly rent"
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

        {/* Category + Payment method */}
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-muted-foreground">Category</label>
            <select
              value={form.category}
              onChange={(e) => set("category", e.target.value as ExpenseCategory)}
              className={cn(
                "rounded-xl border border-border bg-muted px-3 py-2.5 text-sm text-foreground",
                "outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary/30"
              )}
            >
              {EXPENSE_CATEGORIES.map((c) => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-muted-foreground">Payment method</label>
            <select
              value={form.paymentMethod}
              onChange={(e) => set("paymentMethod", e.target.value as PaymentMethod)}
              className={cn(
                "rounded-xl border border-border bg-muted px-3 py-2.5 text-sm text-foreground",
                "outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary/30"
              )}
            >
              {PAYMENT_METHODS.map((m) => (
                <option key={m.value} value={m.value}>{m.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Date */}
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
            Save Expense
          </button>
        </div>
      </form>
    </Modal>
  );
}

export { AddExpenseModal };
