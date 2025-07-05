'use client';

import { TransactionType } from '@/types';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Props {
  transactions: TransactionType[];
  onDelete: (id: string) => void;
  onEdit: (updated: TransactionType) => void;
}

export default function TransactionList({ transactions, onDelete, onEdit }: Props) {
  const [editId, setEditId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<TransactionType>>({});

  const handleEdit = (tx: TransactionType) => {
    setEditId(tx._id!);
    setEditData({
      amount: tx.amount,
      description: tx.description,
      category: tx.category,
      date: tx.date.slice(0, 10),
    });
  };

  const handleUpdate = async () => {
    const res = await fetch(`/api/transactions/${editId}`, {
      method: 'PUT',
      body: JSON.stringify(editData),
    });
    const updated = await res.json();
    onEdit(updated);
    setEditId(null);
  };

  return (
    <div className="mt-6 max-w-2xl">
      <h2 className="text-3xl font-bold mb-4">Transactions</h2>
      <div className="max-h-[400px] overflow-y-auto pr-2 custom-scroll">
        <ul className="space-y-2">
          {transactions.map((tx) =>
            editId === tx._id ? (
              <li key={tx._id} className="border p-4 rounded-lg">
                <div className="space-y-2">
                  <Input
                    type="number"
                    value={editData.amount}
                    onChange={(e) =>
                      setEditData({ ...editData, amount: Number(e.target.value) })
                    }
                  />
                  <Input
                    value={editData.description}
                    onChange={(e) =>
                      setEditData({ ...editData, description: e.target.value })
                    }
                  />
                  <Input
                    value={editData.category}
                    onChange={(e) =>
                      setEditData({ ...editData, category: e.target.value })
                    }
                  />
                  <Input
                    type="date"
                    value={editData.date}
                    onChange={(e) =>
                      setEditData({ ...editData, date: e.target.value })
                    }
                  />
                  <div className="flex gap-2">
                    <Button size="sm" onClick={handleUpdate}>
                      Save
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => setEditId(null)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              </li>
            ) : (
              <li key={tx._id} className="border p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{tx.description}</p>
                    <p className="text-sm text-muted-foreground">
                      ₹{tx.amount} • {tx.category} •{' '}
                      {new Date(tx.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button className='cursor-pointer' size="sm" variant="default" onClick={() => handleEdit(tx)}>
                      Edit
                    </Button>
                    <Button className='cursor-pointer'
                      size="sm"
                      variant="destructive"
                      onClick={() => onDelete(tx._id!)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </li>
            )
          )}
        </ul>
      </div>
    </div>
  );
}
