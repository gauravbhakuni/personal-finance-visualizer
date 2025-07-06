import { connectDB } from '@/lib/db';
import { Budget } from '@/models/Budget';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await connectDB();
    const budgets = await Budget.find();
    return NextResponse.json(budgets);
  } catch {
    return NextResponse.json({ error: 'Error fetching budgets' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    const budget = await Budget.create(body);
    return NextResponse.json(budget, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Error creating budget' }, { status: 500 });
  }
}
