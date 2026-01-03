import type { ContactPayload } from "../types/contact.types";

export function validateContact(payload: ContactPayload) {
  const errors: Record<string, string> = {};
  if (!payload.name || payload.name.trim().length < 2) errors.name = "Name must be at least 2 characters.";
  if (!payload.email || !/^\S+@\S+\.\S+$/.test(payload.email)) errors.email = "Enter a valid email.";
  if (!payload.message || payload.message.trim().length < 10) errors.message = "Message must be at least 10 characters.";
  return { ok: Object.keys(errors).length === 0, errors };
}
