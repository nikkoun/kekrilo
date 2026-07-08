import React from "react";
import { site } from "../data/site";
import { SectionHeader } from "./SectionHeader";

export function Contact() {
  return (
    <section className="section contact-section" id="contact">
      <SectionHeader
        eyebrow="Επικοινωνία"
        title="Για συνεργασίες, εκδόσεις και δράσεις."
        text="Το Κέντρο εδρεύει στη Μυρτιά Ηρακλείου και δραστηριοποιείται σε όλη την Κρήτη."
      />
      <div className="contact-card">
        <div>
          <span>Διεύθυνση</span>
          <strong>{site.address}</strong>
        </div>
        <div>
          <span>Email</span>
          <a href={`mailto:${site.email}`}>{site.email}</a>
        </div>
        <div>
          <span>Στοιχεία</span>
          <strong>
            {site.type} · {site.taxId}
          </strong>
        </div>
      </div>
    </section>
  );
}
