# MBUMAH HARDWARE: Quotation Only Catalogue RFQ Platform

Final Prototype v1.0. Release tag: v1.0-mbumah-final

Single page quotation-only catalogue. No checkout, no prices: customers browse, add items to a quote list and send an RFQ. Sales confirms itemised pricing in 30 minutes (Mon to Sat 7AM to 7PM) via WhatsApp.

## Stack
- Single `index.html`, embedded CSS and vanilla JS, no build step
- Poppins headings, Inter body, navy #0F2942, orange #FF8C1A
- Quote list persisted in localStorage key `mbumah_cart`
- Client remarks persisted in localStorage key `mbumah_remarks`; new submissions are held as pending until the owner approves them
- Records API hooks (collections `quote_items` and `client_remarks`) ready for deployment persistence
- Deployable to any static host (built for Vercel)

## Structure (19 sections)
Topbar, Header, Sticky 4-step progress, Sliding hero (3 slides), Quantified strip, Personas, Master Catalogue (15 categories, ~200 core lines, search, category chips with counts, Show More paging), Delivery (Juja coverage chips), Find Us map (Google Maps embed with yard pin + client pin-drop tool), Why Choose Us, Brand Partners, Diaspora, Estimators (wall, roof, paint), Projects, Social Gallery slideshow (auto playing, 8 photos, linked to Instagram, YouTube, Facebook, WhatsApp Channel and TikTok), Client remarks (display + submit form), Request form with live quote list, FAQ, and Footer.

## Clean URL policy (no fragment addresses)
- In-page navigation (nav bar, mobile menu, hero buttons, footer links, bottom tab bar, skip link) scrolls smoothly to the section but never appends a fragment to the address bar, so copied or shared addresses always show the clean base URL `https://www.mbumahhardware.co.ke/` with no `#home`, `#catalogue` or `#estimators`.
- Section anchors and their ids stay in the markup for crawlers and accessibility; a shared deep link such as `.../#catalogue` is honoured once (the page scrolls to the catalogue) and the hash is then stripped from the address bar.
- The functional hash `#owner-review` is excluded from this policy: it keeps working as the owner access trigger (see Owner remark approval workflow).
- Canonical link and `og:url` already point to the clean base URL without a fragment.

## Master product catalogue
- The catalogue mirrors the MBUMAH HARDWARE master product catalogue: 15 categories, about 200 core product lines generated into the PRODUCTS array (searchable by name, brand, SKU, use and category).
- Categories: Hand Tools & Construction Tools, Building Materials, Nails/Bolts/Nuts & Fasteners, Steel & Metal Products, Roofing Materials, Paints & Painting Accessories, Plumbing Materials, Electrical Materials, Tiles & Flooring, Doors/Locks & Furniture Fittings, Safety Equipment & Protective Wear, Welding & Metalwork Accessories, Fencing & Outdoor Construction, General Hardware & Household, Building Finishing & Accessories.
- The yard stocks 375+ products across the 15 categories once size and gauge variants are counted; the hero eyebrow, quantified strip and Wide Range card all carry these figures.
- Product photos: every one of the 196 lines carries its own real product photo, self hosted in `assets/` under its SKU name (`assets/mb-<cat>-<nnn>.jpg`); no photo is shared between two products. Keepers with long-standing descriptive files (for example `assets/mattock.jpeg`, `assets/hammer.jpg`) stay exclusive to their line. The four previously marketed lines (Mattocks, Bed Bolts, Work Gloves, Drawer Handles) each have their own photo.
- WhatsApp quote output: the quote list renders into the request form and the WhatsApp draft as a numbered list with product name and quantity only, one line per item (for example `1. Mattocks - Quantity: 2`), no images and no other item details.
- The grid shows 24 cards at a time with a Show More Products button and a Showing X of Y counter. Pricing stays Price on Quotation on every card; there is no checkout.
- To edit the catalogue: change the items list in `scripts/build_master_catalogue.py`, rerun it to regenerate the PRODUCTS array and category chips, and rerun `scripts/download_catalogue_images.py` for new photos.

## New delivery details and client remarks page
The standalone `delivery-request.html` adds a Juja-focused delivery details flow alongside the existing catalogue:

