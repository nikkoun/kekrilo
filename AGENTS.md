# AGENTS.md — KEKRILO Website Rebuild

## Project
Rebuild `kekrilo.gr` as a modern, responsive, single-page website for **Κέντρο Κρητικής Λογοτεχνίας** / **ΚΕ.ΚΡΗ.ΛΟ**.

The current site is WordPress-based and should be replaced with a standalone, clean, modern frontend. The target visual direction is inspired by the **public Raycast website**: premium, minimal, polished, modern, product-like, with strong typography, cards, subtle gradients, smooth interactions, and excellent spacing.

Do **not** make it look like an old cultural association, municipality site, generic WordPress theme, museum site, or blog.

## Important creative direction
Use the public Raycast website as the main design inspiration for:

- Hero composition
- Dark/light premium product feel
- Large typography
- Rounded cards
- Gradient/glow accents
- Strong spacing
- Clean navigation
- Smooth interactions
- Modal / command-palette style overlays
- Modern responsive layout

Do not copy Raycast branding, logo, exact text, exact layouts, exact assets, or protected visual identity. Create an original design suitable for a Greek literary/cultural organization.

## Site structure
This is a **single-page website**. Do not create separate public pages for publications or events unless needed internally by the framework.

Sections:

1. Hero
2. About
3. Publications
4. Events
5. Contact

Navigation should scroll to sections.

## Publications and Events behavior
Publications and Events should appear as cards on the page.

When a user clicks a publication or event card, open a **popup / modal / overlay**, not a new page.

Publications and Events should share the same reusable card structure. Each card should be image-led: one image or fallback visual with the title overlaid on top. Keep card text minimal and show the full fetched/seeded text inside the modal after click.

The modal should support:

- Title
- Date/year
- Image/cover/poster if available
- Short metadata
- Full description/content
- External link or PDF link if available
- Close button
- Escape key close
- Click-outside close
- Accessible focus handling if practical

Let implementation details be decided by the codebase/framework, but keep this user experience.

## Content source
Use the current `kekrilo.gr` / `kekrilo.wordpress.com` content as the initial seed content.

Prefer fetching/source-checking through the WordPress.com public API rather than scraping `kekrilo.gr` directly. The custom domain can return TLS/403 issues to command-line fetches, while the WordPress.com API is clean and structured:

- Posts: `https://public-api.wordpress.com/wp/v2/sites/kekrilo.wordpress.com/posts?per_page=...&_embed=1`
- Events category: `categories=924`
- Publications category: `categories=6270`
- Categories: `https://public-api.wordpress.com/wp/v2/sites/kekrilo.wordpress.com/categories?per_page=100`

Use API fields such as `title.rendered`, `date`, `link`, `excerpt.rendered`, `content.rendered`, `featured_media`, and `_embedded["wp:featuredmedia"][0].source_url`. Normalize HTML entities and strip/clean WordPress markup where needed before placing content into static data files.

If an item has no featured image, keep the same card structure and use a polished fallback visual instead of changing the layout.

Current organization context:

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

## Initial content to seed
Use the following as starting content. It is fine to refine wording and create shorter summaries for the frontend.

### Hero copy
Title:
Κέντρο Κρητικής Λογοτεχνίας

Subtitle:
Αρχείο, εκδόσεις και δράσεις για την κρητική λογοτεχνία.

Alternative supporting text:
Το ΚΕ.ΚΡΗ.ΛΟ μελετά, προβάλλει και αναδεικνύει την κρητική λογοτεχνία από την πρώιμη Ενετοκρατία και την Κρητική Αναγέννηση έως σήμερα.

### About copy
Το Κέντρο Κρητικής Λογοτεχνίας ιδρύθηκε το 1998 και εδρεύει στους Βαρβάρους, τη Μυρτιά Ηρακλείου, γενέτειρα του Νίκου Καζαντζάκη. Είναι μη κερδοσκοπικό σωματείο με στόχο τη συγκέντρωση, μελέτη και προβολή του έργου Κρητών λογοτεχνών από την περίοδο της κρητικής αναγέννησης μέχρι σήμερα.

Διοργανώνει συνέδρια, ημερίδες, ομιλίες, αφιερώματα, εκδηλώσεις μνήμης και παρουσιάσεις βιβλίων σε όλη την Κρήτη, ενώ έχει προχωρήσει στην έκδοση σημαντικών έργων για τη μελέτη της κρητικής λογοτεχνίας.

### Publications to seed
Use these as initial cards. If detailed descriptions are missing, use concise placeholder summaries and mark them clearly in the data so they can be edited later.

