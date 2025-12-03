// app/api/risk-prediction/route.ts

import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    const FLASK_APP4 = process.env.NEXT_PUBLIC_FLASK_APP4!;

    const response = await fetch(`${FLASK_APP4}/api/predict`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });


    const result = await response.json();
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error in /api/risk-prediction:', error);
    return NextResponse.json(
      { error: 'Failed to fetch prediction from Flask server' },
      { status: 500 }
    );
  }
}
