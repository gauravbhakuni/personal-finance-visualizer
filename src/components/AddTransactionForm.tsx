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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.amount || Number(formData.amount) <= 0) {
      alert("Amount must be greater than 0");
      return;
    }
    if (!formData.description || !formData.category || !formData.date) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await fetch("/api/transactions", {
        method: "POST",
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      onAdd(data);
      setFormData({ amount: "", description: "", category: "", date: "" });
    } catch (error) {
      console.error("Add failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
      <div>
        <Label className="mb-3">Amount</Label>
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
          <SelectTrigger>
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Food">Food</SelectItem>
            <SelectItem value="Transport">Transport</SelectItem>
            <SelectItem value="Entertainment">Entertainment</SelectItem>
            <SelectItem value="Health">Health</SelectItem>
            <SelectItem value="Housing">Housing</SelectItem>
            <SelectItem value="Utilities">Utilities</SelectItem>
            <SelectItem value="Other">Other</SelectItem>
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
      <Button type="submit" disabled={loading}>
        {loading ? "Adding..." : "Add Transaction"}
      </Button>
    </form>
  );
}
