"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FirebaseError } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "@/lib/firebase";

type Mode = "signin" | "signup";

function getErrorMessage(error: unknown): string {
  if (error instanceof FirebaseError) {
    switch (error.code) {
      case "auth/invalid-credential":
      case "auth/user-not-found":
      case "auth/wrong-password":
        return "Wrong email or password. Please try again.";
      case "auth/email-already-in-use":
        return "An account with this email already exists. Try signing in instead.";
      case "auth/weak-password":
        return "That password is too weak. Use at least 8 characters.";
      case "auth/invalid-email":
        return "That email address doesn’t look right.";
      case "auth/too-many-requests":
        return "Too many attempts. Please wait a moment and try again.";
      case "auth/network-request-failed":
        return "Network error. Check your connection and try again.";
      case "auth/operation-not-allowed":
        return "Email/password sign-in isn’t enabled yet in Firebase.";
      case "auth/invalid-api-key":
      case "auth/app-not-authorized":
        return "Firebase sign-in is misconfigured. Please contact the site owner.";
    }
  }
  return "Something went wrong. Please try again.";
}

export default function LoginPanel() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("signin");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  function changeMode(nextMode: Mode) {
    setMode(nextMode);
    setMessage("");
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (loading) return;

    // Read the values before any await (event.currentTarget is cleared after).
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const password = String(data.get("password") ?? "");
    const confirmPassword = String(data.get("confirmPassword") ?? "");

    if (mode === "signup" && password !== confirmPassword) {
      setMessage("Passwords don’t match. Please enter them again.");
      return;
    }
    if (mode === "signup" && !name) {
      setMessage("Please enter your name.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      if (mode === "signup") {
        const credential = await createUserWithEmailAndPassword(auth, email, password);
        try {
          await updateProfile(credential.user, { displayName: name });
        } catch (error) {
          console.error("Account was created, but saving the profile name failed.", error);
          setMessage("Your account was created and you’re signed in, but we couldn’t save your name. Please contact us to update it.");
          setLoading(false);
          return;
        }
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      router.push("/");
    } catch (error) {
      setMessage(getErrorMessage(error));
      setLoading(false);
    }
  }

  return (
    <section className="account-panel" aria-labelledby="account-title">
      <div className="account-tabs" role="tablist" aria-label="Account access">
        <button
          className="account-tab"
          id="signin-tab"
          type="button"
          role="tab"
          aria-selected={mode === "signin"}
          aria-controls="account-form"
          onClick={() => changeMode("signin")}
        >
          Sign in
        </button>
        <button
          className="account-tab"
          id="signup-tab"
          type="button"
          role="tab"
          aria-selected={mode === "signup"}
          aria-controls="account-form"
          onClick={() => changeMode("signup")}
        >
          Sign up
        </button>
      </div>

      <div className="account-heading">
        <p className="account-kicker">{mode === "signin" ? "Welcome back" : "Come on in"}</p>
        <h2 id="account-title">{mode === "signin" ? "Sign in to your account" : "Create your account"}</h2>
        <p>
          {mode === "signin"
            ? "Your table is waiting. Pick up right where you left off."
            : "Join us for a little more fire in your inbox."}
        </p>
      </div>

      <form
        id="account-form"
        className="account-form"
        role="tabpanel"
        aria-labelledby={mode === "signin" ? "signin-tab" : "signup-tab"}
        onSubmit={handleSubmit}
      >
        {mode === "signup" && (
          <label>
            Your name
            <input type="text" name="name" autoComplete="name" placeholder="Ada Okafor" required />
          </label>
        )}
        <label>
          Email address
          <input type="email" name="email" autoComplete="email" placeholder="you@example.com" required />
        </label>
        <label>
          Password
          <input
            type="password"
            name="password"
            autoComplete={mode === "signin" ? "current-password" : "new-password"}
            placeholder={mode === "signup" ? "At least 8 characters" : "Your password"}
            minLength={mode === "signup" ? 8 : undefined}
            required
          />
        </label>
        {mode === "signup" && (
          <label>
            Confirm password
            <input type="password" name="confirmPassword" autoComplete="new-password" placeholder="Enter it again" minLength={8} required />
          </label>
        )}
        {message && <p className="account-message" role="status">{message}</p>}
        <button className="account-submit" type="submit" disabled={loading}>
          {loading
            ? mode === "signin"
              ? "Signing in…"
              : "Creating account…"
            : mode === "signin"
              ? "Sign in"
              : "Create account"}
          <span aria-hidden="true">→</span>
        </button>
      </form>

      <p className="account-switch">
        {mode === "signin" ? "New around here?" : "Already have an account?"}{" "}
        <button type="button" onClick={() => changeMode(mode === "signin" ? "signup" : "signin")}>
          {mode === "signin" ? "Create an account" : "Sign in"}
        </button>
      </p>
    </section>
  );
}