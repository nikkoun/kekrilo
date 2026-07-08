import { useCallback, useEffect, useState } from "react";
import { About } from "./components/About";
import { CardGridSection } from "./components/CardGridSection";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { Modal } from "./components/Modal";
import { Navbar } from "./components/Navbar";
import { fallbackContent, fetchContent } from "./services/wordpress";

function App() {
  const [content, setContent] = useState(fallbackContent);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    let ignore = false;

    fetchContent()
      .then((remoteContent) => {
        if (!ignore) {
          setContent(remoteContent);
        }
      })
      .catch(() => {
        if (!ignore) {
          setContent(fallbackContent);
        }
      })
      .finally(() => {
        if (!ignore) {
          setIsLoading(false);
        }
      });

    return () => {
      ignore = true;
    };
  }, []);

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
          items={content.publications}
          onOpen={setSelectedItem}
          isLoading={isLoading}
        />
        <CardGridSection
          id="events"
          eyebrow="Εκδηλώσεις"
          title="Συνέδρια, αφιερώματα και δημόσιες δράσεις."
          text="Από επιστημονικά συνέδρια έως εκδηλώσεις μνήμης, το αρχείο δράσεων παρουσιάζεται με την ίδια καθαρή δομή."
          items={content.events}
          onOpen={setSelectedItem}
          isLoading={isLoading}
        />
        <Contact />
      </main>
      <Footer />
      <Modal item={selectedItem} onClose={closeModal} />
    </>
  );
}

export default App;
