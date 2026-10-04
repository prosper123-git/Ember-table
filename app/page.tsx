import MenuTabs from "@/components/MenuTabs";
import ReservationForm from "@/components/ReservationForm";
import { hours } from "@/lib/data";

export default function Home() {
  return (
    <>
      <header className="sticky top-0 z-20 flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-b border-ink/15 bg-lime/95 px-5 py-3 backdrop-blur-xl sm:px-[6vw] lg:px-24">
        <a href="#top" className="inline-flex items-center font-display text-[1.15rem] font-bold no-underline">
          <span aria-hidden="true" className="mr-2.5 inline-block size-2 rounded-full bg-pepper" />
          Ember Table
        </a>
        <nav aria-label="Primary" className="flex flex-wrap items-center gap-3 font-display text-[.78rem] font-medium sm:gap-6 sm:text-[.84rem] lg:gap-10">
          <a className="transition-colors hover:text-pepper" href="#menu">Menu</a>
          <a className="transition-colors hover:text-pepper" href="#story">Our fire</a>
          <a className="transition-colors hover:text-pepper" href="#visit">Visit</a>
          <a href="#book" className="hidden rounded-sm border border-pepper bg-pepper px-4 py-2 text-lime no-underline transition-colors hover:border-[#873d2c] hover:bg-[#873d2c] sm:inline-block">Book a table</a>
        </nav>
      </header>

      <main id="top">
        <section className="relative isolate grid min-h-[42rem] grid-cols-1 content-end gap-8 overflow-hidden bg-palm px-5 py-16 text-lime sm:px-[8vw] sm:py-24 md:min-h-[min(45rem,calc(100svh-4rem))] md:grid-cols-[minmax(0,1fr)_minmax(17rem,.55fr)] md:items-end md:py-32">
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-cover bg-center opacity-80 md:inset-y-0 md:left-[40%]" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1800&q=85')" }} />
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-palm via-palm/65 to-transparent md:bg-gradient-to-r md:from-palm md:via-palm/70 md:to-palm/10" />
          <h1 className="m-0 font-display text-[4.25rem] font-semibold leading-[.88] sm:text-8xl lg:text-[9.5rem]">
            <span className="block translate-y-5 animate-[rise_.75s_cubic-bezier(.2,.7,.2,1)_forwards] opacity-0">Suya.</span>
            <span className="block translate-y-5 animate-[rise_.75s_cubic-bezier(.2,.7,.2,1)_forwards] opacity-0 [animation-delay:.14s] text-[#d0ae76]">Jollof.</span>
            <span className="block translate-y-5 animate-[rise_.75s_cubic-bezier(.2,.7,.2,1)_forwards] opacity-0 [animation-delay:.28s] text-[#e4ded0]">Fire.</span>
          </h1>
          <div className="max-w-[31rem] border-l border-lime/50 pl-4 pt-5 md:max-w-96">
            <p className="mb-6 max-w-[34ch] text-lg">
              A West African kitchen cooking over charcoal and wood. Pepper-rubbed meat, slow pots, and a
              table that stays full until late.
            </p>
            <a href="#book" className="inline-block rounded-sm border border-pepper bg-pepper px-5 py-3 font-display text-[.84rem] font-semibold text-lime no-underline transition-colors hover:border-[#873d2c] hover:bg-[#873d2c]">Book a table</a>
          </div>
        </section>

        <section id="menu" className="mx-auto max-w-7xl scroll-mt-20 px-5 py-16 sm:px-12 sm:py-24 lg:px-28">
          <h2 className="mb-8 font-display text-4xl font-medium leading-tight sm:text-5xl">Menu</h2>
          <MenuTabs />
        </section>

        <section id="story" className="mx-auto max-w-5xl scroll-mt-20 px-5 py-16 sm:px-12 sm:py-24 lg:px-28">
          <h2 className="mb-8 font-display text-4xl font-medium leading-tight sm:text-5xl">Our fire</h2>
          <p className="max-w-[60ch]">
            Everything starts with the grill. We burn hardwood down to coals every morning, rub our meat with
            yaji made in-house, and let the pots simmer while the fire does its work. The recipes come from home
            kitchens; the smoke is ours.
          </p>
          <p className="max-w-[60ch] text-muted">
            We cook what we would serve family: generous plates, honest heat, and a pepper level you can ask us
            to turn up or down.
          </p>
        </section>

        <section id="visit" className="grid scroll-mt-20 grid-cols-1 gap-8 bg-parchment px-5 py-16 sm:px-12 sm:py-24 md:grid-cols-2 md:gap-20 lg:px-[max(1.25rem,calc((100vw-62rem)/2))]">
          <div>
            <h2 className="mb-8 font-display text-4xl font-medium leading-tight sm:text-5xl">Visit</h2>
            <p>12 Palm Avenue, Victoria Island<br />+234 800 000 0000<br />hello@embertable.example</p>
          </div>
          <dl className="m-0">
            {hours.map((h) => (
              <div key={h.days} className="flex justify-between gap-4 border-b border-ink/15 py-3">
                <dt className="font-display text-sm font-semibold">{h.days}</dt>
                <dd className="m-0 text-[.95rem] text-muted">{h.time}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section id="book" className="mx-auto max-w-7xl scroll-mt-20 px-5 py-16 sm:px-12 sm:py-24 lg:px-28">
          <h2 className="mb-8 font-display text-4xl font-medium leading-tight sm:text-5xl">Book a table</h2>
          <ReservationForm />
        </section>
      </main>

      <footer className="bg-palm px-6 py-6 text-center font-display text-[.8rem] text-lime/75">© {new Date().getFullYear()} Ember Table</footer>
    </>
  );
}
