import { NextResponse } from 'next/server';
import sgMail from '@sendgrid/mail';
import { headers } from 'next/headers';

sgMail.setApiKey(process.env.SENGRID_API_KEY as string);

export async function POST(req: Request) {
  const headerList = headers();
  const key = headerList.get('Authorization')?.split(' ')[1];

  if (key !== process.env.ROUTE_API_KEY) {
    return NextResponse.json({ message: 'Wrong api key' }, { status: 401 });
  }

  const { from, to, subject, recipient_name }: { [index: string]: string } =
    await req.json();

  if (!from || !to || !subject || !recipient_name) {
    return NextResponse.json(
      { message: 'Miss required data' },
      { status: 400 }
    );
  }

  const msg = {
    to,
    from,
    templateId: process.env.SENGRID_TEMPLATE_ID_WELCOME as string,
    dynamicTemplateData: {
      subject,
      recipient_name,
    },
  };

  try {
    await sgMail.send(msg);
    return NextResponse.json(
      { message: 'email has been sent' },
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
