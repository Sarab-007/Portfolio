import type { ContactPayload, ContactResponse } from "../types/contact.types";

export async function sendContact(payload: ContactPayload): Promise<ContactResponse> {
  const res = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const text = await res.text();

  // Parse JSON safely and type it
  const data: ContactResponse = text ? JSON.parse(text) : { success: false };

  if (!res.ok) {
    throw new Error(data.message || `Request failed (${res.status})`);
  }

  return data;
}
