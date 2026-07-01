# 12. SECURITY ARCHITECTURE

This document establishes the security standards to protect administrative data, prevent code injections, and securely handle customer orders.

---

## 1. Authentication Security (Admin Portal)
* **Encryption:** Admin passwords must be securely matched using cryptographic checks (e.g., bcrypt hashes) or robust token comparisons on server-side nodes.
* **Token Expiration:** JWT session tokens should expire within 12 hours of creation, forcing a fresh login.
* **Storage Rules:** Session tokens must be stored in secure HTTP-only cookies where supported, or managed in secure local state.

---

## 2. Protected Routes (Admin Access Control)
* All `/admin` sub-routes (products, inventory, order logs) must check for a valid session token on the server or in client wrappers.
* Unauthorized requests must be redirected immediately to `/admin/login`, stripping out any sensitive dashboard layout structures from the DOM.

---

## 3. Data Integrity & Input Validation
* **Strict Schema Checks:** Validate all incoming public requests (like placing an order via POST `/api/orders` or sending data to WhatsApp services) using robust schemas (such as Zod).
* **Sanitization:** Strip HTML tags, script segments, and escape SQL inputs to prevent SQL injection and Cross-Site Scripting (XSS) exploits.
* **Phone Number Constraints:** Check Jordanian phone inputs strictly to verify they contain exactly 10 digits starting with `079`, `078`, or `077`.

---

## 4. Front-End Security Protections
* **XSS Safeguards:** Never use React's `dangerouslySetInnerHTML` attribute without sanitizing text inputs first.
* **CSP Headers (Content Security Policy):** Restrict sources for external script loads (e.g., Google Maps iframes, font CDNs) to trusted domains only.
* **CSRF Defenses:** Protect state-changing administrative API calls (PUT/POST/DELETE) with custom headers.

---

## 5. Customer Privacy & Secure Processing
* **Local Storage Limits:** Personal information (such as address and phone details inputted at checkout) must never be stored permanently in browser storage.
* **Frictionless Transitions:** Order details transferred to WhatsApp during checkout must contain only temporary metadata. Once completed, clear the checkout form state and shopping cart completely.
