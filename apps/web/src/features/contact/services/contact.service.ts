import { env } from "@/src/config/env";
import { http } from "@/src/services/http/http.client";
import type { ContactPayload, ContactResponse } from "../types/contact.types";

export async function sendContact(payload: ContactPayload) {
  return http<ContactResponse, ContactPayload>(`${env.NEXT_PUBLIC_API_URL}/contact`, {
    method: "POST",
    body: payload,
  });
}
