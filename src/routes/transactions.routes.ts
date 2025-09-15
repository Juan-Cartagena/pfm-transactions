import { Router } from 'express';
import { TransactionsController } from '../controllers/transactions.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();
const controller = new TransactionsController();

router.post('/', authMiddleware, controller.createTransaction);
router.get('/', authMiddleware, controller.getTransactions);
router.get('/:id', authMiddleware, controller.getTransactionById);
router.put('/:id', authMiddleware, controller.updateTransaction);
router.delete('/:id', authMiddleware, controller.deleteTransaction);

export default router;