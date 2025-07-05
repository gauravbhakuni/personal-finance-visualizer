export const dynamic = 'force-dynamic';

import { connectDB } from '@/lib/db';
import { Transaction } from '@/models/Transaction';
import { NextResponse } from 'next/server';

function getIdFromUrl(url: string): string | undefined {
  const parts = url.split('/');
  return parts[parts.length - 1] || undefined;
}

export async function PUT(req: Request): Promise<NextResponse> {
  try {
    const body = await req.json();
    await connectDB();
    const id = getIdFromUrl(req.url);
    if (!id) {
      return NextResponse.json(
        { message: 'Missing transaction id' },
        { status: 400 }
      );
    }
    const updated = await Transaction.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json(
      { message: 'Error updating transaction', error },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request): Promise<NextResponse> {
  try {
    await connectDB();
    const id = getIdFromUrl(req.url);
    if (!id) {
      return NextResponse.json(
        { message: 'Missing transaction id' },
        { status: 400 }
      );
    }
    await Transaction.findByIdAndDelete(id);
    return NextResponse.json({ message: 'Transaction deleted' });
  } catch (error) {
    return NextResponse.json(
      { message: 'Error deleting transaction', error },
      { status: 500 }
    );
  }
}
