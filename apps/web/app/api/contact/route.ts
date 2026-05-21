import { Resend } from "resend";
import { z } from "zod";

export const runtime = "nodejs";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
});

export function OPTIONS() {
  return Response.json({ ok: true }, { status: 200 });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);

    if (!parsed.success) {
      return Response.json(
        { success: false, message: "Invalid payload" },
        { status: 400 },
      );
    }

    if (!process.env.RESEND_API_KEY) {
      console.warn(
        "RESEND_API_KEY is not set. Simulating a successful email send for demo purposes.",
      );

      await new Promise((resolve) => setTimeout(resolve, 1000));

      return Response.json({
        success: true,
        message: "Thanks - your message was received.",
      });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const { name, email, message } = parsed.data;

    await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: process.env.MAIL_TO || siteEmail,
      replyTo: email,
      subject: `New message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    });

    return Response.json({
      success: true,
      message: "Thanks - your message was received.",
    });
  } catch (err) {
    console.error("CONTACT API ERROR:", err);
    return Response.json(
      { success: false, message: "Message could not be sent." },
      { status: 500 },
    );
  }
}

const siteEmail = "sarabalikhan98@gmail.com";
