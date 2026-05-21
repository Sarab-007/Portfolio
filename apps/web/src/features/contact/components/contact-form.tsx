"use client";

import { useCallback, useId, useState } from "react";
import { Loader2, Send } from "lucide-react";
import { validateContact } from "../schemas/contact.schema";
import type { ContactPayload } from "../types/contact.types";
import { sendContact } from "../services/contact.service";
import { cn } from "@/src/lib/cn";

const INITIAL_FORM: ContactPayload = { name: "", email: "", message: "" };

type FormStatus = "idle" | "sending" | "sent" | "error";

export default function ContactForm() {
  const formId = useId();
  const [form, setForm] = useState<ContactPayload>(INITIAL_FORM);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<FormStatus>("idle");
  const [serverMsg, setServerMsg] = useState("");

  const updateField = useCallback(
    (field: keyof ContactPayload) =>
      (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm((current) => ({ ...current, [field]: event.target.value }));
        setErrors((current) => ({ ...current, [field]: "" }));

        if (status !== "idle") {
          setStatus("idle");
          setServerMsg("");
        }
      },
    [status],
  );

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setServerMsg("");

    const validation = validateContact(form);
    if (!validation.ok) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});
    setStatus("sending");

    try {
      const response = await sendContact(form);
      setStatus("sent");
      setForm(INITIAL_FORM);
      setServerMsg(response.message ?? "Message sent successfully.");
    } catch (error: unknown) {
      setStatus("error");
      setServerMsg(
        error instanceof Error ? error.message : "Failed to send message.",
      );
    }
  }

  const fieldClass =
    "w-full rounded-lg border border-white/10 bg-black/[0.28] px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-white/[0.32] focus:border-[rgb(var(--accent))] focus:bg-black/40";

  return (
    <form onSubmit={onSubmit} className="grid gap-4" noValidate>
      <div className="grid gap-2">
        <label htmlFor={`${formId}-name`} className="text-sm text-white/70">
          Name
        </label>
        <input
          id={`${formId}-name`}
          value={form.name}
          onChange={updateField("name")}
          className={fieldClass}
          placeholder="Your name"
          autoComplete="name"
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? `${formId}-name-error` : undefined}
        />
        {errors.name ? (
          <p id={`${formId}-name-error`} className="text-xs text-rose-300">
            {errors.name}
          </p>
        ) : null}
      </div>

      <div className="grid gap-2">
        <label htmlFor={`${formId}-email`} className="text-sm text-white/70">
          Email
        </label>
        <input
          id={`${formId}-email`}
          type="email"
          value={form.email}
          onChange={updateField("email")}
          className={fieldClass}
          placeholder="you@email.com"
          autoComplete="email"
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? `${formId}-email-error` : undefined}
        />
        {errors.email ? (
          <p id={`${formId}-email-error`} className="text-xs text-rose-300">
            {errors.email}
          </p>
        ) : null}
      </div>

      <div className="grid gap-2">
        <label htmlFor={`${formId}-message`} className="text-sm text-white/70">
          Message
        </label>
        <textarea
          id={`${formId}-message`}
          value={form.message}
          onChange={updateField("message")}
          className={cn(fieldClass, "min-h-[148px] resize-y")}
          placeholder="Tell me about the product, workflow, or system you want to build."
          aria-invalid={Boolean(errors.message)}
          aria-describedby={
            errors.message ? `${formId}-message-error` : undefined
          }
        />
        {errors.message ? (
          <p id={`${formId}-message-error`} className="text-xs text-rose-300">
            {errors.message}
          </p>
        ) : null}
      </div>

      <button
        type="submit"
        disabled={status === "sending" || status === "sent"}
        className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[rgb(var(--accent))] px-5 text-sm font-semibold text-[rgb(var(--accent-text))] transition-colors hover:bg-[rgb(var(--accent-strong))] disabled:cursor-not-allowed disabled:opacity-55 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[rgb(var(--accent))]"
        data-cursor="send"
      >
        {status === "sending" ? (
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
        ) : (
          <Send className="h-4 w-4" aria-hidden="true" />
        )}
        {status === "sending"
          ? "Sending"
          : status === "sent"
            ? "Sent Successfully"
            : status === "error"
              ? "Try Again"
              : "Send Message"}
      </button>

      {serverMsg ? (
        <p
          className={cn(
            "text-sm",
            status === "error" ? "text-rose-300" : "text-white/60",
          )}
          role={status === "error" ? "alert" : "status"}
        >
          {serverMsg}
        </p>
      ) : null}
    </form>
  );
}
