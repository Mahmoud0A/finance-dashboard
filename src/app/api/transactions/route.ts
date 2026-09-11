import { NextResponse } from 'next/server';
import { mockTransactions, addTransaction } from '@/lib/mockData';
import { transactionSchema } from '@/features/transactions/schemas/transactionSchema';

export async function GET() {
  return NextResponse.json(mockTransactions);
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }
  const parsed = transactionSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Validation failed.', issues: parsed.error.issues },
      { status: 400 },
    );
  }
  const created = addTransaction(parsed.data);
  return NextResponse.json(created, { status: 201 });
}
