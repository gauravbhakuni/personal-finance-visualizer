import { Card, CardContent } from '@/components/ui/card';
import { TransactionType } from '@/types';

export default function SummaryDashboard({ transactions }: { transactions: TransactionType[] }) {
  const total = transactions.reduce((sum, tx) => sum + tx.amount, 0);
  const mostRecent = transactions.slice(0, 3);
  const topCategory = Object.entries(
    transactions.reduce((acc, tx) => {
      acc[tx.category] = (acc[tx.category] || 0) + tx.amount;
      return acc;
    }, {} as Record<string, number>)
  )
    .sort((a, b) => b[1] - a[1])[0]?.[0];

  return (
    <div className='mt-6'>
        <h2 className="text-3xl font-bold mb-4">Summary Dashboard</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10 max-w-5xl">
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Total Expenses</p>
              <p className="text-xl font-semibold">₹{total}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Top Category</p>
              <p className="text-xl font-semibold">{topCategory || 'N/A'}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Recent Transactions</p>
              <ul className="text-sm mt-2 space-y-1">
                {mostRecent.map((tx) => (
                  <li key={tx._id}>
                    {tx.description} - ₹{tx.amount}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
    </div>
  );
}
