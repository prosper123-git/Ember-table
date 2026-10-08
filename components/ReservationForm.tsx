"use client";
import { useState } from "react";

type Booking = { name: string; date: string; time: string; guests: number };

export default function ReservationForm() {
  const [booking, setBooking] = useState<Booking | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const reservation = {
      name: String(f.get("name")),
      phone: String(f.get("phone")),
      date: String(f.get("date")),
      time: String(f.get("time")),
      guests: Number(f.get("guests")),
    };

    setIsSubmitting(true);
    setError("");
    try {
      const response = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reservation),
      });
      const result: { error?: string } = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "We couldn't send your reservation. Please try again.");
      }
      setBooking(reservation);
    } catch (error) {
      setError(error instanceof Error ? error.message : "We couldn't send your reservation. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (booking) {
    return (
      <div className="confirm" role="status">
        <h3>Table requested, {booking.name}.</h3>
        <p>
          {booking.guests} {booking.guests === 1 ? "guest" : "guests"} on {booking.date} at {booking.time}. We will
          confirm by phone within the hour.
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
      {error && <p className="form-error" role="alert">{error}</p>}
      <button className="btn" type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Sending request..." : "Request a table"}
      </button>
    </form>
  );
}
