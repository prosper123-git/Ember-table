"use client";
import { useState } from "react";

type Booking = { name: string; date: string; time: string; guests: number };

export default function ReservationForm() {
  const [booking, setBooking] = useState<Booking | null>(null);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    // Replace with a fetch() to your API route or email service.
    setBooking({
      name: String(f.get("name")),
      date: String(f.get("date")),
      time: String(f.get("time")),
      guests: Number(f.get("guests")),
    });
  }

  if (booking) {
    return (
      <div className="max-w-[42rem] rounded-sm border border-stone bg-paper p-6" role="status">
        <h3 className="mb-2 mt-0 font-display text-2xl font-medium">Table requested, {booking.name}.</h3>
        <p className="mb-5">
          {booking.guests} {booking.guests === 1 ? "guest" : "guests"} on {booking.date} at {booking.time}. We will
          confirm by phone within the hour.
        </p>
        <button className="cursor-pointer rounded-sm border border-pepper bg-pepper px-5 py-3 font-display text-[.84rem] font-semibold text-lime transition-colors hover:border-[#873d2c] hover:bg-[#873d2c]" onClick={() => setBooking(null)}>Change booking</button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid max-w-[42rem] grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
      <label className="grid gap-1.5 font-display text-[.82rem] font-semibold">Name<input className="min-h-12 w-full rounded-sm border border-stone bg-paper px-3 py-2 font-body text-base font-normal text-ink focus:border-pepper focus:outline focus:outline-1 focus:outline-pepper" name="name" required autoComplete="name" /></label>
      <label className="grid gap-1.5 font-display text-[.82rem] font-semibold">Phone<input className="min-h-12 w-full rounded-sm border border-stone bg-paper px-3 py-2 font-body text-base font-normal text-ink focus:border-pepper focus:outline focus:outline-1 focus:outline-pepper" name="phone" type="tel" required autoComplete="tel" /></label>
      <label className="grid gap-1.5 font-display text-[.82rem] font-semibold">Date<input className="min-h-12 w-full rounded-sm border border-stone bg-paper px-3 py-2 font-body text-base font-normal text-ink focus:border-pepper focus:outline focus:outline-1 focus:outline-pepper" name="date" type="date" required /></label>
      <label className="grid gap-1.5 font-display text-[.82rem] font-semibold">Time
        <select className="min-h-12 w-full rounded-sm border border-stone bg-paper px-3 py-2 font-body text-base font-normal text-ink focus:border-pepper focus:outline focus:outline-1 focus:outline-pepper" name="time" defaultValue="19:00">
          {["12:00", "13:00", "14:00", "17:00", "18:00", "19:00", "20:00", "21:00"].map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </label>
      <label className="grid gap-1.5 font-display text-[.82rem] font-semibold">Guests<input className="min-h-12 w-full rounded-sm border border-stone bg-paper px-3 py-2 font-body text-base font-normal text-ink focus:border-pepper focus:outline focus:outline-1 focus:outline-pepper" name="guests" type="number" min={1} max={12} defaultValue={2} required /></label>
      <button className="cursor-pointer justify-self-start rounded-sm border border-pepper bg-pepper px-5 py-3 font-display text-[.84rem] font-semibold text-lime transition-colors hover:border-[#873d2c] hover:bg-[#873d2c] sm:col-span-2" type="submit">Request a table</button>
    </form>
  );
}
