"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Notification, NotificationType } from "@/types/notification";

const SEED: Notification[] = [
  {
    id: "n-seed-1",
    title: "Budget alert",
    message: "Debt Repayment is at 98% of its monthly limit.",
    type: "warning",
    read: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(), // 15 min ago
  },
  {
    id: "n-seed-2",
    title: "Income recorded",
    message: "Stock dividends of $11,200 were added to your account.",
    type: "success",
    read: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 h ago
  },
  {
    id: "n-seed-3",
    title: "Budget on track",
    message: "Groceries budget used 76% — you're within the safe zone.",
    type: "info",
    read: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5 h ago
  },
  {
    id: "n-seed-4",
    title: "Welcome to Spendly 👋",
    message: "Start by adding your first expense or income from the dashboard.",
    type: "info",
    read: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
  },
];

interface NotificationState {
  notifications: Notification[];
  addNotification: (n: Omit<Notification, "id" | "read" | "createdAt">) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  dismiss: (id: string) => void;
  clearAll: () => void;
}

export const useNotificationStore = create<NotificationState>()(
  persist(
    (set) => ({
      notifications: SEED,

      addNotification: ({ title, message, type }) =>
        set((state) => ({
          notifications: [
            {
              id: `n-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
              title,
              message,
              type,
              read: false,
              createdAt: new Date().toISOString(),
            },
            ...state.notifications,
          ],
        })),

      markAsRead: (id) =>
        set((state) => ({
          notifications: state.notifications.map((n) =>
            n.id === id ? { ...n, read: true } : n
          ),
        })),

      markAllAsRead: () =>
        set((state) => ({
          notifications: state.notifications.map((n) => ({ ...n, read: true })),
        })),

      dismiss: (id) =>
        set((state) => ({
          notifications: state.notifications.filter((n) => n.id !== id),
        })),

      clearAll: () => set({ notifications: [] }),
    }),
    { name: "spendly-notifications" }
  )
);

/** Llamada fuera de React (desde otros stores) */
export function pushNotification(n: Omit<Notification, "id" | "read" | "createdAt">) {
  useNotificationStore.getState().addNotification(n);
}
