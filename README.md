# Ember Table

Restaurant website built with Next.js (App Router) and TypeScript.

    npm install
    npm run dev

Edit the menu and opening hours in `lib/data.ts`.

The `/login` page supports email/password sign-in and account creation with Firebase Authentication. Configure
Firebase Authentication with the Email/Password provider, then set the following public Firebase web-app
configuration variables in `.env.local` for local development and in your hosting provider's environment settings
for production:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your-firebase-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
# Optional
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your-measurement-id
```

These values identify the Firebase web app and are intended for client-side use; protect accounts with Firebase
Authentication settings and security controls, not by treating the web configuration as a secret.

Reservation requests are emailed through [Resend](https://resend.com/). Add these variables to `.env.local` for
local development and to your hosting provider's environment settings in production:

```env
RESEND_API_KEY=re_...
RESERVATION_EMAIL_TO=your-inbox@example.com
RESERVATION_EMAIL_FROM=Ember Table <reservations@your-verified-domain.com>
```

Verify the sender domain in Resend before using it. The form shows a confirmation only after the email service
accepts the reservation; otherwise, it displays an error so the guest can retry or call.
