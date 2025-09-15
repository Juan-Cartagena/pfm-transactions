import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../types';
import { AnalyticsService } from '../services/analytics.service';

export class AnalyticsController {
  private analyticsService: AnalyticsService;

  constructor() {
    this.analyticsService = new AnalyticsService();
  }

  getSummary = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const userId = req.user!.id;
      
      const summary = await this.analyticsService.getSummary(userId);
      
      res.json(summary);
    } catch (error) {
      next(error);
    }
  };
}