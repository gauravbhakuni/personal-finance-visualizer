import { TransactionType } from "@/types";

export default function SpendingInsights({
  transactions,
  budgets,
}: {
  transactions: TransactionType[];
  budgets: { category: string; amount: number; month: string }[];
}) {
  const currentMonth = new Date().toISOString().slice(0, 7);
  const actualMap: Record<string, number> = {};

  transactions.forEach((tx) => {
    const month = tx.date.slice(0, 7);
    if (month === currentMonth) {
      actualMap[tx.category] = (actualMap[tx.category] || 0) + tx.amount;
    }
  });

  return (
    <div className="bg-neutral-900 rounded-xl p-6 mt-6 space-y-2">
      <h2 className="text-lg text-white font-semibold">Insights</h2>
      {budgets
        .filter((b) => b.month === currentMonth)
        .map((b) => {
          const spent = actualMap[b.category] || 0;
          const diff = spent - b.amount;

          if (diff > 0) {
            return (
              <p key={b.category} className="text-red-400">
                ⚠️ Over budget in <b>{b.category}</b> by ₹{diff}
              </p>
            );
          } else if (spent === 0) {
            return (
              <p key={b.category} className="text-yellow-400">
                ⏳ No spending yet in <b>{b.category}</b>
              </p>
            );
          } else {
            return (
              <p key={b.category} className="text-green-400">
                ✅ You&apos;re within budget for <b>{b.category}</b> (₹{spent}/₹{b.amount})
              </p>
            );
          }
        })}
    </div>
  );
}
