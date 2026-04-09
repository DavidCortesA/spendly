"use client";

import * as React from "react";
import { Bell, Clock } from "lucide-react";
import { Avatar } from "@/components/atoms/Avatar";
import { SearchInput } from "@/components/molecules/SearchInput";
import { ThemeToggle } from "@/components/molecules/ThemeToggle";

interface HeaderProps {
  title?: string;
}

function Header({ title = "Dashboard" }: HeaderProps) {
  return (
    <header className="flex h-16 shrink-0 items-center gap-4 border-b border-border bg-background px-6">
      <h1 className="text-lg font-semibold text-foreground hidden md:block">{title}</h1>
      <div className="flex flex-1 items-center justify-end gap-3">
        <SearchInput
          placeholder="Search..."
          containerClassName="w-48 lg:w-64"
        />
        <ThemeToggle />
        <button className="relative flex size-9 items-center justify-center rounded-full border border-border bg-muted text-muted-foreground transition-colors hover:text-foreground">
          <Clock size={16} />
        </button>
        <button className="relative flex size-9 items-center justify-center rounded-full border border-border bg-muted text-muted-foreground transition-colors hover:text-foreground">
          <Bell size={16} />
          <span className="absolute right-1.5 top-1.5 size-1.5 rounded-full bg-primary" />
        </button>
        <Avatar
          fallback="DC"
          size="sm"
          className="cursor-pointer bg-primary/20 text-primary ring-2 ring-primary/30"
        />
      </div>
    </header>
  );
}

export { Header };
