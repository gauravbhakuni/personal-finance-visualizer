export const dynamic = 'force-dynamic';

import { connectDB } from '@/lib/db';
import { Transaction } from '@/models/Transaction';
import { NextResponse } from 'next/server';

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  try {
    const body = await req.json();
    await connectDB();
    const {id} = await params;
    // console.log(id, "----------hello----------");
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

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  try {
    await connectDB();
    const {id} = await params;
    await Transaction.findByIdAndDelete(id);
    return NextResponse.json({ message: 'Transaction deleted' });
  } catch (error) {
    return NextResponse.json(
      { message: 'Error deleting transaction', error },
      { status: 500 }
    );
  }
}
