import { NextResponse } from 'next/server';
import { getDashboardSummary } from '@/lib/mockData';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const period = searchParams.get('period') || 'month';
  return NextResponse.json(getDashboardSummary(period));
}
