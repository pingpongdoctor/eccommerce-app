import { draftMode } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export function GET(request: NextRequest) {
  draftMode().disable();
  const url = request.nextUrl;
  return NextResponse.redirect(new URL('/', url.origin));
}
