import { Request, Response } from 'express';

export class HealthController {
  checkHealth = (req: Request, res: Response) => {
    res.json({
      status: 'healthy',
      service: 'transactions-service',
      timestamp: new Date().toISOString(),
    });
  };
}