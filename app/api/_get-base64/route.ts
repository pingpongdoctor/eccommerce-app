import { type NextRequest, NextResponse } from 'next/server';
import { getPlaiceholder } from 'plaiceholder';

export async function GET(req: NextRequest) {
  // const searchParams = req.nextUrl.searchParams;
  // const src = searchParams.get('src');
  // if (!src) {
  //   return NextResponse.json(
  //     { message: 'Missed required query' },
  //     { status: 400 }
  //   );
  // }
  // try {
  //   const res = await fetch(src);
  //   const data = await res.arrayBuffer();
  //   const buffer = Buffer.from(data);
  //   const { base64 } = await getPlaiceholder(buffer);
  //   return NextResponse.json({ src: base64 }, { status: 200 });
  // } catch (error) {
  //   console.log('Internal Server Error' + error);
  //   return NextResponse.json(
  //     { message: 'Internal Server Error' },
  //     { status: 500 }
  //   );
  // }
}
