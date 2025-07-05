'use client';

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { TransactionType } from '@/types';

function groupByMonth(transactions: TransactionType[]) {
  const monthly: Record<string, number> = {};

  transactions.forEach((tx) => {
    const month = new Date(tx.date).toLocaleString('default', { month: 'short', year: 'numeric' });
    monthly[month] = (monthly[month] || 0) + tx.amount;
  });

  return Object.entries(monthly).map(([month, total]) => ({ month, total }));
}

export default function MonthlyBarChart({ transactions }: { transactions: TransactionType[] }) {
  const data = groupByMonth(transactions);

  if (data.length === 0) return null;

  return (
    <div className="mt-10 max-w-2xl">
      <h2 className="text-xl font-semibold mb-4">Monthly Expenses</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="total" fill="#3b82f6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
