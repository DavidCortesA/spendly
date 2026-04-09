export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  currency: string;
  createdAt: string;
}

export interface Transaction {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  description: string;
  amount: number;
  type: "debit" | "credit";
  category: string;
  paymentMethod: string;
  date: string;
  createdAt: string;
}
