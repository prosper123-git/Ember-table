"use client";
import { useState } from "react";
import { menu, formatNaira } from "@/lib/data";

export default function MenuTabs() {
  const [active, setActive] = useState(menu[0].id);
  const section = menu.find((s) => s.id === active)!;

  return (
    <div className="board">
      <div role="tablist" aria-label="Menu sections" className="tabs">
        {menu.map((s) => (
          <button
            key={s.id}
            role="tab"
            id={`tab-${s.id}`}
            aria-selected={s.id === active}
            aria-controls="menu-panel"
            onClick={() => setActive(s.id)}
          >
            {s.title}
          </button>
        ))}
      </div>
      <ul id="menu-panel" role="tabpanel" aria-labelledby={`tab-${active}`} className="items">
        {section.items.map((item) => (
          <li key={item.name}>
            <div className="line">
              <span className="dish">{item.name}</span>
              <span className="leader" aria-hidden="true" />
              <span className="price">{formatNaira(item.price)}</span>
            </div>
            <p>{item.note}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
