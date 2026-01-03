import { http } from "@/src/services/http/http.client";
import type { ContactPayload, ContactResponse } from "../types/contact.types";

export async function sendContact(payload: ContactPayload) {
  return http<ContactResponse, ContactPayload>("/api/contact", {
    method: "POST",
    body: payload,
  });
}
