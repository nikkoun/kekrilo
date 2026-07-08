# KEKRILO Website Rebuild Prompt

Rebuild `kekrilo.gr` as a modern, responsive, single-page website for **Κέντρο Κρητικής Λογοτεχνίας** / **ΚΕ.ΚΡΗ.ΛΟ**.

The current site is WordPress-based and should be replaced with a standalone frontend. Build a polished, modern, product-like site inspired by the public Raycast website's visual quality and interaction style, but do not copy Raycast branding, logo, exact layouts, text, or assets.

## Tech Stack

Use:

- Vite
- React
- JavaScript or TypeScript, based on the repo's existing setup
- Modern CSS, CSS Modules, or Tailwind if already present or clearly useful
- Static structured data files for content
- No backend unless explicitly required

Prefer a clean, maintainable static frontend. The goal is a premium single-page presentation, not a complex web app.

## Design Direction

Use Raycast's public website as design inspiration:

- Premium product-site feel
- Strong typography
- Dark/light refined visual language
- Smooth gradients and glows
- Rounded cards
- Clean spacing
- Floating/sticky navigation if appropriate
- Polished hover/focus states
- Modal/command-palette inspired overlays
- Smooth interactions and transitions

Do not make it look like:

- Old cultural association site
- Municipality site
- Museum archive site
- WordPress theme
- Generic Bootstrap layout
- Blog/sidebar layout
- Parchment/folk/traditional texture design

The final result should feel like a serious modern redesign direction suitable to present to the organization.

## Site Structure

This is a **single-page website**.

Sections:

1. Hero
2. About
3. Publications
4. Events
5. Contact

Navigation should scroll smoothly to sections. Do not create separate public pages for publications or events.

## Publications and Events UX

Publications and Events should appear as responsive card grids.

When a user clicks a publication or event card, open a **modal / overlay**, not a new page.

The modal should support:

- Title
- Date/year
- Image/cover/poster if available
- Metadata
- Full description/content
- External link or PDF link if available
- Close button
- Escape key close
- Click-outside close
- Accessible focus handling where practical

Use a reusable modal component rather than duplicating modal logic.

## Content Architecture

Keep content structured and easy to edit.

Suggested files:

- `src/data/site.js` or `src/data/site.ts`
- `src/data/publications.js` or `.ts`
- `src/data/events.js` or `.ts`

Suggested components:

- `Navbar`
- `Hero`
- `About`
- `Publications`
- `Events`
- `Contact`
- `Footer`
- `Card`
- `Modal`
- `SectionHeader`

Avoid placing all content and layout in one giant component unless the repo is extremely small.

## Content Source

Use the current `kekrilo.gr` / `kekrilo.wordpress.com` content as initial seed content where available.

Prefer fetching/source-checking through the WordPress.com public API rather than scraping `kekrilo.gr` directly. The custom domain may return TLS/403 issues to command-line fetches, while the WordPress.com API is clean and structured:

- Posts: `https://public-api.wordpress.com/wp/v2/sites/kekrilo.wordpress.com/posts?per_page=...&_embed=1`
- Events category: `categories=924`
- Publications category: `categories=6270`
- Categories: `https://public-api.wordpress.com/wp/v2/sites/kekrilo.wordpress.com/categories?per_page=100`

Use API fields such as `title.rendered`, `date`, `link`, `excerpt.rendered`, `content.rendered`, `featured_media`, and `_embedded["wp:featuredmedia"][0].source_url`. Normalize HTML entities and strip/clean WordPress markup where needed before placing content into static data files.

If a fetched item has no featured image, keep the same card structure and use a polished generated/fallback visual treatment rather than changing the layout.

Organization context:

- Name: Κέντρο Κρητικής Λογοτεχνίας
- Abbreviation: ΚΕ.ΚΡΗ.ΛΟ
- Founded: 1998
- Type: μη κερδοσκοπικό σωματείο
- Location: Βαρβάροι / Μυρτιά, Δήμος Αρχανών-Αστερουσίων, Κρήτη
- Mission: συγκέντρωση, μελέτη και προβολή των Κρητών λογοτεχνών από την κρητική αναγέννηση μέχρι σήμερα
- Broader description: παγκρήτιο σωματείο για την προώθηση, μελέτη και ανάδειξη της κρητικής λογοτεχνίας, λόγιας και δημώδους, από την πρώιμη Ενετοκρατία έως σήμερα
- Activities: συνέδρια, ημερίδες, ομιλίες, αφιερώματα, εκδηλώσεις μνήμης, παρουσιάσεις βιβλίων, εκδόσεις
- Contact address: Βαρβάροι (Μυρτιά), 701 00, Δήμου Αρχανών-Αστερουσίων
- Email: kekrilo@gmail.com
- Tax ID shown on old site: ΑΦΜ 999981351

