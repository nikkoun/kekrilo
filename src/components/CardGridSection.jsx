import { ContentCard } from "./ContentCard";
import { SectionHeader } from "./SectionHeader";

export function CardGridSection({ id, eyebrow, title, text, items, onOpen, isLoading }) {
  return (
    <section className="section" id={id}>
      <SectionHeader eyebrow={eyebrow} title={title} text={text} />

      {isLoading ? <p className="loading-note">Φόρτωση περιεχομένου από το αρχείο...</p> : null}

      <div className="card-grid">
        {items.map((item) => (
          <ContentCard key={item.id} item={item} onOpen={onOpen} />
        ))}
      </div>
    </section>
  );
}
