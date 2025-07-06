'use client';

import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TransactionType } from '@/types';

type Budget = {
  category: string;
  amount: number;
  month: string;
};

export default function BudgetBarChart({
  transactions,
  budgets,
}: {
  transactions: TransactionType[];
  budgets: Budget[];
}) {
  const currentMonth = new Date().toISOString().slice(0, 7);

  const actualMap = transactions.reduce((acc, tx) => {
    const month = tx.date.slice(0, 7);
    if (month === currentMonth) {
      acc[tx.category] = (acc[tx.category] || 0) + tx.amount;
    }
    return acc;
  }, {} as Record<string, number>);

  const chartData = budgets
    .filter((b) => b.month === currentMonth)
    .map((b) => ({
      category: b.category,
      budget: b.amount,
      actual: actualMap[b.category] || 0,
    }));

  if (chartData.length === 0) return null;

  return (
    <div className="mt-10">
      <h2 className="text-xl font-semibold mb-4">Budget vs Actual</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="budget" fill="#8884d8" name="Budget" />
          <Bar dataKey="actual" fill="#82ca9d" name="Actual" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
