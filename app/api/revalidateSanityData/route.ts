import { revalidateTag } from 'next/cache';
import { type NextRequest, NextResponse } from 'next/server';
import { parseBody } from 'next-sanity/webhook';

export async function POST(req: NextRequest) {
  const { body, isValidSignature } = await parseBody<{
    _type: string;
  } | null>(req, process.env.NEXT_PUBLIC_SANITY_HOOK_SECRET);

  if (!isValidSignature) {
    return NextResponse.json({ message: 'Invalid Signature' }, { status: 401 });
  }

  if (!body?._type) {
    return NextResponse.json({ message: 'Bad Request' }, { status: 400 });
  }

  try {
    revalidateTag(body._type);
    return NextResponse.json({
      revalidated: true,
      now: Date.now(),
    });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
