"use client";
import { useState } from "react";
import { menu, formatNaira } from "@/lib/data";

export default function MenuTabs() {
  const [active, setActive] = useState(menu[0].id);
  const section = menu.find((s) => s.id === active)!;

  return (
    <div className="rounded-sm bg-palm p-6 text-lime sm:p-10 lg:p-14">
      <div role="tablist" aria-label="Menu sections" className="mb-10 flex flex-wrap gap-x-6 gap-y-1 border-b border-lime/20">
        {menu.map((s) => (
          <button
            key={s.id}
            role="tab"
            id={`tab-${s.id}`}
            aria-selected={s.id === active}
            aria-controls="menu-panel"
            className="-mb-px cursor-pointer border-0 border-b border-b-transparent bg-transparent px-0 py-2.5 font-display text-sm font-medium text-lime/70 transition-colors hover:text-lime aria-selected:border-saffron aria-selected:text-saffron"
            onClick={() => setActive(s.id)}
          >
            {s.title}
          </button>
        ))}
      </div>
      <ul id="menu-panel" role="tabpanel" aria-labelledby={`tab-${active}`} className="m-0 grid list-none gap-x-12 gap-y-8 p-0 md:grid-cols-2 lg:gap-x-20">
        {section.items.map((item) => (
          <li key={item.name}>
            <div className="flex items-baseline gap-3 font-display text-lg font-medium">
              <span>{item.name}</span>
              <span className="flex-1 translate-y-[-4px] border-b border-dotted border-lime/40" aria-hidden="true" />
              <span className="whitespace-nowrap font-display text-sm font-semibold text-saffron">{formatNaira(item.price)}</span>
            </div>
            <p className="mb-0 mt-1 max-w-[42ch] text-[.95rem] text-lime/70">{item.note}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
