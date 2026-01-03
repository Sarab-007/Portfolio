import { z } from "zod";
import { Resend } from "resend";

export const runtime = "nodejs";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
});

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

    const resend = new Resend(process.env.RESEND_API_KEY);
    if (!process.env.RESEND_API_KEY) {
      return Response.json({ success: false, message: "Server not configured." }, { status: 500 });
    }

    const { name, email, message } = parsed.data;

    await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>", // later you can use your domain
      to: process.env.MAIL_TO || "sarabalikhan98@gmail.com",
      replyTo: email,
      subject: `New message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    });

    return Response.json({ success: true, message: "Thanks — your message was received." });
  } catch (err) {
    console.error(err);
    return Response.json(
      { success: false, message: "Message could not be sent. Please try again later." },
      { status: 500 }
    );
  }
}
