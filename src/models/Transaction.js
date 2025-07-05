import mongoose from 'mongoose';

const TransactionSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      default: 'Uncategorized',
    },
    date: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Avoid model overwrite in dev
export const Transaction =
  mongoose.models.Transaction || mongoose.model('Transaction', TransactionSchema);
