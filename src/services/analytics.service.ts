import prisma from '../utils/prisma';
import { AnalyticsSummary } from '../types';
import { Prisma } from '@prisma/client';

export class AnalyticsService {
  async getSummary(userId: string): Promise<AnalyticsSummary> {
    const transactions = await prisma.transaction.findMany({
      where: { userId },
    });

    let totalIncome = new Prisma.Decimal(0);
    let totalExpense = new Prisma.Decimal(0);
    const expensesByCategory: Record<string, number> = {};

    transactions.forEach(transaction => {
      if (transaction.type === 'INCOME') {
        totalIncome = totalIncome.add(transaction.amount);
      } else {
        totalExpense = totalExpense.add(transaction.amount);
        
        const category = transaction.category;
        expensesByCategory[category] = 
          (expensesByCategory[category] || 0) + Number(transaction.amount);
      }
    });

    const balance = totalIncome.sub(totalExpense);

    return {
      totalIncome: Number(totalIncome),
      totalExpense: Number(totalExpense),
      balance: Number(balance),
      expensesByCategory,
    };
  }
}