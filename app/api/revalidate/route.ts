import { type NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';
export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const tag = searchParams.get('tag');

  if (!tag) {
    return NextResponse.json(
      { message: 'Missed required query' },
      { status: 400 }
    );
  }

  try {
    revalidateTag(tag);
    return NextResponse.json(
      { message: 'successful revalidation' },
      { status: 200 }
    );
  } catch (err: any) {
    console.log('Internal server error' + err);
    return NextResponse.json(
      { message: err.message },
      { status: err.statusCode || 500 }
    );
  }
}
