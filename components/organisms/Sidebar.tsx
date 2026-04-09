"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Wallet, ArrowLeftRight, Clock,
  CreditCard, Repeat2, Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar } from "@/components/atoms/Avatar";
import { ThemeToggle } from "@/components/molecules/ThemeToggle";

const navItems = [
  { href: "/dashboard", label: "Dashboard", Icon: LayoutDashboard },
  { href: "/wallet", label: "My Wallet", Icon: Wallet },
  { href: "/expenses", label: "Transfer", Icon: ArrowLeftRight },
  { href: "/income", label: "Transactions", Icon: Clock },
  { href: "/budgets", label: "Payment", Icon: CreditCard },
  { href: "/categories", label: "Exchange", Icon: Repeat2 },
];

interface SidebarProps {
  className?: string;
}

function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "flex h-full w-64 shrink-0 flex-col border-r border-border bg-sidebar",
        className
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center gap-2.5 px-6 border-b border-border">
        <div className="flex size-7 items-center justify-center rounded-lg bg-primary">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 1L13 4V10L7 13L1 10V4L7 1Z" fill="currentColor" className="text-primary-foreground" />
          </svg>
        </div>
        <span className="text-base font-bold text-foreground tracking-tight">Spendly</span>
      </div>

      {/* Nav */}
      <nav className="flex flex-1 flex-col gap-1 px-3 py-4 overflow-y-auto">
        {navItems.map(({ href, label, Icon }) => {
          const isActive = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <Icon size={16} className="shrink-0" />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="flex flex-col gap-1 px-3 pb-4 border-t border-border pt-4">
        <Link
          href="/settings"
          className={cn(
            "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
            pathname === "/settings"
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:bg-muted hover:text-foreground"
          )}
        >
          <Settings size={16} className="shrink-0" />
          Settings
        </Link>
        <div className="mt-3 flex items-center gap-3 rounded-xl px-3 py-2">
          <Avatar fallback="DC" size="sm" className="bg-primary/20 text-primary" />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-foreground truncate">David Cortez</p>
            <p className="text-[10px] text-muted-foreground truncate">david@spendly.app</p>
          </div>
          <ThemeToggle className="shrink-0" />
        </div>
      </div>
    </aside>
  );
}

export { Sidebar };
