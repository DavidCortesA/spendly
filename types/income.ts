export type IncomeSource = "salary" | "freelance" | "investment" | "rental" | "business" | "other";

export interface Income {
  id: string;
  userId: string;
  source: IncomeSource;
  description: string;
  amount: number;
  date: string;
  recurring: boolean;
  createdAt: string;
}

export interface IncomeSummary {
  source: IncomeSource;
  total: number;
  percentage: number;
  icon: string;
}

export interface MonthlyIncome {
  month: string;
  total: number;
  breakdown: Record<IncomeSource, number>;
}
