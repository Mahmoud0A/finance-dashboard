import { NextResponse } from 'next/server';
import { getDashboardSummary, CURRENT_MONTH } from '@/lib/mockData';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const month = searchParams.get('month') || CURRENT_MONTH;
  if (!/^\d{4}-\d{2}$/.test(month)) {
    return NextResponse.json({ error: 'Invalid month. Expected YYYY-MM.' }, { status: 400 });
  }
  return NextResponse.json(getDashboardSummary(month));
}
