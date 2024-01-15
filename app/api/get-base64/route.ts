import { type NextRequest, NextResponse } from 'next/server';
import { toBase64 } from '@rossbob/image-to-base64';

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const src = searchParams.get('src');
  if (!src) {
    return NextResponse.json(
      { message: 'Missed required query' },
      { status: 400 }
    );
  }
  try {
    const base64 = await toBase64({ uri: src });
    return NextResponse.json({ src: base64 }, { status: 200 });
  } catch (error) {
    console.log('Internal Server Error' + error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
