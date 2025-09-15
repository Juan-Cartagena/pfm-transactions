import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../types';
import { ReportsService } from '../services/reports.service';
import { reportFiltersSchema } from '../utils/validators';

export class ReportsController {
  private reportsService: ReportsService;

  constructor() {
    this.reportsService = new ReportsService();
  }

  generateCSVReport = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const userId = req.user!.id;
      const filters = reportFiltersSchema.parse(req.body);
      
      const csvContent = await this.reportsService.generateCSVReport(userId, filters);
      
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', 'attachment; filename="transactions-report.csv"');
      res.send(csvContent);
    } catch (error) {
      next(error);
    }
  };
}