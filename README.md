# MBUMAH HARDWARE - Quotation Only Catalogue RFQ Platform

Final Prototype v1.0. Release tag: v1.0-mbumah-final

Single page quotation-only catalogue. No checkout, no prices: customers browse, add items to a quote list and send an RFQ. Sales confirms itemised pricing in 30 minutes (Mon to Sat 7AM to 7PM) via WhatsApp or phone.

## Stack
- Single index.html, embedded CSS and vanilla JS, no build step
- Poppins headings, Inter body, navy #0F2942, orange #FF8C1A
- Quote list persisted in localStorage key mbumah_cart
- Records API hook (collection quote_items) ready for deployment persistence
- Deployable to any static host (built for Vercel)

## Structure (17 sections)
Topbar, Header, Sticky 4-step progress, Sliding hero (3 slides), Quantified strip, Personas, Catalogue with search and category chips, Delivery, Why Choose Us, Brand Partners, Diaspora, Estimators (wall, roof, paint), Projects, Social gallery slideshow (auto playing, 8 photos, linked to Instagram, YouTube, Facebook, WhatsApp Channel and TikTok), Request form with live quote list, FAQ, Footer.

## Social profiles
Linked in the footer Follow Us block, in the Social Gallery slideshow section (nav: Socials) and in the LocalBusiness JSON-LD schema (sameAs):
- Instagram: https://www.instagram.com/mbumahhardware
- YouTube: https://www.youtube.com/@mbumahhardware-g7b
- Facebook: https://www.facebook.com/profile.php?id=61595911899420
- WhatsApp Channel: https://whatsapp.com/channel/0029Vb9Moad5Ejy5aDbMLs0t
- TikTok: https://www.tiktok.com/@mbumah_hardware_juja

Business phone: +254 759 963 601 (topbar, footer contact, form example, JSON-LD). WhatsApp Sales chat stays on 0795 191 909.

Slideshow behaviour: auto advances every 4 seconds, crossfade 700 ms, Ken Burns zoom, pauses on hover, when the tab is hidden and when scrolled out of view, dots and arrows, tap a caption chip to open the matching platform.

## Deploy
vercel deploy --prod
