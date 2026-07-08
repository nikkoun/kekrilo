import React, { useCallback, useState } from "react";
import { About } from "./components/About";
import { CardGridSection } from "./components/CardGridSection";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { Modal } from "./components/Modal";
import { Navbar } from "./components/Navbar";
import { events } from "./data/events";
import { publications } from "./data/publications";

function App() {
  const [selectedItem, setSelectedItem] = useState(null);

  const closeModal = useCallback(() => setSelectedItem(null), []);

  return (
    <>
      <div className="page-glow page-glow-one" />
      <div className="page-glow page-glow-two" />
      <Navbar />
      <main>
        <Hero />
        <About />
        <CardGridSection
          id="publications"
          eyebrow="Εκδόσεις"
          title="Βιβλία, πρακτικά και μελέτες για την κρητική λογοτεχνία."
          text="Οι εκδόσεις εμφανίζονται ως ενιαίες κάρτες εικόνας. Ανοίξτε κάθε κάρτα για τα πλήρη διαθέσιμα στοιχεία."
          items={publications}
          onOpen={setSelectedItem}
        />
        <CardGridSection
          id="events"
          eyebrow="Εκδηλώσεις"
          title="Συνέδρια, αφιερώματα και δημόσιες δράσεις."
          text="Από επιστημονικά συνέδρια έως εκδηλώσεις μνήμης, το αρχείο δράσεων παρουσιάζεται με την ίδια καθαρή δομή."
          items={events}
          onOpen={setSelectedItem}
        />
        <Contact />
      </main>
      <Footer />
      <Modal item={selectedItem} onClose={closeModal} />
    </>
  );
}

export default App;
