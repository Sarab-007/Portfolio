import { HttpError } from "./http.errors";
import type { HttpRequestOptions } from "./http.types";

function isJson(res: Response) {
  return res.headers.get("content-type")?.includes("application/json");
}

export async function http<TResponse, TBody = unknown>(
  url: string,
  opts: HttpRequestOptions<TBody> = {}
): Promise<TResponse> {
  const res = await fetch(url, {
    method: opts.method ?? "GET",
    headers: {
      ...(opts.body ? { "Content-Type": "application/json" } : {}),
      ...(opts.headers ?? {}),
    },
    body: opts.body ? JSON.stringify(opts.body) : undefined,
    signal: opts.signal,
    cache: "no-store",
  });

  const data = isJson(res) ? await res.json().catch(() => undefined) : await res.text().catch(() => undefined);

  if (!res.ok) {
    const msg =
      typeof data === "object" && data && "message" in (data as any)
        ? String((data as any).message)
        : `Request failed (${res.status})`;
    throw new HttpError(msg, res.status, data);
  }

  return data as TResponse;
}
