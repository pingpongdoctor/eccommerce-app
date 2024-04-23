import { SanityDocument } from 'next-sanity';
import { generateConfirmPaymentHTML } from '@/app/_lib/generateConfirmPaymentHTML';
import { NextResponse } from 'next/server';
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENGRID_API_KEY as string);

export const POST = async (req: Request) => {
  const {
    from,
    to,
    products,
    transactionNumber,
    subtotal,
    tax,
    shipping,
    total,
    expectedTime,
  }: {
    from: string;
    to: string;
    subtotal: string;
    tax: string;
    shipping: string;
    total: string;
    expectedTime: string;
    transactionNumber: string;
    products: (ProductWithImgUrl &
      SanityDocument & { productQuantity: number })[];
  } = await req.json();

  if (
    !from ||
    !to ||
    !products ||
    !subtotal ||
    !tax ||
    !shipping ||
    !total ||
    !expectedTime ||
    !transactionNumber
  ) {
    return NextResponse.json(
      { message: 'Miss required data' },
      { status: 400 }
    );
  }

  const msg = {
    to,
    from,
    subject: 'Glowy Lab Payment Information',
    html: generateConfirmPaymentHTML(
      products,
      transactionNumber,
      expectedTime,
      subtotal,
      tax,
      shipping,
      total
    ),
  };

  try {
    await sgMail.send(msg);
    return NextResponse.json({ message: 'email was sent' }, { status: 200 });
  } catch (err: any) {
    console.log('Internal server error' + err);
    return NextResponse.json(
      { message: err.message },
      { status: err.statusCode || 500 }
    );
  }
};
