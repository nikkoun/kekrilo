import React, { useEffect, useRef } from "react";

export function Modal({ item, onClose }) {
  const panelRef = useRef(null);
  const closeRef = useRef(null);

  useEffect(() => {
    if (!item) return;

    const previousFocus = document.activeElement;
    panelRef.current?.focus();
    document.body.classList.add("modal-open");

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.classList.remove("modal-open");
      previousFocus?.focus?.();
    };
  }, [item, onClose]);

  if (!item) return null;

  return (
    <div className="modal-backdrop" onMouseDown={onClose}>
      <article
        ref={panelRef}
        className="modal-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        tabIndex="-1"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="modal-media">
          {item.image ? (
            <img src={item.image} alt="" />
          ) : (
            <div className="fallback-art fallback-art-large">
              <span>{item.type === "publication" ? "Έκδοση" : "Δράση"}</span>
            </div>
          )}
        </div>

        <div className="modal-body">
          <div className="modal-topline">
            <span>{item.type === "publication" ? "Έκδοση" : "Εκδήλωση"}</span>
            <span>{item.date || item.meta}</span>
          </div>
          <h2 id="modal-title">{item.title}</h2>
          <p className="modal-meta">{item.meta}</p>

          <div
            className="modal-content"
            dangerouslySetInnerHTML={{
              __html: item.contentHtml || "<p>Το πλήρες κείμενο θα προστεθεί σύντομα.</p>"
            }}
          />

          <div className="modal-actions">
            {item.sourceUrl ? (
              <a href={item.sourceUrl} target="_blank" rel="noreferrer">
                Άνοιγμα πηγής
              </a>
            ) : null}
            <button ref={closeRef} type="button" onClick={onClose}>
              Κλείσιμο
            </button>
          </div>
        </div>
      </article>
    </div>
  );
}
