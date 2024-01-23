import { revalidateTag } from 'next/cache';
import { type NextRequest, NextResponse } from 'next/server';
import { parseBody } from 'next-sanity/webhook';

export async function POST(req: NextRequest) {
  const { body, isValidSignature } = await parseBody<{
    _type: string;
  } | null>(req, process.env.NEXT_PUBLIC_SANITY_HOOK_SECRET);

  if (!isValidSignature) {
    return new Response('Invalid Signature', { status: 401 });
  }

  if (!body?._type) {
    return new Response('Bad Request', { status: 400 });
  }

  try {
    revalidateTag(body._type);
    return NextResponse.json({
      status: 200,
      revalidated: true,
      now: Date.now(),
      body,
    });
  } catch (error: any) {
    console.error(error);
    return new Response(error.message, { status: 500 });
  }
}
