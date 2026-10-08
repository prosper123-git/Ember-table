import { NextResponse } from "next/server";

type Reservation = {
  name: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
};

function isReservation(value: unknown): value is Reservation {
  if (!value || typeof value !== "object") return false;

  const reservation = value as Record<string, unknown>;
  const date = reservation.date;
  const dateIsValid =
    typeof date === "string" &&
    /^\d{4}-\d{2}-\d{2}$/.test(date) &&
    !Number.isNaN(Date.parse(`${date}T00:00:00Z`)) &&
    new Date(`${date}T00:00:00Z`).toISOString().slice(0, 10) === date;

  return (
    typeof reservation.name === "string" &&
    reservation.name.trim().length > 0 &&
    reservation.name.length <= 100 &&
    typeof reservation.phone === "string" &&
    reservation.phone.trim().length >= 5 &&
    reservation.phone.length <= 40 &&
    dateIsValid &&
    typeof reservation.time === "string" &&
    ["12:00", "13:00", "14:00", "17:00", "18:00", "19:00", "20:00", "21:00"].includes(reservation.time) &&
    typeof reservation.guests === "number" &&
    Number.isInteger(reservation.guests) &&
    reservation.guests >= 1 &&
    reservation.guests <= 12
  );
}

export async function POST(request: Request) {
  let reservation: unknown;
  try {
    reservation = await request.json();
  } catch {
    return NextResponse.json({ error: "Please submit a valid reservation." }, { status: 400 });
  }

  if (!isReservation(reservation)) {
    return NextResponse.json({ error: "Please check your reservation details and try again." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const recipient = process.env.RESERVATION_EMAIL_TO;
  const sender = process.env.RESERVATION_EMAIL_FROM;
  if (!apiKey || !recipient || !sender) {
    console.error("Reservation email is not configured. Set RESEND_API_KEY, RESERVATION_EMAIL_TO, and RESERVATION_EMAIL_FROM.");
    return NextResponse.json({ error: "Reservation email is temporarily unavailable. Please call us to book." }, { status: 503 });
  }

  const details = [
    `Name: ${reservation.name.trim()}`,
    `Phone: ${reservation.phone.trim()}`,
    `Date: ${reservation.date}`,
    `Time: ${reservation.time}`,
    `Guests: ${reservation.guests}`,
  ].join("\n");

  let response: Response;
  try {
    response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: sender,
        to: [recipient],
        subject: `New table reservation request - ${reservation.date}`,
        text: `A new table reservation has been requested:\n\n${details}`,
      }),
    });
  } catch (error) {
    console.error("Failed to reach the reservation email service:", error);
    return NextResponse.json({ error: "We couldn't send your reservation. Please try again or call us." }, { status: 502 });
  }

  if (!response.ok) {
    const providerError = await response.text();
    console.error(`Reservation email service returned ${response.status}: ${providerError}`);
    return NextResponse.json({ error: "We couldn't send your reservation. Please try again or call us." }, { status: 502 });
  }

  return NextResponse.json({ success: true });
}
