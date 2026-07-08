import React from "react";

export function ContentCard({ item, onOpen }) {
  return (
    <button className="content-card" type="button" onClick={() => onOpen(item)}>
      <div className="content-card-media" aria-hidden="true">
        {item.image ? (
          <img src={item.image} alt="" loading="lazy" />
        ) : (
          <div className="fallback-art">
            <span>{item.type === "publication" ? "ΕΚ" : "ΔΡ"}</span>
          </div>
        )}
      </div>
      <span className="card-kind">
        {item.type === "publication" ? "Έκδοση" : "Εκδήλωση"}
      </span>
      <div className="content-card-overlay">
        <span>{item.meta}</span>
        <h3>{item.title}</h3>
      </div>
    </button>
  );
}
