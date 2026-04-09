export type ExpenseCategory =
  | "rent"
  | "groceries"
  | "debt"
  | "subscriptions"
  | "savings"
  | "transport"
  | "entertainment"
  | "health"
  | "education"
  | "other";

export type PaymentMethod =
  | "cash"
  | "check"
  | "wire_transfer"
  | "mobile_payment"
  | "cryptocurrency"
  | "gift_card";

export interface Expense {
  id: string;
  userId: string;
  description: string;
  amount: number;
  category: ExpenseCategory;
  paymentMethod: PaymentMethod;
  date: string;
  createdAt: string;
}

export interface ExpenseSummary {
  category: ExpenseCategory;
  total: number;
  percentage: number;
  trend: number;
}