- Νίκος Καζαντζάκης — Ηράκλειο, 2006
- Κρήτη και Ευρώπη — Βαρβάροι Κρήτης, 2001
- Το Ηράκλειο και η περιοχή του
- Οδηγός Έργων Κρητικής Λογοτεχνίας — Ηράκλειο, Ιούνιος 2002
- Εργογραφία Εμμανουήλ Κριαρά
- Η μαντινάδα της Κρήτης
- Λαβύρινθος
- Αινίγματα – (α)νιώματα

If useful, include these known related publication titles from existing/public references:

- Κρητικά «ΜΟΤΤΟ» στην ποίηση του Δημάκη
- Προσφώνηση στην ερωτική μαντινάδα
- Λαβύρινθος: Γραφές και γλώσσες της μινωικής και μυκηναϊκής Κρήτης
- Δίλογα

### Events to seed
Use these as initial cards. They should open modals.

- Διεθνές συνέδριο για τον Ιωάννη Κονδυλάκη — 2, 3 και 4 Απριλίου 2026
  - Locations mentioned: Ηράκλειο and Βιάννος
  - Important venue examples: Αίθουσα Μανόλης Καρέλλης, Ανδρόγεω, Ηράκλειο; Βλαχάκειο Πνευματικό Κέντρο, Βιάννος
  - Summary: συνέδριο για τον Βιαννίτη συγγραφέα και δημοσιογράφο Ιωάννη Κονδυλάκη, οργανωμένο από το Κέντρο Κρητικής Λογοτεχνίας με τη συνδρομή φορέων της Κρήτης.
- Αποχαιρετισμός στο Γιώργο Μεταξάκη
- Εκδήλωση τιμής στη μνήμη του Βασίλειου Θωμαδάκη
- Συνομιλία με την ποίηση τεσσάρων Κρητών ποιητών
- Θέμος Κορνάρος: ΤΡΙΗΜΕΡΟ Μνήμης και τιμής
- Συνέδριο για την κρητική Αρκαδία
- Το συγγραφικό έργο του Λευτέρη Ηλιάκη
- Το Κέντρο Κρητικής Λογοτεχνίας τιμά τη μνήμη και το έργο του Γιώργου Γραμματικάκη
- Μαρία Πλουμίδου — απολογισμός της τιμητικής εκδήλωσης και της παρουσίασης του συγγραφικού της έργου

## Technical direction
Use a simple modern frontend unless the existing repo clearly requires something else.

A good default is:

- Vite
- React
- JavaScript or TypeScript, based on the repo's existing setup
- Modern CSS, CSS Modules, or Tailwind if already present or clearly useful
- Static data files for content
- Responsive, mobile-first design
- No backend unless explicitly needed

This project intentionally prefers Vite over Next.js for now. Raycast's public website appears to use Next.js on Vercel, but KEKRILO's current scope is a static single-page presentation, so Vite + React is the practical default. Keep the implementation lightweight, polished, and usable.

## Content architecture
Keep content structured, even if static.

Suggested files:

- `src/data/site.js` or `src/data/site.ts`
- `src/data/publications.js` or `.ts`
- `src/data/events.js` or `.ts`

Suggested components:

- `Hero`
- `About`
- `Publications`
- `Events`
- `Contact`
- `Card`
- `Modal`
- `SectionHeader`
- `Navbar`
- `Footer`

Do not hardcode everything directly in one giant component unless the repo is extremely small. Keep it clean.

## Design requirements
- Fully responsive: mobile, tablet, desktop
- Modern landing-page layout
- Premium spacing and typography
- Smooth scrolling navigation
- Sticky or floating nav if it fits
- Publications and events as card grids
- Modal overlays for details
- Good hover states
- Subtle animation is allowed
- Greek text must render correctly
- Use semantic HTML where practical
- Avoid unnecessary dependencies
- Avoid visual clutter
- Good empty/fallback states for missing images or descriptions
- Accessible navigation and modal behavior where practical
- Publications and Events cards should use the same reusable image-overlay structure

## Things to avoid
- No old WordPress/blog look
- No sidebar
- No carousel/slider
- No municipality-style layout
- No generic Bootstrap-looking cards
- No fake parchment texture
- No overloaded menus
- No separate event/publication pages for the public UX
- No heavy backend unless the repo already has one or it is clearly required

## Quality bar
The result should feel like a polished modern template that can be shown to the organization as a serious redesign direction.

Prioritize:

1. Visual quality
2. Clean architecture
3. Responsiveness
4. Good content structure
5. Easy future editing
