"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, Settings, LogOut, User } from "lucide-react";
import { Avatar } from "@/components/atoms/Avatar";
import { ThemeToggle } from "@/components/molecules/ThemeToggle";
import { NotificationPanel } from "@/components/molecules/NotificationPanel";
import { GlobalSearch } from "@/components/molecules/GlobalSearch";
import { useDashboardStore } from "@/store/dashboard";
import { cn } from "@/lib/utils";

interface HeaderProps {
  title?: string;
}

function UserMenu() {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!open) return;
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="cursor-pointer"
        aria-label="User menu"
      >
        <Avatar
          fallback="DC"
          size="sm"
          className={cn(
            "bg-primary/20 text-primary ring-2 transition-all",
            open ? "ring-primary" : "ring-primary/30"
          )}
        />
      </button>

      {open && (
        <div className="absolute right-0 top-11 z-50 w-52 rounded-2xl border border-border bg-card shadow-xl overflow-hidden">
          {/* Profile info */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
            <Avatar fallback="DC" size="sm" className="bg-primary/20 text-primary shrink-0" />
            <div className="min-w-0">
              <p className="text-xs font-semibold text-foreground truncate">David Cortez</p>
              <p className="text-[10px] text-muted-foreground truncate">david@spendly.app</p>
            </div>
          </div>

          {/* Menu items */}
          <div className="py-1">
            <Link
              href="/settings"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-2.5 text-sm text-foreground transition-colors hover:bg-muted"
            >
              <Settings size={14} className="text-muted-foreground" />
              Settings
            </Link>
            <Link
              href="/settings"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-2.5 text-sm text-foreground transition-colors hover:bg-muted"
            >
              <User size={14} className="text-muted-foreground" />
              Profile
            </Link>
          </div>

          <div className="border-t border-border py-1">
            <button
              onClick={() => setOpen(false)}
              className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-destructive transition-colors hover:bg-destructive/10"
            >
              <LogOut size={14} />
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function Header({ title = "Dashboard" }: HeaderProps) {
  const { toggleSidebar } = useDashboardStore();

  return (
    <header className="flex h-16 shrink-0 items-center gap-3 border-b border-border bg-background px-4 md:px-6">
      <button
        onClick={toggleSidebar}
        className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-border bg-muted text-muted-foreground transition-colors hover:text-foreground"
        aria-label="Toggle sidebar"
      >
        <Menu size={16} />
      </button>

      <h1 className="text-lg font-semibold text-foreground hidden md:block">{title}</h1>

      <div className="flex flex-1 items-center justify-end gap-3">
        <GlobalSearch containerClassName="w-48 lg:w-72" />
        <ThemeToggle />
        <NotificationPanel />
        <UserMenu />
      </div>
    </header>
  );
}

export { Header };
