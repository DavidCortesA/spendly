import type { Expense } from "@/types/expense";
import type { Income } from "@/types/income";
import type { Budget } from "@/types/budget";
import type { User, Transaction } from "@/types/user";

export const mockUsers: User[] = [
  { id: "u1", name: "Savannah", email: "savannah@example.com", avatar: "/avatars/savannah.jpg", currency: "USD", createdAt: "2024-01-01" },
  { id: "u2", name: "Jordan Lee", email: "jordan@example.com", avatar: "/avatars/jordan.jpg", currency: "USD", createdAt: "2024-01-01" },
  { id: "u3", name: "Alexis Kim", email: "alexis@example.com", avatar: "/avatars/alexis.jpg", currency: "USD", createdAt: "2024-01-01" },
  { id: "u4", name: "Marcus Chen", email: "marcus@example.com", avatar: "/avatars/marcus.jpg", currency: "USD", createdAt: "2024-01-01" },
  { id: "u5", name: "Sofia Torres", email: "sofia@example.com", avatar: "/avatars/sofia.jpg", currency: "USD", createdAt: "2024-01-01" },
];

export const mockTransactions: Transaction[] = [
  { id: "t1", userId: "u1", userName: "Savannah", description: "Education fee", amount: 1164.99, type: "debit", category: "education", paymentMethod: "wire_transfer", date: "Jun 10", createdAt: "2024-06-10" },
  { id: "t2", userId: "u2", userName: "Jordan Lee", description: "Rent & Utilities", amount: 1072.98, type: "debit", category: "rent", paymentMethod: "check", date: "Jun 16", createdAt: "2024-06-16" },
  { id: "t3", userId: "u3", userName: "Alexis Kim", description: "Rent & Utilities", amount: 1072.98, type: "debit", category: "rent", paymentMethod: "check", date: "Jun 16", createdAt: "2024-06-16" },
  { id: "t4", userId: "u4", userName: "Marcus Chen", description: "Grocery shopping", amount: 342.50, type: "debit", category: "groceries", paymentMethod: "mobile_payment", date: "Jun 18", createdAt: "2024-06-18" },
  { id: "t5", userId: "u5", userName: "Sofia Torres", description: "Netflix subscription", amount: 15.99, type: "debit", category: "subscriptions", paymentMethod: "cash", date: "Jun 20", createdAt: "2024-06-20" },
  { id: "t6", userId: "u1", userName: "Savannah", description: "Freelance payment", amount: 2500.00, type: "credit", category: "freelance", paymentMethod: "wire_transfer", date: "Jun 22", createdAt: "2024-06-22" },
  { id: "t7", userId: "u2", userName: "Jordan Lee", description: "Investment return", amount: 840.00, type: "credit", category: "investment", paymentMethod: "wire_transfer", date: "Jun 25", createdAt: "2024-06-25" },
  { id: "t8", userId: "u3", userName: "Alexis Kim", description: "Gas & Electric", amount: 198.40, type: "debit", category: "rent", paymentMethod: "mobile_payment", date: "Jun 28", createdAt: "2024-06-28" },
];

export const mockExpenses: Expense[] = [
  { id: "e1", userId: "u1", description: "Monthly rent", amount: 45676.90, category: "rent", paymentMethod: "check", date: "2024-06-01", createdAt: "2024-06-01" },
  { id: "e2", userId: "u1", description: "Weekly groceries", amount: 45676.90, category: "groceries", paymentMethod: "cash", date: "2024-06-05", createdAt: "2024-06-05" },
  { id: "e3", userId: "u1", description: "Loan repayment", amount: 98676.90, category: "debt", paymentMethod: "wire_transfer", date: "2024-06-10", createdAt: "2024-06-10" },
  { id: "e4", userId: "u1", description: "Software subscriptions", amount: 11676.90, category: "subscriptions", paymentMethod: "mobile_payment", date: "2024-06-15", createdAt: "2024-06-15" },
  { id: "e5", userId: "u1", description: "Savings deposit", amount: 55676.90, category: "savings", paymentMethod: "wire_transfer", date: "2024-06-20", createdAt: "2024-06-20" },
];

export const mockIncome: Income[] = [
  { id: "i1", userId: "u1", source: "salary", description: "Monthly salary", amount: 15300, date: "2024-07-01", recurring: true, createdAt: "2024-07-01" },
  { id: "i2", userId: "u1", source: "freelance", description: "Design project", amount: 9750, date: "2024-07-10", recurring: false, createdAt: "2024-07-10" },
  { id: "i3", userId: "u1", source: "investment", description: "Stock dividends", amount: 11200, date: "2024-07-15", recurring: false, createdAt: "2024-07-15" },
];

export const mockBudgets: Budget[] = [
  { id: "b1", userId: "u1", category: "rent", limit: 50000, spent: 45676.90, period: "monthly", startDate: "2024-06-01", endDate: "2024-06-30" },
  { id: "b2", userId: "u1", category: "groceries", limit: 60000, spent: 45676.90, period: "monthly", startDate: "2024-06-01", endDate: "2024-06-30" },
  { id: "b3", userId: "u1", category: "debt", limit: 100000, spent: 98676.90, period: "monthly", startDate: "2024-06-01", endDate: "2024-06-30" },
  { id: "b4", userId: "u1", category: "subscriptions", limit: 15000, spent: 11676.90, period: "monthly", startDate: "2024-06-01", endDate: "2024-06-30" },
  { id: "b5", userId: "u1", category: "savings", limit: 60000, spent: 55676.90, period: "monthly", startDate: "2024-06-01", endDate: "2024-06-30" },
];

export const dashboardStats = {
  totalRevenue: { value: 19270.56, trend: 8 },
  totalSaving: { value: 19270.56, trend: 8 },
  monthlyExpense: { value: 19270.56, trend: -8 },
};

export const budgetUsage = {
  total: 50734,
  unused: 50,
  used: 30,
  reserved: 20,
};

export const incomeSources = {
  total: 60764,
  june: 30732,
  july: 30032,
  breakdown: [
    { source: "Salary", amount: 15300, icon: "briefcase" },
    { source: "Freelance", amount: 9750, icon: "laptop" },
    { source: "Investment", amount: 11200, icon: "trending-up" },
  ],
};

export const revenueChartData = [
  { month: "Jan", value: 12000 },
  { month: "Feb", value: 15000 },
  { month: "Mar", value: 11000 },
  { month: "Apr", value: 18000 },
  { month: "May", value: 14000 },
  { month: "Jun", value: 19270 },
  { month: "Jul", value: 17000 },
];

export const expenseChartData = [
  { category: "Rent & Utilities", amount: 45676.90, color: "#C6FF00" },
  { category: "Groceries", amount: 45676.90, color: "#f59e0b" },
  { category: "Debt Repayment", amount: 98676.90, color: "#3b82f6" },
  { category: "Subscriptions", amount: 11676.90, color: "#7C3AED" },
  { category: "Savings Account", amount: 55676.90, color: "#10b981" },
];
