# MBUMAH HARDWARE: Quotation Only Catalogue RFQ Platform

Final Prototype v1.0. Release tag: v1.0-mbumah-final

Single page quotation-only catalogue. No checkout, no prices: customers browse, add items to a quote list and send an RFQ. Sales confirms itemised pricing in 30 minutes (Mon to Sat 7AM to 7PM) via WhatsApp.

## Stack
- Single `index.html`, embedded CSS and vanilla JS, no build step
- Poppins headings, Inter body, navy #0F2942, orange #FF8C1A
- Quote list persisted in localStorage key `mbumah_cart`
- Records API hook (collection `quote_items`) ready for deployment persistence
- Deployable to any static host (built for Vercel)

## Structure (17 sections)
Topbar, Header, Sticky 4-step progress, Sliding hero (3 slides), Quantified strip, Personas, Catalogue with search and category chips, Delivery, Why Choose Us, Brand Partners, Diaspora, Estimators, Projects, Social Gallery, Request a Quotation, FAQ, and Footer.

## New delivery details and client remarks page
The standalone `delivery-request.html` adds a Juja-focused delivery details flow alongside the existing catalogue:

- **Enter a map pin:** paste a Google Maps URL, latitude/longitude coordinates, plus code or location text. Google Maps URLs and coordinates display as a clickable preview. A link to the Mbumah Hardware map location is provided as a reference.
- **Add site directions:** give an area, landmark or access instructions to help the team identify the delivery site.
- **Client remarks and feedback:** type delivery notes, preferred timing, access details, feedback or other comments and review the live preview before proceeding.
- **Send a draft for confirmation:** “Continue on WhatsApp” opens a prefilled message to the existing WhatsApp Sales contact. The customer reviews and sends it; the static page does not submit or persist these details.
- **Juja coverage:** the page calls out Juja town, Juja Farm and surrounding sites. Delivery availability, route/access, schedule and transport charges remain subject to confirmation for the particular location and order.

Open `delivery-request.html` from the deployed site, or run the static site locally and visit `/delivery-request.html`. The Chazaq Hardware delivery page is linked as regional context only; it is not represented as Mbumah's delivery policy, rates, minimums or service guarantees.

### Manual verification checklist
1. Open `delivery-request.html`; check the layout at desktop and mobile widths.
2. Paste a Google Maps URL or `-1.1483165, 37.0609671`; verify a clickable map preview. Try ordinary site text; verify it is included as text and displays the guidance message.
3. Type and clear remarks; ensure the live preview updates and returns to its empty prompt.
4. Enter a pin, directions and remarks, then click **Continue on WhatsApp**; verify the draft contains those values, is URL-encoded and asks the team to confirm delivery. Do not send unless desired.
5. Confirm that no details are sent automatically or stored by the page and delivery terms are described as quote-specific.

The repository is a static HTML prototype without a configured browser-test runner. The checklist above is the manual acceptance test; it should be run on the deployed preview before release.

## Social profiles
Linked in the footer Follow Us block, in the Social Gallery slideshow section (nav: Socials) and in the LocalBusiness JSON-LD schema (`sameAs`):
- Instagram: https://www.instagram.com/mbumahhardware
- YouTube: https://www.youtube.com/@mbumahhardware-g7b
- Facebook: https://www.facebook.com/profile.php?id=61595911899420
- WhatsApp Channel: https://whatsapp.com/channel/0029Vb9Moad5Ejy5aDbMLs0t
- TikTok: https://www.tiktok.com/@mbumah_hardware_juja

Business phone: +254 759 963 601 (topbar, footer contact, form example, JSON-LD). WhatsApp Sales chat stays on 0795 191 909.

Slideshow behaviour: auto advances every 4 seconds, crossfade 700 ms, Ken Burns zoom, pauses on hover, when the tab is hidden and when scrolled out of view, dots and arrows, tap a caption chip to open the corresponding social platform.

## Deploy
`vercel deploy --prod`
