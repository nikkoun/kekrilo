import { site } from "../data/site";

export function Hero() {
  return (
    <section className="hero section" id="hero">
      <div className="hero-copy">
        <p className="eyebrow">{site.hero.eyebrow}</p>
        <h1>{site.hero.title}</h1>
        <p className="hero-subtitle">{site.hero.subtitle}</p>
        <p className="hero-text">{site.hero.text}</p>
        <div className="hero-actions">
          <a href="#publications">Δείτε τις εκδόσεις</a>
          <a href="#events">Τρέχουσες δράσεις</a>
        </div>
      </div>

      <div className="hero-console" aria-label="Σύνοψη δράσεων ΚΕ.ΚΡΗ.ΛΟ">
        <div className="console-bar">
          <span />
          <span />
          <span />
          <kbd>⌘ K</kbd>
        </div>
        <div className="console-list">
          <div>
            <span>01</span>
            <strong>Αρχείο Κρητικής Λογοτεχνίας</strong>
            <small>Από την πρώιμη Ενετοκρατία έως σήμερα</small>
          </div>
          <div>
            <span>02</span>
            <strong>Εκδόσεις και πρακτικά</strong>
            <small>Μελέτες, οδηγοί και συνεδριακοί τόμοι</small>
          </div>
          <div>
            <span>03</span>
            <strong>Συνέδρια και αφιερώματα</strong>
            <small>Δράσεις σε όλη την Κρήτη</small>
          </div>
        </div>
      </div>
    </section>
  );
}
