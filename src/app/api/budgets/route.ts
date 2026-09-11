import { NextResponse } from 'next/server';
import { mockBudgets } from '@/lib/mockData';

export async function GET() {
  return NextResponse.json(mockBudgets);
}
