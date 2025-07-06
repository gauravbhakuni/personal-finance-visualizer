"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const categories = [
  "Food",
  "Transport",
  "Entertainment",
  "Health",
  "Housing",
  "Utilities",
  "Other",
];

export default function BudgetForm({ onSave }: { onSave: () => void }) {
  const [form, setForm] = useState({
    category: "",
    amount: "",
    month: new Date().toISOString().slice(0, 7),
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const amountNum = Number(form.amount);

    if (!form.category || !form.amount || !form.month) {
      setError("Please fill all fields.");
      setLoading(false);
      return;
    }

    if (isNaN(amountNum) || amountNum <= 0) {
      setError("Amount must be a number greater than 0.");
      setLoading(false);
      return;
    }

    try {
      await fetch("/api/budgets", {
        method: "POST",
        body: JSON.stringify({ ...form, amount: amountNum }),
      });
      setForm({ category: "", amount: "", month: new Date().toISOString().slice(0, 7) });
      onSave();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full">
      <h2 className="text-xl font-semibold">Set Monthly Budgets</h2>

      {/* First row: Category + Amount */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <Label>Category</Label>
          <Select
            value={form.category}
            onValueChange={(value) => setForm({ ...form, category: value })}
          >
            <SelectTrigger className="bg-neutral-800 text-black border border-neutral-700">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent className="bg-neutral-800 text-white">
              {categories.map((c) => (
                <SelectItem
                  key={c}
                  value={c}
                  className="hover:bg-neutral-700 cursor-pointer"
                >
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-2">
          <Label>Amount (₹)</Label>
          <Input
            type="number"
            placeholder="e.g. 2000"
            className="bg-neutral-900 text-black border border-neutral-700"
            value={form.amount}
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
          />
        </div>
      </div>

      {/* Second row: Month only */}
      <div className="flex flex-col gap-2">
        <Label>Month</Label>
        <Input
          type="month"
          className="bg-neutral-900 text-black border border-neutral-700 max-w-xs"
          value={form.month}
          onChange={(e) => setForm({ ...form, month: e.target.value })}
        />
      </div>

      {/* Error */}
      {error && <p className="text-red-500 text-sm">{error}</p>}

      {/* Submit Button */}
      <Button type="submit" disabled={loading}>
        {loading ? "Saving..." : "Save Budget"}
      </Button>
    </form>
  );
}
