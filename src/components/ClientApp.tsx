'use client';

import { useEffect, useState } from 'react';
import AddTransactionForm from './AddTransactionForm';
import TransactionList from './TransactionList';
import { TransactionType } from '@/types';
import MonthlyBarChart from './MonthlyBarChart';

export default function ClientApp() {
  const [transactions, setTransactions] = useState<TransactionType[]>([]);

  const fetchTransactions = async () => {
    const res = await fetch('/api/transactions');
    const data = await res.json();
    setTransactions(data);
  };

  const handleAdd = () => fetchTransactions();
  const handleDelete = async (id: string) => {
    await fetch(`/api/transactions/${id}`, { method: 'DELETE' });
    fetchTransactions();
  };

  const handleEdit = (updated: TransactionType) => {
    setTransactions((prev) =>
      prev.map((tx) => (tx._id === updated._id ? updated : tx))
    );
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div>
      <AddTransactionForm onAdd={handleAdd} />
      <TransactionList
        transactions={transactions}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
      <MonthlyBarChart transactions={transactions} />
    </div>
  );
}
