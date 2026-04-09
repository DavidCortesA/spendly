"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard, Wallet, ArrowLeftRight, Clock, CreditCard, Repeat2,
  Settings, TrendingUp, TrendingDown, Briefcase, Laptop, Home, Building2,
  CircleDot, Bell, Search, Filter, Grid3x3, SlidersHorizontal, ArrowUpRight,
  ChevronRight, Plus, Minus, X, Check, MoreHorizontal, BarChart3,
  DollarSign, PiggyBank, type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  "layout-dashboard": LayoutDashboard,
  "wallet": Wallet,
  "arrow-left-right": ArrowLeftRight,
  "clock": Clock,
  "credit-card": CreditCard,
  "repeat-2": Repeat2,
  "settings": Settings,
  "trending-up": TrendingUp,
  "trending-down": TrendingDown,
  "briefcase": Briefcase,
  "laptop": Laptop,
  "home": Home,
  "building-2": Building2,
  "circle-dot": CircleDot,
  "bell": Bell,
  "search": Search,
  "filter": Filter,
  "grid-3x3": Grid3x3,
  "sliders-horizontal": SlidersHorizontal,
  "arrow-up-right": ArrowUpRight,
  "chevron-right": ChevronRight,
  "plus": Plus,
  "minus": Minus,
  "x": X,
  "check": Check,
  "more-horizontal": MoreHorizontal,
  "bar-chart-3": BarChart3,
  "dollar-sign": DollarSign,
  "piggy-bank": PiggyBank,
};

export interface IconProps extends React.SVGAttributes<SVGElement> {
  name: string;
  size?: number;
}

function Icon({ name, size = 16, className, ...props }: IconProps) {
  const LucideIcon = iconMap[name];
  if (!LucideIcon) return null;
  return <LucideIcon size={size} className={cn("shrink-0", className)} {...props} />;
}

export { Icon };
