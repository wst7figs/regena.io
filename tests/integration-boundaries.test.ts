import { afterEach, describe, expect, it, vi } from "vitest";

import { POST } from "@/app/api/apply/route";
import { sendEmail } from "@/lib/email";

const contact = { name: "Ana Diaz", clinic: "Glow Clinic", email: "ana@glow.ca", phone: "780 555 0101", city: "Edmonton", region: "Alberta", country: "CA", consent: true };
const answers = { treatment: "body", capacity: "30-50", packagePrice: "1500-2500", revenue: "25-50k", pastPatients: "unsure", adBudget: "unsure" };
const post = (body: unknown) => POST(new Request("http://localhost/api/apply", { method: "POST", body: JSON.stringify(body) }));

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

describe("production integration boundaries", () => {
  it("reports unconfigured email without pretending delivery succeeded", async () => {
    const result = await sendEmail({ to: "owner@example.com", subject: "Clinic result", text: "Result" }, { apiKey: "" });
    expect(result).toEqual({ status: "unconfigured" });
  });

  it("validates the contact step on the server", async () => {
    const response = await post({ step: "contact", contact: { ...contact, consent: false } });
    expect(response.status).toBe(400);
    expect((await response.json()).errors).toContain("Please agree to be contacted about your application.");
  });

  it("returns a verdict and forwards labelled answers plus the consent record to the webhook", async () => {
    vi.stubEnv("RESEND_API_KEY", "");
    vi.stubEnv("REGENA_APPLY_WEBHOOK_URL", "https://hooks.example.test/apply");
    const fetchMock = vi.fn().mockResolvedValue(new Response("ok", { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);

    const response = await post({ step: "answers", contact, answers, attribution: { utm_source: "facebook", fbclid: "abc123", evil: "x" } });
    const json = await response.json();
    expect(json).toMatchObject({ ok: true, verdict: { fit: true }, email: "unconfigured", webhook: "sent" });

    const payload = JSON.parse(fetchMock.mock.calls[0][1].body as string);
    expect(payload).toMatchObject({ step: "answers", clinic: "Glow Clinic", treatment: "body", treatmentLabel: "Body contouring or fat dissolving", fit: true, consent: true });
    expect(payload.consentText).toMatch(/Reply STOP/);
    expect(payload).toMatchObject({ utm_source: "facebook", fbclid: "abc123" });
    expect(payload).toMatchObject({ firstName: "Ana", lastName: "Diaz" });
    expect(payload).not.toHaveProperty("evil");
  });

  it("drops spam-trap submissions without forwarding them", async () => {
    vi.stubEnv("REGENA_APPLY_WEBHOOK_URL", "https://hooks.example.test/apply");
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    const response = await post({ step: "contact", contact, hp: "http://spam.example" });
    expect(response.status).toBe(200);
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
