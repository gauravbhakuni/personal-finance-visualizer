export interface TransactionType {
  _id?: string;
  amount: number;
  description: string;
  category: string;
  date: string; // ISO string
  createdAt?: string;
  updatedAt?: string;
}
