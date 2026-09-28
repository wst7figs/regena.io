const bookingUrl = "https://go.bookedtobuilt.com/widget/booking/SSSIdBYVLlfImPfGFN02";

export function BookingWidget() {
  return (
    <div className="booking-widget">
      <iframe title="Book a Regena strategy call" src={bookingUrl} allow="camera; microphone; fullscreen; payment" loading="eager" />
      <p>Having trouble with the calendar? <a href={bookingUrl} target="_blank" rel="noreferrer">Open it in a new tab</a>.</p>
    </div>
  );
}
