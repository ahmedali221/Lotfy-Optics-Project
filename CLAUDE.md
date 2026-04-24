# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install       # Install dependencies
npm run dev       # Start dev server at http://localhost:3000 (auto-opens browser)
npm run build     # Production build → /build directory
```

No test runner is configured in this project.

## Architecture Overview

**LOTFY OPTICAL** is a bilingual (Arabic/English) optical shop website for a store in Assiut, Egypt. It is a React 18 + TypeScript + Vite frontend — there is no backend; all data is static and state lives in memory/localStorage.

### Routing (`src/routes.tsx`)

Two route trees:
1. **Public site** — all routes under `/` share the `Layout` component (Navbar + Footer + Toaster). Pages cover product browsing, cart, checkout, wishlist, clinics, articles, branches, etc.
2. **Admin panel** — routes under `/admin/*` use `AdminLayout` (sidebar + topbar) and are completely separate from the public layout. Currently implemented: `/admin/login`, `/admin/dashboard`, `/admin/products`, `/admin/orders`, `/admin/payment-methods`. The remaining admin routes (`/admin/appointments`, `/admin/articles`, `/admin/users`, `/admin/branches`, `/admin/settings`) render "Coming Soon" placeholders.

### Global State (`src/context/`)

Three React Contexts wrap the entire app in `App.tsx`:
- **`LanguageContext`** — manages `ar`/`en` toggle, sets `document.dir` (RTL/LTR), and exposes `t(key)` backed by **i18next**. Translation JSON files are in `src/i18n/locales/ar.json` and `en.json`. The i18next instance is initialized in `src/i18n/index.ts`, imported once in `main.tsx`. When adding new UI text, add keys to both locale JSON files.
- **`CartContext`** — cart items persisted to `localStorage` under key `lotfy-cart`. Respects `product.stock` as quantity ceiling.
- **`WishlistContext`** — wishlist persisted to `localStorage` under key `lotfy-wishlist`.

### Data Layer (`src/data/`)

- **`products.ts`** — exports a `Product[]` array and the `Product` interface. All product data is hardcoded. Bilingual fields (`name`, `description`) are `{ ar: string; en: string }` objects. When displaying, index with `[language]` from `useLanguage()`.
- **`articles.ts`** — same pattern for blog/article content.

### Styling

- Tailwind CSS v4 via `@tailwindcss/vite` plugin (not PostCSS).
- Custom design tokens defined in `src/styles/globals.css` under `@theme {}`: primary gold `#ECB273`, secondary navy `#2C3E50`.
- The `@import url(...)` for Google Fonts **must come before** `@import "tailwindcss"` in `globals.css` (PostCSS rule).
- shadcn/ui component library is present in `src/components/ui/`.

### Admin Panel

- **Auth**: fake auth — checks hardcoded credentials (`admin@lotfyoptical.com` / `admin123`), then writes `adminToken` and `adminUser` to `localStorage`. No real backend.
- **`AdminLayout`** (`src/components/admin/AdminLayout.tsx`) — collapsible sidebar with dark navy background, sticky topbar. Sidebar position flips based on `language` (RTL: right side, LTR: left side).
- Admin pages do **not** use the public `Layout`; they are registered as top-level routes.

### Internationalization Pattern

Every component that renders text should call `const { language, t } = useLanguage()`. For bilingual data objects (products, articles), access directly: `product.name[language]`. For UI strings, use `t('nav.home')` — keys are nested in the locale JSON files.

RTL support: `document.dir` is set globally by `LanguageContext`. The admin layout manually applies `dir={language === 'ar' ? 'rtl' : 'ltr'}` on its wrapper.

### Icons

All icons come from **`lucide-react`**. Never use other icon libraries. Example: `import { ShoppingCart } from 'lucide-react'`.

### HTTP Client

`src/lib/axios.ts` exports a pre-configured axios instance (`api`). The backend is not connected — all data is currently hardcoded mock data. When the backend is ready, use `api.get(...)` / `api.post(...)` etc. The instance automatically attaches the admin JWT from `localStorage.adminToken`.
