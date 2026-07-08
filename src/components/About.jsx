import { site } from "../data/site";
import { SectionHeader } from "./SectionHeader";

export function About() {
  return (
    <section className="section split-section" id="about">
      <SectionHeader
        eyebrow="Σχετικά"
        title="Ένα ζωντανό κέντρο μελέτης για τη λογοτεχνία της Κρήτης."
        text="Συγκέντρωση, μελέτη και προβολή του έργου Κρητών λογοτεχνών, λόγιας και δημώδους παράδοσης."
      />
      <div className="about-panel">
        {site.about.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        <div className="stat-grid">
          {site.stats.map((stat) => (
            <div key={stat.label}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
