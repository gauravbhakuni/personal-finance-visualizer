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
import { TransactionType } from "@/types";

export default function AddTransactionForm({
  onAdd,
}: {
  onAdd: (tx: TransactionType) => void;
}) {
  const [formData, setFormData] = useState({
    amount: "",
    description: "",
    category: "",
    date: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const amountValue = Number(formData.amount);

    if (
      !formData.amount ||
      !formData.description ||
      !formData.category ||
      !formData.date
    ) {
      setError("Please fill all fields.");
      setLoading(false);
      return;
    }

    if (isNaN(amountValue) || amountValue <= 0) {
      setError("Amount must be greater than 0.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/transactions", {
        method: "POST",
        body: JSON.stringify({
          ...formData,
          amount: amountValue,
        }),
      });

      const data = await res.json();
      onAdd(data);
      setFormData({ amount: "", description: "", category: "", date: "" });
    } catch {
      setError("Failed to add transaction.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Add New Transaction</h1>
      <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
        <div>
          <Label className="mb-3">Amount (₹)</Label>
          <Input
            name="amount"
            placeholder="e.g. 1000"
            type="number"
            value={formData.amount}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label className="mb-3">Description</Label>
          <Input
            name="description"
            type="text"
            placeholder="e.g. Groceries, Rent"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label className="mb-3">Category</Label>
          <Select
            value={formData.category}
            onValueChange={(value) =>
              setFormData({ ...formData, category: value })
            }
          >
            <SelectTrigger className="bg-neutral-800 text-black border border-neutral-700">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent className="bg-neutral-800 text-white border border-neutral-700">
              {["Food", "Transport", "Entertainment", "Health", "Housing", "Utilities", "Other"].map((c) => (
                <SelectItem key={c} value={c} className="hover:bg-neutral-700">
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="mb-3">Date</Label>
          <Input
            name="date"
            type="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <Button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Transaction"}
        </Button>
      </form>
    </div>
  );
}