- **Enter a map pin:** paste a Google Maps URL, latitude/longitude coordinates, plus code or location text. Google Maps URLs and coordinates display as a clickable preview. A link to the Mbumah Hardware map location is provided as a reference.
- **Add site directions:** give an area, landmark or access instructions to help the team identify the delivery site.
- **Client remarks and feedback:** type delivery notes, preferred timing, access details, feedback or other comments and review the live preview before proceeding.
- **Send a draft for confirmation:** "Continue on WhatsApp" opens a prefilled message to the existing WhatsApp Sales contact. The customer reviews and sends it; the static page does not submit or persist these details.
- **Juja coverage:** the page calls out Juja town, Juja Farm and surrounding sites. Delivery availability, route/access, schedule and transport charges remain subject to confirmation for the particular location and order.

Open `delivery-request.html` from the deployed site, or run the static site locally and visit `/delivery-request.html`. The delivery terms notice is short and mentions Mbumah Hardware only: deliveries run Mon to Sat 7AM to 7PM around Juja and the neighbouring estates, and the sales team confirms cost and timing for each order before dispatch.

### Manual verification checklist
1. Open `delivery-request.html`; check the layout at desktop and mobile widths.
2. Paste a Google Maps URL or `-1.1483165, 37.0609671`; verify a clickable map preview. Try ordinary site text; verify it is included as text and displays the guidance message.
3. Type and clear remarks; ensure the live preview updates and returns to its empty prompt.
4. Enter a pin, directions and remarks, then click **Continue on WhatsApp**; verify the draft contains those values, is URL-encoded and asks the team to confirm delivery. Do not send unless desired.
5. Confirm that no details are sent automatically or stored by the page and delivery terms are described as quote-specific.

The repository is a static HTML prototype without a configured browser-test runner. The checklist above is the manual acceptance test; it should be run on the deployed preview before release.

## Find Us map on the home page
The Find Us section on `index.html` (section 9) shows the yard on the map:

- Keyless Google Maps embed pinned to the Mbumah Hardware yard at lat -1.1483165, lng 37.0609671, the same Google Maps place used by `delivery-request.html`, with Open in Google Maps and Get Directions buttons.
- Pin Your Site tool (Leaflet + OpenStreetMap tiles, no API key): clients tap the mini map to drop a delivery pin, Use My Location reads GPS, then Share Pin on WhatsApp sends coordinates plus a Google Maps link to sales. Copy Coordinates is included and the tool degrades to a WhatsApp fallback message if the Leaflet CDN is unreachable.
- To move the pin: change MAP_YARD in the script, the iframe src in the Find Us section and the two map-actions links. The coordinates are mirrored in the JSON-LD geo and hasMap fields.

## Delivery coverage
Delivery location is Juja and Environs: Juja Town, Gachororo, Kalimoni, Juja Farm, Witeithie, Mangu and Kenyatta Road. The coverage chips sit in the Delivery band, the same areas are the options in the quotation form delivery select, and the FAQ answers Where do you deliver? and Where exactly is the yard located?. The form field is Delivery Location, Juja & Environs.

## Client remarks on the home page
- Section 16 shows seeded remarks from clients around Juja (contractor, reseller, home builder, diaspora). Edit the four article cards in `#reviewsList` to replace them with real client feedback.
- Share Your Remarks form: name, area (Juja delivery areas), 1 to 5 star rating, remarks up to 300 characters. Submissions are NOT posted publicly. Each one is stored with status `pending`, listed only to the sender under the form as Awaiting owner approval (with a withdraw control) and queued through the `client_remarks` records hook when an endpoint is configured. The public feed shows only the seeded cards and remarks the owner has approved.
- A WhatsApp alternative link lets clients send remarks straight to the owner. For delivery instructions plus remarks in one WhatsApp draft, `delivery-request.html` is linked from the Pin Your Site card.

## Owner remark approval workflow
- Remarks stay private until the owner approves them. Pending remarks are never rendered in the Client Remarks feed.
- Owner panel: open the site with `#owner-review` in the address bar (for example `https://www.mbumahhardware.co.ke/#owner-review`). The panel lists every pending remark with the client name, area, rating and date.
- Approve and Post moves the remark into the Client Remarks feed on that device with a Your remark badge; Decline removes it. Close the panel with the X button, the backdrop or Escape.
- Remarks submitted on other devices reach the owner through the `client_remarks` records endpoint once configured, or through the WhatsApp link under the form. To publish an approved remark site-wide, copy its text into one of the seeded article cards in `#reviewsList`.

