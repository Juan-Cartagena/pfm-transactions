import prisma from '../utils/prisma';
import { CreateTransactionDTO, UpdateTransactionDTO, TransactionFilters } from '../types';
import { Prisma } from '@prisma/client';

export class TransactionsService {
  async createTransaction(userId: string, data: CreateTransactionDTO) {
    return await prisma.transaction.create({
      data: {
        userId,
        type: data.type,
        amount: new Prisma.Decimal(data.amount),
        description: data.description,
        category: data.category,
        date: new Date(data.date),
      },
    });
  }

  async getTransactions(userId: string, filters: TransactionFilters) {
    const where: any = { userId };

    if (filters.type) {
      where.type = filters.type;
    }

    if (filters.startDate || filters.endDate) {
      where.date = {};
      if (filters.startDate) {
        where.date.gte = new Date(filters.startDate);
      }
      if (filters.endDate) {
        where.date.lte = new Date(filters.endDate);
      }
    }

    return await prisma.transaction.findMany({
      where,
      orderBy: { date: 'desc' },
    });
  }

  async getTransactionById(id: string, userId: string) {
    const transaction = await prisma.transaction.findUnique({
      where: { id },
    });

    if (!transaction || transaction.userId !== userId) {
      return null;
    }

    return transaction;
  }

  async updateTransaction(id: string, userId: string, data: UpdateTransactionDTO) {
    const transaction = await this.getTransactionById(id, userId);
    
    if (!transaction) {
      return null;
    }

    const updateData: any = {};
    
    if (data.type !== undefined) updateData.type = data.type;
    if (data.amount !== undefined) updateData.amount = new Prisma.Decimal(data.amount);
    if (data.description !== undefined) updateData.description = data.description;
    if (data.category !== undefined) updateData.category = data.category;
    if (data.date !== undefined) updateData.date = new Date(data.date);

    return await prisma.transaction.update({
      where: { id },
      data: updateData,
    });
  }

  async deleteTransaction(id: string, userId: string) {
    const transaction = await this.getTransactionById(id, userId);
    
    if (!transaction) {
      return null;
    }

    return await prisma.transaction.delete({
      where: { id },
    });
  }
}