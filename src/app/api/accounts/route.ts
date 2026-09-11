import { NextResponse } from 'next/server';
import { mockAccounts } from '@/lib/mockData';

export async function GET() {
  return NextResponse.json(mockAccounts);
}
