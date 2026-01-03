import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_PORT = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 587;
const SMTP_SECURE = process.env.SMTP_SECURE === "true"; // true for 465, false for 587
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;

const MAIL_TO = process.env.MAIL_TO || "sarabalikhan98@gmail.com";
const MAIL_FROM = process.env.MAIL_FROM || (SMTP_USER ? `Portfolio Contact <${SMTP_USER}>` : "Portfolio Contact");

function requireEnv(name: string, value: string | undefined) {
  if (!value) throw new Error(`[email.service] Missing required env var: ${name}`);
  return value;
}

// Fail fast (better than silently failing later)
const host = requireEnv("SMTP_HOST", SMTP_HOST);
const user = requireEnv("SMTP_USER", SMTP_USER);
const pass = requireEnv("SMTP_PASS", SMTP_PASS);

const transporter = nodemailer.createTransport({
  host,
  port: SMTP_PORT,
  secure: SMTP_SECURE,
  auth: { user, pass },

  // Helps with some hosts (including Gmail) on certain platforms
  tls: {
    // keep strict by default; set to false ONLY if you know what you’re doing
    rejectUnauthorized: true,
  },
});

// Optional: verify connection once at startup (you can call this from server.ts too)
export async function verifyEmailTransport() {
  await transporter.verify();
}

function escapeHtml(input: string) {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export type ContactEmailPayload = {
  name: string;
  email: string;
  message: string;
};

export async function sendContactEmail(payload: ContactEmailPayload) {
  const { name, email, message } = payload;

  const subject = `New contact message from ${name}`;
  const text = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n`;

  const html = `
    <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial;line-height:1.5">
      <h2 style="margin:0 0 10px">New Contact Message</h2>
      <p style="margin:0 0 6px"><b>Name:</b> ${escapeHtml(name)}</p>
      <p style="margin:0 0 6px"><b>Email:</b> ${escapeHtml(email)}</p>
      <p style="margin:14px 0 6px"><b>Message:</b></p>
      <pre style="white-space:pre-wrap;background:#f6f6f6;padding:12px;border-radius:8px">${escapeHtml(
        message
      )}</pre>
    </div>
  `;

  return transporter.sendMail({
    to: MAIL_TO,
    from: MAIL_FROM,
    subject,
    text,
    html,
    replyTo: email, // so you can reply directly
  });
}
