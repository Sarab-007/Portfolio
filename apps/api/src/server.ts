import dotenv from "dotenv";
import type { Request, Response } from "express";
import { z } from "zod";
import { app } from "./app";
import { sendContactEmail } from "./services/email.service";

dotenv.config();

const PORT = process.env.PORT ? Number(process.env.PORT) : 4000;

app.get("/health", (_req: Request, res: Response) => {
  res.json({ status: "ok" });
});

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
});

app.post("/contact", async (req: Request, res: Response) => {
  const parsed = contactSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      success: false,
      message: "Invalid payload",
      issues: parsed.error.flatten(),
    });
  }

  try {
    await sendContactEmail(parsed.data);
    return res.json({ success: true, message: "Thanks — your message was received." });
  } catch (err) {
    console.error("Contact email send failed:", err);
    return res.status(500).json({
      success: false,
      message: "Message could not be sent right now. Please try again later.",
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 API running on http://localhost:${PORT}`);
});
