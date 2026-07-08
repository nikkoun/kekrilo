import React from "react";
import { site } from "../data/site";

export function Navbar() {
  return (
    <header className="nav-shell">
      <a className="brand" href="#hero" aria-label="ΚΕ.ΚΡΗ.ΛΟ αρχική">
        <span className="brand-mark">Κ</span>
        <span>
          <strong>ΚΕ.ΚΡΗ.ΛΟ</strong>
          <small>Κρητική Λογοτεχνία</small>
        </span>
      </a>

      <nav className="nav-links" aria-label="Κύρια πλοήγηση">
        {site.nav.map((item) => (
          <a key={item.href} href={item.href}>
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
