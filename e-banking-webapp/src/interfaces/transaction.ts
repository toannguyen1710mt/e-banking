// Interfaces
import { CurrencyUnit, Status } from '@/interfaces';

export interface Transaction {
  transactionId: string;
  transactionDate: string;
  status: Status;
  amount: number;
  currencyUnit?: CurrencyUnit;
}
