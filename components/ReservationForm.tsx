"use client";
import { useState } from "react";

type Booking = { name: string; date: string; time: string; guests: number };

export default function ReservationForm() {
  const [booking, setBooking] = useState<Booking | null>(null);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    setBooking({
      name: String(f.get("name")),
      date: String(f.get("date")),
      time: String(f.get("time")),
      guests: Number(f.get("guests")),
    });
  }

  if (booking) {
    return (
      <div className="confirm" role="status">
        <h3>Table reserved, {booking.name}.</h3>
        <p>
          {booking.guests} {booking.guests === 1 ? "guest" : "guests"} on {booking.date} at {booking.time}.
        </p>
        <button className="btn" onClick={() => setBooking(null)}>Change booking</button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="form">
      <label>Name<input name="name" required autoComplete="name" /></label>
      <label>Phone<input name="phone" type="tel" required autoComplete="tel" /></label>
      <label>Date<input name="date" type="date" required /></label>
      <label>Time
        <select name="time" defaultValue="19:00">
          {["12:00", "13:00", "14:00", "17:00", "18:00", "19:00", "20:00", "21:00"].map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </label>
      <label>Guests<input name="guests" type="number" min={1} max={12} defaultValue={2} required /></label>
      <button className="btn" type="submit">Reserve a table</button>
    </form>
  );
}
