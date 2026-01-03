"use client";

import { useState } from "react";
import { validateContact } from "../schemas/contact.schema";
import type { ContactPayload } from "../types/contact.types";
import { sendContact } from "../services/contact.service";

const initial: ContactPayload = { name: "", email: "", message: "" };

export default function ContactForm() {
  const [form, setForm] = useState<ContactPayload>(initial);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [serverMsg, setServerMsg] = useState<string>("");

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
      setForm(initial);
      setServerMsg(res.message ?? "Message sent successfully.");
    } catch (err: any) {
      setStatus("error");
      setServerMsg(err?.message ?? "Failed to send message.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <div className="grid gap-2">
        <label className="text-sm">Name</label>
        <input
          value={form.name}
          onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
          className="h-11 rounded-2xl border border-zinc-200/70 bg-white/60 px-4 text-sm shadow-sm backdrop-blur outline-none focus:ring-2 focus:ring-zinc-300 dark:border-zinc-800/70 dark:bg-zinc-950/35 dark:focus:ring-zinc-700"
          placeholder="Your name"
          autoComplete="name"
        />
        {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
      </div>

      <div className="grid gap-2">
        <label className="text-sm">Email</label>
        <input
          value={form.email}
          onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
          className="h-11 rounded-2xl border border-zinc-200/70 bg-white/60 px-4 text-sm shadow-sm backdrop-blur outline-none focus:ring-2 focus:ring-zinc-300 dark:border-zinc-800/70 dark:bg-zinc-950/35 dark:focus:ring-zinc-700"
          placeholder="you@email.com"
          autoComplete="email"
        />
        {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
      </div>

      <div className="grid gap-2">
        <label className="text-sm">Message</label>
        <textarea
          value={form.message}
          onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
          className="min-h-[120px] rounded-2xl border border-zinc-200/70 bg-white/60 p-4 text-sm shadow-sm backdrop-blur outline-none focus:ring-2 focus:ring-zinc-300 dark:border-zinc-800/70 dark:bg-zinc-950/35 dark:focus:ring-zinc-700"
          placeholder="Tell me about your project…"
        />
        {errors.message && <p className="text-xs text-red-500">{errors.message}</p>}
      </div>

      <button
        disabled={status === "sending"}
        className="inline-flex h-11 items-center justify-center rounded-2xl bg-zinc-900 px-5 text-sm font-medium text-white shadow-sm transition hover:opacity-90 disabled:opacity-60 dark:bg-white dark:text-zinc-900"
      >
        {status === "sending" ? "Sending…" : "Send"}
      </button>

      {serverMsg && (
        <p className={`text-sm ${status === "error" ? "text-red-500" : "text-zinc-600 dark:text-zinc-300"}`}>
          {serverMsg}
        </p>
      )}
    </form>
  );
}
