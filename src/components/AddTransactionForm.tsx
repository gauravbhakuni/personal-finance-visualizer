"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
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
        <Label>Amount</Label>
        <Input
          name="amount"
          type="number"
          value={formData.amount}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label>Description</Label>
        <Input
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label>Category</Label>
        <Input
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label>Date</Label>
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