## Social profiles
Linked in the footer Follow Us block, in the Social Gallery slideshow section (nav: Socials) and in the LocalBusiness JSON-LD schema (`sameAs`):
- Instagram: https://www.instagram.com/mbumahhardware
- YouTube: https://www.youtube.com/@mbumahhardware-g7b
- Facebook: https://www.facebook.com/profile.php?id=61595911899420
- WhatsApp Channel: https://whatsapp.com/channel/0029Vb9Moad5Ejy5aDbMLs0t
- TikTok: https://www.tiktok.com/@mbumah_hardware_juja

Business contacts (client confirmed):
- Phone 1: +254 759 963 601, call and WhatsApp (tel link plus a WhatsApp chat chip in the topbar, Find Us card and footer)
- Phone 2: +254 795 191 909, call and WhatsApp (same treatment; also the WhatsApp Sales line used by the quote list, pin share, remarks and delivery request flows)
- Email: mbumahhardware@gmail.com (topbar, Find Us card, footer, JSON-LD)
- JSON-LD carries both numbers as `contactPoint` sales entries with the Gmail email.

Slideshow behaviour: auto advances every 4 seconds, crossfade 700 ms, Ken Burns zoom, pauses on hover, when the tab is hidden and when scrolled out of view, dots and arrows, tap a caption chip to open the corresponding social platform.

## Request channels: email push + WhatsApp
- On submit the request is pushed automatically to the yard inbox `mbumahhardware@gmail.com` through FormSubmit (`https://formsubmit.co/ajax/...`), no backend needed. The first ever submission makes FormSubmit send a one-time activation email to that inbox; click the activation link once and every later request lands in the inbox on its own.
- The email carries the reference, name, phone, client email as reply-to, company, delivery area, date needed, the numbered product list, notes and the BOQ file as a real attachment (up to 4 MB). If the multipart post is blocked the page retries as JSON, and the success panel always shows the true email status.
- The WhatsApp output stays numbered, `1. Product Name - Quantity: xx`, and is built straight from the live quote list so every product on the quotation is included; anything typed by hand into the products box is preserved as extra items.
- Clicking **Send Request** opens WhatsApp automatically in a new tab with the full request prefilled (reference, client details, numbered list), so no second tap is needed. The link is opened inside the click so browsers do not block it; if a browser blocks it anyway, the success panel says so and `Continue on WhatsApp` stays as the manual fallback with the same message. A WhatsApp chat link cannot carry file attachments, so the BOQ travels by email and the message asks the client to attach it in the chat as well.
- Generic WhatsApp chat links (WhatsApp Sales button and the chat chips beside each phone number) open with the client's current quotation list included when one exists, otherwise with a simple enquiry greeting.

## Visitor counter and analytics
Three independent, privacy-friendly tracking pieces are built in. None of them uses cookies, IP addresses or personal data, and none of them can slow the page down or break it: every call is fire-and-forget, deferred until after the page has fully loaded, and every failure is swallowed silently.

**1. Vercel Web Analytics (works immediately, dashboard only)**
- Both pages (`index.html` and `delivery-request.html`) inject the official Vercel snippet (`window.va` stub plus `/_vercel/insights/script.js`) on live http(s) deployments only; `file://` previews skip it.
- To see the numbers: Vercel dashboard > the `mbumah-hardware-final` project > **Analytics** tab > enable Web Analytics (free). Pageviews, referrers, countries and devices appear within minutes of enabling. If it is not enabled yet, the script request simply 404s and nothing else changes.

**2. Vercel Speed Insights (real-user performance, dashboard only)**
- Both pages also inject the Speed Insights snippet (`window.si` stub plus `/_vercel/speed-insights/script.js`) with the same guard rails: live http(s) deployments only, and a silent 404 until the feature is switched on.
- Enable it in the dashboard (**Speed Insights** tab) and it starts collecting real-user LCP / INP / CLS per page and device. Nothing to maintain afterwards; to remove it, delete the injection block from the two pages.