## Hero Copy

Title:

Κέντρο Κρητικής Λογοτεχνίας

Subtitle:

Αρχείο, εκδόσεις και δράσεις για την κρητική λογοτεχνία.

Supporting text:

Το ΚΕ.ΚΡΗ.ΛΟ μελετά, προβάλλει και αναδεικνύει την κρητική λογοτεχνία από την πρώιμη Ενετοκρατία και την Κρητική Αναγέννηση έως σήμερα.

## About Copy

Το Κέντρο Κρητικής Λογοτεχνίας ιδρύθηκε το 1998 και εδρεύει στους Βαρβάρους, τη Μυρτιά Ηρακλείου, γενέτειρα του Νίκου Καζαντζάκη. Είναι μη κερδοσκοπικό σωματείο με στόχο τη συγκέντρωση, μελέτη και προβολή του έργου Κρητών λογοτεχνών από την περίοδο της κρητικής αναγέννησης μέχρι σήμερα.

Διοργανώνει συνέδρια, ημερίδες, ομιλίες, αφιερώματα, εκδηλώσεις μνήμης και παρουσιάσεις βιβλίων σε όλη την Κρήτη, ενώ έχει προχωρήσει στην έκδοση σημαντικών έργων για τη μελέτη της κρητικής λογοτεχνίας.

## Publications To Seed

Use these as initial cards. If detailed descriptions are missing, use concise placeholder summaries and mark them clearly in the data for later editing.

- Νίκος Καζαντζάκης — Ηράκλειο, 2006
- Κρήτη και Ευρώπη — Βαρβάροι Κρήτης, 2001
- Το Ηράκλειο και η περιοχή του
- Οδηγός Έργων Κρητικής Λογοτεχνίας — Ηράκλειο, Ιούνιος 2002
- Εργογραφία Εμμανουήλ Κριαρά
- Η μαντινάδα της Κρήτης
- Λαβύρινθος
- Αινίγματα - (α)νιώματα
- Κρητικά «ΜΟΤΤΟ» στην ποίηση του Δημάκη
- Προσφώνηση στην ερωτική μαντινάδα
- Λαβύρινθος: Γραφές και γλώσσες της μινωικής και μυκηναϊκής Κρήτης
- Δίλογα

## Events To Seed

Use these as initial cards. They should open modals.

- Διεθνές συνέδριο για τον Ιωάννη Κονδυλάκη — 2, 3 και 4 Απριλίου 2026
  - Locations: Ηράκλειο and Βιάννος
  - Venue examples: Αίθουσα Μανόλης Καρέλλης, Ανδρόγεω, Ηράκλειο; Βλαχάκειο Πνευματικό Κέντρο, Βιάννος
  - Summary: συνέδριο για τον Βιαννίτη συγγραφέα και δημοσιογράφο Ιωάννη Κονδυλάκη, οργανωμένο από το Κέντρο Κρητικής Λογοτεχνίας με τη συνδρομή φορέων της Κρήτης.
- Αποχαιρετισμός στο Γιώργο Μεταξάκη
- Εκδήλωση τιμής στη μνήμη του Βασίλειου Θωμαδάκη
- Συνομιλία με την ποίηση τεσσάρων Κρητών ποιητών
- Θέμος Κορνάρος: ΤΡΙΗΜΕΡΟ Μνήμης και τιμής
- Συνέδριο για την κρητική Αρκαδία
- Το συγγραφικό έργο του Λευτέρη Ηλιάκη
- Το Κέντρο Κρητικής Λογοτεχνίας τιμά τη μνήμη και το έργο του Γιώργου Γραμματικάκη
- Μαρία Πλουμίδου — απολογισμός της τιμητικής εκδήλωσης και της παρουσίασης του συγγραφικού της έργου

## UX And Quality Requirements

- Fully responsive: mobile, tablet, desktop
- Modern landing-page layout
- Greek text renders correctly
- Semantic HTML where practical
- Accessible navigation and modal behavior
- Strong mobile layout
- No visual clutter
- No carousel/slider
- No sidebar
- No unnecessary dependencies
- Good empty/fallback states for missing images or descriptions
- Smooth scroll and subtle animation are acceptable
- Cards should be clickable with clear affordance
- Publications and Events cards should use the same reusable structure
- Each Publication/Event card should be image-led: one image or fallback visual with the title overlaid on top
- Card summaries should stay minimal; the full text/content should appear in the modal after click
- Keep future editing straightforward

## Implementation Expectations

Before editing, inspect the repo and follow its existing structure where reasonable.

If the repo is empty or minimal, scaffold a clean Vite React project structure.

Prioritize:

1. Visual quality
2. Clean component architecture
3. Responsiveness
4. Structured editable content
5. Practical maintainability

After implementation, run the available build/lint checks if configured and report what passed or could not be run.
