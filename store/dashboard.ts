"use client";

import { create } from "zustand";
import type { PaymentMethod } from "@/types/expense";

interface DashboardState {
  activeFilter: PaymentMethod | "all";
  sidebarOpen: boolean;
  setActiveFilter: (filter: PaymentMethod | "all") => void;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  activeFilter: "all",
  sidebarOpen: true,
  setActiveFilter: (filter) => set({ activeFilter: filter }),
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
}));