**3. Public visits chip in the footer (one-time 5 minute setup, counts on the site itself)**
- A small chip (`i-eye` icon) sits in the footer bottom bar and shows `X visits · Y visitors` once a counter backend is configured. Until then it is completely hidden.
- Backend: `integrations/visits-backend.gs`, a ~100 line Google Apps Script that stores counters in a Google Sheet it creates by itself in the owner's Google Drive. Full install steps are in the header of that file (script.google.com > new project > paste > Deploy as Web app, Execute as: Me, access: Anyone > copy the `/exec` URL).
- Activate: paste the `/exec` URL into `var VISITS_ENDPOINT = "";` in `index.html` (near `WA_LINK` at the top of the script) and deploy as usual. To turn the chip off again, clear that variable.
- How it is counted (all server side, so refreshes and tabs are accurate):
  - `views` - every page load. Not shown in the chip; kept in the sheet.
  - `visits` - one per browsing session: the browser sends a random session id kept in `sessionStorage`, so reloads inside one session do not inflate the count.
  - `visitors` - one per device/browser: a random id kept in `localStorage` is counted once ever by the sheet (it keeps a visitor list for dedupe).
- Accuracy limits, stated honestly: private/incognito windows and "clear browsing data" produce a new visitor id (counted as a new visitor); the ids are per browser profile, not per person; and because the endpoint is public, a determined spammer could inflate the numbers. For a local hardware site this trade-off is fine; the escape hatch is documented in the backend file (same JSON contract on any real database).
- Maintenance: open the "Mbumah Hardware - Site Visits" sheet in Drive to read the numbers (Stats tab); clear Stats column B plus the Visitors/Sessions tabs to reset; redeploy code changes via Deploy > Manage deployments > edit > new version so the `/exec` URL never changes.

## Local SEO implementation (Juja playbook)
- Title tag and meta description carry the money keywords: "Hardware Store in Juja", building materials, same-day delivery, plus the estate names (Juja Farm, Gachororo, Kalimoni) that buyers actually search. `og:`/`twitter:` tags mirror them.
- Hero H1 reads "Juja's Trusted Hardware and Building Materials Partner" - category plus location in the strongest on-page signal; hero font size tuned to keep it on two lines.
- `robots.txt` allows all crawlers and points at the sitemap; `sitemap.xml` lists `/` and `/delivery-request` (clean URLs, matching `cleanUrls: true`).
- JSON-LD: the `HardwareStore` block gains a `slogan` and a full `areaServed` list (Juja, Juja Farm, Gachororo, Kalimoni, Witeithie, Mangu, Kenyatta Road); a separate `FAQPage` block mirrors the 15 on-page FAQ questions exactly.
- FAQ grew from 6 to 15 answers covering the research questions Juja buyers type: mabati gauge (26/28/30), 32.5N vs 42.5N cement, roofing a three-bedroom cost path, fencing a plot, minimum orders, Sunday opening, BOQ submission, quotation speed, JKUAT landlord projects. No prices are invented - every answer ends in the quotation flow.
- New "Delivery Around Juja" card in Find Us names the estates and the JKUAT/Kenyatta Road corridors; internal links connect Catalogue -> FAQ/Delivery and the coverage row -> FAQ.
- `delivery-request.html` mirrors the pattern: title "Building Materials Delivery in Juja", estate meta description, canonical to `/delivery-request`, and OG/Twitter tags.

## Vercel platform hardening
- `vercel.json` sends Vercel's recommended security headers on every response: `X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN` (blocks third-party clickjacking), `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy` with camera, microphone and geolocation locked off, `Strict-Transport-Security` (two years, includes subdomains) and `X-DNS-Prefetch-Control: on`. Verify with `curl -sI https://www.mbumahhardware.co.ke`.
- No `Content-Security-Policy` on purpose: the site intentionally loads Google Fonts, Leaflet from jsDelivr and the Google Maps embed, and one wrong origin in the policy would break them. Revisit only if those third parties change.
- The deprecated `X-XSS-Protection` header is intentionally omitted; the XSS auditor was removed from all modern browsers, so the header is dead weight today.

## Deploy
`vercel deploy --prod`

## Domains and redirects
- Primary domain: `https://www.mbumahhardware.co.ke`. Canonical link, `og:url` and the JSON-LD `url` all point here.
- Apex `mbumahhardware.co.ke` redirects to `https://www.mbumahhardware.co.ke` (Vercel dashboard domain redirect).
- The legacy `https://mbumah-hardware-final.vercel.app` host 308 redirects every path to the primary domain through the host match in `vercel.json`.
- In-page navigation never leaves `#section` fragments in the address bar; deep links are honoured once, then cleaned.
