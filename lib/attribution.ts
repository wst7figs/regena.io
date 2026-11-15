// Ad attribution: keep the campaign tags a visitor landed with (first touch in this tab),
// so the apply form and the booking calendar can pass them on to HighLevel.
export const campaignParameters = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "gclid", "fbclid", "ttclid", "ref"] as const;

export type Attribution = Partial<Record<(typeof campaignParameters)[number], string>>;

const storageKey = "regena-attribution-v1";

export function pickAttribution(input: unknown): Attribution {
  const source = input instanceof URLSearchParams ? Object.fromEntries(input) : input;
  if (!source || typeof source !== "object" || Array.isArray(source)) return {};
  const result: Attribution = {};
  for (const key of campaignParameters) {
    const value = (source as Record<string, unknown>)[key];
    if (typeof value === "string" && value.trim()) result[key] = value.trim().slice(0, 255);
  }
  return result;
}

// Called once per page load. The first tags seen in this tab win, so a later internal click without tags keeps them.
export function captureAttribution() {
  try {
    const current = pickAttribution(new URLSearchParams(window.location.search));
    if (!Object.keys(current).length || window.sessionStorage.getItem(storageKey)) return;
    window.sessionStorage.setItem(storageKey, JSON.stringify(current));
  } catch {
    // Storage can be blocked; tags on the current URL are still read below.
  }
}

export function readAttribution(): Attribution {
  if (typeof window === "undefined") return {};
  let stored: Attribution = {};
  try {
    stored = pickAttribution(JSON.parse(window.sessionStorage.getItem(storageKey) ?? "{}"));
  } catch {
    // ignore
  }
  return { ...pickAttribution(new URLSearchParams(window.location.search)), ...stored };
}
