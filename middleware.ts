import {
  withMiddlewareAuthRequired,
  getSession,
} from '@auth0/nextjs-auth0/edge';
import { NextRequest, NextResponse } from 'next/server';

export default withMiddlewareAuthRequired(async function middleware(
  req: NextRequest
) {
  const session = await getSession();

  const isAdmin =
    session?.user[process.env.AUTH0_CUSTOM_ROLE_CLAIM as string].includes(
      'admin'
    );

  if (!isAdmin) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  if (isAdmin && req.nextUrl.pathname.startsWith('/order-history')) {
    return NextResponse.redirect(new URL('/admin', req.url));
  }
});

export const config = {
  matcher: ['/admin/:path*', '/order-history'],
};
