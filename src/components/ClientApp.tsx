"use client";

import { useEffect, useState } from "react";
import AddTransactionForm from "./AddTransactionForm";
import TransactionList from "./TransactionList";
import { TransactionType } from "@/types";
import MonthlyBarChart from "./MonthlyBarChart";
import SummaryDashboard from "./SummaryDashboard";
import CategoryPieChart from "./CategoryPieChart";
import { Skeleton } from "@/components/ui/skeleton";
import BudgetForm from "./BudgetForm";
import BudgetBarChart from "./BudgetBarChart";
import SpendingInsights from "./SpendingInsights";

export default function ClientApp() {
  const [transactions, setTransactions] = useState<TransactionType[]>([]);
  const [loading, setLoading] = useState(true);
  const [budgets, setBudgets] = useState([]);
  const fetchBudgets = async () => {
    const res = await fetch("/api/budgets");
    const data = await res.json();
    setBudgets(data);
  };

  const fetchTransactions = async () => {
    setLoading(true);
    const res = await fetch("/api/transactions");
    const data = await res.json();
    setTransactions(data);
    setLoading(false);
  };

  const handleAdd = () => fetchTransactions();
  const handleDelete = async (id: string) => {
    await fetch(`/api/transactions/${id}`, { method: "DELETE" });
    fetchTransactions();
  };

  const handleEdit = (updated: TransactionType) => {
    setTransactions((prev) =>
      prev.map((tx) => (tx._id === updated._id ? updated : tx))
    );
  };

  useEffect(() => {
    fetchTransactions();
    fetchBudgets();
  }, []);

  return (
    <div className="min-h-screen bg-white text-black px-4 py-10">
      {/* Add Transaction Form */}
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6 mb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AddTransactionForm onAdd={handleAdd} />
          <BudgetForm onSave={fetchBudgets} />
        </div>
      </div>

      {loading ? (
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          <Skeleton className="h-72 rounded-xl" />
          <Skeleton className="h-72 rounded-xl" />
          <Skeleton className="h-[300px] col-span-2 rounded-xl" />
        </div>
      ) : (
        <div className="max-w-6xl mx-auto space-y-10">
          {/* Transaction List + Summary */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6">
              <TransactionList
                transactions={transactions}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            </div>
            <div className="bg-white rounded-xl p-6">
              <SummaryDashboard transactions={transactions} />
            </div>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <MonthlyBarChart transactions={transactions} />
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6">
              <CategoryPieChart transactions={transactions} />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <BudgetBarChart transactions={transactions} budgets={budgets} />
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6">
              <SpendingInsights transactions={transactions} budgets={budgets} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
