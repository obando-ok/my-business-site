import type { NextApiRequest, NextApiResponse } from "next";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { name, email, message } = req.body;

    const data = await resend.emails.send({
      from: "Contact Form <onboarding@resend.dev>",
      to: "adambenkacem@hotmail.dk",
      subject: `New message from ${name}`,
      reply_to: email,
      text: message,
    });

    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("Email error:", error);
    return res.status(500).json({ error: "Failed to send email" });
  }
}
