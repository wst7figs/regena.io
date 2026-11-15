import { bookingUrl } from "@/lib/v2-content";

export type BookingPrefill = { name?: string; email?: string; phone?: string; website?: string };

// HighLevel's booking form reads these query parameters (checked Nov 2026): full_name, email, phone, website.
export function bookingSrc(prefill?: BookingPrefill) {
  if (!prefill) return bookingUrl;
  const url = new URL(bookingUrl);
  const fields: [string, string | undefined][] = [
    ["full_name", prefill.name],
    ["email", prefill.email],
    ["phone", prefill.phone],
    ["website", prefill.website],
  ];
  for (const [key, value] of fields) if (value?.trim()) url.searchParams.set(key, value.trim());
  return url.toString();
}

export function BookingWidget({ prefill }: { prefill?: BookingPrefill }) {
  const src = bookingSrc(prefill);
  return (
    <div className="booking-widget">
      <iframe title="Book a call with Regena" src={src} allow="camera; microphone; fullscreen; payment" loading="eager" referrerPolicy="no-referrer" />
      <p>Having trouble with the calendar? <a href={src} target="_blank" rel="noreferrer">Open it in a new tab</a>.</p>
    </div>
  );
}
