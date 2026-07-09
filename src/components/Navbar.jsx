import React from "react";
import { site } from "../data/site";

export function Navbar({ theme, onToggleTheme }) {
  const isDark = theme === "dark";

  return (
    <header className="nav-shell">
      <a className="brand" href="#hero" aria-label="ΚΕ.ΚΡΗ.ΛΟ αρχική">
        <img className="brand-mark" src="/favicon.png" alt="" />
        <span>
          <strong>ΚΕ.ΚΡΗ.ΛΟ</strong>
          <small>Κρητική Λογοτεχνία</small>
        </span>
      </a>

      <div className="nav-actions">
        <nav className="nav-links" aria-label="Κύρια πλοήγηση">
          {site.nav.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <button
          className="theme-toggle"
          type="button"
          aria-pressed={isDark}
          onClick={onToggleTheme}
        >
          {isDark ? "Φωτεινό" : "Σκούρο"}
        </button>
      </div>
    </header>
  );
}
