import React, { useMemo, useState } from "react";
import { ContentCard } from "./ContentCard";
import { SectionHeader } from "./SectionHeader";

const ITEMS_PER_PAGE = 12;

export function CardGridSection({ id, eyebrow, title, text, items, onOpen }) {
  const [page, setPage] = useState(0);
  const pageCount = Math.ceil(items.length / ITEMS_PER_PAGE);
  const hasPagination = pageCount > 1;

  const visibleItems = useMemo(() => {
    const start = page * ITEMS_PER_PAGE;
    return items.slice(start, start + ITEMS_PER_PAGE);
  }, [items, page]);

  function goToPreviousPage() {
    setPage((currentPage) => Math.max(currentPage - 1, 0));
  }

  function goToNextPage() {
    setPage((currentPage) => Math.min(currentPage + 1, pageCount - 1));
  }

  return (
    <section className="section" id={id}>
      <SectionHeader eyebrow={eyebrow} title={title} text={text} />

      <div className="card-grid">
        {visibleItems.map((item) => (
          <ContentCard key={item.id} item={item} onOpen={onOpen} />
        ))}
      </div>

      {hasPagination ? (
        <div className="pagination-controls" aria-label={`${eyebrow} σελίδες`}>
          <button type="button" onClick={goToPreviousPage} disabled={page === 0}>
            ← Προηγούμενα
          </button>
          <span>
            {page + 1} / {pageCount}
          </span>
          <button
            type="button"
            onClick={goToNextPage}
            disabled={page === pageCount - 1}
          >
            Επόμενα →
          </button>
        </div>
      ) : null}
    </section>
  );
}
