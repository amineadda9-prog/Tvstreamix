import { CONTACT } from "@/config/contact";

/** Everything is written in English because it is for YOU (the owner), not the client. */
export type OrderRequest = {
  plan: string;
  price: string;
  whatsapp: string;
  email: string;
  device: string;
  language: string;
};

export function ownerMessage(r: OrderRequest) {
  return [
    "New TVSTREAMIX order request",
    `Plan: ${r.plan} (${r.price})`,
    `WhatsApp: ${r.whatsapp}`,
    `Email: ${r.email}`,
    `Device: ${r.device}`,
    `Site language: ${r.language}`,
  ].join("\n");
}

/**
 * Delivers the request to the form service set in src/config/contact.ts
 * (works with Formspree and Web3Forms). Throws if it could not be delivered.
 */
export async function sendToOwner(r: OrderRequest): Promise<void> {
  const body: Record<string, string> = {
    ...r,
    subject: `New TVSTREAMIX request — ${r.plan}`,
    message: ownerMessage(r),
  };
  if (CONTACT.formAccessKey) body.access_key = CONTACT.formAccessKey;

  const res = await fetch(CONTACT.formEndpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(body),
  });
  const data = (await res.json().catch(() => null)) as { success?: boolean } | null;
  if (!res.ok || data?.success === false) throw new Error(`Form delivery failed (${res.status})`);
}
