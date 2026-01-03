import { z } from "zod";
import { Resend } from "resend";

export const runtime = "nodejs";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
});

// Always return JSON for preflight requests
export function OPTIONS() {
  return Response.json({ ok: true }, { status: 200 });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);

    if (!parsed.success) {
      return Response.json(
        { success: false, message: "Invalid payload", issues: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const resendKey = process.env.RESEND_API_KEY;
    if (!resendKey) {
      return Response.json(
        { success: false, message: "Server not configured (missing RESEND_API_KEY)." },
        { status: 500 }
      );
    }

    const resend = new Resend(resendKey);
    const { name, email, message } = parsed.data;

    await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: process.env.MAIL_TO || "sarabalikhan98@gmail.com",
      replyTo: email,
      subject: `New message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    });

    return Response.json({
      success: true,
      message: "Thanks — your message was received.",
    });
  } catch (err) {
    console.error("CONTACT API ERROR:", err);
    return Response.json(
      { success: false, message: "Message could not be sent right now. Please try again later." },
      { status: 500 }
    );
  }
}
