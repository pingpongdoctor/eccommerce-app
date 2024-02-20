import { NextResponse } from 'next/server';
import sgMail from '@sendgrid/mail';
import { emailTemplates, templateEnvs } from '@/app/utils/utils';

sgMail.setApiKey(process.env.SENGRID_API_KEY as string);

export async function POST(req: Request) {
  const {
    from,
    to,
    template,
    recipient_name,
    ammount,
  }: {
    [index: string]: string | number;
    from: string;
    to: string;
    template: string;
    recipient_name: string;
    ammount: number;
  } = await req.json();

  if (!from || !to || !template || !recipient_name || !ammount) {
    return NextResponse.json(
      { message: 'Miss required data' },
      { status: 400 }
    );
  }

  if (!emailTemplates.includes(template as EmailTemplates)) {
    return NextResponse.json({ message: 'Wrong Template' }, { status: 400 });
  }

  const msg = {
    to,
    from,
    templateId: process.env[
      templateEnvs[template as keyof TemplateEnvs]
    ] as string,
    dynamicTemplateData: {
      recipient_name,
      ammount,
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
