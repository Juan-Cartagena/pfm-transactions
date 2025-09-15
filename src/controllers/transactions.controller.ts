import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../types';
import { TransactionsService } from '../services/transactions.service';
import { createTransactionSchema, updateTransactionSchema, transactionFiltersSchema } from '../utils/validators';
import { AppError } from '../middleware/error.middleware';

export class TransactionsController {
  private transactionsService: TransactionsService;

  constructor() {
    this.transactionsService = new TransactionsService();
  }

  createTransaction = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const userId = req.user!.id;
      const validatedData = createTransactionSchema.parse(req.body);
      
      const transaction = await this.transactionsService.createTransaction(userId, validatedData);
      
      res.status(201).json(transaction);
    } catch (error) {
      next(error);
    }
  };

  getTransactions = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const userId = req.user!.id;
      const filters = transactionFiltersSchema.parse(req.query);
      
      const transactions = await this.transactionsService.getTransactions(userId, filters);
      
      res.json(transactions);
    } catch (error) {
      next(error);
    }
  };

  getTransactionById = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const userId = req.user!.id;
      const { id } = req.params;
      
      const transaction = await this.transactionsService.getTransactionById(id, userId);
      
      if (!transaction) {
        throw new AppError(404, 'Transaction not found');
      }
      
      res.json(transaction);
    } catch (error) {
      next(error);
    }
  };

  updateTransaction = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const userId = req.user!.id;
      const { id } = req.params;
      const validatedData = updateTransactionSchema.parse(req.body);
      
      const transaction = await this.transactionsService.updateTransaction(id, userId, validatedData);
      
      if (!transaction) {
        throw new AppError(404, 'Transaction not found');
      }
      
      res.json(transaction);
    } catch (error) {
      next(error);
    }
  };

  deleteTransaction = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const userId = req.user!.id;
      const { id } = req.params;
      
      const transaction = await this.transactionsService.deleteTransaction(id, userId);
      
      if (!transaction) {
        throw new AppError(404, 'Transaction not found');
      }
      
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };
}