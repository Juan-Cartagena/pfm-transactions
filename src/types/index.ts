import { Request } from 'express';

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
  };
}

export interface CreateTransactionDTO {
  type: 'INCOME' | 'EXPENSE';
  amount: number;
  description: string;
  category: string;
  date: string;
}

export interface UpdateTransactionDTO {
  type?: 'INCOME' | 'EXPENSE';
  amount?: number;
  description?: string;
  category?: string;
  date?: string;
}

export interface TransactionFilters {
  startDate?: string;
  endDate?: string;
  type?: 'INCOME' | 'EXPENSE';
}

export interface AnalyticsSummary {
  totalIncome: number;
  totalExpense: number;
  balance: number;
  expensesByCategory: Record<string, number>;
}