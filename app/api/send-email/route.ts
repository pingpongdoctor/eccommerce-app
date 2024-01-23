import { NextResponse } from 'next/server';
import sgMail from '@sendgrid/mail';
import { emailTemplates, templateEnvs } from '@/app/utils/utils';

sgMail.setApiKey(process.env.SENGRID_API_KEY as string);

export async function POST(req: Request) {
  const {
    from,
    to,
    template,
    subject,
    recipient_name,
  }: { [index: string]: string } = await req.json();

  if (!from || !to || !template || !subject || !recipient_name) {
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
  } catch (e: any) {
    console.log('Internal Sever Error' + e);
    return NextResponse.json(
      { message: 'Internal Sever Error' + ' ' + e.message },
      { status: 500 }
    );
  }
}
