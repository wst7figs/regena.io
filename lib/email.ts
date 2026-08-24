import { Resend } from "resend";

export type EmailMessage = {
  to: string | string[];
  subject: string;
  text: string;
  html?: string;
  replyTo?: string;
};

export type EmailDelivery =
  | { status: "sent"; id: string }
  | { status: "unconfigured" }
  | { status: "failed"; reason: string };

type EmailTransport = (message: EmailMessage & { from: string }) => Promise<{ id?: string; error?: unknown }>;

type EmailOptions = {
  apiKey?: string;
  from?: string;
  transport?: EmailTransport;
};

export function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[character] ?? character);
}

export async function sendEmail(message: EmailMessage, options: EmailOptions = {}): Promise<EmailDelivery> {
  const apiKey = options.apiKey ?? process.env.RESEND_API_KEY ?? "";
  if (!apiKey) return { status: "unconfigured" };

  const from = options.from ?? process.env.RESEND_FROM_EMAIL ?? "Regena <onboarding@resend.dev>";
  const transport: EmailTransport = options.transport ?? (async (payload) => {
    const resend = new Resend(apiKey);
    const { data, error } = await resend.emails.send({
      from: payload.from,
      to: payload.to,
      subject: payload.subject,
      text: payload.text,
      html: payload.html,
      replyTo: payload.replyTo,
    });
    return { id: data?.id, error };
  });

  try {
    const result = await transport({ ...message, from });
    if (result.id) return { status: "sent", id: result.id };
    return { status: "failed", reason: result.error instanceof Error ? result.error.message : "The email provider did not accept the message." };
  } catch (error) {
    return { status: "failed", reason: error instanceof Error ? error.message : "Email delivery failed." };
  }
}
