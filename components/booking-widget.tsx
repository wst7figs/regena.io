const bookingUrl = "https://go.regena.io/widget/booking/DPLeuNxOGB7PkoF1eg6u";

export function BookingWidget() {
  return (
    <div className="booking-widget">
      <iframe title="Book a Regena strategy call" src={bookingUrl} allow="camera; microphone; fullscreen; payment" loading="eager" />
      <p>Having trouble with the calendar? <a href={bookingUrl} target="_blank" rel="noreferrer">Open it in a new tab</a>.</p>
    </div>
  );
}
