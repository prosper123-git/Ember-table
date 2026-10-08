"use client";

import { useAuth } from "@/components/AuthProvider";

function getFirstName(displayName: string | null, email: string | null): string {
  const name = displayName?.trim();
  if (name) return name.split(/\s+/)[0];

  const emailName = email?.split("@")[0]?.split(/[._-]/)[0];
  if (emailName) return emailName.charAt(0).toUpperCase() + emailName.slice(1);

  return "there";
}

export default function AccountNavLink() {
  const { user, loading } = useAuth();
  const label = user && !loading ? `Hi, ${getFirstName(user.displayName, user.email)}` : "Sign in";

  return (
    <a href="/login" aria-label={user && !loading ? "Your account" : "Sign in"}>
      {label}
    </a>
  );
}
