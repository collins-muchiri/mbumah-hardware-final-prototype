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

Open `delivery-request.html` from the deployed site, or run the static site locally and visit `/delivery-request.html`. The Chazaq Hardware delivery page is linked as regional context only; it is not represented as Mbumah's delivery policy, rates, minimums or service guarantees.

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

## Deploy
`vercel deploy --prod`

## Domains and redirects
- Primary domain: `https://www.mbumahhardware.co.ke`. Canonical link, `og:url` and the JSON-LD `url` all point here.
- Apex `mbumahhardware.co.ke` redirects to `https://www.mbumahhardware.co.ke` (Vercel dashboard domain redirect).
- The legacy `https://mbumah-hardware-final.vercel.app` host 308 redirects every path to the primary domain through the host match in `vercel.json`.
- In-page navigation never leaves `#section` fragments in the address bar; deep links are honoured once, then cleaned.
