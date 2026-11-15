"use client";

import { useEffect, useState } from "react";

import { type Attribution, readAttribution } from "@/lib/attribution";
import { bookingUrl } from "@/lib/v2-content";

export type BookingPrefill = { name?: string; email?: string; phone?: string; website?: string };

// HighLevel's booking form reads these query parameters (checked Nov 2026): full_name, email, phone, website.
// Campaign tags (utm_*, fbclid, ...) ride along so HighLevel can attribute the booking.
export function bookingSrc(prefill?: BookingPrefill, attribution: Attribution = {}) {
  const url = new URL(bookingUrl);
  const fields: [string, string | undefined][] = [
    ["full_name", prefill?.name],
    ["email", prefill?.email],
    ["phone", prefill?.phone],
    ["website", prefill?.website],
    ...Object.entries(attribution),
  ];
  for (const [key, value] of fields) if (value?.trim()) url.searchParams.set(key, value.trim());
  return url.search ? url.toString() : bookingUrl;
}

export function BookingWidget({ prefill }: { prefill?: BookingPrefill }) {
  const [attribution, setAttribution] = useState<Attribution>({});
  // Read after hydration so server and client markup match.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setAttribution(readAttribution()), []);
  const src = bookingSrc(prefill, attribution);
  return (
    <div className="booking-widget">
      <iframe title="Book a call with Regena" src={src} allow="camera; microphone; fullscreen; payment" loading="eager" referrerPolicy="no-referrer" />
      <p>Having trouble with the calendar? <a href={src} target="_blank" rel="noreferrer">Open it in a new tab</a>.</p>
    </div>
  );
}
