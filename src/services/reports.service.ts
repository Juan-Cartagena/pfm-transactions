import { createObjectCsvStringifier } from 'csv-writer';
import { TransactionsService } from './transactions.service';
import { TransactionFilters } from '../types';

export class ReportsService {
  private transactionsService: TransactionsService;

  constructor() {
    this.transactionsService = new TransactionsService();
  }

  async generateCSVReport(userId: string, filters: TransactionFilters): Promise<string> {
    const transactions = await this.transactionsService.getTransactions(userId, filters);

    const csvStringifier = createObjectCsvStringifier({
      header: [
        { id: 'date', title: 'Date' },
        { id: 'type', title: 'Type' },
        { id: 'category', title: 'Category' },
        { id: 'description', title: 'Description' },
        { id: 'amount', title: 'Amount' },
      ],
    });

    const records = transactions.map(transaction => ({
      date: transaction.date.toISOString().split('T')[0],
      type: transaction.type,
      category: transaction.category,
      description: transaction.description,
      amount: transaction.amount.toString(),
    }));

    const header = csvStringifier.getHeaderString();
    const body = csvStringifier.stringifyRecords(records);

    return header + body;
  }
}