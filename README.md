# MBUMAH HARDWARE - Quotation Only Catalogue RFQ Platform

Final Prototype v1.0. Release tag: v1.0-mbumah-final

Single page quotation-only catalogue. No checkout, no prices: customers browse, add items to a quote list and send an RFQ. Sales confirms itemised pricing in 30 minutes (Mon to Sat 7AM to 7PM) via WhatsApp or phone.

## Stack
- Single index.html, embedded CSS and vanilla JS, no build step
- Poppins headings, Inter body, navy #0F2942, orange #FF8C1A
- Quote list persisted in localStorage key mbumah_cart
- Records API hook (collection quote_items) ready for deployment persistence
- Deployable to any static host (built for Vercel)

## Structure (16 sections)
Topbar, Header, Sticky 4-step progress, Sliding hero (3 slides), Quantified strip, Personas, Catalogue with search and category chips, Delivery, Why Choose Us, Brand Partners, Diaspora, Estimators (wall, roof, paint), Projects, Request form with live quote list, FAQ, Footer.

## Deploy
vercel deploy --prod
