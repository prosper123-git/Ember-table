"use client";

import { useState } from "react";

type Mode = "signin" | "signup";

export default function LoginPanel() {
  const [mode, setMode] = useState<Mode>("signin");
  const [message, setMessage] = useState("");

  function changeMode(nextMode: Mode) {
    setMode(nextMode);
    setMessage("");
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("Authentication isn’t connected yet. Your details were not sent.");
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
        <button className="account-submit" type="submit">
          {mode === "signin" ? "Sign in" : "Create account"}
          <span aria-hidden="true">→</span>
        </button>
      </form>

      <p className="account-switch">
        {mode === "signin" ? "New around here?" : "Already have an account?"}{" "}
        <button type="button" onClick={() => changeMode(mode === "signin" ? "signup" : "signin")}>
          {mode === "signin" ? "Create an account" : "Sign in"}
        </button>
      </p>
      <p className="account-note">Account access is a preview; authentication isn’t set up yet.</p>
    </section>
  );
}
