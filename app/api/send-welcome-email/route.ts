import { NextResponse } from 'next/server';
import sgMail from '@sendgrid/mail';
import { headers } from 'next/headers';

sgMail.setApiKey(process.env.SENGRID_API_KEY as string);

export async function POST(req: Request) {
  const headerList = headers();
  const key = headerList.get('Authorization')?.split(' ')[1];

  if (key !== process.env.ROUTE_API_KEY) {
    console.log('Wrong api key');
    return NextResponse.json({ message: 'Wrong api key' }, { status: 401 });
  }

  console.log('api key is valid');

  const { from, to, subject, recipient_name }: { [index: string]: string } =
    await req.json();

  if (!from || !to || !subject || !recipient_name) {
    console.log('Miss data');
    return NextResponse.json(
      { message: 'Miss required data' },
      { status: 400 }
    );
  }

  console.log('📦 Payload received:', {
    from,
    to,
    subject,
    recipient_name,
  });

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
    console.log('📧 About to call SendGrid');
    await sgMail.send(msg);
    console.log('✅ SendGrid email sent');
    return NextResponse.json(
      { message: 'email has been sent' },
      { status: 200 }
    );
  } catch (err: any) {
    console.error('SendGrid error:', err);
    return NextResponse.json(
      { message: err.message },
      { status: err.statusCode || 500 }
    );
  }
}
