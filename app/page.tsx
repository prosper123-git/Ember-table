import MenuTabs from "@/components/MenuTabs";
import ReservationForm from "@/components/ReservationForm";
import { hours } from "@/lib/data";

export default function Home() {
  return (
    <>
      <header className="nav">
        <a href="#top" className="logo">Ember Table</a>
        <nav aria-label="Primary">
          <a href="#menu">Menu</a>
          <a href="#story">Our fire</a>
          <a href="#visit">Visit</a>
          <a href="/login">Sign in</a>
          <a href="#book" className="btn small">Book a table</a>
        </nav>
      </header>

      <main id="top">
        <section className="hero">
          <h1>
            <span>Suya.</span>
            <span>Jollof.</span>
            <span>Fire.</span>
          </h1>
          <div className="hero-side">
            <p>
              A West African kitchen cooking over charcoal and wood. Pepper-rubbed meat, slow pots, and a
              table that stays full until late.
            </p>
            <a href="#book" className="btn">Book a table</a>
          </div>
        </section>

        <section id="menu" className="section">
          <h2>Menu</h2>
          <MenuTabs />
        </section>

        <section id="story" className="section story">
          <h2>Our fire</h2>
          <p>
            Everything starts with the grill. We burn hardwood down to coals every morning, rub our meat with
            yaji made in-house, and let the pots simmer while the fire does its work. The recipes come from home
            kitchens; the smoke is ours.
          </p>
          <p>
            We cook what we would serve family: generous plates, honest heat, and a pepper level you can ask us
            to turn up or down.
          </p>
        </section>

        <section id="visit" className="section visit">
          <div>
            <h2>Visit</h2>
            <p>12 Palm Avenue, Victoria Island<br />+234 7065381223<br />embertable123@gmail.com</p>
          </div>
          <dl>
            {hours.map((h) => (
              <div key={h.days}>
                <dt>{h.days}</dt>
                <dd>{h.time}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section id="book" className="section book">
          <h2>Book a table</h2>
          <ReservationForm />
        </section>
      </main>

      <footer className="footer">© {new Date().getFullYear()} Ember Table</footer>
    </>
  );
}
