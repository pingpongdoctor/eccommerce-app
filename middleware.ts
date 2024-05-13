import {
  withMiddlewareAuthRequired,
  getSession,
} from '@auth0/nextjs-auth0/edge';
import { NextRequest, NextResponse } from 'next/server';

export default withMiddlewareAuthRequired(async function middleware(
  req: NextRequest
) {
  const session = await getSession();

  //redirect user to login page if they are not authenticated
  if (!session) {
    return NextResponse.redirect(new URL('/api/auth/login', req.url));
  }

  //if user is authenticated, check if they are admin
  const isAdmin: boolean | undefined =
    session.user?.[process.env.AUTH0_CUSTOM_ROLE_CLAIM as string].includes(
      'admin'
    );

  //check if isAdmin claim is available
  if (isAdmin === undefined) {
    console.log('Error No isAdmin claim available in Auth0 user object ');
  }

  //if isAdmin is undefined or false when user try to access admin page and studio page, redirect them to homepage
  if (
    !isAdmin &&
    (req.nextUrl.pathname.startsWith('/admin') ||
      req.nextUrl.pathname.startsWith('/studio'))
  ) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  //if user is admin and try to access /order-history route, redirect user to the /admin route
  // if (isAdmin && req.nextUrl.pathname.startsWith('/order-history')) {
  //   return NextResponse.redirect(new URL('/admin', req.url));
  // }
});

export const config = {
  matcher: [
    '/admin/:path*',
    '/order-history',
    '/shopping-cart',
    '/studio',
    '/checkout',
  ],
};
