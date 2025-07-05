export const dynamic = 'force-dynamic';

import { connectDB } from '@/lib/db';
import { Transaction } from '@/models/Transaction';
import { NextResponse } from 'next/server';

type Params = {
  params: {
    id: string;
  };
};

export async function DELETE(
  req: Request,
  { params }: Params
): Promise<NextResponse> {
  try {
    await connectDB();
    await Transaction.findByIdAndDelete(params.id);
    return NextResponse.json({ message: 'Transaction deleted' });
  } catch (error) {
    return NextResponse.json(
      { message: 'Error deleting transaction', error },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  { params }: Params
): Promise<NextResponse> {
  try {
    const body = await req.json();
    await connectDB();
    const updated = await Transaction.findByIdAndUpdate(params.id, body, {
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
