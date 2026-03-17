export interface StatementEntry {
  date: string;
  type: string;
  referenceId: string;
  description: string;
  debit: number;
  credit: number;
  balance: number;
}

export interface CustomerStatement {
  customer: {
    _id: string;
    name: string;
  };

  openingBalance: number;
  closingBalance: number;

  statement: StatementEntry[];
}