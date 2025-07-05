'use client';

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { TransactionType } from '@/types';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#FF8042', '#00C49F', '#FFBB28', '#FF6384'];

function getCategoryData(transactions: TransactionType[]) {
  const map: Record<string, number> = {};
  transactions.forEach((tx) => {
    map[tx.category] = (map[tx.category] || 0) + tx.amount;
  });

  return Object.entries(map).map(([name, value]) => ({ name, value }));
}

export default function CategoryPieChart({ transactions }: { transactions: TransactionType[] }) {
  const data = getCategoryData(transactions);

  if (data.length === 0) return null;

  return (
    <div className="mt-10 max-w-xl">
      <h2 className="text-xl font-semibold mb-4">Expenses by Category</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100}>
            {data.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
