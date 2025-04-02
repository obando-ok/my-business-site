import { Resend } from 'resend';
import type { NextApiRequest, NextApiResponse } from 'next';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { name, email, message } = req.body;

  try {
    const response = await resend.emails.send({
      from: 'onboarding@resend.dev', // sandbox sender
      to: ['adambkd@hotmail.com'],
      subject: `New message from ${name}`,
      replyTo: email,
      text: message,
    });

    return res.status(200).json({ success: true, data: response });
  } catch (error) {
    console.error('Resend Error:', error);
    return res.status(500).json({ error: 'Email failed to send.' });
  }
}
