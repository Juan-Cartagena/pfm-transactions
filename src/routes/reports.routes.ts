import { Router } from 'express';
import { ReportsController } from '../controllers/reports.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();
const controller = new ReportsController();

router.post('/csv', authMiddleware, controller.generateCSVReport);

export default router;