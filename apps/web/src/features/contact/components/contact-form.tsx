"use client";

import { useState, useCallback } from "react";
import { validateContact } from "../schemas/contact.schema";
import type { ContactPayload } from "../types/contact.types";
import { sendContact } from "../services/contact.service";

const INITIAL_FORM: ContactPayload = { name: "", email: "", message: "" };

type FormStatus = "idle" | "sending" | "sent" | "error";

export default function ContactForm() {
  const [form, setForm] = useState<ContactPayload>(INITIAL_FORM);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<FormStatus>("idle");
  const [serverMsg, setServerMsg] = useState("");

  const updateField = useCallback(
    (field: keyof ContactPayload) =>
      (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm((prev) => ({ ...prev, [field]: e.target.value }));
        if (status !== "idle") {
          setStatus("idle");
          setServerMsg("");
        }
      },
    [status],
  );

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setServerMsg("");

    const v = validateContact(form);
    if (!v.ok) {
      setErrors(v.errors);
      return;
    }

    setErrors({});
    setStatus("sending");

    try {
      const res = await sendContact(form);
      setStatus("sent");
      setForm(INITIAL_FORM);
      setServerMsg(res.message ?? "Message sent successfully.");
    } catch (err: unknown) {
      setStatus("error");
      const message =
        err instanceof Error ? err.message : "Failed to send message.";
      setServerMsg(message);
    }
  }

  const inputClasses =
    "h-11 rounded-2xl border border-zinc-200/70 bg-white/60 px-4 text-sm backdrop-blur-sm outline-none transition-shadow focus:ring-2 focus:ring-zinc-300 dark:border-zinc-800/70 dark:bg-zinc-950/35 dark:focus:ring-zinc-700";

  return (
    <form onSubmit={onSubmit} className="grid gap-4" noValidate>
      <div className="grid gap-2">
        <label htmlFor="contact-name" className="text-sm">
          Name
        </label>
        <input
          id="contact-name"
          value={form.name}
          onChange={updateField("name")}
          className={inputClasses}
          placeholder="Your name"
          autoComplete="name"
        />
        {errors.name && (
          <p className="text-xs text-red-500">{errors.name}</p>
        )}
      </div>

      <div className="grid gap-2">
        <label htmlFor="contact-email" className="text-sm">
          Email
        </label>
        <input
          id="contact-email"
          type="email"
          value={form.email}
          onChange={updateField("email")}
          className={inputClasses}
          placeholder="you@email.com"
          autoComplete="email"
        />
        {errors.email && (
          <p className="text-xs text-red-500">{errors.email}</p>
        )}
      </div>

      <div className="grid gap-2">
        <label htmlFor="contact-message" className="text-sm">
          Message
        </label>
        <textarea
          id="contact-message"
          value={form.message}
          onChange={updateField("message")}
          className="min-h-[120px] rounded-2xl border border-zinc-200/70 bg-white/60 p-4 text-sm backdrop-blur-sm outline-none transition-shadow focus:ring-2 focus:ring-zinc-300 dark:border-zinc-800/70 dark:bg-zinc-950/35 dark:focus:ring-zinc-700"
          placeholder="Tell me about your project…"
        />
        {errors.message && (
          <p className="text-xs text-red-500">{errors.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={status === "sending" || status === "sent"}
        className="inline-flex h-11 items-center justify-center rounded-2xl bg-zinc-900 px-5 text-sm font-medium text-white shadow-sm transition hover:opacity-90 disabled:opacity-60 dark:bg-white dark:text-zinc-900"
      >
        {status === "sending"
          ? "Sending…"
          : status === "sent"
            ? "Sent Successfully"
            : status === "error"
              ? "Try Again"
              : "Send Message"}
      </button>

      {serverMsg && (
        <p
          className={`text-sm ${status === "error" ? "text-red-500" : "text-zinc-600 dark:text-zinc-300"}`}
          role={status === "error" ? "alert" : "status"}
        >
          {serverMsg}
        </p>
      )}
    </form>
  );
}
