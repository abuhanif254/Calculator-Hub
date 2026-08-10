export const runtime = 'edge';
import { NextRequest, NextResponse } from 'next/server';


export async function POST(req: NextRequest) {
  return NextResponse.json(
    { 
      success: false, 
      error: 'The website screenshot feature is temporarily disabled because it is incompatible with Cloudflare Pages Edge Runtime.' 
    }, 
    { status: 501 }
  );
}
