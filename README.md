# KaamConnect (काम कनेक्ट) — Hyperlocal Home Services Marketplace

KaamConnect is a responsive MVP web application connecting Indian households with local, transparently-priced service professionals in their neighbourhood (plumbers, electricians, cooks, maids/cleaners, tutors, carpenters, painters, and appliance repair specialists).

---

## 🌟 Key Features & Implementation Highlights

### 🎨 Design & Visual Language
- **Brand Palette:**
  - **Forest Green** (`#174D38`) for trust, reliability, and grounded Indian aesthetics.
  - **Warm Cream** (`#F8F7F1`) as comfortable, clean background tones.
  - **Lime Accent** (`#C5F36B`) for active badges, badges of value, and micro-interactions.
  - **Charcoal Text** (`#14201A`) with typography powered by *Outfit* and *Plus Jakarta Sans*.
- **Elevated UX:** Rounded cards (`rounded-2xl`, `rounded-3xl`), subtle layered elevation shadows, responsive mobile-first navigation with hamburger drawer.

---

### 🔍 Marketplace & Discovery
- **Hyperlocal Filtering:** Filter by locality (e.g. *Koramangala, Indiranagar, Bandra West, Lajpat Nagar, Gachibowli*, etc.).
- **8 Core Categories:** Plumber, Electrician, Cook, Maid / House Cleaning, Tutor, Carpenter, Painter, Appliance Repair.
- **Search:** Instant multi-parameter search matching provider names, services, localities, and keywords.
- **Sorting Options:**
  - Recommended
  - Highest Rated (★)
  - Price: Low to High
  - Price: High to Low
  - Most Experienced (Years)
- **14 Believable Demo Providers:** Seeded across Bengaluru, Mumbai, Delhi, Hyderabad, and Noida with realistic rates, detailed bios, languages spoken, and transparent rate cards.
- **Clear Demo Disclaimers:** Explicit "Demo Profile • Prototype Data Only" badges ensuring no false claims of commercial background checks.

---

### 📋 Interactive Functional Capabilities
1. **Detailed Profile Modal:** Complete bio, verified rate card breakdowns, availability hours, spoken languages, direct demo call number with one-click copy, and neighbourhood reviews.
2. **Booking / Enquiry Flow:** Interactive modal with service selection, client name, 10-digit Indian mobile validation, address, date picker, time slot, and notes.
3. **Local Storage Persistence:** Both user-created listings and submitted service enquiries persist across page reloads.
4. **Provider Registration ("Become a Provider"):** Interactive onboarding modal allowing local tradespeople to list their services, starting prices, and custom service rate cards directly to the in-app marketplace.
5. **"My Enquiries" Drawer:** Dedicated panel tracking all sent enquiries with real-time status updates (*Pending*, *Acknowledged*, *Completed*, *Cancelled*).
6. **Demo User Session Switcher:** Edit customer name and phone to test enquiries from different customer perspectives.
7. **Demo Data Reset:** Easily restore the initial 14 seed profiles at any time.

---

## 🚀 Running the Application

### 1. Development Server
The development server is already running in background at:
```bash
npm run dev
```
Open **[http://localhost:5173](http://localhost:5173)** in your browser.

### 2. Production Build
```bash
npm run build
```

### 3. Automated Test Suite
```bash
npm test
```
