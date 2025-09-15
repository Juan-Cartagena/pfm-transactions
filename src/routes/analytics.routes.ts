import { Router } from 'express';
import { AnalyticsController } from '../controllers/analytics.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();
const controller = new AnalyticsController();

router.get('/summary', authMiddleware, controller.getSummary);

export default router;