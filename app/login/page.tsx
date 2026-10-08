import type { Metadata } from "next";
import LoginPanel from "@/components/LoginPanel";

export const metadata: Metadata = {
  title: "Sign in | Ember Table",
  description: "Sign in or create an Ember Table account.",
};

export default function LoginPage() {
  return (
    <main className="account-page">
      <header className="account-header">
        <a href="/" className="logo">Ember Table<span>.</span></a>
        <a className="account-back" href="/">Back to the restaurant <span aria-hidden="true">↗</span></a>
      </header>
      <div className="account-layout">
        <section className="account-story" aria-label="Welcome to Ember Table">
          <div className="account-flame" aria-hidden="true">E</div>
          <p className="account-eyebrow">A seat at our table</p>
          <h1>Good food.<br /><span>Good company.</span></h1>
          <p className="account-copy">
            Make yourself at home. An Ember Table account will make it easier to keep up with your visits.
          </p>
          <div className="account-rule" />
          <p className="account-signoff">Cooked over fire. Shared with love.</p>
        </section>
        <LoginPanel />
      </div>
      <footer className="account-footer">
        <span>© {new Date().getFullYear()} Ember Table</span>
        <a href="/">Back to the home page</a>
      </footer>
    </main>
  );
}
