# Ember Table

Restaurant website built with Next.js (App Router) and TypeScript.

    npm install
    npm run dev

Edit the menu and opening hours in `lib/data.ts`.

The `/login` page includes sign-in and sign-up screens, but authentication is not configured yet. Submitting either
form keeps the entered details in the browser and displays a notice; it does not send or store credentials.

Reservation requests are emailed through [Resend](https://resend.com/). Add these variables to `.env.local` for
local development and to your hosting provider's environment settings in production:

```env
RESEND_API_KEY=re_...
RESERVATION_EMAIL_TO=your-inbox@example.com
RESERVATION_EMAIL_FROM=Ember Table <reservations@your-verified-domain.com>
```

Verify the sender domain in Resend before using it. The form shows a confirmation only after the email service
accepts the reservation; otherwise, it displays an error so the guest can retry or call.
